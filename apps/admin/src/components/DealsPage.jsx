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
        <div>
            <h2>Deals</h2>

            <DealForm onSubmit={createDeal} locationId={locationId} />

            <h3>Existing Deals</h3>

            {deals.map((deal) => (
                <div key={deal.id}>
                    <strong>{deal.name}</strong> - ${deal.price}
                </div>
            ))}

            <button onClick={() => navigate(`/owner/location/${locationId}`)}>Back</button>
        </div>
    );
}