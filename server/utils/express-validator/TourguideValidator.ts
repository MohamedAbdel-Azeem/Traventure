import { body } from "express-validator";
export const tourGuideUpdateValidator = [
  body("mobileNumber")
    .optional()
    .isString()
    .isLength({ max: 14, min: 12 })
    .withMessage("Mobile number must between 12 and 14 characters long"),
  body("yearsOfExperience")
    .optional()
    .isNumeric()
    .withMessage("Years of experience must be a number"),
  body("previousWork")
    .optional()
    .isArray()
    .withMessage("Previous work must be an array"),
  body("previousWork.*.company")
    .optional()
    .isString()
    .withMessage("Company name must be a string"),
  body("previousWork.*.startDate").optional(),
  body("previousWork.*.endDate").optional(),
  body("previousWork.*.stillWorkHere").optional(),
  body("previousWork.*.role")
    .optional()
    .isString()
    .withMessage("Role must be a string"),
  body("previousWork.*.location")
    .optional()
    .isString()
    .withMessage("Location must be a string"),
  body("previousWork.*.description")
    .optional()
    .isString()
    .withMessage("Description must be a string"),
  body("profilepic").optional().isString().withMessage("Profile picture must be a string"),
];
