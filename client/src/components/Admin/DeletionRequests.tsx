import React, { useEffect, useState } from "react";
import {
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
import HowToVoteIcon from "@mui/icons-material/HowToVote";
import { useLocation } from "react-router-dom";
import {
  useDeleteDeleteRequest,
  useGetAllDeleteRequests,
} from "../../custom_hooks/deleterequest/deleterequesthooks";

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

interface DeleteRequest {
  user_id: string;
  name: string;
  type: string;
  wallet: number;
}

interface RowProps {
  row: DeleteRequest;
  onDelete: (username: string) => void;
}

function Row({ row, onDelete }: RowProps) {
  const currenttype = useLocation().pathname.split("/")[1];
  const { deleteDeleteRequest } = useDeleteDeleteRequest();

  return (
    <React.Fragment>
      <StyledTableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell className="max-w-[2px] break-words">{row.name}</TableCell>
        <TableCell className="max-w-[2px] break-words">{row.type}</TableCell>
        <TableCell className="max-w-[2px] break-words">{row.wallet}</TableCell>
        {currenttype.includes("admin") ? (
          <TableCell className="max-w-[2px] break-words">
            <div className="flex flex-row w-[88%]">
              <button title="Accept" className="acceptBtn ml-auto mr-8"
              onClick={() => {deleteDeleteRequest(row.name, true); onDelete(row.name);}}>
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
  const [requests, setRequests] = useState([] as DeleteRequest[]);
   const { drequests, loading, error } = useGetAllDeleteRequests();
  useEffect(() => {
    setRequests(drequests);
  }
  , [drequests]);

  const [searchQuery, setSearchQuery] = useState("");
  const [order, setOrder] = useState<"asc" | "desc">("asc");
  const [orderBy, setOrderBy] = useState<keyof DeleteRequest>("name");
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

  const handleRequestSort = (property: keyof DeleteRequest) => {
      const isAsc = orderBy === property && order === "asc";
      setOrder(isAsc ? "desc" : "asc");
      setOrderBy(property);
  };

  const filteredRows = requests.filter((request) => {
    const matchesSearchQuery = Object.values(request).some((value) => {
      if (value !== null && value !== undefined) {
        return value
          .toString()
          .toLowerCase()
          .includes(searchQuery.toLowerCase());
      }
      return false;
    });
    return matchesSearchQuery;
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

  const handleDelete = (username: string) => {
    setRequests(requests.filter((request) => request.name !== username));
  };

  if (loading) {
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
                <TableCell className="w-[25%]">
                  <TableSortLabel
                    active={orderBy === "name"}
                    direction={orderBy === "name" ? order : "asc"}
                    onClick={() => handleRequestSort("name")}
                  >
                    Username
                  </TableSortLabel>
                </TableCell>
                <TableCell className="w-[25%]">
                  <TableSortLabel
                    active={orderBy === "type"}
                    direction={orderBy === "type" ? order : "asc"}
                    onClick={() => handleRequestSort("type")}
                  >
                    Type
                  </TableSortLabel>
                </TableCell>
                <TableCell className="w-[30%]">
                  <TableSortLabel
                    active={orderBy === "wallet"}
                    direction={orderBy === "wallet" ? order : "asc"}
                    onClick={() => handleRequestSort("wallet")}
                  >
                    Wallet
                  </TableSortLabel>
                </TableCell>
                <TableCell
                  className="w-[20%]"
                  style={{ textAlign: "center", paddingRight: "40px" }}
                >
                  Actions
                </TableCell>
              </StyledTableRow>
            </TableHead>
            <TableBody>
              <TableRow></TableRow>
              {paginatedRows.map((row) => (
                <Row key={row.name} row={row} onDelete={handleDelete} />
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
