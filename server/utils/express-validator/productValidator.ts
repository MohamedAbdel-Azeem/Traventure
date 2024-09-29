import { body } from "express-validator";

export const productAddValidator = [
  body("name")
    .isString()
    .isLength({ min: 3 })
    .withMessage("Name must be at least 3 characters long"),
  body("price")
    .isNumeric()
    .custom((value) => value >= 0)
    .withMessage("Price must be a positive number"),
  body("description")
    .isString()
    .isLength({ min: 10 })
    .withMessage("Description must be at least 10 characters long"),
  body("seller").isString().exists().withMessage("Seller must be a string"),
  body("imageUrl")
    .isString()
    .exists()
    .withMessage("Image URL must be a string"),
  body("quantity")
    .isNumeric()
    .custom((value) => value >= 0)
    .withMessage("Quantity must be a number"),
];

export const productUpdateValidator = [
  body("name")
    .optional()
    .isString()
    .isLength({ min: 3 })
    .withMessage("Name must be at least 3 characters long"),
  body("price")
    .optional()
    .isNumeric()
    .custom((value) => value >= 0)
    .withMessage("Price must be a number"),
  body("description")
    .optional()
    .isString()
    .isLength({ min: 10 })
    .withMessage("Description must be at least 10 characters long"),
  body("seller")
    .optional()
    .isString()
    .exists()
    .withMessage("Seller must be a string"),
  body("imageUrl")
    .optional()
    .isString()
    .exists()
    .withMessage("Image URL must be a string"),
  body("quantity")
    .optional()
    .isNumeric()
    .custom((value) => value >= 0)
    .withMessage("Quantity must be a number"),
  body("feedback")
    .optional()
    .isArray()
    .withMessage("Feedback must be an array"),
];

module.exports = { productAddValidator, productUpdateValidator };
