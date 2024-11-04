import React, { useEffect } from "react";
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
import LuggageIcon from "@mui/icons-material/Luggage";
import { styled } from "@mui/material/styles";
import BestDeleteButton from "../BestDeleteButton";
import { GetAllPendingUsers } from "../../custom_hooks/useGetPending";
import { updateuserstatus } from "../../custom_hooks/useAcceptReject";
import { IAdvertiser } from "../routes/_app/advertiser_profile/IAdvertiser";

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

function Row(props: {
  row: IAdvertiser;
  onDelete: (username: string) => void;
}) {
  const { row, onDelete } = props;

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
        <TableCell className="max-w-[2px]">
          <div className="flex flex-row">
            <button
              title="Accept"
              className="rejectBtn"
              onClick={() => (
                updateuserstatus(row.username, "advertiser", true),
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
                  y1="256"
                  x2="180"
                  y2="500"
                  stroke="white"
                  strokeWidth="80"
                />
                <line
                  x1="500"
                  y1="0"
                  x2="180"
                  y2="500"
                  stroke="white"
                  strokeWidth="80"
                />
              </svg>
            </button>
            <button
              title="Reject"
              className="rejectBtn"
              onClick={() => (
                updateuserstatus(row.username, "advertiser", false),
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


export const AdvertiserApplicants = () => {
  const [order, setOrder] = useState<"asc" | "desc">("asc");
  const [orderBy, setOrderBy] = useState<keyof IAdvertiser>("email");
  const [rows, setRows] = useState<IAdvertiser[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const {
    pendingdata,
    pendingerror,
    pendingloading
  } = GetAllPendingUsers();
useEffect(() => {
  if (!pendingerror && !pendingloading) {
    setRows(pendingdata?.advertisers || []);
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


  const handleRequestSort = (property: keyof IAdvertiser) => {
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
  }
  return (
    <div className="w-full flex items-center justify-center">
      <Paper className="w-[1100px]">
        <TableContainer component={Paper}>
          <Table aria-label="collapsible table">
            <TableHead>
              <TableCell colSpan={7}>
                <div className="justify-center flex flex-row">
                  <LuggageIcon sx={{ fontSize: 40 }} />
                  <p className="text-[22px] leading-[45px]">
                    Advertisers
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
                <TableCell className="w-[35%]">
                    PDF Link
                </TableCell>
                <TableCell className="w-[15%]"><div className="text-center">Actions</div></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {paginatedRows?.map((row) => (
                <Row key={row.username} row={row} onDelete={handleDelete}/>
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