import { ChangeEvent, FormEvent } from "react";
import Image from "next/image"
import Icon from "@/public/assets/icon.png";

interface LoginProps {
    error: {
        type: string,
        message: string
    },
    loginForm: {
        email: string;
        password: string;
    };
    handleSubmit: (event: FormEvent<HTMLFormElement>) => void;
    handleInput: (event: ChangeEvent<HTMLInputElement>) => void;
}

export default function Login({
    error,
    loginForm,
    handleSubmit,
    handleInput
} : LoginProps) {
    return (
        <div className='flex flex-col gap-6 justify-center items-center w-[60%] max-md:w-full'>
        <div className="flex flex-col items-center gap-4">
            <Image 
                src={Icon}
                width={150}
                height={150}
                alt="Mathuto Icon"
            />
            <h2 className="font-montserrat font-bold text-xl text-dark-blue text-opacity-90">MATHUTO</h2>
        </div>
        <div className="flex flex-col gap-4">
            <h3 className="font-poppins text-base font-semibold text-dark-blue text-opacity-90">Admin Login</h3>
            <form className="flex flex-col gap-6 w-[22rem]" onSubmit={handleSubmit}>
                <div className="flex flex-col gap-2">
                    <div className="flex flex-col gap-1">
                        <input 
                            className="login-input" 
                            name="email"
                            type="text" 
                            placeholder="Email"
                            value={loginForm.email}
                            autoComplete="username"
                            onChange={handleInput} 
                        />
                        <p className="error">{error.type === 'email' ? error.message : '\u00A0'}</p>
                    </div>
                    <input 
                        className="login-input" 
                        name="password"
                        type="password" 
                        value={loginForm.password}
                        placeholder="Password"
                        autoComplete="current-password"
                        onChange={handleInput} 
                    />
                    <p className="error">{error.type === 'password' && error.message}</p>
                </div>
                <div className="flex flex-col">
                    <input 
                        className="global-btn submit-btn" 
                        type="submit" 
                        value="Login"
                    />
                    <span className="forgot-password">Forgot Password?</span>
                </div>
            </form>
            <p className="text-center text-black text-opacity-50 font-poppins text-sm">© 2024 Mathuto. All Rights Reserved</p>
        </div>
    </div>
    )
}