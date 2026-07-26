/**
 * Case studies — deep-dive proof pages. Data-driven like the other surfaces
 * (routing/prerender/sitemap read from here). Grounded in real partnerships;
 * no invented metrics. A `quote` is only rendered if present, so leave it out
 * until you have the client's real words.
 */

export interface CaseStudyCopy {
  title: string;
  kicker: string;
  metaDescription: string;
  overview: string;
  scope: { label: string; detail: string }[];
  body: string[];
  resultLabel: string;
  result: string;
  /** Optional real client quote. Omit until you have their actual words. */
  quote?: { text: string; name: string; role: string };
}

export interface CaseStudy {
  slug: string;              // lives at /work/<slug>
  partner: string;
  org: string;
  cover: string;            // public path
  featureImage: string;     // public path (the person/feature)
  featureName: string;
  featureRoleEn: string;
  featureRoleFr: string;
  en: CaseStudyCopy;
  fr: CaseStudyCopy;
}

export const CASE_STUDIES: CaseStudy[] = [
  {
    slug: 'black-student-success-centre',
    partner: 'Black Student Success Centre',
    org: 'Brock University',
    cover: '/card-bssc.jpg',
    featureImage: '/photo-monique-bssc.jpg',
    featureName: 'Monique Beauregard',
    featureRoleEn: 'Black Student Success Centre',
    featureRoleFr: 'Black Student Success Centre',
    en: {
      title: 'Documenting Black student life at Brock',
      kicker: 'Case Study · BSSC × CREOVA',
      metaDescription:
        'How CREOVA became the go-to creative partner for the Black Student Success Centre at Brock University — event photography, videography and design for Black student life and culture.',
      overview:
        'The Black Student Success Centre (BSSC) at Brock University is a home for Black student life, culture and belonging. CREOVA is its go-to creative partner — the team the BSSC and student clubs reach for when a moment needs to be captured, a campaign needs to look the part, and a story needs to be told well.',
      scope: [
        { label: 'Event photography', detail: 'Cultural nights, showcases, and closing sessions, captured as they happen.' },
        { label: 'Videography', detail: 'Recaps and promotional video that carry the energy of the room.' },
        { label: 'Graphic design', detail: 'Event graphics and promotional material that match the moment.' },
        { label: 'Portraits & content', detail: 'A steady library of images for social, recaps and reporting.' },
      ],
      body: [
        'What started as a single shoot became a standing relationship. Cultural nights, wellness programming, student showcases, closing sessions — when the BSSC and student clubs plan something, CREOVA is often already on the calendar.',
        'The value is not just the photos. It is trust. Students light up when the camera comes out because they know the people behind it, and they know the work will honour them rather than just document them. That comfort is the difference between a posed crowd and a real photo — and it is exactly why the BSSC keeps calling.',
        'Across photography, videography and design, CREOVA gives Black student life at Brock the same craft the biggest institutions take for granted — and makes it look like it belongs.',
      ],
      resultLabel: 'The result',
      result:
        'A trusted, recurring partnership. The BSSC and student clubs keep reaching out — for photography, videography and design — and students are always happy to see CREOVA behind the camera.',
    },
    fr: {
      title: 'Documenter la vie étudiante noire à Brock',
      kicker: 'Étude de cas · BSSC × CREOVA',
      metaDescription:
        'Comment CREOVA est devenue le partenaire créatif de référence du Black Student Success Centre de l’Université Brock — photographie, vidéo et design pour la vie et la culture étudiantes noires.',
      overview:
        'Le Black Student Success Centre (BSSC) de l’Université Brock est un foyer pour la vie, la culture et l’appartenance étudiantes noires. CREOVA en est le partenaire créatif de référence — l’équipe que le BSSC et les clubs étudiants appellent quand un moment doit être capté, une campagne doit avoir de l’allure, et une histoire doit être bien racontée.',
      scope: [
        { label: 'Photographie d’événement', detail: 'Soirées culturelles, vitrines et séances de clôture, captées sur le vif.' },
        { label: 'Vidéographie', detail: 'Récapitulatifs et vidéos promotionnelles qui portent l’énergie de la salle.' },
        { label: 'Design graphique', detail: 'Visuels d’événements et matériel promotionnel à la hauteur du moment.' },
        { label: 'Portraits et contenu', detail: 'Une bibliothèque d’images pour les réseaux, les bilans et les rapports.' },
      ],
      body: [
        'Ce qui a commencé par une seule séance est devenu une relation durable. Soirées culturelles, programmation bien-être, vitrines étudiantes, séances de clôture — quand le BSSC et les clubs planifient quelque chose, CREOVA est souvent déjà à l’agenda.',
        'La valeur ne tient pas qu’aux photos. Elle tient à la confiance. Les étudiants s’illuminent quand la caméra sort, parce qu’ils connaissent les gens derrière — et savent que le travail les honorera. Ce confort fait toute la différence, et c’est exactement pourquoi le BSSC continue d’appeler.',
        'En photographie, vidéo et design, CREOVA offre à la vie étudiante noire de Brock le même soin que les plus grandes institutions tiennent pour acquis.',
      ],
      resultLabel: 'Le résultat',
      result:
        'Un partenariat de confiance et récurrent. Le BSSC et les clubs continuent de faire appel à nous — photo, vidéo, design — et les étudiants sont toujours heureux de voir CREOVA derrière la caméra.',
    },
  },
];

export function getCaseStudy(slug: string): CaseStudy | undefined {
  return CASE_STUDIES.find((c) => c.slug === slug);
}
