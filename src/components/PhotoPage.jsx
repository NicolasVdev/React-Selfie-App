import { useNavigate, Link } from 'react-router-dom';
import { useAtom } from 'jotai';
import { countAtom } from '../store/Atom';
import { storeSelfieInSupabase } from '../services/SelfiesFetch';
import { sendEmailWithSelfie } from '../services/Mailer';
import { getEmailFromLastRecord } from '../services/EmailsFetch';

export const PhotoPage = ({imageUrl}) => {
  const [count, setCount] = useAtom(countAtom);
  const navigate = useNavigate();

  const storeSelfieAndNavigate = async () => {
    if (imageUrl) {
      try {
        const email = await getEmailFromLastRecord();
        if (!email) {
          console.error('E-mail introuvable dans la base de données.');
          return;
        }
        const selfieUrl = await storeSelfieInSupabase(imageUrl);
        if (selfieUrl) {
          sendEmailWithSelfie(email, imageUrl);
          console.log('Selfie stocké avec succès et e-mail envoyé');
        } else {
          console.error('Erreur lors du stockage du selfie');
        }
      } catch (error) {
        console.error('Erreur lors du stockage du selfie', error);
      }
    }
    navigate('/thank_you');
  };

  const lastChanceOrNot = () => {
    if (count > 0) {
      setCount(count - 1);
      navigate('/capture');
    }
  };

  if (count > 0) {
  return (
    <div className='webcam-container'>
      {imageUrl && <img src={imageUrl} alt="Selfie" />}
      <div className='button-container'>
        <button onClick={lastChanceOrNot}>TRY AGAIN</button>
        <button onClick={storeSelfieAndNavigate}>BG</button>
    </div>
    </div>
  )} else {
    return (
      <div className='webcam-container'>
      {imageUrl && <img src={imageUrl} alt="Selfie" />}
      <div className='button-container'>
        <Link to='/thank_you' onClick={storeSelfieAndNavigate}>BG</Link>
      </div>
    </div>
    )
  }
}