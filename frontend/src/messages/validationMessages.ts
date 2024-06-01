import Message from "../types/Message";

const validationMessages: Message = {
  fieldRequired: {
    key: "validation >> required",
    pl: "To pole jest obowiązkowe",
    en: "This field is required",
  },
  emailInvalid: {
    key: "validation >> email >> invalid",
    pl: "Niepoprawny adres e-mail",
    en: "Invalid email address",
  },
  passwordMinLength: {
    key: "validation >> password min_length",
    pl: "Hasło musi mieć co najmniej {{min}} znaków",
    en: "Your password must have at least {{min}} characters",
  },
  passwordMaxLength: {
    key: "validation >> password >> max_length",
    pl: "Hasło nie może mieć więcej niż {{max}} znaków",
    en: "Your password must not have more than {{max}} characters",
  },
  passwordLowercaseChar: {
    key: "validation >> password >> lowercase",
    pl: "Hasło musi zawierać co najmniej 1 małą literę",
    en: "Your password must must have at least 1 lowercase letter",
  },
  passwordUppercaseChar: {
    key: "validation >> password >> uppercase",
    pl: "Hasło musi zawierać co najmniej 1 dużą literę",
    en: "Your password must must have at least 1 uppercase letter",
  },
  passwordDigitChar: {
    key: "validation >> password >> digit",
    pl: "Hasło musi zawierać co najmniej 1 cyfrę",
    en: "Your password must must have at least 1 digit",
  },
  passwordSpecialChar: {
    key: "validation >> password >> special",
    pl: "Hasło musi zawierać co najmniej 1 znak specjalny",
    en: "Your password must must have at least 1 special character",
  },
  passwordsNotMatch: {
    key: "validation >> password >> not_match",
    pl: "Hasła się nie zgadzają",
    en: "Passwords do not match",
  },
  acceptTerms: {
    key: "validation >> accept_terms",
    pl: "Nasz regulamin musi zostać zaakceptowany",
    en: "You have to accept our terms",
  },
  invalidCredentials: {
    key: "validation >> credentials >> invalid",
    pl: "Email lub hasło niepoprawne",
    en: "Invalid e-mail or password",
  },
  emailUsernameAlreadyExists: {
    key: "validation >> email_username_exists",
    pl: "Użytkownik z tym adresem e-mail lub nazwą użytkownika już istnieje",
    en: "User with this e-mail or username already exists",
  },
};

export default validationMessages;
