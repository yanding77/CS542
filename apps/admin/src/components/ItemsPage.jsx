import { useState, useEffect } from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import ItemForm from '../components/ItemForm';

export default function ItemsPage() {
    const { locationId } = useParams();
    const [items, setItems] = useState([]);

    const token = localStorage.getItem('jwt');
    const navigate = useNavigate();

    const fetchItems = async () => {
        const res = await fetch(`http://localhost:3000/api/items/${locationId}`, {
            headers: { Authorization: `Bearer ${token}` },
        });

        const data = await res.json();
        setItems(data);
    };

    useEffect(() => {
        fetchItems();
    }, []);

    const createItem = async (formData, resetForm) => {
        const token = localStorage.getItem('jwt');

        const res = await fetch('http://localhost:3000/api/items/create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
                ...formData,
                price: parseFloat(formData.price),
                prepTime: formData.prepTime
                    ? parseInt(formData.prepTime)
                    : null,
                locationId,
            }),
        });

        if (!res.ok) {
            alert('Failed to create item');
            return;
        }

        resetForm();
        fetchItems();
    };

    return (
        <div className="min-h-screen bg-neutral-800 flex items-center justify-center p-6">
            <div className="w-full max-w-[900px] flex flex-col gap-6">

                {/* HEADER CARD */}
                <div className="bg-white border border-slate-200 rounded-xl shadow-md p-6 flex justify-between items-center">
                    <div>
                        <h2 className="text-xl font-semibold">Items</h2>
                        <p className="text-sm text-gray-500">
                            Manage items for this location
                        </p>
                    </div>

                    <button
                        onClick={() =>
                            navigate(`/owner/location/${locationId}`)
                        }
                        className="px-4 py-2 border rounded-lg hover:bg-gray-100"
                    >
                        Back
                    </button>
                </div>

                {/* FORM */}
                <ItemForm onSubmit={createItem} />

                {/* EXISTING ITEMS */}
                <div className="bg-white border border-slate-200 rounded-xl shadow-md p-6 flex flex-col gap-3">
                    <h3 className="text-lg font-semibold">
                        Existing Items
                    </h3>

                    <div className="flex flex-col gap-3">
                        {items.map((item) => (
                            <div
                                key={item.id}
                                className="bg-white border border-slate-200 rounded-lg p-4 flex justify-between items-center"
                            >
                                <div>
                                    <div className="font-semibold">{item.name}</div>
                                    <div className="text-sm text-slate-500">
                                        ${item.price}
                                    </div>
                                </div>

                                <div className="text-xs text-slate-400 capitalize">
                                    {item.category}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}