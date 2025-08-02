// To run this code you need to install the following dependencies:
// npm install @google/genai mime
// npm install -D @types/node

import {
  GoogleGenAI,
} from '@google/genai';

  const ai = new GoogleGenAI({
    apiKey: process.env.NEXT_PUBLIC_GEMINI_API_KEY,
  });
  const config = {
    responseMimeType: 'application/json',
  };
  const model = 'gemini-2.0-flash';
  const contents = [
    {
      role: 'user',
      parts: [
        {
          text: `Create a comprehensive course structure for "JavaScript Fundamentals" with difficulty level "Easy" designed for "job interview" preparation.

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
}
`,
        },
      ],
    },
    {
      role: 'model',
      parts: [
        {
          text: `{
  "courseTitle": "JavaScript Fundamentals for Job Interviews",
  "courseType": "job interview",
  "difficulty": "Easy",
  "courseSummary": "This course provides a solid foundation in JavaScript fundamentals, focusing on concepts frequently tested in job interviews for front-end and full-stack developer roles. The course will equip you with the knowledge and confidence to answer common JavaScript interview questions effectively.",
  "chapters": [
    {
      "chapterTitle": "Introduction to JavaScript",
      "chapterSummary": "This chapter introduces JavaScript's role in web development and basic syntax. It covers how to execute JavaScript code and fundamental concepts.",
      "topics": [
        "What is JavaScript?",
        "JavaScript's role in web development (Front-end vs Back-end)",
        "Setting up a JavaScript development environment (Browsers, Editors)",
        "Basic JavaScript syntax",
        "Writing your first JavaScript program (Hello World)",
        "Using the console for output and debugging"
      ]
    },
    {
      "chapterTitle": "Variables, Data Types, and Operators",
      "chapterSummary": "This chapter explains how to store and manipulate data using variables, different data types, and operators. It provides essential knowledge for writing JavaScript code.",
      "topics": [
        "Variables: \`var\`, \`let\`, and \`const\`",
        "Data Types: Primitive (String, Number, Boolean, Null, Undefined, Symbol)",
        "Data Types: Non-primitive (Objects, Arrays)",
        "Operators: Arithmetic, Assignment, Comparison, Logical",
        "Type Coercion",
        "Understanding \`null\` vs. \`undefined\`",
        "Importance of using \`const\` and \`let\` over \`var\`"
      ]
    },
    {
      "chapterTitle": "Control Flow: Conditionals and Loops",
      "chapterSummary": "This chapter explores conditional statements (if/else) and loops (for, while) to control the execution flow of JavaScript code. It enables creating dynamic and responsive applications.",
      "topics": [
        "Conditional statements: \`if\`, \`else if\`, \`else\`",
        "Switch statements",
        "Loops: \`for\`, \`while\`, \`do...while\`",
        "Loop control: \`break\` and \`continue\`",
        "Common use cases for conditionals and loops",
        "Importance of avoiding infinite loops"
      ]
    },
    {
      "chapterTitle": "Functions",
      "chapterSummary": "This chapter introduces functions, reusable blocks of code. It covers function declaration, parameters, return values, and scope, enabling modular programming.",
      "topics": [
        "Function declaration and invocation",
        "Function parameters and arguments",
        "Return values",
        "Function scope (Global vs. Local)",
        "Anonymous functions",
        "Arrow functions",
        "Function Hoisting",
        "Immediately Invoked Function Expressions (IIFE)"
      ]
    },
    {
      "chapterTitle": "Arrays",
      "chapterSummary": "This chapter covers arrays, a way to store collections of data. It covers array creation, manipulation, and common methods for data processing.",
      "topics": [
        "Array creation and initialization",
        "Accessing array elements",
        "Array methods: \`push\`, \`pop\`, \`shift\`, \`unshift\`, \`splice\`, \`slice\`",
        "Iterating over arrays: \`for\` loop, \`forEach\`, \`map\`, \`filter\`, \`reduce\`",
        "Multi-dimensional arrays",
        "Array Destructuring",
        "Common array interview questions"
      ]
    },
    {
      "chapterTitle": "Objects",
      "chapterSummary": "This chapter explains objects, a way to store key-value pairs. It covers object creation, manipulation, and accessing object properties.",
      "topics": [
        "Object creation and initialization",
        "Accessing object properties (dot notation and bracket notation)",
        "Adding, modifying, and deleting object properties",
        "Object methods",
        "\`this\` keyword",
        "Object Destructuring",
        "Common object interview questions",
        "JSON basics (JavaScript Object Notation)"
      ]
    },
    {
      "chapterTitle": "DOM Manipulation (Introduction)",
      "chapterSummary": "This chapter provides a basic introduction to the Document Object Model (DOM) and how to manipulate HTML elements using JavaScript. It covers selecting elements and modifying their content and attributes.",
      "topics": [
        "What is the DOM?",
        "Selecting elements: \`getElementById\`, \`getElementsByClassName\`, \`querySelector\`, \`querySelectorAll\`",
        "Modifying element content: \`innerHTML\`, \`textContent\`",
        "Modifying element attributes",
        "Adding and removing elements",
        "Event Listeners (basic)",
        "Common DOM Manipulation interview questions"
      ]
    }
  ]
}`,
        },
      ],
    },
    {
      role: 'user',
      parts: [
        {
          text: `INSERT_INPUT_HERE`,
        },
      ],
    },
  ];

//   const response = await ai.models.generateContentStream({
//     model,
//     config,
//     contents,
//   });
//   let fileIndex = 0;
//   for await (const chunk of response) {
//     console.log(chunk.text);
//   }




const chat = ai.chats.create({
    model,
    config,
    contents,
});

