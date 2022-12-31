import { supabase } from "../supabase/client"


export const getUser = async () => {
    try {
        const {error, data} = await supabase.auth.getUser()
        return data

    } catch (error) {
        console.error(error)
    }
}