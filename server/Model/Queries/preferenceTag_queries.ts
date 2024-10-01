import mongoose from "mongoose";
import PreferenceTags from "../Schemas/preferenceTags";
import e from "express";


export const addPreferenceTag = async (newPreferenceTags: any) => {
  try{
    const addedPreferenceTags = PreferenceTags.create(newPreferenceTags);
  return addedPreferenceTags;}
  catch(err){
   throw err;}

}

export const getPreferenceTag = async () => {
    try{
    return await PreferenceTags.find();}
    catch(e){
    throw e;}
    }

export const deletePreferenceTag = async(id: string)=>{
    try{
        return await PreferenceTags.findByIdAndDelete(id);
    }
    catch(err){
        throw err;
    }
}   
export const updatePreferenceTag = async(id: string, updatedPreferenceTags: any)=>{

    try{
        return await PreferenceTags.findByIdAndUpdate(id, updatedPreferenceTags);
    }
    catch(err){
        throw err;
    }
}

module.exports = {addPreferenceTag, getPreferenceTag,deletePreferenceTag,updatePreferenceTag};