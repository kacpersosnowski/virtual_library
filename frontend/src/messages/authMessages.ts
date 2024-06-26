import Message from "../types/Message";

const authMessages: Message = {
  loginHeader: {
    key: "auth >> login >> header",
    pl: "Dobrze, że jesteś",
    en: "It's good you're here",
  },
  usernameLabel: {
    key: "auth >> username >> label",
    pl: "Nazwa użytkownika",
    en: "Username",
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
  oldPasswordLabel: {
    key: "auth >> old_password >> label",
    pl: "Stare hasło",
    en: "Old password",
  },
  newPasswordLabel: {
    key: "auth >> new_password >> label",
    pl: "Nowe hasło",
    en: "New password",
  },
  repeatNewPasswordLabel: {
    key: "auth >> repeat_new_password >> label",
    pl: "Powtórz nowe hasło",
    en: "Repeat new password",
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
  resetPasswordPrompt: {
    key: "auth >> login >> reset_password_prompt",
    pl: "Nie pamiętasz hasła?",
    en: "Don't you remember the password?",
  },
  resetPasswordPromptLink: {
    key: "auth >> login >> reset_password_prompt_link",
    pl: "Zresetuj je tutaj.",
    en: "Reset it here.",
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
  resetPasswordHeader: {
    key: "auth >> reset_password >> header",
    pl: "Resetuj hasło",
    en: "Reset password",
  },
  resetPasswordEmailPrompt: {
    key: "auth >> reset_password >> email_prompt",
    pl: "Wpisz adres e-mail podany podczas rejestracji:",
    en: "Enter the e-mail address provided during registration:",
  },
  resetPasswordEmailSubmitButton: {
    key: "auth >> reset_password >> email_submit_button",
    pl: "Wyślij link resetujący",
    en: "Send reset link",
  },
  verificationEmailSent: {
    key: "verification_email_sent >> header",
    pl: "E-mail weryfikacyjny został do Ciebie wysłany.",
    en: "Verification e-mail has been sent to you.",
  },
  resetPasswordSubmitButton: {
    key: "auth >> reset_password >> submit_button",
    pl: "Resetuj hasło",
    en: "Reset password",
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
  passwordResetSuccess: {
    key: "reset_password >> success",
    pl: "Hasło zostało zresetowane pomyślnie.",
    en: "The password was reset successfully.",
  },
  resetPasswordEmailSent: {
    key: "reset_password_email_sent >> header",
    pl: "E-mail resetujący hasło został do Ciebie wysłany.",
    en: "Reset password e-mail has been sent to you.",
  },
  clickResetPasswordLink: {
    key: "reset_password_email_sent >> activation_link >> prompt",
    pl: "Kliknij w link, który tam znajdziesz i zresetuj hasło.",
    en: "Click the link you will find there and reset your password.",
  },
  changePasswordSuccess: {
    key: "auth >> change_password >> success",
    pl: "Hasło zostało zmienione pomyślnie.",
    en: "The password was changed successfully.",
  },
  changePasswordHeader: {
    key: "auth >> change_password >> header",
    pl: "Zmień hasło",
    en: "Change password",
  },
  changePasswordSubmitButton: {
    key: "auth >> change_password >> submit_button",
    pl: "Zmień hasło",
    en: "Change password",
  },
};

export default authMessages;
