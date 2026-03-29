import { Routes, Route } from 'react-router-dom';
import LoginPage from './components/LoginPage';
import OwnerDashboard from './components/OwnerDashboard';
import LocationDashboard from './components/LocationDashboard';
import CustomerView from './components/CustomerView';
import ProtectedRoute from './components/ProtectedRoute';

// imports are included here - previous logic is in the CustomerView component
import MenuCategories from './components/MenuCategories';
import MenuItems from './components/MenuItems';
import Cart from './components/Cart';
import Payment from './components/Payment';
import Footer from './components/footer';

function App() {
    return (
        <Routes>
            <Route path="/login" element={<LoginPage />} />
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
            <Route path="/" element={<CustomerView />} />
        </Routes>
    );
}

export default App;