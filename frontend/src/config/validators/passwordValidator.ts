import * as Yup from "yup";

import { PasswordErrorMessages } from "./validators.types";
import passwordValidLength from "./passwordValidLength";

const passwordValidator = (messages: PasswordErrorMessages) => {
  return Yup.string()
    .required(messages.required)
    .min(passwordValidLength.min, messages.min)
    .max(passwordValidLength.max, messages.max)
    .matches(/[a-z]/, messages.lowercase)
    .matches(/[A-Z]/, messages.uppercase)
    .matches(/[0-9]/, messages.digit)
    .matches(/^(?=.*[!@#$%^&*()_+{}[\]:;<>,.?~\\/-])/, messages.special);
};

export default passwordValidator;
