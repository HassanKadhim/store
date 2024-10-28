import { useAuth } from "~/server/utils/middleware/auth";

export default defineEventHandler({ 
    onRequest: async (event) => await useAuth(event),

    handler: (event) => {
        const user = event.context['user']
        return { user }
    }
    
})