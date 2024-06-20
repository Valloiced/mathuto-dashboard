import { ChangeEvent, MutableRefObject } from "react";

import { Modules } from "@/global/types";

interface ModuleModalProps {
    modules: Modules[],
    includedModules: string[],
    searchTerm: string,
    handleIncludeModuleToggle: (moduleId: string) => void,
    handleSearch: (e: ChangeEvent<HTMLInputElement>) => void,
    closeModuleModal: (action: string, e: any) => void
}

export default function ModuleModal({
    modules, 
    includedModules,
    searchTerm,
    handleIncludeModuleToggle,
    handleSearch,
    closeModuleModal
} : ModuleModalProps) {
    const moduleBoxes = modules?.map((module) => (
        <div
            key={module.id}
            className="flex flex-row items-center gap-2 py-2 px-4 hover:bg-lightWhite cursor-pointer"
            onClick={() => handleIncludeModuleToggle(module.id || '')}
        >
            <input
                name={module.id}
                type="checkbox"
                checked={includedModules.includes(module.id || '')}
                onChange={() => {}}
            />
            <label 
                htmlFor={module.id} 
                className="font-poppins font-medium text-dark-blue text-sm truncate"
            >
                {module.name}
            </label>
        </div> 
    ))

    return (
        <div className="flex flex-col absolute bg-white w-96 h-[32rem] rounded-sm shadow-xl">
            <div className="w-full px-4 py-4">
                <div className="w-full py-3 px-2 border-2 border-black/25 rounded-md">
                    <input 
                        type="text"
                        name="module-search"
                        placeholder="Search"
                        className="w-full outline-none font-montserrat font-medium text-dark-blue"
                        value={searchTerm}
                        onChange={handleSearch}
                    />
                </div>
            </div>
            <div className="flex flex-col overflow-scroll overflow-x-hidden pb-4 h-full">
                {moduleBoxes.length ? (
                    moduleBoxes
                ) : (
                    <h2 className="font-montserrat font-medium text-black/50 self-center">No modules available</h2>
                )}
            </div>
            <div className="flex flex-row justify-end w-full px-4 py-4 border-t-[1px] border-t-black/25">
                <button
                    className="font-montserrat font-semibold text-primary-blue cursor-pointer bg-none border-none"
                    onClick={(e) => closeModuleModal('close', e)}
                >
                    DONE
                </button>      
            </div>
        </div>
    )
}