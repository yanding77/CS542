import { useState, useEffect, useMemo } from 'react';

export default function ComboForm({ locationId, onSubmit }) {
    const [formData, setFormData] = useState({
        name: '',
        price: '',
    });

    const [items, setItems] = useState([]);
    const [selectedItems, setSelectedItems] = useState([]);
    const [openCategories, setOpenCategories] = useState({});

    const token = localStorage.getItem('jwt');

    useEffect(() => {
        const fetchItems = async () => {
            const res = await fetch(
                `http://localhost:3000/api/items/${locationId}`,
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );

            const data = await res.json();
            setItems(Array.isArray(data) ? data : []);
        };

        fetchItems();
    }, [locationId, token]);

    const groupedItems = useMemo(() => {
        const groups = {};

        for (const item of items) {
            const category = item.category || 'uncategorized';
            if (!groups[category]) groups[category] = [];
            groups[category].push(item);
        }

        return groups;
    }, [items]);

    const toggleItem = (id) => {
        setSelectedItems((prev) =>
            prev.includes(id)
                ? prev.filter((x) => x !== id)
                : [...prev, id]
        );
    };

    const toggleCategory = (cat) => {
        setOpenCategories((prev) => ({
            ...prev,
            [cat]: !prev[cat],
        }));
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((p) => ({ ...p, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        onSubmit({
            ...formData,
            price: parseFloat(formData.price),
            items: selectedItems,
            locationId,
        });

        setFormData({ name: '', price: '' });
        setSelectedItems([]);
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="bg-white border border-slate-200 rounded-xl shadow-md p-6 flex flex-col gap-6"
        >
            {/* HEADER */}
            <div className="text-center">
                <h3 className="text-xl font-semibold">Create Combo</h3>
                <p className="text-sm text-gray-500">
                    Select items to include in this combo
                </p>
            </div>

            {/* INPUTS */}
            <div className="flex flex-col gap-3">
                <input
                    name="name"
                    placeholder="Combo Name"
                    value={formData.name}
                    onChange={handleChange}
                    className="border border-slate-200 rounded-lg px-4 py-2"
                />

                <input
                    name="price"
                    type="number"
                    placeholder="Combo Price"
                    value={formData.price}
                    onChange={handleChange}
                    className="border border-slate-200 rounded-lg px-4 py-2"
                />
            </div>

            {/* ITEMS SECTION */}
            <div className="flex flex-col gap-3">
                <h4 className="font-semibold">Select Items</h4>

                {Object.entries(groupedItems).map(([category, items]) => {
                    const isOpen = openCategories[category] ?? false;

                    return (
                        <div
                            key={category}
                            className="border border-slate-200 rounded-lg overflow-hidden"
                        >
                            {/* CATEGORY HEADER */}
                            <div
                                onClick={() => toggleCategory(category)}
                                className="cursor-pointer bg-slate-100 px-4 py-3 flex justify-between font-medium"
                            >
                                <span>{category.toUpperCase()}</span>
                                <span>{isOpen ? '▲' : '▼'}</span>
                            </div>

                            {/* ITEMS */}
                            {isOpen && (
                                <div className="p-4 flex flex-col gap-2">
                                    {items.map((item) => (
                                        <label
                                            key={item.id}
                                            className="flex items-center gap-2 text-sm"
                                        >
                                            <input
                                                type="checkbox"
                                                checked={selectedItems.includes(
                                                    item.id
                                                )}
                                                onChange={() =>
                                                    toggleItem(item.id)
                                                }
                                            />
                                            <span>
                                                {item.name} - ${item.price}
                                            </span>
                                        </label>
                                    ))}
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>

            {/* SUBMIT */}
            <button
                type="submit"
                className="bg-black text-white rounded-lg py-3 hover:bg-gray-800 transition"
            >
                Create Combo
            </button>
        </form>
    );
}