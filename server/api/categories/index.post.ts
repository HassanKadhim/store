import { useAuth } from "~/server/utils/middleware/auth";
import { z } from 'zod'

const bodyZod = z.object({
    name: z.string().min(1).max(20)
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

        const category = await useDrizzle().insert(tables.categories).values({
            name: body.name
        }).returning()


        return { category:category[0] }
    }
    
})