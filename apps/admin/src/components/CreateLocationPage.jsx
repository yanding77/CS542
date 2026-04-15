import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

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
        <div>
            <h2>Location Account Creation</h2>

            <form onSubmit={handleCreation}>
                <input
                    type="username"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />

                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                <input
                    type="address"
                    placeholder="Address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                />

                <button type="submit">Create Account</button>
            </form>

            <button onClick={() => navigate('/owner/dashboard')}>Back</button>
        </div>
    );
}