import { auth } from "firebase-admin";
import { getDocumentsSize, getDocumentsByOrder } from '@/lib/firebase-firestore';
import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

export async function GET (req: NextRequest) {
    try {
        // TODO (later): filter with user uid
        // const session = cookies().get("auth-session")?.value || "";
        // const decodedClaims = await auth().verifySessionCookie(session, true);

        const modules = await getDocumentsByOrder({ 
            collectionPath: 'topics', 
            sort: 'asc', 
            orderBy: 'createdOn' 
        });
        
        return NextResponse.json({ modules });
    } catch (error: any) {
        console.error('Something went wrong');
        return NextResponse.json({ message: 'Something went wrong' });
    }
}

export async function POST(req: NextRequest) {

}