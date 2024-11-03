import React, { useState } from 'react';
import { Table, TableBody, TableContainer, TableHead, TableRow, TableCell, TableSortLabel, TablePagination, Paper, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { styled } from '@mui/material/styles';
import LuggageIcon from '@mui/icons-material/Luggage';
import { useGetAllTags, deleteTags, useAddTag, useUpdateTag } from "../../custom_hooks/categoryandTagCRUD"
import BestDeleteButton from '../BestDeleteButton';



const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

function Row(props: { row: string, onDelete: (name: string) => void, updateSingleRow: (name: string, newName: string) => void }) {
  const { row, onDelete } = props;
    const [isEditable, setIsEditable] = useState(false);
    const [newName, setNewName] = useState(row);



    function handleSave(oldname: string, newName: string){ 
        props.updateSingleRow(oldname, newName);
        setIsEditable(false);
    }

  return (
    <React.Fragment>
      <StyledTableRow sx={{ '& > *': { borderBottom: 'unset' } }} >
        <TableCell className="max-w-[2px] break-words" component="th" scope="row">
          {!isEditable?
          row:<TextField
              variant="outlined"
                size="small"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
            
            />}
        </TableCell>
        <TableCell className="max-w-[2px] break-words">

            <div className="flex items-center justify-center">
                {!isEditable?
                (
                    <button title="edit" className="editBtn"
                    onClick={() => setIsEditable(true)}>
              <svg height="1em" viewBox="0 0 512 512">
                <path
                  d="M410.3 231l11.3-11.3-33.9-33.9-62.1-62.1L291.7 89.8l-11.3 11.3-22.6 22.6L58.6 322.9c-10.4 10.4-18 23.3-22.2 37.4L1 480.7c-2.5 8.4-.2 17.5 6.1 23.7s15.3 8.5 23.7 6.1l120.3-35.4c14.1-4.2 27-11.8 37.4-22.2L387.7 253.7 410.3 231zM160 399.4l-9.1 22.7c-4 3.1-8.5 5.4-13.3 6.9L59.4 452l23-78.1c1.4-4.9 3.8-9.4 6.9-13.3l22.7-9.1v32c0 8.8 7.2 16 16 16h32zM362.7 18.7L348.3 33.2 325.7 55.8 314.3 67.1l33.9 33.9 62.1 62.1 33.9 33.9 11.3-11.3 22.6-22.6 14.5-14.5c25-25 25-65.5 0-90.5L453.3 18.7c-25-25-65.5-25-90.5 0zm-47.4 168l-144 144c-6.2 6.2-16.4 6.2-22.6 0s-6.2-16.4 0-22.6l144-144c6.2-6.2 16.4-6.2 22.6 0s6.2 16.4 0 22.6z"
                ></path>
              </svg>
            </button>

                ):(
                     <Button 
                     onClick={() => handleSave(row, newName)}
                     >Save</Button>
                )

                }
            <BestDeleteButton
              className="mx-auto"
              onDelete={() => onDelete(row)}
            />
            </div>
          </TableCell>
      </StyledTableRow>
    </React.Fragment>
  );
}

export default function TagTable() {
  const { data } = useGetAllTags();
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


    function updatesingleRow(oldrowname:string, newrowname:string){
    const newRows = rows.map(row => {
      if (row === oldrowname) {
        return  newrowname ;
      }
      return row;
    });
    setRows(newRows);
    setoUapiBody(oldrowname);
    const body = {name:newrowname};
    setUapiBody(body);
    }

    const handleAdd = () => {
      setRows([...rows, newName]);
      setNewName('');
      handleClose();
      const body = {name:newName};
      setApiBody(body);
    };

  const handleDelete = (name: string) => {
    if (window.confirm(`Are you sure you want to delete this tag ${name}?`)) {
      deleteTags(name);
      setRows(rows.filter(row => row !== name));
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
    row.toLowerCase().includes(searchQuery.toLowerCase())
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

  const [apiBody, setApiBody] = useState({});
  const [uapiBody, setUapiBody] = useState({});
  const [ouapiBody, setoUapiBody] = useState('');

  const { adata, aloading, aerror } = useAddTag(apiBody);
  const { udata, uloading, uerror } = useUpdateTag(ouapiBody,uapiBody);

  return (
    <div className="w-full flex items-center justify-center">
      <Paper className="w-[1100px]">
      <Dialog open={open} onClose={handleClose}>
          <DialogTitle>{"Add New Tag"}</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Please enter the name of the new tag.
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
                <p className="text-[22px] leading-[45px] mr-auto ">Tags</p>
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
                    Add Tag
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
              {paginatedRows.map((row) => (
                <Row key={row} row={row} onDelete={handleDelete} updateSingleRow={updatesingleRow} />
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

