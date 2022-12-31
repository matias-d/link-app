import React, { useState } from 'react'
import {  RiMailLine} from 'react-icons/ri'
import { useUsers } from '../hooks/useUsers';
import { supabase } from '../supabase/client';

export const ForgetPasswordForm = () => {

    const [email, setEmail] = useState('');
    const {setMessage, message} = useUsers()

    const handleSubmit = async (e) => {
        e.preventDefault()
        try{
          const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
            redirectTo: 'http://127.0.0.1:5173/auth/update-password',
          })

          if( error ) throw error

          setTimeout(() => {
            setMessage('')
          },3000)
          setMessage('Enviamos las intruciones a su email para recuperar su contraseña')


        }catch (error) {
            console.error(error)
        }
    }

  return (
    <form onClick={handleSubmit} className='mb-4' >

       {
            message &&
            <div className='bg-base-primary/60 p-1 rounded-md mb-2 border-2 border-base-primary'>
              <p className='text-white text-center'>{message}</p>
            </div>
        }
        
        <div className='relative mb-4'>
        <RiMailLine className='absolute text-base-primary top-1/2 -translate-y-1/2 left-2'/>
        <input type='email' className='py-3 pl-8 pr-4 bg-[#131517] w-full rounded-lg outline-none focus:border focus:border-base-primary' placeholder='Correo electronico' onChange={(e) => setEmail(e.target.value)}/>
        </div>
        <div>
        <button type='submit' className=' w-full py-3 px-4 rounded-lg bg-base-primary font-bold text-sm text-black uppercase'>Enviar intruciones</button>
        </div>  
  </form>
  )
}
