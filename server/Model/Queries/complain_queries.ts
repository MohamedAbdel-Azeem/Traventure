import e from "express";
import complaint from "../Schemas/complaint";

export async function addComplaint(complaintData: any) {
    try {
        await complaint.create(complaintData);
    } catch (error) {
        throw error;
    }
}
export async function getComplaints() {
    try {
        const complaints = await complaint.find().populate([
            {
                path: "booking_Id",
                populate: [
                    {
                        path: "itinerary",
                        select: "title _id" // specify the fields you want to populate
                    },
                    {
                        path: "activity",
                        select: "name _id" // specify the fields you want to populate
                    }
                ]
            }
        ]);
        return complaints;
    } catch (error) {
        throw error;
    }
}
export async function updateComplaint(complaintId: string,updatedComplaint: any) {
try {
    return await complaint.findByIdAndUpdate(complaintId, updatedComplaint);}
catch (error) {
    throw error;
}
}
export async function getComplaint(complaintId: string) {
    try {
        const complaints = await complaint.findById(complaintId).populate([
            {
                path: "booking_Id",
                populate: [
                    {
                        path: "itinerary",
                        select: "title _id" // specify the fields you want to populate
                    },
                    {
                        path: "activity",
                        select: "name _id" // specify the fields you want to populate
                    }
                ]
            }
        ]);
        return complaints;}
        catch (error) {
            throw error;
        }   
}

module.exports = { addComplaint, getComplaints, updateComplaint, getComplaint };