import { defineField, defineType } from 'sanity'
import { FolderIcon } from '@sanity/icons'

export const categoriaType = defineType({
    name: 'categoria',
    title: 'Categorie',
    type: 'document',
    icon: FolderIcon,
    fields: [
        defineField({
            name: 'titolo',
            title: 'Titolo Categoria',
            type: 'string',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'slug',
            title: 'Identificativo URL (Slug)',
            type: 'slug',
            options: {
                source: 'titolo',
                maxLength: 96,
            },
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'descrizione',
            title: 'Descrizione Categoria',
            type: 'text',
            description: 'Testo mostrato sopra la galleria dei lavori per questa categoria',
        }),
        defineField({
            name: 'ordine',
            title: 'Ordine di visualizzazione',
            type: 'number',
            description: 'Es: 1 apparirà prima di 2',
            initialValue: 0
        })
    ],
    orderings: [
        {
            title: 'Ordine manuale',
            name: 'manualOrder',
            by: [
                { field: 'ordine', direction: 'asc' }
            ]
        }
    ]
})
