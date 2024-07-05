import { PasswordFormProps } from ".";

export default function PasswordForm({ 
    passwordForm,
    handlePasswordInput,
    handleChangePassword,
    error,
    router
} : PasswordFormProps) {
    return (
        <div className="flex flex-col gap-8">
        <h1 className='font-poppins font-semibold text-4xl text-dark-blue w-96 max-md:text-center'>Reset Password</h1>
            <form className="flex flex-col gap-8 w-[22rem]" onSubmit={handleChangePassword}>
                <div className="flex flex-col gap-4">
                    <input 
                        className="login-input" 
                        name="currentPassword"
                        type="password" 
                        placeholder="Current Password"
                        value={passwordForm.currentPassword}
                        autoComplete="username"
                        onChange={handlePasswordInput} 
                    />
                    <input 
                        className="login-input" 
                        name="newPassword"
                        type="password" 
                        value={passwordForm.newPassword}
                        placeholder="New Password"
                        autoComplete="new-password"
                        onChange={handlePasswordInput} 
                    />
                    <input 
                        className="login-input" 
                        name="confirmPassword"
                        type="password" 
                        value={passwordForm.confirmPassword}
                        placeholder="Confirm Password"
                        onChange={handlePasswordInput} 
                    />
                <p className="error">{error.type === 'password' && error.message}</p>
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
                        <p>Back to Sign-in</p>
                    </span>
                </div>
            </form>
        </div>
    );
}