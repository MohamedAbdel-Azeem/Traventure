import { body } from "express-validator";

export const placeAddValidator = [
  body("name")
    .isString()
    .isLength({ min: 3 })
    .withMessage("Name must be at least 3 characters long"),
  body("description")
    .isString()
    .withMessage("Description must be at least 10 characters long"),
  body("pictures")
    .isArray()
    .withMessage("Pictures must be an array of strings")
    .custom((arr) => arr.every((pic: String) => typeof pic === "string"))
    .withMessage("Invlaid image url"),
  body("location.latitude")
    .isNumeric()
    .withMessage("Latitude must be a number"),
  body("location.longitude")
    .isNumeric()
    .withMessage("Longitude must be a number"),
  body("opening_hrs").isString().withMessage("Opening hours must be a string"),
  body("ticket_price.native")
    .isNumeric()
    .withMessage("Native ticket price must be a number"),
  body("ticket_price.foreign")
    .isNumeric()
    .withMessage("Foreign ticket price must be a number"),
  body("ticket_price.student")
    .isNumeric()
    .withMessage("Student ticket price must be a number"),
  body("added_By").exists().isString().withMessage("Added by must be a string"),
];

export const placeUpdateValidator = [
  body("name")
    .optional()
    .isString()
    .isLength({ min: 3 })
    .withMessage("Name must be at least 3 characters long"),
  body("description")
    .optional()
    .isString()
    .isLength({ min: 10 })
    .withMessage("Description must be at least 10 characters long"),
  body("pictures")
    .optional()
    .isArray()
    .withMessage("Pictures must be an array of strings")
    .custom((arr) => arr.every((pic: String) => typeof pic === "string"))
    .withMessage("Each picture must be a string"),
  body("location.latitude")
    .optional()
    .isNumeric()
    .withMessage("Latitude must be a number"),
  body("location.longitude")
    .optional()
    .isNumeric()
    .withMessage("Longitude must be a number"),
  body("opening_hrs")
    .optional()
    .isString()
    .withMessage("Opening hours must be a string"),
  body("ticket_price.native")
    .optional()
    .isNumeric()
    .withMessage("Native ticket price must be a number"),
  body("ticket_price.foreign")
    .optional()
    .isNumeric()
    .withMessage("Foreign ticket price must be a number"),
  body("ticket_price.student")
    .optional()
    .isNumeric()
    .withMessage("Student ticket price must be a number"),
];

module.exports = { placeAddValidator, placeUpdateValidator };
