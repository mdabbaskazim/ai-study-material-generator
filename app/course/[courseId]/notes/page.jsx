"use client"
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

function ViewNotes() {
    const { courseId } = useParams();
    const [notes, setNotes] = useState([]);
    const [stepCount, setStepCount] = useState(0);
    const router = useRouter();

  useEffect(() => {
    GetNotes();
  }, []);

    const GetNotes = async () => {
    try {
      const result = await axios.post("/api/study-type", {
        courseId: courseId,
        studyType: "notes",
      });
      console.log(result?.data);
      setNotes(result?.data);

    } catch (error) {
      console.error("Failed to fetch notes:", error);
    }
  };

  const styleContent = (content) => {
  content = content
    .replace(/^```html/g, "")
    .replace(/```$/g, "")
    .trim();
  
  return content
    // Headings
    .replace(
      /<h1>/g,
      `<h1 class="text-5xl font-black mb-6 mt-8 text-gray-900 tracking-tight leading-tight">`
    )
    .replace(
      /<h2>/g,
      `<h2 class="text-4xl font-bold mb-5 mt-7 text-gray-800 tracking-wide leading-snug">`
    )
    .replace(
      /<h3>/g,
      `<h3 class="text-3xl font-bold mb-4 mt-6 text-gray-800 tracking-wide leading-snug">`
    )
    .replace(
      /<h4>/g,
      `<h4 class="text-2xl font-bold mb-4 mt-5 text-gray-700 tracking-tight leading-snug">`
    )
    .replace(
      /<h5>/g,
      `<h5 class="text-xl font-bold mb-3 mt-4 text-gray-700 tracking-tight leading-normal">`
    )
    .replace(
      /<h6>/g,
      `<h6 class="text-lg font-bold mb-3 mt-4 text-gray-700 tracking-tight leading-normal">`
    )
    // Paragraphs
    .replace(
      /<p>/g,
      `<p class="text-lg text-gray-700 leading-8 mb-6 mt-4 font-normal tracking-normal">`
    )
    // Lists
    .replace(
      /<li>/g,
      `<li class="text-base text-gray-700 leading-8 ml-6 mb-3 mt-2 font-normal">`
    )
    .replace(
      /<ul>/g,
      `<ul class="list-disc pl-8 mb-6 mt-4 space-y-2">`
    )
    .replace(
      /<ol>/g,
      `<ol class="list-decimal pl-8 mb-6 mt-4 space-y-2">`
    )
    // Blockquote
    .replace(
      /<blockquote>/g,
      `<blockquote class="border-l-4 border-blue-500 pl-6 py-4 italic text-gray-600 bg-gradient-to-r from-blue-50 to-indigo-50 mb-6 mt-4 rounded-r-lg shadow-md leading-8">`
    )
    // Text styling
    .replace(
      /<strong>/g,
      `<strong class="font-bold text-gray-900 tracking-tight">`
    )
    .replace(
      /<em>/g,
      `<em class="italic text-gray-700 tracking-wide">`
    )
    // Code
    .replace(
      /<code>/g,
      `<code class="px-2 py-1 rounded font-mono text-sm">`
    )
    .replace(
      /<pre>/g,
      `<pre class="bg-gradient-to-br from-gray-900 to-gray-800 text-gray-100 p-6 rounded-lg overflow-x-auto mb-6 mt-4 font-mono text-sm border-l-4 border-blue-500 shadow-lg">`
    )
    // Links
    .replace(
      /<a>/g,
      `<a class="text-blue-600 hover:text-blue-800 hover:underline cursor-pointer font-semibold transition-all duration-300 hover:shadow-md">`
    )
    // Images
    .replace(
      /<img/g,
      `<img class="max-w-full h-auto rounded-xl shadow-xl mb-6 mt-4 border-2 border-gray-200 hover:shadow-2xl transition-shadow duration-300" `
    )
    // Tables
    .replace(
      /<table>/g,
      `<table class="w-full border-collapse mb-6 mt-4 rounded-lg overflow-hidden shadow-lg">`
    )
    .replace(
      /<thead>/g,
      `<thead class="bg-gradient-to-r from-blue-600 to-purple-600">`
    )
    .replace(
      /<tbody>/g,
      `<tbody class="bg-white hover:bg-gray-50 transition-colors">`
    )
    .replace(
      /<tr>/g,
      `<tr class="border-b border-gray-200 hover:bg-gray-100 transition-colors duration-200">`
    )
    .replace(
      /<th>/g,
      `<th class="px-6 py-4 text-left font-bold text-white tracking-wide leading-relaxed">`
    )
    .replace(
      /<td>/g,
      `<td class="px-6 py-4 text-gray-700 leading-relaxed font-normal">`
    )
    // Horizontal rule
    .replace(
      /<hr>/g,
      `<hr class="border-t-2 border-gray-300 my-8" />`
    )
    // Buttons
    .replace(
      /<button>/g,
      `<button class="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-bold py-3 px-6 rounded-lg cursor-pointer shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 tracking-tight">`
    )
    // Form inputs
    .replace(
      /<input/g,
      `<input class="border-2 border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent font-normal leading-relaxed shadow-md transition-all duration-300" `
    )
    .replace(
      /<textarea>/g,
      `<textarea class="border-2 border-gray-300 rounded-lg px-4 py-3 font-mono focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-full leading-relaxed shadow-md transition-all duration-300">`
    )
    .replace(
      /<select>/g,
      `<select class="border-2 border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent font-normal leading-relaxed shadow-md transition-all duration-300">`
    )
    // Spans with background color (for highlights)
    .replace(
      /<span>/g,
      `<span class="inline-block px-2 py-1 rounded font-semibold tracking-tight">`
    );
};


  if (!Array.isArray(notes)) {
    return <div>No notes available</div>;
  }
  return notes.length > 0 ? (
    <div>
      <div className="flex gap-5 items-center">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setStepCount((prev) => Math.max(prev - 1, 0))}
        >
          Previous
        </Button>
        {notes.map((_, index) => (
          <div
            key={index}
            className={`w-full h-2 rounded-full ${
              index < stepCount ? "bg-primary" : "bg-gray-200"
            }`}
          ></div>
        ))}
        <Button
          variant="outline"
          size="sm"
          onClick={() => setStepCount((prev) => Math.min(prev + 1, notes.length-1))}
        >
          Next
        </Button>
      </div>

      <div className="mt-10">
        <div
          className="note-content"
          dangerouslySetInnerHTML={{
            __html: styleContent(notes[stepCount].notes),
          }}
        ></div>

        {stepCount === notes.length - 1 && (
          <div className="flex items-center gap-10 flex-col justify-center">
            <div className="text-3xl font-bold mt-12 mb-6 text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 tracking-wide leading-snug py-4 border-t-2 border-b-2 border-gray-300">End of notes</div>
            <Button className="mb-10"
            size="lg"  
            onClick={() => router.back()}>
            Go to course page</Button>
          </div>
        )}
        </div>
    </div>
  ) : (
    <div>No notes available</div>
  );
}

export default ViewNotes;
