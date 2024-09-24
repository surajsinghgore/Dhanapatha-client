import * as yup from "yup";

export const registerUserValidation = yup.object({
  username: yup
    .string()
    .min(3, 'Username must be at least 3 characters long.')
    .required('Username is required'),
  email: yup
    .string()
    .email('Must be a valid email address.')
    .matches(/@gmail\.com$/, 'Only Gmail accounts are allowed.')
    .required('Email is required'),
  password: yup
    .string()
    .min(5, 'Password must be at least 5 characters long.')
    .matches(/[A-Z]/, 'Password must contain at least one uppercase letter.')
    .matches(/[a-z]/, 'Password must contain at least one lowercase letter.')
    .matches(/[0-9]/, 'Password must contain at least one number.')
    .matches(/[\W_]/, 'Password must contain at least one special character.')
    .required('Password is required'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password'), null], "Passwords must match.")
    .required('Confirm password is required'),
});


export const loginValidation = yup.object({
  usernameOrEmail: yup
    .string()
    .trim() // Trim whitespace
    .required('Username or Email is required'), // Required field
  password: yup
    .string()
    .trim() // Trim whitespace
    .required('Password is required'), // Required field
});