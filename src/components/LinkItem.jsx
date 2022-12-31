import React from 'react'
import { RiExternalLinkFill, RiDeleteBin4Line } from 'react-icons/ri'
import { useUsers } from '../hooks/useUsers'
import { supabase } from '../supabase/client'
import { motion } from 'framer-motion'


const variants = {
  hidden: {
    opacity : 0
  },
  visible: ({delay}) => ({
    opacity: 1,
    transition: {
      delay,
    }
  })
}

export const LinkItem = ({item, index}) => {

   const { setLinks} = useUsers()

  const deleteLinks = async(idDeleted) => {
        try {
          const {data, error} = await supabase
          .from('links')
          .delete()
          .eq('id', idDeleted )
      
          if( error ) throw error
          
          if(data){
            setLinks((links) => links.filter((link) => link.id !== idDeleted))
          } 
         
        } catch (error) {
          console.error(error)
        }
    } 

  return (
    <motion.div 
    custom={{delay : (index + 1) * 0.2}}
    initial='hidden'
    animate='visible'
    variants={variants}
    layoutId={item.id}
    className='bg-base-lightdark py-2  rounded-md relative pl-8 pr-4 group'>

        <p className='text-sm truncate w-56'>
          <a href={item.name} target='_blank' className='text-green-100 hover:text-green-200 hover:underline transition-all'>{item.name}</a>  
        </p>

        <RiExternalLinkFill className='absolute text-base-primary top-1/2 -translate-y-1/2 left-2'/>
        
        <RiDeleteBin4Line className='absolute text-red-100 hover:text-red-200/90 top-1/2 -translate-y-1/2 right-2 cursor-pointer  scale-75 opacity-0 group-hover:opacity-100 group-hover:scale-105 transition-all ease-out' onClick={() => deleteLinks(item.id)}/>

  </motion.div>
  )
}
