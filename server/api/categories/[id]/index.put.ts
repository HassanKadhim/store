import { useAuth } from "~/server/utils/middleware/auth";
import { z } from 'zod'

const bodyZod = z.object({
    name: z.string().min(1).max(20).nullable()
})

export default defineEventHandler({
    onRequest: async (event) => await useAuth(event),

    handler: async (event) => {
        const body: z.infer<typeof bodyZod> = await readBody(event)

        try {
            bodyZod.parse(body)
        } catch (err) {
            throw createError({ status: 400, data: err, stack: '' })
        }

        const { id } = getRouterParams(event)


        const category = await useDrizzle().query.categories.findFirst({
            where: eq(tables.categories.id, Number(id))
        })

        if (!category)
            throw createError({ status: 404, message: 'Category not found', stack: '' })

        await useDrizzle().update(tables.categories).set({
            name: body?.name ?? category.name
        }).where(eq(tables.categories.id, category.id))

        return { msg: 'Category updated' }
    } 

})