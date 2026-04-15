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
        <div>
            <h2>Items</h2>

            <ItemForm onSubmit={createItem} />

            <h3>Existing Items</h3>

            {items.map((item) => (
                <div key={item.id}>
                    {item.name} - ${item.price}
                </div>
            ))}

            <button onClick={() => navigate(`/owner/location/${locationId}`)}>Back</button>
        </div>
    );
}