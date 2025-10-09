"use client"
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useUser } from '@clerk/nextjs'
import CourseCardItem from './CourseCardItem'
import { Button } from "@/components/ui/button";
import { RefreshCw } from "lucide-react";
//import { CourseCountContext } from "@/app/_context/CourseCountContext";

function CourseList() {

    const {user} = useUser();
    const [courseList, setCourseList] = useState([]);
    const [loading, setLoading] = useState(false);
    // const { setTotalCourse } = useContext(CourseCountContext);
    useEffect(() =>{
        user&&GetCourseList();
    },[user]);
    
    const GetCourseList= async ()=>{
      setLoading(true);
        const result = await axios.post('/api/courses',
            {createdBy:user?.primaryEmailAddress?.emailAddress});
            console.log(result);
            setCourseList(result.data.result);
            setLoading(false);
    }
  return (
    <div className='mt-10'>
      <h2 className='text-2xl font-bold flex justify-between items-center'>
        Your Study Material
        <Button
          variant="outline"
          onClick={GetCourseList}
          className="border-primary text-primary"
          // disabled={loading}
        >
          {/* <RefreshCw className={loading ? "animate-spin" : ""} />
          {loading ? "Loading..." : "Refresh"} */}
          <RefreshCw/> Refresh
        </Button>
      </h2>

      <div className='grid grid-cols-2 gap-5 mt-2 md:grid-cols-2 lg:grid-cols-3'>
        { loading ==false? courseList?.map((course,index)=>(
            <CourseCardItem course={course} key={index} />
        ))
      :[1, 2, 3, 4, 5, 6].map((item, index) => (
              <div
                key={index}
                className="h-56 w-full bg-slate-200 rounded-lg animate-pulse"
              />
            ))}
      </div>
    </div>
  )
}

export default CourseList
