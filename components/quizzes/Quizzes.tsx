import Link from "next/link";
import GridLoader from "react-spinners/GridLoader";

import { MdQuiz } from "react-icons/md";

import type { QuizzesWithTopics } from "@/app/quizzes/page";
import type { Modules, QuizzesType } from "@/global/types";

interface QuizzesProps {
    loading: boolean,
    quizzes: QuizzesWithTopics[] | [];
}

interface QuizzesCardsProps {
    id?: string,
    title?: string,
    numOfQuestions?: number,
    type?: QuizzesType,
    topics?: Modules[]
}

function QuizzesCards({ id, title, type, numOfQuestions, topics } : QuizzesCardsProps) {
    const quizType = type?.split('-')
        .map((word) => word[0].toUpperCase() + word.substring(1))
        .join(' ');

    const modulesIncluded = topics?.map((topic) => 
        <li key={topic.id} className="font-poppins text-xs text-black/50">
            {topic.name}
        </li>
    );

    return (
        <Link className="card flex flex-col justify-between px-6 py-6 bg-white gap-4 h-full" href={`quizzes/${id}`}>
            <div className="flex flex-row gap-4 items-center">
                <div className="flex-shrink-0">
                    <MdQuiz className="text-dark-blue text-3xl" />
                </div>
                <h1 className="font-montserrat font-extrabold text-xl text-dark-blue uppercase">
                    {title}
                </h1>
            </div>
            <div className="flex flex-row gap-2 text-white font-poppins text-xs font-semibold text-center items-center">
                <p className="bg-primary-theme py-1 px-3 rounded-full">{numOfQuestions} Questions</p>
                <p className="bg-tertiary-theme py-1 px-3 rounded-full">{quizType}</p>
            </div>
            <div className="flex flex-col border-t-2 border-t-black/25 gap-2 py-4">
                <h2 className="font-poppins text-xs font-semibold text-black/75 ">Modules Included</h2>
                <ul className="flex flex-col list-disc pl-6">
                    {modulesIncluded}
                </ul>
            </div>
        </Link>
    )
}

export default function Quizzes({ loading, quizzes } : QuizzesProps) {
    const quizCards = quizzes?.map((quizData) => (
        <QuizzesCards
            key={quizData.id}
            id={quizData.id}
            title={quizData.details?.title}
            type={quizData.details?.type}
            numOfQuestions={quizData.details?.numOfQuestions}
            topics={quizData.details?.topics}
        />
    ))

    return (
        <div className="flex flex-col gap-4">
            {loading ? (
                <div className="flex flex-row w-full justify-center items-center h-96">
                    <GridLoader size={10} color="#48B2FF" />
                </div> 
            ) : !quizCards.length ? (
                <div className="flex flex-row w-full justify-center items-center">
                    <div className="flex flex-row justify-center w-1/2 py-10 bg-white rounded-3xl shadow-lg">
                        <h1 className="font-montserrat font-bold text-lg text-dark-blue">No lessons created yet.</h1>
                    </div>
                </div>
            ) : (
                <div className="grid w-full gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                    {quizCards}
                </div>
            )}
        </div>
    )
}