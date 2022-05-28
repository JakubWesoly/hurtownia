import React, { useEffect, useState } from 'react';

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
          (item) =>
            item.quantity > 0 && (
              <div className='section-shop-item' key={item.id}>
                <h3>{item.name}</h3>
                <img src={item.imageUrl} alt='Kukurydza' />
                <p>
                  {item.quantity} szt. | {item.price}zł
                </p>
                <button className='button-small'>Zobacz Więcej</button>
              </div>
            )
        )}
      </div>
    </>
  );
};

export default Shop;
