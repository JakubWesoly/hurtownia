import React, { useEffect, useState } from 'react';
import ShopItem from './ShopItem/ShopItem';

const Shop = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3001/products')
      .then((res) => res.json())
      .then((data) => {
        setItems(data);
      });
  }, []);
  return (
    <>
      <header className='section-header'>
        <h2>Sklep </h2>
      </header>
      <div className='section-shop'>
        {items.map(
          (item) => item.quantity > 0 && <ShopItem item={item} key={item.id} />
        )}
      </div>
    </>
  );
};

export default Shop;
