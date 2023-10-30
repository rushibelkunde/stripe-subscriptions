"use client"
import React, { useState } from 'react'

import {  useRouter } from 'next/navigation'

import {signIn} from 'next-auth/react'

const Login = () => {

  const router = useRouter()

  const [data, setData] = useState({name:"", email:"", password:""})



  const handleLogin = async(e)=>{
      e.preventDefault()
      signIn("credentials", {
        ...data,
        redirect: false

      }
      ).then((user)=>{ console.log("logged in", user)
       router.push("/")
    })
      .catch((e)=>{
        alert("error in login")
      })



  }

    
  return (
    
     <>
     <h1 className='text-center font-bold text-3xl mt-10'>Login</h1>
     <form className='m-auto border border-black shadow-sm flex flex-col gap-2 w-72 p-5 rounded bg-zinc-100 mt-5'>
 
        
         <input value={data.email} onChange={(e)=> setData({...data, email: e.currentTarget.value})} className='border border-zinc-700 rounded p-2' type="email" name="email" id="" placeholder='Email' />
         <input value={data.password} onChange={(e)=> setData({...data, password: e.currentTarget.value})} className='border border-zinc-700 rounded p-2' type="password" name="password" id="" placeholder='Password' />
 
         <button onClick={handleLogin} className='p-2 bg-blue-400 text-white font-bold rounded' >Login</button>
 
     </form>
     </>
  )
}

export default Login