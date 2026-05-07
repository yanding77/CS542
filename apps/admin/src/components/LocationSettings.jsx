import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

export default function LocationSettings() {
    const { locationId } = useParams();
    const navigate = useNavigate();
    const token = localStorage.getItem('jwt');

    const [formData, setFormData] = useState({
        username: '',
        address: '',
    });

    const [originalData, setOriginalData] = useState(null);
    const [newPassword, setNewPassword] = useState('');
    const [loading, setLoading] = useState(true);

    // FETCH LOCATION
    useEffect(() => {
        const fetchLocation = async () => {
            try {
                const res = await fetch(
                    `http://localhost:3000/api/locations/get/${locationId}`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );

                const data = await res.json();

                const cleaned = {
                    username: data?.username ?? '',
                    address: data?.address ?? '',
                };

                setFormData(cleaned);
                setOriginalData(cleaned);
            } catch (err) {
                console.error('Failed to fetch location', err);
            } finally {
                setLoading(false);
            }
        };

        fetchLocation();
    }, [locationId, token]);

    const isChanged =
        JSON.stringify(formData) !== JSON.stringify(originalData);

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    // UPDATE LOCATION
    const handleUpdate = async () => {
        const res = await fetch(
            `http://localhost:3000/api/locations/update/${locationId}`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(formData),
            }
        );

        if (!res.ok) {
            alert('Failed to update location');
            return;
        }

        setOriginalData(formData);
    };

    // UPDATE PASSWORD
    const handlePasswordUpdate = async () => {
        if (!newPassword.trim()) return;

        const res = await fetch(
            `http://localhost:3000/api/locations/updatePassword/${locationId}`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ newPassword }),
            }
        );

        if (!res.ok) {
            alert('Failed to update password');
            return;
        }

        setNewPassword('');
        alert('Password updated');
    };

    // DELETE
    const handleDelete = async () => {
        const confirmDelete = window.confirm(
            'Are you sure you want to delete this location? This cannot be undone.'
        );

        if (!confirmDelete) return;

        const res = await fetch(
            `http://localhost:3000/api/locations/delete/${locationId}`,
            {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );

        if (!res.ok) {
            alert('Failed to delete location');
            return;
        }

        navigate('/owner/dashboard');
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center text-white">
                Loading...
            </div>
        );
    }

    const handleLogout = () => {
        localStorage.removeItem('jwt');
        navigate('/');
    };

    return (
        <div className="min-h-screen bg-neutral-800 flex flex-col">

            {/* ================= HEADER (MATCH DASHBOARD) ================= */}
            <header className="bg-white border-b shadow-sm">
                <div className="flex justify-between items-center px-6 py-4 max-w-[1440px] mx-auto">
                    <div className="text-xl font-bold text-black">
                        Location Manager
                    </div>

                    <div className="flex gap-3">
                        <button
                            onClick={() => navigate(-1)}
                            className="px-4 py-2 rounded-lg border hover:bg-gray-100 transition"
                        >
                            Back
                        </button>

                        <button
                            onClick={handleLogout}
                            className="px-4 py-2 rounded-lg bg-black text-white hover:bg-gray-800 transition"
                        >
                            Logout
                        </button>
                    </div>
                </div>
            </header>

            {/* ================= MAIN ================= */}
            <main className="flex-grow p-6">
                <div className="max-w-[1000px] mx-auto flex flex-col gap-6">

                    {/* TITLE CARD */}
                    <div className="bg-white p-6 rounded-xl shadow border">
                        <h2 className="text-2xl font-semibold mb-2">
                            Location Settings
                        </h2>
                        <p className="text-gray-500">
                            Manage your location credentials and details
                        </p>
                    </div>

                    {/* SETTINGS CARD */}
                    <div className="bg-white p-6 rounded-xl shadow border flex flex-col gap-4">

                        {/* FORM */}
                        <input
                            name="username"
                            placeholder="Username"
                            value={formData.username}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border rounded-lg"
                        />

                        <input
                            name="address"
                            placeholder="Address"
                            value={formData.address}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border rounded-lg"
                        />

                        {isChanged && (
                            <button
                                onClick={handleUpdate}
                                className="bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition"
                            >
                                Update Location
                            </button>
                        )}

                        {/* PASSWORD */}
                        <div className="border-t pt-4 flex flex-col gap-3">
                            <h3 className="font-semibold">
                                Change Password
                            </h3>

                            <input
                                type="password"
                                placeholder="New Password"
                                value={newPassword}
                                onChange={(e) =>
                                    setNewPassword(e.target.value)
                                }
                                className="w-full px-4 py-2 border rounded-lg"
                            />

                            {newPassword.trim() !== '' && (
                                <button
                                    onClick={handlePasswordUpdate}
                                    className="bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition"
                                >
                                    Update Password
                                </button>
                            )}
                        </div>

                        {/* DELETE */}
                        <div className="border-t pt-4">
                            <button
                                onClick={handleDelete}
                                className="w-full bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition"
                            >
                                Delete Location
                            </button>
                        </div>
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