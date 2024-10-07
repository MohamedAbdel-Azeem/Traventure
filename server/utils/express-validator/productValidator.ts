import { body, check, validationResult } from "express-validator";

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
  body("imageUrl")
    .isString()
    .exists()
    .withMessage("Image URL must be a string"),
  body("quantity")
    .isNumeric()
    .custom((value) => value >= 0)
    .withMessage("Quantity must be a number"),
  check("seller")
    .optional()
    .isString()
    .withMessage("Seller must be a string"),
  check("externalseller")
    .optional()
    .isString()
    .withMessage("External seller must be a string"),
  body()
    .custom((value, { req }) => {
      if (!req.body.seller && !req.body.externalseller) {
        throw new Error("Either seller or externalseller must be provided");
      }
      if (req.body.seller && req.body.externalseller) {
        throw new Error("Only one of seller or externalseller can be provided");
      }
      return true;
    })
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
    .optional(),
  body("imageUrl")
    .optional()
    .isString()
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
