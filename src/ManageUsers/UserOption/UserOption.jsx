import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import { AiOutlineClose } from 'react-icons/ai';

const UserOption = ({ item, update }) => {
  const selectRef = useRef(null);
  const checkboxRef = useRef(null);

  const [isVerified, setIsVerified] = useState(item.verified);

  useEffect(() => {
    console.log(item.verified);
    selectRef.current.selectedIndex = item.role;
  }, []);

  useEffect(() => {
    checkboxRef.current.disabled = item.role == '0';
  }, [item]);

  const handleUpdate = () => {
    fetch(`http://localhost:3001/users/${item.id}`, {
      method: 'PATCH',
      body: JSON.stringify({
        role: selectRef.current.value,
        verified: checkboxRef.current.checked,
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    })
      .then((res) => console.log(res))
      .then(() => update());
  };

  const handleDelete = () => {
    fetch(`http://localhost:3001/users/${item.id}`, { method: 'DELETE' })
      .then(() => alert('usunięto'))
      .then(() => update());
  };

  return (
    <li className='user-item'>
      <section>{item.login}</section>
      <section>
        <select ref={selectRef} onChange={() => handleUpdate()}>
          <option value='0'>Admin</option>
          <option value='1'>Klient</option>
          <option value='2'>Sprzedawca</option>
        </select>
      </section>
      <section>
        <input
          type='checkbox'
          value={isVerified}
          checked={isVerified}
          ref={checkboxRef}
          onChange={(e) => {
            setIsVerified(!isVerified);
            handleUpdate();
          }}
          id={'isVerified' + item.id}
        />{' '}
        <label htmlFor={'isVerified' + item.id}>Zweryfikowany</label>
      </section>
      <section>
        <AiOutlineClose
          className='cart-close'
          onClick={() => {
            handleDelete();
          }}
        />
      </section>
    </li>
  );
};

export default UserOption;
