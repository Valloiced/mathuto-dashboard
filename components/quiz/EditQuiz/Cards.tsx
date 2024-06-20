import { ChangeEvent, LegacyRef, MutableRefObject, RefObject } from "react";
import TextareaAutoResize from "react-textarea-autosize";

import { MdOutlineDeleteOutline } from "react-icons/md";
import { MdOutlineCheck } from "react-icons/md";

import type { IdentificationAlt, MultipleChoiceAlt } from "@/app/quizzes/[quiz_id]/page";

interface IdentificationCardProps extends IdentificationAlt {
    index: number,
    questionInputRef: MutableRefObject<HTMLDivElement[]>,
    handleRemoveQuizCard: (index: number) => void,
    handleIdentificationInput: (index: number, e: ChangeEvent<HTMLTextAreaElement>) => void
}

interface MultipleChoiceCardProps extends MultipleChoiceAlt{
    index: number,
    questionInputRef: MutableRefObject<HTMLDivElement[]>,
    handleRemoveQuizCard: (index: number) => void,
    handleMultipleChoiceInput: (index: number, e: ChangeEvent<HTMLTextAreaElement>, choiceIndex?: number) => void,
    handleCorrectChoiceToggle: (index: number, choiceIndex: number) => void
}

export function IdentificationCard({ 
    index,
    questionInputRef,
    question, 
    category, 
    answer,
    handleRemoveQuizCard,
    handleIdentificationInput
} : IdentificationCardProps) {
    return (
        <div
            ref={(ref) => { ref && (questionInputRef.current[index] = ref) }}
            className="flex flex-col w-full rounded-md border-2 border-black/25 bg-white"
        >
            <div className="flex flex-row justify-between items-center px-4 py-4 border-b-[1px] border-b-black/25 text-blue">
                <h1 className="font-montserrat font-medium text-xl">{index + 1}</h1>
                <MdOutlineDeleteOutline 
                    size={20} 
                    title="Delete this card" 
                    className="cursor-pointer" 
                    onClick={() => handleRemoveQuizCard(index)}
                />
            </div>
            <div className="flex flex-row py-12 px-4 justify-between pr-24">
                <div className="flex flex-col w-3/5 gap-4">
                    <div className="group flex flex-col w-full gap-2">
                        <TextareaAutoResize
                            name="question"
                            className="border-b-2 border-b-black/25 font-montserrat font-semibold text-sm py-2 w-full text-dark-blue outline-none placeholder:font-normal placeholder:text-black/50 max-h-48 min-h-10 h-10 focus:border-b-blue"
                            maxRows={8}
                            placeholder="Enter Question"
                            defaultValue={question}
                            value={question}
                            onChange={(e) => handleIdentificationInput(index, e)}
                            required
                        />
                        <p className="font-montserrat font-medium text-xs text-black/50 group-focus-within:text-blue">QUESTION</p>
                    </div>
                    <div className="group flex flex-col w-full gap-2">
                        <TextareaAutoResize
                            name="category"
                            className="border-b-2 border-b-black/25 font-montserrat font-semibold text-sm py-2 w-full text-dark-blue outline-none placeholder:font-normal placeholder:text-black/50 max-h-48 min-h-10 h-10 focus:border-b-blue"
                            maxRows={8}
                            placeholder="Enter Category"
                            defaultValue={category}
                            value={category}
                            onChange={(e) => handleIdentificationInput(index, e)}
                            required
                        />
                        <p className="font-montserrat font-medium text-xs text-black/50 group-focus-within:text-blue">CATEGORY (optional)</p>
                    </div>
                </div>
                <div className="group flex flex-col w-1/3 gap-2">
                    <TextareaAutoResize
                        name="answer"
                        className="border-b-2 border-b-black/25 font-montserrat font-semibold text-sm py-2 w-full text-dark-blue outline-none placeholder:font-normal placeholder:text-black/50 max-h-48 min-h-10 h-10 focus:border-b-blue"
                        maxRows={8}
                        placeholder="Enter Answer"
                        defaultValue={answer}
                        value={answer}
                        onChange={(e) => handleIdentificationInput(index, e)}
                        required
                    />
                    <p className="font-montserrat font-medium text-xs text-black/50 group-focus-within:text-blue">ANSWER</p>
                </div>
            </div>
        </div>
    )
}

export function MultipleChoiceCard({
    index,
    questionInputRef,
    question, 
    choices, 
    correctChoiceIdx,
    handleRemoveQuizCard,
    handleMultipleChoiceInput,
    handleCorrectChoiceToggle
} : MultipleChoiceCardProps) {
    return (
        <div
            ref={(ref) => { ref && (questionInputRef.current[index] = ref) }}
            className="flex flex-col w-full rounded-md border-2 border-black/25 bg-white"
        >
            <div className="flex flex-row justify-between items-center px-4 py-4 border-b-[1px] border-b-black/25 text-blue">
                <h1 className="font-montserrat font-medium text-xl">{index + 1}</h1>
                <MdOutlineDeleteOutline 
                    size={20} 
                    title="Delete this card" 
                    className="cursor-pointer"
                    onClick={() => handleRemoveQuizCard(index)}
                />
            </div>
            <div className="flex flex-row py-12 px-4 justify-between pr-24">
                <div className="group flex flex-col w-3/5 gap-2">
                    <TextareaAutoResize
                        name="question"
                        className="border-b-2 border-b-black/25 font-montserrat font-semibold text-sm py-2 w-full text-dark-blue outline-none placeholder:font-normal placeholder:text-black/50 max-h-48 min-h-10 h-10 focus:border-b-blue"
                        maxRows={8}
                        placeholder="Enter Question"
                        defaultValue={question}
                        value={question}
                        onChange={(e) => handleMultipleChoiceInput(index, e)}
                        required
                    />
                    <p className="font-montserrat font-medium text-xs text-black/50 group-focus-within:text-blue">QUESTION</p>
                </div>
                <div className="flex flex-col w-1/3 gap-4">
                    <div className="flex flex-row gap-4 items-start">
                        <TextareaAutoResize
                            name="choices"
                            className="border-b-2 border-b-black/25 font-montserrat font-semibold text-sm py-2 w-full text-dark-blue outline-none placeholder:font-normal placeholder:text-black/50 max-h-48 min-h-10 h-10 focus:border-b-blue"
                            maxRows={8}
                            placeholder="Enter Choice"
                            defaultValue={choices && choices[0]}
                            value={choices && choices[0]}
                            onChange={(e) => handleMultipleChoiceInput(index, e, 0)}
                            required
                        />
                        <div 
                            className={`group flex flex-row justify-center items-center w-10 h-10 ${correctChoiceIdx === 0 ? 'bg-green text-white' : 'border-[1px] border-black/25'} cursor-pointer`}
                            onClick={() => handleCorrectChoiceToggle(index, 0)}
                        >
                            {correctChoiceIdx === 0
                                ? (
                                    <MdOutlineCheck size={20} />
                                ) : (
                                <MdOutlineCheck 
                                    className="group-hover:text-black/50 group-hover:flex hidden"
                                    size={20} 
                                />
                            )}
                        </div>
                    </div>
                    <div className="flex flex-row gap-4 items-start">
                        <TextareaAutoResize
                            name="choices"
                            className="border-b-2 border-b-black/25 font-montserrat font-semibold text-sm py-2 w-full text-dark-blue outline-none placeholder:font-normal placeholder:text-black/50 max-h-48 min-h-10 h-10 focus:border-b-blue"
                            maxRows={8}
                            placeholder="Enter Choice"
                            defaultValue={choices && choices[1]}
                            value={choices && choices[1]}
                            onChange={(e) => handleMultipleChoiceInput(index, e, 1)}
                            required
                        />
                        <div 
                            className={`group flex flex-row justify-center items-center w-10 h-10 ${correctChoiceIdx === 1 ? 'bg-green text-white' : 'border-[1px] border-black/25'} cursor-pointer`}
                            onClick={() => handleCorrectChoiceToggle(index, 1)}
                        
                        >
                            {correctChoiceIdx === 1 
                                ? (
                                    <MdOutlineCheck size={20} />
                                ) : (
                                <MdOutlineCheck 
                                    className="group-hover:text-black/50 group-hover:flex hidden"
                                    size={20} 
                                />
                            )}
                        </div>
                    </div>
                    <div className="flex flex-row gap-4 items-start">
                        <TextareaAutoResize
                            name="choices"
                            className="border-b-2 border-b-black/25 font-montserrat font-semibold text-sm py-2 w-full text-dark-blue outline-none placeholder:font-normal placeholder:text-black/50 max-h-48 min-h-10 h-10 focus:border-b-blue"
                            maxRows={8}
                            placeholder="Enter Choice"
                            defaultValue={choices && choices[2]}
                            value={choices && choices[2]}
                            onChange={(e) => handleMultipleChoiceInput(index, e, 2)}
                            required
                        />
                        <div 
                            className={`group flex flex-row justify-center items-center w-10 h-10 ${correctChoiceIdx === 2 ? 'bg-green text-white' : 'border-[1px] border-black/25'} cursor-pointer`}
                            onClick={() => handleCorrectChoiceToggle(index, 2)}
                        >
                            {correctChoiceIdx === 2 
                                ? (
                                    <MdOutlineCheck size={20} />
                                ) : (
                                <MdOutlineCheck 
                                    className="group-hover:text-black/50 group-hover:flex hidden"
                                    size={20} 
                                />
                            )}
                        </div>
                    </div>
                    <div className="flex flex-row gap-4 items-start">
                        <TextareaAutoResize
                            name="choices"
                            className="border-b-2 border-b-black/25 font-montserrat font-semibold text-sm py-2 w-full text-dark-blue outline-none placeholder:font-normal placeholder:text-black/50 max-h-48 min-h-10 h-10 focus:border-b-blue"
                            maxRows={8}
                            placeholder="Enter Choice"
                            defaultValue={choices && choices[3]}
                            value={choices && choices[3]}
                            onChange={(e) => handleMultipleChoiceInput(index, e, 3)}
                            required
                        />
                        <div 
                            className={`group flex flex-row justify-center items-center w-10 h-10 ${correctChoiceIdx === 3 ? 'bg-green text-white' : 'border-[1px] border-black/25'} cursor-pointer`}
                            onClick={() => handleCorrectChoiceToggle(index, 3)}
                        
                        >
                            {correctChoiceIdx === 3 
                                ? (
                                    <MdOutlineCheck size={20} />
                                ) : (
                                <MdOutlineCheck 
                                    className="group-hover:text-black/50 group-hover:flex hidden"
                                    size={20} 
                                />
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}