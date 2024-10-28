import { relations } from "drizzle-orm";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { products } from "./products";

export const categories = sqliteTable('category', {
    id: integer('id').primaryKey({ autoIncrement: true }),
    name: text('name').notNull(),
})


export const categoryRelations = relations(categories, ({ many }) => ({
    products: many(products)
}))