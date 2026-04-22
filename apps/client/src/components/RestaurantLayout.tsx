import Header from './Header';
import Cart from "./Cart";
import MenuDisplay from "./MenuDisplay";
import Footer from './Footer';
import { useSession } from '../hooks/GuestIDContext';
import { useCart } from '../hooks/CartHook';
import ScanQRMessage from './ScanQRMessage';

export default function RestaurantLayout() {
  const { tableId } = useSession();
  const { isError } = useCart(tableId);

  if (isError) {
    return <ScanQRMessage />;
  }

  return (
    <div className="font-serif bg-[#f8f9f9] text-[#2a2a2a] h-[100dvh] overflow-hidden flex flex-col">
      <Header />
      <MenuDisplay />
      <Cart />
      <Footer />
    </div>
  );
}
