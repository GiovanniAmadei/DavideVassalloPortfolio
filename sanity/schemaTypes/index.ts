import { type SchemaTypeDefinition } from 'sanity'

import { chiSonoType } from './chiSono'
import { contattiType } from './contatti'
import { categoriaType } from './categoria'
import { fotografiaType } from './fotografia'
import { progettoVideoType } from './progettoVideo'
import { postType } from './postType'
import { authorType } from './authorType'
import { categoryType } from './categoryType'
import { blockContentType } from './blockContentType'

export const schema: { types: SchemaTypeDefinition[] } = {
    types: [
        chiSonoType, 
        contattiType, 
        categoriaType, 
        fotografiaType, 
        progettoVideoType,
        postType,
        authorType,
        categoryType,
        blockContentType
    ],
}
