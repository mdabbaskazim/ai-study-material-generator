import { eq } from 'drizzle-orm';
import { db } from "@/configs/db";
import {
  USER_TABLE,
  CHAPTER_NOTES_TABLE,
  STUDY_MATERIAL_TABLE,
  STUDY_TYPE_CONTENT_TABLE
} from "@/configs/schema";
import { inngest } from "@/inngest/client";
import { 
  generateFlashCardsAiModel, 
  generateNotesAiModel,
  GenerateQuizAiModel,
  GenerateQnAAiModel
 } from '@/configs/AiModel';

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

    const result = await step.run(
      "CheckUser And create new if not in DB",
      async () => {
        try {
          // Check if the user already exists
          const existingUser = await db
            .select()
            .from(USER_TABLE)
            .where(
              eq(USER_TABLE.email, user?.primaryEmailAddress?.emailAddress)
            );

          if (existingUser?.length === 0) {
            // If not, then add to db with proper field names
            const userResp = await db
              .insert(USER_TABLE)
              .values({
                name: user?.fullName || "", // Match the schema column name
                email: user?.primaryEmailAddress?.emailAddress || "",
                isMember: false,
              })
              .returning({ id: USER_TABLE.id });

            console.log("New user created:", userResp);
            return userResp;
          }

          console.log("Existing user found:", existingUser);
          return existingUser;
        } catch (error) {
          console.error("Error in CreateNewUser:", error);
          throw error; // Re-throw to let Inngest handle the error
        }
      }
    );

    return { status: "Success", userId: result[0]?.id };
  }
);


export const GenerateNotes = inngest.createFunction(
  { id: 'Generate-course' },
  { event: 'notes.generate' },
  async ({ event, step }) => {
    const { course } = event.data; // All Record Info
    try {
      // Generate Notes for each Chapter with AI
      const notesResult = await step.run('Generate Chapter Notes', async () => {
        const Chapters = course?.courseLayout?.chapters;
        const courseType = course?.courseType;
        const difficultyLevel = course?.difficultyLevel;

        if (!Chapters || !Array.isArray(Chapters)) {
          throw new Error("No chapters found in course layout");
        }

        // let index=0;
        // Chapters.forEach(async(chapter) => {
        //   const PROMPT = `Generate ${difficultyLevel} ${courseType} material detail content for each chapter, Make sure to include all topic point in the content, make sure to give content in Format as clean HTML fragments (NO <html>, <head>, <body>, or <title> tags,Use semantic HTML5 tags: <h2>, <h3>, <h4>, <p>, <ul>, <li>, <strong>, <em>, <code>, <section>, Use <ul> and <li> tags for all lists (never use asterisks or dashes),Ensure all topics are thoroughly covered, The chapters:` + JSON.stringify(chapter);
        //   // const result = await generateNotesAiModel.sendMessage(PROMPT);
        //   // const aiResp = result.response.text();
        //     const aiResp = await generateNotesAiModel(PROMPT);

        //   // Insert notes into CHAPTER_NOTES_TABLE
        //   await db.insert(CHAPTER_NOTES_TABLE).values({
        //     chapterId: index,
        //     courseId: course?.courseId,
        //     notes: aiResp
        //   })
        //   index= index+1;
        // })

        // Use Promise.all to wait for all chapter notes to be generated
        await Promise.all(
          Chapters.map(async (chapter, index) => {
            const PROMPT = `Generate ${difficultyLevel} ${courseType} material detail content for each chapter, 
            Make sure to include all topic point in the content, 
            make sure to give content in Format as clean HTML fragments (NO <html>, <head>, <body>, or <title> tags,Use semantic HTML5 tags: <h1>, <h2>, <h3>, <h4>, <p>, <ul>, <li>, <strong>, <em>, <code>, <section>, Use <ul> and <li> tags for all lists (never use asterisks or dashes),
            Ensure all topics are thoroughly covered, The chapters:` + JSON.stringify(chapter);

            const aiResp = await generateNotesAiModel(PROMPT);

            // Insert notes into CHAPTER_NOTES_TABLE
            await db.insert(CHAPTER_NOTES_TABLE).values({
              chapterId: index + 1, // Using 1-based indexing for chapters
              courseId: course?.courseId,
              notes: aiResp,
            });
          })
        );

        return 'completed';
      });

      //Update Status to 'Ready'
      const updateCourseStatusResult = await step.run('Update Course Status to Ready', async () => {
        await db.update(STUDY_MATERIAL_TABLE).set({
          status: 'Ready'
        }).where(eq(STUDY_MATERIAL_TABLE.courseId, course?.courseId))
        return 'Success';
      });

      return {
        status: "success",
        notesResult,
        updateCourseStatusResult,
      };
    } catch (error) {
      console.error("Error in GenerateNotes:", error);

      // Update status to error in case of failure
      await db
        .update(STUDY_MATERIAL_TABLE)
        .set({
          status: "Error",
        })
        .where(eq(STUDY_MATERIAL_TABLE.courseId, course?.courseId));

      throw error; // Re-throw to let Inngest handle the error
    }

  }
);

//Used to generate flash cards, quiz and qna
export const GenerateStudyTypeContent = inngest.createFunction(
  { id: "Generate Study Type Content" },
  { event: "studyType.content" },

  async ({ event, step }) => {
    const { studyType, prompt, courseId, recordId } = event.data;

    const AiResult = await step.run('Generating Flashcard',
      async () => {
        let result;
        if (studyType === "Flashcard") {
          result =  await generateFlashCardsAiModel(prompt);
        } else if (studyType === "Quiz") {
          result = await GenerateQuizAiModel(prompt);
        } else if (studyType === "QA") {
          result = await GenerateQnAAiModel(prompt); // Add new condition
        } else {
          throw new Error(`Unsupported studyType: ${studyType}`);
        }
        const AIResult = result;
        return AIResult;
      });

      //Save the result
      const DbResult = await step.run("Save Result to DB", async () => {
      const result = await db
        .update(STUDY_TYPE_CONTENT_TABLE)
        .set({
          content: AiResult,
          status: "Ready",
        })
        .where(eq(STUDY_TYPE_CONTENT_TABLE.id, recordId));        

      return "Data Inserted";
    });
  }
);