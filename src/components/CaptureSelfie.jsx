export const CaptureSelfie = async (videoRef, photoRef, setHasPhoto) => {
  const width = 414;
  const height = width / (16 / 9);

  let video = videoRef.current;
  let photo = photoRef.current;

  photo.width = width;
  photo.height = height;

  let ctx = photo.getContext('2d');
  ctx.drawImage(video, 0, 0, width, height);
  setHasPhoto(true);
};
