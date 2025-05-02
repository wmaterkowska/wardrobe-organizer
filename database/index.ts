import { Database } from '@nozbe/watermelondb'
import SQLiteAdapter from '@nozbe/watermelondb/adapters/sqlite'

import schema from '../model/schema'
import migrations from '../model/migrations'

import { Item } from './models/Item'
import { Category } from './models/Category'
import { Color } from './models/Color'
import { Cut } from './models/Cut'
import { ItemCut } from './models/ItemCut'
import { Textile } from './models/Textile'
import { Occasion } from './models/Occasion'

const adapter = new SQLiteAdapter({
    schema,
    migrations,
    dbName: 'wardrobe',
    jsi: true,
    onSetUpError: error => {
        "Database failed to load"
    },
})

const database = new Database({
    adapter,
    modelClasses: [Item, Category, Color, Cut, ItemCut, Textile, Occasion],
    actionsEnabled: true,
})

export { default as Item } from './models/Item'
export { default as Category } from './models/Category'
export { default as Color } from './models/Color'
export { default as Cut } from './models/Cut'
export { default as ItemCut } from './models/ItemCut'
export { default as Textile } from './models/Textile'
export { default as Occasion } from './models/Occasion'

