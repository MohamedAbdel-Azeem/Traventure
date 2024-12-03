import { getAllTourists } from "../../Model/Queries/user_queries";
import { addPromoCode } from "../../Model/Queries/promo_codes_queries";
import sendMail from "./email_sender";
require("dotenv").config();

const generateRandomCode = async () => {
  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
  const numbers = "0123456789";
  let code = "";

  for (let i = 0; i < 5; i++) {
    const randomIndex = Math.floor(Math.random() * letters.length);
    code += letters[randomIndex];
  }

  for (let i = 0; i < 2; i++) {
    const randomIndex = Math.floor(Math.random() * numbers.length);
    code += numbers[randomIndex];
  }

  const added = await addPromoCode({ name: code, used: false });
  if (added) {
    return code;
  } else {
    return null;
  }
};

function sendPromoCode(username: string, email: string, promoCode: string) {
  const textHtml = `<h1>Happy Birthday ${username}!</h1> <br><p>Here is a promo code for you: <strong>${promoCode}</strong></p> <br> <p>Use this code to get 10% off on your next purchase.</p> <br> <p>Thank you for being a part of our community.</p>`;
  sendMail(email, "Happy Birthday!", textHtml);
}

async function handlePromoCode() {
  const tourists = await getAllTourists();
  const today = new Date();
  tourists?.forEach(async (tourist) => {
    const DOB = tourist.dateOfBirth;
    if (
      today.getMonth() === DOB.getMonth() &&
      today.getDate() === DOB.getDate()
    ) {
      try {
        const promoCode = await generateRandomCode();
        if (promoCode === null) throw new Error("Error generating promo code");
        sendPromoCode(tourist.username, tourist.email, promoCode);
      } catch (error) {
        console.error("Error sending promo code to: ", tourist.username);
        console.error(error);
      }
    }
  });
}

export default handlePromoCode;
