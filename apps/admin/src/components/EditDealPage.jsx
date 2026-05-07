import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import DealForm from '../components/DealForm';

export default function EditDealPage() {
    const { dealId } = useParams();
    const navigate = useNavigate();
    const token = localStorage.getItem('jwt');

    const [deal, setDeal] = useState(null);

    useEffect(() => {
        const fetchDeal = async () => {
            const res = await fetch(
                `http://localhost:3000/api/deals/get/${dealId}`,
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );

            const data = await res.json();
            setDeal(data);
        };

        fetchDeal();
    }, [dealId]);

    const updateDeal = async (payload) => {
        const res = await fetch(
            `http://localhost:3000/api/deals/update/${dealId}`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(payload),
            }
        );

        if (!res.ok) {
            alert('Failed to update deal');
            return;
        }

        navigate(-1);
    };

    if (!deal) return <div className="text-white p-6">Loading...</div>;

    return (
        <div className="min-h-screen bg-neutral-800 flex items-center justify-center p-6">
            <div className="w-full max-w-[900px] flex flex-col gap-6">
                {/* HEADER CARD */}
                <div className="bg-white border border-slate-200 rounded-xl shadow-md p-6 flex justify-between items-center">
                    <div>
                        <h2 className="text-xl font-semibold">Deals</h2>
                        <p className="text-sm text-gray-500">
                            Manage deals for this location
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

                <DealForm
                    onSubmit={updateDeal}
                    locationId={deal?.location?.id}
                    initialData={deal}
                    isEdit={true}
                />
            </div>
        </div>
    );
}