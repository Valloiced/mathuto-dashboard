import { useState, useEffect, ChangeEvent, MutableRefObject } from 'react';

import ModuleModal from "./ModuleModal";

import useModalAutoClose from '@/hooks/useModalAutoClose';

import { FaChevronDown } from "react-icons/fa6";

import type { DetailsProps } from ".";
import { Modules } from '@/global/types';

export default function Details({ 
    modules,
    basicDetails, 
    quizType,
    detailInputRef,
    handleBasicInput,
    handleQuizChange,
    handleIncludeModuleToggle
} : DetailsProps) {

    let [openModuleModal, setOpenModuleModal, moduleModalRef] = useModalAutoClose(false);

    const [searchTerm, setSearchTerm] = useState<string>('');
    const [filteredItems, setFilteredItems] = useState<Modules[]>([]);

    // Clean up, just in case
    useEffect(() => {
        () => setOpenModuleModal(false);
    }, [openModuleModal, setOpenModuleModal])

    useEffect(() => {
        setFilteredItems(modules);
    }, [modules])

    const handleModuleToggle = (action: string, e: any) => {
        e.stopPropagation();

        setOpenModuleModal(action === 'open' ? true : false);
    }

    const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();

        const value = e.target.value;
        setSearchTerm(value);
    
        const filtered = modules.filter((module) => 
            module.name?.toLowerCase().includes(value.toLowerCase())
        );
        
        setFilteredItems(filtered);
      };

    const includeModulesText = basicDetails.module_ids.length 
        ? basicDetails.module_ids.length + " Module" + (basicDetails.module_ids.length > 1 ? "s" : "")
        : "Select"

    return (
        <div className="flex flex-col gap-8">
            {/* Title */}
            <div
                ref={(ref) => { ref && (detailInputRef.current.title = ref) }}
                className="group w-full px-4 py-2 border-2 border-black/25 rounded-md bg-white focus-within:border-blue"
            >
                <h3 className="font-montserrat font-medium text-xs text-black group-focus-within:text-blue">Title (Required)</h3>
                <div className="flex flex-col justify-evenly">
                    <input 
                        type="text"
                        name="title"
                        value={basicDetails.title}
                        maxLength={60} 
                        className="font-montserrat font-semibold text-sm py-2 w-full text-dark-blue outline-none placeholder:font-normal"
                        placeholder="Add Title"
                        onChange={handleBasicInput}
                        required
                    />
                </div>   
            </div>
            {/* Description */}
            <div
                ref={(ref) => { ref && (detailInputRef.current.description = ref) }}
                className="group w-full px-4 py-2 border-2 border-black/25 rounded-md bg-white focus-within:border-blue"
            >
                <h3 className="font-montserrat font-medium text-xs group-focus-within:text-blue">Description (Required)</h3>
                <div className="flex flex-col justify-evenly"> 
                    <input 
                        type="text" 
                        name="description"
                        value={basicDetails.description}
                        maxLength={200} 
                        className="font-montserrat font-semibold text-sm py-2 w-full text-dark-blue outline-none placeholder:font-normal"
                        placeholder="Add Description"
                        onChange={handleBasicInput}
                        required
                    />
                </div>   
            </div>
            <div className="flex flex-row justify-between w-full items-end">
                {/* Include Modules */}
                <div className="flex flex-col gap-4 w-1/2">
                    <div className="flex flex-col gap-1">
                        <h2 className="font-montserrat font-bold text-dark-blue">Include Modules</h2>
                        <p className="font-poppins font-normal text-black text-opacity-75 text-sm">
                            You can specify where do you want your quiz to be attach into. You need to attach at least one module.
                        </p>
                    </div>
                    <div
                        ref={(ref) => {
                            if (ref) {
                                moduleModalRef.current = ref;
                                detailInputRef.current.moduleIds = ref;
                            }
                        }}
                        className="flex flex-row justify-between items-center relative w-2/3 px-4 py-4 border-2 border-black/25 rounded-md bg-white text-dark-blue hover:border-blue"
                        onClick={(e) => handleModuleToggle('open', e)}
                    >
                        <h3 className="font-montserrat font-medium">
                            {includeModulesText}
                        </h3>
                        <FaChevronDown size={15} />
                        {openModuleModal && (
                            <ModuleModal
                                modules={filteredItems}
                                includedModules={basicDetails.module_ids}
                                searchTerm={searchTerm}
                                handleIncludeModuleToggle={handleIncludeModuleToggle}
                                handleSearch={handleSearch}
                                closeModuleModal={handleModuleToggle}
                            />
                        )}
                    </div>
                </div>
                {/* Quiz Type */}
                <div className="group flex flex-col group w-1/3 px-4 py-2 border-2 gap-1 border-black border-opacity-25 rounded-md bg-white hover:border-blue focus-within:border-blue">
                    <h3 className="font-montserrat font-medium text-xs group-focus-within:text-blue">Quiz Type</h3>
                    <div className="flex flex-row justify-between">
                        <select 
                            className="flex flex-row justify-between items-center w-full text-dark-blue font-montserrat font-medium appearance-none outline-none cursor-pointer"
                            defaultValue={quizType}
                            value={quizType}
                            onChange={handleQuizChange}
                        >
                            <option value='multiple-choice'>Multiple Choice</option>
                            <option value='identification'>Identification</option>
                        </select>
                        <FaChevronDown size={15} />
                    </div>
                </div>
            </div>
        </div>
    )
}