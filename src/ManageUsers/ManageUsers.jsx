import React, { useEffect, useState } from 'react';
import UserOption from './UserOption/UserOption';
import Register from '../Register/Register';
import { GrFormAdd } from 'react-icons/gr';

const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [showAddingUser, setShowAddingUser] = useState(false);

  const updateUsers = () => {
    fetch('http://localhost:3001/users')
      .then((res) => res.json())
      .then((data) => setUsers(data))
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    updateUsers();
  }, []);

  return (
    <>
      <header className='section-header'>
        <h2>Zarządzaj użytkownikami</h2>
      </header>
      <ul className='user-list'>
        {users
          .filter((i) => {
            return i.id != JSON.parse(localStorage.getItem('userInfo'))[0];
          })
          .map((item) => (
            <UserOption item={item} update={updateUsers} />
          ))}
      </ul>
      <div
        className='section-shop-cart'
        style={{ right: '50%', bottom: '25px' }}
        onClick={() => setShowAddingUser(true)}
      >
        <GrFormAdd style={{ marginTop: '12px' }} />
      </div>
      <Register
        show={showAddingUser}
        changeRegisterVisibility={setShowAddingUser}
        title={'Dodaj użytkownika'}
        isFromAdminPanel={true}
        update={updateUsers}
      />
    </>
  );
};

export default ManageUsers;
