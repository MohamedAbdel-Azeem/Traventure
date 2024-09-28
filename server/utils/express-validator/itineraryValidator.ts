import { body } from "express-validator";

export const itineraryAddValidator = [
  body("main_Picture")
    .optional()
    .isString()
    .exists()
    .withMessage("Image URL must be a string"),
  body("title")
    .isString()
    .isLength({ min: 3 })
    .withMessage("Title must be at least 3 characters long"),
  body("description")
    .isString()
    .isLength({ min: 10 })
    .withMessage("Description must be at least 10 characters long"),
  body("pictures")
    .optional()
    .isArray()
    .withMessage("Pictures must be an array of strings")
    .custom((arr) => arr.every((pic: String) => typeof pic === "string"))
    .withMessage("Each picture must be a string"),
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
  body("language").isString().notEmpty().withMessage("Language is required"),
  body('places')
  .isArray({ min: 1 })
  .withMessage('At least one place is required')
  .custom((places) => {
    places.forEach((place:any) => {
      if (!place.place_id || typeof place.place_id !== 'string') {
        throw new Error('Each place must have a valid place_id');
      }
    });
    return true;
  }),
  body('activities')
  .isArray({ min: 1 })
  .withMessage('At least one activity is required')
  .custom((activities) => {
    activities.forEach((activity:any) => {
      if (!activity.activity_id || typeof activity.activity_id !== 'string') {
        throw new Error('Each activity must have a valid activity_id');
      }
    });
    return true;
  })
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
    body("pictures")
      .optional() 
      .isArray()
      .withMessage("Pictures must be an array of strings")
      .custom((arr) => arr.every((pic: string) => typeof pic === "string"))
      .withMessage("Each picture must be a string"),
    body("price")
      .optional()  
      .isNumeric()
      .custom((value) => value >= 0)
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
      .isArray({ min: 1 })
      .withMessage("At least one place is required")
      .custom((places) => {
        places.forEach((place: any) => {
          if (!place.place_id || typeof place.place_id !== "string") {
            throw new Error("Each place must have a valid place_id");
          }
        });
        return true;
      }),
    body("activities")
      .optional() 
      .isArray({ min: 1 })
      .withMessage("At least one activity is required")
      .custom((activities) => {
        activities.forEach((activity: any) => {
          if (!activity.activity_id || typeof activity.activity_id !== "string") {
            throw new Error("Each activity must have a valid activity_id");
          }
        });
        return true;
      })
  ];

  
module.exports = { itineraryAddValidator, itineraryUpdateValidator };