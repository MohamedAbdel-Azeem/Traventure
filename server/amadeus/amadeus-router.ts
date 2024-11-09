import { Request, response, Response, Router } from "express";
import { getFlightOffers , getHotelsInCity ,getHotelByInfo} from "./amadeus"; 

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


  router.post ("/getHotels", async (req: Request, res: Response) => {
    const {cityCode,adults,checkInDate,checkOutDate,priceRange}=req.body;
    
    if (!cityCode||!adults||!checkInDate||!checkOutDate) {
        console.log(cityCode,adults,checkInDate,checkOutDate);
      return res.status(400).json({ error: "Missing required parameters " });
    }
  
    try {
      const HotelList = await getHotelsInCity(cityCode);
     const adultsnum = parseInt(adults);
      const HotelData = await getHotelByInfo(HotelList,adultsnum,checkInDate,checkOutDate);
        
  
      res.status(200).json(HotelData);
    } catch (error: any) {
      console.error("Error Hotels in city data:", error.message);
      res.status(500).json({ error: error.message });
    }
  }
);


  
  export default router;

