import React, { useEffect, useState } from "react"; 
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Divider,
  Typography,
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { useParams, useLocation } from "react-router-dom";
import IActivity from "../custom_hooks/activities/activity_interface";
import { TouristProfileData } from "../routes/_app/tourist_profile/tourist_profile_data";
import Place from "../custom_hooks/places/place_interface";
import { useGetItineraryID } from "../custom_hooks/itineraries/useGetItinerary";



interface TagStructure {
  _id: string;
  name: string;
  __v: number;
}


interface Itinerary {
  _id: string;
  main_Picture?: string;
  title: string;
  description: string;
  added_By: string;
  price: number;
  starting_Date: string;
  ending_Date: string;
  rating: number;
  total: number;
  language: string;
  selectedTags?: TagStructure[];
  pickup_location: { longitude: number; latitude: number };
  dropoff_location: { longitude: number; latitude: number };
  plan: {
    place: Place;
    activities: IActivity[];
  }[];
  booked_By: {
    user_id?: TouristProfileData;
  }[];
  accesibility: boolean;
  onDelete: (id: string) => void;
}

const ItineraryDetailsTourist: React.FC = () => {
  const location = useLocation();
  const id = location.pathname.split(`/`)[2];
  const { itinerary: initialItinerary } = useGetItineraryID(id); 
  const [itinerary, setItinerary] = useState<Itinerary | null>(initialItinerary);
  
  useEffect(() => {
    if (initialItinerary) {
      setItinerary(initialItinerary);
    }
  }, [initialItinerary]);
console.log(itinerary);

  if (!itinerary) return <p>No itinerary data found</p>;

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };


  return (
    <Box className="flex justify-center items-center h-auto py-12 bg-gray-100">
      <Card className="w-[95%] sm:w-[600px] md:w-[800px] lg:w-[900px] rounded-lg shadow-lg overflow-hidden bg-white">
        <CardMedia
          component="img"
          image={itinerary.main_Picture}
          alt={itinerary.title}
          className="h-[400px] w-full object-cover"
        />
        <CardContent>
          <Typography
            variant="h4"
            className="text-center font-bold mb-4 text-blue-600"
          >
            {itinerary.title}
          </Typography>

          <Divider className="my-4" />

          <Box className="flex justify-between mb-4 text-gray-600">
            <Typography variant="body1" className="flex items-center">
              <span className="mr-2 font-semibold">Start Date:</span>{" "}
              {formatDate(itinerary.starting_Date)}
            </Typography>
            <Typography variant="body1" className="flex items-center">
              <span className="mr-2 font-semibold">End Date:</span>{" "}
              {formatDate(itinerary.ending_Date)}
            </Typography>
          </Box>

          <Box className="flex justify-between mb-4 text-gray-600">
            <Typography variant="body1" className="flex items-center">
              <span className="mr-2 font-semibold">Price:</span> $
              {itinerary.price}
            </Typography>
          </Box>

          <Box className="flex justify-between mb-4 text-gray-600">
            <Typography variant="body1" className="flex items-center">
              <span className="mr-2 font-semibold">Language:</span>{" "}
              {itinerary.language}
            </Typography>
          </Box>

          <Box className="flex justify-between mb-4 text-gray-600">
            <Typography variant="body1" className="flex items-center">
              <span className="mr-2 font-semibold">Accessibility:</span>{" "}
              {itinerary.accesibility ? "Yes" : "No"}
            </Typography>
          </Box>

          <Box className="flex justify-between mb-4 text-gray-600">
            <Typography variant="body1" className="flex items-center">
              <span className="mr-2 font-semibold">Pickup Location:</span>
              <iframe
                title="map"
                className="rounded-b-[19px]"
                src={`https://www.google.com/maps/embed?pb=!1m10!1m8!1m3!1d12554.522849119294!2d${itinerary.pickup_location.longitude}!3d${itinerary.pickup_location.latitude}!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2seg!4v1728092539784!5m2!1sen!2seg`}
                width="400px"
                height="166px"
              ></iframe>
            </Typography>
            <Typography variant="body1" className="flex items-center">
              <span className="mr-2 font-semibold">Dropoff Location:</span>{" "}
              <iframe
                title="map"
                className="rounded-b-[19px]"
                src={`https://www.google.com/maps/embed?pb=!1m10!1m8!1m3!1d12554.522849119294!2d${itinerary.dropoff_location.longitude}!3d${itinerary.dropoff_location.latitude}!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2seg!4v1728092539784!5m2!1sen!2seg`}
                width="400px"
                height="166px"
              ></iframe>
            </Typography>
          </Box>

          <Typography
            variant="body2"
            className="text-gray-700 text-justify leading-relaxed mb-4"
          >
            {itinerary.description}
          </Typography>

          <Divider className="my-4" />

          {itinerary.plan &&
            itinerary.plan.map((item, placeIndex) => (
              <Box key={placeIndex} className="mb-4">
                <Typography
                  variant="h6"
                  className="font-semibold mb-2 text-gray-800"
                >
                  {item.place.name}
                </Typography>

                {item.activities &&
                  item.activities.map((activity, activityIndex) => (
                    <Box key={activityIndex} className="ml-4 mb-2">
                      <Typography variant="body1" className="text-gray-700">
                        <span className="font-semibold">Activity:</span>{" "}
                        {activity.activity_id.Title}
                      </Typography>
                      <Typography variant="body2" className="text-gray-600">
                        <span className="font-semibold">Duration:</span>{" "}
                        {activity.activity_duration} {activity.time_unit}
                      </Typography>
                    </Box>
                  ))}
              </Box>
            ))}

          <Divider className="my-4" />

          {Array.isArray(itinerary.selectedTags) &&
            itinerary.selectedTags.length > 0 && (
              <Box>
                <Typography
                  variant="h6"
                  className="font-semibold mb-2 text-gray-800"
                >
                  Tags:
                </Typography>
                <Box className="flex flex-wrap mb-4">
                  {itinerary.selectedTags.map((tag, index) => (
                    <Box
                      key={index}
                      className="bg-blue-100 text-blue-600 py-1 px-2 rounded-full mr-2 mb-2 flex items-center justify-between"
                    >
                      {tag.name}
                    </Box>
                  ))}
                </Box>
              </Box>
            )}
        </CardContent>
      </Card>
    </Box>
  );
};

export default ItineraryDetailsTourist;