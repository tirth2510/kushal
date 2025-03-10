import { useState } from 'react'
import { Navigate, Link, useNavigate } from 'react-router-dom';
import { doSignInWithEmailAndPassword, doSignInWithGoogle } from "C:/Users/tirth/OneDrive/Desktop/kushal/src/firebase/auth";
import { useAuth } from "C:/Users/tirth/OneDrive/Desktop/kushal/src/contexts/authcontexts";
import { toast, ToastContainer } from 'react-toastify';  // Import react-toastify
import 'react-toastify/dist/ReactToastify.css';  // Import the CSS
import './login.css';
import Header from '../../header/Header';
import { getAuth } from "firebase/auth";

const Login = () => {
    const { userLoggedIn } = useAuth();
    const navigate = useNavigate();  // Hook to navigate programmatically

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isSigningIn, setIsSigningIn] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    

const onSubmit = async (e) => {
    e.preventDefault();
    if (!isSigningIn) {
        setIsSigningIn(true);
        try {
            const auth = getAuth();
            const userCredential = await doSignInWithEmailAndPassword(email, password);

            // Check if user is verified
            if (!userCredential.user.emailVerified) {
                toast.error("Please verify your email before logging in.");
                setIsSigningIn(false);
                return;
            }

            navigate('/home', { state: { successMessage: "Login Successful" } });
        } catch (error) {
            setErrorMessage('Credentials are incorrect.');
            toast.error('Credentials are Incorrect', {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark"
            });
            setIsSigningIn(false);
        }
    }
};


    const onGoogleSignIn = (e) => {
        e.preventDefault();
        if (!isSigningIn) {
            setIsSigningIn(true);
            doSignInWithGoogle().then(() => {
                navigate('/home', { state: { successMessage: "Login Successful" } });
            }).catch(err => {
                toast.error("Google Sign-In failed.", { autoClose: 5000 });
                setIsSigningIn(false);
            });
        }
    };

    return (
        <div>
            <Header></Header>
            {userLoggedIn && (<Navigate to={'/home'} replace={true} />)}
            
            {/* Toast container for notifications */}
            <ToastContainer />

            <main className="login-container">

                <div className='logon'>
                    <img src="https://t4.ftcdn.net/jpg/04/60/71/01/360_F_460710131_YkD6NsivdyYsHupNvO3Y8MPEwxTAhORh.jpg" alt="" />
                </div>

                <div className="login-card">
                    <div className="text-center">
                        <div className="mt-2">
                            <h3>Welcome Back</h3>
                        </div>
                    </div>
                    <form onSubmit={onSubmit}>
                        <div>
                            <label>Email</label>
                            <input
                                type="email"
                                autoComplete='email'
                                required
                                value={email}
                                style={{ marginTop: "10px", marginBottom: '10px' }}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>

                        <div>
                            <label>Password</label>
                            <input
                                type="password"
                                autoComplete='current-password'
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>

                        {errorMessage && (
                            <span className="error-message">{errorMessage}</span>
                        )}

                        <button type="submit" disabled={isSigningIn}>
                            {isSigningIn ? 'Signing In...' : 'Sign In'}
                        </button>
                    </form>

                    <p style={{ textAlign: 'center', marginTop: '10px' }}>Don't have an account? <Link to={'/register'}>Sign up</Link></p>
                    <br></br>

                    <div style={{ textAlign: 'center', fontWeight: 'bold' }}>OR</div>

                    <button disabled={isSigningIn} onClick={onGoogleSignIn} className="google-signin-btn">
                        <svg className="w-5 h-5" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <g clipPath="url(#clip0_17_40)">
                                <path d="M47.532 24.5528C47.532 22.9214 47.3997 21.2811 47.1175 19.6761H24.48V28.9181H37.4434C36.9055 31.8988 35.177 34.5356 32.6461 36.2111V42.2078H40.3801C44.9217 38.0278 47.532 31.8547 47.532 24.5528Z" fill="#4285F4" />
                                <path d="M24.48 48.0016C30.9529 48.0016 36.4116 45.8764 40.3888 42.2078L32.6549 36.2111C30.5031 37.675 27.7252 38.5039 24.4888 38.5039C18.2275 38.5039 12.9187 34.2798 11.0139 28.6006H3.03296V34.7825C7.10718 42.8868 15.4056 48.0016 24.48 48.0016Z" fill="#34A853" />
                                <path d="M11.0051 28.6006C9.99973 25.6199 9.99973 22.3922 11.0051 19.4115V13.2296H3.03298C-0.371021 20.0112 -0.371021 28.0009 3.03298 34.7825L11.0051 28.6006Z" fill="#FBBC04" />
                                <path d="M24.48 9.49932C27.9016 9.44641 31.2086 10.7339 33.6866 13.0973L40.5387 6.24523C36.2 2.17101 30.4414 -0.068932 24.48 0.00161733C15.4055 0.00161733 7.10718 5.11644 3.03296 13.2296L11.005 19.4115C12.901 13.7235 18.2187 9.49932 24.48 9.49932Z" fill="#EA4335" />
                            </g>
                            <defs>
                                <clipPath id="clip0_17_40">
                                    <rect width="48" height="48" fill="white" />
                                </clipPath>
                            </defs>
                        </svg>
                        {isSigningIn ? 'Continuing with Google...' : 'Continue with Google'}
                    </button>
                </div>
            </main>
        </div>
    );
};

export default Login;
