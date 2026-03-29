// import { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
//
// export default function LoginPage() {
//     const [username, setUsername] = useState('');
//     const [password, setPassword] = useState('');
//     const [error, setError] = useState('');
//     const navigate = useNavigate();
//
//     const handleLogin = async (e) => {
//         e.preventDefault();
//         try {
//             const res = await fetch('http://localhost:3000/auth/login', {
//                 method: 'POST',
//                 headers: { 'Content-Type': 'application/json' },
//                 body: JSON.stringify({ username, password }),
//             });
//
//             if (!res.ok) {
//                 const data = await res.json();
//                 setError(data.message || 'Login failed');
//                 return;
//             }
//
//             const data = await res.json();
//             const payload = JSON.parse(atob(data.access_token.split('.')[1]));
//
//             // save token & role
//             localStorage.setItem('jwt', data.access_token);
//             localStorage.setItem('role', payload.role);
//
//             // redirect based on role
//             if (payload.role === 'owner') navigate('/owner/dashboard');
//             else navigate('/location/dashboard');
//         } catch (err) {
//             console.error(err);
//             setError('Something went wrong');
//         }
//     };
//
//     return (
//         <div>
//             <h2>Login</h2>
//             <form onSubmit={handleLogin}>
//                 <input
//                     type="text"
//                     placeholder="Username or email"
//                     value={username}
//                     onChange={(e) => setUsername(e.target.value)}
//                 />
//                 <input
//                     type="password"
//                     placeholder="Password"
//                     value={password}
//                     onChange={(e) => setPassword(e.target.value)}
//                 />
//                 <button type="submit">Login</button>
//             </form>
//             {error && <p style={{ color: 'red' }}>{error}</p>}
//         </div>
//     );
// }
import { useNavigate } from 'react-router-dom';

export default function LoginPage() {
    const navigate = useNavigate();

    return (
        <div>
            <h2>Welcome</h2>

            <button onClick={() => navigate('/login/owner')}>
                Sign in as Owner
            </button>

            <button onClick={() => navigate('/login/location')}>
                Sign in as Location
            </button>

            <button onClick={() => navigate('/register')}>
                Create New Owner Account
            </button>
        </div>
    );
}