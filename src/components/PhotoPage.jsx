import { useNavigate, Link } from 'react-router-dom';
import { useAtom } from 'jotai';
import { countAtom } from '../store/Atom';

export const PhotoPage = ({imageUrl}) => {
  const [count, setCount] = useAtom(countAtom);
  console.log(countAtom);
  const navigate = useNavigate();

  const lastChanceOrNot = () => {
    if (count > 0) {
      setCount(count - 1);
      navigate('/capture');
      console.log(count);
    } else {
      setCount(2);
      navigate('/thank_you');
    }
  };

  if (count > 0) {
  return (
    <div>
      {imageUrl && <img src={imageUrl} alt="Selfie" />}
      <div className='button-container'>
        <button onClick={lastChanceOrNot}>TRY AGAIN</button>
        <Link to="/thank_you">BG</Link>
    </div>
    </div>
  )} else {
    return (
      <div>
      {imageUrl && <img src={imageUrl} alt="Selfie" />}
      {navigate('/thank_you')}
    </div>
    )
  }
}