import { useAuth } from "~/server/utils/middleware/auth";
import { z } from 'zod'

const bodyZod = z.object({
    name: z.string().min(1).max(20),
    price: z.number().positive(),
    description: z.string().min(1).max(60).nullable(),
    image: z.string().max(255).nullable(),
    categoryId: z.number().int().positive()
})

export default defineEventHandler({ 
    onRequest: async (event) => await useAuth(event),

    handler: async (event) => {
        const body: z.infer<typeof bodyZod> = await readBody(event)

        try {
            bodyZod.parse(body)
        } catch(err){
            throw createError({ status: 400, data: err, stack: '' })
        }

        const category = await useDrizzle().query.categories.findFirst({
            where: eq(tables.categories.id, body.categoryId)
        })

        if(!category)
            throw createError({ status: 400, message: 'Category not found', stack: '' })

        const product = await useDrizzle().insert(tables.products).values({
            name: body.name,
            price: body.price,
            description: body?.description,
            image: body?.image,
            categoryId: category.id
        }).returning()


        return { product: product[0] }
    }
    
})