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
        <form onSubmit={handleSubmit}>
            <h3>Create Menu</h3>

            {/* NAME */}
            <input
                name="name"
                placeholder="Menu Name"
                value={formData.name}
                onChange={handleChange}
            />

            {/* ITEMS */}
            <h4>Select Items</h4>

            {Object.entries(groupedItems).map(([category, items]) => {
                const isOpen = openItemCategories[category] ?? false;

                return (
                    <div key={category} style={{ marginBottom: '12px' }}>
                        <div
                            onClick={() => toggleItemCategory(category)}
                            style={{
                                cursor: 'pointer',
                                fontWeight: 'bold',
                                background: '#333333',
                                padding: '8px',
                                borderRadius: '6px',
                                display: 'flex',
                                justifyContent: 'space-between',
                            }}
                        >
                            <span>{category.toUpperCase()}</span>
                            <span>{isOpen ? '▲' : '▼'}</span>
                        </div>

                        {isOpen && (
                            <div style={{ padding: '8px 12px' }}>
                                {items.map((item) => (
                                    <label
                                        key={item.id}
                                        style={{
                                            display: 'block',
                                            marginBottom: '6px',
                                        }}
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

            {/* COMBOS */}
            <h4
                onClick={toggleComboSection}
                style={{
                    cursor: 'pointer',
                    background: '#333333',
                    padding: '8px',
                    borderRadius: '6px',
                    display: 'flex',
                    justifyContent: 'space-between',
                }}
            >
                <span>COMBOS</span>
                <span>{openComboSection ? '▲' : '▼'}</span>
            </h4>

            {openComboSection && (
                <div style={{ padding: '8px 12px' }}>
                    {combos.map((combo) => (
                        <label
                            key={combo.id}
                            style={{ display: 'block', marginBottom: '6px' }}
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

            <button type="submit">Create Menu</button>
        </form>
    );
}