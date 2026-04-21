import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthLayout from "./AuthLayout.jsx";

// function to create a new owner
export default function RegisterOwner() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [restaurantName, setRestaurantName] = useState('');
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            alert('Passwords do not match');
            return;
        }

        // need to send email, restaurant name, password, and confirmed password to create account
        const res = await fetch('http://localhost:3000/api/owners/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password, restaurantName }),
        });

        const data = await res.json();

        // return error if information is not valid
        if (!res.ok) {
            alert(data.message);
            return;
        }

        // notify them that their account was created and kick them to login page
        alert('Account created!');
        navigate('/');
    };

    return (
        <div className="bg-neutral-800">
            <AuthLayout
                title="Create Owner Account"
                subtitle="Enter new account information below to create a new account"
            >
                <form onSubmit={handleRegister} className="flex flex-col gap-3">
                    <input
                        className="border p-3 rounded-lg"
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />

                    <input
                        className="border p-3 rounded-lg"
                        type="text"
                        placeholder="Restaurant Name"
                        value={restaurantName}
                        onChange={(e) => setRestaurantName(e.target.value)}
                    />

                    <input
                        className="border p-3 rounded-lg"
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />

                    <input
                        className="border p-3 rounded-lg"
                        type="password"
                        placeholder="Confirm Password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />

                    <button
                        type="submit"
                        className="bg-black text-white py-3 rounded-lg hover:bg-gray-800"
                    >
                        Create Account
                    </button>

                    <button
                        type="button"
                        onClick={() => navigate('/')}
                        className="text-sm text-gray-500 hover:underline"
                    >
                        Back
                    </button>
                </form>
            </AuthLayout>
        </div>
    );
}