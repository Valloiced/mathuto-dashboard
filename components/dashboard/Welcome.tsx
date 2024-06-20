import { MdCollectionsBookmark, MdQuiz } from 'react-icons/md';

interface WelcomeProps {
    firstName: string,
    moduleCount: number,
    quizCount: number
}

export default function Welcome({ firstName, moduleCount, quizCount } : WelcomeProps) {
    return (
        <div className="flex flex-col width-full shadow-md rounded-md overflow-hidden">
            <div className="flex flex-col px-6 py-6 gap-2 bg-primary-blue">
                <h2 className="font-poppins font-medium text-white text-lg">Welcome Back,</h2>
                <h1 className="font-montserrat font-bold text-white text-5xl">{firstName}!</h1>
            </div>
            <div className="flex w-full bg-white max-sm:flex-col">
                <div className="flex w-1/2 max-sm:w-full justify-center border-black border-opacity-10 border-r-2 max-sm:border-b-2 max-sm:border-r-0">
                    <div className="flex flex-row items-center py-10 gap-4">
                        <div className='global-icon'>
                            <MdCollectionsBookmark />
                        </div>
                        <div className="flex flex-col items-center text-dark-blue opacity-90">
                            <h2 className="font-montserrat font-medium text-sm">Modules Created</h2>
                            <h1 className="font-montserrat font-extrabold text-3xl">{moduleCount}</h1>
                        </div>
                    </div>
                </div>
                <div className="flex w-1/2 max-sm:w-full justify-center">
                    <div className="flex flex-row items-center py-10 gap-4">
                        <div className='global-icon'>
                            <MdQuiz />
                        </div>
                        <div className="flex flex-col items-center text-dark-blue opacity-90">
                            <h2 className="font-montserrat font-medium text-sm">Quizzes Created</h2>
                            <h1 className="font-montserrat font-extrabold text-3xl">{quizCount}</h1>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}