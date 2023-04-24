import Image from 'next/image'
import { Inter } from 'next/font/google'
import Nav from '@/components/Nav'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <main className={`flex flex-col item-center ${inter.className}`}>
      <Nav />
      <div className="content flex justify-center grow h-screen">
        this is main page
      </div>
    </main>
  )
}
