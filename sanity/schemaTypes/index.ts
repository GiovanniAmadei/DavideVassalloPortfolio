import { type SchemaTypeDefinition } from 'sanity'

import { chiSonoType } from './chiSono'
import { contattiType } from './contatti'
import { categoriaType } from './categoria'
import { fotografiaType } from './fotografia'
import { progettoVideoType } from './progettoVideo'

export const schema: { types: SchemaTypeDefinition[] } = {
    types: [chiSonoType, contattiType, categoriaType, fotografiaType, progettoVideoType],
}
