import { useNavigate, Link } from 'react-router-dom';
import { useAtom } from 'jotai';
import { countAtom } from '../store/Atom';
import { storeSelfieInSupabase } from '../services/SelfiesFetch';

export const PhotoPage = ({imageUrl}) => {
  const [count, setCount] = useAtom(countAtom);
  const navigate = useNavigate();

  const storeSelfieAndNavigate = async () => {
    if (imageUrl) {
      try {
        await storeSelfieInSupabase(imageUrl);
        console.log('Selfie stocké avec succès');
      } catch (error) {
        console.error('Erreur lors du stockage du selfie');
      }
    }
    navigate('/thank_you');
  }

  const lastChanceOrNot = () => {
    if (count > 0) {
      setCount(count - 1);
      navigate('/capture');
    }
  };

  if (count > 0) {
  return (
    <div>
      {imageUrl && <img src={imageUrl} alt="Selfie" />}
      <div className='button-container'>
        <button onClick={lastChanceOrNot}>TRY AGAIN</button>
        <button onClick={storeSelfieAndNavigate}>BG</button>
    </div>
    </div>
  )} else {
    return (
      <div>
      {imageUrl && <img src={imageUrl} alt="Selfie" />}
      <div className='button-container'>
        <Link to='/thank_you' onClick={storeSelfieAndNavigate}>BG</Link>
      </div>
    </div>
    )
  }
}