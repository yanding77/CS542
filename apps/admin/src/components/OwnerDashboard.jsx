import { useEffect, useState } from 'react';

export default function OwnerDashboard() {
    const [data, setData] = useState(null);

    useEffect(() => {
        // redirects to the /locations/dashboard directory if login credentials are correct
        const fetchDashboard = async () => {
            const token = localStorage.getItem('jwt');

            const res = await fetch('http://localhost:3000/owners/dashboard', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            // If credentials are invalid, give an error
            if (!res.ok) {
                console.error('Unauthorized');
                return;
            }

            // if successful, set data to their data for their dashboard
            const data = await res.json();
            setData(data);
        };


        void fetchDashboard();
    }, []);

    // logs out account back to /login
    const handleLogout = () => {
        // Remove JWT token
        localStorage.removeItem('jwt');
        window.location.href = '/';
    };

    return (
        <div>
            <h2>Owner Dashboard</h2>
            <button onClick={handleLogout}>Logout</button>
            <pre>{JSON.stringify(data, null, 2)}</pre>
        </div>
    );
}