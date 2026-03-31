import Header from './components/Header';
import MenuCategories from './components/MenuCategories';
import {categories, menu} from "./data/items.js";
import MenuItems from './components/MenuItems';
import bgImage from '/pics/kk.jpeg';

export default function App() {
  const selectedCategory = 'Tacos';

  const handleSelectCategory = (category) => {
    console.log(category);
  };

  return (
      <div className="font-serif bg-[#f8f9f9] text-[#2a2a2a]">
          <Header />

        <div className="grid grid-cols-[40%_1fr] md:grid-cols-[30%_1fr] items-start overflow-hidden">
              <MenuCategories
                  categories={categories}
                  selectedCategory={selectedCategory}
                  onSelectCategory={handleSelectCategory}
                  backgroundImage={bgImage}
              />
              <MenuItems menuItems={menu} />
          </div>
      </div>
  );
}