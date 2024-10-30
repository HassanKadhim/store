export default defineEventHandler(async (event) => {
    const { name } = getQuery(event) as { name?: string }

    const products = await useDrizzle()
    .query.products.findMany({ 
        where: name ? eq(tables.products.name, name) : undefined,
        with: { 
            category: true, 
            tags: { with: { tag: true } } 
        }
    })


    return { products }
})