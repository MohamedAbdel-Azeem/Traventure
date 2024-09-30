import { body } from "express-validator";
import { model } from "mongoose";

export const touristAddValidator = [
    body("username")
    .isString()
    .isLength({ min: 3 })
    .withMessage("Username must be at least 3 characters long"),
    body("email")
    .isEmail()
    .withMessage("Invalid email"),
    body("password")
    .isString()
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters long"),
    body("mobileNumber")
    .isString()
    .isLength({ min: 11, max:11 })
    .withMessage("Mobile number must be exactly 11 characters long"),
    body("dateOfBirth")
    .isString()
    .withMessage("Invalid Date of Birth"),
    body("nationality")
    .isString()
    .withMessage("Invalid Nationality"),
    body("Occupation")
    .isString()
    .withMessage("Invalid Occupation")
];
    
export const touristUpdateValidator = [
    body('email').isEmail().withMessage('Invalid email').optional(),
    body('password').isString().isLength({ min: 8 }).withMessage('Password must be at least 8 characters long').optional(),
    body('mobileNumber').isString().isLength({ min: 11, max: 11 }).
    withMessage('Mobile number must be exactly 11 characters long').optional(),
    body('Occupation').isString().withMessage('Invalid Occupation').optional(),
    body('nationality').isString().withMessage('Invalid Nationality').optional()
]

module.exports = {touristAddValidator,touristUpdateValidator};