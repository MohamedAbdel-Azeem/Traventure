import mongoose from "mongoose";
import Category from "../Schemas/Category";
import e from "express";

export const addCategory = async (Category: any) => {
  try{
    const category = new Category(Category);
  await await category.save();
  return category;}
  catch(e){
   throw e;}

}

export const getCategories = async () => {
    try{
    return await Category.find();}
    catch(e){
    throw e;}
    }

export const deleteCategory = async(id: string)=>{

    try{
        return await Category.findByIdAndDelete(id);
    }
    catch(err){
        throw err;
    }
}    



 module.exports = {addCategory, getCategories,deleteCategory};   
    



