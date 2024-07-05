import type { EmailFormProps } from "."

export default function EmailForm({
    email,
    setEmail,
    handlePasswordReset,
    router,
    error
} : EmailFormProps) {
    return (
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
                    <p className="error">{error.type === 'email' && error.message}</p>
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
    )
}