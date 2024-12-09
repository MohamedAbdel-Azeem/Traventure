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
import { SwapCalls } from "@mui/icons-material";
import Swal from "sweetalert2";
import { usePromoCode } from "../../custom_hooks/promo_codes/promocodecustomhooks";
import { useDispatch } from "react-redux";
import { clearCart } from "../../redux/cartSlice";
import { useNavigate } from "react-router-dom";

interface PayStripeProps {
  className?: string;
  handleOpen: () => void;
  handleClose: () => void;
  open: boolean;
  amount: number;
  name: string;
  products: any;
  handleBuy: () => void;
}

export const PayStripe: React.FC<PayStripeProps> = ({
  className,
  handleOpen,
  handleClose,
  open,
  amount,
  name,
  products,
  handleBuy,
}) => {
  const stripe = useStripe();
  const elements = useElements();
  const [cardName, setCardName] = useState("");
  const { username } = useParams<{ username: string }>();
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

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
      Swal.fire({
        icon: "error",
        title: "Payment Failed",
        text: "Error in payment",
      });
      handleClose();
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
      Swal.fire({
        icon: "error",
        title: "Payment Failed",
        text: "Error in payment",
      });
      handleClose();
    }
    if (paymentIntent?.status === "succeeded") {
      handleBuy();
      const items = [];
      for (const product of products) {
        items.push({
          name: product.name,
          amount: product.amount,
          quantity: product?.quantity || 1,
        });
      }

      const mail = await axios.post("/traventure/api/stripe/create-invoice", {
        items: items,
        payment_method: paymentIntent.payment_method,
      });
      // if (mail.status === 200) {
      //   Swal.fire({
      //     icon: "success",
      //     title: "Payment Successful",
      //     text: "Invoice has been sent to your email",
      //   });
      // } else {
      //   Swal.fire({
      //     icon: "error",
      //     title: "Payment Failed",
      //     text: "Error in payment",
      //   });
      // }
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
      <Modal
        className="flex m-auto h-[270px] w-[400px]"
        onClose={handleClose}
        open={open}
      >
        <div
          className={`bg-gradient-to-b from-[#A855F7] to-[#6D28D9] rounded-lg shadow-xl max-w-md mx-auto p-6 relative flex flex-col h-[270px] w-[400px]`}
        >
          <button
            onClick={handleClose}
            className="text-[28px] absolute top-2 right-2 text-white bg-red-500 rounded hover:bg-red-600 transition w-10 h-10"
          >
            &times;
          </button>
          <h2 className="text-lg font-semibold text-white mb-4 text-left">
            Enter Card Details
          </h2>
          <div className="p-2 border border-gray-300 rounded-lg bg-gray-100">
            <CardElement className="mb-4 p-4" options={CARD_ELEMENT_OPTIONS} />
            <input
              type="text"
              placeholder="Name on Card"
              value={cardName}
              onChange={(e) => setCardName(e.target.value)}
              className="p-2 bg-gray-100 rounded-lg w-full focus:outline-none"
              required
            />
          </div>
          {/* Pay Button */}
          <div className="mt-6 flex justify-end">
            <button
              onClick={handleSubmit}
              className="bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600 transition shadow-md"
              disabled={loading || !cardName.trim()}
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
