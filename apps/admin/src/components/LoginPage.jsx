import { useNavigate } from 'react-router-dom';

export default function LoginPage() {
    const navigate = useNavigate();

    return (
        <div className="bg-surface min-h-screen flex flex-col bg-neutral-800">

            {/* ================= HEADER ================= */}
            <header className="bg-white border-b shadow-sm">
                <div className="flex justify-center items-center px-6 py-4 max-w-[1440px] mx-auto">
                    <div className="text-xl font-bold text-black">
                        BizManager
                    </div>
                </div>
            </header>

            {/* ================= MAIN ================= */}
            <main className="flex-grow flex items-center justify-center p-6 bg-surface-container-low">

                <div className="w-full max-w-[440px] bg-white rounded-xl shadow-md border p-8 flex flex-col gap-6">

                    {/* Branding */}
                    <div className="flex flex-col items-center text-center gap-3">

                        <h1 className="text-2xl font-semibold text-black">
                            Welcome to BizManager
                        </h1>

                        <p className="text-gray-500 max-w-[320px]">
                            Select an option to continue to your business dashboard.
                        </p>
                    </div>

                    {/* Actions */}
                    <div className="flex flex-col gap-3">

                        {/* Owner */}
                        <button
                            onClick={() => navigate('/login/owner')}
                            className="w-full py-3 px-4 bg-black hover:bg-gray-800 text-white rounded-lg flex items-center justify-between transition group active:scale-[0.98]"
                        >
                            <div className="flex items-center gap-3">
                                <span className="material-symbols-outlined">
                                    admin_panel_settings
                                </span>
                                <span>Sign in as Owner</span>
                            </div>

                            <span className="material-symbols-outlined group-hover:translate-x-1 transition">
                                chevron_right
                            </span>
                        </button>

                        {/* Location */}
                        <button
                            onClick={() => navigate('/login/location')}
                            className="w-full py-3 px-4 bg-white border hover:bg-gray-50 text-gray-700 rounded-lg flex items-center justify-between transition group active:scale-[0.98]"
                        >
                            <div className="flex items-center gap-3">
                                <span className="material-symbols-outlined">
                                    location_on
                                </span>
                                <span>Sign in as Location</span>
                            </div>

                            <span className="material-symbols-outlined group-hover:translate-x-1 transition">
                                chevron_right
                            </span>
                        </button>
                    </div>

                    {/* Divider */}
                    <div className="flex items-center">
                        <div className="flex-grow border-t"></div>
                        <span className="mx-3 text-xs text-gray-400 uppercase">
                            New to BizManager?
                        </span>
                        <div className="flex-grow border-t"></div>
                    </div>

                    {/* Register */}
                    <div className="text-center">
                        <button
                            onClick={() => navigate('/register')}
                            className="w-full py-3 px-4 bg-white border hover:bg-gray-50 text-gray-500 rounded-lg flex items-center justify-center transition group active:scale-[0.98]"
                        >
                            Create New Owner Account
                        </button>
                    </div>
                </div>
            </main>

            {/* ================= FOOTER ================= */}
            <footer className="bg-gray-50 border-t">
                <div className="flex flex-col md:flex-row justify-center items-center px-8 py-6 text-xs text-gray-500 max-w-[1440px] mx-auto gap-4">
                    <div className="font-semibold text-gray-700">
                        BizManager
                    </div>

                    <div>© 2026 BizManager. All rights reserved.</div>
                </div>
            </footer>
        </div>
    );
}