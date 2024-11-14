import { useDispatch, useSelector } from "react-redux";
import {
  IProduct,
  addToCart,
  removeFromCart,
  incrementQuantity,
  decrementQuantity,
} from "../../redux/cartSlice";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { ACTUALProduct } from "../data/ProductData";
import { useEffect, useState } from "react";

export function ProductCartButton({ product }: { product: ACTUALProduct }) {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart) as IProduct[];

  const [addedQuantity, setAddedQuantity] = useState(0);
  const [showButtons, setShowButtons] = useState(false);

  useEffect(() => {
    const cartItem = cart.find((item) => item._id === product._id);
    setAddedQuantity(cartItem ? cartItem.quantity : 0);
    setShowButtons(Boolean(cartItem));
  }, [cart, product._id]);

  const handleAddIconPress = () => {
    if (addedQuantity === 0) {
      dispatch(addToCart(product));
    } else {
      dispatch(incrementQuantity(product._id));
    }
  };

  const handleRemoveIconPress = () => {
    if (addedQuantity === 1) {
      dispatch(removeFromCart(product._id));
    } else {
      dispatch(decrementQuantity(product._id));
    }
  };

  const disabledAddButton = product.quantity - addedQuantity === 0;

  return (
    <div className="flex flex-row-reverse items-center justify-center py-3">
      <button
        onClick={handleAddIconPress}
        className={`flex items-center justify-center text-white p-2 rounded-2xl ${
          disabledAddButton ? "bg-indigo-400" : "bg-indigo-600"
        } transition-transform duration-500 transform ${
          showButtons ? "translate-x-0" : "-translate-x-14"
        }`}
        disabled={disabledAddButton}
      >
        <AddIcon />
      </button>

      <span
        className={`mx-2 bg-indigo-100 shadow-lg rounded-2xl py-2 px-6 transition-transform duration-300 transform ${
          showButtons ? "translate-y-0 visible" : " -translate-x-4 invisible"
        }`}
      >
        {addedQuantity}
      </span>

      <button
        onClick={handleRemoveIconPress}
        className={`flex items-center justify-center bg-indigo-600 text-white p-2 rounded-2xl transition-transform duration-300 transform ${
          showButtons ? "-translate-x-0 visible" : "translate-x-2 invisible"
        }`}
      >
        <RemoveIcon />
      </button>
    </div>
  );
}
