import Link from "next/link";
import SyncLoader from "react-spinners/SyncLoader";

import { LuBookMinus } from "react-icons/lu";

import type { Modules } from "@/global/types";

interface ModuleCardsProps {
    id?: string,
    name?: string;
    numOfLessons?: number;
    numOfTopics?: number;
}

interface PreviewModulesProps {
    loading: boolean,
    modules: Modules[];
}

function ModulesCards({ id, name, numOfLessons, numOfTopics }: ModuleCardsProps) {
    return (
        <Link 
            className="card flex flex-col justify-between px-6 py-6 bg-white gap-4 h-full" 
            href={`modules/${id}`}
        >
            <div className="flex flex-row gap-4 items-center">
                <div className="flex-shrink-0">
                    <LuBookMinus className="text-dark-blue text-3xl" />
                </div>
                <h1 className="font-montserrat font-extrabold text-xl text-dark-blue uppercase">
                    {name}
                </h1>
            </div>
            <div className="flex flex-row gap-2 text-white font-poppins text-xs font-semibold text-center items-center">
                <p className="bg-black/75 py-1 px-3 rounded-full">{numOfLessons} Lessons</p>
            </div>
        </Link>
    );
}

export default function PreviewModules({ loading, modules }: PreviewModulesProps) {
    const moduleCards = modules.map((module) => (
        <ModulesCards 
            key={module.id}
            id={module.id}
            name={module.name}
            numOfTopics={0} // Temp (TODO: Modify api to filter subtopics)
            numOfLessons={module.noOfItems} 
        />
    ));

    return (
        <div className="flex flex-col gap-4">
            <h1 className="font-montserrat font-bold text-xl text-dark-blue">My Modules</h1>
            {loading ? (
                <div className="flex flex-row w-full justify-center items-center py-8">
                    <SyncLoader size={10} color="#48B2FF" />
                </div> 
            ) : (
                <div className="grid w-full gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                    {moduleCards}
                </div>
            )}
            <div className="flex flex-row w-full justify-center items-center">
                <Link className="global-btn px-12 py-2 my-4 shadow-lg" href='/modules'>View More</Link>
            </div>
        </div>
    );
}
