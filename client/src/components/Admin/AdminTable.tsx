import * as React from 'react';
import { useState } from 'react';
import {Table, TableBody, TableContainer, TableHead, TableRow, TableCell, TextField, TableSortLabel, TablePagination, Paper, Button} from '@mui/material';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import AddIcon from '@mui/icons-material/Add';
import { styled } from '@mui/material/styles';
function createData(
    username:string,
    password: string,
) {
  return {
    username,
    password
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
          {row.username}
        </TableCell>
        <TableCell className="max-w-[2px] break-words">{row.password}</TableCell>
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

const userCredentials = [
  { username: 'Naefu', password: 'randomPassword123' },
  { username: 'JohnDoe1', password: 'password123' },
  { username: 'JaneDoe2', password: 'password4562' },
  { username: 'JaneDoe3', password: 'password4563' },
  { username: 'JaneDoe4', password: 'password4564' },
  { username: 'JaneDoe5', password: 'password4565' },
  { username: 'JaneDoe6', password: 'password4566' },
  { username: 'JaneDoe7', password: 'password4567' },
];

export default function AdminTable() {
  const [rows, setRows] = useState(userCredentials);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [searchQuery, setSearchQuery] = useState('');
  const [order, setOrder] = useState<'asc' | 'desc'>('asc');
  const [orderBy, setOrderBy] = useState<keyof ReturnType<typeof createData>>('username');

  const handleDelete = (username: string) => {
    if (window.confirm(`Are you sure you want to delete the user ${username}?`)) {
      setRows(rows.filter(row => row.username !== username));
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
    row.username.includes(searchQuery) ||
    row.password.includes(searchQuery) 
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
              <TableCell colSpan={3}>
                <div className="flex flex-row relative">
                  <AdminPanelSettingsIcon  sx={{ fontSize: 40 }} className="ml-auto"/>
                  <p className="text-[22px] leading-[45px] mr-auto">Admins</p>
                  <Button sx={{
                    fontSize: '22px',
                    position: 'absolute',
                    top: 0,
                    right: 20,
                    zIndex: 10,
                  }} variant="outlined" 
                  color="inherit"
                  size="small"
                  startIcon={<AddIcon/>}
                  >
                    Add Admin
                  </Button>
                </div>
              </TableCell>
              </TableHead>
              <TableHead>
                <StyledTableRow>
                  <TableCell className="w-[30%]">
                    <TableSortLabel
                      active={orderBy === 'username'}
                      direction={orderBy === 'username' ? order : 'asc'}
                      onClick={() => handleRequestSort('username')}>
                      Username
                    </TableSortLabel>
                  </TableCell>
                  <TableCell className="w-[45%]">
                    <TableSortLabel
                      active={orderBy === 'password'}
                      direction={orderBy === 'password' ? order : 'asc'}
                      onClick={() => handleRequestSort('password')}>
                      Password
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
                <Row key={row.username} row={row} onDelete={handleDelete} />
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