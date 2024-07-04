'use client';

import { ChangeEvent, FormEvent, useState } from "react";
import { toast } from "react-toastify";

import ForgotPasswordForm from "@/components/forgot-password/ForgotPasswordForm";
import Header from "@/components/forgot-password/Header";
import Footer from "@/components/forgot-password/Footer";

export default function ForgotPassword() {
    const [email, setEmail] = useState<string>('');

    const handlePasswordReset = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const promiseToast = toast.loading("Sending password reset email");
        
        try {
            if (!email) {
                return toast.dismiss(promiseToast);
            }

            const response = await fetch("/api/forgot-password", {
                method: "POST",
                body: JSON.stringify({ email })
            });

            if (response.status === 200) {
                toast.update(
                    promiseToast, 
                    { 
                        render: "Password Reset Email Sent Successfully",
                        type: "success",
                        isLoading: false,
                        autoClose: 5000
                });
                toast.success('Please check your email', { autoClose: 5000 });
            } else {
                toast.update(
                    promiseToast, 
                    { 
                        render: "We are unable to send your password reset email",
                        type: "error",
                        isLoading: false,
                        autoClose: 5000
                });
                toast.error('Please check your given email if it is correct', { autoClose: 5000 });
            }
        } catch (error: any | unknown) {
            console.error(error);
            toast.update(
                promiseToast, 
                { 
                    render: "Invalid Email or Password",
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
                setEmail={setEmail}
                handlePasswordReset={handlePasswordReset}
            />
            <Footer />
        </div>
    );
}