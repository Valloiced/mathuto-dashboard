import { Dispatch, FormEvent, SetStateAction } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import Banner from '@/public/assets/forgot-password-banner.png';

import '../../styles/login.css';

interface ForgotPasswordFormProps {
    email: string,
    setEmail: Dispatch<SetStateAction<string>>,
    handlePasswordReset: (event: FormEvent<HTMLFormElement>) => void
}

export default function ForgotPasswordForm({
    email,
    setEmail,
    handlePasswordReset
} : ForgotPasswordFormProps) {
    const router = useRouter();

    return (
        <div className='flex flex-row gap-4 w-full justify-evenly items-center max-md: px-4'>
            <div className='flex max-md:hidden'>
                <Image 
                    src={Banner}
                    width={400}
                    height={400}
                    alt="Forgot Password Banner"
                />
            </div>
            <div className='flex flex-col gap-8'>
                <h1 className='font-poppins font-semibold text-4xl text-dark-blue w-96 max-md:text-center'>Forgot Your Password?</h1>
                <form className="flex flex-col gap-6" onSubmit={handlePasswordReset}>
                    <div className="flex flex-col gap-2">
                        <div className="flex flex-col gap-1">
                            <input 
                                className="login-input" 
                                name="email"
                                type="text" 
                                placeholder="Email"
                                value={email}
                                autoComplete="email"
                                onChange={(e) => setEmail(e.target.value)} 
                            />
                        </div>
                    </div>
                    <div className="flex flex-col">
                        <input 
                            className="global-btn submit-btn" 
                            type="submit" 
                            value="Reset Password"
                        />
                        <span 
                            className="forgot-password"
                            onClick={() => router.replace('/login')}
                        >
                                Back to Sign-in
                        </span>
                    </div>
                </form>
            </div>
        </div>
    );
}