import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import permissionScrapper from '../permissionScrapper';
import userScrapper from '../userScrapper';

const Home = () => {
  const navigate = useNavigate();

  const { id, login, role } = userScrapper();

  useEffect(() => {
    if (id === null || login === null || role === null) navigate('/');
  }, [id, login, role, navigate]);

  const options = permissionScrapper();

  return (
    <>
      <div>
        <header className='section-header'>
          <h2>Witaj {login.charAt(0).toUpperCase() + login.slice(1)}</h2>
        </header>
        <ul className='options-container'>
          {options.map(
            (option) =>
              option.isFeatured && (
                <li className='options-item'>
                  <Link to={'/' + option.destination} className='options-link'>
                    <h4>{option.name}</h4>
                    <p>{option.description}</p>
                  </Link>
                </li>
              )
          )}
        </ul>
      </div>
    </>
  );
};

export default Home;
