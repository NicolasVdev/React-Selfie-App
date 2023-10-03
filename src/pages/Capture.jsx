import { useState } from 'react';
import { Link } from 'react-router-dom';
import { CaptureSelfie } from '../components/CaptureSelfie';

export const Capture = () => {
  const [selfie, setSelfie] = useState(null);

  const handleCaptureSelfie = async () => {
    const selfieDataUrl = await CaptureSelfie();
    setSelfie(selfieDataUrl);
  };

  return (
    <div>
      <button onClick={handleCaptureSelfie}>Capturer Selfie</button>
      {selfie && <img src={selfie} alt="Selfie" />}
      <Link to="/thanks">Terminer</Link>
    </div>
  );
};
