import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import ComboForm from '../components/ComboForm';
import { PencilSquareIcon, TrashIcon } from '@heroicons/react/24/outline';

export default function ComboPage() {
    const { locationId } = useParams();
    const [combos, setCombos] = useState([]);

    const token = localStorage.getItem('jwt');
    const navigate = useNavigate();

    const fetchCombos = async () => {
        const res = await fetch(
            `http://localhost:3000/api/combos/${locationId}`,
            {
                headers: { Authorization: `Bearer ${token}` },
            }
        );

        const data = await res.json();
        setCombos(Array.isArray(data) ? data : []);
    };

    useEffect(() => {
        fetchCombos();
    }, []);

    const createCombo = async (formData) => {
        const res = await fetch(
            'http://localhost:3000/api/combos/create',
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
            alert('Failed to create combo');
            return;
        }

        fetchCombos();
    };

    const handleDelete = async (comboId) => {
        if (!window.confirm('Delete this combo?')) return;

        const res = await fetch(
            `http://localhost:3000/api/combos/delete/${comboId}`,
            {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );

        if (!res.ok) {
            alert('Failed to delete combo');
            return;
        }

        fetchCombos();
    };

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
                            navigate(`/owner/location/${locationId}`)
                        }
                        className="px-4 py-2 border rounded-lg hover:bg-gray-100"
                    >
                        Back
                    </button>
                </div>

                {/* FORM */}
                <ComboForm
                    locationId={locationId}
                    onSubmit={createCombo}
                />

                {/* EXISTING COMBOS */}
                <div className="bg-white border border-slate-200 rounded-xl shadow-md p-6 flex flex-col gap-3">
                    <h3 className="text-lg font-semibold">
                        Existing Combos
                    </h3>

                    {combos.length === 0 ? (
                        <p className="text-sm text-gray-500">
                            No combos created yet.
                        </p>
                    ) : (
                        combos.map((combo) => (
                            <div
                                key={combo.id}
                                className="border border-slate-200 rounded-lg p-4 flex justify-between items-center"
                            >
                                <div>
                                    <p className="font-medium">{combo.name}</p>
                                    <p className="text-sm text-gray-500">
                                        ${combo.price}
                                    </p>
                                </div>

                                <div className="flex items-center gap-3">
                                    {/* EDIT */}
                                    <button
                                        onClick={() =>
                                            navigate(`/owner/combos/edit/${combo.id}`)
                                        }
                                        className="p-2 border border-slate-300 rounded-lg hover:bg-slate-100 transition"
                                    >
                                        <PencilSquareIcon className="w-5 h-5 text-slate-600" />
                                    </button>

                                    {/* DELETE */}
                                    <button
                                        onClick={() => handleDelete(combo.id)}
                                        className="p-2 border border-slate-300 rounded-lg hover:bg-red-100 transition"
                                    >
                                        <TrashIcon className="w-5 h-5 text-red-500" />
                                    </button>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
}