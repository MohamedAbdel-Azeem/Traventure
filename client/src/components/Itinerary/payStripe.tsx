import React from "react";
import {
  CardElement,
  useStripe,
  useElements,
  CardNumberElement,
} from "@stripe/react-stripe-js";
import Button from "@mui/material/Button";
import { Modal } from "@mantine/core";
import { Box } from "@mui/material";
import axios from "axios";

interface PayStripeProps {
  handleOpen: () => void;
  handleClose: () => void;
  open: boolean;
  amount: number;
  name: string;
}

export const PayStripe: React.FC<PayStripeProps> = ({
  handleOpen,
  handleClose,
  open,
  amount,
  name
}) => {
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async () => {
    // We don't want to let default form submission happen here,
    // which would refresh the page.

    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.

      return;
    }

    const {
      data: { error: backendError, clientSecret },
    } = await axios.post("/traventure/api/stripe/create-payment-intent", {
      amount: amount,
    });

    if (backendError) {
      return;
    }

    const { error: stripeError, paymentIntent } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
          billing_details: {
            name: name,
          },
        },
      });
    console.log(elements.getElement(CardNumberElement));
    if (stripeError) {
      // Show error to your customer (e.g., insufficient funds)

      return;
    }

    // Show a success message to your customer
    // There's a risk of the customer closing the window before callback
    // execution. Set up a webhook or plugin to listen for the
    // payment_intent.succeeded event that handles any business critical
    // post-payment actions.
  };

  return (
    open && (
      <Modal onClose={handleClose} opened={open}>
        <CardElement />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          onClick={handleSubmit}
        >
          Pay
        </Button>
      </Modal>
    )
  );
};

export default PayStripe;
