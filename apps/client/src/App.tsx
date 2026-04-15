import Header from './components/Header';
import Cart from "./components/Cart.tsx";
import MenuDisplay from "./components/MenuDisplay.tsx";
import { Routes, Route } from 'react-router-dom';
import { SessionProvider } from './hooks/GuestIDContext.tsx';
import Footer from './components/Footer.tsx';

export default function App() {
  return (
    <Routes>
      <Route path="/:tableId" element={
        <SessionProvider>
          <div className="font-serif bg-[#f8f9f9] text-[#2a2a2a] h-[100dvh] overflow-hidden flex flex-col">
            <Header />
            <MenuDisplay />
            <Cart />
            <Footer />
          </div>
        </SessionProvider>
      } />
      <Route path="*" element={
        <div className="flex items-center justify-center h-screen font-serif text-xl">
          📱 Please scan a QR code to view the menu.
        </div>
      } />
    </Routes>
  );
}