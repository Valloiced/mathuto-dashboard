import { ChangeEvent, useState } from "react";
import { MdSearch } from "react-icons/md";

import Table from "./Table";

import type { QuizzesScore } from "@/global/types";

export interface StatisticsProps {
    isCreating?: boolean,
    quizScores: QuizzesScore[],
    numOfQuestions: number
}

export default function Statistics({ 
    isCreating,
    quizScores, 
    numOfQuestions 
} : StatisticsProps) {
    const [showRetake, setShowRetake] = useState<boolean>(true);

    const [search, setSearch] = useState<string>("");
    
    const toggleRetake = () => {
        setShowRetake(prev => !prev);
    }

    const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
      setSearch(event.target.value);
    };

    quizScores = quizScores.filter((score) =>
        score.username.toLowerCase().includes(search.toLowerCase())
    )

    return (
        <div className="flex flex-col gap-4 pb-10">
            <div className="mb-8">
                <h1 className="font-montserrat font-bold text-3xl text-dark-blue">Student Responses</h1>
                <p className="font-monteserrat text-dark-blue">
                    {quizScores.length} responses | {numOfQuestions} Questions
                </p>
            </div>
            {isCreating && (
                <div className="flex flex-row w-full justify-center py-10 bg-white rounded-3xl shadow-lg">
                    <h1 className="font-montserrat font-bold text-lg text-dark-blue">You need to create your quiz first to view the statistics</h1>
                </div>
            )}
            <div className={`${isCreating ? 'hidden' : 'flex'} flex-col gap-4`}>
                <div className="flex flex-row justify-between">
                    <div className="flex flex-row items-center gap-2 py-2 px-4 cursor-pointer">
                        <input
                            name={module.id}
                            type="checkbox"
                            checked={showRetake}
                            onChange={toggleRetake}
                        />
                        <label 
                            htmlFor={module.id} 
                            className="font-poppins font-medium text-dark-blue text-sm truncate"
                        >
                            Hide Retake Columns
                        </label>
                    </div>
                    <div className="flex flex-row items-center w-1/3 py-2 px-2 border-2 border-black/25 bg-white rounded-md">
                        <input 
                            type="text"
                            name="module-search"
                            placeholder="Search"
                            className="w-full outline-none font-montserrat font-medium text-dark-blue"
                            value={search}
                            onChange={handleSearch}
                        />
                        <MdSearch size={20} className="text-dark-blue/75" />
                    </div>
                </div>
                <Table 
                    quizScores={quizScores}
                    numOfQuestions={numOfQuestions}
                    showRetake={showRetake}
                />
            </div>
        </div>
    );
}
