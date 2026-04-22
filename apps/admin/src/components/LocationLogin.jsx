import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthLayout from './AuthLayout';

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
        <div className="bg-neutral-800">
            <AuthLayout
                title="Location Login"
                subtitle="Sign in to manage the orders for your location"
            >
                <form onSubmit={handleLogin} className="flex flex-col gap-3">

                    <input
                        className="border p-3 rounded-lg"
                        type="text"
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

                    <button
                        type="submit"
                        className="bg-black text-white py-3 rounded-lg hover:bg-gray-800"
                    >
                        Login
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