import { useCallback, useRef, useState } from 'react';
import Webcam from 'react-webcam';
import { useNavigate } from 'react-router-dom';
import btn from '../assets/btn_ipad.svg';

const videoConstraints = {
  width: 1280,
  height: 720,
  facingMode: 'user'
}

export const Camera = () => {
  const [url, setUrl] = useState(null);
  const webcamRef = useRef(null);
  const navigate = useNavigate();
  const capturePhoto = useCallback(async() => {
    const imageSrc = webcamRef.current.getScreenshot();
    setUrl(imageSrc);
    navigate('/show', { state: { imageUrl: imageSrc } });
  }, [webcamRef, navigate])

  const onUserMedia = (e) => {
  }

  return (
    <div className='webcam-container'>
      <Webcam
      ref={webcamRef}
      audio={false}
      screenshotFormat='image/webp'
      videoConstraints={videoConstraints}
      onUserMedia={onUserMedia}
      mirrored={true}
      />
      <div className='button-container'>
        <button onClick={capturePhoto}>
          <img src={btn} className='w-16' />
        </button>
      </div>
      {url && (
        <div>
          <img src={url} alt="Screenshot" />
        </div>
      )}
    </div>
  )
}