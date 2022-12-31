import { useEffect, useState } from "react";
import { getUser } from "../services/getUser";
import { supabase } from "../supabase/client";


export const useInfoUser = () => {
    const [user, setUser] = useState('');

    useEffect(() => {
      getUser().then(res => setUser(res.user))
  
      }, []);
    
      return { user }
}