import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Modal from '../Modal/Modal';

const LogIn = ({ show, changeLoginVisibility }) => {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch(`http://localhost:3001/users?login=${login}&password=${password}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.length < 1) {
          alert('Nie donaleziono użytkownika');
          return;
        }
        localStorage.setItem(
          'userInfo',
          JSON.stringify([data[0].login, data[0].role])
        );
        console.log(localStorage.getItem('userInfo'));
        navigate('/home');
      });
  };

  return (
    <>
      <Modal show={show} changeVisibility={changeLoginVisibility}>
        <form class='login-modal-form' onSubmit={(e) => handleSubmit(e)}>
          <h2 className='login-modal-title'>Logowanie</h2>
          <input
            type='text'
            placeholder='Login'
            required
            value={login}
            onChange={(e) => setLogin(e.target.value)}
          />
          <input
            type='password'
            placeholder='Hasło'
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type='submit'>Zaloguj</button>
        </form>
      </Modal>
    </>
  );
};

export default LogIn;
