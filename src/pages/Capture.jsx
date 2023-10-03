import { useState } from 'react'
import { CaptureSelfie } from '../components/CaptureSelfie'

export const Capture = () => {
  const [selfie, setSelfie] = useState(null);
  return (
    <div>
      <button onClick={CaptureSelfie}>Capturer Selfie</button>
      {selfie && <img src={selfie} alt="Selfie" />}
    </div>
  )
}