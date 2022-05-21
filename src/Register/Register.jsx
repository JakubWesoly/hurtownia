import React, { useState } from 'react';

import Modal from '../Modal/Modal';

const axios = require('axios');

const LogIn = ({ show, changeRegisterVisibility }) => {
  const [log, setLogin] = useState('');
  const [pass, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post('http://localhost:3001/users', {
        login: log,
        password: pass,
        role: 0,
      })
      .then((resp) => {
        console.log('Poprawnie dodano użytkownika');
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <Modal show={show} changeVisibility={changeRegisterVisibility}>
        <form class='login-modal-form' onSubmit={(e) => handleSubmit(e)}>
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
          <button type='submit'>Zarejestruj</button>
        </form>
      </Modal>
    </>
  );
};

export default LogIn;
