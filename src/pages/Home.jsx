import { useState } from 'react'
import { Link } from 'react-router-dom';
import { OpenCamera } from '../components/OpenCamera';


export const Home = () => {
  const [email, setEmail] = useState('');
  const saveEmailToLocalStorage = () => {
    localStorage.setItem("email", email);
  };
  const handleClick = () => {
    saveEmailToLocalStorage();
    OpenCamera();
  };

  return (
    <>
      <h1>
        Home
      </h1>
      <input type="text" value={email} onChange={(e) => setEmail(e.target.value)}
      placeholder='email@exemple.fr'
      />
      <Link to="/capture" onClick={handleClick}>
        suivant
      </Link>
    </>
  )
}
