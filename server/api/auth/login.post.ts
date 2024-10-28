import { z } from 'zod'
import { compare } from 'bcrypt'
import jwt from 'jsonwebtoken'

const bodyZod = z.object({
    email: z.string().email(),
    password: z.string().min(6).max(20)
})

export default defineEventHandler(async (event) => {
    const body: z.infer<typeof bodyZod> = await readBody(event)

    try{
        bodyZod.parse(body)
    } catch(err){
        throw createError({ status: 400, data: err , stack: '' })
    }

    const user = await useDrizzle()
        .query.users.findFirst({
            where: eq(tables.users.email, body.email)
        })

    if(!user)
        throw createError({ status: 401, message: 'Invalid email or password', stack: '' })

    if(!await compare(body.password, user.password)){
        throw createError({ status: 401, message: 'Invalid email or password', stack: '' })
    }

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET || 'secret' , { expiresIn: '7d' })


    return { token }
})