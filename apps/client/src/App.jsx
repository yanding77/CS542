import CustomerView from './components/CustomerView';

import MenuCategories from './components/MenuCategories';
import MenuItems from './components/MenuItems';
import Cart from './components/Cart';
import Payment from './components/Payment';
import Footer from './components/footer';
import {Route, Routes} from "react-router-dom";

function App() {
    return (
        <Routes>
            <Route path="/" element={<CustomerView />} />
        </Routes>
    );
}

export default App;