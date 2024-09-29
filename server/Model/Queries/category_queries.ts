import mongoose from "mongoose";
import Category from "../Schemas/Category";

export const addCategory = async (newCategory: any) => {
  try{
    const addedcategory = Category.create(newCategory);
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

export const updateCategory = async(id: string, updatedCategory: any)=>{
    try{
        return await Category.findByIdAndUpdate(id, updatedCategory);
    }
    catch(err){
        throw err;
    }
}


 module.exports = {addCategory, getCategories,deleteCategory};   
    



