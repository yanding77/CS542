import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import MenuForm from '../components/MenuForm';

export default function MenusPage() {
    const { locationId } = useParams();
    const [menus, setMenus] = useState([]);

    const token = localStorage.getItem('jwt');
    const navigate = useNavigate();

    const fetchMenus = async () => {
        const res = await fetch(
            `http://localhost:3000/api/menus/${locationId}`,
            {
                headers: { Authorization: `Bearer ${token}` },
            }
        );

        const data = await res.json();
        setMenus(Array.isArray(data) ? data : []);
    };

    useEffect(() => {
        fetchMenus();
    }, [locationId]);

    const createMenu = async (formData) => {
        const res = await fetch(
            'http://localhost:3000/api/menus/create',
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
            alert('Failed to create menu');
            return;
        }

        fetchMenus();
    };

    return (
        <div className="min-h-screen bg-neutral-800 flex items-center justify-center p-6">
            <div className="w-full max-w-[900px] flex flex-col gap-6">

                {/* HEADER CARD */}
                <div className="bg-white border border-slate-200 rounded-xl shadow-md p-6 flex justify-between items-center">
                    <div>
                        <h2 className="text-xl font-semibold">Menus</h2>
                        <p className="text-sm text-slate-500">
                            Manage menus for this location
                        </p>
                    </div>

                    <button
                        onClick={() => navigate(`/owner/location/${locationId}`)}
                        className="px-4 py-2 border rounded-lg hover:bg-slate-100 transition"
                    >
                        Back
                    </button>
                </div>

                {/* FORM */}
                <MenuForm locationId={locationId} onSubmit={createMenu} />

                {/* EXISTING MENUS */}
                <div className="bg-white border border-slate-200 rounded-xl shadow-md p-6 flex flex-col gap-3">
                    <h3 className="text-lg font-semibold">
                        Existing Menus
                    </h3>

                    {menus.map((menu) => (
                        <div
                            key={menu.id}
                            className="bg-white border border-slate-200 rounded-lg p-4 flex justify-between items-center"
                        >
                            <div className="font-medium">{menu.name}</div>
                            <div className="text-sm text-slate-500">
                                {menu.menuItems?.length || 0} items •{" "}
                                {menu.menuCombos?.length || 0} combos
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}