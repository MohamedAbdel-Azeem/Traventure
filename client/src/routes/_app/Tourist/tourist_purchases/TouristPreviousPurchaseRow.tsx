import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import { styled } from "@mui/material/styles";
import { TableRow } from "@mui/material";
import { useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { get } from "react-hook-form";
import { Feedback } from "../../../../components/purchases/FeedBack";
import axios from "axios";
import Swal from "sweetalert2";

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
  status: string;
}

export function TouristPreviousPurchaseRow(_purchase: IPurchase) {
  const [isExpanded, setIsExpanded] = useState(false);

  const [purchase, setPurchase] = useState<IPurchase>(_purchase);
  const [cancelLoading, setCancelLoading] = useState(false);

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

  const cancelProduct = async (purchaseId: string) => {
    try {
      setCancelLoading(true);
      const response = await axios.post(`/traventure/api/purchase/cancel`, {
        purchaseId: purchaseId,
      });
      if (response.status === 200) {
        setPurchase({ ...purchase, status: "cancelled" });
      }
      Swal.fire({
        icon: "success",
        title: "Order Cancelled",
        text: "Your order has been cancelled successfully.",
      });
    } catch {
      Swal.fire({
        icon: "error",
        title: "Cancellation Failed",
        text: "There was an error cancelling your order. Please try again later.",
      });
    } finally {
      setCancelLoading(false);
    }
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
        <StyledTableCell>
          <div
            style={{ display: "flex", justifyContent: "center" }}
            title={purchase.status}
          >
            <div
              className={`w-4 h-4 rounded-full ${
                purchase.status === "delivered"
                  ? "bg-green-500"
                  : purchase.status === "processing"
                  ? "bg-yellow-500"
                  : "bg-red-500"
              }`}
            ></div>
          </div>
        </StyledTableCell>
        <StyledTableCell>
          {purchase.status === "processing" && (
            <button
              className="rounded-lg bg-red-600 text-slate-50 px-4 py-2"
              onClick={() => cancelProduct(purchase._id)}
              disabled={cancelLoading}
            >
              {cancelLoading ? "Cancelling..." : "Cancel order"}
            </button>
          )}
        </StyledTableCell>
      </TableRow>
      {isExpanded && (
        <TableRow>
          <StyledTableCell colSpan={6} className="bg-blue-400">
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
                    {purchase.status === "delivered" && (
                      <Feedback
                        touristFeedback={getUserFeedback(
                          item.productId,
                          username
                        )}
                        type="product"
                        id={item.productId._id}
                        touristUsername={currentuser}
                      />
                    )}
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
