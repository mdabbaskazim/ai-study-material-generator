import React from 'react'
import { Textarea } from "@/components/ui/textarea"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

function TopicInput({setTopic, setDifficultyLevel, setLanguage}) {
    return (
        <div className="flex flex-col mt-10 w-full">
            <h2>Enter the topic or keywords for your study material</h2>
            <Textarea placeholder='Start writing here' className="mt-2" onChange={(event) => setTopic(event.target.value)} />

            <h2 className='mt-5 mb-3'>Select the difficulty Level</h2>
            <Select onValueChange={(value) => setDifficultyLevel(value)}>
                <SelectTrigger className="w-full">
                    <SelectValue placeholder="Difficulty Level" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="Easy">Easy</SelectItem>
                    <SelectItem value="Moderate">Moderate</SelectItem>
                    <SelectItem value="Hard">Hard</SelectItem>
                </SelectContent>
            </Select>

             <h2 className='mt-5 mb-3'>Select the Language</h2>
            <Select onValueChange={(value) => setLanguage(value)}>
                <SelectTrigger className="w-full">
                    <SelectValue placeholder="Languages" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="English">English</SelectItem>
                    <SelectItem value="Hindi">Hindi</SelectItem>
                    <SelectItem value="Urdu">Urdu</SelectItem>
                </SelectContent>
            </Select>
        </div>
    )
}

export default TopicInput
