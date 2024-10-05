import { body } from "express-validator";

export const advertiserPatchValidator = [
  body("email").isEmail().optional(),
  body("websiteLink").isURL().optional(),
  body("hotline").isString().optional(),
  body("company").isString().optional(),
  body("isAccepted").isBoolean().optional(),
  body("founded").isNumeric().optional(),
  body("description").isString().optional(),
  body("location").isString().optional(),

];

module.exports = { advertiserPatchValidator };
