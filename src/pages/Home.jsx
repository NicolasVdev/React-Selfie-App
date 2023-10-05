import { useState } from 'react'
import { Link } from 'react-router-dom';


export const Home = () => {
  const [email, setEmail] = useState('');
  const saveEmailToLocalStorage = () => {
    localStorage.setItem("email", email);
  };

  return (
    <>
      <h1>
        Home
      </h1>
      <input type="text" value={email} onChange={(e) => setEmail(e.target.value)}
      placeholder='email@exemple.fr'
      />
      <Link to="/capture" onClick={saveEmailToLocalStorage}>
        suivant
      </Link>
    </>
  )
}
