
export const CaptureSelfie = async () => {
  const canvas = document.createElement("canvas");
  const video = document.querySelector("video");

  canvas.width = video.videoWidth;
  canvas.height = video.videoHeight;
  const ctx = canvas.getContext("2d");
  ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

  const selfieDataUrl = canvas.toDataURL("image/jpeg");
  // Stocker ou envoyer le selfie
};
