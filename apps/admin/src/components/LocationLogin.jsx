import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function LocationLogin() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    // handles login for location / worker accounts
    const handleLogin = async (e) => {
        e.preventDefault();

        // send login details to backend
        const res = await fetch('http://localhost:3000/api/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username: username, password: password, role: 'location' }),
        });

        const data = await res.json();

        // if not valid, return reason why
        if (!res.ok) {
            alert(data.message);
            return;
        }

        const payload = JSON.parse(atob(data.access_token.split('.')[1]));

        // return out if the role of the login is not a location account
        if (payload.role !== 'location') {
            alert('Not a location account');
            return;
        }

        localStorage.setItem('jwt', data.access_token);
        localStorage.setItem('role', payload.role);

        const locationId = payload.sub;

        // go to location dashboard if credentials checkout
        navigate(`/location/dashboard/${locationId}`);
    };

    return (
        <div>
            <h2>Location Login</h2>

            <form onSubmit={handleLogin}>
                <input
                    type="text"
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

                <button type="submit">Login</button>
            </form>

            <button onClick={() => navigate('/')}>Back</button>
        </div>
    );
}