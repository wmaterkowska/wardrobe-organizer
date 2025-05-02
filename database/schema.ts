
export const ItemSchema: Realm.ObjectSchema = {
    name: 'Item',
    primaryKey: 'id',
    properties: {
        id: 'string',
        item_name: 'string',
        image_uri: 'string?',
        category: 'Category?',
        colors: 'Color[]?',
        cuts: {
            type: 'linkingObjects',
            objectType: 'ItemCut',
            property: 'item',
        },
        textiles: 'Textile[]?',
        comfort: 'number?',
        occasions: 'Occasion[]?',
    },
};

export const CategorySchema: Realm.ObjectSchema = {
    name: 'Category',
    primaryKey: 'id',
    properties: {
        id: 'string',
        category_name: 'string',
        cuts: { type: 'linkingObjects', objectType: 'Cut', property: 'category' },
    },
};

export const CutSchema: Realm.ObjectSchema = {
    name: 'Cut',
    primaryKey: 'id',
    properties: {
        id: 'string',
        cut_name: 'string',
        category: 'Category',
        items: {
            type: 'linkingObjects',
            objectType: 'ItemCut',
            property: 'cut',
        }
    },
};

export const ItemCutSchema: Realm.ObjectSchema = {
    name: 'ItemCut',
    primaryKey: 'id',
    properties: {
        id: 'string',
        item: 'Item',
        cut: 'Cut'
    },
};

export const ColorSchema: Realm.ObjectSchema = {
    name: 'Color',
    primaryKey: 'id',
    properties: {
        id: 'string',
        color_name: 'string',
        RGB_code: 'string',
    },
};

export const TextileSchema: Realm.ObjectSchema = {
        name: 'Textile',
        primaryKey: 'id',
        properties: {
            id: 'string',
            textile_name: 'string',
    },
};

export const OccasionSchema: Realm.ObjectSchema = {
        name: 'Occasion',
        primaryKey: 'id',
        properties: {
            id: 'string',
            occasion_name: 'string',
        },
};