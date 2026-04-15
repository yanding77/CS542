import { useParams, useNavigate } from 'react-router-dom';

export default function LocationManager() {
    const { locationId } = useParams();
    const navigate = useNavigate();

    return (
        <div style={{ padding: '20px' }}>
            <h2>Location Management</h2>

            {/* View Dashboard */}
            <button onClick={() => navigate(`/location/dashboard/${locationId}`)}>
                View Location Dashboard
            </button>

            <hr />

            <h3>Management</h3>

            <div>
                <button onClick={() => navigate(`/owner/location/${locationId}/items`)}>
                    Manage Items
                </button>
            </div>

            <div>
                <button onClick={() => navigate(`/owner/location/${locationId}/combos`)}>
                    Manage Combos
                </button>
            </div>

            <div>
                <button onClick={() => navigate(`/owner/location/${locationId}/deals`)}>
                    Manage Deals
                </button>
            </div>

            <div>
                <button onClick={() => navigate(`/owner/location/${locationId}/menus`)}>
                    Manage Menus
                </button>
            </div>

            <hr />

            <h3>Settings</h3>

            <button onClick={() => navigate(`/owner/location/${locationId}/settings`)}>
                Manage Location Settings
            </button>

            <hr />

            <button onClick={() => navigate('/owner/dashboard')}>
                Back to Dashboard
            </button>
        </div>
    );
}