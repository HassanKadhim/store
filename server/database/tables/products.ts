import { integer, real, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { categories } from "./categories";
import { tags } from "./tags";
import { relations } from "drizzle-orm";

export const products = sqliteTable('product', {
    id: integer('id').primaryKey({ autoIncrement: true }),
    name: text('name').notNull(),
    price: real('price').notNull(),
    description: text('description'),
    image: text('image'),

    //* Foreign keys
    categoryId: integer('categoryId').references(() => 
        categories.id, { onDelete: 'cascade' }
    )
})

export const productsToTags = sqliteTable('productsToTags', {
    id: integer('id').primaryKey({ autoIncrement: true }),

    //* Foreign keys
    productId: integer('productId').references(() => 
        products.id, { onDelete: 'cascade' }
    ),

    tagId: integer('tagId').references(() => 
        tags.id, { onDelete: 'cascade' }
    )
})


export const productRelations = relations(products, ({ one, many }) => ({
    category: one(categories, { 
        fields: [ products.categoryId ],
        references: [ categories.id ],
        relationName: 'category'
    }),
    tags: many(productsToTags)
}))

export const productToTagRelations = relations(productsToTags, ({ one }) => ({
    product: one(products, {
        fields: [ productsToTags.productId ],
        references: [ products.id ],
        relationName: 'product'
    }),
    tag: one(tags, {
        fields: [ productsToTags.tagId ],
        references: [ tags.id ],
        relationName: 'tag'
    })
}))