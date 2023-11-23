import { editorTextlength } from "../components/app-rich-text-box/utils/editorFunction";
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
  profileCompletionValid1,
  profileCompletionValid2,
  profileCompletionValid3,
  profileCompletionValid4,
} from "../utils/multi-step-form-validation";

export const navigateToProfile = (e, navigate, username, pageId) => {
  e.preventDefault();
  e.stopPropagation();
  navigate(`/profile/${username}`, { state: { from: pageId } });
};

export const isToggleContent = (input, number) => {
  return editorTextlength(input) > number;
};

const sliceEditorContent = (data, number) => {
  if (data[0].children[0].text.length > number) {
    return [
      {
        type: "text",
        level: 7,
        children: [{ text: data[0].children[0].text.slice(0, number) }],
      },
    ];
  } else {
    const result = data.reduce(
      ({ length, resData }, current) => {
        //inlineResult
        const inlineResult = current.children.reduce(
          ({ inlineLength, inlineData, len }, curr) => {
            if (!curr?.type) {
              inlineLength += curr.text.length;
            }

            if (inlineLength < number - length) {
              if (!curr?.type) {
                len += curr.text.length;
              }
              inlineData = [...inlineData, curr];
            }
            return { inlineLength, inlineData, len };
          },
          { inlineLength: 0, inlineData: [], len: 0 }
        );

        length += inlineResult.len;

        if (length < number) {
          resData = [
            ...resData,
            { ...current, children: inlineResult.inlineData },
          ];
        }
        return { length, resData };
      },
      { length: 0, resData: [] }
    );
    console.log(
      "🚀 ~ file: common-function.jsx:71 ~ sliceEditorContent ~ result:",
      result
    );

    const index = result.resData.findIndex((obj) => obj.children.length === 0);
    return result.resData.slice(0, index);
  }
};

export const sliceContent = (input, number) => {
  return sliceEditorContent(input, number);
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
  profileCompletionValid1,
  profileCompletionValid2,
  profileCompletionValid3,
  profileCompletionValid4,
};

export const multiStepFormValidationFunction = ({ name, length }) => {
  let result = [];

  //Recursive Approach
  for (let i = 1; i <= length; i++) {
    const valFunc = (num) => {
      return (next, ...rest) => {
        return validationFunctions[`${name}Valid${num}`](next, rest);
      };
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

export const handleGoogleExternalAuth = () => {
  window.open(
    `${import.meta.env.VITE_REACT_APP_SERVER_API_URL}/auth/create-google-user`,
    "_self"
  );
};

export const numberToWord = (number) => {
  if (number < 1 || number > 999) {
    return "Number out of range (1-999)";
  }

  const ones = [
    "",
    "one",
    "two",
    "three",
    "four",
    "five",
    "six",
    "seven",
    "eight",
    "nine",
  ];
  const teens = [
    "",
    "eleven",
    "twelve",
    "thirteen",
    "fourteen",
    "fifteen",
    "sixteen",
    "seventeen",
    "eighteen",
    "nineteen",
  ];
  const tens = [
    "",
    "ten",
    "twenty",
    "thirty",
    "forty",
    "fifty",
    "sixty",
    "seventy",
    "eighty",
    "ninety",
  ];

  if (number === 0) {
    return "zero";
  }

  let word = "";

  if (number >= 100) {
    word += ones[Math.floor(number / 100)] + " hundred ";
    number %= 100;
  }

  if (number >= 20) {
    word += tens[Math.floor(number / 10)] + " ";
    number %= 10;
  } else if (number >= 11) {
    word += teens[number - 10] + " ";
    number = 0;
  }

  if (number > 0) {
    word += ones[number] + " ";
  }

  return word.trim();
};
