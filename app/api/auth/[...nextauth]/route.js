

import { connectToDB } from "@/db/db"
import User from "@/models/user"
import NextAuth from "next-auth/next"
import CredentialsProvider from "next-auth/providers/credentials"



export const authOptions = {

    providers: [
        CredentialsProvider({
            name: "credentials",

            credentials: {
                name:  { label: "name", type: "text", placeholder: "jsmith" },
                email: { label: "email", type: "email", placeholder: "jsmith@gmail.com" },
                password: { label: "Password", type: "password" }
              },


              async authorize(credentials){

                await connectToDB()

                const user = await User.findOne({email: credentials.email, password: credentials.password})

                
                if(!user){
                    console.log("invalid user")
                    return null
                }
                
                return user
              }
        })

    ],

    session: {
        strategy: "jwt"
    },

    secret : process.env.NEXTAUTH_SECRET
}

const handler = NextAuth(authOptions)

export {handler as GET, handler as POST}