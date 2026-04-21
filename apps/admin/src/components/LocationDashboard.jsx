import { useEffect, useState, useMemo } from 'react';
import {useNavigate, useParams} from 'react-router-dom';

const CATEGORY_ORDER = [
    'alcohol',
    'appetizer',
    'entree',
    'drink',
    'dessert',
    'side',
];

export default function LocationDashboard() {
    const { locationId } = useParams();
    const [data, setData] = useState(null);

    const [openMenus, setOpenMenus] = useState({});
    const [openCategories, setOpenCategories] = useState({});
    const [combosOpen, setCombosOpen] = useState(true);

    const token = localStorage.getItem('jwt');
    const role = localStorage.getItem('role');
    const navigate = useNavigate();

    const fetchDashboard = async () => {
        const res = await fetch(
            `http://localhost:3000/api/locations/dashboard/${locationId}`,
            {
                headers: { Authorization: `Bearer ${token}` },
            }
        );

        const json = await res.json();
        setData(json);
    };

    useEffect(() => {
        fetchDashboard();
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('jwt');
        navigate('/');
    };

    const handleBackToOwner = () => {
        navigate(`/owner/location/${locationId}`);
    };

    const groupedItems = useMemo(() => {
        if (!data?.items) return {};

        const groups = {};

        for (const item of data.items) {
            const cat = item.category || 'uncategorized';

            if (!groups[cat]) groups[cat] = [];
            groups[cat].push(item);
        }

        return groups;
    }, [data]);

    const toggleMenu = (id) => {
        setOpenMenus((prev) => ({
            ...prev,
            [id]: !prev[id],
        }));
    };

    const toggleCategory = (cat) => {
        setOpenCategories((prev) => ({
            ...prev,
            [cat]: !prev[cat],
        }));
    };

    const toggleCombosSection = () => {
        setCombosOpen((prev) => !prev);
        console.log(data.combos);
    };

    if (!data) return <div>Loading...</div>;

    return (
        <div>
            <h2>Location Dashboard</h2>

            {/* Logout / go back to Owner Dashboard */}
            {role === 'location' && (
                <button onClick={handleLogout}>Logout</button>
            )}

            {role === 'owner' && (
                <button onClick={handleBackToOwner}>
                    Back to Location Management
                </button>
            )}

            {/* ================= MENUS ================= */}
            <section>
                <h3>Menus</h3>

                {data.menus.map((menu) => {
                    const isOpen = openMenus[menu.id] ?? false;

                    return (
                        <div key={menu.id} style={{ marginBottom: 12 }}>
                            <div
                                onClick={() => toggleMenu(menu.id)}
                                style={{
                                    cursor: 'pointer',
                                    fontWeight: 'bold',
                                    padding: 10,
                                    background: '#333',
                                    borderRadius: 6,
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                }}
                            >
                                <span>{menu.name || 'Unnamed Menu'}</span>
                                <span>{isOpen ? '▲' : '▼'}</span>
                            </div>

                            {isOpen && (
                                <div style={{ padding: 10 }}>
                                    {/* MENU ITEMS */}
                                    {menu.menuItems?.length > 0 && (
                                        <>
                                            <h4>Items</h4>
                                            {menu.menuItems.map((mi) => (
                                                <div key={mi.id}>
                                                    {mi.item?.name}
                                                </div>
                                            ))}
                                        </>
                                    )}

                                    {/* MENU COMBOS */}
                                    {menu.menuCombos?.length > 0 && (
                                        <>
                                            <h4>Combos</h4>
                                            {menu.menuCombos.map((mc) => (
                                                <div key={mc.id}>
                                                    {mc.combo?.name}
                                                </div>
                                            ))}
                                        </>
                                    )}
                                </div>
                            )}
                        </div>
                    );
                })}
            </section>

            {/* ================= ITEMS BY CATEGORY ================= */}
            <section>
                <h3>Items</h3>

                {CATEGORY_ORDER.map((cat) => {
                    const items = groupedItems[cat] || [];
                    const isOpen = openCategories[cat] ?? false;

                    return (
                        <div key={cat} style={{ marginBottom: 12 }}>
                            <div
                                onClick={() => toggleCategory(cat)}
                                style={{
                                    cursor: 'pointer',
                                    fontWeight: 'bold',
                                    padding: 10,
                                    background: '#444',
                                    borderRadius: 6,
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                }}
                            >
                                <span>{cat.toUpperCase()}</span>
                                <span>{isOpen ? '▲' : '▼'}</span>
                            </div>

                            {isOpen && (
                                <table
                                    style={{
                                        width: '100%',
                                        marginTop: 8,
                                        borderCollapse: 'collapse',
                                    }}
                                >
                                    <thead>
                                    <tr>
                                        <th align="left">Name</th>
                                        <th align="left">Price</th>
                                    </tr>
                                    </thead>

                                    <tbody>
                                    {items.map((item) => (
                                        <tr key={item.id}>
                                            <td>{item.name}</td>
                                            <td>${item.price}</td>
                                        </tr>
                                    ))}
                                    </tbody>
                                </table>
                            )}
                        </div>
                    );
                })}
            </section>

            {/* ================= COMBOS ================= */}
            <section>
                <div
                    onClick={toggleCombosSection}
                    style={{
                        cursor: 'pointer',
                        fontWeight: 'bold',
                        padding: 10,
                        background: '#333',
                        borderRadius: 6,
                        display: 'flex',
                        justifyContent: 'space-between',
                        marginBottom: 10,
                    }}
                >
                    <h3 style={{ margin: 0 }}>Combos</h3>
                    <span>{combosOpen ? '▲' : '▼'}</span>
                </div>

                {combosOpen && (
                    <div>
                        {data.combos.map((combo) => (
                            <div
                                key={combo.id}
                                style={{
                                    padding: 10,
                                    marginBottom: 10,
                                    border: '1px solid #333',
                                    borderRadius: 6,
                                }}
                            >
                                <strong>
                                    {combo.name} - ${combo.price}
                                </strong>

                                {combo.comboItems?.length > 0 && (
                                    <ul>
                                        {combo.comboItems.map((ci) => (
                                            <li key={ci.id}>
                                                {ci.item?.name}
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </div>
                        ))}
                    </div>
                )}
            </section>

            {/* ORDERS */}
            <section>
                <h3>In Progress Orders</h3>
                {data.orders.inProgress.map((order) => (
                    <div key={order.id}>
                        <div>Order: {order.id}</div>

                        <button
                            onClick={() =>
                                updateOrderStatus(order.id, 'completed')
                            }
                        >
                            Mark Completed
                        </button>
                    </div>
                ))}
            </section>

            <section>
                <h3>Completed Orders</h3>
                {data.orders.completed.map((order) => (
                    <div key={order.id}>
                        Order: {order.id}
                    </div>
                ))}
            </section>
        </div>
    );
}