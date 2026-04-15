import { useEffect, useState } from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import ComboForm from '../components/ComboForm';

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

    const createCombo = async (formData, reset) => {
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

        reset?.();
        fetchCombos();
    };

    return (
        <div>
            <h2>Combos</h2>

            <ComboForm
                locationId={locationId}
                onSubmit={createCombo}
            />

            <h3>Existing Combos</h3>

            {combos.map((combo) => (
                <div key={combo.id}>
                    {combo.name} - ${combo.price}
                </div>
            ))}

            <button onClick={() => navigate(`/owner/location/${locationId}`)}>Back</button>
        </div>
    );
}