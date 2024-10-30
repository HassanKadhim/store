export default defineEventHandler(async(event) => {
    const { id } = getRouterParams(event)

    const category = await useDrizzle()
        .query.categories.findFirst({
            where: eq(tables.categories.id, Number(id)),

            with: { products: true }
        })

    if(!category)
        throw createError({ status: 404, message: 'Category not found', stack: '' })

    return { category }
})