import { body } from "express-validator";

export const addActivityValidator = [
    body("Title").exists().isString().withMessage("Title should be a valid string"),
    body("DateAndTime").exists().isISO8601().toDate().withMessage("DateAndTime should be a  date"),
    body("Location").exists().isObject().withMessage("Location should be an object"),
    body("Location.latitude")
    .exists()
    .isNumeric()
    .withMessage("Latitude must be a number").custom((lat) => 
    lat >= -90 && lat <= 90
    ).withMessage("Latitude must be between -90 and 90"),
  body("Location.longitude")
    .exists()
    .isNumeric()
    .withMessage("longitude must be a number").custom((value) => 
        value >= -180 && value <= 180
        ).withMessage("longitude must be between -180 and 180"),
    body("Price").exists().isNumeric().custom((value)=>value >= 0).withMessage("Price should be a valid number greater than or equal to 0"),
    body("SpecialDiscount").exists().custom((value)=>value >= 0).withMessage("SpecialDiscount should be a valid number greater than or equal to 0"),
    body("Category").exists().isString().withMessage("Category should be a valid string"),
    body("Tags").exists().isArray().withMessage("Tags should be an array of strings"),
    body("Tags.*").isString().withMessage("Each tag should be a valid string"),
    body("added_By").exists().isString().withMessage("Please add added_by"),
    body("BookingIsOpen").exists().isBoolean().withMessage("BookingIsOpen should be a boolean"),
    body("added_By").exists().isString().withMessage("added_By should be a valid string"),
    body("inappropriate").optional().isBoolean().withMessage("inappropriate should be a boolean"),
];

export const updateActivityValidator = [
    body("Title").optional().isString().withMessage("Title should be a valid string"),
    body("DateAndTime").optional().isISO8601().toDate().withMessage("DateAndTime should be a valid ISO 8601 date"),
    body("Location").optional().isObject().withMessage("Location should be an object"),
    body("Location.latitude")
    .optional()
    .isNumeric()
    .withMessage("Latitude must be a number").custom((value) => 
    value >= -90 && value <= 90
    ).withMessage("Latitude must be between -90 and 90"),
  body("Location.longitude")
    .optional()
    .isNumeric()
    .withMessage("longitude must be a number").custom((value) => 
        value >= -180 && value <= 180
        ).withMessage("longitude must be between -180 and 180"),
    body("Price").optional().isNumeric().custom((value)=>value >= 0).withMessage("Price should be a valid number greater than or equal to 0"),
    body("SpecialDiscount").optional().custom((value)=>value >= 0).withMessage("SpecialDiscount should be a valid number greater than or equal to 0"),
    body("Category").optional().isString().withMessage("Category should be a valid string"),
    body("Tags").optional().isArray().withMessage("Tags should be an array of strings"),
    body("Tags.*").isString().withMessage("Each tag should be a valid string"),
    body("BookingIsOpen").optional().isBoolean().withMessage("BookingIsOpen should be a boolean"),
    body("inappropriate").optional().isBoolean().withMessage("inappropriate should be a boolean"),
];

module.exports = {addActivityValidator, updateActivityValidator}