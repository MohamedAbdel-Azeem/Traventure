import express, { Request, Response, Router } from "express";
import stripe from "stripe";
const Stripe = new stripe('sk_test_51QRdbVFm6xcJ3Gl38kryyDRgSNzeWEFIls5QIfsWyKb2EBmi9aNoP38umgbvEWAGmcb4iIxgw19YfXWFe8IrltY200052c7f6l');
const router = Router();

router.post("/create-checkout-session", async (req: Request, res: Response) => {

     // i i exoect the req.body to have the following fieldsprice:price,
//   title:title,
//   image:main_Picture,
//   quantity:1
        const {price, title, image, quantity, username} = req.body as unknown as { price: number, title: string, image: string, quantity: number, username: string };
        const session = await Stripe.checkout.sessions.create({
          payment_method_types: ["card"],
          line_items: [
            {
              price_data: {
                currency: "EGP",
                product_data: {
                  name: title,
                  images: [image],
                },
                unit_amount: Math.round(price * 100),
              },
              quantity: quantity,
            },
          ],
          mode: "payment",
          success_url: `http://localhost:5173/tourist/${username}/itineraries`,
          cancel_url: `http://localhost:5173/tourist/${username}/itineraries`,
        })

        return res.status(200).send(session);
} );  

export default router;