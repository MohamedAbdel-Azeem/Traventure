import e from "express";
import {body} from "express-validator"

export const preferenceTagsAddValidator = [
body("name").exists().isString().isLength({min : 3}).withMessage("Preference Tag Name should be at least 3 characters"),
];

export const preferenceTagsUpdateValidator = [
body("name").exists().isString().isLength({min : 3}).withMessage("Preference Tag Name should be at least 3 characters"),
] ;

module.exports = {preferenceTagsAddValidator,preferenceTagsUpdateValidator};