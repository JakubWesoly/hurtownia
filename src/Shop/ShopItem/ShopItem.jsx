import React, { useEffect, useState } from 'react';
import Modal from '../../Modal/Modal';
import NumberSelector from '../../NumberSelector/NumberSelector';

const ShopItem = ({ item, update }) => {
  const [isModalShown, setIsModalShown] = useState(false);
  const [size, setSize] = useState(1);
  const [seller, setSeller] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:3001/users?id=${item.sellerId}`)
      .then((res) => res.json())
      .then((data) => setSeller(data[0]))
      .catch((err) => console.error(err));
  }, [item.sellerId]);

  const handleAddingProduct = () => {
    const cart = JSON.parse(localStorage.getItem('cart'));

    if (cart == null) {
      localStorage.setItem(
        'cart',
        JSON.stringify([
          {
            productId: item.id,
            productName: item.name,
            productQuantity: size,
            productPrice: item.price * size,
            sellerId: seller.id,
            buyerId: JSON.parse(localStorage.getItem('userInfo'))[0],
          },
        ])
      );
    } else {
      let hasFound = false;
      for (let i = 0; i < cart.length; i++) {
        if (cart[i].productId === item.id) {
          cart[i].productPrice += parseInt(item.price) * parseInt(size);
          cart[i].productQuantity =
            parseInt(cart[i].productQuantity) + parseInt(size);
          hasFound = true;
          break;
        }
      }
      if (!hasFound) {
        cart.push({
          productId: item.id,
          productName: item.name,
          productQuantity: size,
          productPrice: item.price * size,
          sellerId: seller.id,
          buyerId: JSON.parse(localStorage.getItem('userInfo'))[0],
        });
      }
      localStorage.setItem('cart', JSON.stringify(cart));
    }
    update(JSON.parse(localStorage.getItem('cart')));
    alert('dodano do koszyka');
  };

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
          <p>Sprzedawca: {seller.login}</p>
          <pre>{item.desc}</pre>
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
          <button
            className='button-small'
            onClick={() => {
              handleAddingProduct();
            }}
          >
            Dodaj do koszyka
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default ShopItem;
