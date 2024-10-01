import { body } from "express-validator";
import { model } from "mongoose";

export const guestAddValidator = [
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
    .withMessage("Password must be at least 8 characters long")
];


    

module.exports = {guestAddValidator};