import { useDispatch, useSelector } from "react-redux";
import { IProduct, addToCart, removeFromCart } from "../../redux/cartSlice";
import DeleteIcon from "@mui/icons-material/Delete";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import { ACTUALProduct } from "../data/ProductData";
import { useEffect, useState } from "react";

export function ProductCartButton({ product }: { product: ACTUALProduct }) {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart) as IProduct[];

  const [added, setAdded] = useState(false);

  useEffect(() => {
    setAdded(cart.some((item) => item._id === product._id));
  }, [cart, product._id]);

  if (added) {
    return (
      <div className="flex items-center justify-center p-3">
        <button
          className="bg-red-400 p-2 rounded-md flex items-center justify-center gap-3"
          onClick={() => dispatch(removeFromCart(product._id))}
        >
          <DeleteIcon />
          <span>Remove from Cart</span>
        </button>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center p-3">
      <button
        className="bg-[#288c08] p-2 rounded-md flex items-center justify-center gap-3"
        onClick={() => dispatch(addToCart(product))}
      >
        <AddShoppingCartIcon />
        <span>Add to Cart</span>
      </button>
    </div>
  );
}
