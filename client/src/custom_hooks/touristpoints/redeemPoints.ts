import { useEffect, useState } from "react";
import axios from "axios";
import IFeedbackk from "../IFeedback";

export const redeemPoints = async (username: string, amount: number) => {
  try {
    const request = { username, amount };

    const response = await axios.patch(
      `/traventure/api/tourist/redeemPoints`,
      request
    );
    if (response.status >= 200 && response.status < 300) {
      return "Points redeemed successfully";
    } else {
      throw new Error("Error redeeming points");
    }
  } catch (error: any) {
    throw new Error(error.message || "Error redeeming points");
  }
};
