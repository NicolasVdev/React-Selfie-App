import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router-dom";
import { emailExists, addEmail } from "../services/EmailsFetch";

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

  const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
  const schema = yup.object().shape({
    email: yup
      .string()
      .required("Merci de renseigner un e-mail")
      .matches(emailRegex, "L'e-mail doit être valide"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  return (
    <>
      <img
        src="https://les3fromages.com/wp-content/uploads/2022/04/LOGO_3F_2021web.png"
        className="h-100 w-300 flex justify-center"
        alt="Les 3 Fromages"
        title="LOGO_3F_2021web"
        data-src="https://les3fromages.com/wp-content/uploads/2022/04/LOGO_3F_2021web.png"
      />
      <h1 className="text-white text-4xl font-bold flex justify-center py-10">
        Bienvenue au concert des 3 Fromages !
      </h1>
      <div className="font-semibold flex flex-col pb-12 text-2xl">
        <p className="flex justify-center pb-1">
          Pour l'occasion, nous vous proposons un concours de selfie.
        </p>
        <p className="flex justify-center pb-1">
          Afin de participer, rien de plus simple : entrez votre e-mail,
          prenez-vous en photo et envoyez-la.
        </p>
        <p className="flex justify-center">
          Un tirage au sort sera réalisé, et tu recevras un e-mail pour
          t'informer du résultat.
        </p>
      </div>
      <form
        className="flex flex-col justify-center"
        onSubmit={handleSubmit(saveEmailToDatabase)}
      >
        <div className="flex justify-center text-center">
          <input
            className="w-80 h-9 bg-transparent placeholder:text-whitesmoke text-white pl-1 input-email rounded-md"
            type="text"
            placeholder="email@exemple.fr"
            {...register("email")}
          />
        </div>
        {errors.email?.message && (
          <p className="flex justify-center py-2 font-medium text-red-500 text-lg">
            {errors.email?.message}
          </p>
        )}
        <div className="flex justify-center pt-12">
          <input
            type="submit"
            className="font-bold border-2 w-fit px-6 py-1 rounded-md input-btn"
            value="PARTICIPER"
          />
        </div>
      </form>
    </>
  );
};
