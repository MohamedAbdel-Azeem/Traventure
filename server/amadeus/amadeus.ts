import Amadeus, { ResponseError, TravelClass } from "amadeus-ts";
require("dotenv").config();
const amadeus = new Amadeus({
  clientId: process.env.AMADEUS_CLIENT_ID,
  clientSecret: process.env.AMADEUS_CLIENT_SECRET,
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
    console.log({originLocationCode,destinationLocationCode,departureDate,adults,children,travelClass,nonStop,max})
    console.log(process.env.AMADEUS_CLIENT_ID)
    console.log(process.env.AMADEUS_CLIENT_SECRET)
  try {


    const response = await amadeus.shopping.flightOffersSearch.get({
      originLocationCode,
      destinationLocationCode,
      departureDate,
      adults,
      children,
      travelClass,
      nonStop:true,
      max:50
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

export { getFlightOffers };
