import Message from "../types/Message";

const authMessages: Message = {
  loginHeader: {
    key: "auth >> login >> header",
    pl: "Dobrze, że jesteś",
    en: "It's good you're here",
  },
  emailLabel: {
    key: "auth >> email >> label",
    pl: "Adres e-mail",
    en: "E-mail",
  },
  passwordLabel: {
    key: "auth >> password >> label",
    pl: "Hasło",
    en: "Password",
  },
  repeatPasswordLabel: {
    key: "auth >> repeat_password >> label",
    pl: "Powtórz hasło",
    en: "Repeat password",
  },
  loginButton: {
    key: "auth >> login >> button",
    pl: "Zaloguj się",
    en: "Login",
  },
  logoutButton: {
    key: "auth >> logout >> button",
    pl: "Wyloguj się",
    en: "Logout",
  },
  resetPassword: {
    key: "auth >> login >> reset_password",
    pl: "Nie pamiętasz hasła? Zresetuj je tutaj.",
    en: "Don't you remember the password? Reset it here.",
  },
  registerPrompt: {
    key: "auth >> login >> register_prompt",
    pl: "Nie masz jeszcze konta?",
    en: "Don't you have an account?",
  },
  registerPromptLink: {
    key: "auth >> login >> register_prompt_link",
    pl: "Zarejestruj się tutaj.",
    en: "Register here.",
  },
  registerHeader: {
    key: "auth >> register >> header",
    pl: "Zacznij czytać już dziś",
    en: "Start reading today",
  },
  acceptTerms: {
    key: "auth >> register >> accept_terms",
    pl: "Akceptuję",
    en: "I accept",
  },
  acceptTermsLink: {
    key: "auth >> register >> accept_terms_link",
    pl: "regulamin Liber Mundi",
    en: "the terms of Liber Mundi",
  },
  registerButton: {
    key: "auth >> register >> button",
    pl: "Zarejestruj się",
    en: "Register",
  },
  loginPrompt: {
    key: "auth >> login >> login_prompt",
    pl: "Masz już konto?",
    en: "Do you already have an account?",
  },
  loginPromptLink: {
    key: "auth >> login >> login_prompt_link",
    pl: "Zaloguj się tutaj.",
    en: "Login here.",
  },
  verificationEmailSent: {
    key: "verification_email_sent >> header",
    pl: "E-mail weryfikacyjny został do Ciebie wysłany.",
    en: "Verification e-mail has been sent to you.",
  },
  checkEmailHeader: {
    key: "verification_email_sent >> check_email >> header",
    pl: "Sprawdź swojego maila:",
    en: "Check your e-mail:",
  },
  clickActivationLink: {
    key: "verification_email_sent >> activation_link >> prompt",
    pl: "Kliknij w link aktywacyjny i",
    en: "Click the activation link and",
  },
  login: {
    key: "verification_email_sent >> login >> prompt",
    pl: "zaloguj się",
    en: "login",
  },
  ourSitePrompt: {
    key: "verification_email_sent >> our_site >> prompt",
    pl: "do naszej strony.",
    en: "to our site.",
  },
  accountActivated: {
    key: "verification_email >> account_activated",
    pl: "Pomyślnie aktywowano konto. Teraz możesz się już zalogować.",
    en: "Account activated successfully! Now you can log in.",
  },
};

export default authMessages;
