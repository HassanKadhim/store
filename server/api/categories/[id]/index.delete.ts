import { useAuth } from "~/server/utils/middleware/auth";

export default defineEventHandler({ 
    onRequest: async (event) => await useAuth(event),

    handler: async (event) => {
        const { id } = getRouterParams(event)

        const category = await useDrizzle().query.categories.findFirst({
            where: eq(tables.categories.id, Number(id))
        })

        if(!category)
            throw createError({ status: 404, message: 'Category not found', stack: '' })

        await useDrizzle().delete(tables.categories).where(
            eq(tables.categories.id, Number(id))
        )


        return { msg: 'Category deleted' }
    } 
    
})