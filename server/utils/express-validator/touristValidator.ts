import { body } from "express-validator";
import { model } from "mongoose";

export const touristAddValidator = [
  body("username")
    .isString()
    .isLength({ min: 3 })
    .withMessage("Username must be at least 3 characters long"),
  body("email").isEmail().withMessage("Invalid email"),
  body("password")
    .isString()
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters long"),
  body("mobileNumber")
    .isString()
    .exists()
    .withMessage("Mobile number must be exactly 11 characters long"),
  body("dateOfBirth").isString().withMessage("Invalid Date of Birth"),
  body("nationality").isString().withMessage("Invalid Nationality"),
  body("Occupation").isString().withMessage("Invalid Occupation"),
];

export const touristUpdateValidator = [
  body("email").isEmail().withMessage("Invalid email").optional(),
  body("password")
    .isString()
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters long")
    .optional(),
  body("mobileNumber")
    .isString()
    .isLength({ min: 12, max: 14 })
    .withMessage("Mobile number must be exactly 11 characters long")
    .optional(),
  body("Occupation").isString().withMessage("Invalid Occupation").optional(),
  body("nationality").isString().withMessage("Invalid Nationality").optional(),
  body("bookings").isArray().optional(),
  body("purchases").isArray().optional(),
  body("profilepic").optional().isString(),
];

module.exports = { touristAddValidator, touristUpdateValidator };
