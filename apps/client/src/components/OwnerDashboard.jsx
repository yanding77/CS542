import { useEffect, useState } from 'react';

export default function OwnerDashboard() {
    const [data, setData] = useState(null);

    useEffect(() => {
        const fetchDashboard = async () => {
            const token = localStorage.getItem('jwt');

            const res = await fetch('http://localhost:3000/owners/dashboard', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (!res.ok) {
                console.error('Unauthorized');
                return;
            }

            const data = await res.json();
            setData(data);
        };


        void fetchDashboard();
    }, []);

    const handleLogout = () => {
        // Remove JWT token
        localStorage.removeItem('jwt');
        window.location.href = '/login';
    };

    return (
        <div>
            <h2>Owner Dashboard</h2>
            <button onClick={handleLogout}>Logout</button>
            <pre>{JSON.stringify(data, null, 2)}</pre>
        </div>
    );
}