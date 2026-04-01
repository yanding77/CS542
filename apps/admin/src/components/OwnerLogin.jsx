import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function OwnerLogin() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    // handles login for owner accounts
    const handleLogin = async (e) => {
        e.preventDefault();

        // send login details to backend
        const res = await fetch('http://localhost:3000/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: email, password: password, role: 'owner' }), // 👈 important
        });

        const data = await res.json();

        // if not valid, return reason why
        if (!res.ok) {
            alert(data.message);
            return;
        }

        const payload = JSON.parse(atob(data.access_token.split('.')[1]));

        // return out if the role of the login is not an owner account
        if (payload.role !== 'owner') {
            alert('Not an owner account');
            return;
        }

        localStorage.setItem('jwt', data.access_token);
        localStorage.setItem('role', payload.role);

        // go to owner dashboard if credentials checkout
        navigate('/owner/dashboard');
    };

    return (
        <div>
            <h2>Owner Login</h2>

            <form onSubmit={handleLogin}>
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />

                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                <button type="submit">Login</button>
            </form>

            <button onClick={() => navigate('/')}>Back</button>
        </div>
    );
}