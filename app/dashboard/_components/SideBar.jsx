"use client"
import React from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { LayoutDashboard, Shield, UserCircle } from 'lucide-react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'

function SideBar() {

    const MenuList=[
        {
            name: 'Dashboard',
            icon: LayoutDashboard,
            path: '/dashboard'
        },
        {
            name: 'Upgrade',
            icon: Shield,
            path: '/dashboard/upgrade'
        },
        {
            name: 'Profile',
            icon: UserCircle,
            path: '/dashboard/profile'
        }
    ]

    const path = usePathname();
  return (
    <div className='h-screen p-5 shadow-md'>
      <div className='flex items-center gap-2'>
            <Image src={'/logo.svg'} alt='Logo' width={40} height={40} />
            <h2 className="text-2xl font-bold">AI Study Hub</h2>
      </div>
      
      <div className='mt-10'>
            <Link href={'/create'}>
            <Button className="w-full ">+ Create New</Button>
            </Link>
            <div className='mt-5'>
                {MenuList.map((menu, index) => (
                    <div key={index} className={`flex items-center gap-5 p-3 mt-3 rounded-lg cursor-pointer hover:bg-slate-200 ${path==menu.path&&'bg-slate-200'}`}>
                        <menu.icon/>
                        <span>{menu.name}</span>
                    </div>
                ))}
            </div>
      </div>
      
      <div className='absolute p-3 border rounded-lg bottom-10 bg-slate-100 w-[85%]'>
        <h2 className='mb-2 text-lg'>Available Credits: 5</h2>
        <Progress value={30}/>
        <h2 className='text-sm'>1 out of 5 Credits Used</h2>

        <Link href={'/dashboard/upgrade'} className='mt-3 text-xs text-primary'>Upgrade to create more</Link>
      </div>
    </div>
  )
}

export default SideBar
