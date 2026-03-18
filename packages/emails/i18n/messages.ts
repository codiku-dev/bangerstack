export type EmailLocale = "en" | "fr";

export const messages: Record<EmailLocale, Record<string, string>> = {
  en: {
    "auth.signup.preview": "Confirm your email to activate your account",
    "auth.signup.heading": "Confirm your email ✨",
    "auth.signup.body.greeting": "Hi {name},",
    "auth.signup.body.text":
      "Tap the button below to verify your email address and activate your account.",
    "auth.signup.cta": "Verify email",
    "auth.signup.copy.label":
      "Or copy and paste this link into your browser:",
    "auth.signup.footer":
      "If you didn't request this email, you can safely ignore it.",
  },
  fr: {
    "auth.signup.preview":
      "Confirme ton e-mail pour activer ton compte",
    "auth.signup.heading": "Confirme ton e-mail ✨",
    "auth.signup.body.greeting": "Salut {name},",
    "auth.signup.body.text":
      "Clique sur le bouton ci-dessous pour vérifier ton adresse e-mail et activer ton compte.",
    "auth.signup.cta": "Valider mon e-mail",
    "auth.signup.copy.label":
      "Ou copie-colle ce lien dans ton navigateur :",
    "auth.signup.footer":
      "Si tu n’as pas demandé cet e-mail, tu peux l’ignorer en toute sécurité.",
  },
};

