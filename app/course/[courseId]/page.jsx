"use client";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import axios from "axios";
import CourseIntroCard from "./_components/CourseIntroCard";
import StudyMaterialSection from "./_components/StudyMaterialSection";
import ChapterList from "./_components/ChapterList";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";

function Course() {
    const { courseId } = useParams();
    const router = useRouter();
    const [course, setCourse] = useState();

    useEffect(() => {
        GetCourse();
    }, []);

    const GetCourse = async () => {
        const result = await axios.get("/api/courses?courseId=" + courseId);
        console.log(result);
        setCourse(result.data.result);
    };

    return (
        <div> 
            {/*  Back to Dashboard Button */}
            <div className="mb-5">
                <Button 
                    onClick={() => router.push('/dashboard')} 
                    variant="outline" 
                    className="text-primary hover:text-primary border-primary"
                >
                    <ChevronLeft className="h-4 w-4 mr-2" /> 
                    Back to Dashboard
                </Button>
            </div>

            {/* Course Intro */}
            <CourseIntroCard course={course} />
            
            {/* Study Materials Options */}
            <StudyMaterialSection courseId={courseId} course={course} />
            
            {/* Chapter List */}
            <ChapterList course={course} />
        </div>
    )
}

export default Course;