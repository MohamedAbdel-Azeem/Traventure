import { useState, useEffect } from "react";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import axios from "axios";
import { ACTUALProduct } from "../data/ProductData";
import Snackbar from "@mui/material/Snackbar";
import Slide from "@mui/material/Slide";
import Alert from "@mui/material/Alert";
import { HeartBroken } from "@mui/icons-material";

const initialSnackBarState = {
  isOpen: false,
  message: "",
  status: "",
};

export function WishListButton(
  product: ACTUALProduct,
  touristUsername: string
) {
  const [isWishlisted, setIsWishlisted] = useState(product.isWishListed);
  const [loading, setLoading] = useState(false);
  const [SnackBarState, setSnackBarState] = useState(initialSnackBarState);

  const handleWishList = () => {
    const newSnackBarState = { ...SnackBarState };
    setLoading(true);
    axios
      .post(`/traventure/api/tourist/wishlist/${touristUsername}`, {
        productId: product._id,
      })
      .then((res) => {
        setIsWishlisted(res.data.isAdded);
        newSnackBarState.message = res.data.message;
        console.log(res.data.message);
        newSnackBarState.status = "success";
      })
      .catch(() => {
        newSnackBarState.message = "An error occured, please try again later";
        newSnackBarState.status = "error";
      })
      .finally(() => {
        setLoading(false);
        newSnackBarState.isOpen = true;
        setSnackBarState(newSnackBarState);
      });
  };

  return (
    <>
      <button
        onClick={handleWishList}
        disabled={loading}
        className="cursor-pointer"
      >
        {isWishlisted ? (
          <FavoriteIcon className="transition-transform duration-300 hover:scale-125 text-red-500" />
        ) : (
          <FavoriteBorderIcon className="transition-transform duration-300 hover:scale-125" />
        )}
      </button>
      {SnackBarState.isOpen && (
        <Snackbar
          open={SnackBarState.isOpen}
          autoHideDuration={2000}
          onClose={() => setSnackBarState(initialSnackBarState)}
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        >
          <Alert
            onClose={() => setSnackBarState(initialSnackBarState)}
            severity={
              SnackBarState.status === "success"
                ? "success"
                : SnackBarState.status == "error"
                ? "error"
                : undefined
            }
            variant="filled"
            icon={
              SnackBarState.message === "Product removed from wishlist" ? (
                <HeartBroken />
              ) : SnackBarState.message === "Product added to wishlist" ? (
                <FavoriteIcon />
              ) : (
                false
              )
            }
          >
            {SnackBarState.message}
          </Alert>
        </Snackbar>
      )}
    </>
  );
}
