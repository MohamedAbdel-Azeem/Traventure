import { body } from "express-validator";

export const itineraryAddValidator = [
  body("main_Picture")
    .optional()
    .isString()
    .withMessage("Image URL must be a string"),
  body("title")
    .isString()
    .isLength({ min: 3 })
    .withMessage("Title must be at least 3 characters long"),
  body("description")
    .isString()
    .isLength({ min: 10 })
    .withMessage("Description must be at least 10 characters long"),
  body("added_By")
    .isString()
    .notEmpty()
    .withMessage("Tour Guide ID is required"),
  body("price")
    .isNumeric()
    .custom((value) => value >= 0)
    .withMessage("Price must be a number"),
  body("starting_Date")
    .isISO8601()
    .withMessage("Starting Date must be in the format YYYY-MM-DD"),
  body("ending_Date")
    .isISO8601()
    .withMessage("Ending Date must be in the format YYYY-MM-DD")
    .custom((value, { req }) => {
      const starting_Date = new Date(req.body.starting_Date);
      const ending_Date = new Date(value);
      if (ending_Date <= starting_Date) {
        throw new Error("Ending Date must be after the Starting Date");
      }
      return true;
    }),
  body("rating")
    .isFloat({ min: 0, max: 5 })
    .withMessage("Rating must be a number between 0 and 5"),
  body("total").isNumeric().withMessage("Total must be a number"),
  body("language").isString().withMessage("Language is required"),
  body("pickup_location").isString().withMessage("Pickup location is required"),
  body("dropoff_location").isString().withMessage("Dropoff location is required"),
  body('places')
    .optional()
    .isArray(),
  body('activities')
    .optional()
    .isArray(),
  body('booked_By')
    .optional()
    .isArray(),
  body('accesibility')
    .isBoolean()
];

export const itineraryUpdateValidator = [
  body("main_Picture")
    .optional()
    .isString()
    .withMessage("Image URL must be a string"),
  body("title")
    .optional()
    .isString()
    .isLength({ min: 3 })
    .withMessage("Title must be at least 3 characters long"),
  body("description")
    .optional()
    .isString()
    .isLength({ min: 10 })
    .withMessage("Description must be at least 10 characters long"),
  body("price")
    .optional()
    .isNumeric()
    .custom((value: number) => value >= 0)
    .withMessage("Price must be a positive number"),
  body("starting_Date")
    .optional()
    .isISO8601()
    .withMessage("Starting Date must be in the format YYYY-MM-DD"),
  body("ending_Date")
    .optional()
    .isISO8601()
    .withMessage("Ending Date must be in the format YYYY-MM-DD")
    .custom((value, { req }) => {
      if (req.body.starting_Date) {
        const starting_Date = new Date(req.body.starting_Date);
        const ending_Date = new Date(value);
        if (ending_Date <= starting_Date) {
          throw new Error("Ending Date must be after the Starting Date");
        }
      }
      return true;
    }),
  body("rating")
    .optional()
    .isFloat({ min: 0, max: 5 })
    .withMessage("Rating must be a number between 0 and 5"),
  body("total")
    .optional()
    .isNumeric()
    .withMessage("Total must be a number"),
  body("language")
    .optional()
    .isString()
    .notEmpty()
    .withMessage("Language is required"),
  body("places")
    .optional()
    .isArray(),
  body("activities")
    .optional()
    .isArray()

];

module.exports = { itineraryAddValidator, itineraryUpdateValidator };