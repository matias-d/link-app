import { Link } from 'react-router-dom'
import { LoginForm } from '../components/LoginForm'
import { useProtectedAuth } from '../hooks/useProtectedAuth'


export const LoginView = () => {

 useProtectedAuth()

  return (
    <div className='bg-[#1E1F25] p-8 rounded-xl shadow-md w-auto lg:w-[450px]'>
      <h1  className='text-3xl uppercase font-bold tracking-[5px] mb-8 text-center'>Iniciar <span className='text-base-primary'>sesion</span></h1>
      <LoginForm />
      <div className='flex flex-col gap-4 items-center '>
        <Link to={'forgot-password'} className='hover:text-base-primary transition-colors'>
          ¿Olvidaste tu contraseña?
        </Link>
        <span className='flex  items-center gap-3'>
          ¿No tienes cuenta?
          <Link to={'register'} className='text-base-primary hover:text-gray-100 transition-colors'>
            Registrate
          </Link>
        </span>
      </div>
    </div>
  )
}
