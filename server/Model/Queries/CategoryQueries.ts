import mongoose from "mongoose";
import Category from "../Schemas/Category";

export const addCategory = async (newCategory: any) => {
  try{
    const addedcategory = new Category(newCategory);
  await  addedcategory.save();
  return addedcategory;}
  catch(err){
   throw err;}

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
    



