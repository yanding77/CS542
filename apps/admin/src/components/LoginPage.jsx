import { useNavigate } from 'react-router-dom';

export default function LoginPage() {
    const navigate = useNavigate();
    // allow the person to:
    // 1. Sign in as an owner
    // 2. Sign in on a location account
    // 3. Create a new owner account
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