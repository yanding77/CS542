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
        <form
            onSubmit={handleSubmit}
            className="bg-white border border-slate-200 rounded-xl shadow-md p-6 flex flex-col gap-6"
        >
            {/* HEADER */}
            <div>
                <h3 className="text-xl font-semibold">Create Item</h3>
                <p className="text-sm text-slate-500">
                    Add a new menu item to this location
                </p>
            </div>

            {/* NAME */}
            <input
                name="name"
                placeholder="Item Name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
            />

            {/* PRICE */}
            <input
                name="price"
                type="number"
                placeholder="Price"
                value={formData.price}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
            />

            {/* CATEGORY */}
            <div className="flex flex-col gap-2">
                <h4 className="font-semibold">Category</h4>

                <div className="grid grid-cols-2 gap-2">
                    {categories.map((cat) => (
                        <label
                            key={cat}
                            className={`flex items-center gap-2 px-3 py-2 border rounded-lg cursor-pointer transition ${
                                formData.category === cat
                                    ? 'bg-black text-white'
                                    : 'bg-white hover:bg-slate-100'
                            }`}
                        >
                            <input
                                type="radio"
                                name="category"
                                value={cat}
                                checked={formData.category === cat}
                                onChange={handleChange}
                            />
                            <span className="capitalize">{cat}</span>
                        </label>
                    ))}
                </div>
            </div>

            {/* ALLERGENS */}
            <div className="flex flex-col gap-2">
                <h4 className="font-semibold">Allergens</h4>

                <div className="grid grid-cols-2 gap-2">
                    {allergens.map((allergen) => (
                        <label
                            key={allergen.id}
                            className="flex items-center gap-2 text-sm border rounded-lg px-3 py-2 hover:bg-slate-50"
                        >
                            <input
                                type="checkbox"
                                checked={formData.allergens.includes(allergen.id)}
                                onChange={() => handleAllergenChange(allergen.id)}
                            />
                            {allergen.name}
                        </label>
                    ))}
                </div>
            </div>

            {/* CONDITIONAL FIELDS WRAPPER */}
            <div className="flex flex-col gap-4">
                {/* Alcohol */}
                {formData.category === 'alcohol' && (
                    <input
                        name="alcoholContent"
                        placeholder="Alcohol %"
                        value={formData.alcoholContent}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-slate-300 rounded-lg"
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
                        className="w-full px-4 py-2 border border-slate-300 rounded-lg"
                    />
                )}

                {/* Dessert */}
                {formData.category === 'dessert' && (
                    <div className="flex flex-col gap-3">
                    <textarea
                        name="description"
                        placeholder="Description"
                        value={formData.description}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-slate-300 rounded-lg"
                    />

                        <input
                            name="prepTime"
                            type="number"
                            placeholder="Prep Time (minutes)"
                            value={formData.prepTime}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-slate-300 rounded-lg"
                        />
                    </div>
                )}

                {/* Drink */}
                {formData.category === 'drink' && (
                    <label className="flex items-center gap-2 text-sm">
                        <input
                            type="checkbox"
                            name="refillable"
                            checked={formData.refillable}
                            onChange={handleChange}
                        />
                        Refillable
                    </label>
                )}
            </div>

            {/* SUBMIT */}
            <button
                type="submit"
                className="bg-black text-white py-2 rounded-lg hover:bg-gray-800 transition"
            >
                Create Item
            </button>
        </form>
    );
}