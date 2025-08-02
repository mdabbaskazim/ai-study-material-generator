"use client"
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useUser } from '@clerk/nextjs'
import CourseCardItem from './CourseCardItem'

function CourseList() {

    const {user} = useUser();
    const [courseList, setCourseList] = useState([]);

    useEffect(() =>{
        user&&GetCourseList();
    },[user]);
    
    const GetCourseList= async ()=>{
        const result = await axios.post('/api/courses',
            {createdBy:user?.primaryEmailAddress?.emailAddress});
            console.log(result);
            setCourseList(result.data.result)
    }
  return (
    <div className='mt-10'>
      <h2 className='text-2xl font-bold'>Your Study Material</h2>

      <div className='grid grid-cols-2 gap-5 mt-2 md:grid-cols-2 lg:grid-cols-3'>
        {courseList?.map((course,index)=>(
            <CourseCardItem course={course} key={index} />
        ))}
      </div>
    </div>
  )
}

export default CourseList
