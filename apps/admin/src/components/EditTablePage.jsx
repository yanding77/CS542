import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import TableForm from '../components/TableForm';

export default function EditTablePage() {
    const { tableId } = useParams();
    const navigate = useNavigate();
    const token = localStorage.getItem('jwt');

    const [initialData, setInitialData] = useState(null);

    // -----------------------------
    // FETCH SINGLE TABLE
    // -----------------------------
    useEffect(() => {
        const fetchTable = async () => {
            try {
                const res = await fetch(
                    `http://localhost:3000/api/tables/get/${tableId}`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );

                const data = await res.json();

                // normalize safely (prevents undefined crashes)
                setInitialData({
                    tableid: data?.tableid ?? '',
                    qrCodeData: data?.qrCodeData ?? '',
                });
            } catch (err) {
                console.error('Failed to fetch table:', err);
            }
        };

        fetchTable();
    }, [tableId, token]);

    // -----------------------------
    // UPDATE TABLE
    // -----------------------------
    const updateTable = async (formData) => {
        try {
            const res = await fetch(
                `http://localhost:3000/api/tables/update/${tableId}`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify({
                        ...formData,
                    }),
                }
            );

            if (!res.ok) {
                alert('Failed to update table');
                return;
            }

            navigate(-1);
        } catch (err) {
            console.error(err);
        }
    };

    // -----------------------------
    // LOADING STATE
    // -----------------------------
    if (!initialData) {
        return (
            <div className="min-h-screen flex items-center justify-center text-gray-500">
                Loading...
            </div>
        );
    }

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
                            Edit table details
                        </p>
                    </div>

                    <button
                        onClick={() => navigate(-1)}
                        className="px-4 py-2 border rounded-lg hover:bg-gray-100"
                    >
                        Back
                    </button>
                </div>

                {/* FORM */}
                <TableForm
                    onSubmit={updateTable}
                    initialData={initialData}
                    isEdit
                />

            </div>
        </div>
    );
}