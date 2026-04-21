import { useState, useEffect, useMemo } from 'react';

export default function MenuForm({ locationId, onSubmit }) {
    const [formData, setFormData] = useState({
        name: '',
    });

    const [items, setItems] = useState([]);
    const [combos, setCombos] = useState([]);

    const [selectedItems, setSelectedItems] = useState([]);
    const [selectedCombos, setSelectedCombos] = useState([]);

    const [openItemCategories, setOpenItemCategories] = useState({});
    const [openComboSection, setOpenComboSection] = useState(false);

    const token = localStorage.getItem('jwt');

    // Fetch items + combos
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
                console.error('Failed to fetch data', err);
            }
        };

        fetchData();
    }, [locationId, token]);

    // Group items by category
    const groupedItems = useMemo(() => {
        const groups = {};

        for (const item of items) {
            const category = item.category || 'uncategorized';

            if (!groups[category]) {
                groups[category] = [];
            }

            groups[category].push(item);
        }

        return groups;
    }, [items]);

    // Toggle item selection
    const toggleItem = (id) => {
        setSelectedItems((prev) =>
            prev.includes(id)
                ? prev.filter((i) => i !== id)
                : [...prev, id]
        );
    };

    // Toggle combo selection
    const toggleCombo = (id) => {
        setSelectedCombos((prev) =>
            prev.includes(id)
                ? prev.filter((c) => c !== id)
                : [...prev, id]
        );
    };

    // Toggle item category collapse
    const toggleItemCategory = (category) => {
        setOpenItemCategories((prev) => ({
            ...prev,
            [category]: !prev[category],
        }));
    };

    // Toggle combo section collapse
    const toggleComboSection = () => {
        setOpenComboSection((prev) => !prev);
    };

    // Input handler
    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    // Submit
    const handleSubmit = (e) => {
        e.preventDefault();

        onSubmit({
            name: formData.name,
            locationId,
            items: selectedItems,
            combos: selectedCombos,
        });

        setFormData({ name: '' });
        setSelectedItems([]);
        setSelectedCombos([]);
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="bg-white border border-slate-200 rounded-xl shadow-md p-6 flex flex-col gap-6"
        >
            {/* HEADER */}
            <div>
                <h3 className="text-xl font-semibold">Create Menu</h3>
                <p className="text-sm text-slate-500">
                    Select items and combos to build a menu
                </p>
            </div>

            {/* NAME */}
            <input
                name="name"
                placeholder="Menu Name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-300"
            />

            {/* ITEMS */}
            <div className="flex flex-col gap-3">
                <h4 className="text-lg font-semibold">Select Items</h4>

                {Object.entries(groupedItems).map(([category, items]) => {
                    const isOpen = openItemCategories[category] ?? false;

                    return (
                        <div
                            key={category}
                            className="border border-slate-200 rounded-lg overflow-hidden"
                        >
                            {/* CATEGORY HEADER */}
                            <div
                                onClick={() => toggleItemCategory(category)}
                                className="cursor-pointer px-4 py-3 bg-slate-50 hover:bg-slate-100 flex justify-between items-center font-medium"
                            >
                                <span>{category.toUpperCase()}</span>
                                <span>{isOpen ? '▲' : '▼'}</span>
                            </div>

                            {/* ITEMS */}
                            {isOpen && (
                                <div className="px-4 py-3 flex flex-col gap-2">
                                    {items.map((item) => (
                                        <label
                                            key={item.id}
                                            className="flex items-center gap-2 text-sm"
                                        >
                                            <input
                                                type="checkbox"
                                                checked={selectedItems.includes(item.id)}
                                                onChange={() => toggleItem(item.id)}
                                            />
                                            {item.name} - ${item.price}
                                        </label>
                                    ))}
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>

            {/* COMBOS */}
            <div className="border border-slate-200 rounded-lg overflow-hidden">
                <div
                    onClick={toggleComboSection}
                    className="cursor-pointer px-4 py-3 bg-slate-50 hover:bg-slate-100 flex justify-between items-center font-medium"
                >
                    <span>COMBOS</span>
                    <span>{openComboSection ? '▲' : '▼'}</span>
                </div>

                {openComboSection && (
                    <div className="px-4 py-3 flex flex-col gap-2">
                        {combos.map((combo) => (
                            <label
                                key={combo.id}
                                className="flex items-center gap-2 text-sm"
                            >
                                <input
                                    type="checkbox"
                                    checked={selectedCombos.includes(combo.id)}
                                    onChange={() => toggleCombo(combo.id)}
                                />
                                {combo.name} - ${combo.price}
                            </label>
                        ))}
                    </div>
                )}
            </div>

            {/* SUBMIT */}
            <button
                type="submit"
                className="w-full bg-black text-white py-2 rounded-lg hover:bg-slate-800 transition"
            >
                Create Menu
            </button>
        </form>
    );
}