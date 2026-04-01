import { Routes, Route } from 'react-router-dom';
import LoginPage from './components/LoginPage.jsx';
import OwnerLogin from "./components/OwnerLogin.jsx";
import LocationLogin from "./components/LocationLogin.jsx";
import RegisterOwner from "./components/RegisterOwner.jsx";
import OwnerDashboard from './components/OwnerDashboard.jsx';
import LocationDashboard from './components/LocationDashboard';
import ProtectedRoute from './components/ProtectedRoute.jsx';

function App() {
    return (
        <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route path="/login/owner" element={<OwnerLogin />} />
            <Route path="/login/location" element={<LocationLogin />} />
            <Route path="/register" element={<RegisterOwner />} />
            <Route
                path="/owner/dashboard"
                element={
                    <ProtectedRoute allowedRole="owner">
                        <OwnerDashboard />
                    </ProtectedRoute>
                }
            />
            <Route
                path="/location/dashboard"
                element={
                    <ProtectedRoute allowedRole="location">
                        <LocationDashboard />
                    </ProtectedRoute>
                }
            />
        </Routes>
    );
}

export default App;
