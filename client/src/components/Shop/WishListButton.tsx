import { useState, useEffect } from "react";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import axios from "axios";
import { ACTUALProduct } from "../data/ProductData";

export function WishListButton(
  product: ACTUALProduct,
  touristUsername: string
) {
  const [isWishlisted, setIsWishlisted] = useState(product.isWishListed);
  const [loading, setLoading] = useState(false);

  console.log(product.name, " is wishlisted : ", product.isWishListed);

  const handleWishList = () => {
    setLoading(true);
    axios
      .post(`/traventure/api/tourist/wishlist/${touristUsername}`, {
        productId: product._id,
      })
      .then((res) => {
        setIsWishlisted(res.data.isAdded);
        console.log(res.data);
      })
      .catch(() => {})
      .finally(() => {
        setLoading(false);
      });
  };

  return (
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
  );
}
