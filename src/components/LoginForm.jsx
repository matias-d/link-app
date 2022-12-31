import {  RiMailLine, RiLockLine, RiEyeLine, RiEyeOffLine} from 'react-icons/ri'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { supabase } from '../supabase/client';
import { useUsers } from '../hooks/useUsers';
import { AnimatePresence, motion } from 'framer-motion';



const variants = {
  hidden:{
    scale: 0
  },
  show:{
    scale: 1
  }
}

export const LoginForm = () => {

    const [ showPassword, setShowPassowrd] = useState(true)

    const [auth, setAuth] = useState({
      email: '',
      password: ''
    });

    const navigate = useNavigate()

    const { setMessage, message, setMessageError, messageError} = useUsers()

    const handleChange = (e) => {
      setAuth({
        ...auth,
        [e.target.name] : e.target.value
      })
    }

    const handleSubmit = async(e) => {
      e.preventDefault()
      try{
        const {data, error} = await supabase.auth.signInWithPassword({
          email: auth.email,
          password: auth.password
        })

        if( error ) throw error

          setTimeout(() => {
            setMessage('')
            navigate('/link-app/')
          },2000)

          setMessage('Su ingreso ha sido exitoso')
      
      } catch (error){
        console.error(error)
        setTimeout(() => {
          setMessageError('')
        },3000)
        setMessageError('Credenciales incorrectas, o usted no tiene un cuenta')
      }
    }




  return (
    <motion.form layout onSubmit={handleSubmit} className='mb-4' >
        {
          message &&
          <motion.div 
          initial='hidden'
          animate= 'show'
          variants={variants}
          className='bg-base-primary/60 p-1 rounded-md mb-2 border-2 border-base-primary'>
            <p className='text-white text-center'>{message}</p>
          </motion.div>
        }
        {
          messageError &&
          <AnimatePresence>
            <motion.div
            initial='hidden'
            animate='show'
            exit='hidden'
            variants={variants}
            className='bg-red-400/60 p-1 rounded-md mb-4 border-2 border-red-500'>
              <p className='text-white text-center'>{messageError}</p>
            </motion.div>
          </AnimatePresence>
        }
        <div className='relative mb-4'>
          <RiMailLine className='absolute text-base-primary top-1/2 -translate-y-1/2 left-2'/>
          <input value={auth.email} type='email' name='email' className='py-3 pl-8 pr-4 bg-[#131517] w-full rounded-lg outline-none focus:border focus:border-base-primary' placeholder='Correo electronico' onChange={(e) => handleChange(e)}/>
        </div>
        <div className='relative mb-8'>
          <RiLockLine className='text-base-primary absolute top-1/2 -translate-y-1/2 left-2'/>
          <input
           value={auth.password}
           type={showPassword ? 'password' : 'text'} name='password' className='py-3 pl-8z bg-[#131517] w-full rounded-lg pl-8 outline-none pr-8 focus:border focus:border-base-primary' 
           placeholder='Contraseña' onChange={(e) => handleChange(e)}/>
          {
            showPassword 
            ?
            <RiEyeLine className='text-base-primary absolute top-1/2 -translate-y-1/2 right-4 hover:cursor-pointer' onClick={() => setShowPassowrd(!showPassword)}/>
            :
            <RiEyeOffLine className='text-base-primary absolute top-1/2 -translate-y-1/2 right-4 hover:cursor-pointer' onClick={() => setShowPassowrd(!showPassword)}/>
          }
        </div>
        <div>
          <button type='submit' className='bg-base-primary w-full py-3 px-4 rounded-lg font-bold text-sm text-black uppercase'>Ingresar</button>
        </div>  
      </motion.form>
  )
}
