import * as Yup from "yup";

import { EmailErrorMessages } from "./validators.types";

const emailValidator = (messages: EmailErrorMessages) => {
  return Yup.string().email(messages.invalid).required(messages.required);
};

export default emailValidator;
