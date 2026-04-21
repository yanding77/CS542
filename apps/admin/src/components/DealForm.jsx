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
        <form
            onSubmit={handleSubmit}
            className="w-full bg-white border border-slate-200 rounded-xl shadow-sm p-6 flex flex-col gap-6"
        >
            {/* HEADER */}
            <div>
                <h3 className="text-xl font-semibold">Create Deal</h3>
                <p className="text-sm text-slate-500">
                    Create a promotional discount for an item or combo
                </p>
            </div>

            {/* NAME */}
            <input
                name="name"
                placeholder="Deal Name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
            />

            {/* PRICE */}
            <input
                name="price"
                type="number"
                placeholder="Deal Price"
                value={formData.price}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
            />

            {/* DATES */}
            <div className="grid grid-cols-2 gap-4">
                <input
                    name="startDate"
                    type="date"
                    value={formData.startDate}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg"
                />

                <input
                    name="endDate"
                    type="date"
                    value={formData.endDate}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg"
                />
            </div>

            {/* TYPE TOGGLE */}
            <div className="flex flex-col gap-2">
                <h4 className="font-semibold">Deal Type</h4>

                <div className="flex gap-3">
                    <button
                        type="button"
                        onClick={() => handleTypeChange('item')}
                        className={`px-4 py-2 rounded-lg border transition ${
                            formData.type === 'item'
                                ? 'bg-black text-white'
                                : 'bg-white hover:bg-slate-100'
                        }`}
                    >
                        Item Deal
                    </button>

                    <button
                        type="button"
                        onClick={() => handleTypeChange('combo')}
                        className={`px-4 py-2 rounded-lg border transition ${
                            formData.type === 'combo'
                                ? 'bg-black text-white'
                                : 'bg-white hover:bg-slate-100'
                        }`}
                    >
                        Combo Deal
                    </button>
                </div>
            </div>

            {/* ITEM SELECTION */}
            {formData.type === 'item' && (
                <div className="flex flex-col gap-2">
                    <h4 className="font-semibold">Select Item</h4>

                    <div className="flex flex-col gap-2">
                        {items.map((item) => (
                            <label
                                key={item.id}
                                className="flex items-center gap-2 text-sm"
                            >
                                <input
                                    type="radio"
                                    checked={formData.selectedItem === item.id}
                                    onChange={() => handleItemSelect(item.id)}
                                />
                                {item.name}
                            </label>
                        ))}
                    </div>
                </div>
            )}

            {/* COMBO SELECTION */}
            {formData.type === 'combo' && (
                <div className="flex flex-col gap-2">
                    <h4 className="font-semibold">Select Combo</h4>

                    <div className="flex flex-col gap-2">
                        {combos.map((combo) => (
                            <label
                                key={combo.id}
                                className="flex items-center gap-2 text-sm"
                            >
                                <input
                                    type="radio"
                                    checked={formData.selectedCombo === combo.id}
                                    onChange={() => handleComboSelect(combo.id)}
                                />
                                {combo.name}
                            </label>
                        ))}
                    </div>
                </div>
            )}

            {/* SUBMIT */}
            <button
                type="submit"
                className="bg-black text-white py-2 rounded-lg hover:bg-gray-800 transition"
            >
                Create Deal
            </button>
        </form>
    );
}