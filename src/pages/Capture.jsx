import React, { useState, useEffect, useRef } from 'react';
import { CaptureSelfie } from '../components/CaptureSelfie';
import { Link } from 'react-router-dom';

export const Capture = () => {
  const videoRef = useRef(null);
  const photoRef = useRef(null);
  const [hasPhoto, setHasPhoto] = useState(false);

  const getVideo = () => {
    navigator.mediaDevices.getUserMedia({ video: { width: 1920, height: 1080 } })
      .then(stream => {
        let video = videoRef.current;
        video.srcObject = stream;
        video.play();
      })
      .catch(err => {
        console.error(err);
      });
  };

  useEffect(() => {
    getVideo();
  }, []);

  const handleCaptureSelfie = async () => {
    try {
      const selfieDataUrl = await CaptureSelfie(videoRef, photoRef, setHasPhoto);
    } catch (error) {
      console.error("Erreur lors de la capture du selfie : ", error);
    }
  };

  return (
    <div className='App'>
      <div className="camera">
        <video ref={videoRef}></video>
        <button onClick={handleCaptureSelfie}>SNAP!</button>
      </div>
      <div className={`result${hasPhoto ? ' hasPhoto' : ''}`}>
        <canvas ref={photoRef} />
        {hasPhoto && (
          <Link to="/thank_you">CLOSE!</Link>
        )}
      </div>
    </div>
  );
};
