import e from "express";
import {body} from "express-validator"

export const categoryValidator = [
    body("name").exists().isString().isLength({min : 3}).withMessage("Category Name should be at least 3 characters"),
];

export const categoryUpdateValidator = [
    body("name").exists().isString().isLength({min : 3}).withMessage("Category Name should be at least 3 characters"),
];

module.exports = {categoryValidator,categoryUpdateValidator}