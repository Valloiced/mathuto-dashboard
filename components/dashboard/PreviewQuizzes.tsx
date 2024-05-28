import Image from "next/image"
import Link from "next/link"

import type { Quizzes } from "@/global/types"

interface QuizCardsProps {
    name: string,
    numOfQuestions: number,
    quizType: string
}

interface PreviewQuizzesProps {
    quizzes: Quizzes[]
}

function QuizzesCards({ name, numOfQuestions, quizType } : QuizCardsProps) {
    quizType = quizType
        .split('-')
        .map((word) => word[0].toUpperCase() + word.substring(1))
        .join(' ');

    return (
        <div className="card px-6 py-6 bg-white gap-2">
            <p className="font-montserrat font-extrabold text-xl text-dark-blue">
                {name}
            </p>
            <div className="flex flex-row gap-2 text-white font-poppins text-xs font-semibold text-center items-center">
                <p className="bg-blue py-1 px-3 rounded-full">{numOfQuestions} Questions</p>
                <p className="bg-blue py-1 px-3 rounded-full">{quizType}</p>
            </div>
        </div>
    )
}

export default function PreviewQuizzes({ quizzes } : PreviewQuizzesProps) {
    const quizCards = quizzes.map((quiz) => (
        <QuizzesCards 
            key={quiz.id}
            name={quiz.details?.title}
            numOfQuestions={quiz.details?.numOfQuestions}
            quizType={quiz.details?.type}
        />
    ));
    
    return (
        <div className="flex flex-col gap-4 items">
            <h1 className="font-montserrat font-bold text-xl text-dark-blue">My Quizzes</h1>
            <div className="grid w-full gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                {quizCards}
            </div>
            <div className="flex flex-row w-full justify-center items-center">
                <Link className="global-btn px-12 py-2 my-4 shadow-lg" href='/quizzes'>View More</Link>
            </div>
        </div>
    )
}