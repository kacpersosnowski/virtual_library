export type EmailErrorMessages = {
  invalid: string;
  required: string;
};

export type PasswordErrorMessages = {
  min: string;
  max: string;
  lowercase: string;
  uppercase: string;
  digit: string;
  special: string;
  required: string;
};

export type ArrayNotEmptyErrorMessages = {
  required: string;
};
