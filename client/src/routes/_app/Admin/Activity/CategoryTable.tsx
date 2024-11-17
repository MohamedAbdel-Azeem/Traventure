import React, { useState } from "react";
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
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { styled } from "@mui/material/styles";
import LuggageIcon from "@mui/icons-material/Luggage";
import {
  useGetAllCategories,
  deleteCategories,
  useAddCategory,
  useUpdateCategory,
} from "../../../../custom_hooks/categoryandTagCRUD";
import BestDeleteButton from "../../../../components/Buttons/BestDeleteButton";
import EditButton from "../../../../components/Buttons/EditButton";

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

function Row(props: {
  row: string;
  onDelete: (name: string) => void;
  updateSingleRow: (name: string, newName: string) => void;
}) {
  const { row, onDelete } = props;
  const [isEditable, setIsEditable] = useState(false);
  const [newName, setNewName] = useState(row);

  function handleSave(oldname: string, newName: string) {
    props.updateSingleRow(oldname, newName);
    setIsEditable(false);
  }

  return (
    <React.Fragment>
      <StyledTableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell
          className="max-w-[2px] break-words"
          component="th"
          scope="row"
        >
          {!isEditable ? (
            row
          ) : (
            <TextField
              variant="outlined"
              size="small"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
            />
          )}
        </TableCell>
        <TableCell className="max-w-[2px] break-words">
          <div className="flex items-center justify-center">
            {!isEditable ? (
              <EditButton onClick={() => setIsEditable(true)} />
            ) : (
              <Button onClick={() => handleSave(row, newName)}>Save</Button>
            )}

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

export default function CategoryTable() {
  const { data } = useGetAllCategories();
  const [open, setOpen] = useState(false);
  const [newName, setNewName] = useState("");
  const [rows, setRows] = useState(data);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [searchQuery, setSearchQuery] = useState("");
  const [order, setOrder] = useState<"asc" | "desc">("asc");
  const [orderBy, setOrderBy] = useState("name");

  React.useEffect(() => {
    if (data) {
      setRows(data);
    }
  }, [data]);

  function updatesingleRow(oldrowname: string, newrowname: string) {
    const newRows = rows.map((row) => {
      if (row === oldrowname) {
        return newrowname;
      }
      return row;
    });
    setRows(newRows);
    setoUapiBody(oldrowname);
    const body = { name: newrowname };
    setUapiBody(body);
  }

  const handleAdd = () => {
    setRows([...rows, newName]);
    setNewName("");
    handleClose();
    const body = { name: newName };
    setApiBody(body);
  };

  const handleDelete = (name: string) => {
    if (
      window.confirm(`Are you sure you want to delete this category ${name}?`)
    ) {
      deleteCategories(name);
      setRows(rows.filter((row) => row !== name));
    }
  };

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
    setSearchQuery(event.target.value);
    setPage(0);
  };

  const filteredRows = rows.filter((row) =>
    row.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleRequestSort = (property: string) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const sortedRows = filteredRows.sort((a, b) => {
    if (a < b) {
      return order === "asc" ? -1 : 1;
    }
    if (a > b) {
      return order === "asc" ? 1 : -1;
    }
    return 0;
  });

  const handleClose = () => {
    setOpen(false);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const paginatedRows = sortedRows.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  const [apiBody, setApiBody] = useState({});
  const [uapiBody, setUapiBody] = useState({});
  const [ouapiBody, setoUapiBody] = useState("");

  const { adata, aloading, aerror } = useAddCategory(apiBody);
  const { udata, uloading, uerror } = useUpdateCategory(ouapiBody, uapiBody);

  return (
    <div className="w-full flex items-center justify-center my-8">
      <Paper className="w-[1100px]">
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>{"Add New Category"}</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Please enter the name of the new category.
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
                  <LuggageIcon sx={{ fontSize: 40 }} className="ml-auto" />
                  <p className="text-[22px] leading-[45px] mr-auto ">
                    Categories
                  </p>
                  <Button
                    onClick={handleClickOpen}
                    sx={{
                      fontSize: "16px",
                      position: "absolute",
                      top: 6,
                      right: -10,
                      zIndex: 10,
                    }}
                    variant="outlined"
                    color="inherit"
                    size="small"
                    startIcon={<AddIcon />}
                  >
                    {"Add Category"}
                  </Button>
                </div>
              </TableCell>
            </TableHead>
            <TableHead>
              <StyledTableRow>
                <TableCell className="w-[75%]">
                  <TableSortLabel
                    active={orderBy === "name"}
                    direction={orderBy === "name" ? order : "asc"}
                    onClick={() => handleRequestSort("name")}
                  >
                    Name
                  </TableSortLabel>
                </TableCell>
                <TableCell className="w-[25%]">
                  <TextField
                    variant="outlined"
                    size="small"
                    placeholder="Search"
                    value={searchQuery}
                    onChange={handleSearchChange}
                  />
                </TableCell>
              </StyledTableRow>
            </TableHead>
            <TableBody>
              {paginatedRows.map((row) => (
                <Row
                  key={row}
                  row={row}
                  onDelete={handleDelete}
                  updateSingleRow={updatesingleRow}
                />
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
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </div>
  );
}
