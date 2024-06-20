'use client';

import { useContext, createContext, useState, useEffect, ReactNode } from 'react';
import { onAuthStateChanged, getAuth, User } from 'firebase/auth';
import Image from 'next/image';
import PulseLoader from "react-spinners/PulseLoader";
import firebaseApp from '../configs/firebase.config';

import Icon from '@/public/assets/icon.png';

// Initialize Firebase Auth
const auth = getAuth(firebaseApp);

// Define the context type
interface AuthContextType {
    user: User | null;
    loading: boolean;
}

// Create the AuthContext with a default value
const AuthContext = createContext<AuthContextType>({
    user: null,
    loading: true,
});

export const useAuthContext = () => useContext(AuthContext);

interface AuthContextProviderProps {
    children: ReactNode;
}

function Loading() {
    return (
        <div className='flex flex-col justify-center items-center gap-10 w-screen h-screen'>
            <Image
                src={Icon}
                width={100}
                height={100}
                alt="Mathuto Icon"
            /> 
            <PulseLoader color="#48B2FF" size={10} />
        </div>
    )
}

export const AuthContextProvider = ({ children }: AuthContextProviderProps) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setUser(user);
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    return (
        <AuthContext.Provider value={{ user, loading }}>
            {loading ? <Loading /> : children}
        </AuthContext.Provider>
    );
};
