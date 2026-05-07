import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import ItemForm from '../components/ItemForm';

export default function EditItemPage() {
    const { itemId } = useParams();
    const navigate = useNavigate();
    const token = localStorage.getItem('jwt');

    const [initialData, setInitialData] = useState(null);

    useEffect(() => {
        const fetchItem = async () => {
            const res = await fetch(`http://localhost:3000/api/items/get/${itemId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            const data = await res.json();
            setInitialData(data);
        };

        fetchItem();
    }, [itemId]);

    const updateItem = async (formData) => {
        const res = await fetch(`http://localhost:3000/api/items/update/${itemId}`, {
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
            }),
        });

        if (!res.ok) {
            alert('Failed to update item');
            return;
        }

        navigate(-1); // go back to items page
    };

    if (!initialData) return <div>Loading...</div>;

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
                            navigate(-1)
                        }
                        className="px-4 py-2 border rounded-lg hover:bg-gray-100"
                    >
                        Back
                    </button>
                </div>

                <ItemForm
                    onSubmit={updateItem}
                    initialData={initialData}
                    isEdit
                />
            </div>
        </div>
    );
}