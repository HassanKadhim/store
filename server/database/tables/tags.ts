import { relations } from "drizzle-orm";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { productsToTags } from "./products";

export const tags = sqliteTable('tags' , {
    id: integer('id').primaryKey({ autoIncrement: true }),
    name: text('name').notNull(),
})

export const tagRelations = relations(tags, ({ many }) => ({
    products: many(productsToTags)
}))