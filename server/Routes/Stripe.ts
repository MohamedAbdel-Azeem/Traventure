import express, { Request, Response, Router } from "express";
import dotenv from "dotenv";
import stripe from "stripe";
import { sendMailWithPdf } from "../utils/functions/email_sender";
import Tourist from "../Model/Schemas/Tourist";
import jwt from 'jsonwebtoken';
const router = Router();
const secretKey = process.env.STRIPE_SECRET_KEY;

router.post("/create-payment-intent", async (req: Request, res: Response) => {
  if (!secretKey) {
    return res.status(500).send({ error: "Stripe secret key is missing" });
  }
  const Stripe = new stripe(secretKey);
  const {
    amount,
    currency,
    paymentMethodType,
    paymentMethodOptions,
  }: {
    amount: number;
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
    amount: Math.round(amount*1000),
    currency: "EGP",
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

router.post("/create-invoice", async (req: Request, res: Response) => {
  const { items, payment_method} = req.body;
  console.log(items);
 
  const token = req.cookies['access_token'];
  const decoded = jwt.verify(token, 'supersecret') as { id: string };
  const userId = decoded.id;
  const user = await Tourist.findById(userId);
  const name = user?.username;
  const email = user?.email;
  if (!secretKey) {
    return res.status(500).send({ error: "Stripe secret key is missing" });
  }
  console.log("Creating invoice for:", name, email, items);
  const Stripe = new stripe(secretKey);
  const guestCustomer = await Stripe.customers.create({
    email: email,
    name: name,
  });

  const customerId = guestCustomer.id;
  console.log("Creating invoice for ttrs");
  try {
    const invoice = await Stripe.invoices.create({
      customer: customerId,
      auto_advance: true,
      currency: "EGP",
      // Automatically finalize the invoice
      collection_method: "send_invoice", // For sending invoices manually (no immediate payment link)
      days_until_due: 7,

      // Optional: Set a due date
    });
    console.log("before for");
    // 1. Add Invoice Items
    for (const item of items) {
      //console.log("Creating invoice item:", item);

      // Create the product and price dynamically
      const product = await Stripe.products.create({
        name: item.name,
      });

      const price = await Stripe.prices.create({
        unit_amount: item.amount*100,
        currency: "EGP",
        product: product.id,
      });

      const invoiceItem = await Stripe.invoiceItems.create({
        customer: customerId,
        price: price.id,
        quantity: item.quantity || 1,
        invoice: invoice.id,
      });

      //console.log("Created invoice item:", invoiceItem);
    }
    console.log(customerId);
    // 2. Create Invoice (this automatically includes the invoice items linked to the customer)

    //console.log("Invoice created:", invoice);

    // 3. Finalize the Invoice
    const finalizedInvoice = await Stripe.invoices.finalizeInvoice(invoice.id);
    //  console.log("Finalized invoice lines:", finalizedInvoice.lines);

    // 4. Retrieve Finalized Invoice
    const retrievedInvoice = await Stripe.invoices.retrieve(
      finalizedInvoice.id
    );

    // 5. Send the Invoice via Email
    //const mailres = await Stripe.invoices.sendInvoice(retrievedInvoice.id);

    // 6. Respond with Invoice URLs
    console.log("Finalized invoice:", finalizedInvoice);
    await sendMailWithPdf(email || " ", "Traventure Invoice Purchase", "", finalizedInvoice?.invoice_pdf || "");
    res.status(200).send({
      hostedInvoiceUrl: finalizedInvoice.hosted_invoice_url,
      invoicePdfUrl: finalizedInvoice.invoice_pdf,
    });
  } catch (error: any) {
    console.error("Error creating or sending invoice:", error);
    res.status(500).send({ error: error.message });
  }
});
export default router;
