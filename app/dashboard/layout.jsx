import Sidebar from './_components/SideBar'
import React from 'react'
import DashboardHeader from './_components/DashboardHeader'

function DashboardLayout({ children }) {
    return (
        <div>
            <div className='fixed hidden md:w-64 md:block'>
                <Sidebar />
            </div>
            <div className='md:ml-64'>
                <DashboardHeader />
                <div className='p-10'>
                    {children}
                </div>
            </div>
        </div>
    )
}

export default DashboardLayout
