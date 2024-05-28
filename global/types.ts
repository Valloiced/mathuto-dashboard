export interface Modules {
    id: string,
    name: string,
    // uid: string
    creator: string,
    createdOn: Date,
    noOfItems: number,
    __v: number
}

export type QuizzesType = 'identification' | 'multiple-choice'

export interface QuizIdentification {
    question: string,
    answer: string,
    category: string
}

export interface QuizMultipleChoice {
    question: string
    correctAnswer: string,
    incorrectAnswers: string[],
}

export interface Quizzes {
    id: string,
    details: {
        title: string,
        numOfQuestions: number,
        description: string,
        createdOn: Date,
        type: QuizzesType
        topic_ids: string[]
    },
    questions: QuizIdentification | QuizMultipleChoice
}