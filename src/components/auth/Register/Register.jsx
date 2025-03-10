// import { useState } from 'react'
// import { Navigate, Link, useNavigate } from 'react-router-dom'
// import { useAuth } from "D:/MUSTAFA'S FOLDER/SEM 7 2024/LY PROJECT 2024/PredictEdge/graphy-pass/src/contexts/authcontexts"
// import { doCreateUserWithEmailAndPassword } from "D:/MUSTAFA'S FOLDER/SEM 7 2024/LY PROJECT 2024/PredictEdge/graphy-pass/src/firebase/auth"

// const Register = () => {

//     const navigate = useNavigate()

//     const [email, setEmail] = useState('')
//     const [password, setPassword] = useState('')
//     const [confirmPassword, setconfirmPassword] = useState('')
//     const [isRegistering, setIsRegistering] = useState(false)
//     const [errorMessage, setErrorMessage] = useState('')

//     const { userLoggedIn } = useAuth()

//     const onSubmit = async (e) => {
//         e.preventDefault()
//         if(!isRegistering) {
//             setIsRegistering(true)
//             await doCreateUserWithEmailAndPassword(email, password)
//         }
//     }

//     return (
//         <>
//             {userLoggedIn && (<Navigate to={'/home'} replace={true} />)}

//             <main className="w-full h-screen flex self-center place-content-center place-items-center">
//                 <div className="w-96 text-gray-600 space-y-5 p-4 shadow-xl border rounded-xl">
//                     <div className="text-center mb-6">
//                         <div className="mt-2">
//                             <h3 className="text-gray-800 text-xl font-semibold sm:text-2xl">Create a New Account</h3>
//                         </div>

//                     </div>
//                     <form
//                         onSubmit={onSubmit}
//                         className="space-y-4"
//                     >
//                         <div>
//                             <label className="text-sm text-gray-600 font-bold">
//                                 Email
//                             </label>
//                             <input
//                                 type="email"
//                                 autoComplete='email'
//                                 required
//                                 value={email} onChange={(e) => { setEmail(e.target.value) }}
//                                 className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:indigo-600 shadow-sm rounded-lg transition duration-300"
//                             />
//                         </div>

//                         <div>
//                             <label className="text-sm text-gray-600 font-bold">
//                                 Password
//                             </label>
//                             <input
//                                 disabled={isRegistering}
//                                 type="password"
//                                 autoComplete='new-password'
//                                 required
//                                 value={password} onChange={(e) => { setPassword(e.target.value) }}
//                                 className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg transition duration-300"
//                             />
//                         </div>

//                         <div>
//                             <label className="text-sm text-gray-600 font-bold">
//                                 Confirm Password
//                             </label>
//                             <input
//                                 disabled={isRegistering}
//                                 type="password"
//                                 autoComplete='off'
//                                 required
//                                 value={confirmPassword} onChange={(e) => { setconfirmPassword(e.target.value) }}
//                                 className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg transition duration-300"
//                             />
//                         </div>

//                         {errorMessage && (
//                             <span className='text-red-600 font-bold'>{errorMessage}</span>
//                         )}

//                         <button
//                             type="submit"
//                             disabled={isRegistering}
//                             className={`w-full px-4 py-2 text-white font-medium rounded-lg ${isRegistering ? 'bg-gray-300 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700 hover:shadow-xl transition duration-300'}`}
//                         >
//                             {isRegistering ? 'Signing Up...' : 'Sign Up'}
//                         </button>
//                         <div className="text-sm text-center">
//                             Already have an account? {'   '}
//                             <Link to={'/login'} className="text-center text-sm hover:underline font-bold">Continue</Link>
//                         </div>
//                     </form>
//                 </div>
//             </main>
//         </>
//     )
// }

// export default Register

import { useState } from "react";
import { Navigate, Link, useNavigate } from "react-router-dom";
import { useAuth } from "C:/Users/tirth/OneDrive/Desktop/kushal/src/contexts/authcontexts";
import { doCreateUserWithEmailAndPassword } from "C:/Users/tirth/OneDrive/Desktop/kushal/src/firebase/auth";
import "./register.css"; // Import the new CSS file
import Header from "../../header/Header";

const Register = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setconfirmPassword] = useState("");
  const [isRegistering, setIsRegistering] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const { userLoggedIn } = useAuth();

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!isRegistering) {
        setIsRegistering(true);
        try {
            const userCredential = await doCreateUserWithEmailAndPassword(email, password);
            
            // Show an alert to inform user
            alert("A verification email has been sent to your email address. Please verify your email before logging in.");
            
            navigate('/login');  // Redirect to login page
        } catch (error) {
            setErrorMessage(error.message);
            setIsRegistering(false);
        }
    }
};


  return (
    <>
    <Header></Header>
      {userLoggedIn && <Navigate to={"/home"} replace={true} />}

      <main>
        <div className="image-cont1">
          <img
            src="https://img.freepik.com/free-photo/3d-illustration-computer-monitor-login-screen_107791-16390.jpg"
            alt="Security"
            className="main-img"
          />
        </div>

        <div className="container">
          <div className="text-center mb-6">
            <div className="mt-2">
              <h3>Create a New Account</h3>
            </div>
          </div>
          <form onSubmit={onSubmit} className="space-y-4">
            <div>
              <label>Email</label>
              <input
                type="email"
                style={{ marginTop: "10px" }}
                autoComplete="email"
                required
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
            </div>

            <div>
              <label>Password</label>
              <input
                disabled={isRegistering}
                type="password"
                style={{ marginTop: "10px" }}
                autoComplete="new-password"
                required
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
            </div>

            <div>
              <label>Confirm Password</label>
              <input
                disabled={isRegistering}
                type="password"
                style={{ marginTop: "10px" }}
                autoComplete="off"
                required
                value={confirmPassword}
                onChange={(e) => {
                  setconfirmPassword(e.target.value);
                }}
              />
            </div>

            {errorMessage && (
              <span className="error-message">{errorMessage}</span>
            )}

            <button
              type="submit"
              disabled={isRegistering}
              style={{ marginTop: "10px", marginBottom: "5px" }}
              className={isRegistering ? "disabled" : ""}
            >
              {isRegistering ? "Sign Up..." : "Sign Up"}
            </button>
            <div className="text-sm text-center">
              Already have an account?{" "}
              <Link to={"/login"} className="text-center">
                Continue
              </Link>
            </div>
          </form>
        </div>
      </main>
    </>
  );
};

export default Register;
