import { H3Event } from 'h3'
import jwt from 'jsonwebtoken'

export async function useAuth(event: H3Event){
    const { token } = getHeaders(event)

    if(!token)
        throw createError({ status: 401, message: 'Unauthorized', stack: '' })

    const payload = jwt.verify(token, process.env.JWT_SECRET || 'secret') as { id: number }

    const user = await useDrizzle().query.users.findFirst({
        where: eq(tables.users.id, payload.id)
    })

    if(!user)
        throw createError({ status: 401, message: 'Unauthorized', stack: '' })

    event.context['user'] = user
}