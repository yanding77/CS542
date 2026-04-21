import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import MenuForm from '../components/MenuForm';

export default function MenusPage() {
    const { locationId } = useParams();
    const [menus, setMenus] = useState([]);

    const token = localStorage.getItem('jwt');
    const navigate = useNavigate();

    const fetchMenus = async () => {
        const res = await fetch(
            `http://localhost:3000/api/menus/${locationId}`,
            {
                headers: { Authorization: `Bearer ${token}` },
            }
        );

        const data = await res.json();
        setMenus(Array.isArray(data) ? data : []);
    };

    useEffect(() => {
        fetchMenus();
    }, [locationId]);

    const createMenu = async (formData) => {
        const res = await fetch(
            'http://localhost:3000/api/menus/create',
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
            alert('Failed to create menu');
            return;
        }

        fetchMenus();
    };

    return (
        <div>
            <h2>Menus</h2>

            <MenuForm locationId={locationId} onSubmit={createMenu} />

            <h3>Existing Menus</h3>

            {menus.map((menu) => (
                <div key={menu.id}>
                    <strong>{menu.name}</strong>
                </div>
            ))}

            <button onClick={() => navigate(`/owner/location/${locationId}`)}>
                Back
            </button>
        </div>
    );
}