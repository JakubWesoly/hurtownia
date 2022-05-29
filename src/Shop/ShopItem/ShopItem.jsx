import React, { useEffect, useState } from 'react';
import Modal from '../../Modal/Modal';
import NumberSelector from '../../NumberSelector/NumberSelector';

const ShopItem = ({ item }) => {
  const [isModalShown, setIsModalShown] = useState(false);
  const [size, setSize] = useState(1);
  const [seller, setSeller] = useState('');

  useEffect(() => {
    fetch(`http://localhost:3001/users?id=${item.sellerId}`)
      .then((res) => res.json())
      .then((data) => setSeller(data[0].login))
      .catch((err) => console.error(err));
  }, [item.sellerId]);

  return (
    <div className='section-shop-item' key={item.id}>
      <h3>{item.name}</h3>
      <img src={item.imageUrl} alt='Kukurydza' />
      <p>
        {item.quantity} szt. | {item.price}zł
      </p>
      <button className='button-small' onClick={() => setIsModalShown(true)}>
        Zobacz Więcej
      </button>
      <Modal show={isModalShown} changeVisibility={setIsModalShown}>
        <div className='section-shop-modal'>
          <img src={item.imageUrl} alt='kukurydza' srcset='' />
          <h3>{item.name}</h3>
          <p>Sprzedawca: {seller}</p>
          <p>{item.desc}</p>
          <p>
            {item.quantity} szt. | {item.price}zł
          </p>
          <NumberSelector
            number={size}
            setNumber={setSize}
            min='1'
            max={item.quantity}
          />
          <p>Cena produktu: {item.price * size}zł</p>
          <button className='button-small'>Dodaj do koszyka</button>
        </div>
      </Modal>
    </div>
  );
};

export default ShopItem;
