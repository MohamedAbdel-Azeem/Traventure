import handlePromoCode from "./promo_code_function";
const schedule = require("node-schedule");

// Schedule a function to run every day at 3 PM
module.exports = () => {
  schedule.scheduleJob("00 13 * * *", async () => {
    console.log("Running promo code scheduler");
    handlePromoCode();
  });
};
