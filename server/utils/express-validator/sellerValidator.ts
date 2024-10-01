import { body } from "express-validator";

export const sellerPatchValidator = [
    body("email").isEmail().optional(),
    body("name").isString().optional(),
    body("description").isString().optional(),
    body("isAccepted").isBoolean().optional()
];

module.exports = { sellerPatchValidator };
