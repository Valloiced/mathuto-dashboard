'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter, useSearchParams } from "next/navigation";

import Navigation from '@/components/quiz/Navigation';
import EditQuiz from '@/components/quiz/EditQuiz';
import Statistics from '@/components/quiz/Statistics';

import type { 
    Modules,
    QuizIdentification, 
    QuizMultipleChoice, 
    Quizzes, 
    QuizzesType,
    QuizzesScore
} from '@/global/types';

export type ActiveTab = 'details' | 'statistics';

export interface BasicDetails {
    id: string,
    title: string,
    description?: string,
    numOfQuestions: number,
    module_ids: string[],
    createdOn?: Date
}

export interface IdentificationAlt extends QuizIdentification {};
export interface MultipleChoiceAlt {
    question: string,
    choices: string[],
    correctChoiceIdx: number
}

const generateTemplate = (quizType: QuizzesType) => {
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

    return new Array(2).fill(null).map(() => quizType === 'identification' 
        ? { ...identificationTemplate } 
        : { ...multipleChoiceTemplate }
    );
}

export default function Quiz() {
    const router = useRouter();
    const params = useParams<{ quiz_id: string }>();

    // If quiz is opened under specific module
    const option = useSearchParams();
    const module_id = option.get('module_id');
    
    const [activeTab, setActiveTab] = useState<ActiveTab>('details');

    const [modules, setModules] = useState<Modules[]>();
    const [quizScores, setQuizScores] = useState<QuizzesScore[]>();

    const [basicDetails, setBasicDetails] = useState<BasicDetails>({
        id: '',
        title: '',
        description: '',
        numOfQuestions: 0,
        module_ids: [],
    });


    const [quizType, setQuizType] = useState<QuizzesType>('identification');

    const [questions, setQuestions] 
        = useState<(IdentificationAlt | MultipleChoiceAlt)[]>(() => generateTemplate(quizType));

    useEffect(() => {
        setQuestions(generateTemplate(quizType));
        setBasicDetails(prevDetails => ({ 
            ...prevDetails, 
            numOfQuestions: questions.length
        }))
    
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [quizType]);

    // For editing only
    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch(`/api/quizzes/${params.quiz_id}`);
                const data = await res.json();

                if (res.ok || data.quiz !== null) {
                    const quiz: Quizzes = data.quiz;

                    setBasicDetails({
                        id: quiz.id,
                        title: quiz.details.title,
                        description: quiz.details.description,
                        numOfQuestions: quiz.details.numOfQuestions,
                        module_ids: quiz.details.topic_ids,
                        createdOn: quiz.details.createdOn
                    })

                    setQuizType(quiz.details.type);

                    if (quiz.details.type === 'multiple-choice') {
                        setQuestions(quiz.questions?.map((question) => ({
                            question: question.question,
                            choices: [
                                (question as QuizMultipleChoice).correctAnswer, 
                                ...(question as QuizMultipleChoice).incorrectAnswers
                            ],
                            correctChoiceIdx: 0
                        })));
                    } else {
                        setQuestions(quiz.questions as IdentificationAlt[]);
                    }

                    setQuizScores(data.quiz_scores as QuizzesScore[]);
                }
            } catch (error) {
                console.error("Something went wrong", error);
            }
        }

        const fetchModules = async () => {
            try {
                const res = await fetch('/api/modules');
                const data = await res.json();

                setModules(data.modules as Modules[]);
            } catch (error) {
                console.error("Something went wrong", error);
            }
        }

        if (params.quiz_id !== 'create') {
            fetchData();
        }

        if (module_id) {
            setBasicDetails((prevDetails) => ({ 
                ...prevDetails, 
                module_ids: [module_id] 
            }))
        }

        fetchModules();
    }, [params, module_id]);

    const handleSubmit = async (form: any) => {
        try {
            const requestBody = { 
                ...form, 
                quiz_id: params.quiz_id
            };

            const res = await fetch(`/api/quizzes/${params.quiz_id}`, { 
                method: params.quiz_id === 'create' ? 'POST' : 'PUT',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(requestBody)
            });

            if (res.ok) {
                router.replace(`/quizzes`);
            }
        } catch (error: any | unknown) {
            console.error("Submit error", error);
        }
    }

    const handleDelete = async () => {
        try {
            const res = await fetch(`/api/quizzes/${params.quiz_id}`, {
                method: 'DELETE'
            });

            if (res.ok) {
                router.replace(`/quizzes`)
            }
        } catch (error: any | unknown) {
            console.error("Submit error", error);
        }
    }

    const toggleTab = (tab: ActiveTab) => {
        setActiveTab(tab);
    }

    return (
        <div className="flex flex-col gap-8 pb-10 mr-8">
            <Navigation activeTab={activeTab} toggleTab={toggleTab} />
            {activeTab === 'details' ? (
                <EditQuiz
                    basicDetails={basicDetails}
                    quizType={quizType}
                    questions={questions}
                    modules={modules || []}
                    canDelete={params.quiz_id !== 'create'}
                    setBasicDetails={setBasicDetails}
                    setQuizType={setQuizType}
                    setQuestions={setQuestions}
                    handleSubmit={handleSubmit}
                    handleDelete={handleDelete}
                />
            ): (
                <Statistics
                    isCreating={params.quiz_id === 'create'}
                    quizScores={quizScores || []}
                    numOfQuestions={basicDetails.numOfQuestions || 0}
                />
            )}
        </div>
    );
}
