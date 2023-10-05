import * as yup from 'yup';
import { useForm} from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigate } from 'react-router-dom';

export const Home = () => {
  const navigate = useNavigate()
  const saveEmailToLocalStorage = (data) => {
    localStorage.setItem("email", data.email);
    navigate("/capture")
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
