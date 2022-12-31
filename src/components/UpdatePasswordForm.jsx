import React, { useState } from 'react'
import {  RiLockLine, RiEyeLine, RiEyeOffLine} from 'react-icons/ri'
import { useNavigate } from 'react-router-dom';
import { useUsers } from '../hooks/useUsers';
import { supabase } from '../supabase/client';

export const UpdatePasswordForm = () => {

    const [password, setPassword] = useState({
        password1 : '',
        password2: ''
    });
    const {setMessage, message} = useUsers()
    const [ showPassword, setShowPassowrd] = useState(true)

    const navigate = useNavigate()

    const handleChange = (e) => {
        setPassword({
            ...password,
            [e.target.name] : e.target.value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try{
            if(password.password1 !== password.password2){
                setTimeout(() => {
                    setMessage('')
                },3000)
                setMessage('Las contraseñas no conciden')
            }

            const { data, error } = await supabase.auth.updateUser({password: password.password2})


          if( error ) throw error

          setTimeout(() => {
            setMessage('')
            navigate('/link-app/')
          },3000)
          setMessage('Su nueva contraseña fue cambiada con exito')


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
        
        <div className='relative'>
            <div className='relative mb-4'>
                <RiLockLine className='text-base-primary absolute top-1/2 -translate-y-1/2 left-2'/>
                <input
                type={showPassword ? 'password' : 'text'} name='password1' className='py-3 pl-8  bg-[#131517] w-full rounded-lg outline-none pr-8 focus:border focus:border-base-primary' 
                placeholder='Nueva Contraseña' onChange={(e) => handleChange(e)}/>
                {
                showPassword 
                ?
                <RiEyeLine className='text-base-primary absolute top-1/2 -translate-y-1/2 right-4 hover:cursor-pointer' onClick={() => setShowPassowrd(!showPassword)}/>
                :
                <RiEyeOffLine className='text-base-primary absolute top-1/2 -translate-y-1/2 right-4 hover:cursor-pointer' onClick={() => setShowPassowrd(!showPassword)}/>
                }
            </div>
            <div className='relative mb-2'>
                <RiLockLine className='text-base-primary absolute top-1/2 -translate-y-1/2 left-2'/>
                <input
                type={showPassword ? 'password' : 'text'} name='password2' className='py-3 pl-8  bg-[#131517] w-full rounded-lg outline-none pr-8 focus:border focus:border-base-primary' 
                placeholder='Confirmar nueva contraseña' onChange={(e) => handleChange(e)}/>
                {
                showPassword 
                ?
                <RiEyeLine className='text-base-primary absolute top-1/2 -translate-y-1/2 right-4 hover:cursor-pointer' onClick={() => setShowPassowrd(!showPassword)}/>
                :
                <RiEyeOffLine className='text-base-primary absolute top-1/2 -translate-y-1/2 right-4 hover:cursor-pointer' onClick={() => setShowPassowrd(!showPassword)}/>
                }
            </div>
        </div>
        <div>
        <p className='mb-2 text-sm text-gray-400'>Password should be at least <span className='text-base-primary/80'>6</span></p>
        <button type='submit' className=' w-full py-3 px-4 rounded-lg bg-base-primary font-bold text-sm text-black uppercase'>Enviar nueva contraseña</button>
        </div>  
  </form>
  )
}
