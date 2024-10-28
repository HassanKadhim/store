export default defineEventHandler(async(event) => {
    const { id } = getRouterParams(event)

    const product = await useDrizzle()
        .query.products.findFirst({
            where: eq(tables.products.id, Number(id)),

            with: { category: true, tags: { with: { tag: true } } }
        })

    if(!product)
        throw createError({ status: 404, message: 'Product not found', stack: '' })

    return { product }
})