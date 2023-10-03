export const OpenCamera =  async () => {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({ video: true });
  } catch (error) {
    console.error("Erreur lors de l'accès à la caméra : ", error);
  }
};