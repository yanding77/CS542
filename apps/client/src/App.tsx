import { Routes, Route } from 'react-router-dom';
import { SessionProvider } from './hooks/GuestIDContext.tsx';
import RestaurantLayout from './components/RestaurantLayout.tsx';
import ScanQRMessage from './components/ScanQRMessage.tsx';

export default function App() {
  return (
    <Routes>
      <Route path="/:tableId" element={
        <SessionProvider>
          <RestaurantLayout />
        </SessionProvider>
      } />
      <Route path="*" element={<ScanQRMessage />} />
    </Routes>
  );
}