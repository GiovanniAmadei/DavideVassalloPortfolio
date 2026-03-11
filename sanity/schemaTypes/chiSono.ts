import { defineField, defineType } from 'sanity'
import { UserIcon } from '@sanity/icons'

export const chiSonoType = defineType({
    name: 'chiSono',
    title: 'Chi Sono',
    type: 'document',
    icon: UserIcon,
    groups: [
        { name: 'profilo', title: 'Profilo' },
        { name: 'biografia', title: 'Biografia' },
        { name: 'curriculum', title: 'Curriculum & Esperienze' },
    ],
    fields: [
        defineField({
            name: 'titolo',
            title: 'Titolo Principale',
            type: 'string',
            group: 'profilo',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'sottotitolo',
            title: 'Sottotitolo (es. Ruolo)',
            type: 'string',
            group: 'profilo',
        }),
        defineField({
            name: 'descrizione',
            title: 'Descrizione / Biografia',
            type: 'array',
            group: 'biografia',
            of: [{ type: 'block' }],
        }),
        defineField({
            name: 'fotoProfilo',
            title: 'Foto Profilo',
            type: 'image',
            group: 'profilo',
            options: {
                hotspot: true,
            },
            fields: [
                {
                    name: 'alt',
                    type: 'string',
                    title: 'Testo Alternativo',
                }
            ]
        }),
        defineField({
            name: 'esperienze',
            title: 'Esperienze e Mostre',
            type: 'array',
            group: 'curriculum',
            of: [
                {
                    type: 'object',
                    fields: [
                        { name: 'anno', type: 'string', title: 'Anno' },
                        { name: 'titolo', type: 'string', title: 'Titolo' },
                        { name: 'luogo', type: 'string', title: 'Luogo (Opzionale)' }
                    ]
                }
            ]
        }),
    ],
    preview: {
        select: {
            title: 'titolo',
            media: 'fotoProfilo'
        },
        prepare({ title, media }) {
            return {
                title: title || 'Impostazioni Chi Sono',
                media
            }
        }
    }
})
