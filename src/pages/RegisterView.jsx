import { Link } from 'react-router-dom'
import { RegisterForm } from '../components/RegisterForm'
import { useProtectedAuth } from '../hooks/useProtectedAuth'

export const RegisterView = () => {

  useProtectedAuth()



  return (
    <div className='bg-[#1E1F25] py-4 px-8 rounded-xl shadow-md w-auto lg:w-[450px]'>
      <h1  className='text-3xl uppercase font-bold tracking-[5px] mb-8 text-center'>Crear <span className='text-base-primary'>cuenta</span></h1>
      <RegisterForm />
      <div className='flex flex-col gap-4 items-center '>
        
        <span className='flex  items-center gap-3'>
          ¿Ya tienes cuenta?
          <Link to='/link-app/auth/' className='text-base-primary hover:text-gray-100 transition-colors'>
            Ingresa
          </Link>
        </span>
      </div>
    </div>
  )
}
