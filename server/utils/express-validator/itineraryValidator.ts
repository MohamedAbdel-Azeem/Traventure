import { body } from "express-validator";
import mongoose from "mongoose";

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
  body('selectedTags')
        .isArray({min: 1})
        .withMessage('Selected tags must be an array')
        .custom((selectedTags) => {
      selectedTags.forEach((tag: any) => {
        if (!mongoose.Types.ObjectId.isValid(tag)) {
          throw new Error('Each selected tag must be a valid ObjectId');
        }
      });
      return true;
        }),
  body("pickup_location").isString().withMessage("Pickup location is required"),
  body("dropoff_location").isString().withMessage("Dropoff location is required"),
  body('plan')
    .isArray({ min: 1 })
    .withMessage('Plan must be an array with at least one element')
    .custom((plan) => {
      plan.forEach((item:any) => {
        if (!item.place || !mongoose.Types.ObjectId.isValid(item.place)) {
          throw new Error('Each plan item must have a valid place ID');
        }
        if (item.activities) {
          item.activities.forEach((activity: any) => {
            if (!activity.activity_id || !mongoose.Types.ObjectId.isValid(activity.activity_id)) {
              throw new Error('Each activity must have a valid activity ID');
            }
            if (typeof activity.activity_duration !== 'number' || activity.activity_duration <= 0) {
              throw new Error('Each activity must have a positive activity duration');
            }
            const validTimeUnits = ['sec', 'min', 'hours', 'days', 'month', 'years'];
            if (typeof activity.time_unit !== 'string' || !validTimeUnits.includes(activity.time_unit.trim())) {
              throw new Error('Each activity must have a valid time unit (sec, min, hours, days, month, years)');
            }
          });
        }
      });
      return true;
    }),
  body('booked_By')
    .optional()
    .isArray(),
  body('accesibility')
    .isBoolean(),
  body('bookingActivated')
    .optional()
    .isBoolean()
    ,
    body("inappropriate").optional().isBoolean().withMessage("inappropriate should be a boolean"),
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
    body('selectedTags')
        .optional()
        .isArray({min: 1})
        .withMessage('Selected tags must be an array')
        .custom((selectedTags) => {
      selectedTags.forEach((tag: any) => {
        if (!mongoose.Types.ObjectId.isValid(tag)) {
          throw new Error('Each selected tag must be a valid ObjectId');
        }
      });
      return true;
        }),
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
  body("pickup_location")
    .optional()
    .isString()
    .withMessage("Pickup location is required"),
  body("dropoff_location")
    .optional()
    .isString()
    .withMessage("Dropoff location is required"),
  body('plan')
    .optional()
    .isArray({ min: 1 })
    .withMessage('Plan must be an array with at least one element')
    .custom((plan) => {
      plan.forEach((item: any) => {
        if (!item.place || !mongoose.Types.ObjectId.isValid(item.place)) {
          throw new Error('Each plan item must have a valid place ID');
        }
         if (item.activities) {
          item.activities.forEach((activity: any) => {
            if (!activity.activity_id || !mongoose.Types.ObjectId.isValid(activity.activity_id)) {
              throw new Error('Each activity must have a valid activity ID');
            }
            if (typeof activity.activity_duration !== 'number' || activity.activity_duration <= 0) {
              throw new Error('Each activity must have a positive activity duration');
            }
            const validTimeUnits = ['sec', 'min', 'hours', 'days', 'month', 'years'];
            if (typeof activity.time_unit !== 'string' || !validTimeUnits.includes(activity.time_unit.trim())) {
              throw new Error('Each activity must have a valid time unit (sec, min, hours, days, month, years)');
            }
          });
        }
      });
      return true;
    }),
  body('booked_By')
    .optional()
    .isArray(),
  body('accesibility')
    .optional()
    .isBoolean(),
  body('bookingActivated')
    .optional()
    .isBoolean()  ,
    body("inappropriate").optional().isBoolean().withMessage("inappropriate should be a boolean"),
];

module.exports = { itineraryAddValidator, itineraryUpdateValidator };