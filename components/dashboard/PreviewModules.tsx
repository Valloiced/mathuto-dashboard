import Link from "next/link"
import Image from "next/image"
import { MaterialBGs } from "@/public/assets/bg"

import type { Modules } from "@/global/types"

interface ModuleCardsProps {
    name: string,
    numOfLessons?: number | undefined,
    numOfTopics?: number | undefined
}

interface PreviewModulesProps {
    modules: Modules[]
}

function ModulesCards({ name, numOfLessons, numOfTopics } : ModuleCardsProps) {
    return (
        <div className="card">
            <div className="relative w-full h-0 pb-[50%]">
                <Image
                    src={MaterialBGs[0]}
                    layout="fill"
                    objectFit="cover"
                    alt="Module Backgrounds"
                />
                <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-25">
                    <div className="relative justify-center items-center z-10">
                        <p className="font-montserrat font-extrabold text-dark-blue text-xl max-sm:text-3xl text-center">
                            {name}
                        </p>
                        {/* <div className="absolute py-4 w-10 bg-white bg-opacity-60 top-0 backdrop-blur z-0" /> */}
                    </div>
                </div>
            </div>
            <div className="bg-white py-2 px-4">
                <p className="font-poppins font-medium text-xs text-black text-opacity-75">
                    {numOfTopics} Topics | {numOfLessons} Lessons
                </p>
            </div>
        </div>
    )
}

export default function PreviewModules({ modules } : PreviewModulesProps) {
    const moduleCards = modules.map((module) => (
        // Replace key with uid later
        <ModulesCards 
            key={module.name} 
            name={module.name}
            numOfTopics={0} // Temp (TODO: Modify api to filter subtopics)
            numOfLessons={module.noOfItems} 
        />
    ))
    
    return (
        <div className="flex flex-col gap-4">
            <h1 className="font-montserrat font-bold text-xl text-dark-blue">My Modules</h1>
            <div className="grid w-full gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                {moduleCards}
            </div>
            <div className="flex flex-row w-full justify-center items-center">
                <Link className="global-btn px-12 py-2 my-4 shadow-lg" href='/modules'>View More</Link>
            </div>
        </div>
    )
}