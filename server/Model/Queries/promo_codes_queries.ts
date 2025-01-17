import { check } from "express-validator";
import PromoCodes from "../Schemas/PromoCodes";

export const addPromoCode = async (newPromoCode: any) => {
  try {
    const addedPromoCode = await PromoCodes.create(newPromoCode);
    return addedPromoCode;
  } catch (err) {
    throw err;
  }
};

export const usePromoCode = async (name: string) => {
  try {
    let promocode = (await PromoCodes.findOne({ name: name })) as any;
    if (promocode && !promocode.used) {
      promocode.used = true;
      await promocode.save();
      return true;
    } else {
      return false;
    }
  } catch (e) {
    throw e;
  }
};

export const checkPromoCode = async (name: string) => {
  try {
    let promocode = (await PromoCodes.findOne({ name: name })) as any;
    if (promocode && !promocode.used) {
      return true;
    } else {
      return false;
    }
  } catch (e) {
    throw e;
  }
};

module.exports = { addPromoCode, usePromoCode, checkPromoCode };
