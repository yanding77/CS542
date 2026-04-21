import { useState, useEffect } from 'react';

export default function DealForm({ onSubmit, locationId }) {
    const [formData, setFormData] = useState({
        name: '',
        price: '',
        startDate: '',
        endDate: '',
        type: 'item', // 'item' | 'combo'
        selectedItem: null,
        selectedCombo: null,
    });

    const [items, setItems] = useState([]);
    const [combos, setCombos] = useState([]);

    const token = localStorage.getItem('jwt');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [itemsRes, combosRes] = await Promise.all([
                    fetch(`http://localhost:3000/api/items/${locationId}`, {
                        headers: { Authorization: `Bearer ${token}` },
                    }),
                    fetch(`http://localhost:3000/api/combos/${locationId}`, {
                        headers: { Authorization: `Bearer ${token}` },
                    }),
                ]);

                const itemsData = await itemsRes.json();
                const combosData = await combosRes.json();

                setItems(Array.isArray(itemsData) ? itemsData : []);
                setCombos(Array.isArray(combosData) ? combosData : []);
            } catch (err) {
                console.error('Failed to fetch items/combos', err);
            }
        };

        fetchData();
    }, [locationId, token]);

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleTypeChange = (type) => {
        setFormData((prev) => ({
            ...prev,
            type,
            selectedItem: null,
            selectedCombo: null,
        }));
    };

    const handleItemSelect = (id) => {
        setFormData((prev) => ({
            ...prev,
            selectedItem: id,
        }));
    };

    const handleComboSelect = (id) => {
        setFormData((prev) => ({
            ...prev,
            selectedCombo: id, //
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const payload = {
            name: formData.name,
            price: parseFloat(formData.price),
            startDate: formData.startDate,
            endDate: formData.endDate,
            locationId,
            items: formData.type === 'item' && formData.selectedItem
                ? [formData.selectedItem]
                : [],
            combos:
                formData.type === 'combo' && formData.selectedCombo
                    ? [formData.selectedCombo]
                    : [],
        };

        onSubmit(payload, () =>
            setFormData({
                name: '',
                price: '',
                startDate: '',
                endDate: '',
                type: 'item',
                selectedItem: null,
                selectedCombo: null,
            })
        );
    };

    return (
        <form onSubmit={handleSubmit}>
            <h3>Create Deal</h3>

            <input
                name="name"
                placeholder="Deal Name"
                value={formData.name}
                onChange={handleChange}
            />

            <input
                name="price"
                type="number"
                placeholder="Deal Price"
                value={formData.price}
                onChange={handleChange}
            />

            <input
                name="startDate"
                type="date"
                value={formData.startDate}
                onChange={handleChange}
            />

            <input
                name="endDate"
                type="date"
                value={formData.endDate}
                onChange={handleChange}
            />

            {/* TYPE TOGGLE */}
            <div>
                <h4>Deal Type</h4>
                <button type="button" onClick={() => handleTypeChange('item')}>
                    Item Deal
                </button>
                <button type="button" onClick={() => handleTypeChange('combo')}>
                    Combo Deal
                </button>
            </div>

            {/* ITEM SELECTION */}
            {formData.type === 'item' && (
                <div>
                    <h4>Select ONE Item</h4>
                    {items.map((item) => (
                        <label key={item.id}>
                            <input
                                type="radio"
                                name="itemSelection"
                                checked={formData.selectedItem === item.id}
                                onChange={() => handleItemSelect(item.id)}
                            />
                            {item.name}
                            <br/>
                        </label>
                    ))}
                </div>
            )}

            {/* COMBO SELECTION (RADIO) */}
            {formData.type === 'combo' && (
                <div>
                    <h4>Select ONE Combo</h4>
                    {combos.map((combo) => (
                        <label key={combo.id}>
                            <input
                                type="radio"
                                name="comboSelection"
                                checked={formData.selectedCombo === combo.id}
                                onChange={() => handleComboSelect(combo.id)}
                            />
                            {combo.name}
                            <br/>
                        </label>
                    ))}
                </div>
            )}

            <button type="submit">Create Deal</button>
        </form>
    );
}