import supabase from "./SupabaseService";

export const emailExists = async (email) => {
  const { data, error } = await supabase
    .from('Attendees')
    .select()
    .eq('email', email);
  if (error) {
    console.error("Erreur lors de la vérification de l'e-mail:", error);
    return false;
  }
  return data.length > 0;
};

export const addEmail = async (email) => {
  if (await emailExists(email)) {
    console.log("Cet e-mail existe déjà dans la base de données.");
    return;
  }
  const { data, error } = await supabase.from('Attendees').insert([{ email }]);
  if (error) {
    console.error("Erreur lors de l'ajout de l'e-mail:", error);
  } else {
    console.log('E-mail ajouté avec succès:', email);
  }
};