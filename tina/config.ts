import { defineConfig } from "tinacms";

export default defineConfig({
  clientId: process.env.NEXT_PUBLIC_TINA_CLIENT_ID || "",
  branch:
    process.env.NEXT_PUBLIC_TINA_BRANCH ||
    process.env.NEXT_PUBLIC_VERCEL_GIT_COMMIT_REF ||
    "main",
  token: process.env.TINA_TOKEN || "",

  build: {
    outputFolder: "admin",
    publicFolder: "public",
  },

  media: {
    loadCustomStore: async () => {
      const pack = await import("next-tinacms-cloudinary");
      return pack.TinaCloudCloudinaryMediaStore;
    },
  },

  schema: {
    collections: [
      // ─── POST / BLOG ────────────────────────────────────────────
      {
        name: "post",
        label: "1. Articoli Blog (Premi Qui per Creare Nuovi)",
        path: "content/posts",
        format: "md",
        ui: {
          router: ({ document }) => {
            return `/blog/${document._sys.filename}`;
          },
          allowedActions: {
            create: true,
            delete: true,
          }
        },
        fields: [
          {
            type: "string",
            name: "title",
            label: "Titolo (IT)",
            isTitle: true,
            required: true,
          },
          {
            type: "string",
            name: "title_en",
            label: "Title (EN)",
          },
          {
            type: "string",
            name: "slug",
            label: "Slug (URL)",
            required: true,
          },
          {
            type: "datetime",
            name: "publishedAt",
            label: "Data di Pubblicazione",
          },
          {
            type: "image",
            name: "mainImage",
            label: "Immagine Principale",
          },
          {
            type: "string",
            name: "categories",
            label: "Categoria",
          },
          {
            type: "rich-text",
            name: "body",
            label: "Contenuto (IT)",
            isBody: true,
          },
        ],
      },

      // ─── CHI SONO ────────────────────────────────────────────────
      {
        name: "chiSono",
        label: "Chi Sono",
        path: "content",
        format: "json",
        match: { include: "chi-sono" },
        ui: {
          router: () => "/about",
          allowedActions: {
            create: false,
            delete: false,
          },
        },
        fields: [
          // ── Italiano ──
          {
            type: "string",
            name: "titolo",
            label: "Titolo Principale (IT)",
            required: true,
          },
          {
            type: "string",
            name: "sottotitolo",
            label: "Sottotitolo / Ruolo (IT)",
          },
          {
            type: "rich-text",
            name: "descrizione",
            label: "Biografia (IT)",
          },
          {
            type: "image",
            name: "fotoProfilo",
            label: "Foto Profilo",
          },
          {
            type: "object",
            name: "esperienze",
            label: "Esperienze e Mostre",
            list: true,
            fields: [
              { type: "string", name: "anno", label: "Anno / Label" },
              { type: "string", name: "titolo", label: "Titolo (IT)" },
              { type: "string", name: "titolo_en", label: "Title (EN)" },
              { type: "string", name: "luogo", label: "Luogo (Opzionale)" },
            ],
          },
          {
            type: "string",
            name: "filosofiaTitolo",
            label: "Titolo Sezione Filosofia (IT)",
          },
          {
            type: "string",
            name: "filosofiaCitazione",
            label: "Citazione Filosofia (IT)",
            ui: { component: "textarea" },
          },
          {
            type: "string",
            name: "filosofiaAutore",
            label: "Autore Citazione",
          },
          {
            type: "string",
            name: "filosofiaDescrizione",
            label: "Descrizione Filosofia (IT)",
            ui: { component: "textarea" },
          },
          // ── English ──
          {
            type: "string",
            name: "titolo_en",
            label: "Main Title (EN)",
          },
          {
            type: "string",
            name: "sottotitolo_en",
            label: "Subtitle / Role (EN)",
          },
          {
            type: "rich-text",
            name: "descrizione_en",
            label: "Biography (EN)",
          },
          {
            type: "string",
            name: "filosofiaTitolo_en",
            label: "Philosophy Section Title (EN)",
          },
          {
            type: "string",
            name: "filosofiaCitazione_en",
            label: "Philosophy Quote (EN)",
            ui: { component: "textarea" },
          },
          {
            type: "string",
            name: "filosofiaDescrizione_en",
            label: "Philosophy Description (EN)",
            ui: { component: "textarea" },
          },
        ],
      },

      // ─── FOTOGRAFIE ──────────────────────────────────────────────
      {
        name: "fotografia",
        label: "Fotografie",
        path: "content/fotografie",
        format: "json",
        ui: {
          router: () => "/portfolio",
        },
        fields: [
          {
            type: "string",
            name: "title",
            label: "Titolo (Opzionale)",
          },
          {
            type: "image",
            name: "src",
            label: "Immagine",
            required: true,
          },
          {
            type: "string",
            name: "categoriaString",
            label: "Categoria (Tag)",
            required: true,
          },
          {
            type: "string",
            name: "description",
            label: "Descrizione Lightbox (IT)",
            ui: { component: "textarea" },
          },
          {
            type: "string",
            name: "description_en",
            label: "Lightbox Description (EN)",
            ui: { component: "textarea" },
          },
          {
            type: "string",
            name: "metadata",
            label: "Metadati (es. Fotocamera)",
          },
          {
            type: "number",
            name: "ordine",
            label: "Ordine in Galleria",
          },
          {
            type: "boolean",
            name: "inMosaico",
            label: "Includi nel Mosaico",
            description: "Se attivo, questa foto appare nel mosaico in homepage e portfolio.",
          },
        ],
      },

      // ─── PROGETTI VIDEO ──────────────────────────────────────────
      {
        name: "progettoVideo",
        label: "Progetti Video",
        path: "content/video",
        format: "json",
        ui: {
          router: ({ document }) => `/portfolio/video/${document._sys.filename}`,
        },
        fields: [
          {
            type: "string",
            name: "title",
            label: "Titolo del Progetto (IT)",
            isTitle: true,
            required: true,
          },
          {
            type: "string",
            name: "title_en",
            label: "Project Title (EN)",
          },
          {
            type: "image",
            name: "src",
            label: "Immagine Copertina",
            required: true,
          },
          {
            type: "string",
            name: "categoriaString",
            label: "Sezione Portfolio",
            required: true,
            description: "Scegli in quale sezione del portfolio appare questo progetto.",
            options: [
              { value: "videomaking", label: "Videomaking" },
              { value: "regia", label: "Regia" },
            ],
          },
          {
            type: "string",
            name: "sottocategoria",
            label: "Sottocategoria / Tag Filtro",
            description: "Opzionale. Usato per i filtri nella pagina portfolio.",
          },
          {
            type: "string",
            name: "description",
            label: "Descrizione (IT)",
            ui: { component: "textarea" },
          },
          {
            type: "string",
            name: "description_en",
            label: "Description (EN)",
            ui: { component: "textarea" },
          },
          {
            type: "string",
            name: "metadata",
            label: "Metadati (Anno, Durata, Tipo)",
          },
          {
            type: "string",
            name: "logline",
            label: "Logline / Breve Riassunto (IT)",
            ui: { component: "textarea" },
          },
          {
            type: "string",
            name: "logline_en",
            label: "Logline / Short Summary (EN)",
            ui: { component: "textarea" },
          },
          {
            type: "string",
            name: "url",
            label: "Link Video (URL)",
            description: "Es. https://vimeo.com/... o https://youtube.com/watch?v=...",
          },
          {
            type: "number",
            name: "ordine",
            label: "Ordine in Galleria",
          },
        ],
      },

      // ─── CONTATTI ────────────────────────────────────────────────
      {
        name: "contatti",
        label: "Contatti",
        path: "content",
        format: "json",
        match: { include: "contatti" },
        ui: {
          router: () => "/contatti",
          allowedActions: {
            create: false,
            delete: false,
          },
        },
        fields: [
          {
            type: "string",
            name: "email",
            label: "Email",
            required: true,
          },
          {
            type: "string",
            name: "telefono",
            label: "Telefono",
          },
          {
            type: "string",
            name: "instagram",
            label: "Link Instagram",
          },
          {
            type: "string",
            name: "linkedin",
            label: "Link LinkedIn",
          },
          {
            type: "string",
            name: "indirizzoStudio",
            label: "Indirizzo Studio",
            ui: { component: "textarea" },
          },
          // ── Italiano ──
          {
            type: "string",
            name: "titoloPagina",
            label: "Titolo Pagina (IT)",
          },
          {
            type: "string",
            name: "sottotitoloPagina",
            label: "Sottotitolo Pagina (IT)",
          },
          {
            type: "string",
            name: "titoloSezione",
            label: "Titolo Sezione Contatti (IT)",
          },
          {
            type: "string",
            name: "testoSottoTitolo",
            label: "Testo Sotto Titolo (IT)",
          },
          {
            type: "string",
            name: "orariRitratto",
            label: "Orari / Info Ritratto (IT)",
          },
          {
            type: "string",
            name: "orariReportage",
            label: "Orari / Info Reportage (IT)",
          },
          {
            type: "string",
            name: "orariRicerca",
            label: "Orari / Info Ricerca (IT)",
          },
          // ── English ──
          {
            type: "string",
            name: "titoloPagina_en",
            label: "Page Title (EN)",
          },
          {
            type: "string",
            name: "sottotitoloPagina_en",
            label: "Page Subtitle (EN)",
          },
          {
            type: "string",
            name: "titoloSezione_en",
            label: "Contact Section Title (EN)",
          },
          {
            type: "string",
            name: "testoSottoTitolo_en",
            label: "Subtitle Text (EN)",
          },
          {
            type: "string",
            name: "orariRitratto_en",
            label: "Portrait Info (EN)",
          },
          {
            type: "string",
            name: "orariReportage_en",
            label: "Reportage Info (EN)",
          },
          {
            type: "string",
            name: "orariRicerca_en",
            label: "Research Info (EN)",
          },
          // ── Form labels (shared) ──
          { type: "string", name: "formName", label: "Etichetta Form: Nome (IT)" },
          { type: "string", name: "formEmail", label: "Etichetta Form: Email" },
          { type: "string", name: "formSubject", label: "Etichetta Form: Oggetto (IT)" },
          { type: "string", name: "formMessage", label: "Etichetta Form: Messaggio (IT)" },
          { type: "string", name: "formSubmit", label: "Etichetta Form: Pulsante Invia (IT)" },
          { type: "string", name: "formName_en", label: "Form Label: Name (EN)" },
          { type: "string", name: "formSubject_en", label: "Form Label: Subject (EN)" },
          { type: "string", name: "formMessage_en", label: "Form Label: Message (EN)" },
          { type: "string", name: "formSubmit_en", label: "Form Label: Submit Button (EN)" },
        ],
      },

      // ─── IMPOSTAZIONI GLOBALI (HEADER/FOOTER) ────────────────────
      {
        name: "global",
        label: "Globale (Header/Footer)",
        path: "content",
        format: "json",
        match: { include: "global" },
        ui: {
          allowedActions: {
            create: false,
            delete: false,
          },
        },
        fields: [
          {
            type: "string",
            name: "email",
            label: "Email Footer",
            required: true,
          },
          {
            type: "string",
            name: "telefono",
            label: "Telefono Footer",
          },
          {
            type: "string",
            name: "indirizzo",
            label: "Indirizzo Footer",
          },
          {
            type: "string",
            name: "copyright",
            label: "Testo Copyright",
          },
          {
            type: "string",
            name: "instagram",
            label: "Link Instagram",
          },
          {
            type: "string",
            name: "linkedin",
            label: "Link LinkedIn",
          },
          { type: "string", name: "youtube", label: "Link YouTube" },
          { type: "string", name: "facebook", label: "Link Facebook" },
          { type: "string", name: "logoName", label: "Nome Logo Header" },
          // ── Navigazione Italiano ──
          { type: "string", name: "navHome", label: "Menu: Home (IT)" },
          { type: "string", name: "navPortfolio", label: "Menu: Portfolio (IT)" },
          { type: "string", name: "navBlog", label: "Menu: Blog (IT)" },
          { type: "string", name: "navAbout", label: "Menu: Chi Sono (IT)" },
          { type: "string", name: "navContact", label: "Menu: Contatti (IT)" },
          { type: "string", name: "navSubFotografia", label: "Sottomenu: Fotografia (IT)" },
          { type: "string", name: "navSubVideomaking", label: "Sottomenu: Videomaking" },
          { type: "string", name: "navSubRegia", label: "Sottomenu: Regia (IT)" },
          { type: "string", name: "navSubMosaico", label: "Sottomenu: Mosaico (IT)" },
          { type: "string", name: "filterFoto1", label: "Filtro Foto 1 (IT)" },
          { type: "string", name: "filterFoto2", label: "Filtro Foto 2 (IT)" },
          { type: "string", name: "filterVideoAll", label: "Filtro Video: Tutto (IT)" },
          // ── Navigation English ──
          { type: "string", name: "navAbout_en", label: "Menu: About (EN)" },
          { type: "string", name: "navContact_en", label: "Menu: Contact (EN)" },
          { type: "string", name: "navSubFotografia_en", label: "Submenu: Photography (EN)" },
          { type: "string", name: "navSubRegia_en", label: "Submenu: Direction (EN)" },
          { type: "string", name: "navSubMosaico_en", label: "Submenu: Mosaic (EN)" },
          { type: "string", name: "filterFoto1_en", label: "Photo Filter 1 (EN)" },
          { type: "string", name: "filterFoto2_en", label: "Photo Filter 2 (EN)" },
          { type: "string", name: "filterVideoAll_en", label: "Video Filter: All (EN)" },
        ],
      },

      // ─── HOMEPAGE ────────────────────────────────────────────────
      {
        name: "homepage",
        label: "Homepage",
        path: "content",
        format: "json",
        match: { include: "homepage" },
        ui: {
          router: () => "/",
          allowedActions: {
            create: false,
            delete: false,
          },
        },
        fields: [
          {
            type: "object",
            name: "heroBands",
            label: "Pannelli Hero Iniziali",
            list: true,
            ui: {
              itemProps: (item) => {
                return { label: item?.title || "Nuovo Pannello" }
              }
            },
            fields: [
              { type: "string", name: "title", label: "Titolo Pannello (IT)" },
              { type: "string", name: "title_en", label: "Panel Title (EN)" },
              { type: "string", name: "href", label: "Link Pannello (Es. /portfolio#fotografia)" },
              { type: "image", name: "images", label: "Immagini Slider", list: true },
              {
                type: "string",
                name: "objectPosition",
                label: "Posizione Immagine",
                description: "Controlla il punto focale dell'immagine nella fascia.",
                options: [
                  { value: "center center", label: "Centro (default)" },
                  { value: "top center", label: "Alto" },
                  { value: "bottom center", label: "Basso" },
                  { value: "center left", label: "Sinistra" },
                  { value: "center right", label: "Destra" },
                  { value: "20% center", label: "Sinistra-centro" },
                  { value: "80% center", label: "Destra-centro" },
                  { value: "center 30%", label: "Alto-centro" },
                  { value: "center 70%", label: "Basso-centro" },
                ],
              },
            ],
          },
          // ── Italiano ──
          { type: "string", name: "chiSonoLabel", label: "Testatina Chi Sono (IT)" },
          { type: "string", name: "chiSonoPreviewTitle", label: "Titolo Chi Sono Preview (IT)" },
          { type: "string", name: "chiSonoPreviewText1", label: "Paragrafo 1 Chi Sono (IT)", ui: { component: "textarea" } },
          { type: "string", name: "chiSonoPreviewText2", label: "Paragrafo 2 Chi Sono (IT)", ui: { component: "textarea" } },
          { type: "string", name: "blogLabel", label: "Testatina Blog (IT)" },
          { type: "string", name: "mosaicoLabel", label: "Testatina Mosaico (IT)" },
          { type: "string", name: "ctaBlog", label: "Pulsante Blog (IT)" },
          { type: "string", name: "ctaMosaico", label: "Pulsante Mosaico (IT)" },
          // ── English ──
          { type: "string", name: "chiSonoLabel_en", label: "About Section Label (EN)" },
          { type: "string", name: "chiSonoPreviewTitle_en", label: "About Preview Title (EN)" },
          { type: "string", name: "chiSonoPreviewText1_en", label: "About Paragraph 1 (EN)", ui: { component: "textarea" } },
          { type: "string", name: "chiSonoPreviewText2_en", label: "About Paragraph 2 (EN)", ui: { component: "textarea" } },
          { type: "string", name: "blogLabel_en", label: "Blog Label (EN)" },
          { type: "string", name: "mosaicoLabel_en", label: "Mosaic Label (EN)" },
          { type: "string", name: "ctaBlog_en", label: "Blog Button (EN)" },
          { type: "string", name: "ctaMosaico_en", label: "Mosaic Button (EN)" },
        ],
      },

      // ─── PORTFOLIO PAGE ──────────────────────────────────────────
      {
        name: "portfolioPage",
        label: "Pagina Portfolio",
        path: "content",
        format: "json",
        match: { include: "portfolio" },
        ui: {
          router: () => "/portfolio",
          allowedActions: {
            create: false,
            delete: false,
          },
        },
        fields: [
          // ── Italiano ──
          { type: "string", name: "tabFotografia", label: "Tab 1: Fotografia (IT)" },
          { type: "string", name: "tabVideomaking", label: "Tab 2: Videomaking" },
          { type: "string", name: "tabRegia", label: "Tab 3: Regia (IT)" },
          { type: "string", name: "tabMosaico", label: "Tab 4: Mosaico (IT)" },
          { type: "string", name: "filterFoto1", label: "Filtro Foto 1 (IT)" },
          { type: "string", name: "filterFoto2", label: "Filtro Foto 2 (IT)" },
          { type: "string", name: "filterVideoAll", label: "Filtro Video: Tutto (IT)" },
          { type: "string", name: "filterVideo1", label: "Filtro Video 1 (IT)" },
          { type: "string", name: "filterVideo2", label: "Filtro Video 2 (IT)" },
          { type: "image", name: "imagesFoto1", label: "Immagini Slider Foto 1", list: true },
          { type: "image", name: "imagesFoto2", label: "Immagini Slider Foto 2", list: true },
          { type: "string", name: "descFoto1", label: "Testo Introduttivo Ritratti (IT)", ui: { component: "textarea" } },
          { type: "string", name: "descFoto2", label: "Testo Introduttivo Narrazione (IT)", ui: { component: "textarea" } },
          // ── English ──
          { type: "string", name: "tabFotografia_en", label: "Tab 1: Photography (EN)" },
          { type: "string", name: "tabRegia_en", label: "Tab 3: Direction (EN)" },
          { type: "string", name: "tabMosaico_en", label: "Tab 4: Mosaic (EN)" },
          { type: "string", name: "filterFoto1_en", label: "Photo Filter 1 (EN)" },
          { type: "string", name: "filterFoto2_en", label: "Photo Filter 2 (EN)" },
          { type: "string", name: "filterVideoAll_en", label: "Video Filter: All (EN)" },
          { type: "string", name: "filterVideo1_en", label: "Video Filter 1 (EN)" },
          { type: "string", name: "filterVideo2_en", label: "Video Filter 2 (EN)" },
          { type: "string", name: "descFoto1_en", label: "Portrait Intro Text (EN)", ui: { component: "textarea" } },
          { type: "string", name: "descFoto2_en", label: "Narrative Intro Text (EN)", ui: { component: "textarea" } },
        ],
      },

      {
        name: "blogPage",
        label: "Impostazioni Testatina Pagina Blog",
        path: "content",
        format: "json",
        match: { include: "blog" },
        ui: {
          global: true,
          router: () => "/blog",
          allowedActions: {
            create: false,
            delete: false,
          },
        },
        fields: [
          { type: "boolean", name: "attivata", label: "Pagina Blog Attivata?", description: "Se disattivata, la pagina blog non sarà visibile ai visitatori (redirect a /)." },
          // ── Italiano ──
          { type: "string", name: "label", label: "Label Superiore (IT)" },
          { type: "string", name: "title", label: "Titolo Pagina (IT)" },
          { type: "string", name: "emptyMessage", label: "Messaggio nessun articolo (IT)" },
          { type: "string", name: "readMoreLabel", label: "Testo 'Leggi articolo...' (IT)" },
          // ── English ──
          { type: "string", name: "label_en", label: "Top Label (EN)" },
          { type: "string", name: "title_en", label: "Page Title (EN)" },
          { type: "string", name: "emptyMessage_en", label: "Empty state message (EN)" },
          { type: "string", name: "readMoreLabel_en", label: "'Read article...' text (EN)" },
        ],
      },
    ],
  },
});

// trigger indexing
