import { useRouter } from 'next/navigation';
import SyncLoader from "react-spinners/SyncLoader";

import { MdEdit } from "react-icons/md";

import { Lessons as LessonsType } from '@/global/types';

type RedirectOption = 'edit' | 'view';

interface LessonsProps {
    loading: boolean,
    topicId: string,
    title?: string,
    numOfLessons: number,
    lessons: LessonsType[]
}

interface LessonCardProps {
    id: string,
    index: number,
    title: string,
    subtopic?: string | undefined,
    handleRedirect: (option: RedirectOption, lessonId: string) => void
}

function LessonCard({ id, index, title, subtopic = '\u00A0', handleRedirect } : LessonCardProps ) {
    return (
        <div className="flex min-md:flex-row max-md:flex-col max-md:gap-4 justify-between py-8 px-8 min-md:items-center shadow-md bg-white">
            <div className="flex flex-row gap-8 items-center">
                <h2 className="font-montserrat font-bold text-2xl text-blue">{index}</h2>
                <div className="flex flex-col">
                    <h2 className="font-montserrat font-bold text-xl text-dark-blue line-clamp-1 max-md:line-clamp-none">{title}</h2>
                    <p className="font-montserrat text-xs text-black/75">{subtopic}</p>
                </div>
            </div>
            <div className='flex flex-row gap-6 max-md:self-center py-1'>
                <button 
                    className='global-btn w-28 items-center justify-center max-md:py-1'
                    onClick={() => handleRedirect('view', id)}
                >
                    <p className='text-sm'>View</p>
                </button>
                <button 
                    className='group global-btn flex flex-row gap-2 w-28 justify-center items-center font-montserrat font-bold max-md:py-2 [&]:text-tertiary-theme [&]:bg-white border-2 border-tertiary-theme hover:text-white hover:border-primary-theme'
                    onClick={() => handleRedirect('edit', id)}
                >
                    <MdEdit className="text-lg text-tertiary-theme text-opacity-75 group-hover:text-white transition-colors duration-300" />
                        <p className='text-sm'>Edit</p>
                </button>
            </div>
        </div>
    )
}

export default function Lessons({ 
    loading,
    topicId, 
    title, 
    numOfLessons, 
    lessons 
} : LessonsProps) {
    const router = useRouter();
    
    const handleRedirect = (option: RedirectOption, lessonId: string) => {
        return router.push(`/modules/${topicId}/${lessonId}?type=${option}`);
    }

    const lessonCards = lessons.map((lesson, index) => (
        <LessonCard 
            key={lesson.id}
            id={lesson.id}
            index={index + 1}
            title={lesson.name}
            subtopic={lesson.subtopic === '' || !lesson.subtopic ? title : lesson.subtopic}
            handleRedirect={handleRedirect}
        />
    ));

    return (
        <div className="flex flex-col my-4">
            <div className="flex flex-row justify-between items-center mt-4 mb-8">
                <h3 className="font-poppins font-semibold text-base text-dark-blue">Lessons in this Module ({numOfLessons})</h3>
                <button 
                    className="global-btn px-6 py-2 shadow-lg max-sm:self-center"
                    onClick={() => router.push(`/modules/${topicId}/create`)}
                >+ Create New Lesson</button>
            </div>
            {loading ? (
                <div className="flex flex-row w-full justify-center items-center py-8">
                        <SyncLoader size={10} color="#48B2FF" />
                </div> 
            ) : !lessonCards.length ? (
                <div className="flex flex-row w-full justify-center items-center">
                    <div className="flex flex-row justify-center w-1/2 py-10 bg-white rounded-3xl shadow-lg">
                        <h1 className="font-montserrat font-bold text-lg text-dark-blue">No lessons created yet.</h1>
                    </div>
                </div>
            ) : (
                <div className="flex flex-col gap-8">
                    {lessonCards}
                </div>
            )}
        </div>
    )
}