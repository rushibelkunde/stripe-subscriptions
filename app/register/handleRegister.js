"use server"

import { connectToDB } from '@/db/db'
import User from '@/models/user'

export const handleRegister =async (formdata)=>{
    
    const name = formdata.get("name")
    const email = formdata.get("email")
    const password = formdata.get("password")
    try {
      await connectToDB()
      const user = await User.findOne({email: email})
      console.log(user)
      if(user){
        console.log("user already exists")
        return
      }
      const newUser = await User.create({name, email, password})
      newUser.save()
    } catch (error) {
      console.log(error)
      
    }
    

}