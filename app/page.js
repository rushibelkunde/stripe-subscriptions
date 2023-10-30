import Image from 'next/image'
import { getServerSession } from 'next-auth'
import { authOptions } from './api/auth/[...nextauth]/route'

import { StripePricingTable } from './components'
import { hasSubscription } from './stripe'



export default async function Home() {

  const session = await getServerSession(authOptions)

  const hasSub = await hasSubscription()
  return (
    <>
    <h1 className='text-3xl font-bold text-center mt-5'>Welcome {session?.user?.name}</h1>

    <div className='mt-5'>

      {hasSub? <h1 className=' text-xl font-bold text-center mb-5'>You already Subscribed! want to upgrade?</h1>
      : session?.user?
      <h1 className=' text-xl font-bold text-center mb-5'>Subscribe</h1> : ""}

    {session?.user? <StripePricingTable/> : <h1 className=' text-3xl font-bold text-center'>Signup to See Our Plans</h1>}
    
      

    </div>

    </>
  )
}
