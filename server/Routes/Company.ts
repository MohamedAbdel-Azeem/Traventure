import { Request, Response, Router } from "express";
import { validationResult, matchedData, body } from "express-validator";
import {
  getCompanies,
  getCompanyById,
  addCompany,
} from "../Model/Queries/companies_queries";

const router = Router();

router.get("/", async (req: Request, res: Response) => {
  try {
    const companies = await getCompanies();
    res.status(200).json(companies);
  } catch (e: any) {
    res.status(500).json({ message: e.message });
  }
});

router.get("/:id", async (req: Request, res: Response) => {
  try {
    const company = await getCompanyById(req.params.id);
    res.status(200).json(company);
  } catch (e: any) {
    res.status(500).json({ message: e.message });
  }
});

router.post(
  "/add",
  [
    body("name").isString().exists().isLength({ min: 3 }),
    body("address").isString().exists().isLength({ min: 3 }),
    body("logo").isString().exists().isLength({ min: 3 }),
    body("about").isString().exists().isLength({ min: 3 }),
    body("websiteLink").isString().optional(),
    body("hotline").isString().optional(),
  ],
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const company = await addCompany(req.body);
      res.status(200).json(company);
    } catch (e: any) {
      res.status(500).json({ message: e.message });
    }
  }
);

export default router;
