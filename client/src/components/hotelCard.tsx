import React from "react";
import { Rating } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import "./ProductCard.css";
import Swal from "sweetalert2";
import { useLocation } from "react-router-dom";
import useBookHotel from "../custom_hooks/useBookHotel";

interface HotelCardProps {
  hotel: any;
  exchangeRate: number;
  currentCurrency: string;
}

const HotelCard: React.FC<HotelCardProps> = ({
  hotel,
  exchangeRate,
  currentCurrency,
}) => {
  const averageRating = hotel.rating || 4.5;

  // Get hotel and room details
  const hotelName = hotel.hotel?.name || "Hotel Name Unavailable";
  const roomType = hotel.offers?.[0]?.room?.typeEstimated?.category || "N/A";
  const bedType = hotel.offers?.[0]?.room?.typeEstimated?.bedType || "N/A";
  const numberOfBeds = hotel.offers?.[0]?.room?.typeEstimated?.beds || "N/A";
  //
  const totalPrice = hotel.offers?.[0]?.price?.total
    ? (parseFloat(hotel.offers[0].price.total) * 50).toFixed(2)
    : "N/A";
  const currency = hotel.offers?.[0]?.price?.total
    ? hotel.offers[0].price.currency
    : "N/A";
  const checkInDate = hotel.offers?.[0]?.checkInDate || "N/A";
  const checkOutDate = hotel.offers?.[0]?.checkOutDate || "N/A";
  const currentuser = useLocation().pathname.split("/")[2];
  const { bookHotel } = useBookHotel();

  const handleBookHotel = async (hotel: any) => {
    // Call the bookHotel function from the custom hook
    try {
      await bookHotel(hotel, currentuser);
      Swal.fire({
        icon: "success",
        title: "Hotel Booked Successfully!",
        text: "You have successfully booked the hotel.",
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Booking Failed!",
        text: "An error occurred while booking the hotel.",
      });
    }
  };

  return (
    <div className="hotel-card">
      <div className="card-header">
        <h3 className="hotel-name  w-3/4">{hotelName}</h3>
      </div>
      <div className="card-body">
        <div className="hotel-details">
          <div>
            <strong>Check-in Date: </strong> {checkInDate} <br />{" "}
            <strong>Check-out Date: </strong>
            {checkOutDate}
          </div>
          {/* Room Type Information */}
          <div className="room-type">
            <strong>Room Type:</strong> {roomType}
          </div>

          {/* Bed Information */}
          <div className="bed-info">
            <strong>Bed Type:</strong> {bedType}
            <br />
            <strong>Number of Beds:</strong> {numberOfBeds}
          </div>

          {/* Total Price Information */}
          <div className="hotel-price">
            <strong>Total Price:</strong> {currentCurrency}{" "}
            {parseFloat(totalPrice) * exchangeRate}
          </div>
        </div>

        {/* Book and Rating Section */}
        <div className="flex flex-row justify-between items-center">
          <Rating
            disabled
            name="rating"
            value={averageRating}
            precision={0.1}
          />
          <button
            className="book-button"
            onClick={() => handleBookHotel(hotel)}
          >
            <FontAwesomeIcon icon={faCartShopping} /> Book
          </button>
        </div>
      </div>
    </div>
  );
};

export default HotelCard;
