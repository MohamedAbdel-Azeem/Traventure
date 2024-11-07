import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Modal,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  TableSortLabel,
  TablePagination,
  Paper,
  TextField,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import DoneIcon from "@mui/icons-material/Done";
import PendingIcon from "@mui/icons-material/Pending";
import HowToVoteIcon from "@mui/icons-material/HowToVote";
import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import {
  UseGetComplaints,
  UseGetComplaintsID,
} from "../../custom_hooks/Complaints/useGetComplain";
import { useUpdateComplain } from "../../custom_hooks/Complaints/useUpdateComplain";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import { useLocation } from "react-router-dom";
import { UseCreateComplain } from "../../custom_hooks/Complaints/useCreateComplaint";
import { useGetBookings } from "../../custom_hooks/useGetBookings";
type Complaint = {
  _id: string;
  type: boolean;
  booking_Id?: string;
  title: string;
  body: string;
  date: string;
  status: string;
  username: string;
  reply: string;
};
const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

function Row(props: { row: Complaint }) {
  const { row } = props;
  const [triggerUpdate, setTriggerUpdate] = useState(false);
  const [cstatus, setCstatus] = React.useState(row.status);
  const [open, setOpen] = React.useState(false);
  const [reply, setReply] = React.useState(row.reply);
  console.log("replyyy", row);

  const { data, loading, error } = useUpdateComplain(
    row._id,
    { reply, status: cstatus },
    triggerUpdate
  );

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
    setTriggerUpdate(true);
    handleClose();
  };

  const currenttype = useLocation().pathname.split("/")[1];
  return (
    <React.Fragment>
      <StyledTableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell className="max-w-[2px] break-words">
          {row.username}
        </TableCell>
        <TableCell className="max-w-[2px] break-words">{row.body}</TableCell>
        {currenttype.includes("admin") ? (
          <TableCell className="max-w-[2px] break-words">
            <div className="flex flex-row w-[88%]">
              <button title="Accept" className="acceptBtn ml-auto mr-8">
                <svg
                  height="1em"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M20 6L9 17L4 12" />
                </svg>
              </button>
              <button title="Reject" className="rejectBtn mr-auto ml-8">
                <svg
                  height="1em"
                  viewBox="0 0 512 512"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <line
                    x1="0"
                    y1="0"
                    x2="512"
                    y2="512"
                    stroke="white"
                    strokeWidth="80"
                  />
                  <line
                    x1="512"
                    y1="0"
                    x2="0"
                    y2="512"
                    stroke="white"
                    strokeWidth="80"
                  />
                </svg>
              </button>
            </div>
          </TableCell>
        ) : (
          <></>
        )}
      </StyledTableRow>
    </React.Fragment>
  );
}

export default function DeletionRequests() {
  const currenttype = useLocation().pathname.split("/")[1];
  const currentuser = useLocation().pathname.split("/")[2];

  const { ccomplaints, cloading } = currenttype.includes("tourist")
    ? UseGetComplaintsID(currentuser)
    : UseGetComplaints();
  const [complaints, setComplaints] = useState([] as Complaint[]);
  const [newComplaint, setNewComplaint] = useState({
    title: "",
    type: false,
    body: "",
    date: new Date().toISOString(),
    status: "Pending",
    username: currentuser,
    reply: "",
  });
  useEffect(() => {
    if (ccomplaints) {
      setComplaints(ccomplaints);
    }
  }, [ccomplaints]);

  const [GStype, setGStype] = useState("Pending");
  const [Stype, setStype] = useState("");
  const handleGSChange = (event: SelectChangeEvent) => {
    setGStype(event.target.value);
    setNewComplaint({
      ...newComplaint,
      type: event.target.value === "General",
      booking_Id: null,
    });
  };
  const handleSChange = (event: SelectChangeEvent) => {
    setStype(event.target.value);
    setNewComplaint({ ...newComplaint, booking_Id: event.target.value });
  };

  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setNewComplaint({ ...newComplaint, [name]: value });
  };
  const handleSubmit = async () => {
    console.log(newComplaint);
    try {
      await UseCreateComplain(newComplaint);
      setComplaints([...complaints, newComplaint]);
      handleClose();
    } catch (error) {
      console.error("Error creating place:", error);
    }
    handleClose();
  };

  const [searchQuery, setSearchQuery] = useState("");
  const [order, setOrder] = useState<"asc" | "desc">("asc");
  const [orderBy, setOrderBy] = useState<keyof Complaint>("title");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log(event.target.value);
    setSearchQuery(event.target.value);
    setPage(0);
  };

  const [statusFilter, setStatusFilter] = useState<"all" | "pending" | "resolved">("all");
  const handleRequestSort = (property: keyof Complaint) => {
    if (property === "status") {
      setStatusFilter((prevStatus) => {
        if (prevStatus === "all") return "pending";
        if (prevStatus === "pending") return "resolved";
        return "all";
      });
    } else {
      const isAsc = orderBy === property && order === "asc";
      setOrder(isAsc ? "desc" : "asc");
      setOrderBy(property);
    }
  };

  const filteredRows = complaints.filter((complaint) => {
    const matchesSearchQuery = Object.values(complaint).some((value) => {
      if (value !== null && value !== undefined) {
        return value
          .toString()
          .toLowerCase()
          .includes(searchQuery.toLowerCase());
      }
      return false;
    });

    const matchesStatusFilter =
      statusFilter === "all" ||
      (statusFilter === "pending" &&
        complaint.status.toLowerCase() === "pending") ||
      (statusFilter === "resolved" &&
        complaint.status.toLowerCase() === "resolved");

    return matchesSearchQuery && matchesStatusFilter;
  });

  const sortedRows = filteredRows.sort((a, b) => {
    if (a[orderBy] < b[orderBy]) {
      return order === "asc" ? -1 : 1;
    }
    if (a[orderBy] > b[orderBy]) {
      return order === "asc" ? 1 : -1;
    }
    return 0;
  });

  const paginatedRows = sortedRows.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  const { bookingdata, bookingloading, bookingerror } =
    useGetBookings(currentuser);

  const inlineStyles = {
    modal: {
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      width: 400,
      bgcolor: "background.paper",
      border: "2px solid #000",
      boxShadow: 24,
      p: 4,
    },
  };
  if (cloading) {
    return <div>Loading...</div>;
  }
  return (
    <div className="w-full flex justify-center my-8">
      <Paper className="w-[1100px]">
        <TableContainer component={Paper}>
          <Table aria-label="collapsible table">
            <TableHead>
              <TableCell colSpan={7}>
                <div className="flex flex-row relative">
                  <HowToVoteIcon sx={{ fontSize: 40 }} className="ml-auto" />
                  <p className="text-[22px] leading-[45px] mr-auto ">
                    Deletion Requests
                  </p>
                  <TextField
                    variant="outlined"
                    size="small"
                    placeholder="Search"
                    value={searchQuery}
                    sx={{
                      fontSize: "16px",
                      position: "absolute",
                      top: 6,
                      right: -10,
                      zIndex: 10,
                    }}
                    onChange={handleSearchChange}
                  />
                </div>
              </TableCell>
            </TableHead>
            <TableHead>
              <StyledTableRow>
                <TableCell className="w-[30%]">
                  <TableSortLabel
                    active={orderBy === "username"}
                    direction={orderBy === "username" ? order : "asc"}
                    onClick={() => handleRequestSort("username")}
                  >
                    Username
                  </TableSortLabel>
                </TableCell>
                <TableCell className="w-[30%]">
                  <TableSortLabel
                    active={orderBy === "type"}
                    direction={orderBy === "type" ? order : "asc"}
                    onClick={() => handleRequestSort("type")}
                  >
                    Wallet
                  </TableSortLabel>
                </TableCell>
                <TableCell className="w-[30%]">
                  <TableSortLabel
                    active={orderBy === "title"}
                    direction={orderBy === "title" ? order : "asc"}
                    onClick={() => handleRequestSort("title")}
                  >
                    Actions
                  </TableSortLabel>
                </TableCell>
              </StyledTableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                {!currenttype.includes("admin") ? (
                  <TableCell colSpan={6} style={{ textAlign: "center" }}>
                    <Button onClick={handleOpen} className="w-full h-full">
                      Add a Complaint
                    </Button>
                  </TableCell>
                ) : (
                  <></>
                )}
              </TableRow>
              {paginatedRows.map((row) => (
                <Row key={row._id} row={row} />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          classes={{
            selectLabel: "pagination-selectLabel",
            displayedRows: "pagination-selectLabel",
          }}
          component="div"
          count={filteredRows.length}
          page={page}
          rowsPerPageOptions={[5, 10, 25]}
          onPageChange={handleChangePage}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
      <style>{`.pagination-selectLabel {margin: 0;}`}</style>
    </div>
  );
}
