import React, { useState, useEffect, useRef } from 'react';
import { CaptureSelfie } from '../components/CaptureSelfie';
import { Link } from 'react-router-dom';

export const Capture = () => {
  const videoRef = useRef(null);
  const photoRef = useRef(null);
  const [hasPhoto, setHasPhoto] = useState(false);
  const [videoStream, setVideoStream] = useState(null);

  const getVideo = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: { width: 1280, height: 720 } });
      let video = videoRef.current;
      video.srcObject = stream;

      video.onloadedmetadata = () => {
        video.play();
        setVideoStream(stream);
      };

    } catch (error) {
      console.error("Erreur lors de l'accès à la caméra : ", error);
    }
  };

  useEffect(() => {
    getVideo();

    return () => {
      // Arrêtez le flux vidéo lorsque le composant est démonté
      if (videoStream) {
        videoStream.getTracks().forEach((track) => track.stop());
      }
    };
  }, []);

  const handleCaptureSelfie = async () => {
    try {
      const selfieDataUrl = await CaptureSelfie();
      setHasPhoto(true);

      // Arrêtez le flux vidéo
      if (videoStream) {
        videoStream.getTracks().forEach((track) => track.stop());
      }

      // Afficher le selfie capturé dans l'élément canvas
      const canvas = photoRef.current;
      const ctx = canvas.getContext('2d');
      const img = new Image();
      img.src = selfieDataUrl;
      img.onload = () => {
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0);
      };
    } catch (error) {
      console.error("Erreur lors de la capture du selfie : ", error);
    }
  };

  return (
    <div className='App'>
      <div className="camera">
        {hasPhoto ? (
          // Afficher le canvas à la place du flux vidéo
          <canvas ref={photoRef} />
        ) : (
          // Afficher le flux vidéo
          <video ref={videoRef} autoPlay />
        )}
        {hasPhoto ? (
          <Link to="/thank_you">
            <button>Terminer</button>
          </Link>
        ) : (
          <button onClick={handleCaptureSelfie}>Capturer un Selfie</button>
        )}
      </div>
    </div>
  );
};
