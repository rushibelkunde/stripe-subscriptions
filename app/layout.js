import { Inter } from 'next/font/google'
import './globals.css'

import Provider from './Provider'
import Nav from './Nav'
const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default async function RootLayout({ children }) {

  
  return (
    
    <html lang="en">
      <Provider>
      <body className={inter.className}>
        <Nav/>
        {children}
        </body>
        </Provider>
    </html>
    
  )
}
