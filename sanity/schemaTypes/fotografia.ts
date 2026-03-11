import { defineField, defineType } from 'sanity'
import { ImageIcon } from '@sanity/icons'

export const fotografiaType = defineType({
    name: 'fotografia',
    title: 'Lavori / Fotografie',
    type: 'document',
    icon: ImageIcon,
    groups: [
        { name: 'generale', title: 'Dati Generali' },
        { name: 'media', title: 'Immagine' },
        { name: 'organizzazione', title: 'Organizzazione' },
    ],
    fields: [
        defineField({
            name: 'title',
            title: 'Titolo (Opzionale)',
            type: 'string',
            group: 'generale',
            description: 'Mostrato nella griglia e nella Lightbox.'
        }),
        defineField({
            name: 'src',
            title: 'Immagine',
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
            description: 'Es: ritratti, narrazione, ecc. (Tutto minuscolo)',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'description',
            title: 'Descrizione Lightbox',
            type: 'text',
            group: 'generale',
            description: 'Mostrato sotto al titolo quando si apre la foto ingrandita.',
        }),
        defineField({
            name: 'metadata',
            title: 'Metadati (es. Fotocamera)',
            type: 'string',
            group: 'generale',
            description: 'Es: Nikon Z9, 85mm, f/1.8, 1/200s, ISO 100',
        }),
        defineField({
            name: 'ordine',
            title: 'Ordine in Galleria',
            type: 'number',
            group: 'organizzazione',
            description: 'Numero più basso = compare prima. Lasciare vuoto per ordine implicito.',
        })
    ],
    preview: {
        select: {
            title: 'title',
            media: 'src',
            categoryName: 'categoriaString',
        },
        prepare({ title, media, categoryName }) {
            return {
                title: title || 'Senza Titolo',
                subtitle: categoryName ? `Categoria: ${categoryName}` : 'Nessuna Categoria',
                media,
            }
        },
    },
    orderings: [
        {
            title: 'Ordine in Galleria',
            name: 'galleriaOrder',
            by: [
                { field: 'ordine', direction: 'asc' },
                { field: '_createdAt', direction: 'desc' }
            ]
        }
    ]
})
