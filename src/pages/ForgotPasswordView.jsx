
import { Link } from 'react-router-dom'
import { ForgetPasswordForm } from '../components/ForgetPasswordForm'
import { useProtectedAuth } from '../hooks/useProtectedAuth'


export const ForgetPasswordView = () => {


 useProtectedAuth()


  return (
    <div className='bg-[#1E1F25] p-8 rounded-xl shadow-md w-auto lg:w-[450px]'>
    <h1  className='text-3xl uppercase font-bold tracking-[5px] mb-8 text-center'>Recuperar <span className='text-base-primary'>contraseña</span></h1>
    <ForgetPasswordForm />
    <div className='flex flex-col gap-4 items-center '>
        <span className='flex  items-center gap-3'>
        ¿Ya tienes cuenta?
        <Link to='/auth' className='text-base-primary hover:text-gray-100 transition-colors'>
          Ingresa
        </Link>
      </span>
      <span className='flex  items-center gap-3'>
        ¿No tienes cuenta?
        <Link to='/auth/register'className='text-base-primary hover:text-gray-100 transition-colors'>
          Registrate
        </Link>
      </span>
    </div>
  </div>
  )
}
