import React, { useState, useRef, useEffect } from 'react';
import MenuCategories from './components/MenuCategories';
import MenuItems from './components/MenuItems';
import Cart from './components/Cart';
import Payment from './components/Payment';
import Footer from './components/footer';

function App() {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [cart, setCart] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const [menuItems, setMenuItems] = useState([]);
  const [itemQuantities, setItemQuantities] = useState({});
  const menuItemsRef = useRef(null);


  const handleSelectCategory = (category) => {
    setSelectedCategory(category);

    if (menuItemsRef.current) {
      const menuItemsContainer = menuItemsRef.current;
      const categoryItems = menuItemsRef.current.querySelectorAll(`[data-category="${category}"]`);

      if (categoryItems.length > 0) {
        const targetItem = categoryItems[0];
        const containerTop = menuItemsContainer.getBoundingClientRect().top;
        const targetTop = targetItem.getBoundingClientRect().top;
        const scrollOffset = targetTop - containerTop + menuItemsContainer.scrollTop;

        menuItemsContainer.scrollTo({
          top: scrollOffset,
          behavior: 'smooth',
        });
      }
    }
  };

  const handleAddToCart = (item) => {
    setCart((prevCart) => [...prevCart, item]);
    const newQuantities = { ...itemQuantities };
    newQuantities[item.name] = (newQuantities[item.name] || 0) + 1;
    setItemQuantities(newQuantities);
  };

  const handleRemoveFromCart = (itemToRemove) => {
    setCart((prevCart) => {
      const index = prevCart.findIndex(item => item.name === itemToRemove.name);
      if (index !== -1) {
        const updatedCart = [...prevCart];
        updatedCart.splice(index, 1);
        return updatedCart;
      }
      return prevCart;
    });
    const newQuantities = { ...itemQuantities };
    if (newQuantities[itemToRemove.name]) {
      newQuantities[itemToRemove.name] -= 1;
      if (newQuantities[itemToRemove.name] === 0) {
        delete newQuantities[itemToRemove.name];
      }
    }
    setItemQuantities(newQuantities);
  };

  const handleCartButtonClick = () => {
    setShowCart(!showCart);
  };

  const handleGoBack = () => {
    setShowCart(false);
  };

  const handleClearCart = () => {
    setCart([]);
    setItemQuantities({});
  };

  return (
      <div>
        <header className="App-header">
        <h1>Restaurant App
        </h1>
      </header>
      </div>
  );
}

export default App;
