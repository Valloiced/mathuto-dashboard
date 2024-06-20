import { ActiveTab } from "@/app/modules/[topic_id]/page"

interface NavigationProps {
    activeTab: ActiveTab,
    toggleTab: (tab: ActiveTab) => void;
}

export default function Navigation({ activeTab = 'lessons', toggleTab } : NavigationProps) {
    return (
        <div className="flex flex-row mt-10 w-full border-b-[1px] border-b-black/10">
            <nav 
                className={`py-1 px-6 bg-white cursor-pointer border-[1px] border-opacity-25 ${activeTab === 'lessons' ? 'border-black text-blue' : 'border-white'}`}
                onClick={() => toggleTab('lessons')}
            >
                <h3 className="font-poppins font-medium text-base">Lessons</h3>
            </nav>
            <nav 
                className={`py-1 px-6 bg-white cursor-pointer border-[1px] border-opacity-25 ${activeTab === 'quizzes' ? 'border-black text-blue' : 'border-white'}`}
                onClick={() => toggleTab('quizzes')}
            >
                <h3 className="font-poppins font-medium text-base">Quizzes</h3>
            </nav>
        </div>
    )
}