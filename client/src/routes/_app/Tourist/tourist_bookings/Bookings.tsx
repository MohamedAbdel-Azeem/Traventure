import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import { Modal, Typography } from "@mui/material";
import Table from "@mui/material/Table";
import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Activity } from "../../../../components/Activities/ActivityCardTourist";
import Itinerary from "../../../../custom_hooks/itineraries/itinerarySchema";
import { useNavigate, useParams } from "react-router-dom";
import getBookings from "../../../../custom_hooks/getTouristBookings";
import cancelBookings from "../../../../custom_hooks/cancelBooking";
import { set } from "date-fns";
import { get } from "react-hook-form";
import { ActivityCardTourist } from "../../../../components/Activities/ActivityCardTourist";
import getFlights from "../../../../custom_hooks/getTouristFlights";
import getHotels from "../../../../custom_hooks/getTouristHotels";
import FeedbackDisplay from "../../../../components/Shenawy/FeedbackDisplay";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

export interface IBooking {
  _id: string;
  type: string;
  itinerary: Itinerary;
  activity: Activity;
}
function Reviews(props: { id: string; type: string; text: string }) {
  const [openFeedback, setOpenFeedback] = useState(false);
  const { id, type, text } = props;
  const { username } = useParams<{ username: string }>();
  const [showFeedback, setShowFeedback] = useState(false);
  const handleShowFeedback = () => {
    setShowFeedback(!showFeedback);
  };
  return (
    <>
      <Button
        variant="contained"
        sx={{ fontSize: "9px" }}
        onClick={handleShowFeedback}
        color="primary"
      >
        {text}
      </Button>
      {showFeedback && (
        <FeedbackDisplay id={id} type={type} onClose={handleShowFeedback} />
      )}
    </>
  );
}

export interface IFlightBooking {
  _id: string;
  departureCity: string;
  departureTime: Date;
  arrivalCity: string;
  carrierName: string;
  flightDuration: string;
  totalPrice: number;
  bagsWeight?: number; // Optional field
  flightClass: string;
  flightNumber: string;
  booked_by: string; // Assuming this is a string ID
  transportation: boolean;
}

export interface IHotelBooking {
  _id: string;
  hotelName: string;
  checkInDate: Date;
  checkOutDate: Date;
  roomType?: string; // Optional field
  bedType?: string; // Optional field
  numberOfBeds?: number; // Optional field
  totalPrice: number;
  booked_by: string; // Assuming this is a string ID
}

const Bookings: React.FC = () => {
  const { username } = useParams<{ username: string }>();
  const { data, refetch } = getBookings(username); // Get the loading state
  const { flightsdata, flightsget } = getFlights(username);
  const { hotelsdata, hotelsget } = getHotels(username);
  const { cancelBooking } = cancelBookings();
  const [itineraryBookings, setItiBookings] = useState<IBooking[]>([]);
  const [activityBookings, setActivityBookings] = useState<IBooking[]>([]);
  const [flights, setFlights] = useState<IFlightBooking[]>([]);
  const [hotels, setHotels] = useState<IHotelBooking[]>([]);
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [selectedActivity, setSelectedActivity] = useState(null);

  const showActivity = (activity: any) => {
    setSelectedActivity(activity);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedActivity(null);
  };

  useEffect(() => {
    if (data) {
      setItiBookings(data.filter((booking) => booking.type === "itinerary")); // Fix to use data instead of bookings
      setActivityBookings(
        data.filter((booking) => booking.type === "activity")
      );
    }

    if (flightsdata) {
      setFlights(flightsdata);
    }
    if (hotelsdata) {
      setHotels(hotelsdata);
    }
  }, [data, flightsdata]);

  const handleCancel = async (booking_id: string) => {
    try {
      await cancelBooking(booking_id);
      await refetch();
      await flightsget();
      await hotelsget();
    } catch (error: any) {
      console.error(error);
    }
  };

  function hasStarted(startTime: Date): boolean {
    const now = new Date();
    return now > startTime;
  }

  const sampleFeedback = [
    {
      user_Id: "1",
      username: "user123",
      feedback: "Great tour guide!",
      rate: 5,
    },
    {
      user_Id: "1",
      username: "user456",
      feedback: "Very knowledgeable.",
      rate: 4,
    },
    {
      user_Id: "1",
      username: "user123",
      feedback: "Great tour guide!",
      rate: 5,
    },
    {
      user_Id: "1",
      username: "user456",
      feedback: "Very knowledgeable.",
      rate: 4,
    },
    {
      user_Id: "1",
      username: "user123",
      feedback: "Great tour guide!",
      rate: 5,
    },
    {
      user_Id: "1",
      username: "user456",
      feedback: "Very knowledgeable.",
      rate: 4,
    },
    {
      user_Id: "1",
      username: "user123",
      feedback: "Great tour guide!",
      rate: 5,
    },
    {
      user_Id: "1",
      username: "user456",
      feedback: "Very knowledgeable.",
      rate: 4,
    },
    {
      user_Id: "1",
      username: "user123",
      feedback: "Great tour guide!",
      rate: 5,
    },
    {
      user_Id: "1",
      username: "user456",
      feedback: "Very knowledgeable.",
      rate: 4,
    },
  ];

  const sampleITFeedback = [
    {
      user_Id: "1",
      username: "user123",
      feedback: "Great ittt guide!",
      rate: 5,
    },
    {
      user_Id: "1",
      username: "user456",
      feedback: "Very knowledgeable.",
      rate: 4,
    },
    {
      user_Id: "1",
      username: "user123",
      feedback: "Great tour guide!",
      rate: 5,
    },
    {
      user_Id: "1",
      username: "user456",
      feedback: "Very knowledgeable.",
      rate: 4,
    },
    {
      user_Id: "1",
      username: "user123",
      feedback: "Great tour guide!",
      rate: 5,
    },
    {
      user_Id: "1",
      username: "user456",
      feedback: "Very knowledgeable.",
      rate: 4,
    },
    {
      user_Id: "1",
      username: "user123",
      feedback: "Great tour guide!",
      rate: 5,
    },
    {
      user_Id: "1",
      username: "user456",
      feedback: "Very knowledgeable.",
      rate: 4,
    },
    {
      user_Id: "1",
      username: "user123",
      feedback: "Great tour guide!",
      rate: 5,
    },
    {
      user_Id: "1",
      username: "user456",
      feedback: "Very knowledgeable.",
      rate: 4,
    },
  ];

  const sampleActivityFeedback = [
    {
      user_Id: "1",
      username: "user123",
      feedback: "Great tour guide!",
      rate: 5,
    },
    {
      user_Id: "1",
      username: "user456",
      feedback: "Very knowledgeable.",
      rate: 4,
    },
    {
      user_Id: "1",
      username: "user123",
      feedback: "Great tour guide!",
      rate: 5,
    },
    {
      user_Id: "1",
      username: "user456",
      feedback: "Very knowledgeable.",
      rate: 4,
    },
    {
      user_Id: "1",
      username: "user123",
      feedback: "Great tour guide!",
      rate: 5,
    },
    {
      user_Id: "1",
      username: "user456",
      feedback: "Very knowledgeable.",
      rate: 4,
    },
    {
      user_Id: "1",
      username: "user123",
      feedback: "Great tour guide!",
      rate: 5,
    },
    {
      user_Id: "1",
      username: "user456",
      feedback: "Very knowledgeable.",
      rate: 4,
    },
    {
      user_Id: "1",
      username: "user123",
      feedback: "Great tour guide!",
      rate: 5,
    },
    {
      user_Id: "1",
      username: "user456",
      feedback: "Very knowledgeable.",
      rate: 4,
    },
  ];

  return (
    <div>
      <Modal open={open} onClose={handleClose}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 500,
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
          }}
        >
          <Typography variant="h6" component="h2">
            Activity Details
          </Typography>
          {selectedActivity && (
            <ActivityCardTourist
              activity={selectedActivity}
              onDelete={() => {}}
            />
          )}
          <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
            <Button variant="contained" onClick={handleClose}>
              Close
            </Button>
          </Box>
        </Box>
      </Modal>
      <div className="flex justify-center py-14">
        <div className="w-7/12 gap-10">
          <div className="flex flex-col gap-12">
            {itineraryBookings.length > 0 && (
              <TableContainer
                component={Paper}
                className="border-2 border-black rounded-none"
              >
                <h4 className="flex justify-center text-2xl pt-4 font-bold">
                  Itineraries
                </h4>
                <Table aria-label="simple table">
                  <TableHead sx={{ backgroundColor: "#2263A2" }}>
                    <TableRow>
                      <StyledTableCell align="left">Title</StyledTableCell>
                      <StyledTableCell align="center">
                        Starting Date
                      </StyledTableCell>
                      <StyledTableCell align="center">Language</StyledTableCell>
                      <StyledTableCell align="right">
                        Tour Guide
                      </StyledTableCell>
                      <StyledTableCell align="right"></StyledTableCell>
                      <StyledTableCell align="center"></StyledTableCell>
                      <StyledTableCell align="right"></StyledTableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {itineraryBookings.map((booking) => (
                      <TableRow key={booking._id}>
                        <StyledTableCell align="left">
                          {booking.itinerary.title}
                        </StyledTableCell>
                        <StyledTableCell align="center">
                          {booking.itinerary.starting_Date.split("T")[0]}
                        </StyledTableCell>
                        <StyledTableCell align="center">
                          {booking.itinerary.language}
                        </StyledTableCell>
                        <StyledTableCell align="right">
                          {(booking.itinerary.added_By as any).username}
                        </StyledTableCell>
                        <StyledTableCell
                          align="right"
                          style={{ width: "150px" }}
                        >
                          <Button
                            color="primary"
                            variant="outlined"
                            onClick={() =>
                              navigate(
                                `/tourist/${username}/itineraries/tourist-itinerary/${booking.itinerary._id}`,
                                {
                                  state: {
                                    title: booking.itinerary.title,
                                    description: booking.itinerary.description,
                                    price: booking.itinerary.price,
                                    starting_Date:
                                      booking.itinerary.starting_Date,
                                    ending_Date: booking.itinerary.ending_Date,
                                    rating: booking.itinerary.rating,
                                    main_Picture:
                                      booking.itinerary.main_Picture,
                                    language: booking.itinerary.language,
                                    pickup_location:
                                      booking.itinerary.pickup_location,
                                    accesibility:
                                      booking.itinerary.accesibility,
                                    dropoff_location:
                                      booking.itinerary.dropoff_location,
                                    plan: booking.itinerary.plan,
                                    selectedTags:
                                      booking.itinerary.selectedTags,
                                  },
                                }
                              )
                            }
                          >
                            More Info
                          </Button>
                        </StyledTableCell>
                        <StyledTableCell align="center">
                          {!hasStarted(
                            new Date(booking.itinerary.starting_Date)
                          ) && (
                            <Button
                              color="error"
                              sx={{ fontSize: "9px" }}
                              onClick={() => handleCancel(booking._id)}
                              variant="outlined"
                            >
                              Cancel
                            </Button>
                          )}
                          {hasStarted(
                            new Date(booking.itinerary.ending_Date)
                          ) && (
                            <Reviews
                              id={booking.itinerary._id}
                              type="Itinerary"
                              text="Reviews"
                            />
                          )}

                          {hasStarted(
                            new Date(booking.itinerary.starting_Date)
                          ) &&
                            !hasStarted(
                              new Date(booking.itinerary.ending_Date)
                            ) && (
                              <Button
                                variant="contained"
                                sx={{ fontSize: "8px" }}
                                color="primary"
                              >
                                In Progress
                              </Button>
                            )}
                        </StyledTableCell>
                        <StyledTableCell align="right">
                          <Reviews
                            id={booking.itinerary.added_By._id}
                            type="Tour_guide"
                            text="rate Tourguide"
                          />
                        </StyledTableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            )}

            {activityBookings.length > 0 && (
              <TableContainer
                component={Paper}
                className="border-2 border-black rounded-none"
              >
                <h4 className="flex justify-center text-2xl pt-4 font-bold">
                  Activities
                </h4>
                <Table aria-label="simple table">
                  <TableHead sx={{ backgroundColor: "#2263A2" }}>
                    <TableRow>
                      <StyledTableCell align="left">Title</StyledTableCell>
                      <StyledTableCell align="center">Date</StyledTableCell>
                      <StyledTableCell align="center">Time</StyledTableCell>
                      <StyledTableCell align="right"></StyledTableCell>
                      <StyledTableCell align="right"></StyledTableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {activityBookings.map((booking) => (
                      <TableRow key={booking._id}>
                        <StyledTableCell align="left">
                          {booking.activity.Title}
                        </StyledTableCell>
                        <StyledTableCell align="center">
                          {new Date(booking.activity.DateAndTime)
                            .toISOString()
                            .slice(0, 10)}
                        </StyledTableCell>
                        <StyledTableCell align="center">
                          {new Date(
                            booking.activity.DateAndTime
                          ).toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </StyledTableCell>

                        <StyledTableCell
                          align="right"
                          style={{ width: "150px" }}
                        >
                          <Button
                            variant="outlined"
                            onClick={() => showActivity(booking.activity)}
                          >
                            More Info
                          </Button>
                        </StyledTableCell>
                        <StyledTableCell
                          align="right"
                          style={{ width: "150px" }}
                        >
                          {!hasStarted(
                            new Date(booking.activity.DateAndTime)
                          ) && (
                            <Button
                              color="error"
                              onClick={() => handleCancel(booking._id)}
                              variant="outlined"
                            >
                              Cancel
                            </Button>
                          )}
                          {hasStarted(
                            new Date(booking.activity.DateAndTime)
                          ) && (
                            <Reviews
                              id={booking.activity._id}
                              type="Activity"
                              text="Reviews"
                            />
                          )}
                        </StyledTableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            )}

            {flights.length > 0 && (
              <TableContainer
                component={Paper}
                className="border-2 border-black rounded-none"
              >
                <h4 className="flex justify-center text-2xl pt-4 font-bold">
                  Flights
                </h4>
                <Table aria-label="simple table">
                  <TableHead sx={{ backgroundColor: "#2263A2" }}>
                    <TableRow>
                      <StyledTableCell align="left">
                        Departure City
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        Arrival City
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        Flight Number
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        Total Price
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        Transportation
                      </StyledTableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {flights.map((flight) => (
                      <TableRow key={flight._id}>
                        <StyledTableCell align="left">
                          {flight.departureCity}
                        </StyledTableCell>
                        <StyledTableCell align="center">
                          {flight.arrivalCity}
                        </StyledTableCell>
                        <StyledTableCell align="center">
                          {flight.flightNumber}
                        </StyledTableCell>

                        <StyledTableCell align="center">
                          {flight.totalPrice.toFixed(2)}
                        </StyledTableCell>
                        <StyledTableCell align="center">
                          {flight.transportation ? "Yes" : "No"}
                        </StyledTableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            )}

            {hotels.length > 0 && (
              <TableContainer
                component={Paper}
                className="border-2 border-black rounded-none"
              >
                <h4 className="flex justify-center text-2xl pt-4 font-bold">
                  Hotels
                </h4>
                <Table aria-label="simple table">
                  <TableHead sx={{ backgroundColor: "#2263A2" }}>
                    <TableRow>
                      <StyledTableCell align="left">Hotel Name</StyledTableCell>
                      <StyledTableCell align="left">
                        Check In Date
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        Check Out Date
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        Total Price
                      </StyledTableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {hotels.map((hotel) => {
                      const checkInDate = new Date(hotel.checkInDate);
                      const checkOutDate = new Date(hotel.checkOutDate);
                      return (
                        <TableRow key={hotel._id}>
                          <StyledTableCell align="left">
                            {hotel.hotelName}
                          </StyledTableCell>
                          <StyledTableCell align="left">
                            {checkInDate.toDateString()}
                          </StyledTableCell>
                          <StyledTableCell align="center">
                            {checkOutDate.toDateString()}
                          </StyledTableCell>
                          <StyledTableCell align="center">
                            {hotel.totalPrice.toFixed(2)}
                          </StyledTableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </TableContainer>
            )}
          </div>
        </div>
      </div>
    </div>
    // </div>
    // </div>
  );
};

export default Bookings;
