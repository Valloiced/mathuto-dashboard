import { useState, useEffect } from 'react';
import { getFirestore, collection, onSnapshot, query, where, DocumentData } from 'firebase/firestore';

import firebaseApp from '@/configs/firebase.config';
import { useAuthContext } from '@/context/AuthContext';
import { User } from 'firebase/auth';

const useProfile = () => {
    const { user } = useAuthContext();
    const [data, setData] = useState<any>({}); // Merged profile from firestore and firebase auth

    useEffect(() => {
        let observer : () => void;

        const retrieveData = async () => {
            try {
                if (user) {
                    // This would not rely on firestore utils as we need to update this in realtime
                    // Directly using firebase on this one

                    const db = getFirestore(firebaseApp);

                    const profileRef = query(collection(db, 'users'), where('uid', '==', user.uid));
                    
                    // Retrieve real time data
                    observer = onSnapshot(profileRef, async (snapshot) => {
                        const profileData = snapshot.docs[0]?.data();
                        
                        setData({ ...user, ...profileData });
                    });
                }
            } catch (error) {
                console.error(error);
            }
        };

        retrieveData();

        // Clean up listener
        return () => {
            if (observer) {
                observer();
            }
        };
    }, [user]);

    return data;
};

export default useProfile;
