import Link from "next/link"
import SyncLoader from "react-spinners/SyncLoader";

import { MdQuiz } from 'react-icons/md';
 
import type { Quizzes } from "@/global/types"

interface QuizCardsProps {
    id: string,
    name: string,
    numOfQuestions: number,
    quizType: string
}

interface PreviewQuizzesProps {
    loading: boolean,
    quizzes: Quizzes[]
}

function QuizzesCards({ id, name, numOfQuestions, quizType } : QuizCardsProps) {
    quizType = quizType
        .split('-')
        .map((word) => word[0].toUpperCase() + word.substring(1))
        .join(' ');

    return (
        <Link 
            className="card px-6 py-6 bg-white gap-4"
            href={`/quizzes/${id}`}
        >
            <div className="flex flex-row gap-4 items-center">
                <div className="flex-shrink-0">
                    <MdQuiz className="text-dark-blue text-3xl" />
                </div>
                <h1 className="font-montserrat font-extrabold text-xl text-dark-blue uppercase">
                    {name}
                </h1>
            </div>
            <div className="flex flex-row gap-2 text-white font-poppins text-xs font-semibold text-center items-center">
                <p className="bg-blue py-1 px-3 rounded-full">{numOfQuestions} Questions</p>
                <p className="bg-blue py-1 px-3 rounded-full">{quizType}</p>
            </div>
        </Link>
    )
}

export default function PreviewQuizzes({ loading, quizzes } : PreviewQuizzesProps) {
    const quizCards = quizzes.map((quiz) => (
        <QuizzesCards 
            key={quiz.id}
            id={quiz.id}
            name={quiz.details?.title}
            numOfQuestions={quiz.details?.numOfQuestions}
            quizType={quiz.details?.type}
        />
    ));
    
    return (
        <div className="flex flex-col gap-4 items">
            <h1 className="font-montserrat font-bold text-xl text-dark-blue">My Quizzes</h1>
            {loading ? (
                <div className="flex flex-row w-full justify-center items-center py-8">
                    <SyncLoader size={10} color="#48B2FF" />
                </div> 
            ) : (
                <div className="grid w-full gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                    {quizCards}
                </div>
            )}
            <div className="flex flex-row w-full justify-center items-center">
                <Link className="global-btn px-12 py-2 my-4 shadow-lg" href='/quizzes'>View More</Link>
            </div>
        </div>
    )
}