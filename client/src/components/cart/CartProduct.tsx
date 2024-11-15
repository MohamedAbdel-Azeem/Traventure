import React from "react";
import { IProduct } from "../../redux/cartSlice";
import { ProductCartButton } from "../Shop/ProductCartButton";
import { useSelector } from "react-redux";
import "./swal-container.css";

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
      <div
        className="mb-4 bg-cover bg-center"
        style={{
          backgroundImage: `url(${product.imageUrl})`,
          width: "100%",
          height: "50%",
        }}
      />
      <h2 className="text-2xl font-medium -mt-2">{product.name}</h2>

      <div className="mt-1">
        <ProductCartButton product={product} />
      </div>
      <p className="text-lg">
        Total: {currentCurrency}{" "}
        {(product.price * exchangeRate * product.quantity).toFixed(2)}
      </p>
    </div>
  );
};

export { CartProduct };
