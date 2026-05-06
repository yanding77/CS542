import { Routes, Route } from 'react-router-dom';
import LoginPage from './components/LoginPage.jsx';
import OwnerLogin from "./components/OwnerLogin.jsx";
import LocationLogin from "./components/LocationLogin.jsx";
import RegisterOwner from "./components/RegisterOwner.jsx";
import OwnerDashboard from './components/OwnerDashboard.jsx';
import LocationDashboard from './components/LocationDashboard';
import ProtectedRoute from './components/ProtectedRoute.jsx';
import CreateLocationPage from "./components/CreateLocationPage.jsx";
import LocationManager from "./components/LocationManager.jsx";
import ItemsPage from "./components/ItemsPage.jsx";
import CombosPage from "./components/CombosPage.jsx";
import DealsPage from "./components/DealsPage.jsx";
import MenusPage from "./components/MenusPage.jsx";
import EditItemPage from "./components/EditItemPage.jsx";
import EditComboPage from "./components/EditComboPage.jsx";
import EditDealPage from "./components/EditDealPage.jsx";
import EditMenuPage from "./components/EditMenuPage.jsx";
import LocationSettings from "./components/LocationSettings.jsx";

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
                    <ProtectedRoute allowedRole={["owner"]}>
                        <OwnerDashboard />
                    </ProtectedRoute>
                }
            />
            <Route
                path="/owner/create-location"
                element={
                    <ProtectedRoute allowedRole={["owner"]}>
                        <CreateLocationPage />
                    </ProtectedRoute>
                }
            />
            <Route
                path="/location/dashboard/:locationId"
                element={
                    <ProtectedRoute allowedRole={["location"]}>
                        <LocationDashboard />
                    </ProtectedRoute>
                }
            />
            <Route
                path="/owner/location/dashboard/:locationId"
                element={
                    <ProtectedRoute allowedRole={["owner"]}>
                        <LocationDashboard />
                    </ProtectedRoute>
                }
            />
            <Route
                path="/owner/location/:locationId"
                element={
                    <ProtectedRoute allowedRole={["owner"]}>
                        <LocationManager />
                    </ProtectedRoute>
                }
            />
            <Route
                path="/owner/location/:locationId/items"
                element={
                    <ProtectedRoute allowedRole={["owner"]}>
                        <ItemsPage />
                    </ProtectedRoute>
                }
            />
            <Route
                path="/owner/location/:locationId/combos"
                element={
                    <ProtectedRoute allowedRole={["owner"]}>
                        <CombosPage />
                    </ProtectedRoute>
                }
            />
            <Route
                path="/owner/location/:locationId/deals"
                element={
                    <ProtectedRoute allowedRole={["owner"]}>
                        <DealsPage />
                    </ProtectedRoute>
                }
            />
            <Route
                path="/owner/location/:locationId/menus"
                element={
                    <ProtectedRoute allowedRole={["owner"]}>
                        <MenusPage />
                    </ProtectedRoute>
                }
            />
            <Route
                path="/owner/items/edit/:itemId"
                element={
                    <ProtectedRoute allowedRole={["owner"]}>
                        <EditItemPage />
                    </ProtectedRoute>
                }
            />
            <Route
                path="/owner/combos/edit/:comboId"
                element={
                    <ProtectedRoute allowedRole={["owner"]}>
                        <EditComboPage />
                    </ProtectedRoute>
                }
            />
            <Route
                path="/owner/deals/edit/:dealId"
                element={
                    <ProtectedRoute allowedRole={["owner"]}>
                        <EditDealPage />
                    </ProtectedRoute>
                }
            />
            <Route
                path="/owner/menus/edit/:menuId"
                element={
                    <ProtectedRoute allowedRole={["owner"]}>
                        <EditMenuPage />
                    </ProtectedRoute>
                }
            />
            <Route
                path="/owner/location/:locationId/settings"
                element={
                    <ProtectedRoute allowedRole={["owner"]}>
                        <LocationSettings />
                    </ProtectedRoute>
                }
            />
        </Routes>
    );
}

export default App;
