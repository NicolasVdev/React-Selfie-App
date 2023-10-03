import { useState } from 'react';
import { Link } from 'react-router-dom';

export const Home = () => {
  const [email, setEmail] = useState('');

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const saveEmailToLocalStorage = () => {
    localStorage.setItem("email", email);
  };

  return (
    <>
      <h1>Home</h1>
      <input
        type="text"
        value={email}
        onChange={handleEmailChange}
        placeholder='email@exemple.fr'
      />
      <Link to="/capture" onClick={saveEmailToLocalStorage}>
        Suivant
      </Link>
    </>
  );
};
