import React, { useState } from 'react';
import { Table, TableBody, TableContainer, TableHead, TableRow, TableCell, TableSortLabel, TablePagination, Paper, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import { styled } from '@mui/material/styles';
import PublicIcon from '@mui/icons-material/Public';
import { deleteUsers } from '../../custom_hooks/adminusers/governorandadmin';
import useAddAdminandGovernor from "../../custom_hooks/adminusers/governorandadminadd";
type AdminTourismGovernorTabletype = {
  username: string;
  password: string
};

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd) td': {
    backgroundColor: theme.palette.action.hover,
  },
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

function Row(props: { row: AdminTourismGovernorTabletype , onDelete: (username: string) => void }) {
  const { row, onDelete } = props;

  return (
    <React.Fragment>
      <StyledTableRow sx={{ '& > *': { borderBottom: 'unset' } }} >
        <TableCell className="max-w-[2px] break-words" scope="row">
          {row.username}
        </TableCell>
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


type Admin = {
  _id: string;
  username: string;
  password: string; // Note: It's best not to expose passwords in a real app
  __v: number;
}
type TourismGovernor = {
  _id: string;
  username: string;
  password: string; // Note: It's best not to expose passwords in a real app
  __v: number;
}


interface Admin_TourismGovernorTableProps {
  dataA: Admin[] | undefined;
  dataG: TourismGovernor[] | undefined;
  name: string;
}




const Admin_TourismGovernorTable: React.FC<Admin_TourismGovernorTableProps> = ({ dataA, dataG, name }) => {
  const [rows, setRows] = useState(
    name.includes("Admin")?dataA:dataG
  );


  React.useEffect(() => {
    if (dataA && name.includes("Admin")) {
      setRows(dataA); 
    }
    if(dataG && name.includes("Tourism Governor")){
      setRows(dataG); 
    }
  }, [dataG,dataA]);

  const [apiBody, setApiBody] = useState({});

  const { data, loading, error } = useAddAdminandGovernor(apiBody, name);

    const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [searchQuery, setSearchQuery] = useState('');
  const [order, setOrder] = useState<'asc' | 'desc'>('asc');
  const [orderBy, setOrderBy] = useState<keyof AdminTourismGovernorTabletype>('username');
  const [open, setOpen] = useState(false);
  const [newUsername, setNewUsername] = useState('');
  const [newPassword, setNewPassword] = useState('');

  const handleDelete = (username: string) => {
    if (window.confirm(`Are you sure you want to delete the user ${username}?`)) {
      setRows(rows?.filter(row => row.username !== username));
      deleteUsers(username, name);
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
    row.username.includes(searchQuery)
  );
  const handleRequestSort = (property: keyof AdminTourismGovernorTabletype) => {
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

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleAdd = () => {
    const body = {username:newUsername,password:newPassword};
    setApiBody(body);

    setNewUsername('');
    setNewPassword('');
    handleClose();
  };
  const paginatedRows = sortedRows?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  return (
    <div className="w-full flex items-center justify-center">
      <Paper className="w-[1100px]">
      <Dialog open={open} onClose={handleClose}>
          <DialogTitle>{"Add New "+name}</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Please enter the username and password for the new admin.
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              label="Username"
              type="text"
              fullWidth
              value={newUsername}
              onChange={(e) => setNewUsername(e.target.value)}
            />
            <TextField
              margin="dense"
              label="Password"
              type="password"
              fullWidth
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={handleAdd}>Add</Button>
          </DialogActions>
        </Dialog>
        <TableContainer component={Paper}>
          <Table aria-label="collapsible table">
            <TableHead> 
              <TableCell colSpan={3}>
                <div className="flex flex-row relative">
                  {name.includes("Admin")?
                <AdminPanelSettingsIcon  sx={{ fontSize: 40 }} className="ml-auto"/>
                :<PublicIcon  sx={{ fontSize: 40 }} className="ml-auto"/>
              }
                  <p className="text-[22px] leading-[45px] mr-auto">{name}</p>
                  <Button
                  onClick={handleClickOpen}
                  sx={{
                    fontSize: '16px',
                    position: 'absolute',
                    top: 6,
                    right: -10,
                    zIndex: 10,
                  }} variant="outlined" 
                  color="inherit"
                  size="small"
                  startIcon={<AddIcon/>}
                  >
                    {"Add "+name}
                  </Button>
                </div>
              </TableCell>
              </TableHead>
              <TableHead>
                <StyledTableRow>
                  <TableCell className="w-[75%]">
                    <TableSortLabel
                      active={orderBy === 'username'}
                      direction={orderBy === 'username' ? order : 'asc'}
                      onClick={() => handleRequestSort('username')}>
                      Username
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
                <Row key={row.username} row={row} onDelete={handleDelete} />
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
};
export default Admin_TourismGovernorTable;