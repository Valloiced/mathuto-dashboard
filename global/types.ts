export interface Modules {
    id?: string,
    name?: string,
    // uid: string
    creator?: string,
    createdOn?: Date,
    noOfItems?: number,
    __v?: number
}

export interface Lessons {
    id: string,
    name: string,
    lessonNo: number,
    subtopic: string,
    content: {
        full: string,
        summary: string,
        links: string[]
    }
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
    questions: QuizIdentification[] | QuizMultipleChoice[]
}

export interface QuizzesScore {
    id: string,
    quizId: string,
    uid: string,
    username: string,
    profileImg: string,
    score: number,
    time: number,
    submittedOn: Date,
    updatedOn: Date,
    topicIds: string[]
    retake?: boolean,
    retakeScore?: number,
    retakeTime?: number,
}