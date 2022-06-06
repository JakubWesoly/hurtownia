import React, { useEffect, useState } from 'react';
import { BsCart4 } from 'react-icons/bs';
import { AiOutlineClose } from 'react-icons/ai';
import Modal from '../Modal/Modal';
import ShopItem from './ShopItem/ShopItem';
import axios from 'axios';

const Shop = () => {
  const [items, setItems] = useState([]);
  const [cartItems, setCartItems] = useState(
    JSON.parse(localStorage.getItem('cart')) || []
  );
  const [isCartShown, setIsCartShown] = useState(false);

  const getQuantity = async (item) => {
    return axios
      .get(`http://localhost:3001/products/${item.productId}`)
      .then((res) => {
        return res.data.quantity;
      });
  };

  useEffect(() => {
    fetch('http://localhost:3001/products')
      .then((res) => res.json())
      .then((data) => {
        setItems(data);
      });
  }, []);

  const handleSubmit = async () => {
    cartItems.forEach(async (item) => {
      const available = await getQuantity(item);
      if (available >= item.productQuantity) {
        axios
          .post('http://localhost:3001/orders', {
            ...item,
            status: '0',
          })
          .then((res) => {
            axios.patch(`http://localhost:3001/products/${item.productId}`, {
              quantity: available - item.productQuantity,
            });
          })
          .then(() => alert('Poprawnie dodano element'))
          .catch((err) => {
            alert('Dodanie elementu nie powiodło się');
            console.error(err);
          });
      } else {
        alert('Dodanie elementu nie powiodło się');
      }
    });
  };

  return (
    <>
      <header className='section-header'>
        <h2>Sklep</h2>
      </header>
      <div className='section-shop'>
        {items.map(
          (item) =>
            item.quantity > 0 && (
              <ShopItem item={item} update={setCartItems} key={item.id} />
            )
        )}
      </div>
      <div className='section-shop-cart' onClick={() => setIsCartShown(true)}>
        <BsCart4 style={{ marginTop: '12px' }} />
      </div>
      <Modal show={isCartShown} changeVisibility={setIsCartShown}>
        <div className='section-shop-cart-modal'>
          <h2>Koszyk</h2>
          <ul className='options-container cart-container'>
            {cartItems.map((item, index) => {
              return (
                <li className='options-item cart-item'>
                  <p>{item.productName}</p>
                  <p>Ilość: {item.productQuantity}szt.</p>
                  <p>Cena: {item.productPrice}zł</p>
                  <AiOutlineClose
                    className='cart-close'
                    onClick={() => {
                      setCartItems(
                        cartItems.filter(
                          (it) => it.productName !== item.productName
                        )
                      );
                      localStorage.removeItem('cart');
                      localStorage.setItem(
                        'cart',
                        JSON.stringify(
                          cartItems.filter(
                            (it) => it.productName !== item.productName
                          )
                        )
                      );
                    }}
                  />
                </li>
              );
            })}
          </ul>
          <div className='cart-summary'>
            <button className='button-small' onClick={handleSubmit}>
              Złóż zamówienie
            </button>
            <p style={{ justifySelf: 'right' }}>
              Łączny koszt: &nbsp;
              {cartItems.reduce(
                (total, currentValue) =>
                  (total = total + currentValue.productPrice),
                0
              )}
              zł
            </p>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default Shop;
