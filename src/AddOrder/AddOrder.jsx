import axios from 'axios';
import React, { useRef, useState } from 'react';

const AddOrder = () => {
  const [name, setName] = useState('');
  const [desc, setDesc] = useState('');
  const [count, setCount] = useState(null);
  const [price, setPrice] = useState(null);
  const image = useRef();

  console.log(JSON.parse(localStorage.getItem('userInfo'))[0]);

  const uploadImage = () => {
    const CLOUDINARY_URL =
      'https://api.cloudinary.com/v1_1/dhk6z5vzz/image/upload';
    const CLOUDINARY_UPLOAD_PRESET = 'eebchsaz';
    const formData = new FormData();
    formData.append('file', image.current.files[0]);
    formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);
    return fetch(CLOUDINARY_URL, {
      method: 'POST',
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.secure_url !== '') {
          return data.secure_url;
        }
      })
      .catch((err) => console.error(err));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    axios
      .post('http://localhost:3001/products', {
        name: name,
        desc: desc,
        quantity: count,
        price: price,
        imageUrl: await uploadImage(),
        sellerId: JSON.parse(localStorage.getItem('userInfo'))[0],
      })
      .then((res) => alert('Poprawnie dodano produkt'))
      .catch((err) => console.error(err));
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
          <input type='file' accept='image/img, image/jpeg' ref={image} />
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
