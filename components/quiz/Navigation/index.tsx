import { useRouter } from "next/navigation";

import { MdOutlineArrowBackIosNew  } from "react-icons/md";

import type { ActiveTab } from "@/app/quizzes/[quiz_id]/page";

interface NavigationProps {
    activeTab: ActiveTab,
    toggleTab: (tab: ActiveTab) => void;
}


export default function Navigation({ activeTab = 'details', toggleTab } : NavigationProps) {
    const router = useRouter();

    return (
        <div className="flex flex-col w-full pb-2 gap-12">
            <div className="w-full">
                <button 
                    className="global-btn flex flex-row gap-2 items-center px-10 py-2 shadow-lg"
                    onClick={() => router.back()}
                >
                    <MdOutlineArrowBackIosNew />
                    <p>Back To Quizzes</p>
                </button>
            </div>
            <div className='flex flex-row w-full gap-8 border-b-[1px] border-b-black/25'>
                <nav 
                    className={`py-2 px-2 cursor-pointer ${activeTab === 'details' ? 'border-b-2 border-blue text-blue' : 'text-dark-blue/75'}`}
                    onClick={() => toggleTab('details')}
                >
                    <h3 className="font-montserrat font-medium text-base">Details</h3>
                </nav>
                <nav 
                    className={`py-2 px-2 cursor-pointer ${activeTab === 'statistics' ? 'border-b-2 border-blue text-blue' : 'text-dark-blue/75'}`}
                    onClick={() => toggleTab('statistics')}
                >
                    <h3 className="font-poppins font-medium text-base">Statistics</h3>
                </nav>
            </div>
        </div>
    )
}