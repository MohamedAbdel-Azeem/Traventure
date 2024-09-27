import * as React from 'react';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

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

function Row(props: { row: ReturnType<typeof createData> }) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);

  return (
    <React.Fragment>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {row.email}
        </TableCell>
        <TableCell>{row.Username}</TableCell>
        <TableCell>{row.password}</TableCell>
        <TableCell>{row.mobileNumber}</TableCell>
        <TableCell>{row.nationality}</TableCell>
        <TableCell>{row.DOB}</TableCell>
        <TableCell>{row.Occupation}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <div className="grid grid-cols-3">
                <p className="ml-6 my-3">Username: Naefu</p>
                <p className="ml-6 my-3">Email: ahmoslamy@hotmail.com</p>
                <p className="ml-6 my-3">Phone: 01092408287</p>
                <p className="ml-6 my-3">Nationality: Egypt</p>
                <p className="ml-6 my-3">Date of Birth: 19/02/2004</p>
                <p className="ml-6 my-3">Occupation: Student</p>
            </div>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}
const rows = [
    createData('ahmoslamy@hotmail.com', 'Naefu', 'randomPassword123', '01092408287', 'Egypt', '19/02/2004', 'Student'),
    createData('john.doe@example.com', 'JohnDoe', 'password123', '0123456789', 'USA', '01/01/1990', 'Engineer'),
    createData('jane.doe@example.com', 'JaneDoe', 'password456', '0987654321', 'Canada', '02/02/1992', 'Doctor'),
  ];
export default function CollapsibleTable() {
  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell>Dessert (100g serving)</TableCell>
            <TableCell align="right">Calories</TableCell>
            <TableCell align="right">Fat&nbsp;(g)</TableCell>
            <TableCell align="right">Carbs&nbsp;(g)</TableCell>
            <TableCell align="right">Protein&nbsp;(g)</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <Row key={row.Username} row={row} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}