import { 
    addDocument, 
    getFields, 
    updateDocument, 
    getDocuments, 
    deleteDocument
} from '@/lib/firebase-firestore';
import { NextResponse, NextRequest } from 'next/server';

export async function GET(
    request: NextRequest,
    { params }: { params: { quiz_id?: string } }
  ) {
    try {
        const quiz_id = params.quiz_id;

        if ((!quiz_id || !quiz_id.length)) {
            return NextResponse.json({ error: 'Missing parameters.' }, { status: 400 });
        }

        const quiz = await getFields('quizzes', quiz_id);

        if (!quiz) {
            return NextResponse.json({ error: 'Quiz does not exist' }, { status: 400 });
        }

        let quizScores = await getDocuments(
            'quiz-scores',
            [
                ['quizId', '==', quiz_id]
            ],
            100
        );

        // Convert Firebase timestamp to date
        if (quizScores?.length) {
            quizScores = quizScores && quizScores.map((score) => ({
                ...score,
                submittedOn: score.submittedOn?.toDate(),
                updatedOn: score.updatedOn?.toDate()
            })) 
        }

        return NextResponse.json({ 
            quiz, 
            quiz_scores: quizScores || []
        });
    } catch (error: any) {
        console.error(error);
        return NextResponse.json({ message: 'Something went wrong' });
    }
}

export async function POST(req: NextRequest) {
    try {
        const { quiz_id, details, questions } = await req.json();

        if (
            quiz_id === "" || !quiz_id || 
            Object.keys(details).length !== 5 ||
            !questions.length
        ) {
            return NextResponse.json({ error: 'Missing parameters.' }, { status: 400 });
        }

        const dataToAdd = {
            details: {
                ...details,
                createdOn: new Date()
            },
            questions,
            isDeleted: false
        };

        const response = await addDocument(
            'quizzes',
            dataToAdd
        );

        return NextResponse.json({ message: 'New lesson added.' });
    } catch (error: any) {
        console.error(error);
        return NextResponse.json({ message: 'Something went wrong' });
    }
}

export async function PUT(req: NextRequest) {
    try {
        const { quiz_id, details, questions } = await req.json();

        if (quiz_id === "" || !quiz_id) {
            return NextResponse.json({ error: 'Missing parameters.' }, { status: 400 });
        }

        const response = await updateDocument(
            'quizzes',
            quiz_id,
            { details, questions }
        );

        return NextResponse.json({ message: 'New lesson added.' });
    } catch (error: any) {
        console.error(error);
        return NextResponse.json({ message: 'Something went wrong' }, { status: 500 });
    }
}

export async function DELETE(
    request: NextRequest,
    { params }: { params: { quiz_id?: string } }
) {
    try {
        const { quiz_id } = params;

        if ((!quiz_id || !quiz_id.length)) {
            return NextResponse.json({ error: 'Missing parameters.' }, { status: 400 });
        }

        // For quiz scores, let it persists
        // const response = await deleteDocument(
        //     'quizzes',
        //     quiz_id
        // );
        const response = await updateDocument('quizzes', quiz_id, { isDeleted: true });

        return NextResponse.json({ message: "Deleted successfullt" });
    } catch(error: any | unknown) {
        console.error(error);
        return NextResponse.json({ message: 'Something went wrong' }, { status: 500 });
    }
}