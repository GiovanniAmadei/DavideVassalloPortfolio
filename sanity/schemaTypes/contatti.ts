import { defineField, defineType } from 'sanity'
import { EnvelopeIcon } from '@sanity/icons'

export const contattiType = defineType({
    name: 'contatti',
    title: 'Contatti Generali',
    type: 'document',
    icon: EnvelopeIcon,
    fields: [
        defineField({
            name: 'email',
            title: 'Email',
            type: 'string',
            validation: (Rule) => Rule.required().email(),
        }),
        defineField({
            name: 'telefono',
            title: 'Telefono',
            type: 'string',
        }),
        defineField({
            name: 'instagram',
            title: 'Link Instagram',
            type: 'url',
        }),
        defineField({
            name: 'linkedin',
            title: 'Link LinkedIn',
            type: 'url',
        }),
        defineField({
            name: 'indirizzoStudio',
            title: 'Indirizzo Studio',
            type: 'text',
        }),
    ],
    preview: {
        prepare() {
            return {
                title: 'Impostazioni Contatti',
            }
        }
    }
})
