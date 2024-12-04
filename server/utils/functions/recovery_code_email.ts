import sendMail from "../../../server/utils/functions/email_sender";
const generateRandomCode = () => {
  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
  const numbers = "0123456789";
  let code = "";

  for (let i = 0; i < 7; i++) {
    const randomIndex = Math.floor(Math.random() * letters.length);
    code += letters[randomIndex];
  }

  for (let i = 0; i < 5; i++) {
    const randomIndex = Math.floor(Math.random() * numbers.length);
    code += numbers[randomIndex];
  }
  console.log(code);
  return code;
};

function sendCode(email: string, Code: string) {
  const textHtml = `<h1>Here is the recovery code you requested: <strong>${Code}</strong></h1> <br> <p>If you haven't requested a recovery code you might want to change your password</p> <br> <p>Thank you for being a part of our community.</p>`;
  sendMail(email, "Recovery Code!", textHtml);
}
export { sendCode, generateRandomCode };