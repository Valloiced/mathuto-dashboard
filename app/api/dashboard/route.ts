import { auth } from "firebase-admin";
import { getDocumentsSize, getDocumentsByOrder } from '@/lib/firebase-firestore';
import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
    try {
        // TODO (later): filter with user uid
        // const session = cookies().get("auth-session")?.value || "";
        // const decodedClaims = await auth().verifySessionCookie(session, true);

        const moduleCount = await getDocumentsSize('topics');
        const quizCount = await getDocumentsSize('quizzes');

        // Limit by 3 
        const modules = await getDocumentsByOrder({ collectionPath: 'topics', sort: 'desc', orderBy: 'createdOn', limit: 3 });
        const quizzes = await getDocumentsByOrder({ collectionPath: 'quizzes', sort: 'desc', orderBy: 'details.createdOn', limit: 3 });
        
        return NextResponse.json({ moduleCount, quizCount, modules, quizzes });
    } catch (error: any) {
        console.error('Something went wrong');
        return NextResponse.json({ message: 'Something went wrong' });
    }
}
