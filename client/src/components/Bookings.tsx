import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Button from '@mui/material/Button';
import Table from '@mui/material/Table';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';  
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {IActivity} from '../custom_hooks/activities/activity_interface';
import Itinerary from '../custom_hooks/itineraries/itinerarySchema';
import { useParams } from 'react-router-dom';
import  getBookings  from '../custom_hooks/getTouristBookings';
import ImprovedSidebar from './ImprovedSidebar';
import cancelBookings from '../custom_hooks/cancelBooking';
import { set } from 'date-fns';
import { get } from 'react-hook-form';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        color: theme.palette.common.white
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));

 
  interface IBooking {
    _id: string;
    type: string;
    itinerary: Itinerary;
    activity: IActivity;
}

const Bookings: React.FC = () => {
    const { username } = useParams<{ username: string }>();
    const { data,refetch} = getBookings(username); // Get the loading state
    const { cancelBooking } = cancelBookings();
    const [itineraryBookings, setItiBookings] = useState<IBooking[]>([]);
    const [activityBookings, setActivityBookings] = useState<IBooking[]>([]);

    useEffect(() => {
        if (data) {
            console.log(data);
            setItiBookings(data.filter(booking => booking.type === 'itinerary')); // Fix to use data instead of bookings
            setActivityBookings(data.filter(booking => booking.type === 'activity'));
           
        }
    }, [data]);

    const handleCancel = async (booking_id: string) => {
        try {
            await cancelBooking(booking_id);
            await refetch();
        } catch (error: any) {
            console.error(error);
        }
    };
    

    return (
        <div>
            
            
            <ImprovedSidebar />
           
            <div className="flex justify-center py-14">
                <div className="w-1/2 gap-10">
                    <div className="flex flex-col gap-12">
                
                        <TableContainer component={Paper} className="border-2 border-black rounded-none">
                        <h4 className="flex justify-center text-2xl pt-4 font-bold">Itineraries</h4>
                            <Table aria-label="simple table">
                                <TableHead sx={{ backgroundColor: '#2263A2' }}>
                                    <TableRow>
                                        <StyledTableCell align="left">Title</StyledTableCell>
                                        <StyledTableCell align="center">Starting Date</StyledTableCell>
                                        <StyledTableCell align="center">Language</StyledTableCell>
                                        <StyledTableCell align="right"></StyledTableCell>
                                        <StyledTableCell align="right"></StyledTableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {itineraryBookings.map((booking) => (  
                                        <TableRow key={booking._id}>

                                            <StyledTableCell align="left">{booking.itinerary.title}</StyledTableCell>
                                            <StyledTableCell align="center">{booking.itinerary.starting_Date.split("T00:00:00.000Z")}</StyledTableCell>
                                            <StyledTableCell align="center">{booking.itinerary.language}</StyledTableCell>
                                            <StyledTableCell align="right" style={{ width: '150px' }}><Button color="primary" variant="outlined">More Info</Button></StyledTableCell>
                                            <StyledTableCell align="right" style={{ width: '150px' }}><Button color="error" onClick={()=>handleCancel(booking._id)} variant="outlined">Cancel</Button></StyledTableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>

                 
                        <TableContainer component={Paper} className="border-2 border-black rounded-none">
                        <h4 className="flex justify-center text-2xl pt-4 font-bold">Activities</h4>
                            <Table aria-label="simple table">
                                <TableHead sx={{ backgroundColor: '#2263A2' }}>
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
                                            <StyledTableCell align="left">{booking.activity.Title}</StyledTableCell>
                                            <StyledTableCell align="center">{new Date(booking.activity.DateAndTime).toISOString().slice(0, 10)}</StyledTableCell>
                                            <StyledTableCell align="center">
                                            {new Date(booking.activity.DateAndTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                            </StyledTableCell>

                                            <StyledTableCell align="right" style={{ width: '150px' }}><Button variant="outlined">More Info</Button></StyledTableCell>
                                            <StyledTableCell align="right" style={{ width: '150px' }}><Button color="error" onClick={()=>handleCancel(booking._id)} variant="outlined">Cancel</Button></StyledTableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Bookings;
