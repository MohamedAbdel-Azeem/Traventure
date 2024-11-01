import bookingModel from "../Schemas/Booking";

export async function getTouristBookings(touristId: string) {
  try {
    const bookings = await bookingModel.find({ tourist: touristId });
    return bookings;
  } catch (error) {
    throw error;
  }
}
export async function addBooking(bookingData: any) {
  try {
   await bookingModel.create(bookingData);
  } catch (error) {
    throw error;
  }
}


module.exports ={getTouristBookings,addBooking};