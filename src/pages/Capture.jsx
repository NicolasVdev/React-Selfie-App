import { useState, useEffect, useRef } from 'react';
import { CaptureSelfie } from '../components/CaptureSelfie';

export const Capture = () => {
  const [selfie, setSelfie] = useState(null);
  const [videoStream, setVideoStream] = useState(null);
  const videoRef = useRef(null);

  useEffect(() => {
    const openCamera = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        setVideoStream(stream);
        videoRef.current.srcObject = stream;
      } catch (error) {
        console.error("Erreur lors de l'accès à la caméra : ", error);
      }
    };

    openCamera();

    return () => {
      if (videoStream) {
        videoStream.getTracks().forEach((track) => track.stop());
      }
    };
  }, [videoStream]);

  const handleCaptureSelfie = async () => {
    const selfieDataUrl = await CaptureSelfie();
    setSelfie(selfieDataUrl);
  };

  return (
    <>
      <div>
        <video ref={videoRef} autoPlay />
      </div>
      <button onClick={handleCaptureSelfie}>Capturer un Selfie</button>
      {selfie && (
        <div>
          <img src={selfie} alt="Selfie" />
          <Link to="/thanks">Terminer</Link>
        </div>
      )}
    </>
  );
};
