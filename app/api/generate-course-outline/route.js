import { NextResponse } from "next/server";
import { courseOutlineAIModel } from "@/configs/AiModel";
import { db } from "@/configs/db"
import { STUDY_MATERIAL_TABLE } from "@/configs/schema"
import { inngest } from "@/inngest/client";



export async function POST(req){

    const {courseId,topic,courseType, difficultyLevel, createdBy} = await req.json();

  const finalPrompt = `Create a comprehensive course structure for "${topic}" with difficulty level "${difficultyLevel}" designed for "${courseType}" preparation.

Format your response as a JSON object with the following exact structure:

{
  "courseTitle": "string - The main title of the course",
  "courseType": "string - job interview/exam/other",
  "difficulty": "string - Easy/Medium/Hard",
  "courseSummary": "string - 2-3 sentences describing the course comprehensively, tailored to the course type",
  "chapters": [
    {
      "chapterTitle": "string - Chapter name",
      "chapterSummary": "string - 1-2 sentences describing what this chapter covers",
      "topics": [
        "string - Topic 1",
        "string - Topic 2",
        "etc."
      ]
    }
  ]
}`;
    
    
    
    // const PROMPT = 'Generate a study material for '+topic+' for '+courseType+' and level of difficulty will be '+difficultyLevel+' with summary for each chapter, Topic list in each chapter, all result in JSON format';
    //Generate Course Layout using AI
    const aiResp = await courseOutlineAIModel.sendMessage(PROMPT);  
    const aiResult = JSON.parse(aiResp.response.text());
    
    //Save  the result along with User Input
    const dbResult = await db.insert(STUDY_MATERIAL_TABLE).values({
        courseId: courseId,
        courseType: courseType,
        createdBy: createdBy,
        topic: topic,
        courseLayout: aiResult,
        difficultyLevel: difficultyLevel,  
    }).returning({resp:STUDY_MATERIAL_TABLE});

    console.log("Course Layout Generated:", dbResult);

    //Trigger the Inngest function to generate chapter notes

    // const result = await inngest.send({
    //     name: 'notes.generate',
    //     data:{
    //         course: dbResult[0].resp
    //     }


    // });
    // console.log(result);

    return NextResponse.json({result:dbResult[0]})
}


