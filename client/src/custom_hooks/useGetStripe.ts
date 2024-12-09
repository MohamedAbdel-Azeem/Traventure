import axios from "axios";
import { useState, useEffect } from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
const apiKey = import.meta.env.VITE_STRIPE_PUBLIC_KEY;

export const useGetStripe = () => {
  console.log(apiKey);
  const stripe = loadStripe(apiKey);
  return { stripe };
};
