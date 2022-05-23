import React, { useEffect, useState } from 'react';

import { Link, useLocation } from 'react-router-dom';
import permissionScrapper from '../permissionScrapper';

const Navigation = () => {
  const location = useLocation();
  const [permissions, setPermissions] = useState(permissionScrapper());
  useEffect(() => {
    setPermissions(permissionScrapper());
  }, [location.pathname]);
  return (
    <>
      <nav className='main-nav'>
        <header className='main-header'>
          <h1>
            <Link
              to='/home'
              className='link'
              style={{ justifyContent: 'left', display: 'inline' }}
            >
              Hurtownia
            </Link>
          </h1>
        </header>
        <nav className='menu'>
          <ul
            className='menu-list'
            style={{ gridTemplateColumns: permissionScrapper(true) }}
          >
            {permissions.map((permission) => (
              <li className='menu-item' key={permission.id}>
                <Link to={'/' + permission.destination} className='link'>
                  {permission.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </nav>
    </>
  );
};

export default Navigation;
