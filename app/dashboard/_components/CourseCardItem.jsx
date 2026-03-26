import Image from 'next/image'
import React, { useState } from 'react'
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
                    {course?.status == 'Generating' ? (
                        <h2 className='text-sm, p-1 px-2 rounded-full bg-gray-400 text-white flex gap-2 items-center'>
                            <RefreshCw className='w-5 h-5 animate-spin' />
                            Generating..</h2>
                    ) : (
                        <div className="flex items-center gap-5">
                            <DeleteButton courseId={course?.courseId} />
                            <Link href={'/course/' + course?.courseId}>
                                <Button> View </Button>
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default CourseCardItem

function DeleteButton({ courseId }) {
    const [deleting, setDeleting] = useState(false)

    async function handleDelete() {
        if (!confirm('Are you sure you want to delete this course? This cannot be undone.')) return;
        setDeleting(true)
        try {
            const res = await fetch('/api/courses/delete', {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ courseId })
            })
            const data = await res.json()
            if (data.deleted) {
                window.location.reload()
            } else {
                alert('Failed to delete course')
                setDeleting(false)
            }
        } catch (err) {
            alert('Error deleting course')
            setDeleting(false)
        }
    }

    return (
        <Button
            variant="outline"
            onClick={handleDelete}
            disabled={deleting}
            className={`px-3 py-1 rounded-md text-white ${deleting ? 'bg-gray-400' : 'border-primary text-primary hover:bg-red-500 hover:text-white'}`}>
            {deleting ? 'Deleting...' : 'Delete'}
        </Button>
    )
}
