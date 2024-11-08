import React from "react";
import { Rating } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import "./ProductCard.css";

interface FlightCardProps {
  flight:any
  exchangeRate: number;
  currentCurrency: string;
}

const FlightCard: React.FC<FlightCardProps> = ({ flight, exchangeRate, currentCurrency }) => {
  const averageRating = 4.5; 

  return (
    <div className="flight-card">
      <div className="card-header">
        
          <h3 className="carrier-name">{flight.itineraries[0].segments[0].carrierCode}</h3>
        
      </div>
      <div className="card-body">
        <strong className="flight-number">Flight Number: </strong>{flight.itineraries[0].segments[0].number}
        <div className="flight-details">
          <div className="flex flex-row justify-between">
            <span className="departure-info">
              <strong>Departure:</strong> {flight.itineraries[0].segments[0].departure.iataCode}<strong>at</strong>  {new Date(flight.itineraries[0].segments[0].departure.at).toLocaleString()}
            </span>
            <span className="arrival-info">
              <strong>Arrival:</strong> {flight.itineraries[0].segments[0].arrival.iataCode} <strong>at</strong> {new Date(flight.itineraries[0].segments[0].arrival.at).toLocaleString()}
            </span>
          </div>
          <div className="flight-duration">
            <strong>Flight Duration:</strong> {flight.itineraries[0].segments[0].duration}
          </div>
          <div className="flight-class">
          <strong>Flight Class:</strong> {flight.travelerPricings[0].fareDetailsBySegment[0].cabin}
          </div>
          <div className="baggage-info">
          <strong>Included Checked Bags:</strong> {flight.travelerPricings[0].fareDetailsBySegment[0]?.includedCheckedBags?.weight ? `${flight.travelerPricings[0].fareDetailsBySegment[0].includedCheckedBags.weight} kg` : "N/A"}

          </div>
        </div>

        <div className="flex flex-row justify-between items-center">
          <span className="flight-price">
            {currentCurrency} {(flight.price.grandTotal * exchangeRate).toFixed(2)}
          </span>
          <Rating disabled name="rating" value={averageRating} precision={0.1} />
          <button className="book-button">
            <FontAwesomeIcon icon={faCartShopping} /> Book
          </button>
        </div>
      </div>
    </div>
  );
};

export default FlightCard;
