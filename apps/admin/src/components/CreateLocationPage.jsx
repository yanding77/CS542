import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthLayout from "./AuthLayout.jsx";

export default function CreateLocationPage() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [address, setAddress] = useState('');
    const navigate = useNavigate();

    // handles login for owner accounts
    const handleCreation = async (e) => {
        e.preventDefault();

        const token = localStorage.getItem('jwt');

        const res = await fetch('http://localhost:3000/api/locations/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
                username: username.toLowerCase(),
                password,
                address,
            }),
        });

        const data = await res.json();

        // if not valid, return reason why
        if (!res.ok) {
            alert(data.message);
            return;
        }

        alert('Location account created!');
        // go to owner dashboard if account is created
        navigate('/owner/dashboard');
    };

    return (
        <div className="bg-neutral-800">
            <AuthLayout
                title="Create Location Account"
                subtitle="Enter new account information below to create a new account"
            >
                <form onSubmit={handleCreation} className="flex flex-col gap-3">
                    <input
                        className="border p-3 rounded-lg"
                        type="username"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
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
                        type="address"
                        placeholder="Address"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                    />

                    <button
                        type="submit"
                        className="bg-black text-white py-3 rounded-lg hover:bg-gray-800"
                    >
                        Create Location Account
                    </button>

                    <button
                        type="button"
                        onClick={() => navigate('/owner/dashboard')}
                        className="text-sm text-gray-500 hover:underline"
                    >
                        Back
                    </button>
                </form>
            </AuthLayout>
        </div>
    );
}