import * as React from 'react';
import { useState } from 'react';
import {Table, TableBody, TableContainer, TableHead, TableRow, TableCell, TextField, TableSortLabel, TablePagination, Paper} from '@mui/material';
import LuggageIcon from '@mui/icons-material/Luggage';
import { styled } from '@mui/material/styles';
function createData(
    email: string,
    Username:string,
    password: string,
    mobileNumber: string,
    nationality: string,
    DOB: string,
    Occupation: string,
) {
  return {
    email,
    Username,
    password,
    mobileNumber,
    nationality,
    DOB,
    Occupation,
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
        <TableCell className="max-w-[2px] break-words">{row.Username}</TableCell>
        <TableCell className="max-w-[2px] break-words">{row.nationality}</TableCell>
        <TableCell className="max-w-[2px]">{row.mobileNumber}</TableCell>
        <TableCell className="max-w-[2px] break-words">{row.Occupation}</TableCell>
        <TableCell className="max-w-[2px] break-words">{row.DOB}</TableCell>
        <TableCell className="max-w-[2px] break-words">
        <button className="bin-button mx-auto" title="Delete"
            onClick={() => onDelete(row.Username)}>
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
const initialRows = [
  createData('ahmoslamy@hotmail.com', 'Naefu', 'randomPassword123', '01092408287', 'Egypt', '19/02/2004', 'Student'),
  createData('john.doe@example.com', 'JohnDoe', 'password123', '0123456789', 'USA', '01/01/1990', 'Engineer'),
  createData('jane.doe@example.com', 'JaneDoe', 'password456', '0987654321', 'Canada', '02/02/1992', 'Doctor'),
  createData('alice.smith@example.com', 'AliceSmith', 'password789', '1234567890', 'UK', '03/03/1993', 'Designer'),
  createData('bob.jones@example.com', 'BobJones', 'password101', '2345678901', 'Australia', '04/04/1994', 'Developer'),
  createData('charlie.brown@edfsssssssssssssssssssssssssssssssssssssssssssssssssxample.com', 'CharlieBrown', 'password202', '3456789012', 'Germany', '05/05/1995', 'Manager'),
  createData('david.wilson@example.com', 'DavidWilson', 'password303', '4567890123', 'France', '06/06/1996', 'Analyst'),
  createData('eva.green@example.com', 'EvaGreen', 'password404', '5678901234', 'Italy', '07/07/1997', 'Consultant'),
  createData('frank.white@example.com', 'FrankWhite', 'password505', '6789012345', 'Democratic Republic of Congo', '08/08/1998', 'Architect'),
  createData('grace.black@example.com', 'GraceBlack', 'password606', '7890123456', 'Trinidad & Tobago', '09/09/1999', 'Scientist'),
];
export default function TouristTable() {
  const [rows, setRows] = useState(initialRows);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [searchQuery, setSearchQuery] = useState('');
  const [order, setOrder] = useState<'asc' | 'desc'>('asc');
  const [orderBy, setOrderBy] = useState<keyof ReturnType<typeof createData>>('email');

  const handleDelete = (username: string) => {
    if (window.confirm(`Are you sure you want to delete the user ${username}?`)) {
      setRows(rows.filter(row => row.Username !== username));
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

  const filteredRows = rows.filter(row => 
    row.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    row.Username.toLowerCase().includes(searchQuery.toLowerCase()) ||
    row.nationality.toLowerCase().includes(searchQuery.toLowerCase()) ||
    row.mobileNumber.includes(searchQuery) ||
    row.Occupation.toLowerCase().includes(searchQuery.toLowerCase()) ||
    row.DOB.includes(searchQuery)
  );
  const handleRequestSort = (property: keyof ReturnType<typeof createData>) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };
  const sortedRows = filteredRows.sort((a, b) => {
    if (a[orderBy] < b[orderBy]) {
      return order === 'asc' ? -1 : 1;
    }
    if (a[orderBy] > b[orderBy]) {
      return order === 'asc' ? 1 : -1;
    }
    return 0;
  });

  const paginatedRows = sortedRows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

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
                <TableCell className="w-[20%]">
                  <TableSortLabel
                    active={orderBy === 'email'}
                    direction={orderBy === 'email' ? order : 'asc'}
                    onClick={() => handleRequestSort('email')}>
                    Email
                  </TableSortLabel>
                </TableCell>
                <TableCell className="w-[15%]">
                  <TableSortLabel
                    active={orderBy === 'Username'}
                    direction={orderBy === 'Username' ? order : 'asc'}
                    onClick={() => handleRequestSort('Username')}>
                    Username
                  </TableSortLabel>
                </TableCell>
                <TableCell className="w-[15%]">
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
                <TableCell className="w-[5%]">
                <TableSortLabel
                  active={orderBy === 'Occupation'}
                  direction={orderBy === 'Occupation' ? order : 'asc'}
                  onClick={() => handleRequestSort('Occupation')}>
                  Occupation
                </TableSortLabel>
              </TableCell>
              <TableCell className="w-[10%]">
                <TableSortLabel
                  active={orderBy === 'DOB'}
                  direction={orderBy === 'DOB' ? order : 'asc'}
                  onClick={() => handleRequestSort('DOB')}>
                  DOB
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
              {paginatedRows.map((row) => (
                <Row key={row.Username} row={row} onDelete={handleDelete} />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={filteredRows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}/>
      </Paper>
    </div>
  );
}