"use client"
import { UserButton } from '@clerk/nextjs'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation' // Import usePathname
import React from 'react'

function DashboardHeader() {
  const path = usePathname(); //  Get current path

  return (
    <div className='p-5 shadow-sm border-b flex justify-between items-center bg-white'>
        
        {/*  Logic: Only show the Logo if we are NOT on a Dashboard page.
           If path includes '/dashboard', the Sidebar is visible (so hide this logo).
           If path includes '/course', the Sidebar is hidden (so show this logo).
        */}
        {!path?.includes('/dashboard') && (
            <Link href={'/dashboard'} className='flex gap-2 items-center cursor-pointer'>
                <Image src={'/logo.svg'} alt='logo' width={40} height={40} />
                <h2 className='font-bold text-xl'>AI Study Hub</h2>
            </Link>
        )}

        {/* If we are on dashboard, we need an empty div or justify-end to keep the UserButton on the right */}
        {path?.includes('/dashboard') && <div></div>}

        {/* Right Side: User Button */}
        <div>
            <UserButton />
        </div>
    </div>
  )
}

export default DashboardHeader