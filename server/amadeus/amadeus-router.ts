import { Request, response, Response, Router } from "express";
import { getFlightOffers } from "./amadeus"; 

const router = Router();

router.post("/getFlights", async (req: Request, res: Response) => {
    const { originLocationCode, destinationLocationCode, departureDate, adults,children,travelClass } = req.body;
  
    if (!originLocationCode || !destinationLocationCode || !departureDate || !adults) {
      return res.status(400).json({ error: "Missing required parameters" });
    }
  
    try {
      const flightData = await getFlightOffers(originLocationCode, destinationLocationCode, departureDate, adults,children,travelClass);
  
      res.status(200).json(flightData);
    } catch (error: any) {
      console.error("Error fetching flight data:", error.message);
      res.status(500).json({ error: error.message });
    }
  });
  
  export default router;