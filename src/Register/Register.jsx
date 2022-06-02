import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Modal from '../Modal/Modal';

const axios = require('axios');

const Register = ({
  title,
  show,
  changeRegisterVisibility,
  isFromAdminPanel,
  update,
}) => {
  const [log, setLogin] = useState('');
  const [pass, setPassword] = useState('');

  const checkType = useRef(null);

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch(`http://localhost:3001/users?login=${log}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.length === 0) {
          axios
            .post('http://localhost:3001/users', {
              login: log,
              password: pass,
              verified: isFromAdminPanel,
              role: checkType.current.value,
            })
            .then((resp) => {
              if (!isFromAdminPanel) {
                localStorage.setItem(
                  'userInfo',
                  JSON.stringify([
                    resp.data.id,
                    resp.data.login,
                    resp.data.role,
                    resp.data.verified,
                  ])
                );
                navigate('/home');
              } else {
                update();
              }
              alert('Poprawnie dodano użytkownika');
            })
            .catch((error) => {
              console.log(error);
            });
        } else {
          alert('Użytkownik z takim loginem już istnieje');
        }
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
          <h2 className='login-modal-title'>{title || 'Rejestracja'}</h2>
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
          <select ref={checkType}>
            {isFromAdminPanel && <option value='0'>Admin</option>}
            <option value='1'>Klient</option>
            <option value='2'>Sprzedawca</option>
          </select>
          <button type='submit'>{title || 'Rejestracja'}</button>
        </form>
      </Modal>
    </>
  );
};

export default Register;
