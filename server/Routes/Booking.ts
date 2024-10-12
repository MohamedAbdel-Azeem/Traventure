import { Router } from "express";
import {getTouristBookings,addBooking} from "../Model/Queries/booking_queries";

const router = Router();

router.get("/:touristId", async (req, res) => {
  try {
    const bookings = await getTouristBookings(req.params.touristId);
    res.status(200).json(bookings);
  } catch (error) {
    res.status(500).send("error getting bookings");
  }
});

router.post("/add", async (req, res) => { 
    try {
        await addBooking(req.body);
        res.status(201).send("Booking added successfully");
    } catch (error) {
        res.status(500).send("error creating booking");
    }
});  
export default router;
