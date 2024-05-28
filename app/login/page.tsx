'use client'
import { useState, ChangeEvent, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { AuthErrorCodes } from "firebase/auth";
import { logIn } from "@/lib/firebase-auth";
import Banner from "@/components/Login/Banner";
import LoginForm from "@/components/Login/LoginForm";

import '../../styles/login.css';

export default function Login() {
    const router = useRouter();
    const [loginForm, setLoginForm] = useState({
        email: '',
        password: ''
    });

    const [error, setError] = useState({
        type: '',
        message: ''
    });

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        try {
            const { email, password } = loginForm; 

            if (!email) {
                return setError({
                    type: 'email',
                    message: 'Please enter your email'
                })
            }

            if (!password) {
                return setError({
                    type: 'password',
                    message: 'Please enter your password'
                })
            }

            const user = await logIn(email, password);

            if (!user) {
                return console.log('Wrong Credentials');
            }

            const response = await fetch("/api/login", {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${await user.getIdToken()}`
                }
            });

            if (response.status === 200) {
                router.replace('/dashboard');
            } else {
                return console.log('Wrong Credentials')
            }
        } catch (error: any | unknown) {
            if (error.code === AuthErrorCodes.INVALID_LOGIN_CREDENTIALS) {
                // setError('Invalid email or password');
                /** Toastify */
            } else if (error.code === AuthErrorCodes.INVALID_EMAIL) {
                setError({
                    type: 'email',
                    message: 'Invalid Email'
                });
            }
            console.log(error.code);
        }
    }

    const handleInput = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;

        setLoginForm(prevForm => ({
            ...prevForm,
            [name]: value
        }))
    }

    return (
        <div className="flex h-screen bg-white">
            <Banner />
            <LoginForm
                error={error}
                loginForm={loginForm}
                handleSubmit={handleSubmit} 
                handleInput={handleInput}
            />
        </div>
    )
}