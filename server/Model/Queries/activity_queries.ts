import mongoose from "mongoose";
import Activity from "../Schemas/Activity";

export const addActivity = async (newActivity: any) => {
  try{
    await Activity.create(newActivity);
  return newActivity;}
  catch(err){
   throw err;}

}

export const getActivities = async () => {
    try{
    return  await Activity.find().populate("Tags").populate("Category");}
    catch(e){
    throw e;}
    }

export const deleteActivity = async(id: string)=>{
    try{
        return await Activity.findByIdAndDelete(id);
    }
    catch(err){
        throw err;
    }
}
export const updateActivity = async(id: string, updatedActivity: any)=>{
    try{
        return await Activity.findByIdAndUpdate(id, updatedActivity);
    }
    catch(err){
        throw err;
    }
}

module.exports = {addActivity, getActivities,deleteActivity,updateActivity};