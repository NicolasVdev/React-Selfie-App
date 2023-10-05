import { PhotoPage } from '../components/PhotoPage'
import { useLocation } from 'react-router-dom';

export const Show = () => {
  const location = useLocation();
  const imageUrl = location.state ? location.state.imageUrl : null;

  return (
    <div>
       <PhotoPage imageUrl={imageUrl} />
    </div>
  )
}
