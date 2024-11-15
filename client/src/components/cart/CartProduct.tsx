import React from "react";
import { IProduct } from "../../redux/cartSlice";
import { ProductCartButton } from "../Shop/ProductCartButton";
import { useSelector } from "react-redux";

interface CartProductProps {
  product: IProduct;
}

const CartProduct: React.FC<CartProductProps> = ({ product }) => {
  const exchangeRate = useSelector(
    (state: any) => state.exchangeRate.exchangeRate
  );
  const currentCurrency = useSelector(
    (state: any) => state.exchangeRate.currentCurrency
  );

  return (
    <div className="flex flex-col items-center justify-start bg-slate-200 w-80 h-72 rounded-lg shadow-sm">
      <img
        src={product.imageUrl}
        alt={product.name}
        className="w-full h-28 mb-4"
      />
      <h2 className="text-2xl font-medium -mt-2">{product.name}</h2>

      <p className="text-lg">
        {currentCurrency} {product.price * exchangeRate}
      </p>
      <div className="-mt-3">
        <ProductCartButton product={product} />
      </div>
      <p className="text-lg">
        Total: {currentCurrency} {product.price * exchangeRate * product.quantity}
      </p>
    </div>
  );
};

export { CartProduct };
