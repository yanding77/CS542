import Header from './components/Header';
import Cart from "./components/Cart.tsx";
import MenuDisplay from "./components/MenuDisplay.tsx";


export default function App() {

  return (
      <div className="font-serif bg-[#f8f9f9] text-[#2a2a2a]">
          <Header/>
          <MenuDisplay/>
          <Cart/>
      </div>
  );
}