import { eq } from 'drizzle-orm';
import { db } from "@/configs/db";
import { USER_TABLE, CHAPTER_NOTES_TABLE, STUDY_MATERIAL_TABLE } from "@/configs/schema";
import { inngest } from "@/inngest/client";
import { generateNotesAiModel } from '@/configs/AiModel';

export const helloWorld = inngest.createFunction(
  { id: "hello-world" },
  { event: "test/hello.world" },
  async ({ event, step }) => {
    await step.sleep("wait-a-moment", "1s");
    return { message: `Hello ${event.data.email}!` };
  },
);

export const CreateNewUser = inngest.createFunction(
  { id: "create-user" },
  { event: "user.create" },
  async ({ event, step }) => {
    const { user } = event.data;
    // Get Event Data
    const result = await step.run('Check User and create New if  Not in DB', async () => {
      // Logic to check if the user already exists

      const result = await db.select().from(USER_TABLE)
        .where(eq(USER_TABLE.email, user?.primaryEmailAddress?.emailAddress));

      console.log(result);
      if (result?.length == 0) {
        //if Not, then add to database
        const userResp = await db.insert(USER_TABLE).values({
          name: user?.fullName,
          email: user?.primaryEmailAddress?.emailAddress,
        }).returning({ id: USER_TABLE.id });
        return userResp;
      }
      return result;
    });
    return 'Success';
  },
  // Step is to Send Welcome Email Notification

  // Step to send Email notification After 3 Days once user join  it
);

// export const  GenerateNotes = inngest.createFunction(
//   {id: 'Generate-course'},
//   {event: 'notes.generate'},
//   async({event, step}) =>{
//     const {course} = event.data; // All Record Info

//     // Generate Notes for each Chapter with AI
//     const notesResult = await step.run('Generate Chapter Notes', async()=>{
//       const Chapters = course?.CourseLayout?.chapters;
//       let index=0;
//       Chapters.forEach(async(chapter) => {
//         const PROMPT = "Generate exam material detail content for each chapter, Make sure to include all topic point in the content, make sure to give content in HTML format(Do not Add HTMLKL, Head, Body, Title tag), use li tag instead of '*',The chapters:" + JSON.stringify(chapter);
//         const result = await generateNotesAiModel.sendMessage(PROMPT);
//         const aiResp = result.response.text();

//         await db.insert(CHAPTER_NOTES_TABLE).values({
//           chapterId: index,
//           courseId: course?.courseId,
//           notes: aiResp
//         })
//         index= index+1;
//       })
//       return 'completed'
//     })

//       //Update Status to 'Ready'
//       const updateCourseStatusResult = await  step.run('Update Course Status to Ready', async ()=>{
//         const result = await db.update(STUDY_MATERIAL_TABLE).set({
//           status: 'Ready'
//         }).where(eq(STUDY_MATERIAL_TABLE.courseId, course?.courseId))
//         return 'Success';
//       });

//   }
// )