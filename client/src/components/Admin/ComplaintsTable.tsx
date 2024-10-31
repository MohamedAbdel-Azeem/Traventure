import React, { useEffect, useState } from 'react';
import { Box, Button, Modal, Table, TableBody, TableContainer, TableHead, TableRow, TableCell, TableSortLabel, TablePagination, Paper, TextField } from '@mui/material';
import { styled } from '@mui/material/styles';
import DoneIcon from '@mui/icons-material/Done';
import PendingIcon from '@mui/icons-material/Pending';
import FormatAlignJustifyIcon from '@mui/icons-material/FormatAlignJustify';
import HowToVoteIcon from '@mui/icons-material/HowToVote';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { usegetallComplaints } from '../../custom_hooks/Complaints/useGetComplain';
import {useUpdateComplain} from '../../custom_hooks/Complaints/useUpdateComplain';
import { set } from 'date-fns';
type Complaint = {
    _id: string;
    type: boolean;
    bookingID?: string;
    title: string;
    body: string;
    date: string;
    status: string;
    username: string;
    reply:string;
  };
const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

function Row(props: { row: Complaint}) {
  const { row} = props;
  const [triggerUpdate, setTriggerUpdate] = useState(false);
  const [cstatus, setCstatus] = React.useState(row.status);
  const [open, setOpen] = React.useState(false);
  const [reply, setReply] = React.useState(row.reply);
  console.log("replyyy",row.reply);
  const { data, loading, error } = useUpdateComplain(row._id, { reply,status: cstatus }, triggerUpdate);
  useEffect(() => {
    if (triggerUpdate) {
      setTriggerUpdate(false);
    }
  }, [triggerUpdate]);
  const handleChange = (event: SelectChangeEvent) => {
    
    setCstatus(event.target.value as string);
    setTriggerUpdate(true);
  };

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleReplyChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setReply(event.target.value);
  };
  
  const handleSendReply = () => {
    // Logic to send the reply
    setTriggerUpdate(true);
    handleClose();
  };
  return (
    <React.Fragment>
      <Modal open={open} onClose={handleClose}>
        <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 400, bgcolor: 'background.paper', border: '2px solid #000', boxShadow: 24, p: 4 }}>
          <TextField
            label="Write your reply"
            multiline
            rows={4}
            fullWidth
            value={reply}
            onChange={handleReplyChange}
          />
          <Button variant="contained" color="primary" onClick={handleSendReply} sx={{ mt: 2 }}>
            Send
          </Button>
        </Box>
      </Modal>
      <StyledTableRow sx={{ '& > *': { borderBottom: 'unset' } }} >
        <TableCell className="max-w-[2px] break-words" component="th" scope="row">
          {!row.type?"General":row.bookingID}
        </TableCell>
        <TableCell className="max-w-[2px] break-words">{row.title}</TableCell>
        <TableCell className="max-w-[2px] break-words">{row.body}</TableCell>
        <TableCell className="max-w-[2px] break-words">{row.username}</TableCell>
        <TableCell className="max-w-[2px] break-words">{row.date.slice(0, 10)}</TableCell>
        <TableCell className="max-w-[2px] break-words">
        <Select
          id="demo-simple-select"
          value={cstatus}
          onChange={handleChange}
        >
          <MenuItem value={"Pending"}>Pending</MenuItem>
          <MenuItem value={"Resolved"}>Resolved</MenuItem>
        </Select>
        </TableCell>
        <TableCell className="max-w-[2px] break-words">
          <Button variant="contained" color="primary" onClick={handleOpen}>
            Reply
          </Button>
        </TableCell>

      </StyledTableRow>
    </React.Fragment>
  );
}

export default function ComplaintsTable() {
  const {data, loading, error} = usegetallComplaints();
  const [complaints,setComplaints] = useState([] as Complaint[]);
  
 
  useEffect(() => {
    if (data) {
      setComplaints(data as Complaint[]);
      console.log("here", data);
    }
  }, [data]);

  const rawdata = [
        { "_id": "1",
          "type": true,
          "bookingID": "B001",
          "title": "Billing Issue",
          "body": "Incorrect billing amount for the month of September.",
          "date": "2023-10-01",
          "status": "Resolved",
          "username": "John Doe"
        },
        { "_id": "2",
          "type": false,
          "title": "Service Disruption",
          "body": "Internet connection is unstable and frequently disconnects.",
          "date": "2023-10-02",
          "status": "Resolved",
          "username": "Jane Smith"
        },
        { "_id": "3",
          "type": true,
          "bookingID": "B003",
          "title": "Damaged Product",
          "body": "Received a damaged product upon delivery.",
          "date": "2023-10-03",
          "status": "Resolved",
          "username": "Alice Johnson"
        },
        { "_id": "4",
          "type": false,
          "title": "Support Issue",
          "body": "No response from customer support regarding my issue.",
          "date": "2023-10-04",
          "status": "Pending",
          "username": "Bob Brown"
        },
        { "_id": "5",
          "type": true,
          "bookingID": "B005",
          "title": "Late Delivery",
          "body": "The product was delivered later than the expected date.",
          "date": "2023-10-05",
          "status": "Pending",
          "username": "Charlie Davis"
        }
      ];

  const [searchQuery, setSearchQuery] = useState('');
  const [order, setOrder] = useState<'asc' | 'desc'>('asc');
  const [orderBy, setOrderBy] = useState<keyof Complaint>('title');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

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

  const [statusFilter, setStatusFilter] = useState<'all' | 'pending' | 'resolved'>('all');
  const handleRequestSort = (property: keyof Complaint) => {
    if (property === 'status') {
      setStatusFilter(prevStatus => {
        if (prevStatus === 'all') return 'pending';
        if (prevStatus === 'pending') return 'resolved';
        return 'all';
      });
    } else {
      const isAsc = orderBy === property && order === 'asc';
      setOrder(isAsc ? 'desc' : 'asc');
      setOrderBy(property);
    }
  };

  const filteredRows = complaints.filter(complaint => {
    const matchesSearchQuery = Object.values(complaint).some(value =>
      value.toString().toLowerCase().includes(searchQuery.toLowerCase())
    );
    const matchesStatusFilter = statusFilter === 'all' ||
      (statusFilter === 'pending' && complaint.status.toLowerCase() === 'pending') ||
      (statusFilter === 'resolved' && complaint.status.toLowerCase() === 'resolved');
    return matchesSearchQuery && matchesStatusFilter;
  });

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

  const getStatusIcon = () => {
    if (statusFilter === 'pending') return <PendingIcon fontSize=''/>;
    if (statusFilter === 'resolved') return <DoneIcon fontSize=''/>;
    return ;
  };
  return (
    <div className="w-full flex items-center justify-center my-8">
      <Paper className="w-[1100px]">
        <TableContainer component={Paper}>
          <Table aria-label="collapsible table">
            <TableHead>
            <TableCell colSpan={7}>
                <div className="flex flex-row relative">
                <HowToVoteIcon sx={{ fontSize: 40 }} className='ml-auto'/>
                <p className="text-[22px] leading-[45px] mr-auto ">Complaints</p>
                  <TextField
                  variant="outlined"
                  size="small"
                  placeholder="Search"
                  value={searchQuery}
                  sx={{
                    fontSize: '16px',
                    position: 'absolute',
                    top: 6,
                    right: -10,
                    zIndex: 10,
                  }}
                  onChange={handleSearchChange}/>
                </div>
              </TableCell> 
              </TableHead>
            <TableHead>
              <StyledTableRow>
                <TableCell className="w-[5%]">
                  <TableSortLabel
                    active={orderBy === 'type'}
                    direction={orderBy === 'type' ? order : 'asc'}
                    onClick={() => handleRequestSort('type')}>
                    Type
                  </TableSortLabel>
                </TableCell>   
                <TableCell className="w-[15%]">
                  <TableSortLabel
                    active={orderBy === 'title'}
                    direction={orderBy === 'title' ? order : 'asc'}
                    onClick={() => handleRequestSort('title')}>
                    Title
                  </TableSortLabel>
                </TableCell>   
                <TableCell className="w-[30%]">
                  <TableSortLabel
                    active={orderBy === 'body'}
                    direction={orderBy === 'body' ? order : 'asc'}
                    onClick={() => handleRequestSort('body')}>
                    Body
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
                <TableCell className="w-[9%]">
                  <TableSortLabel
                    active={orderBy === 'date'}
                    direction={orderBy === 'date' ? order : 'asc'}
                    onClick={() => handleRequestSort('date')}>
                    Date
                  </TableSortLabel>
                </TableCell>   
                <TableCell className="w-[10%]">
                  <TableSortLabel
                    IconComponent={getStatusIcon}
                    active={orderBy === 'status'}
                    onClick={() => handleRequestSort('status')}>
                    Status
                  </TableSortLabel>
                </TableCell>   
                <TableCell className="w-[10%]">
                    Action
                </TableCell>   
              </StyledTableRow>
            </TableHead>
            <TableBody>
              {paginatedRows.map((row) => (
                <Row key={row._id} row={row} />
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