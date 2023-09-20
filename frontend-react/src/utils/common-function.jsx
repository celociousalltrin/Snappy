export const navigateToProfile = (e, navigate, username, pageId) => {
  e.preventDefault();
  e.stopPropagation();
  navigate(`/profile/${username}`, { state: { from: pageId } });
};

export const isToggleContent = (input, number) => {
  return input.length > number;
};

export const sliceContent = (string, number) => {
  return `${string.slice(0, number)}.....`;
};

export const convertFileToDataURL = (file) => {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.addEventListener("load", () => resolve(reader.result), false);
  });
};

export const generateCroppedImageDataURL = (imageDataURL, cropedSize) => {
  const image = new Image();
  image.src = imageDataURL;

  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  canvas.width = cropedSize.width;
  canvas.height = cropedSize.height;

  ctx.drawImage(
    image,
    cropedSize.x,
    cropedSize.y,
    cropedSize.width,
    cropedSize.height,
    0,
    0,
    cropedSize.width,
    cropedSize.height
  );

  const croppedImage = canvas.toDataURL("image/jpeg");
  return croppedImage;
};
