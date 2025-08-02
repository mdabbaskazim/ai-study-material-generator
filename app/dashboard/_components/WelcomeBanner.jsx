"use client"
import { useUser } from '@clerk/nextjs'
import Image from 'next/image'
import React from 'react'

function WelcomeBanner() {
    const { user } = useUser();
    return (
        <div className='flex items-center w-full gap-6 p-5 text-white bg-blue-500 rounded-lg'>
            <Image src="/laptop.png" alt="Laptop" width={100} height={100} />
            <div>
                <h2 className="text-3xl font-bold"> Hello, {user?.fullName}</h2>
                <p className='text'>Welcome Back, Its time to get back and start learning new course</p>
            </div>
        </div>
    )
}

export default WelcomeBanner
