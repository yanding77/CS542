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

    if (!data) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <p className="text-gray-500">Loading dashboard...</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-neutral-800 flex flex-col">

            {/* ================= HEADER ================= */}
            <header className="bg-white border-b shadow-sm">
                <div className="flex justify-between items-center px-6 py-4 max-w-[1440px] mx-auto">
                    <div className="text-xl font-bold text-black">
                        BizManager
                    </div>

                    <button
                        onClick={handleLogout}
                        className="px-4 py-2 rounded-lg bg-black text-white hover:bg-gray-800 transition"
                    >
                        Logout
                    </button>
                </div>
            </header>

            {/* ================= MAIN ================= */}
            <main className="flex-grow p-6">
                <div className="max-w-[1000px] mx-auto flex flex-col gap-6">

                    {/* Welcome Card */}
                    <div className="bg-white p-6 rounded-xl shadow border">
                        <h2 className="text-2xl font-semibold mb-2">
                            Welcome
                        </h2>
                        <p className="text-gray-500">
                            Manage your locations and view dashboards.
                        </p>
                    </div>

                    {/* Locations Section */}
                    <div className="bg-white p-6 rounded-xl shadow border flex flex-col gap-4">

                        <div className="flex justify-between items-center">
                            <h3 className="text-lg font-semibold">
                                Your Locations
                            </h3>

                            <button
                                onClick={createLocation}
                                className="bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition"
                            >
                                + New Location
                            </button>
                        </div>

                        {data.locations && data.locations.length > 0 ? (
                            <div className="grid gap-3">

                                {data.locations.map((loc) => (
                                    <button
                                        key={loc.id}
                                        onClick={() => goToLocation(loc.id)}
                                        className="w-full text-left p-4 border rounded-lg hover:bg-gray-50 transition flex justify-between items-center group"
                                    >
                                        <div>
                                            <p className="font-medium">
                                                {loc.username}
                                            </p>
                                            <p className="text-sm text-gray-500">
                                                {loc.address}
                                            </p>
                                        </div>

                                        <span className="material-symbols-outlined text-gray-400 group-hover:translate-x-1 transition">
                                            chevron_right
                                        </span>
                                    </button>
                                ))}

                            </div>
                        ) : (
                            <p className="text-gray-500">
                                No locations yet.
                            </p>
                        )}
                    </div>
                </div>
            </main>

            {/* ================= FOOTER ================= */}
            <footer className="bg-white border-t">
                <div className="max-w-[1440px] mx-auto px-6 py-4 text-sm text-gray-500 text-center">
                    © 2026 BizManager
                </div>
            </footer>
        </div>
    );
}