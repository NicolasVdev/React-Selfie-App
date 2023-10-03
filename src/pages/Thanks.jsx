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
    }
  }, 1000);
    return () => clearTimeout(restart);
  }, [countdown, navigate]);

  return (
    <>
      <div>Thanks for your participation</div>
      <div>Redirection in {countdown} seconds</div>
    </>
  )
}
