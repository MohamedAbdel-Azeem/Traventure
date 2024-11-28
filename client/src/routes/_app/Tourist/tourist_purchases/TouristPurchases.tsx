import { useParams } from "react-router-dom";
import { useGetTouristPurchases } from "../../../../custom_hooks/useGetTouristPurchases";
import ClipLoader from "react-spinners/ClipLoader";
import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Table from "@mui/material/Table";
import { styled } from "@mui/material/styles";
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";
import { TouristPreviousPurchaseRow } from "./TouristPreviousPurchaseRow";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 16,
  },
}));

export function TouristPurchases() {
  const { username } = useParams();

  const { purchases, loading, error } = useGetTouristPurchases(username);

  if (loading) {
    return (
      <div className="flex item-center justify-center h-screen">
        <ClipLoader loading={loading} color="#2263A2" size={150} />
      </div>
    );
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="h-screen w-screen py-14 flex justify-center">
      <div className="w-1/2">
        <TableContainer
          component={Paper}
          className="border-2 border-black rounded-none"
        >
          <h4 className="flex justify-center items-center text-2xl pt-4 font-bold">
            My Purchases
            <ShoppingBasketIcon className="ml-4 scale-110" />
          </h4>
          <Table aria-label="simple table">
            <TableHead sx={{ backgroundColor: "#2263A2" }}>
              <TableRow>
                <StyledTableCell></StyledTableCell>
                <StyledTableCell>Purchase ID</StyledTableCell>
                <StyledTableCell>Date</StyledTableCell>
                <StyledTableCell>Total</StyledTableCell>
                <StyledTableCell sx={{ textAlign: "center" }}>
                  Status
                </StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {purchases.map((purchase) => (
                <TouristPreviousPurchaseRow {...purchase} />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
}
