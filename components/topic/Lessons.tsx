import { useRouter } from 'next/navigation';
import { MdEdit } from "react-icons/md";

interface LessonCardProps {
    index: number,
    title: string,
    subtopic?: string | undefined
}

type RedirectOption = 'edit' | 'view';

function LessonCard({ index, title, subtopic = '\u00A0' } : LessonCardProps ) {
    const router = useRouter();
    
    const handleClick = (option: RedirectOption) => {
        return router.push(`/modules/linear-algebra/precise?type=${option}`);
    }
    
    return (
        <div className="flex min-md:flex-row max-sm:flex-col justify-between py-8 px-8 min-md:items-center shadow-md bg-white cursor-pointer">
            <div className="flex flex-row gap-8 items-center">
                <h2 className="font-montserrat font-bold text-2xl text-blue">{index}</h2>
                <div className="flex flex-col">
                    <h2 className="font-montserrat font-bold text-xl text-dark-blue">{title}</h2>
                    <p className="font-montserrat text-xs text-black text-opacity-50">{subtopic}</p>
                </div>
            </div>
            <div className='flex flex-row gap-6 max-sm:self-center py-1'>
                <button 
                    className='global-btn w-28 items-center justify-center'
                    onClick={() => handleClick('view')}
                >
                    <p className='text-sm'>View</p>
                </button>
                <button 
                    className='group global-btn flex flex-row gap-2 w-28 justify-center items-center font-montserrat font-bold [&]:text-tertiary-theme [&]:bg-white border-2 border-tertiary-theme hover:text-white'
                    onClick={() => handleClick('edit')}
                >
                    <MdEdit className="text-lg text-tertiary-theme text-opacity-75 group-hover:text-white transition-colors duration-300" />
                        <p className='text-sm'>Edit</p>
                </button>
            </div>
        </div>
    )
}

export default function Lessons() {
    return (
        <div className="flex flex-col my-4">
            <div className="flex flex-row justify-between items-center mt-4 mb-8">
                <h3 className="font-poppins font-semibold text-base text-dark-blue">Lessons in this Module (25)</h3>
                <button className="global-btn px-6 py-2 shadow-lg max-sm:self-center">+ Create New Lesson</button>
            </div>
            <div className="flex flex-col gap-8">
                {/* TODO: The substitute for missing semitopic is the module title */}
                <LessonCard index={1} title={'Precise'} subtopic={'Linear Algebra'} />
                <LessonCard index={2} title={'Precise'} subtopic={'Linear Algebra'} />
                <LessonCard index={3} title={'Precise'} subtopic={'Linear Algebra'} />
                <LessonCard index={4} title={'Precise'} subtopic={'Linear Algebra'} />
                <LessonCard index={5} title={'Precise'} subtopic={'Linear Algebra'} />
            </div>
        </div>
    )
}