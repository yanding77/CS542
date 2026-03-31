import Header from './components/Header';
import MenuCategories from './components/MenuCategories';
import {categories} from "./data/items.js";
import bgImage from '/pics/kk.jpeg';

export default function App() {
  const selectedCategory = 'Tacos';

  const handleSelectCategory = (category) => {
    console.log(category);
  };

  return (
      <div className="font-sans bg-[#f8f9f9] text-[#2a2a2a]">
          <Header />

        <div className="grid grid-cols-[40%_1fr] md:grid-cols-[30%_1fr] items-start overflow-hidden">
              <MenuCategories
                  categories={categories}
                  selectedCategory={selectedCategory}
                  onSelectCategory={handleSelectCategory}
                  backgroundImage={bgImage}
              />
          <main className="bg-[#05161A] rounded-[10px]">
          </main>
          </div>
      </div>
  );
}