import type { Metadata } from 'next'
import './globals.css'
import {SessionProvider} from "next-auth/react";
import ClientSessionProvider from './ClientSessionProvider';
export const metadata: Metadata = {
  title: 'V-EATS',
  description: 'Order ahead from your favorite campus eateries and pick up your food when it is ready.No more waiting in lines!' 
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>
        <ClientSessionProvider>{children}</ClientSessionProvider>
      </body>
    </html>
  )
}
