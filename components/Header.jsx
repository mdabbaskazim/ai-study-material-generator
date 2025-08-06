import React from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

const Header = () => {
  return (
    <header className="flex justify-between items-center h-16 px-4 py-10 drop-shadow-md bg-white">
        <div className="flex items-center gap-1">
          <img src="/logo.svg" alt="Logo" className='w-10 h-10'/>
          <h1 className="text-xl font-bold">AI Study Hub</h1>
        </div>
        <Link href="/dashboard" passHref>
        <Button>Dashboard</Button>
      </Link>
    </header>
  )
}

export default Header