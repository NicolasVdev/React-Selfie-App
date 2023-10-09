import * as yup from 'yup';
import { useForm} from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigate } from 'react-router-dom';
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_BASE_URL
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY
const supabase = createClient(supabaseUrl, supabaseKey)


export const Home = () => {
  const navigate = useNavigate();

  const emailExists = async (email) => {
    const { data, error } = await supabase
      .from('emails')
      .select()
      .eq('email', email);
    if (error) {
      console.error("Erreur lors de la vérification de l'e-mail:", error);
      return false;
    }
    return data.length > 0; // Si des données sont renvoyées, l'e-mail existe déjà
  };

  const addEmail = async (email) => {
    if (await emailExists(email)) {
      console.log("Cet e-mail existe déjà dans la base de données.");
      return;
    }
    const { data, error } = await supabase.from('emails').insert([{ email }]);
    if (error) {
      console.error("Erreur lors de l'ajout de l'e-mail:", error);
    } else {
      console.log('E-mail ajouté avec succès:', email);
    }
  };

  const saveEmailToDatabase = async (data) => {
    const { email } = data;
    const emailAlreadyExist = await emailExists(email);
    if (emailAlreadyExist) {
      alert("Cet e-mail a déjà été utilisé, veuillez en choisir un autre");
      return;
    }
    await addEmail(email);
    navigate("/capture");
  };

  // const saveEmailToLocalStorage = (data) => {
    // const { email } = data;
  //   const existingEmails = JSON.parse(localStorage.getItem('emails')) || [];
  //   if (existingEmails.includes(email)) {
  //     alert("Cet e-mail a déjà été utilisé, veuillez en choisir un autre");
  //     return;
  //   }
  //   existingEmails.push(email);
  //   localStorage.setItem('emails', JSON.stringify(existingEmails));
  //   addEmail(email);
  //   navigate("/capture");
  // };

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