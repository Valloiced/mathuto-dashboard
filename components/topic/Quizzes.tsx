import { useRouter } from "next/navigation";
import Link from "next/link";
import SyncLoader from "react-spinners/SyncLoader";

import { MdQuiz } from "react-icons/md";

import type { Quizzes, QuizzesType } from "@/global/types";

interface QuizzesProps {
    loading: boolean,
    moduleId: string,
    quizzes: Quizzes[] | [];
}

interface QuizzesCardsProps {
    id?: string,
    title?: string,
    numOfQuestions?: number,
    type?: QuizzesType,
}

function QuizzesCards({ id, title, type, numOfQuestions } : QuizzesCardsProps) {
    const quizType = type?.split('-')
        .map((word) => word[0].toUpperCase() + word.substring(1))
        .join(' ');

    return (
        <Link className="card flex flex-col justify-between px-6 py-6 bg-white gap-4 h-full" href={`/quizzes/${id}`}>
            <div className="flex flex-row gap-4 items-center">
                <div className="flex-shrink-0">
                    <MdQuiz className="text-dark-blue text-3xl" />
                </div>
                <h1 className="font-montserrat font-extrabold text-xl text-dark-blue uppercase">
                    {title}
                </h1>
            </div>
            <div className="flex flex-row gap-2 text-white font-poppins text-xs font-semibold text-center items-center">
                <p className="bg-blue py-1 px-3 rounded-full">{numOfQuestions} Questions</p>
                <p className="bg-blue py-1 px-3 rounded-full">{quizType}</p>
            </div>
        </Link>
    )
}

export default function Quizzes({ 
    loading,
    moduleId, 
    quizzes 
} : QuizzesProps) {
    const router = useRouter();

    const quizCards = quizzes.map((quizData) => (
        <QuizzesCards
            key={quizData.id}
            id={quizData.id}
            title={quizData.details?.title}
            type={quizData.details?.type}
            numOfQuestions={quizData.details?.numOfQuestions}
        />
    ))

    return (
        <div className="flex flex-col gap-4 my-4">
            <div className="flex flex-row justify-between items-center mt-4 mb-8">
                <h3 className="font-poppins font-semibold text-base text-dark-blue">Quizzes in this Module ({quizzes.length})</h3>
                <button 
                    className="global-btn px-6 py-2 shadow-lg max-sm:self-center"
                    onClick={() => router.push(`/quizzes/create?module_id=${moduleId}`)}
                >+ Create New Quizzes</button>
            </div>
            {loading ? (
                <div className="flex flex-row w-full justify-center items-center py-8">
                        <SyncLoader size={10} color="#48B2FF" />
                </div> 
            ) : !quizCards.length ? (
                <div className="flex flex-row w-full justify-center items-center">
                    <div className="flex flex-row justify-center w-1/2 py-10 bg-white rounded-3xl shadow-lg">
                        <h1 className="font-montserrat font-bold text-lg text-dark-blue">No quizzes created yet.</h1>
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