"use client"

import { signOut, useSession } from 'next-auth/react'
import React from 'react'

import Link from 'next/link'



const Nav = () => {

    const {data: session} = useSession()
    
  return (

    <div className='w-full flex justify-around bg-zinc-900 py-4 text-white'>

        <div>
          <Link href="/">
          <h1 className=' text-2xl font-bold'>Home</h1>
          </Link>
          
        </div>
        <div>
          {session?.user? 
          <Link href="/dashboard">
          <h1 className=' text-2xl font-bold'>Dashboard</h1>
          </Link>:""}
        </div>
        <div className=' flex justify-center items-center'>
            {session? 
            <button onClick={signOut}>signout</button> :
            <div className='flex gap-4 justify-center items-center text-xl '>
                 <Link href="/login">Signin</Link>
                 <Link href="/register">Register</Link>
            </div>
           }
        </div>
    </div>
  )
}

export default Nav