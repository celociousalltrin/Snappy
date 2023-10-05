import {
  signupValid1,
  signupValid2,
  signupValid3,
  signupValid4,
  signupValid5,
  signupValid6,
  signupValid7,
  forgotPasswordValid1,
  forgotPasswordValid2,
  forgotPasswordValid3,
} from "../utils/multi-step-form-validation";

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

const validationFunctions = {
  signupValid1,
  signupValid2,
  signupValid3,
  signupValid4,
  signupValid5,
  signupValid6,
  signupValid7,
  forgotPasswordValid1,
  forgotPasswordValid2,
  forgotPasswordValid3,
};

export const multiStepFormValidationFunction = ({ name, length }) => {
  let result = [];

  for (let i = 1; i <= length; i++) {
    const valFunc = (num) => {
      return (next, ...rest) =>
        validationFunctions[`${name}Valid${num}`](next, rest);
    };
    result.push(valFunc(i));
  }
  return result;
};

export const isFormikError = (touched, errors) => {
  return !!Object.keys(touched).filter((obj) => errors[obj] !== undefined)
    .length;
};

export const isValidData = (data) => {
  return Object.keys(data).every((o) => {
    const value = data[o];

    if (typeof value == "object") {
      return isValidData(value);
    } else {
      return !!value;
    }
  });
};
