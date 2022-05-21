import React from 'react';

import Login from './../LogIn/LogIn'
import Register from './../Register/Register'

const Navigation = () => {
    return(
        <>
        <nav className='main-nav'>
            <header className="main-header">
                <h1>Hurtownia</h1>
            </header>
            <nav className="menu">
                <ul className='menu-list'>
                    {/* <li className='menu-item'>Logowanie</li>
                    <li className='menu-item'>Register</li> */}
                </ul>
            </nav>
        </nav>
        <Register />
        </>
    )
}

export default Navigation;