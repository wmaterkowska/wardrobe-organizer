import { appSchema, tableSchema } from '@nozbe/watermelondb'

export default appSchema({
  version: 1,
  tables: [
    // We'll add tableSchemas here later
    tableSchema({
        name: 'items',
        columns: [
            { name: 'item', type: 'string' },
//            { name: 'category', type: 'array' },
            { name: 'image_uri', type: 'string' }
//            { name: 'color', type: 'array' },
//            { name: 'cut', type: 'array', isOptional: true },
//            { name: 'textile', type: 'array', isOptional: true },
            { name: 'comfort', type: 'number', isOptional: true },
//            { name: 'occasion', type 'array', isOptional: true },
        ],
    },
    {
        name: 'categories',
        columns: [
            { name: 'category_name', type: 'string' },
            { name: 'item_id', type: 'string', isIndexed: true },
        ]
    },
    {
        name: 'colors',
        columns: [
            { name: 'color_name', type: 'string' },
            { name: 'RGB_code', type: 'string' },
            { name: 'item_id', type: 'string', isIndexed: true },
        ]
    },
    {
        name: 'cuts',
        columns: [
            { name: 'cut_name', type: 'string' },
            { name: 'item_id', type: 'string', isIndexed: true },
        ]
    },
    {
        name: 'textiles',
        columns: [
            { name: 'textile_name', type: 'string' },
            { name: 'item_id', type: 'string', isIndexed: true },
        ]
    },
    {
        name: 'occasions',
        columns: [
            { name: 'occasion_name', type: 'string' },
            { name: 'item_id', type: 'string', isIndexed: true },
        ]
    }
    ),
  ],
});