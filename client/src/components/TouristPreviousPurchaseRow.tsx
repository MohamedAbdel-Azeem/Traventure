import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import { styled } from "@mui/material/styles";
import { TableRow } from "@mui/material";
import { useState } from "react";
import { Feedback } from "./purchases/FeedBack";
import { useLocation, useParams } from "react-router-dom";
import { get } from "react-hook-form";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 16,
  },
}));
interface IFeedback {
  rating: number | null;
  review: string | null;
  touristId: {
    username: string;
  };
}
interface IProduct {
  _id: string;
  name: string;
  imageUrl: string;
  price: number;
  feedback: IFeedback[];
}

interface ICartElement {
  quantity: number;
  productId: IProduct;
}

interface IPurchase {
  _id: string;
  timeStamp: Date;
  cart: ICartElement[];
}

export function TouristPreviousPurchaseRow(purchase: IPurchase) {
  const [isExpanded, setIsExpanded] = useState(false);

  const { username } = useParams();
  const currentuser = useLocation().pathname.split("/")[2];
  const getUserFeedback = (product: any, username: string | undefined) => {
    const feedback = product.feedback.find(
      (fb: { touristId: { username: string } }) =>
        fb.touristId.username === username
    );
    return (
      feedback || {
        touristId: null,
        rating: null,
        review: null,
        touristUsername: null,
      }
    );
  };

  return (
    <>
      <TableRow key={purchase._id}>
        <StyledTableCell>
          <ArrowDropDownIcon
            style={{ verticalAlign: "middle", transition: "transform 0.7s" }}
            className={`hover:cursor-pointer ${
              isExpanded ? "rotate-180" : "rotate-0"
            }`}
            onClick={() => setIsExpanded(!isExpanded)}
          />
        </StyledTableCell>
        <StyledTableCell>{purchase._id}</StyledTableCell>
        <StyledTableCell>
          {purchase.timeStamp.toString().split("T")[0]}
        </StyledTableCell>
        <StyledTableCell>{calculateTotal(purchase.cart)}</StyledTableCell>
      </TableRow>
      {isExpanded && (
        <TableRow>
          <StyledTableCell colSpan={4} className="bg-blue-400">
            <TableContainer
              component={Paper}
              style={{
                padding: "16px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: "16px",
              }}
            >
              {purchase.cart.map((item) => (
                <TableRow
                  key={item.productId._id}
                  style={{
                    textAlign: "center",
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-evenly",
                    gap: "16px",
                    width: "100%",
                  }}
                >
                  <StyledTableCell style={{ borderBottom: "none" }}>
                    <img
                      src={item.productId.imageUrl}
                      alt={item.productId.name}
                      style={{ width: "70px" }}
                    />
                  </StyledTableCell>
                  <StyledTableCell style={{ borderBottom: "none" }}>
                    {item.productId.name}
                  </StyledTableCell>
                  <StyledTableCell style={{ borderBottom: "none" }}>
                    {item.productId.price + " x " + item.quantity}
                  </StyledTableCell>
                  <StyledTableCell style={{ borderBottom: "none" }}>
                    {item.productId.price * item.quantity}
                  </StyledTableCell>
                  <StyledTableCell style={{ borderBottom: "none" }}>
                    <Feedback
                      touristFeedback={getUserFeedback(
                        item.productId,
                        username
                      )}
                      type="product"
                      id={item.productId._id}
                      touristUsername={currentuser}
                    />
                  </StyledTableCell>
                </TableRow>
              ))}
            </TableContainer>
          </StyledTableCell>
        </TableRow>
      )}
    </>
  );
}

function calculateTotal(cart: ICartElement[]) {
  return cart.reduce((acc, curr) => {
    return acc + curr.productId.price * curr.quantity;
  }, 0);
}
