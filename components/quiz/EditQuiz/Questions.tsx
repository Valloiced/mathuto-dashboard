import type { IdentificationAlt, MultipleChoiceAlt } from "@/app/quizzes/[quiz_id]/page";
import type { QuestionsProps } from ".";

import { IdentificationCard, MultipleChoiceCard } from "./Cards";

export default function Questions({ 
    quizType, 
    questions,
    questionInputRef,
    handleAddQuizCard,
    handleRemoveQuizCard,
    handleIdentificationInput,
    handleMultipleChoiceInput,
    handleCorrectChoiceToggle
}: QuestionsProps) {
    const questionCards = questions.map((question, index) => 
        quizType === 'identification' ? (
            <IdentificationCard 
                key={index}
                index={index}
                questionInputRef={questionInputRef}
                question={question.question}
                answer={(question as IdentificationAlt).answer}
                category={(question as IdentificationAlt).category}
                handleRemoveQuizCard={handleRemoveQuizCard}
                handleIdentificationInput={handleIdentificationInput}
            />
        ) : (
            <MultipleChoiceCard 
                key={index}
                index={index}
                questionInputRef={questionInputRef}
                question={question.question}
                choices={(question as MultipleChoiceAlt).choices}
                correctChoiceIdx={(question as MultipleChoiceAlt).correctChoiceIdx}
                handleRemoveQuizCard={handleRemoveQuizCard}
                handleMultipleChoiceInput={handleMultipleChoiceInput}
                handleCorrectChoiceToggle={handleCorrectChoiceToggle}
            />
        )
    );

    return (
        <div className="flex flex-col gap-8">
            {questionCards}
            <div className="flex flex-row w-full justify-center">
                <button 
                    className="global-btn px-10 py-2 border-2 border-primary-theme [&]:bg-transparent [&]:text-primary-theme [&]:hover:text-white shadow-md"
                    onClick={handleAddQuizCard}
                >
                    + ADD CARD
                </button>
            </div>
        </div>
    );
}
