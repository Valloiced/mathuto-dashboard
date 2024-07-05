import firebaseApp from "../configs/firebase.config";
import { 
    signInWithEmailAndPassword, 
    getAuth, 
    signOut, 
    sendPasswordResetEmail,
    updatePassword as updatePasswordUtil
} from "firebase/auth";

const auth = getAuth(firebaseApp);

export async function logIn(email: string, password: string) {
    try {
        const userCredentials = await signInWithEmailAndPassword(auth, email, password);

        const user = userCredentials.user;

        return user;
    } catch (error: any | unknown) {
        console.error(error.code);
        throw error;
    }
};

export async function logOut() {
    try {
        await signOut(auth);

        return { message: 'Signout successfully' };
    } catch (error: any | unknown) {
        console.error(error.code);
        throw error;
    }
}

export const resetPassword = async (email: string) => {
    try {
        const res = await sendPasswordResetEmail(auth, email);
        
        return { message: 'Password reset email sent successfully' };
    } catch (error: any | unknown) {
        console.error('Error sending password reset', error);
        throw new Error(error);
    }
}

export const updatePassword = async (email: string, password: string, newPassword: string) => {
    try {
        const tempLogin = await logIn(email, password);

        if (tempLogin) {
            await updatePasswordUtil(tempLogin, newPassword);
            await logOut();
        }
    } catch (error: any | unknown) {
        console.error('Error updating password', error);
        throw new Error(error);
    }
}

export const checkIfPasswordCorrect = async (email: string, password: string) => {
    try {
        const tempLogin = await logIn(email, password);

        if (tempLogin) {
            await logOut();
            return true;
        } else {
            return false;
        } 
    } catch (error: any | unknown) {
        console.error('Error checking for password validity', error);
        return false;
    }
}