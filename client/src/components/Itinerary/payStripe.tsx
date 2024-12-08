import React, { useState } from "react";
import {
  CardElement,
  useStripe,
  useElements,
  CardNumberElement,
  CardExpiryElement,
} from "@stripe/react-stripe-js";
import Button from "@mui/material/Button";
import { Modal } from "@mui/material";
import { Box } from "@mui/material";
import axios from "axios";
import ClipLoader from "react-spinners/ClipLoader";
import { useParams } from "react-router-dom";
import { GetCurrentUser } from "../../custom_hooks/currentuser";

interface PayStripeProps {
  handleOpen: () => void;
  handleClose: () => void;
  open: boolean;
  amount: number;
  name: string;
  products: any;

}

export const PayStripe: React.FC<PayStripeProps> = ({
  handleOpen,
  handleClose,
  open,
  amount,
  name,
  products
}) => {
  const stripe = useStripe();
  const elements = useElements();
  const [cardName, setCardName] = useState("");
  const { username } = useParams<{ username: string }>();
  const [loading, setLoading] = useState(false);
  const handleSubmit = async () => {
    // We don't want to let default form submission happen here,
    // which would refresh the page.
    setLoading(true);
    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.

      return;
    }

    const {
      data: { error: backendError, clientSecret },
    } = await axios.post("/traventure/api/stripe/create-payment-intent", {
      amount: amount,
      name: name,
    });
    if (backendError) {
      return;
    }

    const { error: stripeError, paymentIntent } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
          billing_details: {
            name: cardName,
          },
        },
      });
    console.log(elements.getElement(CardNumberElement));
    if (stripeError) {
      // Show error to your customer (e.g., insufficient funds)
      
      return;
    }
    if(paymentIntent?.status === "succeeded") {
      const items = [];
      for (const product of products) {
        items.push({
          name: product.name,
          amount: product.amount,
          quantity: product?.quantity || 1,
        });
      }

      await axios.post("/traventure/api/stripe/create-invoice", {
        items: items,
        payment_method: paymentIntent.payment_method,
      });

      handleClose();
    }
    // Show a success message to your customer
    // There's a risk of the customer closing the window before callback
    // execution. Set up a webhook or plugin to listen for the
    // payment_intent.succeeded event that handles any business critical
    // post-payment actions.
  };
  const CARD_ELEMENT_OPTIONS = {
    style: {
      base: {
        color: "#333",
        fontWeight: "500",
        fontSize: "16px",
        fontSmoothing: "antialiased",
        "::placeholder": { color: "#9ca3af" }, // Tailwind's text-gray-400
      },
      invalid: {
        iconColor: "#ef4444", // Tailwind's red-500
        color: "#ef4444",
      },
    },
    hidePostalCode: true,
    
    CardExpiryElement: {
      style: {
        base: {
          color: "#333",
          fontWeight: "500",
          fontSize: "16px",
          fontSmoothing: "antialiased",
          "::placeholder": { color: "#9ca3af" }, // Tailwind's text-gray-400
        },
        invalid: {
          iconColor: "#ef4444", // Tailwind's red-500
          color: "#ef4444",
        },
      },
    },
  };

  return (
    open && (
      <Modal onClose={handleClose} open={open}>
        <div className="bg-purple-600 rounded-lg shadow-xl max-w-md mx-auto p-6">
          <h2 className="text-lg font-semibold text-white mb-4 text-left">
        Enter Card Details
          </h2>
            <div className="p-2 border border-gray-300 rounded-lg bg-gray-100">
            <div className="flex justify-end">
              <button onClick={handleClose} className="text-white">
                X
              </button>
            </div>
            
            <CardElement className="mb-4" options={CARD_ELEMENT_OPTIONS} />
            <input
            type="text"
            placeholder="Name on Card"
            value={cardName}
            onChange={(e) => setCardName(e.target.value)}
            className="p-2 bg-gray-100 rounded-lg w-full focus:outline-none"
            />
            </div>
          {/* Pay Button */}
          <div className="mt-6 flex justify-end">
        <button
          onClick={handleSubmit}
          className="bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600 transition shadow-md"
          disabled={loading}
        >
            {loading ? <ClipLoader size={20} color={"#fff"} /> : "Pay"}
        </button>
          </div>
        </div>
      </Modal>
    )
  );
    
};

export default PayStripe;
