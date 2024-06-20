import firebaseApp from "../configs/firebase.config";
import { signInWithEmailAndPassword, getAuth, signOut, onAuthStateChanged } from "firebase/auth";

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