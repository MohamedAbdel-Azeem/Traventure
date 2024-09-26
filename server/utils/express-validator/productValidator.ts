import { body } from "express-validator";

export const productAddValidator = [
  body("name")
    .isString()
    .isLength({ min: 3 })
    .withMessage("Name must be at least 3 characters long"),
  body("price").isNumeric().withMessage("Price must be a number"),
  body("description")
    .isString()
    .isLength({ min: 10 })
    .withMessage("Description must be at least 10 characters long"),
  body("seller").isString().exists().withMessage("Seller must be a string"),
  body("imageUrl")
    .isString()
    .exists()
    .withMessage("Image URL must be a string"),
  body("quantity").isNumeric().withMessage("Quantity must be a number"),
];

module.exports = { productAddValidator };
