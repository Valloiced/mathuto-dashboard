import Link from "next/link";
import GridLoader from "react-spinners/GridLoader";

import { LuBookMinus } from "react-icons/lu";

import type { Modules as ModulesType } from '@/global/types';

interface ModulesProps {
    loading: boolean,
    modules: ModulesType[] | [];
}

interface ModuleCardsProps {
    id?: string,
    title?: string,
    numOfLessons?: number,
    numOfTopics?: number
}

function ModulesCards({ id, title, numOfLessons, numOfTopics } : ModuleCardsProps) {
    return (
        <Link className="card flex flex-col justify-between px-6 py-6 bg-white gap-4 h-full" href={`modules/${id}`}>
            <div className="flex flex-row gap-4 items-center">
                <div className="flex-shrink-0">
                    <LuBookMinus className="text-dark-blue text-3xl" />
                </div>
                <h1 className="font-montserrat font-extrabold text-xl text-dark-blue uppercase">
                    {title}
                </h1>
            </div>
            <div className="flex flex-row gap-2 text-white font-poppins text-xs font-semibold text-center items-center">
                <p className="bg-black/75 py-1 px-3 rounded-full">{numOfLessons} Lessons</p>
            </div>
        </Link>
    )
}

export default function Modules({ loading, modules } : ModulesProps) {
    const moduleCards = modules?.map((moduleData) => (
        <ModulesCards
            key={moduleData.id}
            id={moduleData.id}
            title={moduleData.name}
            numOfLessons={moduleData.noOfItems}
            numOfTopics={0}
        />
    ))

    return (
        <div className="flex flex-col gap-4">
            {loading ? (
                <div className="flex flex-row w-full justify-center items-center h-96">
                    <GridLoader size={10} color="#48B2FF" />
                </div> 
            ) : !moduleCards.length ? (
                <div className="flex flex-row w-full justify-center items-center">
                    <div className="flex flex-row justify-center w-1/2 py-10 bg-white rounded-3xl shadow-lg">
                        <h1 className="font-montserrat font-bold text-lg text-dark-blue">No lessons created yet.</h1>
                    </div>
                </div>
            ) : (
                <div className="grid w-full gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                    {moduleCards}
                </div>
            )}
        </div>
    )
}