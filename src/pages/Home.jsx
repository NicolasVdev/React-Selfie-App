import * as yup from 'yup';
import { useForm} from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigate } from 'react-router-dom';
import { checkCameraPermission } from '../store/Permissions';

export const Home = () => {
  const navigate = useNavigate();
  const handleCameraAccess = async () => {
    const cameraPermissionGranted = await checkCameraPermission();
    
    if (cameraPermissionGranted) {
      // L'autorisation de la caméra est accordée, vous pouvez naviguer vers la page de capture.
      navigate('/capture');
    } else {
      // L'autorisation de la caméra n'est pas accordée, vous pouvez demander à l'utilisateur de l'autoriser.
      alert('Pour utiliser la caméra, veuillez autoriser l\'accès à la caméra.');
    }
  };
  const saveEmailToLocalStorage = (data) => {
    const { email } = data;
    const existingEmails = JSON.parse(localStorage.getItem('emails')) || [];
    if (existingEmails.includes(email)) {
      alert("Cet e-mail a déjà été utilisé, veuillez en choisir un autre");
      return;
    }
    existingEmails.push(email);
    localStorage.setItem('emails', JSON.stringify(existingEmails));
    navigate("/capture");
  };
  const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g
  const schema = yup.object().shape({
    email: yup.string().required("L'email doit être requis").matches(emailRegex, "L'email doit être valide"),
  });
  const {register, handleSubmit, formState: {errors} } = useForm({
    resolver: yupResolver(schema)
  });

  return (
    <>
      <h1>
        Home
      </h1>
      <form className="" onSubmit={handleSubmit(saveEmailToLocalStorage)}>
        <input 
        type="text"
        placeholder='email@exemple.fr' 
        {...register('email')}
        />
        {errors.email?.message && <p className="ml-1 pt-2 font-semibold text-red-500 text-sm">{errors.email?.message}</p>}
        <input type="submit"  value="Suivant"/>
      </form>
    </>
  )
}