import React, { useState } from 'react';
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../../firebase/config"; // ✅ Import Firestore DB instance

const EmailPage = () => {
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            console.log(`🔎 Checking email in Firestore: ${email}`);

            const emailLower = email.toLowerCase().trim(); // ✅ Convert to lowercase & remove spaces
            const q = query(collection(db, "email"), where("email", "==", emailLower)); // 🔹 Query Firestore
            const querySnapshot = await getDocs(q);

            console.log("Firestore Query Result:", querySnapshot.empty ? "No matching document found" : "Email exists"); // ✅ Debugging output

            if (!querySnapshot.empty) {
                alert(`✅ Email "${email}" is registered in Firestore.`);
            } else {
                alert(`❌ Email "${email}" is NOT registered.`);
            }
        } catch (error) {
            console.error("🚨 Error checking email:", error);
            alert(`⚠️ Error checking email: ${error.message}`);
        }

        setLoading(false);
    };

    return (
        <div style={{ textAlign: 'center', padding: '20px' }}>
            <h2>Check Email in Firestore</h2>
            <form onSubmit={handleSubmit} style={{ marginTop: '20px' }}>
                <input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    style={{ padding: '10px', width: '250px', marginBottom: '10px' }}
                />
                <br />
                <button type="submit" disabled={loading} style={{ padding: '10px 20px', cursor: 'pointer' }}>
                    {loading ? 'Checking...' : 'Check Email'}
                </button>
            </form>
        </div>
    );
};

export default EmailPage;
