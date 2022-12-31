import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { LinkForm } from '../components/LinkForm'
import { LinkList } from '../components/LinkList'
import { useInfoUser } from '../hooks/useInfoUser'
import { useUsers } from '../hooks/useUsers'
import { getUser } from '../services/getUser'
import { supabase } from '../supabase/client'
import { motion } from 'framer-motion'




const variants = {
  hidden:{
    scale: 0
  },
  show:{
    scale: 1
  }
}


export const HomeView = () => {


  const {  setMessage, message, loading } = useUsers()

  const { user } = useInfoUser()
  
  const navigate = useNavigate()

  const handleSignOut = async() => {
    try {
      await supabase.auth.signOut()
      setTimeout(() => {
        setMessage('')
        navigate('/auth')
      },1000)
      setMessage('Hasta pronto! ✋')
      
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    
    getUser().then(res => {
      if(!res.user){
        navigate('/auth')
      }
    })
  }, []);


  return (
    <div className='h-screen flex  items-center justify-center'>
        <main 
        className='bg-base-dark w-96 h-96 rounded-md shadow-lg py-4 px-6 flex flex-col gap-y-4'>
            {
            message &&
            <motion.div
            initial='hidden'
            animate='show'
            variants={variants} 
            exit='hidden'
            className='bg-base-primary/60 p-1 rounded-md mb-2 border-2 border-base-primary'>
              <p className='text-white text-center'>{message}</p>
            </motion.div>
            }
          <motion.h2
          initial={{scale: 0}} 
          transition={{delay: 0.5}}
          animate={{scale: 1}}
          className='text-center'>Hola, <span className='text-base-primary'>{user?.email }</span> 😄</motion.h2>
          
          <LinkForm />

          {
            loading ? <p className='text-center text-gray-400'>Cargando sus links...</p>
            : <LinkList  />
            
          }
          <button className='bg-base-primary text-zinc-900 text-sm py-1 px-2 rounded-md shadow-md shadow-base-primary/20 hover:bg-base-primary/80 transition-all' onClick={handleSignOut}>Cerrar sesión</button>
        </main>
    </div>
  )
}
