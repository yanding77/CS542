import { useState, useEffect } from 'react';

const categories = [
    'alcohol',
    'appetizer',
    'dessert',
    'drink',
    'entree',
    'side',
];

export default function ItemForm({ onSubmit }) {
    const [formData, setFormData] = useState({
        name: '',
        price: '',
        category: '',
        allergens: [],
        description: '',
        prepTime: '',
        alcoholContent: '',
        refillable: false,
    });

    const [allergens, setAllergens] = useState([]);

    const token = localStorage.getItem('jwt');

    useEffect(() => {
        const fetchAllergens = async () => {
            try {
                const res = await fetch('http://localhost:3000/api/items/allergens', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (!res.ok) {
                    console.error("Failed to fetch allergens:", res.status);
                    setAllergens([]); // safe fallback
                    return;
                }

                const data = await res.json();

                setAllergens(Array.isArray(data) ? data : []);
            } catch (err) {
                console.error("Network error:", err);
                setAllergens([]);
            }
        };

        fetchAllergens();
    }, [token]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value,
        }));
    };

    const handleAllergenChange = (id) => {
        setFormData((prev) => {
            const exists = prev.allergens.includes(id);

            return {
                ...prev,
                allergens: exists
                    ? prev.allergens.filter((a) => a !== id)
                    : [...prev.allergens, id],
            };
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        onSubmit(formData, () =>
            setFormData({
                name: '',
                price: '',
                category: '',
                allergens: [],
                description: '',
                prepTime: '',
                alcoholContent: '',
                refillable: false,
            })
        );
    };

    return (
        <form onSubmit={handleSubmit}>
            <h3>Create Item</h3>

            {/* NAME */}
            <input
                name="name"
                placeholder="Item Name"
                value={formData.name}
                onChange={handleChange}
            />

            {/* PRICE */}
            <input
                name="price"
                type="number"
                placeholder="Price"
                value={formData.price}
                onChange={handleChange}
            />

            {/* CATEGORY */}
            <div>
                <h4>Category</h4>
                {categories.map((cat) => (
                    <label key={cat}>
                        <input
                            type="radio"
                            name="category"
                            value={cat}
                            checked={formData.category === cat}
                            onChange={handleChange}
                        />
                        {cat}
                    </label>
                ))}
            </div>

            {/* ALLERGENS */}
            <div>
                <h4>Allergens</h4>
                {allergens.map((allergen) => (
                    <label key={allergen.id}>
                        <input
                            type="checkbox"
                            checked={formData.allergens.includes(allergen.id)}
                            onChange={() => handleAllergenChange(allergen.id)}
                        />
                        {allergen.name}
                    </label>
                ))}
            </div>

            {/* CONDITIONAL FIELDS */}

            {/* Alcohol */}
            {formData.category === 'alcohol' && (
                <input
                    name="alcoholContent"
                    placeholder="Alcohol %"
                    value={formData.alcoholContent}
                    onChange={handleChange}
                />
            )}

            {/* Appetizer / Entree */}
            {(formData.category === 'appetizer' ||
                formData.category === 'entree') && (
                <textarea
                    name="description"
                    placeholder="Description"
                    value={formData.description}
                    onChange={handleChange}
                />
            )}

            {/* Dessert */}
            {formData.category === 'dessert' && (
                <>
                    <textarea
                        name="description"
                        placeholder="Description"
                        value={formData.description}
                        onChange={handleChange}
                    />
                    <br/>
                    <input
                        name="prepTime"
                        type="number"
                        placeholder="Prep Time (minutes)"
                        value={formData.prepTime}
                        onChange={handleChange}
                    />
                </>
            )}

            {/* Drink */}
            {formData.category === 'drink' && (
                <label>
                    <input
                        type="checkbox"
                        name="refillable"
                        checked={formData.refillable}
                        onChange={handleChange}
                    />
                    Refillable
                </label>
            )}
            <br/>
            <button type="submit">Create Item</button>
        </form>
    );
}