import { AnimatePresence } from 'framer-motion'
import React from 'react'
import { useUsers } from '../hooks/useUsers'
import { LinkItem } from './LinkItem'

export const LinkList = () => {

  const {links, loading} = useUsers()

  
  return (
    <div className='flex flex-col gap-y-3 h-72 scrollbar-thin scrollbar-thumb-base-primary scrollbar-track-base-dark overflow-auto scrollbar-thumb-rounded-full scrollbar-track-rounded-full pr-4'>
    {
 
      links.length === 0 && !loading && <p className='text-center text-gray-400'>No hay nada que ver aqui  😢 </p>
    }
    <AnimatePresence>
      {
        links.map((item, index) => (
          <LinkItem key={item.id} item={item} index={index}/>
        ))
      } 
    </AnimatePresence>
    </div>
  )
}
