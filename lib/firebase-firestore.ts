import { firebaseAdminApp } from '@/configs/firebase-admin.config';
import { 
    getFirestore, 
    WhereFilterOp,
    Query
} from 'firebase-admin/firestore';

const firestore = getFirestore(firebaseAdminApp());

interface GetDocumentsByOrderProps {
    collectionPath: string,
    orderBy: string,
    sort?: 'desc' | 'asc',
    limit?: null | number,
    queries?: null | [string, WhereFilterOp, any][]
}

export const addDocument = async (collectionPath: string, data: any) => {
    try {
        const response = await firestore.collection(collectionPath).add(data);
        return response;
    } catch (error: any) {
        console.error('Error adding document', error.message);
        throw new Error(error);
    }
}

export const getDocumentsSize = async (
    collectionPath: string, 
    queries: null | [string, WhereFilterOp, any][] = null
) => {
    try {
        let queryRef = firestore.collection(collectionPath) as Query;

        if (queries) {
            queries.forEach((query) => {
                const [field, operator, value] = query;
                queryRef = queryRef.where(field, operator, value);
            });
        }

        const snapShot = await queryRef.get();
        return snapShot.size;
    } catch (error: any) {
        console.error('Error retrieving documents size: ', error.message);
        throw new Error(error);
    }
}

export const getFields = async (collectionPath: string, docId: string) => {
    try {
        const docRef = firestore.collection(collectionPath).doc(docId);
        const docSnap = await docRef.get();

        if (!docSnap.exists) {
            console.log('No matching documents.');
            return;
        }

        // Include document id
        return { id: docSnap.id, ...docSnap.data() };
    } catch (error: any) {
        console.error('Error retrieving document', error.message);
        throw new Error(error);
    }
}

export const getDocuments = async (
    collectionPath: string, 
    queries: null | [string, WhereFilterOp, any][] = null, 
    limit: null | number = null
) => {
    try {
        let queryRef = firestore.collection(collectionPath) as Query;

        if (queries) {
            queries.forEach((query) => {
                const [field, operator, value] = query;
                queryRef = queryRef.where(field, operator, value);
            });
        }

        if (limit !== null && limit !== undefined) {
            queryRef = queryRef.limit(limit);
        }

        const snapShot = await queryRef.get();

        if (snapShot.empty) {
            console.log('No matching documents.');
            return null;
        }

        let snapShotData: any[] = [];

        snapShot.forEach((doc) => {
            snapShotData.push({ id: doc.id, ...doc.data() });
        });

        return snapShotData;
    } catch (error: any) {
        console.error('Error retrieving documents', error.message);
        throw new Error(error);
    }
}

export const getDocumentsByOrder = async ({
    collectionPath,
    orderBy,
    sort = 'desc',
    limit = 5,
    queries = null
} : GetDocumentsByOrderProps) => {
    try {
        let queryRef = firestore.collection(collectionPath) as Query;

        if (queries) {
            queries.forEach((query) => {
                const [field, operator, value] = query;
                queryRef = queryRef.where(field, operator, value);
            });
        }

        queryRef = queryRef.orderBy(orderBy, sort);

        if (limit !== null && limit !== undefined) {
            queryRef = queryRef.limit(limit);
        }

        const snapShot = await queryRef.get();

        if (snapShot.empty) {
            console.log('No matching documents.');
            return null;
        }

        let snapShotData: any[] = [];

        snapShot.forEach((doc) => {
            snapShotData.push({ id: doc.id, ...doc.data() });
        });

        return snapShotData;
    } catch (error: any) {
        console.error('Error retrieving documents', error.message);
        throw new Error(error);
    }
}

export const updateDocument = async (collectionPath: string, docPath: string, toUpdate: any) => {
    try {
        const collecionRef = firestore
            .collection(collectionPath)
            .doc(docPath);

        // Initiate updates
        await collecionRef.update(toUpdate);

        // Fetch the updated document
        const updatedDocSnapshot = await collecionRef.get();

        // Extract the data from the snapshot
        const updatedDocData = updatedDocSnapshot.data();

        return updatedDocData;
    } catch (error: any) {
        console.error('Error adding documents', error.message);
        throw new Error(error);
    }
}

export const deleteDocument = async (collectionPath: string, docPath: string) => {
    try {
        const res = await firestore
            .collection(collectionPath)
            .doc(docPath)
            .delete();
    } catch (error: any | unknown) {
        console.error('Error deleting document', error);
        throw new Error(error);
    }
}
