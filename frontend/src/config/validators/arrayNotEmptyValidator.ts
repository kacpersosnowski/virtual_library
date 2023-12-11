import * as Yup from "yup";

import { ArrayNotEmptyErrorMessages } from "./validators.types";

const arrayNotEmptyValidator = (messages: ArrayNotEmptyErrorMessages) => {
  return Yup.array().test("at-least-one", messages.required, function (value) {
    return value && value.length > 0;
  });
};

export default arrayNotEmptyValidator;
