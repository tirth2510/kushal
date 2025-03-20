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
    const defaultPrompt = "nature landscape"; // ✅ Set predefined prompt

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
        generateImages();
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

    // Function to generate one default prompt image + 11 random images, placing prompt image at random index
    const generateImages = async () => {
        try {
            console.log("🔍 Fetching default image for:", defaultPrompt);
            
            // Fetch images for the predefined prompt
            const promptResponse = await fetch(
                `https://api.unsplash.com/search/photos?query=${defaultPrompt}&per_page=12`,
                {
                    headers: { Authorization: `Client-ID ${UNSPLASH_ACCESS_KEY}` },
                }
            );

            if (!promptResponse.ok) throw new Error("Failed to fetch default images.");

            const promptData = await promptResponse.json();
            if (promptData.results.length === 0) {
                toast.warn("No images found for the default prompt.");
                return;
            }

            // Select one image from the prompt results
            const selectedPromptImage = promptData.results[0].urls.small;

            console.log("✅ Selected prompt image:", selectedPromptImage);

            // Fetch 11 completely random images (not related to prompt)
            console.log("🔍 Fetching 11 random images...");
            const randomResponse = await fetch(
                `https://api.unsplash.com/photos/random?count=11`,
                {
                    headers: { Authorization: `Client-ID ${UNSPLASH_ACCESS_KEY}` },
                }
            );

            if (!randomResponse.ok) throw new Error("Failed to fetch random images.");

            const randomData = await randomResponse.json();
            let randomImages = randomData.map(image => image.urls.small);

            console.log("✅ Random images fetched:", randomImages);

            // Insert the prompt image at a random index
            const randomIndex = Math.floor(Math.random() * 12); // Generate random index between 0-11
            randomImages.splice(randomIndex, 0, selectedPromptImage);

            console.log(`✅ Inserted prompt image at index ${randomIndex}`);

            // Update state with shuffled images
            setImages(randomImages);
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
