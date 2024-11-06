import { body } from "express-validator";

export const sellerPatchValidator = [
    body("email").isEmail().optional(),
    body("name").isString().optional(),
    body("description").isString().optional(),
    body("isAccepted").isBoolean().optional(),
    body("profilepic").optional().isString().withMessage("Profile picture must be a string"),
];

module.exports = { sellerPatchValidator };
