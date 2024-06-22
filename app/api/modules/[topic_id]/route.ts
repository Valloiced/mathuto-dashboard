import { 
    addDocument, 
    getFields, 
    getDocumentsByOrder, 
    updateDocument
} from '@/lib/firebase-firestore';
import { FieldValue } from 'firebase-admin/firestore';
import { NextResponse, NextRequest } from 'next/server';

export async function GET(
    request: NextRequest,
    { params }: { params: { topic_id?: string } }
  ) {
    try {
        const topic_id = params.topic_id;
        const lesson_id = request.nextUrl.searchParams.get('lesson');

        if ((!topic_id || !topic_id.length)) {
            return NextResponse.json({ error: 'Missing parameters.' }, { status: 400 });
        }

        const topic = await getFields('topics', topic_id);

        if (!topic) {
            return NextResponse.json({ error: 'Module does not exist' }, { status: 400 });
        }

        let lessons = await getDocumentsByOrder({ 
            collectionPath: 'lessons', 
            sort: 'desc', 
            orderBy: 'createdOn',
            queries: [
                ['topic_id', '==', topic_id],
                ['isDeleted', '!=', true]
            ],
            limit: 100
        });
        
        if (lesson_id) {
            const findLesson = lessons?.find((lesson) => lesson.id === lesson_id);

            lessons = findLesson ? findLesson : lessons;
        }

        let quizzes;

        if (!lesson_id) {
            quizzes = await getDocumentsByOrder({
                collectionPath: 'quizzes',
                sort: 'asc', 
                orderBy: 'details.createdOn',
                queries: [
                    ['details.topic_ids', 'array-contains', topic_id],
                    ['isDeleted', '!=', true]
                ],
                limit: 100
            })
        }
        
        return NextResponse.json({ 
            details: topic, 
            lessons: lessons || [], 
            quizzes: quizzes || [] 
        });
    } catch (error: any) {
        console.error(error);
        return NextResponse.json({ message: 'Something went wrong' });
    }
}

export async function POST(req: NextRequest) {
    try {
        const { topic_id, subtopic, name, content } = await req.json();

        if (
            topic_id === "" || !topic_id || 
            name === "" || !name || 
            !content
        ) {
            return NextResponse.json({ error: 'Missing parameters.' }, { status: 400 });
        }

        // Increment the number of lessons
        const topicUpdate = await updateDocument(
            'topics',
            topic_id,
            { noOfItems: FieldValue.increment(1), __v: FieldValue.increment(1) }
        );

        const dataToAdd = {
            lessonNo: topicUpdate?.noOfItems,
            topic_id: topic_id,
            subtopic: subtopic,
            name: name,
            content: content,
            createdOn: new Date(),
            isDeleted: false
        };

        const response = await addDocument(
            'lessons',
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
        const { topic_id, lesson_id, subtopic, name, content } = await req.json();

        if (
            lesson_id === "" || !lesson_id || 
            topic_id === "" || !topic_id
        ) {
            return NextResponse.json({ error: 'Missing parameters.' }, { status: 400 });
        }

        // Increment version of topic allowing the Mathuto application to refetch data
        const topicUpdate = await updateDocument(
            'topics',
            topic_id,
            { __v: FieldValue.increment(1) }
        );

        const response = await updateDocument(
            'lessons',
            lesson_id,
            { name: name, content: content, subtopic: subtopic }
        );

        return NextResponse.json({ message: 'New lesson added.' });
    } catch (error: any) {
        console.error(error);
        return NextResponse.json({ message: 'Something went wrong' }, { status: 400 });
    }
}

export async function DELETE(request: NextRequest) {
    try {
        const { topic_id, lesson_id } = await request.json();

        if (
            lesson_id === "" || !lesson_id || 
            topic_id === "" || !topic_id
        ) {
            return NextResponse.json({ error: 'Missing parameters.' }, { status: 400 });
        }
        // const response = await deleteDocument(
        //     'lessons',
        //     lesson_id
        // );

        const response = await updateDocument('lessons', lesson_id, { isDeleted: true });

        // Decrement the number of lessons
        const topicUpdate = await updateDocument(
            'topics',
            topic_id,
            { noOfItems: FieldValue.increment(-1), __v: FieldValue.increment(1) }
        );

        return NextResponse.json({ message: "Deleted successfully" });
    } catch(error: any | unknown) {
        console.error(error);
        return NextResponse.json({ message: 'Something went wrong' }, { status: 500 });
    }
}
