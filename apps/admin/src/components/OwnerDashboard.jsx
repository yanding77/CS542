import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function OwnerDashboard() {
    const [data, setData] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchDashboard = async () => {
            const token = localStorage.getItem('jwt');

            const res = await fetch('http://localhost:3000/api/owners/dashboard', {
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
        localStorage.removeItem('jwt');
        navigate('/');
    };

    const goToLocation = (locationId) => {
        navigate(`/owner/location/${locationId}`);
    };

    const createLocation = () => {
        navigate(`/owner/create-location`);
    };

    if (!data) return <div>Loading...</div>;

    return (
        <div style={{ padding: '20px' }}>
            {/* Welcome Message */}
            <h2>Welcome, {data.owner?.email}</h2>

            {/* Logout */}
            <button onClick={handleLogout}>Logout</button>

            <hr />

            {/* Locations List */}
            <h3>Your Locations</h3>

            {data.locations && data.locations.length > 0 ? (
                data.locations.map((loc) => (
                    <div key={loc.id} style={{ marginBottom: '10px' }}>
                        <button onClick={() => goToLocation(loc.id)}>
                            {loc.username + ' at ' + loc.address}
                        </button>
                    </div>
                ))
            ) : (
                <p>No locations yet.</p>
            )}

            <hr />

            {/* Create New Location */}
            <button onClick={createLocation}>
                + Create New Location
            </button>
        </div>
    );
}