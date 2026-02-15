"use client";
import Sidebar from './_components/SideBar'
import DashboardHeader from './_components/DashboardHeader'
import React, { useState } from "react";
import { CourseCountContext } from '../_context/CourseCountContext'; 

function DashboardLayout({ children }) {
    const [totalCourse, setTotalCourse] = useState(0);
    return (
        <CourseCountContext.Provider value={{ totalCourse, setTotalCourse }}>
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
        </CourseCountContext.Provider>
    );
}

export default DashboardLayout
