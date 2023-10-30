"use server"
import React from 'react'
import { createCheckoutLink, createCustomerIfNull, generateCustomerPortalLink, hasSubscription } from '../stripe'
import { getServerSession } from 'next-auth';
import { authOptions } from '../api/auth/[...nextauth]/route';
import User from '@/models/user';
import Link from 'next/link';
import { connectToDB } from '@/db/db';

const Dashboard = async () => {
    await connectToDB()
    const session = await getServerSession(authOptions)

    
    const customer_id = await createCustomerIfNull();
    const hasSub = await hasSubscription()
    const checkout = await createCheckoutLink("" + customer_id)


    console.log(hasSub.data)

    


    // const user = User.findOne({email: session?.user?.email})

    const manage_link = await generateCustomerPortalLink(customer_id)
    return (

        <>{session?.user? 
        <div> <h1 className='p-2 text-3xl mt-2 font-bold'>Dashboard</h1>
            <h1 className='text-center p-2 text-3xl mt-2 font-bold'>Welcome {session?.user?.name}</h1>
            <Link href={"" + manage_link}>
                <h1 className='text-center p-2 bg-slate-950 text-white font-semibold w-40 rounded ml-3'>
                    Manage Billing
                </h1>

            </Link>

            <div>
                {
                    hasSub ?
                        <h1 className='p-3 border border-green-600 mt-3'>Subscribed</h1>
                        :
                        <>
                            <h1 className='p-3 border border-red-600 mt-3'>Not Subscribed</h1>

                            <a href={"" + checkout}>
                                <h1 className='text-center p-2 bg-slate-950 text-white font-semibold w-40 rounded ml-3'>
                                    Subscribe
                                </h1>

                            </a>
                        </>

                }

            </div>

        </div>
        :
        <h1>Login for access Dashboard</h1>
            }
        </>
    )
}

export default Dashboard