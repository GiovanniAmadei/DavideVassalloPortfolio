// tina/config.ts
import { defineConfig } from "tinacms";
var config_default = defineConfig({
  // In locale non serve account TinaCloud.
  // Per la produzione su Vercel, configura clientId e token su app.tina.io
  clientId: process.env.NEXT_PUBLIC_TINA_CLIENT_ID || "",
  branch: process.env.NEXT_PUBLIC_TINA_BRANCH || process.env.NEXT_PUBLIC_VERCEL_GIT_COMMIT_REF || "main",
  token: process.env.TINA_TOKEN || "",
  build: {
    outputFolder: "admin",
    publicFolder: "public"
  },
  media: {
    tina: {
      mediaRoot: "uploads",
      publicFolder: "public"
    }
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
            delete: true
          }
        },
        fields: [
          {
            type: "string",
            name: "title",
            label: "Titolo",
            isTitle: true,
            required: true
          },
          {
            type: "string",
            name: "slug",
            label: "Slug (URL)",
            required: true
          },
          {
            type: "datetime",
            name: "publishedAt",
            label: "Data di Pubblicazione"
          },
          {
            type: "image",
            name: "mainImage",
            label: "Immagine Principale"
          },
          {
            type: "string",
            name: "categories",
            label: "Categoria"
          },
          {
            type: "rich-text",
            name: "body",
            label: "Contenuto",
            isBody: true
          }
        ]
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
            delete: false
          }
        },
        fields: [
          {
            type: "string",
            name: "titolo",
            label: "Titolo Principale",
            required: true
          },
          {
            type: "string",
            name: "sottotitolo",
            label: "Sottotitolo (es. Ruolo)"
          },
          {
            type: "rich-text",
            name: "descrizione",
            label: "Descrizione / Biografia"
          },
          {
            type: "image",
            name: "fotoProfilo",
            label: "Foto Profilo"
          },
          {
            type: "object",
            name: "esperienze",
            label: "Esperienze e Mostre",
            list: true,
            fields: [
              { type: "string", name: "anno", label: "Anno" },
              { type: "string", name: "titolo", label: "Titolo" },
              { type: "string", name: "luogo", label: "Luogo (Opzionale)" }
            ]
          },
          {
            type: "string",
            name: "filosofiaTitolo",
            label: "Titolo Sezione Filosofia"
          },
          {
            type: "string",
            name: "filosofiaCitazione",
            label: "Citazione Filosofia",
            ui: { component: "textarea" }
          },
          {
            type: "string",
            name: "filosofiaAutore",
            label: "Autore Citazione"
          },
          {
            type: "string",
            name: "filosofiaDescrizione",
            label: "Descrizione Filosofia",
            ui: { component: "textarea" }
          }
        ]
      },
      // ─── FOTOGRAFIE ──────────────────────────────────────────────
      {
        name: "fotografia",
        label: "Fotografie",
        path: "content/fotografie",
        format: "json",
        ui: {
          router: () => "/portfolio"
        },
        fields: [
          {
            type: "string",
            name: "title",
            label: "Titolo (Opzionale)"
          },
          {
            type: "image",
            name: "src",
            label: "Immagine",
            required: true
          },
          {
            type: "string",
            name: "categoriaString",
            label: "Categoria (Tag)",
            required: true
          },
          {
            type: "string",
            name: "description",
            label: "Descrizione Lightbox",
            ui: { component: "textarea" }
          },
          {
            type: "string",
            name: "metadata",
            label: "Metadati (es. Fotocamera)"
          },
          {
            type: "number",
            name: "ordine",
            label: "Ordine in Galleria"
          }
        ]
      },
      // ─── PROGETTI VIDEO ──────────────────────────────────────────
      {
        name: "progettoVideo",
        label: "Progetti Video",
        path: "content/video",
        format: "json",
        ui: {
          router: () => "/portfolio"
        },
        fields: [
          {
            type: "string",
            name: "title",
            label: "Titolo del Progetto",
            isTitle: true,
            required: true
          },
          {
            type: "image",
            name: "src",
            label: "Immagine Copertina",
            required: true
          },
          {
            type: "string",
            name: "categoriaString",
            label: "Categoria (Tag)",
            required: true
          },
          {
            type: "string",
            name: "description",
            label: "Descrizione",
            ui: { component: "textarea" }
          },
          {
            type: "string",
            name: "metadata",
            label: "Metadati (Anno, Durata, Tipo)"
          },
          {
            type: "string",
            name: "logline",
            label: "Logline / Breve Riassunto",
            ui: { component: "textarea" }
          },
          {
            type: "string",
            name: "url",
            label: "Link (URL)"
          },
          {
            type: "boolean",
            name: "isPreviewCard",
            label: "Mostra come Card Dettagliata?"
          },
          {
            type: "number",
            name: "ordine",
            label: "Ordine in Galleria"
          }
        ]
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
            delete: false
          }
        },
        fields: [
          {
            type: "string",
            name: "email",
            label: "Email",
            required: true
          },
          {
            type: "string",
            name: "telefono",
            label: "Telefono"
          },
          {
            type: "string",
            name: "instagram",
            label: "Link Instagram"
          },
          {
            type: "string",
            name: "linkedin",
            label: "Link LinkedIn"
          },
          {
            type: "string",
            name: "indirizzoStudio",
            label: "Indirizzo Studio",
            ui: { component: "textarea" }
          },
          {
            type: "string",
            name: "titoloPagina",
            label: "Titolo Pagina Principale"
          },
          {
            type: "string",
            name: "sottotitoloPagina",
            label: "Sottotitolo Pagina"
          },
          {
            type: "string",
            name: "titoloSezione",
            label: "Titolo Sezione Contatti"
          },
          {
            type: "string",
            name: "testoSottoTitolo",
            label: "Testo Sotto Titolo"
          },
          {
            type: "string",
            name: "orariRitratto",
            label: "Testo Orari Ritratto"
          },
          {
            type: "string",
            name: "orariReportage",
            label: "Testo Orari Reportage"
          },
          {
            type: "string",
            name: "orariRicerca",
            label: "Testo Orari Ricerca"
          },
          { type: "string", name: "formName", label: "Etichetta Form: Nome" },
          { type: "string", name: "formEmail", label: "Etichetta Form: Email" },
          { type: "string", name: "formSubject", label: "Etichetta Form: Oggetto/Tipo Progetto" },
          { type: "string", name: "formMessage", label: "Etichetta Form: Messaggio" },
          { type: "string", name: "formSubmit", label: "Etichetta Form: Pulsante Invia" }
        ]
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
            delete: false
          }
        },
        fields: [
          {
            type: "string",
            name: "email",
            label: "Email Footer",
            required: true
          },
          {
            type: "string",
            name: "telefono",
            label: "Telefono Footer"
          },
          {
            type: "string",
            name: "indirizzo",
            label: "Indirizzo Footer"
          },
          {
            type: "string",
            name: "copyright",
            label: "Testo Copyright"
          },
          {
            type: "string",
            name: "instagram",
            label: "Link Instagram"
          },
          {
            type: "string",
            name: "linkedin",
            label: "Link LinkedIn"
          },
          { type: "string", name: "logoName", label: "Nome Logo Header" },
          { type: "string", name: "navHome", label: "Menu: Home" },
          { type: "string", name: "navPortfolio", label: "Menu: Portfolio" },
          { type: "string", name: "navBlog", label: "Menu: Blog" },
          { type: "string", name: "navAbout", label: "Menu: Chi Sono" },
          { type: "string", name: "navContact", label: "Menu: Contatti" },
          { type: "string", name: "navSubFotografia", label: "Sottomenu Portfolio: Fotografia" },
          { type: "string", name: "navSubVideomaking", label: "Sottomenu Portfolio: Videomaking" },
          { type: "string", name: "navSubRegia", label: "Sottomenu Portfolio: Regia" },
          { type: "string", name: "navSubMosaico", label: "Sottomenu Portfolio: Mosaico" }
        ]
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
            delete: false
          }
        },
        fields: [
          {
            type: "object",
            name: "heroBands",
            label: "Pannelli Hero Iniziali",
            list: true,
            ui: {
              itemProps: (item) => {
                return { label: item?.title || "Nuovo Pannello" };
              }
            },
            fields: [
              { type: "string", name: "title", label: "Titolo Pannello" },
              { type: "string", name: "href", label: "Link Pannello (Es. /portfolio#fotografia)" },
              { type: "image", name: "images", label: "Immagini Slider", list: true }
            ]
          },
          { type: "string", name: "chiSonoLabel", label: "Testatatina Chi Sono" },
          { type: "string", name: "chiSonoPreviewTitle", label: "Titolo Chi Sono (Preview Home)" },
          { type: "string", name: "chiSonoPreviewText1", label: "Paragrafo 1 Chi Sono (Preview Home)", ui: { component: "textarea" } },
          { type: "string", name: "chiSonoPreviewText2", label: "Paragrafo 2 Chi Sono (Preview Home)", ui: { component: "textarea" } },
          { type: "string", name: "blogLabel", label: "Testatina Blog" },
          { type: "string", name: "mosaicoLabel", label: "Testatina Mosaico" },
          { type: "string", name: "ctaBlog", label: "Testo Pulsante Blog" },
          { type: "string", name: "ctaMosaico", label: "Testo Pulsante Mosaico" }
        ]
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
            delete: false
          }
        },
        fields: [
          { type: "string", name: "tabFotografia", label: "Titolo Tab 1 (Fotografia)" },
          { type: "string", name: "tabVideomaking", label: "Titolo Tab 2 (Videomaking)" },
          { type: "string", name: "tabRegia", label: "Titolo Tab 3 (Regia)" },
          { type: "string", name: "tabMosaico", label: "Titolo Tab 4 (Mosaico)" },
          { type: "string", name: "filterFoto1", label: "Filtro Foto 1 (Es. Ritratti)" },
          { type: "string", name: "filterFoto2", label: "Filtro Foto 2 (Es. Narrazione)" },
          { type: "string", name: "filterVideoAll", label: "Filtro Video Generale (Es. Tutto)" },
          { type: "string", name: "filterVideo1", label: "Filtro Video 1 (Es. Reportage)" },
          { type: "string", name: "filterVideo2", label: "Filtro Video 2 (Es. Ricerca)" },
          { type: "image", name: "imagesFoto1", label: "Immagini Slider Foto 1 (Es. Ritratti)", list: true },
          { type: "image", name: "imagesFoto2", label: "Immagini Slider Foto 2 (Es. Narrazione)", list: true }
        ]
      },
      {
        name: "blogPage",
        label: "Impostazioni Testatina Pagina Blog",
        path: "content",
        format: "json",
        match: { include: "blog" },
        ui: {
          router: () => "/blog",
          allowedActions: {
            create: false,
            delete: false
          }
        },
        fields: [
          { type: "string", name: "label", label: "Label Superiore (es. Editoriale)" },
          { type: "string", name: "title", label: "Titolo Pagina (es. Blog)" },
          { type: "string", name: "emptyMessage", label: "Messaggio se non ci sono articoli" },
          { type: "string", name: "readMoreLabel", label: "Testo 'Leggi articolo...' sulle card" }
        ]
      }
    ]
  }
});
export {
  config_default as default
};
