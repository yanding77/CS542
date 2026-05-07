import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import MenuForm from '../components/MenuForm';

export default function EditMenuPage() {
    const { menuId } = useParams();
    const [menu, setMenu] = useState(null);
    const token = localStorage.getItem('jwt');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchMenu = async () => {
            const res = await fetch(
                `http://localhost:3000/api/menus/get/${menuId}`,
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );

            const data = await res.json();
            setMenu(data);
        };

        fetchMenu();
    }, [menuId]);

    const updateMenu = async (formData) => {
        const res = await fetch(
            `http://localhost:3000/api/menus/update/${menuId}`,
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
            alert('Failed to update menu');
            return;
        }

        navigate(-1);
    };

    if (!menu) return <div>Loading...</div>;

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
                        onClick={() =>
                            navigate(-1)
                        }
                        className="px-4 py-2 border rounded-lg hover:bg-gray-100"
                    >
                        Back
                    </button>
                </div>

                <MenuForm
                    locationId={menu.location?.id}
                    initialData={menu}
                    onSubmit={updateMenu}
                    isEdit={true}
                />
            </div>
        </div>
    );
}