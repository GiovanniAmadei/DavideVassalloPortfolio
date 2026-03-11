export interface GalleryImage {
  src: string;
  alt: string;
  width: number;
  height: number;
  category: "ritratto" | "reportage-eventi" | "ricerca-fotografica";
}

// Using Unsplash for placeholder images — replace with real photos
export const allImages: GalleryImage[] = [
  // Ritratto
  {
    src: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=800&q=80",
    alt: "Ritratto donna luce naturale",
    width: 800,
    height: 1067,
    category: "ritratto",
  },
  {
    src: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=800&q=80",
    alt: "Ritratto editoriale femminile",
    width: 800,
    height: 1000,
    category: "ritratto",
  },
  {
    src: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=800&q=80",
    alt: "Ritratto uomo in bianco e nero",
    width: 800,
    height: 1000,
    category: "ritratto",
  },
  {
    src: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800&q=80",
    alt: "Ritratto editoriale donna",
    width: 800,
    height: 1067,
    category: "ritratto",
  },
  {
    src: "https://images.unsplash.com/photo-1552058544-f2b08422138a?w=800&q=80",
    alt: "Ritratto espressivo",
    width: 800,
    height: 800,
    category: "ritratto",
  },
  {
    src: "https://images.unsplash.com/photo-1499996860823-5214fcc65f8f?w=800&q=80",
    alt: "Ritratto minimalista",
    width: 800,
    height: 600,
    category: "ritratto",
  },
  {
    src: "https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=800&q=80",
    alt: "Ritratto naturale",
    width: 800,
    height: 1067,
    category: "ritratto",
  },
  {
    src: "https://images.unsplash.com/photo-1547212371-eb5e6a4b590c?w=800&q=80",
    alt: "Ritratto contemporaneo",
    width: 800,
    height: 1000,
    category: "ritratto",
  },

  // Reportage Eventi
  {
    src: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=80",
    alt: "Conferenza evento corporate",
    width: 800,
    height: 534,
    category: "reportage-eventi",
  },
  {
    src: "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=800&q=80",
    alt: "Reportage concerto dal vivo",
    width: 800,
    height: 533,
    category: "reportage-eventi",
  },
  {
    src: "https://images.unsplash.com/photo-1511578314322-379afb476865?w=800&q=80",
    alt: "Evento culturale cerimonia",
    width: 800,
    height: 534,
    category: "reportage-eventi",
  },
  {
    src: "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=800&q=80",
    alt: "Reportage backstage moda",
    width: 800,
    height: 533,
    category: "reportage-eventi",
  },
  {
    src: "https://images.unsplash.com/photo-1559223607-180220b18afe?w=800&q=80",
    alt: "Evento fashion week",
    width: 800,
    height: 534,
    category: "reportage-eventi",
  },
  {
    src: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800&q=80",
    alt: "Festa privata luxury",
    width: 800,
    height: 533,
    category: "reportage-eventi",
  },
  {
    src: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80",
    alt: "Evento aziendale presentazione",
    width: 800,
    height: 534,
    category: "reportage-eventi",
  },

  // Ricerca Fotografica
  {
    src: "https://images.unsplash.com/photo-1500462918059-b1a0cb512f1d?w=800&q=80",
    alt: "Ricerca fotografica astratta luce",
    width: 800,
    height: 1067,
    category: "ricerca-fotografica",
  },
  {
    src: "https://images.unsplash.com/photo-1518020382113-a7e8fc38eac9?w=800&q=80",
    alt: "Sperimentazione visiva ombre",
    width: 800,
    height: 600,
    category: "ricerca-fotografica",
  },
  {
    src: "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=800&q=80",
    alt: "Ricerca estetica geometrie",
    width: 800,
    height: 800,
    category: "ricerca-fotografica",
  },
  {
    src: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80",
    alt: "Natura paesaggio ricerca",
    width: 800,
    height: 533,
    category: "ricerca-fotografica",
  },
  {
    src: "https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?w=800&q=80",
    alt: "Sperimentazione texture",
    width: 800,
    height: 1067,
    category: "ricerca-fotografica",
  },
  {
    src: "https://images.unsplash.com/photo-1515923152115-758a6b16f35e?w=800&q=80",
    alt: "Ricerca fotografica urbana",
    width: 800,
    height: 600,
    category: "ricerca-fotografica",
  },
  {
    src: "https://images.unsplash.com/photo-1505765050516-f72dcac9c60e?w=800&q=80",
    alt: "Paesaggio riflessioni",
    width: 800,
    height: 534,
    category: "ricerca-fotografica",
  },
];

export const ritratto = allImages.filter((i) => i.category === "ritratto");
export const reportageEventi = allImages.filter(
  (i) => i.category === "reportage-eventi"
);
export const ricercaFotografica = allImages.filter(
  (i) => i.category === "ricerca-fotografica"
);
