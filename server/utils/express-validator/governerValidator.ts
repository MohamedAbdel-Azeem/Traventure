
import { body } from "express-validator";

export const governerValidator = [
  body("username").isString().withMessage("Username must be a string")
  .isLength({ min: 3}).withMessage("Username must be between 3 and 20 characters long"),

    body("password").isString().withMessage("Password must be a string")
  .isLength({ min: 8 }).withMessage("Password must be at least 8 characters long"),

];

module.exports = { governerValidator };