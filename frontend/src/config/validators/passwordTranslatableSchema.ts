import { TFunction } from "i18next";

import passwordValidator from "./passwordValidator";
import validationMessages from "../../messages/validationMessages";
import passwordValidLength from "./passwordValidLength";

const passwordTranslatableSchema = (t: TFunction<"translation", undefined>) => {
  return passwordValidator({
    required: t(validationMessages.fieldRequired.key),
    min: t(validationMessages.passwordMinLength.key, {
      min: passwordValidLength.min,
    }),
    max: t(validationMessages.passwordMaxLength.key, {
      max: passwordValidLength.max,
    }),
    lowercase: t(validationMessages.passwordLowercaseChar.key),
    uppercase: t(validationMessages.passwordUppercaseChar.key),
    digit: t(validationMessages.passwordDigitChar.key),
    special: t(validationMessages.passwordSpecialChar.key),
  });
};

export default passwordTranslatableSchema;
