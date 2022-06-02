import React, { useEffect, useRef, useState } from 'react';
import { AiOutlineClose } from 'react-icons/ai';

const UserOption = ({ item }) => {
  const selectRef = useRef(null);

  const [isVerified, setIsVerified] = useState(item.verified);

  useEffect(() => {
    selectRef.current.selectedIndex = item.role;
  }, []);

  return (
    <li className='user-item'>
      <section>{item.login}</section>
      <section>
        <select ref={selectRef}>
          <option value='0'>Admin</option>
          <option value='1'>Klient</option>
          <option value='2'>Sprzedawca</option>
        </select>
      </section>
      <section>
        <input
          type='checkbox'
          value={isVerified}
          onChange={(e) => {
            setIsVerified(!isVerified);
            alert(isVerified);
          }}
          id={'isVerified' + item.id}
        />{' '}
        <label htmlFor={'isVerified' + item.id}>Zweryfikowany</label>
      </section>
      <section>
        <AiOutlineClose className='cart-close' />
      </section>
    </li>
  );
};

export default UserOption;
