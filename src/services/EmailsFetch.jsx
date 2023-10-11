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

export const getEmailFromLastRecord = async () => {
  try {
    const { data: lastRecord, error } = await supabase
      .from('Attendees')
      .select('id, email')
      .order('id', { ascending: false })
      .limit(1);

    if (error) {
      console.error('Erreur lors de la récupération du dernier enregistrement:', error);
      return null;
    }

    if (lastRecord.length > 0) {
      const email = lastRecord[0].email;
      return email;
    } else {
      console.error('Aucun enregistrement trouvé dans la base de données.');
      return null;
    }
  } catch (error) {
    console.error('Erreur lors de la récupération de l\'e-mail depuis Supabase:', error);
    throw error;
  }
};
