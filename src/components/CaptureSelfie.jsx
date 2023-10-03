export const CaptureSelfie = async () => {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({ video: true });
    const videoElement = document.createElement("video");
    document.body.appendChild(videoElement);
    videoElement.srcObject = stream;

    return new Promise((resolve) => {
      videoElement.onloadedmetadata = async () => {
        const canvas = document.createElement("canvas");
        canvas.width = videoElement.videoWidth;
        canvas.height = videoElement.videoHeight;
        const ctx = canvas.getContext("2d");
        ctx.drawImage(videoElement, 0, 0, canvas.width, canvas.height);
        const selfieDataUrl = canvas.toDataURL("image/jpeg");

        // Arrêtez la vidéo et libérez le flux de la caméra
        stream.getTracks().forEach((track) => track.stop());
        videoElement.remove();

        resolve(selfieDataUrl);
      };

      videoElement.play();
    });
  } catch (error) {
    console.error("Erreur lors de l'accès à la caméra : ", error);
    throw error;
  }
};
