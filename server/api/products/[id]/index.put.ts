import { useAuth } from "~/server/utils/middleware/auth";
import { z } from 'zod'


const bodyZod = z.object({
    name: z.string().min(1).max(20).nullable(),
    price: z.number().positive().nullable(),
    description: z.string().min(1).max(60).nullable(),
    image: z.string().max(255).nullable(),
    categoryId: z.number().nullable()
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


        const product = await useDrizzle().query.products.findFirst({
            where: eq(tables.products.id, Number(id))
        })

        if (!product)
            throw createError({ status: 404, message: 'Product not found', stack: '' })

        const category =
            body?.categoryId
                ? await useDrizzle().query.categories.findFirst({
                    where: eq(tables.categories.id, body.categoryId)
                })
                : null

        if (!category && body?.categoryId)
            throw createError({ status: 400, message: 'Category not found', stack: '' })

        await useDrizzle().update(tables.products).set({
            categoryId: category ? category.id : product.categoryId,
            name: body?.name ?? product.name,
            description: body?.description ?? product.description,
            price: body?.price ?? product.price,
            image: body?.image ?? product.image
        }).where(eq(tables.products.id, product.id))

        return { msg: 'Product updated' }
    } 

})