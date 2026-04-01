import Header from './components/Header';
import MenuCategories from './components/MenuCategories';
import {categories, menu} from "./data/items.ts";
import MenuItems from './components/MenuItems';
import {useState, useRef} from "react";
import type {menuRefs} from "./types/menuTypes.ts";
import Cart from "./components/Cart.tsx";


export default function App() {
    const [selectedCategory, setSelectedCategory] = useState('Entradas');
    const itemRefs = useRef<menuRefs>({});

    const getCategoryId = (category: string) => `cat-${category.toLowerCase().replace(/\s+/g, '-')}`;

    const handleSelectCategory = (category: string) => {
        setSelectedCategory(category);
        const catId = getCategoryId(category);
        const node = itemRefs.current[catId];

        if (node) {
            node.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    };

  return (
      <div className="font-serif bg-[#f8f9f9] text-[#2a2a2a]">
          <Header />

        <div className="grid grid-cols-[40%_1fr] md:grid-cols-[30%_1fr] items-start">
              <MenuCategories
                  categories={categories}
                  selectedCategory={selectedCategory}
                  onSelectCategory={handleSelectCategory}
              />
              <MenuItems menuItems={menu} itemRefs={itemRefs} />
          </div>
          <Cart></Cart>
      </div>
  );
}