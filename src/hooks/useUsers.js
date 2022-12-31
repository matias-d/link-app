import { useContext } from "react"
import { myContext } from "../context/UserContext"

export const useUsers = () => {
  const myUser = useContext(myContext)

    if(!myUser) throw new Error('Provider not found')

    return myUser

}
