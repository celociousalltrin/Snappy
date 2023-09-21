import * as yup from "yup";

const emailSchema = yup
  .string()
  .email("Please enter a valid email")
  .required("Email is required");

const passwordSchema = yup
  .string()
  .min(8, "Password must be at least 8 characters")
  .max(12, "Password cannot exceed 12 characters")
  .required("New Password Required");

export const signupSchema = yup.object().shape({
  first_name: yup
    .string()
    .trim()
    .min(4, "First Name must be at least 4 characters")
    .max(10, "First Name cannot exceed 10 characters")
    .required("First Name is required"),
  last_name: yup.string().trim().required("Last Name is required"),
  user_name: yup
    .string()
    .trim()
    .min(4, "User Name must be at least 4 characters")
    .max(8, "User Name cannot exceed 8 characters")
    .required("User Name is required"),
  email: emailSchema,
  new_password: passwordSchema,
  confirm_password: yup
    .string()
    .oneOf([yup.ref("new_password"), null], "Password must match")
    .required("Required"),
  about: yup
    .string()
    .trim()
    .min(20, "It must be at least 20 characters")
    .max(300, "It cannot exceed 300 characters")
    .required("It is required"),
});

export const ForgotPasswordSchema = yup.object().shape({
  email: emailSchema,
  new_password: passwordSchema,
  confirm_password: yup
    .string()
    .oneOf([yup.ref("new_password"), null], "Password must match")
    .required("Required"),
});
