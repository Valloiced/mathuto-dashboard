'use client';

import { useContext, createContext, useState, useEffect, ReactNode } from 'react';
import { onAuthStateChanged, getAuth, User } from 'firebase/auth';
import firebaseApp from '../configs/firebase.config';

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
            {loading ? <div>Loading...</div> : children}
        </AuthContext.Provider>
    );
};
