import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Home = ({ user }) => {
  const navigate = useNavigate();

  const [login, role] = user;

  return (
    <>
      <div>
        <h2>Hello {login}</h2>
      </div>
    </>
  );
};

export default Home;
