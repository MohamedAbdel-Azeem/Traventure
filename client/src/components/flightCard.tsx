import React from "react";
import { Rating } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import "./ProductCard.css";
import Swal from "sweetalert2";
import useBookFlight from "../custom_hooks/usebookFlight";
import { useLocation } from "react-router-dom";

interface FlightCardProps {
  flight: any;
  exchangeRate: number;
  currentCurrency: string;
  includeTransportation: boolean;
}

const FlightCard: React.FC<FlightCardProps> = ({
  flight,
  exchangeRate,
  currentCurrency,
  includeTransportation,
}) => {
  const averageRating = 4.5;
  const currentuser = useLocation().pathname.split("/")[2];
  const { bookFlight } = useBookFlight();

  const handleFlightBooking = async (flight: any) => {
    try {
      const response = await bookFlight(
        flight,
        includeTransportation,
        currentuser
      );
      Swal.fire({
        icon: "success",
        title: "Flight Booked Successfully!",
        text: "You have successfully booked the flight.",
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Booking Failed!",
        text: "An error occurred while booking the flight.",
      });
    }
  };

  const currency = flight.price.currency;

  return (
    <div className="flight-card">
      <div className="card-header">
        <h3 className="carrier-name">
          {flight.itineraries[0].segments[0].carrierCode}
        </h3>
      </div>
      <div className="card-body">
        <strong className="flight-number">Flight Number: </strong>
        {flight.itineraries[0].segments[0].number}
        <div className="flight-details">
          <div className="flex flex-row justify-between">
            <span className="departure-info">
              <strong>Departure:</strong>{" "}
              {flight.itineraries[0].segments[0].departure.iataCode}
              <strong>at</strong>{" "}
              {new Date(
                flight.itineraries[0].segments[0].departure.at
              ).toLocaleString()}
            </span>
            <span className="arrival-info">
              <strong>Arrival:</strong>{" "}
              {flight.itineraries[0].segments[0].arrival.iataCode}{" "}
              <strong>at</strong>{" "}
              {new Date(
                flight.itineraries[0].segments[0].arrival.at
              ).toLocaleString()}
            </span>
          </div>
          <div className="flight-duration">
            <strong>Flight Duration:</strong>{" "}
            {flight.itineraries[0].segments[0].duration}
          </div>
          <div className="flight-class">
            <strong>Flight Class:</strong>{" "}
            {flight.travelerPricings[0].fareDetailsBySegment[0].cabin}
          </div>
          <div className="baggage-info">
            <strong>Included Checked Bags:</strong>{" "}
            {flight.travelerPricings[0].fareDetailsBySegment[0]
              ?.includedCheckedBags?.weight
              ? `${flight.travelerPricings[0].fareDetailsBySegment[0].includedCheckedBags.weight} kg`
              : "N/A"}
          </div>
        </div>

        <div className="flex flex-row justify-between items-center">
          <span className="flight-price">
            {currentCurrency}{" "}
            {(flight.price.grandTotal * 50 * exchangeRate).toFixed(2)}
          </span>
          <Rating
            disabled
            name="rating"
            value={averageRating}
            precision={0.1}
          />
          <button
            className="book-button"
            onClick={() => handleFlightBooking(flight)}
          >
            <FontAwesomeIcon icon={faCartShopping} /> Book
          </button>
        </div>
      </div>
    </div>
  );
};

export default FlightCard;
