import { useSelector, useDispatch } from "react-redux";
import { Icon } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import PaymentsIcon from "@mui/icons-material/Payments";
import { IProduct, removeFromCart } from "../../redux/cartSlice";
import { useState, useEffect } from "react";

export default function CartDrawerElements() {
  const cart = useSelector((state) => state.cart) as IProduct[];

  const exchangeRate = useSelector(
    (state: any) => state.exchangeRate.exchangeRate
  );
  const currentCurrency = useSelector(
    (state: any) => state.exchangeRate.currentCurrency
  );

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
    <div className="h-full px-16 py-4 bg-slate-100">
      {cart.length > 0 ? (
        <div className="flex flex-col justify-between h-full pb-10">
          <div className="overflow-y-auto">
            {cart.map((product) => (
              <h1>{product.name}</h1>
            ))}
          </div>
          <div className="flex flex-col justify-between gap-6 text-xl font-medium pt-3 border-t-2 border-gray-500">
            <div className="flex items-center justify-between w-full">
              <h1>Total Price</h1>
              <h1>
                {currentCurrency} {totalPrice * exchangeRate}
              </h1>
            </div>
            <button className="py-3 px-6 bg-indigo-700 rounded-xl text-slate-50 flex items-center justify-center">
              <PaymentsIcon className="mr-2" />
              Proceed to Checkout
            </button>
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
