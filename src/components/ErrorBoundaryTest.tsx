import { useState } from 'react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { AlertTriangle, Bug, RefreshCw } from 'lucide-react';

/**
 * Error Boundary Test Component
 * 
 * This component demonstrates the Error Boundary in action.
 * Use it to test that errors are caught gracefully and display the
 * beautiful error screen instead of crashing the app.
 * 
 * Usage:
 * 1. Import this component: import { ErrorBoundaryTest } from './components/ErrorBoundaryTest';
 * 2. Add it anywhere in your app: <ErrorBoundaryTest />
 * 3. Click "Trigger Error" to see the Error Boundary in action
 * 4. The Error Boundary will catch the error and show a friendly recovery screen
 * 
 * To test:
 * - Add this component to any page (e.g., HomePage)
 * - Click the "Trigger Error" button
 * - Observe the Error Boundary catch the error
 * - Click "Try Again" to reset the error state
 * - Click "Go Home" to navigate to the homepage
 */

export function ErrorBoundaryTest() {
  const [shouldError, setShouldError] = useState(false);

  if (shouldError) {
    // This will trigger the Error Boundary
    throw new Error('Test error triggered! The Error Boundary should catch this and display a friendly error screen.');
  }

  return (
    <Card className="p-6 max-w-md mx-auto my-8" style={{ backgroundColor: '#FFF8F0', borderColor: '#F59E0B' }}>
      <div className="flex items-start gap-4">
        <div className="flex-shrink-0">
          <Bug className="w-6 h-6" style={{ color: '#F59E0B' }} />
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-semibold mb-2" style={{ color: '#121212' }}>
            Error Boundary Test
          </h3>
          <p className="text-sm mb-4" style={{ color: '#7A6F66' }}>
            Click the button below to trigger an error and see the Error Boundary in action. 
            The app won't crash - instead, you'll see a beautiful error recovery screen.
          </p>
          
          <div className="space-y-3">
            <Button
              onClick={() => setShouldError(true)}
              className="w-full gap-2"
              style={{ 
                backgroundColor: '#DC2626',
                color: '#FFFFFF'
              }}
            >
              <AlertTriangle className="w-4 h-4" />
              Trigger Test Error
            </Button>

            <div className="p-3 rounded-lg" style={{ backgroundColor: 'rgba(166, 143, 89, 0.1)' }}>
              <div className="flex items-start gap-2">
                <RefreshCw className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: '#A68F59' }} />
                <div className="text-xs" style={{ color: '#7A6F66' }}>
                  <strong>What happens next:</strong>
                  <ul className="list-disc list-inside mt-1 space-y-1">
                    <li>Error Boundary catches the error</li>
                    <li>Friendly error screen appears</li>
                    <li>User can "Try Again" or "Go Home"</li>
                    <li>No white screen or crash!</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="text-xs text-center" style={{ color: '#7A6F66' }}>
              💡 <strong>Dev Mode Only:</strong> Error details shown in development
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}

/**
 * Example usage in HomePage or any other page:
 * 
 * import { ErrorBoundaryTest } from '../components/ErrorBoundaryTest';
 * 
 * // Inside your component JSX:
 * <section className="py-16">
 *   <div className="max-w-4xl mx-auto px-4">
 *     <ErrorBoundaryTest />
 *   </div>
 * </section>
 * 
 * Remember to remove this component from production builds!
 */
