import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { faTrash } from '@fortawesome/free-solid-svg-icons';


const Header = ({ itemCount, cartItems, onAddItem, onRemoveItem, onDeleteItem, onFinish }) => {
    const [cartOpen, setCartOpen] = useState(false);
  
    const toggleCart = () => {
      setCartOpen(!cartOpen);
    };
  
    const calculateTotal = () => {
      return cartItems.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
    };

    const handleCloseCart = () => {
        setCartOpen(false);
      };

      const handleFinish = () => {
        onFinish();
        setCartOpen(false);
        alert("Compra finalizada!");
      };
  
    return (
      <header className='header'>
        <h1 className='titulo'>MKS <span className='titulo menor'>Sistemas</span></h1>
        <div className="cart-icon" onClick={toggleCart}>
          <p><FontAwesomeIcon icon={faShoppingCart} /> </p>
          <span className="item-count">{itemCount}</span>
        </div>
        <div className={`cart-overlay ${cartOpen ? 'show-cart' : ''}`} onClick={toggleCart}></div>
        <div className={`cart ${cartOpen ? 'show-cart' : ''}`}>
        <button className="close-cart" onClick={handleCloseCart}>X</button>
          <h2>Carrinho</h2>
          <ul className="cart-items">
            {cartItems.map((item, index) => (
              <li key={index}>
                <button className="delete" onClick={() => onDeleteItem(item)}><FontAwesomeIcon icon={faTrash} /></button>
                <img src={item.photo} alt={item.name} />
                <div>
                  <h3>{item.name}</h3>
                  <span className="price">R${item.price}</span>
                  <button className="remove" onClick={() => onRemoveItem(item)}>-</button>
                  <span> {item.quantity} </span>
                  <button className="add" onClick={() => onAddItem(item)}>+</button>
                </div>
              </li>
            ))}
          </ul>
          <h3>Total: R$ {calculateTotal()}</h3>
          <h3><button className="buy" onClick={handleFinish}>Finalizar</button></h3>
        </div>
      </header>
    );
  };
  
  export default Header;