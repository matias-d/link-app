import React, { useState } from 'react'
import { RiLinkM } from 'react-icons/ri'
import { useInfoUser } from '../hooks/useInfoUser';
import { supabase } from '../supabase/client';

export const LinkForm = () => {

    const [link, setLink] = useState('');
    const {user} = useInfoUser()

    const handleSubmit = async(e) => {
        e.preventDefault()
        try {
            await supabase
            .from('links')
            .insert([
                {name : link, user_id : user.id }
            ])
        } catch (error) {
            console.error(error)
        }finally{
            setLink('')
        }
    }

  return (
    <form onSubmit={handleSubmit}>
        <div className='flex'>
            <div className='relative'>
                <input value={link} type='text' placeholder='https://www.tiktok.com/@user' name='link' className='py-1 rounded-tl-md rounded-bl-md bg-base-lightdark pl-8 pr-6  outline-none focus:border focus:border-base-primary' onChange={(e) => setLink(e.target.value)}/>
                <RiLinkM className='text-base-primary absolute top-1/2 -translate-y-1/2 left-2'/>
            </div>
            <button className='py-1 bg-base-primary text-zinc-800 text-sm px-2 rounded-tr-md rounded-br-md hover:bg-base-primary/80 transition-all'>Enviar Link</button>
        </div>
    </form>
  )
}
