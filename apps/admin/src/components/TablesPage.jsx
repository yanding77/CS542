import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import TableForm from '../components/TableForm';
import { PencilSquareIcon, TrashIcon } from '@heroicons/react/24/outline';

export default function TablesPage() {
    const { locationId } = useParams();
    const [tables, setTables] = useState([]);

    const token = localStorage.getItem('jwt');
    const navigate = useNavigate();

    // -----------------------------
    // FETCH TABLES
    // -----------------------------
    const fetchTables = async () => {
        const res = await fetch(
            `http://localhost:3000/api/tables/${locationId}`,
            {
                headers: { Authorization: `Bearer ${token}` },
            }
        );

        const data = await res.json();
        setTables(Array.isArray(data) ? data : []);
    };

    useEffect(() => {
        fetchTables();
    }, []);

    // -----------------------------
    // CREATE TABLE
    // -----------------------------
    const createTable = async (formData, resetForm) => {
        const res = await fetch(
            'http://localhost:3000/api/tables/create',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    ...formData,
                    locationId,
                }),
            }
        );

        if (!res.ok) {
            alert('Failed to create table');
            return;
        }

        resetForm();
        fetchTables();
    };

    // -----------------------------
    // DELETE TABLE
    // -----------------------------
    const handleDelete = async (tableId) => {
        if (!window.confirm('Delete this table?')) return;

        const res = await fetch(
            `http://localhost:3000/api/tables/delete/${tableId}`,
            {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );

        if (!res.ok) {
            alert('Failed to delete table');
            return;
        }

        fetchTables();
    };

    // -----------------------------
    // RENDER
    // -----------------------------
    return (
        <div className="min-h-screen bg-neutral-800 flex items-center justify-center p-6">
            <div className="w-full max-w-[900px] flex flex-col gap-6">

                {/* HEADER CARD */}
                <div className="bg-white border border-slate-200 rounded-xl shadow-md p-6 flex justify-between items-center">
                    <div>
                        <h2 className="text-xl font-semibold">Tables</h2>
                        <p className="text-sm text-gray-500">
                            Manage tables for this location
                        </p>
                    </div>

                    <button
                        onClick={() =>
                            navigate(`/owner/location/${locationId}`)
                        }
                        className="px-4 py-2 border rounded-lg hover:bg-gray-100"
                    >
                        Back
                    </button>
                </div>

                {/* FORM */}
                <TableForm onSubmit={createTable} />

                {/* EXISTING TABLES */}
                <div className="bg-white border border-slate-200 rounded-xl shadow-md p-6 flex flex-col gap-3">
                    <h3 className="text-lg font-semibold">
                        Existing Tables
                    </h3>

                    <div className="flex flex-col gap-3">
                        {tables.map((table) => (
                            <div
                                key={table.id}
                                className="bg-white border border-slate-200 rounded-lg p-4 flex justify-between items-center"
                            >
                                {/* LEFT SIDE */}
                                <div>
                                    <div className="font-semibold">
                                        Table {table.tableid}
                                    </div>

                                    <div className="text-sm text-slate-500">
                                        QR: {table.qrCodeData?.slice(0, 25)}...
                                    </div>
                                </div>

                                {/* ACTIONS */}
                                <div className="flex items-center gap-4">

                                    <button
                                        onClick={() =>
                                            navigate(
                                                `/owner/tables/edit/${table.id}`
                                            )
                                        }
                                        className="p-2 border border-slate-300 rounded-lg hover:bg-slate-100 transition"
                                    >
                                        <PencilSquareIcon className="w-5 h-5 text-slate-600" />
                                    </button>

                                    <button
                                        onClick={() => handleDelete(table.id)}
                                        className="p-2 border border-slate-300 rounded-lg hover:bg-red-100 transition"
                                    >
                                        <TrashIcon className="w-5 h-5 text-red-500" />
                                    </button>

                                </div>
                            </div>
                        ))}
                    </div>
                </div>

            </div>
        </div>
    );
}