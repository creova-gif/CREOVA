import { Writable } from 'node:stream';
import { renderToPipeableStream } from 'react-dom/server';
import { StaticRouter } from 'react-router';
import { HelmetProvider, type HelmetServerState } from '@dr.pogodin/react-helmet';
import { AppShell } from './App';

export interface RenderResult {
  /** Rendered markup for #root */
  html: string;
  /** Serialised <head> tags collected from @dr.pogodin/react-helmet */
  head: string;
  /** Attributes for <html>, e.g. lang="en" */
  htmlAttrs: string;
}

/**
 * Render one route to static HTML for the prerender step.
 *
 * Uses renderToPipeableStream rather than renderToString because every route
 * is behind React.lazy — renderToString would emit the Suspense fallback (the
 * loading spinner) and, critically, none of the per-page <PageSEO> tags. The
 * onAllReady callback waits for every lazy boundary to resolve first.
 */
export function render(url: string): Promise<RenderResult> {
  return new Promise((resolve, reject) => {
    // The provider hands us the collected server state via onServerState. It
    // fires as Helmet tags commit during render; by the time onAllReady has
    // waited out every lazy boundary (incl. each page's <PageSEO>), the last
    // value captured here is the final, deepest-wins state.
    let helmet: HelmetServerState | undefined;
    const errors: unknown[] = [];
    let body = '';

    const sink = new Writable({
      write(chunk, _encoding, callback) {
        body += chunk.toString();
        callback();
      },
    });

    sink.on('finish', () => {
      const head = [helmet?.title, helmet?.meta, helmet?.link, helmet?.script]
        .filter(Boolean)
        .map((tag) => tag!.toString())
        .filter(Boolean)
        .join('\n    ');

      resolve({
        html: body,
        head,
        htmlAttrs: helmet?.htmlAttributes?.toString() ?? '',
      });
    });

    const timeout = setTimeout(() => {
      abort();
      reject(new Error(`Prerender timed out after 20s: ${url}`));
    }, 20_000);

    const { pipe, abort } = renderToPipeableStream(
      <HelmetProvider onServerState={(state) => { helmet = state; }}>
        <StaticRouter location={url}>
          <AppShell />
        </StaticRouter>
      </HelmetProvider>,
      {
        onAllReady() {
          clearTimeout(timeout);
          pipe(sink);
        },
        // Recoverable errors still let the render finish; surface them so a
        // silently-degraded page doesn't get published looking fine.
        onError(error) {
          errors.push(error);
        },
        onShellError(error) {
          clearTimeout(timeout);
          reject(error);
        },
      }
    );
  });
}
