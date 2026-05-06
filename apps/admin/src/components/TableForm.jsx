import { useState, useEffect } from 'react';

export default function TableForm({ onSubmit, initialData, isEdit = false, locationId }) {
    const token = localStorage.getItem('jwt');

    const [formData, setFormData] = useState({
        tableid: '',
        qrCodeData: '',
    });

    // -----------------------------
    // LOAD INITIAL DATA (EDIT MODE)
    // -----------------------------
    useEffect(() => {
        if (!initialData) return;

        setFormData({
            tableid: initialData.tableid || '',
            qrCodeData: initialData.qrCodeData || '',
        });
    }, [initialData]);

    // -----------------------------
    // HANDLE INPUT CHANGE
    // -----------------------------
    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    // -----------------------------
    // SUBMIT
    // -----------------------------
    const handleSubmit = async (e) => {
        e.preventDefault();

        const payload = {
            ...formData,
            locationId,
        };

        onSubmit(payload, () =>
            setFormData({
                tableid: '',
                qrCodeData: '',
            })
        );
    };

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
                    {isEdit ? 'Edit Table' : 'Create Table'}
                </h3>
                <p className="text-sm text-slate-500">
                    Add or update a table for this location
                </p>
            </div>

            {/* TABLE ID */}
            <input
                name="tableid"
                placeholder="Table Number (e.g. 12)"
                value={formData.tableid}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
            />

            {/* SUBMIT */}
            <button
                type="submit"
                className="bg-black text-white py-2 rounded-lg hover:bg-gray-800 transition"
            >
                {isEdit ? 'Update Table' : 'Create Table'}
            </button>
        </form>
    );
}