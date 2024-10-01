import axios, { AxiosError } from "axios";
import React from "react";
import { useState } from 'react';
import {Table, TableBody, TableContainer, TableHead, TableRow, TableCell, TextField, TableSortLabel, TablePagination, Paper} from '@mui/material';
import LuggageIcon from '@mui/icons-material/Luggage';
import { styled } from '@mui/material/styles';
import { fetch_testing } from "../../custom_hooks/tourist";
function createData(
  _id: string,
  username: string,
  email: string,
  password: string, // Note: It's best not to expose passwords in a real app
  mobileNumber: string,
  dateOfBirth: string, // ISO date string
  nationality: string,
  Occupation: string, // It's better to use camelCase for consistency
  __v: number,
) {
  return {
    _id,
    email,
    username,
    password,
    mobileNumber,
    nationality,
    dateOfBirth,
    Occupation,
    __v
  };
}

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

function Row(props: { row: ReturnType<typeof createData>, onDelete: (username: string) => void }) {
  const { row, onDelete } = props;

  return (
    <React.Fragment>
      <StyledTableRow sx={{ '& > *': { borderBottom: 'unset' } }} >
        <TableCell className="max-w-[2px] break-words" component="th" scope="row">
          {row.email}
        </TableCell>
        <TableCell className="max-w-[2px] break-words">{row.username}</TableCell>
        <TableCell className="max-w-[2px] break-words">{row.nationality}</TableCell>
        <TableCell className="max-w-[2px]">{row.mobileNumber}</TableCell>
        <TableCell className="max-w-[2px] break-words">{row.Occupation}</TableCell>
        <TableCell className="max-w-[2px] break-words">{row.dateOfBirth.split("T00:00:00.000Z")}</TableCell>
        <TableCell className="max-w-[2px] break-words">
        <button className="bin-button mx-auto" title="Delete"
            onClick={() => onDelete(row.username)}>
              <svg
                className="bin-top"
                viewBox="0 0 39 7"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <line y1="5" x2="39" y2="5" stroke="white" stroke-width="4"></line>
                <line
                  x1="12"
                  y1="1.5"
                  x2="26.0357"
                  y2="1.5"
                  stroke="white"
                  stroke-width="3"
                ></line>
              </svg>
              <svg
                className="bin-bottom"
                viewBox="0 0 33 39"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <mask id="path-1-inside-1_8_19" fill="white">
                  <path
                    d="M0 0H33V35C33 37.2091 31.2091 39 29 39H4C1.79086 39 0 37.2091 0 35V0Z"
                  ></path>
                </mask>
                <path
                  d="M0 0H33H0ZM37 35C37 39.4183 33.4183 43 29 43H4C-0.418278 43 -4 39.4183 -4 35H4H29H37ZM4 43C-0.418278 43 -4 39.4183 -4 35V0H4V35V43ZM37 0V35C37 39.4183 33.4183 43 29 43V35V0H37Z"
                  fill="white"
                  mask="url(#path-1-inside-1_8_19)"
                ></path>
                <path d="M12 6L12 29" stroke="white" stroke-width="4"></path>
                <path d="M21 6V29" stroke="white" stroke-width="4"></path>
              </svg>
            </button>
          </TableCell>
      </StyledTableRow>
    </React.Fragment>
  );
}

interface Advertiser {
    _id: string;
    username: string;
    email: string;
    password: string; // Note: It's best not to expose passwords in a real app
    isAccepted: boolean;
    __v: number;
    hotline: string;
    websiteLink: string;
  }
  
  // Seller interface
  interface Seller {
    _id: string;
    username: string;
    email: string;
    password: string; // Note: It's best not to expose passwords in a real app
    isAccepted: boolean;
    __v: number;
    description?: string; // Optional field
    name?: string; // Optional field
  }
  
  // Tour Guide interface
  interface TourGuide {
    _id: string;
    username: string;
    email: string;
    password: string; // Note: It's best not to expose passwords in a real app
    isAccepted: boolean;
    previousWork: any[]; // Assuming this could be an array of any type
    __v: number;
    mobileNumber: string;
    yearsOfExperience: number;
  }
  
  // Tourist interface
  interface Tourist {
    _id: string;
    username: string;
    email: string;
    password: string; // Note: It's best not to expose passwords in a real app
    mobileNumber: string;
    dateOfBirth: string; // ISO date string
    nationality: string;
    Occupation: string; // It's better to use camelCase for consistency
    __v: number;
  }
  
  // Admin interface
  interface Admin {
    _id: string;
    username: string;
    password: string; // Note: It's best not to expose passwords in a real app
    __v: number;
  }
  
  // Combine all interfaces into a single type to represent the full structure
  interface DataStructure {
    advertisers: Advertiser[];
    sellers: Seller[];
    tourGuides: TourGuide[];
    tourists: Tourist[];
    admins: Admin[];
  }

  // const fetch_testing = () => {
  //   const [data, setData] = React.useState<DataStructure | null>(null);
  //   const [loading, setLoading] = React.useState(true);
  //   const [error, setError] = React.useState<string | null>(null);
  
  //   React.useEffect(() => {
  //     const fetchData = async () => {
  //       try {
  //         const response = await axios.get("traventure/api/admin/all", {
  //           params: {
  //             username: "SeifTarek",
  //           },
  //         });
          
  //         // Assuming the response data structure is correct and contains a 'tourists' array
  //         setData(response.data);
  //         setLoading(false);
  //       } catch (error) {
  //         console.error("Error fetching data:", error);
  //         const axiosError = error as AxiosError;
  //         setError(axiosError.message);
  //         setLoading(false);
  //       }
  //     };
  
  //     fetchData();
  //   }, []);
  
  //   return { data, loading, error };
  // };
  
  const data = fetch_testing;
  const deleteUsers = async (username: string, type: string) => {
      const response = await fetch(`traventure/api/admin/delete/user/${username}/tourist`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        }
      });
  
      if (!response.ok) {
        throw new Error('Failed to delete user');
      }
  
      // Re-fetch the users after deleting
      fetch_testing();
      alert(`${username} deleted successfully.`);
 
  };

export default function TouristTable() {
  const { data, loading, error } = fetch_testing();

  const [rows, setRows] = useState<Tourist[]>([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [searchQuery, setSearchQuery] = useState('');
  const [order, setOrder] = useState<'asc' | 'desc'>('asc');
  const [orderBy, setOrderBy] = useState<keyof ReturnType<typeof createData>>('email');

  React.useEffect(() => {
    if (data && data.tourists) {
      setRows(data.tourists); // Update rows state with fetched tourists
    }
  }, [data]);

  const handleDelete = (username: string) => {
    if (window.confirm(`Are you sure you want to delete the user ${username}?`)) {
      //setRows(rows.filter(row => row.username !== username));
      deleteUsers(username, "tourist");
    }
  };


  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
    setPage(0);
  };

  const filteredRows = rows?.filter(row => 
    row.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    row.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
    row.nationality.toLowerCase().includes(searchQuery.toLowerCase()) ||
    row.mobileNumber.includes(searchQuery) ||
    row.Occupation.toLowerCase().includes(searchQuery.toLowerCase()) ||
    row.dateOfBirth.includes(searchQuery)
  );
  const handleRequestSort = (property: keyof ReturnType<typeof createData>) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };
  const sortedRows = filteredRows?.sort((a, b) => {
    if (a[orderBy] < b[orderBy]) {
      return order === 'asc' ? -1 : 1;
    }
    if (a[orderBy] > b[orderBy]) {
      return order === 'asc' ? 1 : -1;
    }
    return 0;
  });

  const paginatedRows = sortedRows?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  return (
    <div className="w-full flex items-center justify-center">
      <Paper className="w-[1100px]">
        <TableContainer component={Paper}>
          <Table aria-label="collapsible table">
            <TableHead> 
              <TableCell colSpan={7}>
                <div className="justify-center flex flex-row">
                  <LuggageIcon sx={{ fontSize: 40 }}/>
                  <p className="text-[22px] leading-[45px]">Tourists</p>
                </div>
              </TableCell>
              </TableHead>
            <TableHead>
              <StyledTableRow>
                <TableCell className="w-[21%]">
                  <TableSortLabel
                    active={orderBy === 'email'}
                    direction={orderBy === 'email' ? order : 'asc'}
                    onClick={() => handleRequestSort('email')}>
                    Email
                  </TableSortLabel>
                </TableCell>
                <TableCell className="w-[10%]">
                  <TableSortLabel
                    active={orderBy === 'username'}
                    direction={orderBy === 'username' ? order : 'asc'}
                    onClick={() => handleRequestSort('username')}>
                    Username
                  </TableSortLabel>
                </TableCell>
                <TableCell className="w-[5%]">
                  <TableSortLabel
                    active={orderBy === 'nationality'}
                    direction={orderBy === 'nationality' ? order : 'asc'}
                    onClick={() => handleRequestSort('nationality')}>
                    Nationality
                  </TableSortLabel>
                </TableCell>
                <TableCell className="w-[10%]">
                  <TableSortLabel
                    active={orderBy === 'mobileNumber'}
                    direction={orderBy === 'mobileNumber' ? order : 'asc'}
                    onClick={() => handleRequestSort('mobileNumber')}>
                    Phone
                  </TableSortLabel>
                </TableCell>
                <TableCell className="w-[10%]">
                <TableSortLabel
                  active={orderBy === 'Occupation'}
                  direction={orderBy === 'Occupation' ? order : 'asc'}
                  onClick={() => handleRequestSort('Occupation')}>
                  Occupation
                </TableSortLabel>
              </TableCell>
              <TableCell className="w-[19%]">
                <TableSortLabel
                  active={orderBy === 'dateOfBirth'}
                  direction={orderBy === 'dateOfBirth' ? order : 'asc'}
                  onClick={() => handleRequestSort('dateOfBirth')}>
                  Date of Birth
                </TableSortLabel>
              </TableCell>
              <TableCell className="w-[25%]">
                <TextField
                  variant="outlined"
                  size="small"
                  placeholder="Search"
                  value={searchQuery}
                  onChange={handleSearchChange}/>
              </TableCell>
              </StyledTableRow>
            </TableHead>
            <TableBody>
              {paginatedRows?.map((row) => (
                <Row key={row._id} row={row} onDelete={handleDelete} />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={filteredRows?.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}/>
      </Paper>
    </div>
  );
}