import messages from "../messages/messages";

const translations = { translation: {} };

for (const message of messages) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  for (const [_, value] of Object.entries(message)) {
    translations.translation = {
      ...translations.translation,
      [value.key]: value?.en,
    };
  }
}

export default translations;
