import { Box, Card, CardContent, CardMedia, Divider, Rating, Typography } from "@mui/material";
import { useParams, useLocation } from "react-router-dom";

const ItineraryDetails: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const location = useLocation();
    const itinerary = location.state;

    if (!itinerary) return <p>No itinerary data found</p>;

    return (
        <Box className="flex justify-center items-center h-auto py-12 bg-gray-100">
            <Card className="w-[95%] sm:w-[600px] md:w-[800px] lg:w-[900px] rounded-lg shadow-lg overflow-hidden bg-white">
                <CardMedia
                    component="img"
                    image={itinerary.image}
                    alt={itinerary.title}
                    className="h-[400px] w-full object-cover"
                />
                <CardContent>
                    <Typography variant="h4" className="text-center font-bold mb-4 text-blue-600">
                        {itinerary.title}
                    </Typography>

                    <Divider className="my-4" />

                    <Box className="flex justify-between mb-4 text-gray-600">
                        <Typography variant="body1" className="flex items-center">
                            <span className="mr-2 font-semibold">Date:</span> {itinerary.date}
                        </Typography>
                        <Typography variant="body1" className="flex items-center">
                            <span className="mr-2 font-semibold">Price:</span> {itinerary.price}
                        </Typography>
                    </Box>

                    <Typography variant="body2" className="text-gray-700 text-justify leading-relaxed mb-4">
                        {itinerary.description}
                    </Typography>

                    <Divider className="my-4" />

                    {itinerary.places && itinerary.places.map((place: any, placeIndex: number) => (
                        <Box key={placeIndex} className="mb-4">
                            <Typography variant="h6" className="font-semibold mb-2 text-gray-800">
                                {place.name}
                            </Typography>

                            {place.activities && place.activities.map((activity: any, activityIndex: number) => (
                                <Box key={activityIndex} className="ml-4">
                                    <Typography variant="body1" className="text-gray-700">
                                        <span className="font-semibold">Activity:</span> {activity.name}
                                    </Typography>
                                    <Typography variant="body2" className="text-gray-600">
                                        <span className="font-semibold">Duration:</span> {activity.duration}
                                    </Typography>
                                </Box>
                            ))}
                        </Box>
                    ))}

                    <Divider className="my-4" />

                    <Box className="flex justify-between items-center mt-6">
                        <Rating value={parseFloat(itinerary.rating)} precision={0.5} readOnly />
                    </Box>
                </CardContent>
            </Card>
        </Box>
    );
};

export default ItineraryDetails;
