
import { UpdatePasswordForm } from '../components/UpdatePasswordForm'


export const UpdatePasswordView = () => {

  return (
    <div className='bg-[#1E1F25] p-8 rounded-xl shadow-md w-auto lg:w-[450px]'>
    <h1  className='text-3xl uppercase font-bold tracking-[5px] mb-8 text-center'>Recuperar <span className='text-base-primary'>contraseña</span></h1>
    <UpdatePasswordForm />
    
  </div>
  )
}
