import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getUser } from "../services/getUser";


export const useProtectedAuth = () => {

    const navigate = useNavigate()
    
    useEffect(() => {
      getUser().then(res => {
        if(res.user){
          navigate('/')
        }
      })
    }, []);
}