import { useEffect, useState } from 'react';
import Header from "../header/Header";
import { useAuth } from "C:/Users/tirth/OneDrive/Desktop/kushal/src/contexts/authcontexts/index";
import { useLocation, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Home.css';
import DefImg from "C:/Users/tirth/OneDrive/Desktop/kushal/src/assets/signup.png";
import { db } from "C:/Users/tirth/OneDrive/Desktop/kushal/src/firebase/config"; 
import { doc, setDoc, getDoc } from "firebase/firestore";

const Home = () => {
    const { currentUser } = useAuth();
    const location = useLocation();
    const navigate = useNavigate();
    const [images, setImages] = useState([]);

    const UNSPLASH_ACCESS_KEY = 'FNxL47px-8y7SqgCmvjzVcz-73aUWYoleL3L9xg9h7s'; // Replace with your Unsplash Access Key
    const defaultPrompt = "green grass"; // ✅ Set predefined prompt

    useEffect(() => {
        if (location.state?.successMessage) {
            toast.success('Login Successful!', {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark"
            });

            navigate(location.pathname, { replace: true, state: {} });
        }

        // ✅ Automatically trigger image generation on page load
        imageGenerator(defaultPrompt);
    }, [location, navigate]);

    // Function to store prompt in Firestore
    const storePromptInFirestore = async (query) => {
        if (!currentUser) {
            toast.error("You need to be logged in to save prompts.");
            console.log("❌ User is not logged in.");
            return;
        }
    
        try {
            const userDocRef = doc(db, "prompts", currentUser.email);
            const userDoc = await getDoc(userDocRef);
            let existingPrompts = [];
    
            if (userDoc.exists()) {
                existingPrompts = userDoc.data().queries || [];
            }
    
            if (!existingPrompts.includes(query)) {
                existingPrompts.push(query);
                await setDoc(userDocRef, { queries: existingPrompts }, { merge: true });
    
                console.log("✅ Prompt stored successfully:", query);
                toast.success("Prompt stored successfully in the database!", {
                    position: "top-center",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                    icon: "✅"
                });
            } else {
                console.log("ℹ️ Prompt already exists:", query);
            }
        } catch (error) {
            console.error("❌ Error storing prompt in Firestore:", error);
            toast.error("Failed to store prompt. Try again.");
        }
    };

    // Function to generate images and store prompt
    const imageGenerator = async (query) => {
        if (!query) {
            toast.warn("Prompt is empty!");
            return;
        }

        // Store the prompt in Firestore
        await storePromptInFirestore(query);

        try {
            console.log("🔍 Fetching images for:", query);
            const response = await fetch(
                `https://api.unsplash.com/search/photos?query=${query}&per_page=12`,
                {
                    headers: { Authorization: `Client-ID ${UNSPLASH_ACCESS_KEY}` },
                }
            );

            if (!response.ok) throw new Error("Failed to fetch images.");

            const data = await response.json();
            if (data.results.length === 0) {
                toast.warn("No images found for this query.");
            }
            setImages(data.results.map(image => image.urls.small));
        } catch (error) {
            console.error("❌ Error fetching images:", error);
            toast.error("Error fetching images. Try again later.");
        }
    };

    return (
        <div className='ai-image-generator'>
            <Header />
            <ToastContainer />
            <div className="header">AI Image <span className='aiwala'>Generator</span></div>

            <div className="img-loading">
                <div className="images-grid">
                    {images.length > 0 ? (
                        images.map((url, index) => (
                            <div className="image" key={index}>
                                <img style={{ width: '90%' }} src={url} alt={`Generated ${index}`} />
                            </div>
                        ))
                    ) : (
                        <div className="image">
                            <img style={{ width: '90%' }} src={DefImg} alt="Default" />
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Home;
