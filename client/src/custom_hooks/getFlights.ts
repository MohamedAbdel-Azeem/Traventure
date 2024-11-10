import axios from 'axios';
import { useState, useEffect } from 'react';



export default async function   getFlights(flightDetails : object) {
    const [flights, setFlights] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    setIsLoading(true);
    await axios.get('/traventure/amadeus/getFlights' , {params: flightDetails}).then((response) => {
        setFlights(response.data);
    }).catch((error) => {
        setError(error);
    }).finally(() => {
        setIsLoading(false);
    });
    
    return { flights, isLoading , error };
};

