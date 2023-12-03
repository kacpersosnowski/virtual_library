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
};

export default validationMessages;
