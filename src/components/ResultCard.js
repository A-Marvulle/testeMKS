import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingBag } from '@fortawesome/free-solid-svg-icons';

const Card = ({ product, onBuy }) => {
  return (
    <div className="card">
        <div className='card-info'>
            <p className='img-container'><img className='img' src={product.photo} alt={product.name} /></p>
            <h3 className='name'>{product.name}</h3>
            <p className='description'>{product.description}</p>
            <p className='price'><span>R$ {product.price}</span></p>
        </div>
        <button onClick={() => onBuy(product)} className='btn comprar'><FontAwesomeIcon icon={faShoppingBag} /> Comprar</button>
    </div>
  );
};

export default Card;

