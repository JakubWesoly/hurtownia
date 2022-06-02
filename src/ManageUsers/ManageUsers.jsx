import React, { useEffect, useState } from 'react';
import UserOption from './UserOption/UserOption';

const ManageUsers = () => {
  const [selectedOption, setSelectedOption] = useState(false);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3001/users')
      .then((res) => res.json())
      .then((data) => setUsers(data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <>
      <header className='section-header'>
        <h2>Zarządzaj użytkownikami</h2>
      </header>
      <ul className='user-list'>
        {users.map((item) => (
          <UserOption item={item} />
        ))}
      </ul>
    </>
  );
};

export default ManageUsers;
