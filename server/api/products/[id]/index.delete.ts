import { useAuth } from "~/server/utils/middleware/auth";

export default defineEventHandler({ 
    onRequest: async (event) => await useAuth(event),

    handler: async (event) => {
        const { id } = getRouterParams(event)

        const product = await useDrizzle().query.products.findFirst({
            where: eq(tables.products.id, Number(id))
        })

        if(!product)
            throw createError({ status: 404, message: 'Product not found', stack: '' })

        await useDrizzle().delete(tables.products).where(
            eq(tables.products.id, Number(id))
        )


        return { msg: 'Product deleted' }
    } 
    
})