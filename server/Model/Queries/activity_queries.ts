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

export const getActivitiesid = async(id: string)=>{
    try {
        return await Activity.find({ added_By: id })
        .populate('Tags')
        .populate('Category');
    } catch (err) {
        throw err;
    }
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

export const toggleInappropriate = async (id: string) => {
    try {
        const activity = await Activity.findById(id);
        if (activity) {
            const newActivity=Activity.findByIdAndUpdate(id, { inappropriate: !activity.inappropriate },
                { new: true }
            );
            
            return newActivity;
        }
        else {
            throw new Error("Activity not found");
        }}
        catch (err) {
            throw err;
        }
};
module.exports = {addActivity, getActivities, getActivitiesid,deleteActivity,updateActivity,toggleInappropriate};