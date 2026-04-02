import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

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

            <button onClick={() => navigate('/')}>Back</button>
        </div>
    );
}