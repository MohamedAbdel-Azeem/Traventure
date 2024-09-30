
import { body } from "express-validator";

export const governerValidator = [
  body("username").isString().withMessage("Username must be a string")
  .isLength({ min: 3 , max: 20 }).withMessage("Username must be between 3 and 20 characters long"),

    body("password").isString().withMessage("Password must be a string")
    .isLength({ min: 8 }).withMessage("Password must be at least 8 characters long")
    .matches(/[A-Z]/).withMessage("Password must contain at least one uppercase letter")
    .matches(/[a-z]/).withMessage("Password must contain at least one lowercase letter")
    .matches(/\d/).withMessage("Password must contain at least one number")
    .matches(/[\W_]/).withMessage("Password must contain at least one special character"),

];

module.exports = { governerValidator };