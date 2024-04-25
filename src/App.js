import React, { useEffect, useState } from 'react';
import { fetchProducts } from './services/api';
import Card from './components/ResultCard';
import Header from './components/Header';
import './styles/App.css'

const App = () => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchProducts(1, 8, 'name', 'ASC');
        setProducts(data.products);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handleBuy = (product) => {
    const existingItem = cart.find(item => item.id === product.id);
    if (existingItem) {
      const updatedCart = cart.map(item =>
        item.id === existingItem.id ? { ...item, quantity: item.quantity + 1 } : item
      );
      setCart(updatedCart);
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  const handleAddItem = (item) => {
    const updatedCart = cart.map(cartItem =>
      cartItem.id === item.id ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem
    );
    setCart(updatedCart);
  };

  const handleRemoveItem = (item) => {
    const updatedCart = cart.map(cartItem =>
      cartItem.id === item.id ? { ...cartItem, quantity: cartItem.quantity - 1 } : cartItem
    ).filter(cartItem => cartItem.quantity > 0);
    setCart(updatedCart);
  };

  const handleDeleteItem = (item) =>{
    const updatedCart = cart.map(cartItem =>
      cartItem.id === item.id ? { ...cartItem, quantity: cartItem.quantity = 0 } : cartItem
    ).filter(cartItem => cartItem.quantity > 0);
    setCart(updatedCart);
  }
  const handleFinish = () => {
    setCart([]); // Limpa o carrinho
  };

  return (
    <div className="App">
      <Header itemCount={cart.reduce((total, item) => total + item.quantity, 0)} 
        cartItems={cart} 
        onAddItem={handleAddItem} 
        onRemoveItem={handleRemoveItem} 
        onDeleteItem={handleDeleteItem}
        onFinish={handleFinish}
      />
      <div className="card-container">
        {products.map(product => (
          <Card key={product.id} product={product} onBuy={handleBuy} />
        ))}
      </div>
    </div>
  );
};

export default App;
