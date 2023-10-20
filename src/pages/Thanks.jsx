import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

export const Thanks = () => {
  const navigate = useNavigate();
  const [countdown, setCountdown] = useState(10);

  useEffect(() => {
    const restart = setInterval(() => {
      if (countdown > 0) {
        setCountdown(countdown - 1);
      } else {
        clearInterval(restart)
        navigate('/');
        window.location.reload();
      }
    }, 1000);
    return () => clearTimeout(restart);
  }, [countdown, navigate]);

  return (
    <div className='flex flex-col items-center w-screen h-screen justify-center pb-20'>
      <p className="text-white text-6xl font-bold text-center py-10">
        Merci de votre participation !
      </p>
      <p className="text-center font-semibold flex flex-col pb-12 text-5xl">
        Profitez-bien du concert 🎸
      </p>
      <div className='text-center pt-20'>
        Retour à l'accueil dans {countdown} secondes
      </div>
    </div>
  )
}
