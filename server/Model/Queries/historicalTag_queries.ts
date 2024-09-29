import mongoose from "mongoose";
import historicalTagModel from "../Schemas/HistoricalTag";

export async function addHistoricalTags(HistoricalTag: any) {
    try {

      const oldHistoricalTag = await historicalTagModel.findOne(HistoricalTag);
      if (oldHistoricalTag) {
      return null;
      }
      const newHistoricalTag = await historicalTagModel.create(HistoricalTag);
      return newHistoricalTag;
    } catch (error) {
      throw error;
    }
  }

  module.exports = { addHistoricalTags }