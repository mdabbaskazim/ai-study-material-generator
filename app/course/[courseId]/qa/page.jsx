"use client";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import StepProgress from "../_components/StepProgress";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

function QnAPage() {
  const { courseId } = useParams();
  const router = useRouter();
  const [qnaData, setQnaData] = useState([]);
  const [stepCount, setStepCount] = useState(0);
  const [loading, setLoading] = useState(true);

  // New States for User Input
  const [userAnswer, setUserAnswer] = useState("");
  const [isCorrectAnswerRevealed, setIsCorrectAnswerRevealed] = useState(false);

  useEffect(() => {
    GetQnA();
  }, []);

  // Reset input and hide answer when the question changes
  useEffect(() => {
    setUserAnswer("");
    setIsCorrectAnswerRevealed(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [stepCount]);

  const GetQnA = async () => {
    try {
      setLoading(true);
      const result = await axios.post("/api/study-type", {
        courseId: courseId,
        studyType: "QA",
      });
      const questions = result?.data?.content?.qna_list || [];
      setQnaData(questions);
    } catch (error) {
      console.error("Error fetching Q&A data:", error);
    } finally {
      setLoading(false);
      toast.success("Pls Refresh! If QnA is not displayed");
    }
  };

  const goToCoursePage = () => {
    router.push(`/course/${courseId}`);
  };

  const handleUserSubmit = () => {
    setIsCorrectAnswerRevealed(true);
  };

  const currentQuestion = qnaData[stepCount];

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="font-bold text-3xl mb-8 text-center text-gray-800">
        Question & Answer
      </h2>

      {/* Loading State */}
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      ) : qnaData.length > 0 && currentQuestion ? (
        <>
          <StepProgress
            data={qnaData}
            stepCount={stepCount}
            setStepCount={(value) => setStepCount(value)}
          />

          <div className="mt-8 flex flex-col gap-6">
            {/* Question Box (Blue theme) */}
            <div className="p-6 bg-blue-50 border-l-4 border-blue-500 rounded-r-lg shadow-md">
              <h3 className="font-bold text-xl text-blue-800 flex items-center gap-2">
                <span>🧐</span> Question {stepCount + 1}
              </h3>
              <p className="text-blue-900 mt-3 text-lg leading-relaxed font-medium">
                {currentQuestion.question}
              </p>
            </div>

            {/* User Input Area (Indigo theme) */}
            {!isCorrectAnswerRevealed && (
              <div className="p-6 bg-indigo-50 border border-indigo-100 rounded-lg shadow-md transition-all">
                <label
                  htmlFor="userAnswer"
                  className="block font-bold text-xl text-indigo-700 mb-3"
                >
                  ✏️ Your Turn
                </label>
                <textarea
                  id="userAnswer"
                  className="w-full p-4 border border-indigo-200 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all text-gray-700 text-md resize-y"
                  rows="5"
                  placeholder="Type your answer here to compare with the actual result..."
                  value={userAnswer}
                  onChange={(e) => setUserAnswer(e.target.value)}
                ></textarea>
                <div className="flex justify-end mt-4">
                  <Button
                    onClick={handleUserSubmit}
                    disabled={!userAnswer.trim()}
                    className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-6 px-8 text-lg"
                  >
                    Reveal Answer ✨
                  </Button>
                </div>
              </div>
            )}

            {/* Answer Display Area */}
            {isCorrectAnswerRevealed && (
              <div className="flex flex-col gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                {/* User's Answer Review */}
                <div className="p-5 bg-indigo-50 border-l-4 border-indigo-300 rounded-r-md opacity-90">
                  <h3 className="font-bold text-md text-indigo-700 mb-2">
                    Your Answer:
                  </h3>
                  <p className="text-gray-800 italic whitespace-pre-wrap bg-white/50 p-3 rounded-md">
                    {userAnswer || "No answer provided."}
                  </p>
                </div>

                {/* Actual Answer Box (Green theme) */}
                <div className="p-6 bg-green-50 border-l-4 border-green-500 rounded-r-lg shadow-md relative overflow-hidden">
                  <div className="absolute -right-6 -bottom-6 text-green-100 opacity-50 pointer-events-none">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-32 h-32"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>

                  <h3 className="font-bold text-xl text-green-800 flex items-center gap-2 relative z-10">
                    <span>✅</span> Correct Answer
                  </h3>
                  <div className="text-green-900 mt-3 text-lg leading-relaxed relative z-10 whitespace-pre-wrap">
                    {currentQuestion.answer}
                  </div>
                </div>

                {/* Compare Note */}
                {stepCount < qnaData.length - 1 && (
                  <div className="text-center text-gray-500 font-medium mt-2 bg-white p-2 rounded-full shadow-sm border mx-auto w-fit px-6">
                    👆 Click 'Next' above to proceed
                  </div>
                )}
              </div>
            )}

            {/* Show "Go to Course Page" on Last Question */}
            {stepCount === qnaData.length - 1 && isCorrectAnswerRevealed && (
              <div className="flex justify-center mt-8 animate-bounce-in">
                <Button
                  onClick={goToCoursePage}
                  className="bg-green-600 hover:bg-green-700 text-white font-bold py-6 px-8 text-lg rounded-xl shadow-lg transform transition hover:scale-105"
                >
                  🎉 Finish & Go to Course Page
                </Button>
              </div>
            )}
          </div>
        </>
      ) : (
        <div className="flex flex-col items-center justify-center text-gray-500 mt-20 bg-gray-50 p-10 rounded-xl border-dashed border-2 border-gray-300">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-16 h-16 mb-4 text-gray-400">
            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
          </svg>
          <p className="text-xl font-semibold">No Q&A data available.</p>
        </div>
      )}
    </div>
  );
}

export default QnAPage;