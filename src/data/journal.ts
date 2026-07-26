/**
 * The Journal — CREOVA's content/SEO surface.
 *
 * Data-driven like the service-area pages: routing, prerendering, the sitemap
 * and footer all read from this list. Each post is genuinely useful, evergreen
 * content grounded in real expertise and local context — written to earn
 * informational search traffic and to be worth sharing. No invented facts or
 * numbers. Add a post here and it publishes everywhere automatically.
 */

export type Block =
  | { h2: string }
  | { p: string }
  | { list: string[] };

export interface JournalCopy {
  title: string;
  excerpt: string;
  metaDescription: string;
  body: Block[];
}

export interface JournalPost {
  slug: string;
  date: string;        // ISO — used for sorting + Article schema
  category: string;    // short label
  readMins: number;
  cover: string;       // public path
  en: JournalCopy;
  fr: JournalCopy;
}

export const JOURNAL: JournalPost[] = [
  {
    slug: 'how-to-prepare-for-a-brand-photoshoot',
    date: '2026-06-18',
    category: 'Guides',
    readMins: 5,
    cover: '/card-blackprint-session.jpg',
    en: {
      title: 'How to Prepare for a Brand Photoshoot',
      excerpt: 'The work that happens before the camera comes out is what makes a shoot feel effortless. Here is the prep that separates a good gallery from a great one.',
      metaDescription: 'A practical guide to preparing for a brand photoshoot — moodboards, shot lists, wardrobe, locations and the small things that make the images work harder for your brand.',
      body: [
        { p: 'A great photoshoot looks spontaneous and is anything but. The images that feel effortless are usually the ones that were quietly planned down to the last frame. If you are booking a session for your brand, here is how to walk in ready to get the most out of every minute of light.' },
        { h2: 'Start with the job, not the aesthetic' },
        { p: 'Before you pick a mood, decide what these photos have to do. A launch needs hero images and product detail. A rebrand needs founder portraits and a consistent library for the website. A season of social needs volume and variety. Naming the job first keeps a shoot from becoming a pretty gallery you cannot actually use.' },
        { h2: 'Build a shared reference' },
        { p: 'A short moodboard — even ten images — aligns everyone on tone, colour and framing before anyone shows up. Include examples of the feeling you want and, just as usefully, a couple you want to avoid. The clearer the reference, the less guessing on the day.' },
        { h2: 'Bring a shot list' },
        { p: 'Translate the job into specific frames so nothing is forgotten in the moment:' },
        { list: [
          'Hero images — the one or two shots that lead every page and post',
          'Portraits — founder, team, and the people behind the work',
          'Product or detail — the things people actually buy or use',
          'Lifestyle — the brand in context, doing what it does',
          'Vertical crops — social lives at 9:16, so plan for it',
        ] },
        { h2: 'Sort wardrobe, props and location early' },
        { p: 'Solid colours photograph cleaner than busy patterns, and a few outfit changes multiply your usable images without adding shoot days. Confirm the location, the light at your shoot time, and access — the best backdrop is worthless if you cannot get in when the light is right.' },
        { h2: 'Leave room for the unplanned' },
        { p: 'Then hold it all loosely. The strongest frame of the day is often the one nobody scripted — a laugh between setups, a candid at the edge of the room. Plan tightly so you have the freedom to chase the moment when it shows up.' },
      ],
    },
    fr: {
      title: 'Comment se préparer pour une séance photo de marque',
      excerpt: 'Ce qui se passe avant que la caméra sorte, c’est ce qui rend une séance fluide. Voici la préparation qui distingue une bonne galerie d’une excellente.',
      metaDescription: 'Un guide pratique pour préparer une séance photo de marque — planches d’ambiance, listes de plans, garde-robe, lieux et les détails qui font travailler vos images.',
      body: [
        { p: 'Une bonne séance photo semble spontanée mais ne l’est jamais. Les images qui paraissent sans effort sont souvent celles qui ont été planifiées jusqu’au dernier cadre. Si vous réservez une séance pour votre marque, voici comment arriver prêt à tirer le maximum de chaque minute de lumière.' },
        { h2: 'Commencez par l’objectif, pas l’esthétique' },
        { p: 'Avant de choisir une ambiance, déterminez à quoi ces photos doivent servir. Un lancement exige des images phares et des détails produit. Un rebranding exige des portraits de fondateur et une bibliothèque cohérente. Nommer l’objectif d’abord évite d’obtenir une belle galerie inutilisable.' },
        { h2: 'Créez une référence commune' },
        { p: 'Une courte planche d’ambiance — même dix images — aligne tout le monde sur le ton, la couleur et le cadrage avant l’arrivée. Incluez ce que vous voulez et, tout aussi utile, ce que vous voulez éviter.' },
        { h2: 'Apportez une liste de plans' },
        { p: 'Traduisez l’objectif en cadres précis pour ne rien oublier :' },
        { list: [
          'Images phares — le ou les plans qui ouvrent chaque page et publication',
          'Portraits — fondateur, équipe et les gens derrière le travail',
          'Produit ou détail — ce que les gens achètent ou utilisent',
          'Style de vie — la marque en contexte',
          'Cadrages verticaux — le social vit en 9:16, prévoyez-le',
        ] },
        { h2: 'Réglez garde-robe, accessoires et lieu tôt' },
        { p: 'Les couleurs unies se photographient mieux que les motifs chargés, et quelques changements de tenue multiplient vos images sans ajouter de journées. Confirmez le lieu, la lumière à l’heure prévue et l’accès.' },
        { h2: 'Laissez place à l’imprévu' },
        { p: 'Puis tenez tout cela sans crispation. Le plus beau cadre de la journée est souvent celui que personne n’avait scénarisé. Planifiez serré pour avoir la liberté de saisir le moment.' },
      ],
    },
  },

  {
    slug: 'choosing-an-event-photographer-in-niagara',
    date: '2026-05-27',
    category: 'Guides',
    readMins: 4,
    cover: '/community-photo.jpg',
    en: {
      title: 'Choosing an Event Photographer in Niagara',
      excerpt: 'A gala, a cultural night, a conference — the photos are how the night lives on. Here is what actually matters when you hire someone to capture it.',
      metaDescription: 'How to choose the right event photographer in the Niagara Region — what to look for in a portfolio, questions to ask, and how to make sure the night is captured the way it felt.',
      body: [
        { p: 'You get one shot at an event. When it is over, the photos are what is left — for the recap, the sponsors, the grant report, and the people who were in the room. Choosing the right photographer is less about gear and more about judgment. Here is what to weigh.' },
        { h2: 'Look for a portfolio of real events, not just portraits' },
        { p: 'Events are hard in a way studio work is not: mixed light, fast moments, crowds, and no second takes. Ask to see full events, not a highlight reel of the three best frames. You want proof someone can work a whole room, all night, and keep the quality up.' },
        { h2: 'Ask how they handle the room' },
        { p: 'The best event photographers are nearly invisible. They read a room, anticipate moments, and shoot without turning the night into a photo session. Ask how they move through a crowd and how they capture candid moments without staging them.' },
        { h2: 'Confirm turnaround and usage up front' },
        { p: 'Two questions save most of the friction later:' },
        { list: [
          'When do we get the images — a preview in days, or the gallery in weeks?',
          'What can we do with them — social, press, sponsor decks, and for how long?',
        ] },
        { h2: 'Value the local advantage' },
        { p: 'A photographer who already knows Niagara venues — the light in the atrium, the room that always runs dark — spends less time figuring out the space and more time catching the moments. Local also means easier logistics and someone who understands the community in the room.' },
        { h2: 'Trust the fit' },
        { p: 'Finally, the photographer will be in your space, with your people, all night. Choose someone your guests will be comfortable around. Comfort in front of the lens is what turns a posed crowd into a real photo.' },
      ],
    },
    fr: {
      title: 'Choisir un photographe d’événement à Niagara',
      excerpt: 'Un gala, une soirée culturelle, une conférence — les photos font vivre la soirée. Voici ce qui compte vraiment quand on engage quelqu’un pour la capter.',
      metaDescription: 'Comment choisir le bon photographe d’événement dans la région de Niagara — ce qu’il faut regarder dans un portfolio, les questions à poser et comment garantir une soirée bien captée.',
      body: [
        { p: 'On n’a qu’une chance à un événement. Une fois terminé, les photos sont ce qui reste — pour le bilan, les commanditaires, le rapport de subvention et les gens présents. Choisir le bon photographe tient moins à l’équipement qu’au jugement.' },
        { h2: 'Cherchez un portfolio de vrais événements' },
        { p: 'Les événements sont difficiles autrement que le studio : lumière mixte, moments rapides, foules, aucune reprise. Demandez à voir des événements complets, pas seulement les trois meilleurs plans.' },
        { h2: 'Demandez comment ils gèrent la salle' },
        { p: 'Les meilleurs photographes d’événement sont presque invisibles. Ils lisent une salle, anticipent les moments et photographient sans transformer la soirée en séance. Demandez comment ils circulent et captent le candide sans le mettre en scène.' },
        { h2: 'Confirmez délais et droits d’avance' },
        { p: 'Deux questions évitent la plupart des frictions :' },
        { list: [
          'Quand recevons-nous les images — un aperçu en quelques jours, la galerie en quelques semaines ?',
          'Qu’en fait-on — réseaux, presse, présentations aux commanditaires, et pour combien de temps ?',
        ] },
        { h2: 'Valorisez l’avantage local' },
        { p: 'Un photographe qui connaît déjà les lieux de Niagara passe moins de temps à comprendre l’espace et plus à saisir les moments. Local, c’est aussi une logistique plus simple et quelqu’un qui comprend la communauté présente.' },
        { h2: 'Fiez-vous à l’alchimie' },
        { p: 'Enfin, le photographe sera dans votre espace, avec vos gens, toute la soirée. Choisissez quelqu’un avec qui vos invités seront à l’aise — c’est le confort devant l’objectif qui transforme une foule posée en vraie photo.' },
      ],
    },
  },

  {
    slug: 'why-representation-matters-in-creative-work',
    date: '2026-04-15',
    category: 'Perspective',
    readMins: 4,
    cover: '/card-justin-panel.jpg',
    en: {
      title: 'Why Representation Matters in Creative Work',
      excerpt: 'Who is behind the camera changes what ends up in front of it. This is why we build a studio that reflects the communities we photograph.',
      metaDescription: 'A perspective on why representation in creative work matters — how the team behind the camera shapes the images, and why CREOVA builds a studio that reflects its communities.',
      body: [
        { p: 'There is a quiet decision made on every shoot, long before anyone picks up a camera: who gets to tell the story. It rarely shows up in a brief, but it shapes everything — the framing, the light, what reads as beautiful, whose comfort the room is built around. Representation is not a slogan. It is a craft decision with consequences.' },
        { h2: 'The lens carries a point of view' },
        { p: 'Photography is never neutral. Every frame is a set of choices about what to include, how to light it, and what to make the subject of attention. When the people making those choices share the culture in front of them, the result is not just accurate — it is felt. The subject can tell the difference, and so can the audience.' },
        { h2: 'Comfort is visible' },
        { p: 'People relax around those who understand them. That ease is not a soft nicety; it is the whole game. A subject who trusts the room gives you the real expression instead of the guarded one, and that is the difference between a photo that documents someone and a photo that honours them.' },
        { h2: 'Culture deserves the same craft as commerce' },
        { p: 'For a long time, the biggest brands got cinematic budgets and community work got a phone and good intentions. We reject that split. A cultural night, a community founder, a student showcase — these deserve the same lighting, the same editing, the same care that a national campaign takes for granted. Craft is a form of respect.' },
        { h2: 'Why we build the studio this way' },
        { p: 'This is why CREOVA is built the way it is — a team that reflects and understands the communities it shoots. It is not charity and it is not a checkbox. It is simply how you make work that is both technically excellent and true. When the story belongs to the people telling it, the images get better. Every time.' },
      ],
    },
    fr: {
      title: 'Pourquoi la représentation compte dans le travail créatif',
      excerpt: 'Qui se trouve derrière la caméra change ce qui se retrouve devant. Voici pourquoi nous bâtissons un studio à l’image des communautés que nous photographions.',
      metaDescription: 'Une réflexion sur l’importance de la représentation dans le travail créatif — comment l’équipe derrière la caméra façonne les images, et pourquoi CREOVA bâtit un studio à l’image de ses communautés.',
      body: [
        { p: 'Une décision discrète se prend à chaque séance, bien avant qu’on saisisse une caméra : qui a le droit de raconter l’histoire. Elle apparaît rarement dans un brief, mais elle façonne tout — le cadrage, la lumière, ce qui semble beau, autour de qui la salle est construite. La représentation n’est pas un slogan. C’est une décision de métier, avec des conséquences.' },
        { h2: 'L’objectif porte un point de vue' },
        { p: 'La photographie n’est jamais neutre. Chaque cadre est un ensemble de choix. Quand ceux qui les font partagent la culture devant eux, le résultat n’est pas seulement juste — il se ressent. Le sujet perçoit la différence, et le public aussi.' },
        { h2: 'Le confort est visible' },
        { p: 'Les gens se détendent auprès de ceux qui les comprennent. Cette aisance n’est pas un détail : c’est tout l’enjeu. Un sujet qui a confiance vous donne la vraie expression plutôt que la version sur ses gardes.' },
        { h2: 'La culture mérite le même soin que le commerce' },
        { p: 'Longtemps, les grandes marques ont eu des budgets cinématographiques et le travail communautaire, un téléphone et de bonnes intentions. Nous rejetons cette division. Une soirée culturelle, un fondateur communautaire, une vitrine étudiante méritent le même éclairage et le même soin qu’une campagne nationale.' },
        { h2: 'Pourquoi nous bâtissons ainsi le studio' },
        { p: 'Voilà pourquoi CREOVA est bâtie ainsi — une équipe à l’image des communautés qu’elle capte. Ce n’est ni de la charité ni une case à cocher. C’est simplement ainsi qu’on fait un travail à la fois techniquement excellent et vrai.' },
      ],
    },
  },
];

export function getPost(slug: string): JournalPost | undefined {
  return JOURNAL.find((p) => p.slug === slug);
}
