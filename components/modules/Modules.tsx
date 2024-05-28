import Link from "next/link";
import Image from "next/image";
import { MaterialBGs } from "@/public/assets/bg";

interface ModuleCardsProps {
    title: string,
    numOfLessons?: number,
    numOfTopics?: number
}

function ModulesCards({ title, numOfLessons, numOfTopics } : ModuleCardsProps) {
    const getModuleBg = () => {
        const randIdx = Math.floor(Math.random() * MaterialBGs.length);
        return MaterialBGs[randIdx];
    }
    return (
        <Link className="card" href={"/modules/linear-algebra"}>
            <div className="relative w-full h-0 pb-[50%]">
                <Image
                    src={getModuleBg()}
                    layout="fill"
                    objectFit="cover"
                    alt="Module Backgrounds"
                />
                <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-25">
                    <div className="relative justify-center items-center z-10">
                        <p className="font-montserrat font-extrabold text-dark-blue text-xl max-sm:text-3xl">{title}</p>
                        {/* <div className="absolute py-4 w-10 bg-white bg-opacity-60 top-0 backdrop-blur z-0" /> */}
                    </div>
                </div>
            </div>
            <div className="bg-white py-2 px-4">
                <p className="font-poppins font-medium text-xs text-black text-opacity-75">5 Topics | 25 Lessons</p>
            </div>
        </Link>
    )
}

export default function Modules() {
    return (
        <div className="flex flex-col gap-4">
            <div className="grid w-full gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                <ModulesCards title="Linear Algebra" />
                <ModulesCards title="Linear Algebra" />
                <ModulesCards title="Linear Algebra" />
                <ModulesCards title="Linear Algebra" />
                <ModulesCards title="Linear Algebra" />
            </div>
        </div>
    )
}