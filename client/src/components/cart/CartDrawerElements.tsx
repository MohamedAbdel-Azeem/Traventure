import { useSelector, useDispatch } from "react-redux";
import { Icon } from "@mui/material";
import PaymentsIcon from "@mui/icons-material/Payments";
import DeleteIcon from "@mui/icons-material/Delete";
import { IProduct, removeFromCart } from "../../redux/cartSlice";
import { useState, useEffect } from "react";

export default function CartDrawerElements() {
  const cart = useSelector((state) => state.cart) as IProduct[];

  console.log(cart);

  const dispatch = useDispatch();
  const [totalPrice, setTotal] = useState(0);
  useEffect(() => {
    const newTotalPrice = cart.reduce(
      (total, product) => product.price * product.quantity + total,
      0
    );
    setTotal(newTotalPrice);
  }, [cart]);

  return (
    <div className="h-full px-16 py-4 bg-gradient-to-r from-purple-500 to-purple-700">
      {cart.length > 0 ? (
        <div className="flex flex-col justify-between h-full pb-10">
          <div className="overflow-y-auto">
            {cart.map((product) => (
              <h1>{product.name}</h1>
            ))}
          </div>
        </div>
      ) : (
        <h1 className="pt-4 text-xl font-medium">
          Cart is Empty, Add Some Products?
        </h1>
      )}
    </div>
  );
}
