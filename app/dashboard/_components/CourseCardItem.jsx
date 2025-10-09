import Image from 'next/image'
import React from 'react'
import { Progress } from '@/components/ui/progress'
import { Button } from '@/components/ui/button'
import { RefreshCw } from 'lucide-react'
import Link from "next/link";

function CourseCardItem({ course }) {

    const formatDate = (dateString) => {
        if (!dateString) return "";
        return new Intl.DateTimeFormat("en-GB", {
            day: "2-digit",
            month: "short",
            year: "numeric",
            timeZone: "Asia/Kolkata",
        }).format(new Date(dateString));
    }

    return (
        <div className='p-5 border rounded-lg shadow-md'>
            <div>
                <div className='flex items-center justify-between'>
                    <Image src={'/knowledge.png'} alt='Knowledge' width={50} height={50} />
                    <h2 className='text-[10px] p-1 px-2 rounded-full bg-slate-200'>{formatDate(course?.createdAt)}</h2>
                </div>
                <h2 className='mt-3 text-lg font-medium'>{course?.courseLayout?.courseTitle}</h2>
                <p className='mt-2 text-sm text-gray-500 line-clamp-2'>{course?.courseLayout?.courseSummary}</p>
                
                <div className='mt-3'>
                    <Progress value={0} />
                </div> 
                
                <div className='flex justify-end mt-3'>
                    {course?.status=='Generating'?
                    <h2 className='text-sm, p-1 px-2 rounded-full bg-gray-400 text-white flex gap-2 items-center'>
                        <RefreshCw className='w-5 h-5 animate-spin'/>
                            Generating..</h2>
                    :
                    <Link href={'/course/'+course?.courseId}>
                    <Button> View </Button>
                    </Link>
                    }
                </div>
            </div>
        </div>
    )
}

export default CourseCardItem
