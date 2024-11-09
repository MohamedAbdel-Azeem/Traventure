import { Router } from "express";
import {getTouristBookings,addBooking,cancelBooking, getBookingsByTourist , addFlightBooking} from "../Model/Queries/booking_queries";

const router = Router();

router.post("/add", async (req, res) => { 
    try {
        await addBooking(req.body);
        res.status(201).send("Booking added successfully");
    } catch (error ) {
        if((error as any).message==="Booking already exists"){
            res.status(403).send("Booking already exists");
        }
        else{
        res.status(500).send("error creating booking");}
    }
}); 
router.get("/:username", async (req, res) => {
    try {
        const bookings = await getBookingsByTourist(req.params.username);
        res.status(200).send(bookings);
    } catch (error) {
        res.status(500).send("error getting bookings");
    }
});

router.delete("/cancel/:booking_id", async (req, res) => { 
    try {
        await cancelBooking(req.params.booking_id);
        res.status(201).send("Booking cancelled");
    } catch (error ) {
        if ((error as any).message === "Cannot cancel activity within 48 hours of the start time") {
            res.status(403).json({ error: "Cannot cancel activity within 48 hours of the start time" });
        } else {
            res.status(500).json({ error: "Cannot cancel booking" });
        }
    }
    }
); 

router.post("/addFlight/:username", async (req, res) => {
    
    try {
        await addFlightBooking(req.body);
        res.status(201).send("Booking added successfully");
    } catch (error ) {
        if((error as any).message==="Booking already exists"){
            res.status(403).send("Booking already exists");
        }
        else{
        res.status(500).send("error creating booking");}
    }

});


export default router;
