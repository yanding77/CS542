import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import ComboForm from '../components/ComboForm';

export default function EditComboPage() {
    const { comboId } = useParams();
    const navigate = useNavigate();
    const token = localStorage.getItem('jwt');

    const [initialData, setInitialData] = useState(null);

    useEffect(() => {
        const fetchCombo = async () => {
            const res = await fetch(
                `http://localhost:3000/api/combos/get/${comboId}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            const data = await res.json();
            setInitialData(data);
            console.log("COMBO", initialData);
        };

        fetchCombo();
    }, [comboId]);

    const updateCombo = async (formData) => {
        const res = await fetch(
            `http://localhost:3000/api/combos/delete/${comboId}`,
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
            alert('Failed to update combo');
            return;
        }

        navigate(-1);
    };

    if (!initialData) return <div>Loading...</div>;

    if (!initialData?.location?.id) {
        return <div>Loading location...</div>;
    }

    return (
        <div className="min-h-screen bg-neutral-800 flex items-center justify-center p-6">
            <div className="w-full max-w-[900px] flex flex-col gap-6">
                {/* HEADER CARD */}
                <div className="bg-white border border-slate-200 rounded-xl shadow-md p-6 flex justify-between items-center">
                    <div>
                        <h2 className="text-xl font-semibold">Combos</h2>
                        <p className="text-sm text-gray-500">
                            Manage combo deals for this location
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

                <ComboForm
                    locationId={initialData?.location?.id}
                    onSubmit={updateCombo}
                    initialData={initialData}
                    isEdit
                />
            </div>
        </div>
    );
}