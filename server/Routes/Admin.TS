import { Request, Response } from "express";
import AdminSchema from "../Model/Schemas/Admin";
import Router from "express";
import { matchedData, validationResult } from "express-validator";
import { addProduct } from "../Model/Queries/product_queries";
import { productAddValidator } from "../utils/express-validator/productValidator";

const router = Router();



export default router;
