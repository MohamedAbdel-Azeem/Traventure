import { Request, Response, Router } from "express";
import { usePromoCode } from "../Model/Queries/promo_codes_queries";
const router = Router();

router.get("/use/:name", async (req: Request, res: Response) => {
  try {
    const isUsed = await usePromoCode(req.params.name);
    res.status(200).send(isUsed);
  } catch (err) {
    res.status(500).send("error using promo code");
  }
});

export default router;
