import React from 'react'
import { Button } from './ui/button'

export const Landing = () => {
  return (
    <main className="flex bg-white min-h-screen">
        <div className="min-w-[20%] flex justify-center items-center">
          <img src="/code.png" className="w-[75px] mb-60 -rotate-12"/>
        </div>
        <div className="flex flex-col min-w-[60%] mt-32">
            <h1 className="text-5xl font-black text-center">AI Powered <span className="text-primary">Exam Prep</span></h1>
            <h1 className="text-5xl font-black text-center mb-4">Material Generator</h1>
            <p className="font-semibold text-center text-gray-500">Your AI Exam Prep Companion: Effortless Study Material at Your Fingertips</p>
            <div className="flex justify-center items-center gap-4 mt-4">
              <Button>Get Started →</Button>
              <Button variant="outline">Temp</Button>
            </div>
        </div>
        <div className="min-w-[20%] flex justify-center items-center">
          <img src="/knowledge.png" className="w-[75px] mb-60 rotate-12" />
        </div>
    </main>
  )
}
