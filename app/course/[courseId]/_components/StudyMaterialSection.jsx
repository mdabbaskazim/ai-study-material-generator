import React, { useEffect, useState } from "react";
import MaterialCardItem from "./MaterialCardItem";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { RefreshCw } from "lucide-react";

const StudyMaterialSection = ({ courseId, course }) => {
  const [studyTypeContent, setStudyTypeContent] = useState();
  const [loading, setLoading] = useState(false);

  const MaterialList = [
    {
      name: "Notes/Chapters",
      desc: "Read notes to prepare",
      icon: "/notes.png",
      path: "/notes",
      type: "notes",
    },
    {
      name: "Flashcard",
      desc: "Flashcards help to remember the concepts",
      icon: "/flashcard.png",
      path: "/flashcards",
      type: "Flashcard",
    },
    {
      name: "Quiz",
      desc: "Great way to test your knowledge",
      icon: "/quiz.png",
      path: "/quiz",
      type: "Quiz",
    },
    {
      name: "Question/Answer",
      desc: "Help to practice your learning",
      icon: "/qa.png",
      path: "/qa",
      type: "QA",
    },
  ];

  useEffect(() => {
    GetStudyMaterial();
  }, []);

  const GetStudyMaterial = async () => {
    try {
      setLoading(true);
      const result = await axios.post("/api/study-type", {
        courseId: courseId,
        studyType: "ALL",
      });
      setStudyTypeContent(result?.data);
      console.log(result?.data);
    } catch (error) {
      console.error("Error fetching study material:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-5">
      {/* Header with Refresh Button */}
      <div className="flex justify-between items-center mb-5">
        <h2 className="font-medium text-2xl">Study Material</h2>
        
        <Button
          variant="outline"
          onClick={GetStudyMaterial}
          className="border-primary text-primary"
          disabled={loading} // Prevent multiple clicks
        >
          {/* Spin the icon if loading */}
          <RefreshCw className={`mr-2 h-4 w-4 ${loading && "animate-spin"}`} />
          Refresh
        </Button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-5 mt-3">
        {MaterialList.map((item, index) => (
          <MaterialCardItem
            key={index}
            item={item}
            studyTypeContent={studyTypeContent}
            course={course}
            refreshData={GetStudyMaterial}
          />
        ))}
      </div>
    </div>
  );
};

export default StudyMaterialSection;