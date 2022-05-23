import axios from 'axios';
import React, { useState } from 'react';

const AddOrder = () => {
  const [name, setName] = useState('');
  const [desc, setDesc] = useState('');
  const [count, setCount] = useState(0);
  const [price, setPrice] = useState(0.0);

  const handleSubmit = (e) => {
    e.preventDefault();

    alert('działa');
    // axios.post()
  };

  return (
    <>
      <header className='section-header'>
        <h2>Dodaj zamówienie</h2>
      </header>
      <section className='add-order-section'>
        <form className='add-order-form'>
          <p>Nazwa produktu: </p>
          <input
            type='text'
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <p>Opis produktu: </p>
          <textarea
            cols='30'
            required
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
          ></textarea>
          <p>Ilość produktu: </p>
          <input
            type='number'
            min='0'
            required
            value={count}
            onChange={(e) => setCount(e.target.value.replace(/[^0-9]/g, ''))}
          />
          <p>Cena produktu: </p>
          <input
            type='number'
            min='0'
            required
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
          <p>Zdjęcie produktu: </p>
          <input type='file' />
          <button
            className='button-small'
            style={{ gridColumnStart: '1', gridColumnEnd: '3', width: '100%' }}
            type='submit'
            onClick={(e) => handleSubmit(e)}
          >
            Zapisz
          </button>
        </form>
      </section>
    </>
  );
};

export default AddOrder;
