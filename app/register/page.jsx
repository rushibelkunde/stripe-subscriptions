"use client"
import React from 'react'

import { handleRegister } from './handleRegister'
import { useRouter } from 'next/navigation'

const Register = () => {

  const router = useRouter()

    
  return (
    <>
    <h1 className='text-center font-bold text-3xl mt-10'>Register</h1>
    <form action={(formdata)=>{
      handleRegister(formdata)

      router.push("/")

    }} className='m-auto border border-black shadow-sm flex flex-col gap-2 w-72 p-5 rounded bg-zinc-100 mt-5'>

        <input className='border border-zinc-700 rounded p-2' type="text" name='name' placeholder='Name' />
        <input className='border border-zinc-700 rounded p-2' type="email" name="email" id="" placeholder='Email' />
        <input className='border border-zinc-700 rounded p-2' type="password" name="password" id="" placeholder='Password' />

        <button className='p-2 bg-blue-400 text-white font-bold rounded' >submit</button>

    </form>
    </>
  )
}

export default Register