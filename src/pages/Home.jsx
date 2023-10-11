import * as yup from 'yup';
import { useForm} from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigate } from 'react-router-dom';
import { emailExists, addEmail } from '../services/EmailsFetch';

export const Home = () => {
  const navigate = useNavigate();

  const saveEmailToDatabase = async (data) => {
    const { email } = data;
    const lowercaseEmail = email.toLowerCase();
    const emailAlreadyExist = await emailExists(lowercaseEmail);
    if (emailAlreadyExist) {
      alert("Cet e-mail a déjà été utilisé, veuillez en choisir un autre");
      return;
    }
    await addEmail(lowercaseEmail);
    navigate("/capture");
  };

  const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g
  const schema = yup.object().shape({
    email: yup.string().required("Merci de renseigner un e-mail").matches(emailRegex, "L'e-mail doit être valide"),
  });

  const {register, handleSubmit, formState: {errors} } = useForm({
    resolver: yupResolver(schema)
  });

  return (
    <>
      <h1>
        Home
      </h1>
      <form className="" onSubmit={handleSubmit(saveEmailToDatabase)}>
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