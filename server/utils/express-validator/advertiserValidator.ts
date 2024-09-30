import { body } from "express-validator";

export const advertiserPatchValidator = [
  body("email").isEmail().optional(),
  body("websiteLink").isURL().optional(),
  body("hotline").isString().optional(),
  body("companyProfile").isString().optional(),
  body("isAccepted").isBoolean().optional(),
];

module.exports = { advertiserPatchValidator };