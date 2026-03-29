import { useEffect, useState } from 'react';

export default function LocationDashboard() {
    const [data, setData] = useState(null);

    useEffect(() => {
        const fetchDashboard = async () => {
            const token = localStorage.getItem('jwt');

            const res = await fetch('http://localhost:3000/locations/dashboard', {
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

    return (
        <div>
            <h2>Location Dashboard</h2>
            <pre>{JSON.stringify(data, null, 2)}</pre>
        </div>
    );
}