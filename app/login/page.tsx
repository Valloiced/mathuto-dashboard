'use client'
import { useState, ChangeEvent, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { AuthErrorCodes } from "firebase/auth";
import { logIn } from "@/lib/firebase-auth";
import Banner from "@/components/Login/Banner";
import LoginForm from "@/components/Login/LoginForm";

import '../../styles/login.css';
import { toast } from "react-toastify";

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

    const [isLoggingIn, setIsLoggingIn] = useState<boolean>(false);

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const promiseToast = toast.loading("Logging in...");

        try {
            const { email, password } = loginForm; 

            if (!email) {
                setError({
                    type: 'email',
                    message: 'Please enter your email'
                });

                return toast.dismiss(promiseToast);
            }

            if (!password) {
                setError({
                    type: 'password',
                    message: 'Please enter your password'
                })

                return toast.dismiss(promiseToast);
            }

            const user = await logIn(email, password);

            if (!user) {
                toast.update(
                    promiseToast, 
                    { 
                        render: "Invalid Email or Password",
                        type: "error",
                        isLoading: false,
                        autoClose: 5000
                });
            }

            const response = await fetch("/api/login", {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${await user.getIdToken()}`
                }
            });

            if (response.status === 200) {
                toast.update(
                    promiseToast, 
                    { 
                        render: "Login Successfully",
                        type: "success",
                        isLoading: false,
                        autoClose: 5000
                });
                return router.replace('/dashboard');
            }
        } catch (error: any | unknown) {
            if (error.code === AuthErrorCodes.INVALID_LOGIN_CREDENTIALS) {
                return toast.update(
                    promiseToast, 
                    { 
                        render: "Invalid Email or Password",
                        type: "error",
                        isLoading: false,
                        autoClose: 5000
                });
            } else if (error.code === AuthErrorCodes.INVALID_EMAIL) {
                setError({
                    type: 'email',
                    message: 'Invalid Email'
                });
            }
            return toast.dismiss(promiseToast);
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
                isLoggingIn={isLoggingIn}
                handleSubmit={handleSubmit} 
                handleInput={handleInput}
            />
        </div>
    )
}