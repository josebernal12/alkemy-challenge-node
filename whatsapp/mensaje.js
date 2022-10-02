const { config } = require("../config/config");

const twilio = require("twilio");

const accountSide = config.ACCOUNTSIDE;
const authtoken = config.AUTHTOKEN;

const client = twilio(accountSide, authtoken);

async function sendMessage(number, nombre) {
  try {
    const message = await client.messages.create({
      to: `whatsapp:+${number}`,
      from: "whatsapp:+14155238886",
      body: `Bienvenido a la Pagina! ${nombre}`,
    });
    return message;
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  sendMessage,
};
