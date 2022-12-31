import React, { useState } from 'react'
import {  RiMailLine, RiLockLine, RiEyeLine, RiEyeOffLine} from 'react-icons/ri'
import { useUsers } from '../hooks/useUsers';
import { supabase } from '../supabase/client';
import { motion } from 'framer-motion';




const variants = {
  hidden:{
    scale: 0
  },
  show:{
    scale: 1
  }
}


export const RegisterForm = () => {

  const [ showPassword, setShowPassowrd] = useState(true)

  const [auth, setAuth] = useState({
    email: '',
    password1: '',
    password2: ''
  });

  const {setMessage, message, setMessageError, messageError} = useUsers()

  const handleChange = (e) => {
    setAuth({
        ...auth,
        [e.target.name] : e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
 

    try {
      
      if(auth.password1 !== auth.password2){
        setTimeout(() => {
          setMessageError('')
        },3000)
        setMessageError('Las contraseñas no coinciden')
      }

     const {data, error} = await supabase.auth.signUp({
        email : auth.email,
        password : auth.password2
      })

      if( error ) throw error


        setTimeout(() => {
          setMessage('')
        },3000)

        setMessage('Verifica tu email para seguir los pasos')
      

    } catch (error) {
      console.error(error)
      setTimeout(() => {
        setMessageError('')
      },3000)
      setMessageError('Error en las credenciales')
    }
  }

  return (
    <motion.form  layout onSubmit={handleSubmit} className='mb-4' >
      {
        message &&
        <motion.div
        variants={variants}
        initial='hidden'
        animate='show' 
        className='bg-base-primary/60 p-1 rounded-md mb-2 border-2 border-base-primary'>
          <p className='text-white text-center'>{message}</p>
        </motion.div>
      }
      {
        messageError &&
        <motion.div
        variants={variants}
        initial='hidden'
        animate='show' 
        className='bg-red-400/60 p-1 rounded-md mb-2 border-2 border-red-500'>
          <p className='text-white text-center'>{messageError}</p>
        </motion.div>
      }
      <div className='relative mb-4'>
        <RiMailLine className='absolute text-base-primary top-1/2 -translate-y-1/2 left-2'/>
        <input type='email' name='email' className='py-3 pl-8 pr-4 bg-[#131517] w-full rounded-lg outline-none focus:border focus:border-base-primary' placeholder='Correo electronico' onChange={(e) => handleChange(e)}/>
      </div>
      <div className='relative mb-4'>
        <RiLockLine className='text-base-primary absolute top-1/2 -translate-y-1/2 left-2'/>
        <input
        type={showPassword ? 'password' : 'text'} name='password1' className='py-3 pl-8  bg-[#131517] w-full rounded-lg outline-none pr-8 focus:border focus:border-base-primary' 
        placeholder='Contraseña' onChange={(e) => handleChange(e)}/>
        {
          showPassword 
          ?
          <RiEyeLine className='text-base-primary absolute top-1/2 -translate-y-1/2 right-4 hover:cursor-pointer' onClick={() => setShowPassowrd(!showPassword)}/>
          :
          <RiEyeOffLine className='text-base-primary absolute top-1/2 -translate-y-1/2 right-4 hover:cursor-pointer' onClick={() => setShowPassowrd(!showPassword)}/>
        }
      </div>
      <div className='relative mb-8'>
        <RiLockLine className='text-base-primary absolute top-1/2 -translate-y-1/2 left-2'/>
        <input
        type={showPassword ? 'password' : 'text'} name='password2' className='py-3 pl-8  bg-[#131517] w-full rounded-lg outline-none pr-8 focus:border focus:border-base-primary' 
        placeholder='Confirmar contraseña' onChange={(e) => handleChange(e)}/>
        {
          showPassword 
          ?
          <RiEyeLine className='text-base-primary absolute top-1/2 -translate-y-1/2 right-4 hover:cursor-pointer' onClick={() => setShowPassowrd(!showPassword)}/>
          :
          <RiEyeOffLine className='text-base-primary absolute top-1/2 -translate-y-1/2 right-4 hover:cursor-pointer' onClick={() => setShowPassowrd(!showPassword)}/>
        }
      </div>
      <div>
      <button type='submit' className='bg-base-primary w-full py-3 px-4 rounded-lg font-bold text-sm text-black uppercase'>Registrarme</button>
    </div>  
  </motion.form>
  )
}
