export default function AuthLayout({ title, subtitle, children }) {
    return (
        <div className="bg-surface min-h-screen flex flex-col">

            {/* ================= HEADER ================= */}
            <header className="bg-white border-b shadow-sm">
                <div className="flex justify-center items-center px-6 py-4 max-w-[1440px] mx-auto">
                    <div className="text-xl font-bold text-black">
                        BizManager
                    </div>
                </div>
            </header>

            {/* CONTENT */}
            <main className="flex-grow flex items-center justify-center p-6">
                <div className="w-full max-w-[440px] bg-white rounded-xl shadow-md border p-6 flex flex-col gap-6">

                    {/* TITLE */}
                    <div className="text-center">
                        <h1 className="text-xl font-semibold text-black">{title}</h1>
                        {subtitle && (
                            <p className="text-gray-500 text-sm mt-1">
                                {subtitle}
                            </p>
                        )}
                    </div>

                    {children}
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