import { editorTextlength } from "../components/app-rich-text-box/utils/editorFunction";
import { validateUserName } from "../services/method";
import { isFormikError, isValidData } from "./common-function";
import { staticResponseMessage } from "./static-response-message";

const userNameValidate = async (input) => {
  try {
    const { data } = await validateUserName(input);

    return data.response_data;
  } catch (err) {
    console.log(
      "🚀 ~ file: useMultiStepForm.jsx:13 ~ userNameValidate ~ err:",
      err
    );
  }
};

export const signupValid1 = async (next, rest) => {
  const [data, errors, touched, componentProps] = rest;
  if (
    await userNameValidate({
      user_name: data.user_name,
    })
  ) {
    staticResponseMessage("FA002");
  } else if (
    isFormikError(touched, errors) ||
    !isValidData(componentProps.data)
  ) {
    staticResponseMessage("FA002");
  } else {
    next();
  }
};

export const signupValid2 = (next, rest) => {
  const { isValid } = rest[3];
  if (isValid) {
    next();
  } else {
    staticResponseMessage("FA003");
  }
};
export const signupValid3 = (next, rest) => {
  const [data, errors, touched, componentProps] = rest;

  if (isFormikError(touched, errors) || !isValidData(componentProps.data)) {
    staticResponseMessage("FA002");
  } else {
    next();
  }
};
export const signupValid4 = (next, rest) => {
  const { data } = rest[3];

  if (!isValidData(data)) {
    staticResponseMessage("FA004");
  } else {
    next();
  }
};
export const signupValid5 = (next, rest) => {
  const { data } = rest[3];

  if (editorTextlength(data.about) > 15) {
    next();
  } else {
    staticResponseMessage("FA011", 3000);
  }
};

export const signupValid6 = (next, rest) => {
  const { data } = rest[3];

  if (data.length > 2) {
    next();
  } else {
    staticResponseMessage("FA005");
  }
};
export const signupValid7 = async (finish, rest) => {
  const [data, errors, touched, componentProps] = rest;
  if (componentProps.data.length >= 2) {
    await finish(data);
  } else {
    staticResponseMessage("FA006");
  }
};

export const forgotPasswordValid1 = (next, rest) => {
  const [data, errors, touched, componentProps] = rest;
  if (!componentProps.data || isFormikError(touched, errors)) {
    staticResponseMessage("FA002");
  } else {
    next();
  }
};
export const forgotPasswordValid2 = (next, rest) => {
  const { isValid } = rest[3];
  if (isValid) {
    next();
  } else {
    staticResponseMessage("FA003");
  }
};
export const forgotPasswordValid3 = (finish, rest) => {
  const [data, errors, touched, componentProps] = rest;
  if (isFormikError(touched, errors) || !isValidData(componentProps.data)) {
    staticResponseMessage("FA002");
  } else {
    finish();
  }
};

export const profileCompletionValid1 = async (next, rest) => {
  const [data, errors, touched, componentProps] = rest;
  if (
    await userNameValidate({
      user_name: data.user_name,
    })
  ) {
    staticResponseMessage("FA001");
  } else if (
    isFormikError(touched, errors) ||
    !isValidData(componentProps.data)
  ) {
    staticResponseMessage("FA002");
  } else {
    next();
  }
};

export const profileCompletionValid2 = (next, rest) => {
  const { data } = rest[3];

  if (editorTextlength(data.about) > 15) {
    next();
  } else {
    staticResponseMessage("FA011", 3000);
  }
};

export const profileCompletionValid3 = (next, rest) => {
  const { data } = rest[3];

  if (data.length > 2) {
    next();
  } else {
    staticResponseMessage("FA005");
  }
};
export const profileCompletionValid4 = async (finish, rest) => {
  const [data, errors, touched, componentProps] = rest;
  if (componentProps.data.length >= 2) {
    await finish(data);
  } else {
    staticResponseMessage("FA006");
  }
};
