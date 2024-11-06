import React, { useEffect } from "react";
import emailjs from "emailjs-com";

import { useState } from "react";
import {
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  TextField,
  Button,
  TableSortLabel,
  TablePagination,
  Paper,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { GetAllPendingUsers } from "../../custom_hooks/useGetPending";
import { updateuserstatus } from "../../custom_hooks/useAcceptReject";
import StoreIcon from "@mui/icons-material/Store";
import TourIcon from "@mui/icons-material/Tour";
import CampaignIcon from "@mui/icons-material/Campaign";
const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));
interface Applicant {
  username: string;
  email: string;
  documents: string;
}
function Row(props: { row: Applicant; onDelete: (username: string) => void; accounttype:string }) {
  const { row, onDelete, accounttype } = props;

  function sendAcceptance() {
    emailjs.send(
      "service_ee1ryzf",
      "template_jmemw38",
      {
        from_name: row.username,
        to_email: row.email,
      },
      "UdOl1mlaGbsuxfXrd"
    );
  }
  function sendRejection() {
    emailjs.send(
      "service_ee1ryzf",
      "template_ffg6p8r",
      {
        from_name: row.username,
        to_email: row.email,
      },
      "UdOl1mlaGbsuxfXrd"
    );
  }

  return (
    <React.Fragment>
      <StyledTableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell
          className="max-w-[2px] break-words"
          component="th"
          scope="row"
        >
          {row.email}
        </TableCell>
        <TableCell className="max-w-[2px] break-words">
          {row.username}
        </TableCell>
        <TableCell className="max-w-[2px] break-words">
          <Button
            component="a"
            href={row.documents}
            target="_blank"
            rel="noopener noreferrer"
            variant="contained"
            color="primary"
          >
            View Document
          </Button>
        </TableCell>
        <TableCell className="max-w-[2px] flex">
          <div className="flex flex-row w-[88%]">
            <button
              title="Accept"
              className="acceptBtn ml-auto mr-8"
              onClick={() => (
                updateuserstatus(row.username, accounttype, true),
                sendAcceptance(),
                onDelete(row.username)
              )}
            >
              <svg
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M20 6L9 17L4 12" />
              </svg>
            </button>
            <button
              title="Reject"
              className="rejectBtn mr-auto ml-8"
              onClick={() => (
                updateuserstatus(row.username, accounttype, false),
                sendRejection(),
                onDelete(row.username)
              )}
            >
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
      </StyledTableRow>
    </React.Fragment>
  );
}

interface ApplicantTableProps {
  type: "tourGuide" | "seller" | "advertiser";
}


export const ApplicantTable = ({ type }: ApplicantTableProps) => {
  const [order, setOrder] = useState<"asc" | "desc">("asc");
  const [orderBy, setOrderBy] = useState<keyof Applicant>("username");
  const [rows, setRows] = useState<Applicant[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);










  const { pendingdata, pendingerror, pendingloading } = GetAllPendingUsers();
  useEffect(() => {
    if (!pendingerror && !pendingloading) {
        const data = type === "tourGuide" ? pendingdata?.tourGuides : type === "seller" ? pendingdata?.sellers : pendingdata?.advertisers;
      setRows(data??[]);
    } else {
      setRows([]);
    }
  }, [pendingdata]);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleRequestSort = (property: keyof Applicant) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };
  const filteredRows = rows?.filter(
    (row) =>
      row.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      row.username.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const sortedRows = filteredRows?.sort((a, b) => {
    if (a[orderBy] < b[orderBy]) {
      return order === "asc" ? -1 : 1;
    }
    if (a[orderBy] > b[orderBy]) {
      return order === "asc" ? 1 : -1;
    }
    return 0;
  });

  const paginatedRows = sortedRows?.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );
  const handleDelete = (username: string) => {
    setRows(rows.filter((row) => row.username !== username));
  };
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
    setPage(0);
  }
  
  return (
    <div className="w-full flex items-center justify-center">
      <Paper className="w-[1100px]">
        <TableContainer component={Paper}>
          <Table aria-label="collapsible table">
            <TableHead>
              <TableCell colSpan={4}>
                <div className="justify-center flex flex-row">
                  {type === "tourGuide" ? (
                    <TourIcon sx={{ fontSize: 40 }} />
                  ) : type === "seller" ? (
                    <StoreIcon sx={{ fontSize: 40 }} />
                  ) : (
                    <CampaignIcon sx={{ fontSize: 40 }} />
                  )}
                  <p className="text-[22px] leading-[45px]">
                    {type === "tourGuide"
                      ? "Tour Guides"
                      : type === "seller"
                      ? "Sellers"
                      : "Advertisers"}
                  </p>
                </div>
              </TableCell>
            </TableHead>
            <TableHead>
              <TableRow>
                <TableCell className="w-[25%]">
                  <TableSortLabel
                    active={orderBy === "email"}
                    direction={orderBy === "email" ? order : "asc"}
                    onClick={() => handleRequestSort("email")}
                  >
                    Email
                  </TableSortLabel>
                </TableCell>
                <TableCell className="w-[25%]">
                  <TableSortLabel
                    active={orderBy === "username"}
                    direction={orderBy === "username" ? order : "asc"}
                    onClick={() => handleRequestSort("username")}
                  >
                    Username
                  </TableSortLabel>
                </TableCell>
                <TableCell className="w-[25%]">PDF Link</TableCell>
                <TableCell className="w-[25%]">
                  <TextField
                    variant="outlined"
                    size="small"
                    placeholder="Search"
                    value={searchQuery}
                    onChange={handleSearchChange}
                  />
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {paginatedRows?.map((row) => (
                  <Row
                    key={row.username}
                    row={row}
                    onDelete={handleDelete}
                    accounttype={type}
                  />
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
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </div>
  );
};
