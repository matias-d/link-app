import React, { createContext, useEffect, useState } from 'react'
import { supabase } from '../supabase/client'

export const myContext = createContext()

export const UserProvider = ({children}) => {

  const [message, setMessage] = useState('')
  const [messageError, setMessageError] = useState('')
  const [links, setLinks] = useState([])
  const [loading, setLoading] = useState(true)

   const getAllLinks = async() => {
    try {
      const {data : links, error} = await supabase
      .from('links')
      .select('*')

      if( error ) throw error
      
      setLinks(links)
      setLoading(false)

    } catch (error) {
        console.error(error)
    }
    }

    const suscribeLinks = () => {

      supabase
      .channel('links')
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'links' }, getAllLinks)
      .subscribe()

        }
        
  
 useEffect(() => {
      getAllLinks()
      suscribeLinks()
 }, [links]);

 


  return (
    <myContext.Provider value={{
      setMessage,
      message,
      links,
      setLinks,
      setMessageError,
      messageError,
      loading
    }}>
        {children}
    </myContext.Provider>
  )
}
