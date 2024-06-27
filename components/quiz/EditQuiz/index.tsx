import { 
    ChangeEvent, 
    Dispatch, 
    SetStateAction, 
    useRef, 
    MutableRefObject,
    useEffect
} from "react";
import { toast } from "react-toastify";
import { confirmAlert } from "react-confirm-alert";
import 'react-confirm-alert/src/react-confirm-alert.css'; 

import useModalAutoClose from "@/hooks/useModalAutoClose";

import { MdMoreVert, MdOutlineDeleteOutline } from "react-icons/md";

import Details from "./Details";
import Questions from "./Questions";

import SaveDialog from "@/components/dialog/SaveDialog";
import DeleteDialog from "@/components/dialog/DeleteDialog";

import type { BasicDetails, IdentificationAlt, MultipleChoiceAlt } from "@/app/quizzes/[quiz_id]/page";
import type { Modules, QuizMultipleChoice, QuizzesType } from "@/global/types";

export type DetailDivRefs = {
    title: HTMLDivElement | null;
    description: HTMLDivElement | null;
    moduleIds: HTMLDivElement | null;
};

interface EditQuizProps {
    basicDetails: BasicDetails,
    quizType: QuizzesType,
    questions: (IdentificationAlt | MultipleChoiceAlt)[],
    modules: Modules[],
    canDelete: boolean,
    isUpdated: boolean,
    setBasicDetails: Dispatch<SetStateAction<BasicDetails>>,
    setQuizType: Dispatch<SetStateAction<QuizzesType>>,
    setQuestions: Dispatch<SetStateAction<(IdentificationAlt | MultipleChoiceAlt)[]>>,
    handleSubmit: (form: any) => void,
    handleDelete: () => void
}

export interface DetailsProps {
    modules: Modules[],
    basicDetails: BasicDetails,
    quizType: QuizzesType,
    detailInputRef: MutableRefObject<DetailDivRefs>,
    handleBasicInput: (e: ChangeEvent<HTMLInputElement>) => void,
    handleQuizChange: (e: ChangeEvent<HTMLSelectElement>) => void,
    handleIncludeModuleToggle: (moduleId: string) => void
}

export interface QuestionsProps {
    quizType: QuizzesType,
    questions: (IdentificationAlt | MultipleChoiceAlt)[],
    questionInputRef: MutableRefObject<HTMLDivElement[]>,
    handleAddQuizCard: () => void,
    handleRemoveQuizCard: (index: number) => void,
    handleIdentificationInput: (index: number, e: ChangeEvent<HTMLTextAreaElement>) => void,
    handleMultipleChoiceInput: (index: number, e: ChangeEvent<HTMLTextAreaElement>, choiceIndex?: number) => void,
    handleCorrectChoiceToggle: (index: number, choiceIndex: number) => void
}

export default function EditQuiz({
    basicDetails,
    quizType,
    questions,
    modules,
    canDelete,
    isUpdated,
    setBasicDetails,
    setQuizType,
    setQuestions,
    handleSubmit,
    handleDelete
}: EditQuizProps) {

    const [openTooltip, setOpenTooltip, tooltipRef] = useModalAutoClose(false);

    const detailInputRef = useRef<DetailDivRefs>({
        title: null,
        description: null,
        moduleIds: null
    });
    
    const questionInputRef = useRef<HTMLDivElement[]>([]);

    useEffect(() => {
        const compareDetails = basicDetails 
        console.log(basicDetails);
        console.log(questions);
    }, [])

    const handleBasicInput = (e: ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();

        const { name, value } = e.target;

        setBasicDetails(prevDetails => ({ ...prevDetails, [name]: value })); 
    }

    const handleQuizChange = (e: ChangeEvent<HTMLSelectElement>) => {
        e.preventDefault();

        if (questions.length !== 0) {
            toast.error('Changing quiz type might wipe out your quiz questions.', {
                autoClose: 10000,
                closeOnClick: true
            });
            toast.error('Ensure that you clear up all your questions to proceed.', {
                autoClose: 10000,
                closeOnClick: true
            });

            return;
        }

        setQuizType(e.target.value as QuizzesType);
    }

    const handleAddQuizCard = () => {
        const identificationTemplate: IdentificationAlt = {
            question: '',
            category: '',
            answer: ''
        };
        
        const multipleChoiceTemplate: MultipleChoiceAlt = {
            question: '',
            choices: ['', '', '', ''],
            correctChoiceIdx: 0
        };

        setQuestions((prevQuestions) => [
            ...prevQuestions,
            quizType === 'identification' ? identificationTemplate : multipleChoiceTemplate
        ]);

        setBasicDetails((prevDetails) => ({ 
            ...prevDetails, 
            numOfQuestions: prevDetails.numOfQuestions + 1
        }))
    }

    const handleRemoveQuizCard = (index: number) => {
        setQuestions((prevQuestions) => prevQuestions.filter((_, cardIdx) => cardIdx !== index));
        
        setBasicDetails((prevDetails) => ({ 
            ...prevDetails, 
            numOfQuestions: prevDetails.numOfQuestions - 1
        }))
    }

    const handleIdentificationInput = (index: number, e: ChangeEvent<HTMLTextAreaElement>) => {
        e.preventDefault();

        const { value, name } = e.target;

        setQuestions((prevQuestions) => {
            const updatedQuestion = { ...prevQuestions[index], [name]: value };
            const copyQuestions = [...prevQuestions];

            copyQuestions[index] = updatedQuestion;
            return copyQuestions;
        })
    }

    const handleMultipleChoiceInput = (
        index: number, 
        e: ChangeEvent<HTMLTextAreaElement>, 
        choiceIndex?: number
    ) => {
        e.preventDefault();
    
        const { name, value } = e.target;
        
        setQuestions((prevQuestions) => {
            const copyQuestions = [...prevQuestions];
            const targetQuestion = copyQuestions[index];
    
            let updatedQuestion;
    
            if (name === 'question') {
                updatedQuestion = { ...targetQuestion, [name]: value };
            } else {
                const newChoices = [...(targetQuestion as MultipleChoiceAlt).choices];
                if (choiceIndex !== undefined) {
                    newChoices[choiceIndex] = value;
                }
    
                updatedQuestion = { ...targetQuestion, choices: newChoices };
            }
    
            copyQuestions[index] = updatedQuestion;
    
            return copyQuestions;
        });
    };
    
    const handleCorrectChoiceToggle = (index: number, choiceIndex: number) => {
        setQuestions((prevQuestions) => {
            const updatedQuestion = { ...prevQuestions[index], correctChoiceIdx: choiceIndex };
            const copyQuestions = [...prevQuestions];

            copyQuestions[index] = updatedQuestion;
            return copyQuestions;
        })
    }

    const handleIncludeModuleToggle = (moduleId: string) => {
        setBasicDetails((prevDetails) => {
            let newIds = [...prevDetails.module_ids, moduleId];
            
            if (prevDetails.module_ids?.includes(moduleId)) {
                newIds = prevDetails.module_ids.filter((id) => id !== moduleId);
            } 

            return { ...prevDetails, module_ids: newIds }
        })
    }

    const validateForm = () => {
        const validateQuestions = () => {
            let firstFocal;

            for (let i = 0; i < questions.length; i++) {
                let toValidate: any = questions[i];
    
                if ('category' in questions[i]) {
                    const { category, ...toCheck } = questions[i] as IdentificationAlt;
                    toValidate = toCheck;
                }
    
                const fieldValues = Object.values(toValidate).flat(Infinity);
    
                if (fieldValues.some((v) => v === '')) {
                    if (!firstFocal) {
                        firstFocal = questionInputRef.current[i];
                    }
                    questionInputRef.current[i]?.classList.add('border-red');
                }  else {
                    questionInputRef.current[i]?.classList.remove('border-red');
                }
            }

            return firstFocal;
        };

        const validateDetails = () => {
            let firstFocal;
            const { title, description, module_ids } = basicDetails;

            if (title === '') {
                if (!firstFocal) {
                    firstFocal = detailInputRef.current.title;
                }
                detailInputRef.current.title
                    ?.classList
                    .add('border-red');
            } else {
                detailInputRef.current.title
                    ?.classList
                    .remove('border-red');
            }

            if (description === '') {
                if (!firstFocal) {
                    firstFocal = detailInputRef.current.description;
                }
                detailInputRef.current.description
                    ?.classList
                    .add('border-red');
            } else {
                detailInputRef.current.description
                    ?.classList
                    .remove('border-red');
            }
            
            if (!module_ids.length) {
                if (!firstFocal) {
                    firstFocal = detailInputRef.current.moduleIds;
                }
                detailInputRef.current.moduleIds
                    ?.classList
                    .add('border-red');
            } else {
                detailInputRef.current.moduleIds
                    ?.classList
                    .remove('border-red');
            }

            return firstFocal;
        }

        // Focus one at a time for empty fields
        let toFocus = validateDetails() || validateQuestions() as HTMLDivElement | undefined;

        if (toFocus != null) {
            toast.warn("Please fill in the required fields.", { 
                autoClose: 5000, 
                closeOnClick: true 
            });

            toFocus?.scrollIntoView({ behavior: "smooth" });
            return false;
        } else {
            return true;
        }
    }

    const handleSaveData = () => {
        const multipleChoiceBuilder = (questions: any)  : QuizMultipleChoice => {
            return questions.map((question: MultipleChoiceAlt) => { 
                const correctAnswer = question.choices[question.correctChoiceIdx];

                return {
                    question: question.question,
                    correctAnswer: correctAnswer,
                    incorrectAnswers: question.choices.filter((_, idx) => idx !== question.correctChoiceIdx)
                }
            })
        }

        const isFormFilled = validateForm();

        const form = {
            details: {
                title: basicDetails.title, 
                description: basicDetails.description, 
                numOfQuestions: basicDetails.numOfQuestions, 
                type: quizType, 
                topic_ids: basicDetails.module_ids, 
                createdOn: basicDetails.createdOn
            },
            questions: quizType === 'identification' ? questions : multipleChoiceBuilder(questions)
        };
        
        if (isFormFilled) {
            confirmAlert({
                customUI: ({ onClose }) => 
                <SaveDialog 
                    onClose={onClose} 
                    handler={() => handleSubmit(form)}
                />
            });
        }
    }

    const handleDeleteData = () => {
        confirmAlert({
            customUI: ({ onClose }) => 
            <DeleteDialog 
                onClose={onClose} 
                handler={() => handleDelete()}
            />
        });
    }

    return (
        <div className="flex flex-col gap-8 pb-10">
            <div className="flex flex-row justify-between">
                <h1 className="font-montserrat font-bold text-3xl text-dark-blue">Create/Edit Quiz</h1>
                <div className="flex flex-row gap-4 w-36">
                    <button 
                        className="global-btn w-full [&]:rounded-md shadow-md"
                        onClick={handleSaveData}
                        disabled={!isUpdated}
                    >
                        SAVE
                    </button>
                    {canDelete && (
                        <button
                            ref={tooltipRef as React.LegacyRef<HTMLButtonElement>}
                            className="relative text-blue bg-none border-0"
                            onClick={(e) => setOpenTooltip(prev => !prev)}
                        >
                            <MdMoreVert size={25} />
                            {openTooltip && (
                                <div className="absolute -left-12 -bottom-10 w-24 bg-white py-1 shadow-lg">
                                    <div 
                                        className="flex flex-row items-center justify-center gap-2 w-full py-1 px-2 text-dark-blue hover:bg-lightWhite"
                                        onClick={handleDeleteData}
                                    >
                                        <MdOutlineDeleteOutline size={20} />
                                        <h2 className="font-poppins text-sm">Delete</h2>
                                    </div>
                                </div>
                            )}
                        </button>
                    )}
                </div>
            </div>
            <div className="flex flex-col gap-16">
                <Details 
                    modules={modules}
                    basicDetails={basicDetails}
                    quizType={quizType}
                    detailInputRef={detailInputRef}
                    handleBasicInput={handleBasicInput}
                    handleQuizChange={handleQuizChange}
                    handleIncludeModuleToggle={handleIncludeModuleToggle}
                />
                <Questions
                    quizType={quizType}
                    questions={questions}
                    questionInputRef={questionInputRef}
                    handleAddQuizCard={handleAddQuizCard}
                    handleRemoveQuizCard={handleRemoveQuizCard}
                    handleIdentificationInput={handleIdentificationInput}
                    handleMultipleChoiceInput={handleMultipleChoiceInput}
                    handleCorrectChoiceToggle={handleCorrectChoiceToggle}
                />
                <div className="flex flex-row w-full justify-end">
                    <button 
                        className="global-btn px-8 py-4 [&]:rounded-md shadow-md"
                        onClick={handleSaveData}
                    >
                        SAVE
                    </button>
                </div>
            </div>
        </div>
    )
}