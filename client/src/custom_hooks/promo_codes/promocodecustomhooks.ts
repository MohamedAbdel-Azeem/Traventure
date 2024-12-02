import axios from "axios";

export const usePromoCode = async (username: string) => {
  try {
    const response = await axios.get(
      `/traventure/api/promocode/use/${username}`
    );
    if (response.status >= 200 && response.status < 300) {
      return response.data;
    } else {
      throw new Error("Error checking code");
    }
  } catch (error) {
    throw new Error(error.message || "Error checking code");
  }
};

export const useCheckPromoCode = async (username: string) => {
  try {
    const response = await axios.get(
      `/traventure/api/promocode/check/${username}`
    );
    if (response.status >= 200 && response.status < 300) {
      return response.data;
    } else {
      throw new Error("Error checking code");
    }
  } catch (error) {
    throw new Error(error.message || "Error checking code");
  }
};

export const useAddPromoCode = async (promoCode: string) => {
  try {
    const response = await axios.post("/traventure/api/promocode/add", {
      name: promoCode,
    });
    if (response.status >= 200 && response.status < 300) {
      return response.data;
    } else {
      throw new Error("Error checking code");
    }
  } catch (error) {
    throw new Error(error.message || "Error checking code");
  }
};

export const getPromoCode = async (username:string) => {
  try {
    const response = await axios.get(`/traventure/api/tourist/promo_code/get/${username}`);
    if (response.status >= 200 && response.status < 300) {
      return response.data;
    } else {
      throw new Error("Error checking code");
    }
  } catch (error) {
    throw new Error(error.message || "Error checking code");
  }
};

export const usePromoCodeagain = async (username:string) => {
  try {
    const response = await axios.patch(`/traventure/api/tourist/promo_code/use/${username}`);
    if (response.status >= 200 && response.status < 300) {
      return response.data;
    } else {
      throw new Error("Error checking code");
    }
  } catch (error) {
    throw new Error(error.message || "Error checking code");
  }
};