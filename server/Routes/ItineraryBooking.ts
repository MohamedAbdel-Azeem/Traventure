import { Router } from "express";
import {getTouristBookings,addBooking} from "../Model/Queries/itineraryBooking_queries";

const router = Router();

router.post("/add", async (req, res) => { 
    try {
        await addBooking(req.body);
        res.status(201).send("Booking added successfully");
    } catch (error) {
        res.status(500).send("error creating booking");
    }
});  
export default router;
