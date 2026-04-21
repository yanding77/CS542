import { useEffect, useState, useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const CATEGORY_ORDER = [
    'alcohol',
    'appetizer',
    'entree',
    'drink',
    'dessert',
    'side',
];

export default function LocationDashboard() {
    const { locationId } = useParams();
    const [data, setData] = useState(null);

    const [openMenus, setOpenMenus] = useState({});
    const [openCategories, setOpenCategories] = useState({});
    const [combosOpen, setCombosOpen] = useState(true);

    const token = localStorage.getItem('jwt');
    const role = localStorage.getItem('role');
    const navigate = useNavigate();

    const fetchDashboard = async () => {
        const res = await fetch(
            `http://localhost:3000/api/locations/dashboard/${locationId}`,
            {
                headers: { Authorization: `Bearer ${token}` },
            }
        );

        const json = await res.json();
        setData(json);
    };

    useEffect(() => {
        fetchDashboard();
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('jwt');
        navigate('/');
    };

    const handleBackToOwner = () => {
        navigate(`/owner/location/${locationId}`);
    };

    const groupedItems = useMemo(() => {
        if (!data?.items) return {};

        const groups = {};
        for (const item of data.items) {
            const cat = item.category || 'uncategorized';
            if (!groups[cat]) groups[cat] = [];
            groups[cat].push(item);
        }
        return groups;
    }, [data]);

    const toggleMenu = (id) => {
        setOpenMenus((prev) => ({ ...prev, [id]: !prev[id] }));
    };

    const toggleCategory = (cat) => {
        setOpenCategories((prev) => ({ ...prev, [cat]: !prev[cat] }));
    };

    const toggleCombosSection = () => {
        setCombosOpen((prev) => !prev);
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
                <div className="max-w-[1440px] mx-auto px-6 py-4 flex justify-between items-center">
                    <div className="text-xl font-bold">Location Dashboard</div>

                    <div className="flex gap-3">
                        {role === 'owner' && (
                            <button
                                onClick={handleBackToOwner}
                                className="px-4 py-2 rounded-lg border hover:bg-gray-100 transition"
                            >
                                Back to Location Management
                            </button>
                        )}

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
                <div className="max-w-[1100px] mx-auto flex flex-col gap-6">

                    {/* ================= MENUS ================= */}
                    <section className="bg-white p-6 rounded-xl border shadow-sm">
                        <h2 className="text-lg font-semibold mb-4">Menus</h2>

                        <div className="flex flex-col gap-3">
                            {data.menus.map((menu) => {
                                const isOpen = openMenus[menu.id] ?? false;

                                return (
                                    <div key={menu.id} className="border rounded-lg overflow-hidden">

                                        <button
                                            onClick={() => toggleMenu(menu.id)}
                                            className="w-full flex justify-between items-center px-4 py-3 bg-gray-50 hover:bg-gray-100 transition"
                                        >
                                            <span className="font-medium">
                                                {menu.name || 'Unnamed Menu'}
                                            </span>
                                            <span>{isOpen ? '▲' : '▼'}</span>
                                        </button>

                                        {isOpen && (
                                            <div className="p-4 flex flex-col gap-4">

                                                {/* Items */}
                                                {menu.menuItems?.length > 0 && (
                                                    <div>
                                                        <h4 className="font-semibold mb-2">Items</h4>
                                                        <div className="flex flex-col gap-1 text-sm text-gray-700">
                                                            {menu.menuItems.map((mi) => (
                                                                <div key={mi.id}>
                                                                    {mi.item?.name}
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </div>
                                                )}

                                                {/* Combos */}
                                                {menu.menuCombos?.length > 0 && (
                                                    <div>
                                                        <h4 className="font-semibold mb-2">Combos</h4>
                                                        <div className="flex flex-col gap-1 text-sm text-gray-700">
                                                            {menu.menuCombos.map((mc) => (
                                                                <div key={mc.id}>
                                                                    {mc.combo?.name}
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </div>
                                                )}

                                            </div>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    </section>

                    {/* ================= ITEMS ================= */}
                    <section className="bg-white p-6 rounded-xl border shadow-sm">
                        <h2 className="text-lg font-semibold mb-4">Items</h2>

                        <div className="flex flex-col gap-3">
                            {CATEGORY_ORDER.map((cat) => {
                                const items = groupedItems[cat] || [];
                                const isOpen = openCategories[cat] ?? false;

                                return (
                                    <div key={cat} className="border rounded-lg overflow-hidden">

                                        <button
                                            onClick={() => toggleCategory(cat)}
                                            className="w-full flex justify-between items-center px-4 py-3 bg-gray-50 hover:bg-gray-100 transition"
                                        >
                                            <span className="font-medium uppercase">
                                                {cat}
                                            </span>
                                            <span>{isOpen ? '▲' : '▼'}</span>
                                        </button>

                                        {isOpen && (
                                            <table className="w-full text-sm">
                                                <thead className="text-left bg-gray-100">
                                                <tr>
                                                    <th className="p-2">Name</th>
                                                    <th className="p-2">Price</th>
                                                </tr>
                                                </thead>

                                                <tbody>
                                                {items.map((item) => (
                                                    <tr key={item.id} className="border-t">
                                                        <td className="p-2">{item.name}</td>
                                                        <td className="p-2">${item.price}</td>
                                                    </tr>
                                                ))}
                                                </tbody>
                                            </table>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    </section>

                    {/* ================= COMBOS ================= */}
                    <section className="bg-white p-6 rounded-xl border shadow-sm">
                        <button
                            onClick={toggleCombosSection}
                            className="w-full flex justify-between items-center mb-4"
                        >
                            <h2 className="text-lg font-semibold">Combos</h2>
                            <span>{combosOpen ? '▲' : '▼'}</span>
                        </button>

                        {combosOpen && (
                            <div className="flex flex-col gap-3">
                                {data.combos.map((combo) => (
                                    <div
                                        key={combo.id}
                                        className="border rounded-lg p-4"
                                    >
                                        <div className="font-semibold">
                                            {combo.name} - ${combo.price}
                                        </div>

                                        {combo.comboItems?.length > 0 && (
                                            <ul className="mt-2 text-sm text-gray-700 list-disc ml-5">
                                                {combo.comboItems.map((ci) => (
                                                    <li key={ci.id}>
                                                        {ci.item?.name}
                                                    </li>
                                                ))}
                                            </ul>
                                        )}
                                    </div>
                                ))}
                            </div>
                        )}
                    </section>

                    {/* ================= ORDERS ================= */}
                    <section className="bg-white p-6 rounded-xl border shadow-sm">
                        <h2 className="text-lg font-semibold mb-3">In Progress Orders</h2>

                        <div className="flex flex-col gap-2">
                            {data.orders.inProgress.map((order) => (
                                <div key={order.id} className="flex justify-between border p-3 rounded-lg">
                                    <span>{order.id}</span>
                                    <button className="text-sm text-green-600 hover:underline">
                                        Mark Completed
                                    </button>
                                </div>
                            ))}
                        </div>
                    </section>

                    <section className="bg-white p-6 rounded-xl border shadow-sm">
                        <h2 className="text-lg font-semibold mb-3">Completed Orders</h2>

                        <div className="flex flex-col gap-2 text-gray-600">
                            {data.orders.completed.map((order) => (
                                <div key={order.id} className="border p-3 rounded-lg">
                                    {order.id}
                                </div>
                            ))}
                        </div>
                    </section>

                </div>
            </main>
        </div>
    );
}