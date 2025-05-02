
export const ItemSchema: Realm.ObjectSchema = {
    name: 'Item',
    primaryKey: 'id',
    properties: {
        id: 'string',
        item_name: 'string',
        image_uri: 'string?',
        category: 'Category?',
        colors: 'Color[]?',
        cuts: 'Cut[]?',
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
        cuts: 'Cut[]?',
    },
};

export const CutSchema: Realm.ObjectSchema = {
    name: 'Cut',
    primaryKey: 'id',
    properties: {
        cut_name: 'string',
        category: 'Category',
    },
};

export const ColorSchema: Realm.ObjectSchema = {
    name: 'Color',
    primaryKey: 'id',
    properties: {
        color_name: 'string',
        RGB_code: 'string',
    },
};

export const TextileSchema: Realm.ObjectSchema = {
        name: 'Textile',
        primaryKey: 'id',
        properties: {
            textile_name: 'string',
    },
};

export const OccasionSchema: Realm.ObjectSchema = {
        name: 'Occasion',
        primaryKey: 'id',
        properties: {
            occasion_name: 'string',
        },
};