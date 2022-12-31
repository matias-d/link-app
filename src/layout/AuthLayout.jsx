import React, { useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import { useInfoUser } from '../hooks/useInfoUser'

export const AuthLayout = () => {

  

  const {user} = useInfoUser()
  const navigate = useNavigate()

  useEffect(() => {
    if(user){
      navigate('/')
    }
  }, []);


  return (
    <div className='h-screen flex items-center justify-center'>
        <Outlet />
    </div>
  )
}
