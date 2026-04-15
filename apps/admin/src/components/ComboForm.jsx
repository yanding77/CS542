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

    // Fetch items for location
    useEffect(() => {
        const fetchItems = async () => {
            try {
                const res = await fetch(
                    `http://localhost:3000/api/items/${locationId}`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );

                const data = await res.json();
                setItems(Array.isArray(data) ? data : []);
            } catch (err) {
                console.error('Failed to fetch items', err);
                setItems([]);
            }
        };

        fetchItems();
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
    const toggleItem = (itemId) => {
        setSelectedItems((prev) =>
            prev.includes(itemId)
                ? prev.filter((id) => id !== itemId)
                : [...prev, itemId]
        );
    };

    // Toggle category collapse
    const toggleCategory = (category) => {
        setOpenCategories((prev) => ({
            ...prev,
            [category]: !prev[category],
        }));
    };

    // Form input handler
    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    // Submit combo
    const handleSubmit = (e) => {
        e.preventDefault();

        onSubmit({
            ...formData,
            price: parseFloat(formData.price),
            items: selectedItems,
            locationId,
        });

        setFormData({
            name: '',
            price: '',
        });

        setSelectedItems([]);
    };

    return (
        <form onSubmit={handleSubmit}>
            <h3>Create Combo</h3>

            {/* NAME */}
            <input
                name="name"
                placeholder="Combo Name"
                value={formData.name}
                onChange={handleChange}
            />

            {/* PRICE */}
            <input
                name="price"
                type="number"
                placeholder="Combo Price"
                value={formData.price}
                onChange={handleChange}
            />

            <h4>Select Items</h4>

            {/* GROUPED ITEMS */}
            {Object.entries(groupedItems).map(([category, items]) => {
                const isOpen = openCategories[category] ?? false;

                return (
                    <div key={category} style={{ marginBottom: '12px' }}>
                        {/* Category Header */}
                        <div
                            onClick={() => toggleCategory(category)}
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

                        {/* Items List */}
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
                                            checked={selectedItems.includes(
                                                item.id
                                            )}
                                            onChange={() =>
                                                toggleItem(item.id)
                                            }
                                        />
                                        {item.name} - ${item.price}
                                    </label>
                                ))}
                            </div>
                        )}
                    </div>
                );
            })}

            <button type="submit">Create Combo</button>
        </form>
    );
}