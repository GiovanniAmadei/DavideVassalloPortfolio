import { defineField, defineType } from 'sanity'
import { PlayIcon } from '@sanity/icons'

export const progettoVideoType = defineType({
    name: 'progettoVideo',
    title: 'Progetti Video (Regia / Videomaking)',
    type: 'document',
    icon: PlayIcon,
    groups: [
        { name: 'generale', title: 'Generale' },
        { name: 'media', title: 'Media e Copertina' },
        { name: 'dettagli', title: 'Dettagli e Testi' },
    ],
    fields: [
        defineField({
            name: 'title',
            title: 'Titolo del Progetto',
            type: 'string',
            group: 'generale',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'src',
            title: 'Immagine Copertina',
            type: 'image',
            group: 'media',
            options: { hotspot: true },
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'categoriaString',
            title: 'Categoria (Tag)',
            type: 'string',
            group: 'generale',
            description: 'Es: videomaking, regia, reportage. (Tutto minuscolo)',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'description',
            title: 'Descrizione',
            type: 'text',
            group: 'dettagli',
            description: 'Testo di descrizione per la card/lightbox.',
        }),
        defineField({
            name: 'metadata',
            title: 'Metadati (Anno, Durata, Tipo)',
            type: 'string',
            group: 'dettagli',
            description: 'Es: 2025 • 3 Min • Fashion',
        }),
        defineField({
            name: 'logline',
            title: 'Logline / Breve Riassunto',
            type: 'text',
            group: 'dettagli',
            description: 'Testo breve (1-2 righe) mostrato nella preview card.',
        }),
        defineField({
            name: 'url',
            title: 'Link (URL)',
            type: 'string',
            group: 'generale',
            description: 'Es. project-detail.html',
        }),
        defineField({
            name: 'isPreviewCard',
            title: 'Mostra come Card Dettagliata?',
            type: 'boolean',
            group: 'generale',
            initialValue: true,
            description: 'Se attivo, nella griglia video comparirà il testo sopra l\'immagine al passaggio del mouse.',
        }),
        defineField({
            name: 'ordine',
            title: 'Ordine in Galleria',
            type: 'number',
            group: 'generale',
            description: 'Numero più basso = compare prima in alto.',
        }),
    ],
    preview: {
        select: {
            title: 'title',
            media: 'src',
            subtitle: 'logline',
        },
    },
    orderings: [
        {
            title: 'Ordine in Galleria',
            name: 'galleriaOrder',
            by: [
                { field: 'ordine', direction: 'asc' },
                { field: '_createdAt', direction: 'desc' },
            ]
        }
    ]
})
