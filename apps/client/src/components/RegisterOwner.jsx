import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

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

        const res = await fetch('http://localhost:3000/owners/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password, restaurantName }),
        });

        const data = await res.json();

        if (!res.ok) {
            alert(data.message);
            return;
        }

        alert('Account created!');
        navigate('/login');
    };

    return (
        <div>
            <h2>Create Owner Account</h2>

            <form onSubmit={handleRegister}>
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />

                <input
                    type="text"
                    placeholder="Restaurant Name"
                    value={restaurantName}
                    onChange={(e) => setRestaurantName(e.target.value)}
                />

                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                <input
                    type="password"
                    placeholder="Confirm Password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                />

                <button type="submit">Create Account</button>
            </form>

            <button onClick={() => navigate('/login')}>Back</button>
        </div>
    );
}