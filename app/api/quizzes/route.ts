import { auth } from "firebase-admin";
import { getDocumentsSize, getDocumentsByOrder, getFields } from '@/lib/firebase-firestore';
import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

import { Quizzes } from "@/global/types";

export async function GET(req: NextRequest) {
    try {
        // TODO (later): filter with user uid
        // const session = cookies().get("auth-session")?.value || "";
        // const decodedClaims = await auth().verifySessionCookie(session, true);

        let quizzes = await getDocumentsByOrder({ 
            collectionPath: 'quizzes', 
            sort: 'desc', 
            queries: [
                ['isDeleted', '!=', true]
            ],
            orderBy: 'details.createdOn' 
        });

        let modQuizzes;

        // We will use the topic_ids from quizzes.details to fetch the topicData and embed it in the quizzes data.
        if (quizzes) {
            modQuizzes = await Promise.all(quizzes.map(async (quiz: Quizzes) => {
                const topicIds = quiz.details.topic_ids;
    
                const topicsData = await Promise.all(topicIds.map(async (topicId: string) => {
                    return await getFields('topics', topicId);
                }));
    
                const modQuizDetails = { ...quiz.details, topics: topicsData };
    
                return { ...quiz, details: modQuizDetails };
            }));
        }

        return NextResponse.json({ quizzes: modQuizzes });
    } catch (error: any) {
        console.error('Something went wrong', error);
        return NextResponse.json({ message: 'Something went wrong' });
    }
}
