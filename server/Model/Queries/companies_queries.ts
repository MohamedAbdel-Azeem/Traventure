import mongoose from "mongoose";
import Company from "../Schemas/Company";

export const getCompanies = async () => {
  try {
    return await Company.find();
  } catch (e) {
    throw e;
  }
};

export const getCompanyById = async (id: string) => {
  try {
    return await Company.findById(id);
  } catch (e) {
    throw e;
  }
};

export const addCompany = async (newCompany: any) => {
  try {
    const addedCompany = Company.create(newCompany);
    return addedCompany;
  } catch (err) {
    throw err;
  }
};

module.exports = { getCompanies, getCompanyById, addCompany };
