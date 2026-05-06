import { useState, useEffect } from 'react';
import { ItemCategory } from '../../../server/src/database/entities/item-category.enum.js';

const categories = [
    ItemCategory.ENTREE,
    ItemCategory.DRINK,
    ItemCategory.DESSERT,
    ItemCategory.APPETIZER,
    ItemCategory.SIDE,
    ItemCategory.ALCOHOL
];

export default function ItemForm({ onSubmit, initialData, isEdit = false }) {
    const token = localStorage.getItem('jwt');

    const [formData, setFormData] = useState({
        name: '',
        price: '',
        category: '',
        allergens: [],
        description: '',
        prepTime: '',
        alcoholContent: '',
        refillable: false,
        image: null
    });

    const [allergens, setAllergens] = useState([]);

    useEffect(() => {
        const fetchAllergens = async () => {
            try {
                const res = await fetch(
                    'http://localhost:3000/api/items/allergens',
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );

                const data = await res.json();

                setAllergens(Array.isArray(data) ? data : []);
            } catch (err) {
                console.error('Network error:', err);
                setAllergens([]);
            }
        };

        fetchAllergens();
    }, [token]);

    useEffect(() => {
        if (!initialData) return;
        console.log("RAW INITIAL DATA:", initialData);
        console.log("ITEM ALLERGENS:", initialData.itemAllergens);
    }, [initialData]);

    useEffect(() => {
        if (!initialData) return;

        setFormData({
            name: initialData.name || '',
            price: initialData.price || '',
            category: initialData.category || '',
            description: initialData.description || '',
            prepTime: initialData.prepTime || '',
            alcoholContent: initialData.alcoholContent || '',
            refillable: initialData.refillable || false,
            image: initialData.image || null,

            // normalize allergen IDs to STRING
            allergens: (initialData.itemAllergens || [])
                .map(a =>
                    String(a.allergenId ?? a.allergen?.id ?? a.id)
                )
                .filter(Boolean)
        });
    }, [initialData]);

    // -----------------------------
    // HANDLE INPUT CHANGE
    // -----------------------------
    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value,
        }));
    };

    // -----------------------------
    // TOGGLE ALLERGEN
    // -----------------------------
    const handleAllergenChange = (id) => {
        const safeId = String(id);

        setFormData((prev) => {
            const exists = prev.allergens.includes(safeId);

            return {
                ...prev,
                allergens: exists
                    ? prev.allergens.filter((a) => a !== safeId)
                    : [...prev.allergens, safeId],
            };
        });
    };

    // -----------------------------
    // SUBMIT
    // -----------------------------
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
                image: null
            })
        );
    };

    // -----------------------------
    // LOADING GUARD (important fix)
    // -----------------------------
    if (!allergens.length) {
        return (
            <div className="bg-white border border-slate-200 rounded-xl p-6">
                Loading...
            </div>
        );
    }

    // -----------------------------
    // RENDER
    // -----------------------------
    return (
        <form
            onSubmit={handleSubmit}
            className="bg-white border border-slate-200 rounded-xl shadow-md p-6 flex flex-col gap-6"
        >
            {/* HEADER */}
            <div>
                <h3 className="text-xl font-semibold">
                    {isEdit ? 'Edit Item' : 'Create Item'}
                </h3>
                <p className="text-sm text-slate-500">
                    Add or update a menu item
                </p>
            </div>

            {/* NAME */}
            <input
                name="name"
                placeholder="Item Name"
                value={formData.name || ''}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
            />

            {/* PRICE */}
            <input
                name="price"
                type="number"
                placeholder="Price"
                value={formData.price || ''}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
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
                    {allergens.map((allergen) => {
                        const id = String(allergen.id);

                        return (
                            <label
                                key={id}
                                className="flex items-center gap-2 text-sm border rounded-lg px-3 py-2 hover:bg-slate-50"
                            >
                                <input
                                    type="checkbox"
                                    checked={formData.allergens.includes(id)}
                                    onChange={() =>
                                        handleAllergenChange(id)
                                    }
                                />
                                {allergen.name}
                            </label>
                        );
                    })}
                </div>
            </div>

            {/* CONDITIONAL FIELDS */}
            <div className="flex flex-col gap-4">

                {formData.category === ItemCategory.ALCOHOL && (
                    <input
                        name="alcoholContent"
                        placeholder="Alcohol %"
                        value={formData.alcoholContent || ''}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border rounded-lg"
                    />
                )}

                {(formData.category === ItemCategory.APPETIZER ||
                    formData.category === ItemCategory.ENTREE) && (
                    <textarea
                        name="description"
                        placeholder="Description"
                        value={formData.description || ''}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border rounded-lg"
                    />
                )}

                {formData.category === ItemCategory.DESSERT && (
                    <div className="flex flex-col gap-3">
                        <textarea
                            name="description"
                            placeholder="Description"
                            value={formData.description || ''}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border rounded-lg"
                        />

                        <input
                            name="prepTime"
                            type="number"
                            placeholder="Prep Time"
                            value={formData.prepTime || ''}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border rounded-lg"
                        />
                    </div>
                )}

                {formData.category === ItemCategory.DRINK && (
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
                {isEdit ? 'Update Item' : 'Create Item'}
            </button>
        </form>
    );
}