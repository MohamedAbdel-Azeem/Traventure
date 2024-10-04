import { useParams, useLocation } from "react-router-dom";
import { Card, CardContent, CardMedia, Typography, Box, Divider, Rating } from "@mui/material";

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

                    <Box className="flex justify-between items-center mt-6">
                        <Rating value={parseFloat(itinerary.rating)} precision={0.5} readOnly size="large" />
                        <Typography variant="h6" className="text-yellow-500 font-bold">
                            {itinerary.rating}/5
                        </Typography>
                    </Box>

                    <Divider className="my-6" />

                    <Box className="text-center">
                        <Typography variant="body1" className="text-gray-500">
                            Detailed Itinerary Information
                        </Typography>
                        <a
                            href="#"
                            className="inline-block mt-4 bg-blue-500 text-white px-6 py-3 rounded-lg shadow-md hover:bg-blue-600 transition duration-200"
                        >
                            Download Itinerary PDF
                        </a>
                    </Box>
                </CardContent>
            </Card>
        </Box>
    );
};

export default ItineraryDetails;
