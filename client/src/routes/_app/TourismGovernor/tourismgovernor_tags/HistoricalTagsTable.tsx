import React, { useState } from 'react';
import { Table, TableBody, TableContainer, TableHead, TableRow, TableCell, TableSortLabel, TablePagination, Paper, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { styled } from '@mui/material/styles';
import LuggageIcon from '@mui/icons-material/Luggage';
import { useGetHTags, createHtag } from '../../../../custom_hooks/useCreateHistoricalTag';

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

function Row(props: { row: string }) {
  const { row } = props;


  return (
    <React.Fragment>
      <StyledTableRow sx={{ '& > *': { borderBottom: 'unset' } }} >
        <TableCell className="break-words" scope="row">
          {row}
        </TableCell>
      </StyledTableRow>
    </React.Fragment>
  );
}

export default function HistoricalTagsTable() {
  const { data, loading, error } = useGetHTags();
  const [open, setOpen] = useState(false);
  const [newName, setNewName] = useState('');
  const [rows, setRows] = useState(data);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [searchQuery, setSearchQuery] = useState('');
  const [order, setOrder] = useState<'asc' | 'desc'>('asc');
  const [orderBy, setOrderBy] = useState('name');

  React.useEffect(() => {
    if (data) {
      setRows(data);
    }
  }, [data]);


  const handleAdd = () => {
    setRows([...rows, { name: newName}]); // Ensure each row is an object with a name property
    setNewName('');
    handleClose();
    const body = { name: newName };
    createHtag(body);
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
    row.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  const handleRequestSort = (property: string) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const sortedRows = filteredRows.sort((a, b) => {
    if (a < b) {
      return order === 'asc' ? -1 : 1;
    }
    if (a > b) {
      return order === 'asc' ? 1 : -1;
    }
    return 0;
  });

  
  const handleClose = () => {
    setOpen(false);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };


  const paginatedRows = sortedRows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);


  return (
    <div className="w-full flex items-center justify-center my-8">
      <Paper className="w-[1100px]">
      <Dialog open={open} onClose={handleClose}>
          <DialogTitle>{"Add New Historical Tag"}</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Please enter the name of the new historical tag.
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              label="Name"
              type="text"
              fullWidth
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
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
            <TableCell colSpan={2}>
                <div className="flex flex-row relative">
             
                <LuggageIcon sx={{ fontSize: 40 }} className='ml-auto'/>
                <p className="text-[22px] leading-[45px] mr-auto ">Historical Tags</p>
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
                    {"Add Historical Tag"}
                  </Button>
                </div>
              </TableCell> 
              
              </TableHead>
            <TableHead>
              <StyledTableRow>
                <TableCell className="w-[75%]">
                  <TableSortLabel
                    active={orderBy === 'name'}
                    direction={orderBy === 'name' ? order : 'asc'}
                    onClick={() => handleRequestSort('name')}>
                    Name
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
            {paginatedRows.map((row, index) => (
                <TableRow key={index}>
                <TableCell colSpan={2}>{row.name}</TableCell>
                </TableRow>
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

