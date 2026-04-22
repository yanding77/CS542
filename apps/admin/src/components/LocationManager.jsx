import { useParams, useNavigate } from 'react-router-dom';

export default function LocationManager() {
    const { locationId } = useParams();
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('jwt');
        navigate('/');
    };

    return (
        <div className="min-h-screen bg-neutral-800 flex flex-col">

            {/* ================= HEADER ================= */}
            <header className="bg-white border-b shadow-sm">
                <div className="max-w-[1440px] mx-auto px-6 py-4 flex justify-between items-center">
                    <div className="text-xl font-bold">Location Manager</div>

                    <div className="flex gap-3">
                        <button
                            onClick={() => navigate('/owner/dashboard')}
                            className="px-4 py-2 rounded-lg border hover:bg-gray-100 transition"
                        >
                            Back to Owner Dashboard
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

            {/* ================= MAIN CONTENT WRAPPER ================= */}
            <main className="flex-1 flex items-center justify-center p-6">

                {/* DASHBOARD CARD */}
                <div className="w-full max-w-[720px] bg-white rounded-xl shadow-md border border-slate-200 p-8 flex flex-col gap-8">

                    {/* Title */}
                    <div className="text-center flex flex-col gap-2">
                        <h2 className="text-2xl font-semibold">
                            Location Management
                        </h2>
                        <p className="text-sm text-gray-500">
                            Manage items, menus, combos, deals, and settings for this location.
                        </p>
                    </div>

                    {/* ================= PRIMARY ACTION ================= */}
                    <button
                        onClick={() => navigate(`/location/dashboard/${locationId}`)}
                        className="w-full py-4 px-6 bg-black hover:bg-gray-800 text-white rounded-lg flex items-center justify-between transition active:scale-[0.98]"
                    >
                        <span className="font-medium">View Location Dashboard</span>
                        <span className="material-symbols-outlined">chevron_right</span>
                    </button>

                    <div className="border-t border-slate-200" />

                    {/* ================= MANAGEMENT SECTION ================= */}
                    <div className="flex flex-col gap-4">

                        <h3 className="text-lg font-semibold">
                            Management
                        </h3>

                        <div className="grid gap-3">

                            <button
                                onClick={() => navigate(`/owner/location/${locationId}/items`)}
                                className="w-full px-5 py-4 border border-slate-200 rounded-lg hover:bg-slate-50 flex justify-between items-center transition"
                            >
                                <span>Manage Items</span>
                                <span className="material-symbols-outlined text-gray-500">inventory_2</span>
                            </button>

                            <button
                                onClick={() => navigate(`/owner/location/${locationId}/combos`)}
                                className="w-full px-5 py-4 border border-slate-200 rounded-lg hover:bg-slate-50 flex justify-between items-center transition"
                            >
                                <span>Manage Combos</span>
                                <span className="material-symbols-outlined text-gray-500">restaurant_menu</span>
                            </button>

                            <button
                                onClick={() => navigate(`/owner/location/${locationId}/deals`)}
                                className="w-full px-5 py-4 border border-slate-200 rounded-lg hover:bg-slate-50 flex justify-between items-center transition"
                            >
                                <span>Manage Deals</span>
                                <span className="material-symbols-outlined text-gray-500">local_offer</span>
                            </button>

                            <button
                                onClick={() => navigate(`/owner/location/${locationId}/menus`)}
                                className="w-full px-5 py-4 border border-slate-200 rounded-lg hover:bg-slate-50 flex justify-between items-center transition"
                            >
                                <span>Manage Menus</span>
                                <span className="material-symbols-outlined text-gray-500">menu_book</span>
                            </button>

                        </div>
                    </div>

                    <div className="border-t border-slate-200" />

                    {/* ================= SETTINGS ================= */}
                    <div className="flex flex-col gap-4">

                        <h3 className="text-lg font-semibold">
                            Settings
                        </h3>

                        <button
                            onClick={() =>
                                navigate(`/owner/location/${locationId}/settings`)
                            }
                            className="w-full px-5 py-4 border border-slate-200 rounded-lg hover:bg-slate-50 flex justify-between items-center transition"
                        >
                            <span>Manage Location Settings</span>
                            <span className="material-symbols-outlined text-gray-500">
                        settings
                    </span>
                        </button>

                    </div>

                </div>
            </main>
        </div>
    );
}