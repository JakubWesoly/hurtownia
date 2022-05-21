import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LogIn from '../LogIn/LogIn';
import Register from '../Register/Register';

const Homepage = () => {
  const [isLoginShown, setIsLoginShown] = useState(false);
  const [isRegisterShown, setIsRegisterShown] = useState(false);

  const changeLoginVisibility = (value) => setIsLoginShown(value);
  const changeRegisterVisibility = (value) => setIsRegisterShown(value);

  const navigate = useNavigate();
  useEffect(() => {
    if (localStorage.getItem('userInfo') != null) navigate('/home');
  }, [navigate]);

  return (
    <div className='hero-section'>
      <div className='hero-center'>
        <h2 className='hero-title'>Zacznij pracę</h2>
        <h3 className='hero-subtitle'>zaloguj się lub zarejestruj</h3>
        <div className='hero-buttons'>
          <button
            className='button-small'
            onClick={() => {
              setIsLoginShown(true);
            }}
          >
            Zaloguj
          </button>
          <button
            className='button-small'
            onClick={() => {
              setIsRegisterShown(true);
            }}
          >
            Zarejestruj
          </button>
        </div>
      </div>
      <LogIn
        show={isLoginShown}
        changeLoginVisibility={changeLoginVisibility}
      />
      <Register
        show={isRegisterShown}
        changeRegisterVisibility={changeRegisterVisibility}
      />
    </div>
  );
};

export default Homepage;
