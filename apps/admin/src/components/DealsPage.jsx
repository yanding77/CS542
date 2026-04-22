import { useEffect, useState } from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import DealForm from './DealForm';

export default function DealsPage() {
    const { locationId } = useParams();
    const [deals, setDeals] = useState([]);
    const navigate = useNavigate();
    const token = localStorage.getItem('jwt');

    const fetchDeals = async () => {
        const res = await fetch(`http://localhost:3000/api/deals/${locationId}`, {
            headers: { Authorization: `Bearer ${token}` },
        });

        const data = await res.json();
        setDeals(Array.isArray(data) ? data : []);
    };

    useEffect(() => {
        fetchDeals();
    }, [locationId]);

    const createDeal = async (formData, resetForm) => {
        const res = await fetch('http://localhost:3000/api/deals/create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(formData),
        });

        if (!res.ok) {
            alert('Failed to create deal');
            return;
        }

        resetForm();
        fetchDeals();
    };

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
                            navigate(`/owner/location/${locationId}`)
                        }
                        className="px-4 py-2 border rounded-lg hover:bg-gray-100"
                    >
                        Back
                    </button>
                </div>

                {/* FORM */}
                <DealForm onSubmit={createDeal} locationId={locationId} />

                {/* EXISTING DEALS */}
                <div className="bg-white border border-slate-200 rounded-xl shadow-md p-6 flex flex-col gap-3">
                    <h3 className="text-lg font-semibold">
                        Existing Deals
                    </h3>

                    <div className="flex flex-col gap-3">
                        {deals.map((deal) => (
                            <div
                                key={deal.id}
                                className="bg-white border border-slate-200 rounded-lg p-4 flex justify-between items-center"
                            >
                                <div>
                                    <div className="font-semibold">{deal.name}</div>
                                    <div className="text-sm text-slate-500">
                                        ${deal.price}
                                    </div>
                                </div>

                                <div className="text-xs text-slate-400">
                                    {deal.startDate} → {deal.endDate}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}