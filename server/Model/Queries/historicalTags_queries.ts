import { get } from "http";
import HistoricalTag from "../Schemas/HistoricalTag";

export const getHistoricalTag = async () => {
  try {
    return await HistoricalTag.find();
  } catch (e) {
    throw e;
  }
};

export const addHistoricalTag = async (newHistoricalTag: any) => {
  try {
    const addedHistoricalTag = HistoricalTag.create(newHistoricalTag);
    return addedHistoricalTag;
  } catch (err) {
    throw err;
  }
};

module.exports = { getHistoricalTag, addHistoricalTag };