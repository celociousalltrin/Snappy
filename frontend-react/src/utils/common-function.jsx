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

export const displayUserName = (name) => {
  return name && `@${name.toLowerCase().replace(/\s+/g, "_")}`;
};

export const customTimeAgo = (input) => {
  let time = new Date(new Date(input).getTime());
  switch (typeof time) {
    case "number":
      break;
    case "string":
      time = +new Date(time);
      break;
    case "object":
      if (time.constructor === Date) time = time.getTime();
      break;
    default:
      time = +new Date();
  }
  var time_formats = [
    [60, "seconds", 1], // 60
    [120, "1 minute ago", "1 minute from now"], // 60*2
    [3600, "minutes", 60], // 60*60, 60
    [7200, "1 hour ago", "1 hour from now"], // 60*60*2
    [86400, "hours", 3600], // 60*60*24, 60*60
    [172800, "Yesterday", "Tomorrow"], // 60*60*24*2
    [604800, "days", 86400], // 60*60*24*7, 60*60*24
    [1209600, "Last week", "Next week"], // 60*60*24*7*4*2
    [2419200, "weeks", 604800], // 60*60*24*7*4, 60*60*24*7
    [4838400, "Last month", "Next month"], // 60*60*24*7*4*2
    [29030400, "months", 2419200], // 60*60*24*7*4*12, 60*60*24*7*4
    [58060800, "Last year", "Next year"], // 60*60*24*7*4*12*2
    [2903040000, "years", 29030400], // 60*60*24*7*4*12*100, 60*60*24*7*4*12
    [5806080000, "Last century", "Next century"], // 60*60*24*7*4*12*100*2
    [58060800000, "centuries", 2903040000], // 60*60*24*7*4*12*100*20, 60*60*24*7*4*12*100
  ];
  var seconds = (+new Date() - time) / 1000,
    token = "ago",
    list_choice = 1;

  if (seconds == 0) {
    return "Just now";
  }
  if (seconds < 0) {
    seconds = Math.abs(seconds);
    token = "from now";
    list_choice = 2;
  }
  var i = 0,
    format;
  while ((format = time_formats[i++]))
    if (seconds < format[0]) {
      if (typeof format[2] == "string") return format[list_choice];
      else
        return Math.floor(seconds / format[2]) + " " + format[1] + " " + token;
    }
  return time;
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
