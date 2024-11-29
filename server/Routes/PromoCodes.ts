import { Request, Response, Router } from "express";
import { validationResult, matchedData, body } from "express-validator";
import {
  usePromoCode,
  addPromoCode,
} from "../Model/Queries/promo_codes_queries";
const router = Router();

router.get("/use/:name", async (req: Request, res: Response) => {
  try {
    const promoCode = await usePromoCode(req.params.name);
    res.status(200).send(promoCode);
  } catch (err) {
    res.status(500).send("error using promo code");
  }
});

router.post(
  "/add",
  [body("name").exists().isString()],
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(400).json({ errors: errors.array() });
    const promoCodeData = matchedData(req);
    try {
      const newPromoCode = await addPromoCode(promoCodeData);
      res.status(201).send(newPromoCode);
    } catch (err) {
      res.status(500).send("error creating promo code");
    }
  }
);

export default router;
