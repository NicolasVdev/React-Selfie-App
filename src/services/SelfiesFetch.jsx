import supabase from './SupabaseService'; 

export const storeSelfieInSupabase = async (imageUrl) => {
  try {
    const { data: lastRecord, error } = await supabase
      .from('Attendees')
      .select('id')
      .order('id', { ascending: false })
      .limit(1);

    if (error) {
      console.error('Erreur lors de la récupération du dernier ID créé:', error);
      return null;
    }

    const lastId = lastRecord[0]?.id;

    const { data, error: updateError } = await supabase
      .from('Attendees')
      .update({ selfie_url: imageUrl })
      .eq('id', lastId);

    if (updateError) {
      console.error('Erreur lors de la mise à jour du selfie:', updateError);
      return null;
    } else {
      console.log('Selfie stocké avec succès dans Supabase');
      return imageUrl;
    }
  } catch (error) {
    console.error('Erreur lors du stockage du selfie dans Supabase:', error);
    throw error;
  }
};
