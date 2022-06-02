import React, { useRef, useState } from 'react';

import Modal from '../Modal/Modal';

const axios = require('axios');

const LogIn = ({ show, changeRegisterVisibility }) => {
  const [log, setLogin] = useState('');
  const [pass, setPassword] = useState('');

  const checkSeller = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post('http://localhost:3001/users', {
        login: log,
        password: pass,
        verified: false,
        role: checkSeller.current.checked ? 2 : 1,
      })
      .then((resp) => {
        alert('Poprawnie dodano użytkownika');
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <Modal show={show} changeVisibility={changeRegisterVisibility}>
        <form
          class='login-modal-form'
          style={{
            gridTemplateRows: '0.5fr 1fr 1fr 0.5fr 1fr',
          }}
          onSubmit={(e) => handleSubmit(e)}
        >
          <h2 className='login-modal-title'>Rejestracja</h2>
          <input
            type='text'
            placeholder='Login'
            value={log}
            onChange={(e) => setLogin(e.target.value)}
          />
          <input
            type='password'
            placeholder='Hasło'
            value={pass}
            onChange={(e) => setPassword(e.target.value)}
          />
          <label>
            <input
              type='checkbox'
              id='isSeller'
              ref={checkSeller}
              style={{ height: '12px' }}
            />{' '}
            &nbsp;
            <label htmlFor='isSeller'>Jestem Sprzedawcą</label>
          </label>
          <button type='submit'>Zarejestruj</button>
        </form>
      </Modal>
    </>
  );
};

export default LogIn;
