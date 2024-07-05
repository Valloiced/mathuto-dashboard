'use client';

import { ChangeEvent, FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

import { checkIfPasswordCorrect, updatePassword } from "@/lib/firebase-auth";
import { AuthErrorCodes } from "firebase/auth";

import ForgotPasswordForm from "@/components/forgot-password/ForgotPasswordForm";
import Header from "@/components/forgot-password/Header";
import Footer from "@/components/forgot-password/Footer";

export type PasswordForm = {
    currentPassword: string,
    newPassword: string,
    confirmPassword: string
}

export type FormError = {
    type: string,
    message: string
}

export default function ForgotPassword() {
    const router = useRouter();
    
    const [email, setEmail] = useState<string>('');
    const [passwordForm, setPasswordForm] = useState<PasswordForm>({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
    });

    const [error, setError] = useState<FormError>({
        type: '',
        message: ''
    });

    const [isValidEmail, setIsValidEmail] = useState<Boolean>(false);

    const handlePasswordInput = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;

        setPasswordForm(prevForm => ({
            ...prevForm,
            [name]: value
        }));
    }

    const handlePasswordReset = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        try {
            if (!email) {
                return setError({
                    type: 'email',
                    message: 'Please provide your email.'
                })
            }

            const response = await fetch(`/api/forgot-password/${email}`, { method: "GET" });

            if (response.status === 200) {
                setIsValidEmail(true);
            } else {
                setIsValidEmail(false);
                setError({
                    type: 'email',
                    message: 'Email does not exists or invalid. Please try again.'
                })
            }
        } catch (error) {
            console.error(error);
        }
    }

    const handleChangePassword = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const promiseToast = toast.loading('Updating password...');

        try {
            const { currentPassword, newPassword, confirmPassword } = passwordForm;
            if (currentPassword === '' || newPassword === '' || confirmPassword === '') {
                setError({
                    type: 'password',
                    message: 'Please fill up the required fields.'
                });
                return toast.dismiss(promiseToast);
            }

            if (newPassword !== confirmPassword) {
                setError({
                    type: 'password',
                    message: 'Your provided password must match.'
                });
                return toast.dismiss(promiseToast);
            }

            const isPasswordCorrect = await checkIfPasswordCorrect(email, currentPassword);

            if (!isPasswordCorrect) {
                setError({
                    type: 'password',
                    message: 'Your provided current password is incorrect.'
                });
                return toast.dismiss(promiseToast);
            }

            await updatePassword(email, currentPassword, newPassword);

            toast.update(
                promiseToast, 
                { 
                    render: "Password Updated",
                    type: "success",
                    isLoading: false,
                    autoClose: 5000
            });
            return router.replace('/login');
        } catch (error: any | unknown) {
            if (error.code === AuthErrorCodes.WEAK_PASSWORD) {
                return toast.update(
                    promiseToast, 
                    { 
                        render: "Password should be at least 6 characters",
                        type: "error",
                        isLoading: false,
                        autoClose: 5000
                });
            }
            
            return toast.update(
                promiseToast, 
                { 
                    render: "Password Reset Failed. Please try again later.",
                    type: "error",
                    isLoading: false,
                    autoClose: 5000
            });
        } 
    }

    return (
        <div className="h-screen overflow-hidden flex flex-col justify-between">
            <Header />
            <ForgotPasswordForm 
                email={email}
                passwordForm={passwordForm}
                isValidEmail={isValidEmail}
                setEmail={setEmail}
                handlePasswordReset={handlePasswordReset}
                handlePasswordInput={handlePasswordInput}
                handleChangePassword={handleChangePassword}
                router={router}
                error={error}
            />
            <Footer />
        </div>
    );
}