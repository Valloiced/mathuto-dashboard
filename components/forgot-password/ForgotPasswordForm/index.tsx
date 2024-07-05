import { ChangeEvent, Dispatch, FormEvent, SetStateAction, use } from 'react';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';

import Banner from './Banner';
import EmailForm from './EmailForm';

import '../../../styles/login.css';
import PasswordForm from './PasswordForm';

import type { FormError, PasswordForm as PasswordFormType } from '@/app/forgot-password/page';
import { error } from 'console';

export interface EmailFormProps {
    email: string,
    setEmail: Dispatch<SetStateAction<string>>,
    handlePasswordReset: (event: FormEvent<HTMLFormElement>) => void,
    error: FormError,
    router: AppRouterInstance
}

export interface PasswordFormProps {
    passwordForm: PasswordFormType,
    handlePasswordInput:  (event: ChangeEvent<HTMLInputElement>) => void,
    handleChangePassword: (event: FormEvent<HTMLFormElement>) => void,
    error: FormError,
    router: AppRouterInstance
}

interface ForgotPasswordFormProps extends EmailFormProps, PasswordFormProps {
    isValidEmail: Boolean
}

export default function ForgotPasswordForm({
    email,
    passwordForm,
    setEmail,
    isValidEmail,
    handlePasswordReset,
    handlePasswordInput,
    handleChangePassword,
    router,
    error
} : ForgotPasswordFormProps) {
    
    return (
        <div className='flex flex-row gap-4 w-full justify-evenly items-center max-md: px-4'>
            <Banner />
            {!isValidEmail ? (
                <EmailForm 
                    email={email}
                    setEmail={setEmail}
                    handlePasswordReset={handlePasswordReset}
                    router={router}
                    error={error}
                />
            ) : (
                <PasswordForm 
                    passwordForm={passwordForm}
                    handlePasswordInput={handlePasswordInput}
                    handleChangePassword={handleChangePassword}
                    router={router}
                    error={error}
                />
            )}
        </div>
    );
}