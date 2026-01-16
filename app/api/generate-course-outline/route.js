import { NextResponse } from "next/server";
import { courseOutlineAIModel } from "@/configs/AiModel";
import { db } from "@/configs/db"
import { STUDY_MATERIAL_TABLE } from "@/configs/schema"
import { inngest } from "@/inngest/client";



export async function POST(req) {

  const { courseId, topic, courseType, difficultyLevel, language, createdBy } = await req.json();

  if (!courseId || !topic || !courseType || !difficultyLevel || !language || !createdBy) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

  const PROMPT = `Create a comprehensive course structure for "${topic}" with difficulty level "${difficultyLevel}" designed for "${courseType}" preparation in "${language}" max 6.`;



  // const PROMPT = 'Generate a study material for '+topic+' for '+courseType+' and level of difficulty will be '+difficultyLevel+' with summary for each chapter, Topic list in each chapter, all result in JSON format';
  // Generate Course Layout using AI
 
  try {
     // It handles the API call, gets the response, and parses the JSON.
    const aiResult = await courseOutlineAIModel(PROMPT);

     // 2. ADDED: A crucial check to ensure the AI call was successful.
    if (!aiResult) {
      throw new Error("Failed to generate course outline from AI model.");
    }

  //Save  the result along with User Input
  const dbResult = await db.insert(STUDY_MATERIAL_TABLE).values({
    courseId: courseId,
    courseType: courseType,
    createdBy: createdBy,
    topic: topic,
    courseLayout: aiResult,
    difficultyLevel: difficultyLevel,
    language: language,
  }).returning({ resp: STUDY_MATERIAL_TABLE });

  console.log("Course Layout Generated:", dbResult);

  //Trigger the Inngest function to generate chapter notes

  const result = await inngest.send({
      name: 'notes.generate',
      data:{
          course: dbResult[0].resp
      }


  });
  console.log(result);

  return NextResponse.json({ result: dbResult[0] })
}
catch (error) {
    console.error("API Route Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
}

}
