export default defineEventHandler(async (event) => {

    const { name } = getQuery(event) as { name?: string }
    

    const categories = await useDrizzle()
        .query.categories.findMany({
            where: name ? eq(tables.categories.name, name) : undefined,
        })


    return { categories }
})