import express, { Request, Response, Router } from "express";
import dotenv from "dotenv";
import stripe from "stripe";
const router = Router();
const secretKey = process.env.STRIPE_SECRET_KEY;

router.post("/create-payment-intent", async (req: Request, res: Response) => {
  if (!secretKey) {
    return res.status(500).send({ error: "Stripe secret key is missing" });
  }
  const Stripe = new stripe(secretKey);
  const {
    currency,
    paymentMethodType,
    paymentMethodOptions,
  }: {
    currency: string;
    paymentMethodType: string;
    paymentMethodOptions?: object;
  } = req.body;

  let orderAmount = 1400;
  let params: stripe.PaymentIntentCreateParams;

  // Each payment method type has support for different currencies. In order to
  // support many payment method types and several currencies, this server
  // endpoint accepts both the payment method type and the currency as
  // parameters. To get compatible payment method types, pass
  // `automatic_payment_methods[enabled]=true` and enable types in your dashboard
  // at https://dashboard.stripe.com/settings/payment_methods.
  //
  // Some example payment method types include `card`, `ideal`, and `link`.

  params = {
    payment_method_types:
      paymentMethodType === "link" ? ["link", "card"] : [paymentMethodType],
    amount: orderAmount,
    currency: "USD",
  };

  // If this is for an ACSS payment, we add payment_method_options to create
  // the Mandate.
  if (paymentMethodType === "acss_debit") {
    params.payment_method_options = {
      acss_debit: {
        mandate_options: {
          payment_schedule: "sporadic",
          transaction_type: "personal",
        },
      },
    };
  } else if (paymentMethodType === "customer_balance") {
    params.payment_method_data = {
      type: "customer_balance",
    } as any;
    params.confirm = true;
    params.customer =
      req.body.customerId ||
      (await Stripe.customers.create().then((data) => data.id));
  }

  /**
   * If API given this data, we can overwride it
   */
  if (paymentMethodOptions) {
    params.payment_method_options = paymentMethodOptions;
  }

  try {
    const paymentIntent: stripe.PaymentIntent =
      await Stripe.paymentIntents.create(params);

    // Send publishable key and PaymentIntent client_secret to client.
    res.send({
      clientSecret: paymentIntent.client_secret,
      nextAction: paymentIntent.next_action,
    });
  } catch (e) {
    console.log(e);
    res.status(400).send({
      error: {
        message: "error",
      },
    });
  }
});
// router.post("/create-checkout-session", async (req: Request, res: Response) => {
//   if (!secretKey) {
//     return res.status(500).send({ error: "Stripe secret key is missing" });
//   }
//   const Stripe = new stripe(secretKey);
//   // i i exoect the req.body to have the following fieldsprice:price,
//   //   title:title,
//   //   image:main_Picture,
//   //   quantity:1
//   const { price, title, image, quantity, username } = req.body as unknown as {
//     price: number;
//     title: string;
//     image: string;
//     quantity: number;
//     username: string;
//   };
//   const session = await Stripe.checkout.sessions.create({
//     payment_method_types: ["card"],
//     line_items: [
//       {
//         price_data: {
//           currency: "EGP",
//           product_data: {
//             name: title,
//             images: [image],
//           },
//           unit_amount: Math.round(price * 100000),
//         },
//         quantity: quantity,
//       },
//     ],
//     mode: "payment",
//     success_url: `http://localhost:5173/tourist/${username}/itineraries?session_id={CHECKOUT_SESSION_ID}`,
//     cancel_url: `http://localhost:5173/tourist/${username}/itineraries?status=cancelled`,
//   });

//   return res.status(200).send(session);
// });
router.get("/session/:id", async (req: Request, res: Response) => {
  const sessionId = req.params.id;
  if (!secretKey) {
    return res.status(500).send({ error: "Stripe secret key is missing" });
  }
  const Stripe = new stripe(secretKey);
  try {
    const session = await Stripe.checkout.sessions.retrieve(sessionId);
    res.status(200).send(session);
  } catch (error) {
    res.status(500).send({ error: "Unable to fetch session details" });
  }
});
export default router;
