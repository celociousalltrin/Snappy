import * as yup from "yup";

const emailSchema = yup
  .string()
  .email("Please enter a valid email")
  .required("Email is required");

const passwordSchema = yup
  .string()
  .min(8, "Password must be at least 8 characters")
  .max(12, "Password cannot exceed 12 characters")
  .required("Password Required");

export const signupSchema = yup.object().shape({
  first_name: yup
    .string()
    .trim()
    .min(4, "First Name must be at least 4 characters")
    .max(15, "First Name cannot exceed 15 characters")
    .required("First Name is required"),
  last_name: yup.string().trim().required("Last Name is required"),
  user_name: yup
    .string()
    .trim()
    .min(4, "User Name must be at least 4 characters")
    .max(15, "User Name cannot exceed 12 characters")
    .required("User Name is required"),
  email: emailSchema,
  new_password: passwordSchema,
  confirm_password: yup
    .string()
    .oneOf([yup.ref("new_password"), null], "Password must match")
    .required("Required"),
});

export const ForgotPasswordSchema = yup.object().shape({
  email: emailSchema,
  new_password: passwordSchema,
  confirm_password: yup
    .string()
    .oneOf([yup.ref("new_password"), null], "Password must match")
    .required("Required"),
});

export const loginSchema = yup.object().shape({
  email: emailSchema,
  password: passwordSchema,
});

export const editorLinkSchema = yup.object().shape({
  editor_link_text: yup.string().required("It is required"),
  editor_link: yup.string().url("Invalid Url").required("It is required"),
});
