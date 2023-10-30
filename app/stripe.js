
import { getServerSession } from 'next-auth';
import Stripe from 'stripe';

import User from '@/models/user';


import { randomUUID } from 'crypto';
import { authOptions } from './api/auth/[...nextauth]/route';
import { connectToDB } from '@/db/db';


//price_1NarR3APMZcBliJSoefCKTi5

export const stripe = new Stripe(String(process.env.STRIPE_SECRET));

export async function hasSubscription() {
    await connectToDB()
    const session = await getServerSession(authOptions);

    if (session) {
        const user = await User.findOne({ email: session?.user?.email });
        const subscriptions = await stripe.subscriptionSchedules.list({
            customer : user.stripe_customer_id
        })
        console.log( subscriptions)
        return true;
    }

    return false;
}

export async function createCheckoutLink(customer) {
    await connectToDB()
    const session = await getServerSession(authOptions);
    if (session) {
        const checkout = await stripe.checkout.sessions.create({
            success_url: "http://localhost:3000/dashboard&success=true",
            cancel_url: "http://localhost:3000/dashboard&success=true",
            customer: customer,
            line_items: [
                {
                    price: 'price_1O6ph4SBrZ5nXiOsKaa7NySN',
                    quantity: 1

                },
                // {
                //     price: 'price_1O6phSSBrZ5nXiOsipI6EpYk',
                //     quantity: 1
                // },
                // {
                //     price: 'price_1O6phlSBrZ5nXiOsJT9W4kSc',
                //     quantity: 1
                // },
                // {
                //     price: 'price_1O6piCSBrZ5nXiOsBW4BBlva',
                //     quantity: 1
                // }

            ],
            mode: "subscription"
        })

        return checkout.url;
    }
}

export async function createCustomerIfNull() {
    await connectToDB()
    const session = await getServerSession(authOptions);

    if (session) {
        const user = await User.findOne({ email: session?.user?.email });

        console.log(user)
        if (!user?.stripe_customer_id) {
            const customer = await stripe.customers.create({
                email: String(user?.email)
            })

            console.log("zzzxzxzxzx", customer.id)
            user.stripe_customer_id = customer.id
            user.save()
        }
        const user2 = await User.findOne({ email: session.user?.email });
        console.log(user2?.stripe_customer_id)
        return user2?.stripe_customer_id;
    }

}

export async function generateCustomerPortalLink(customerId) {
    await connectToDB()
    const session = await getServerSession(authOptions);

    if (session) {
        try {

            const portalSession = await stripe.billingPortal.sessions.create({
                customer: customerId,
                return_url: process.env.NEXTAUTH_URL + "/dashboard/",
            });


            return portalSession.url;
        } catch (error) {
            console.log(error)
            return undefined;
        }

    }

}
