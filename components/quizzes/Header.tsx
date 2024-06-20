import { useRouter } from 'next/navigation';

import { MdCollectionsBookmark } from 'react-icons/md';

export default function Header() {
    const router = useRouter();

    return (
        <div className='flex flex-row justify-between items-center max-sm:flex-col max-sm:items-start'>
            <div className='flex flex-row gap-4 items-center'>
                <div className='global-icon'>
                    <MdCollectionsBookmark />
                </div>
                <h2 className='font-montserrat font-bold text-dark-blue text-lg'>My Quizzes</h2>
            </div>
            <button 
                className="global-btn px-6 py-2 my-4 shadow-lg max-sm:self-center"
                onClick={() => router.push('/quizzes/create')}
            >
                + Create New Quiz
            </button>
        </div>
    )
}