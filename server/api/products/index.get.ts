export default defineEventHandler(async (event) => {
    const products = await useDrizzle()
    .query.products.findMany({ 
        with: { 
            category: true, 
            tags: { with: { tag: true } } 
        }
    })


    return { products }
})