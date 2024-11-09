import Amadeus, { ResponseError, TravelClass } from "amadeus-ts";
import { Console } from "console";

require("dotenv").config();
const amadeus = new Amadeus({
  clientId: process.env.AMADEUS_CLIENT_ID,
  clientSecret: process.env.AMADEUS_CLIENT_SECRET

});
async function getFlightOffers(
    originLocationCode: string,
    destinationLocationCode: string,
    departureDate: string,
    adults: number,
    children?: number,
    travelClass?: TravelClass,
    nonStop?: boolean,
    max?: number    
) {
   
  try {


    const response = await amadeus.shopping.flightOffersSearch.get({
      originLocationCode,
      destinationLocationCode,
      departureDate,
      adults,
      children,
      travelClass,
      nonStop:true,
      max:10
    });

    return response.data;
  } catch (error: unknown) {
    console.log(error);
    if (error instanceof ResponseError) {
      throw new Error(`Error code: ${error.code}, Message: ${error.description}`);
    }
    throw new Error("An unknown error occurred");
  }
}

async function getHotelsInCity(
    cityCode: string
) {
    
    try {
        const response = await amadeus.referenceData.locations.hotels.byCity.get({
          cityCode
        });
    
        return response.data;
      } catch (error: unknown) {
        console.log(error);
        if (error instanceof ResponseError) {
          throw new Error(`Error code: ${error.code}, Message: ${error.description}`);
        }
        throw new Error("An unknown error occurred");
      }
}
async function getHotelByInfo(
    hotels: any, 
    adults: number,
    checkInDate: string,
    checkOutDate: string
) {
    try {
        const hotelList = hotels.slice(0, 50).map((hotel: any) => hotel.hotelId);

    
                const response = await amadeus.shopping.hotelOffersSearch.get({
                    hotelIds: hotelList.join(','),
                    adults,
                    checkInDate,
                    checkOutDate
                   });
                console.log(response.data);
            
       

        return response.data;

    } catch (error: unknown) {
        console.error(error);
        if (error instanceof ResponseError) {
            throw new Error(`Error code: ${error.code}, Message: ${error.description}`);
        }
        throw new Error("An unknown error occurred");
    }
}




export { getFlightOffers , getHotelsInCity , getHotelByInfo };
