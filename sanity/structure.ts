import type { StructureResolver } from 'sanity/structure'
import { ImageIcon, PlayIcon, FolderIcon, UserIcon, EnvelopeIcon, DocumentIcon } from '@sanity/icons'

// https://www.sanity.io/docs/structure-builder-cheat-sheet
export const structure: StructureResolver = (S) =>
  S.list()
    .title('Contenuti del Sito')
    .items([
      // Lavori Fotografici
      S.listItem()
        .title('Fotografia')
        .icon(ImageIcon)
        .child(S.documentTypeList('fotografia').title('Archivio Fotografico')),

      // Lavori Video
      S.listItem()
        .title('Regia & Videomaking')
        .icon(PlayIcon)
        .child(S.documentTypeList('progettoVideo').title('Progetti Video')),

      S.divider(),

      // Tassonomie (Categorie usate in Home/Lavori)
      S.listItem()
        .title('Categorie Portfolio')
        .icon(FolderIcon)
        .child(S.documentTypeList('categoria').title('Categorie')),

      S.divider(),

      // Pagine Statiche (Singleton)
      S.listItem()
        .title('Pagine Sito')
        .icon(DocumentIcon)
        .child(
          S.list()
            .title('Pagine')
            .items([
              S.listItem()
                .title('Chi Sono')
                .id('chiSono')
                .icon(UserIcon)
                .child(S.document().schemaType('chiSono').documentId('chiSono')),

              S.listItem()
                .title('Contatti')
                .id('contatti')
                .icon(EnvelopeIcon)
                .child(S.document().schemaType('contatti').documentId('contatti')),
            ])
        ),
    ])
