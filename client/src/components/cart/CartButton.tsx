import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import CartDrawerElements from "./CartDrawerElements";
import { Drawer } from "@mui/material";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { IProduct } from "../../redux/cartSlice";
import { styled } from "@mui/material/styles";
import Badge, { BadgeProps } from "@mui/material/Badge";

const StyledBadge = styled(Badge)<BadgeProps>(({ theme }) => ({
  "& .MuiBadge-badge": {
    right: -5,
    top: -7,
    border: `2px solid`,
    padding: "0 4px",
    backgroundColor: "#de9510",
  },
}));

export default function CartButton() {
  const [cartOpen, setCartOpen] = useState(false);
  const [numberofProducts, setNumberOfProducts] = useState(0);

  const cart = useSelector((state) => state.cart) as IProduct[];

  useEffect(() => {
    const newNumberOfProducts = cart.reduce(
      (total: number, product) => total + 1,
      0
    );
    setNumberOfProducts(newNumberOfProducts);
  }, [cart]);

  return (
    <div>
      <button
        className="fixed bottom-6 right-6 bg-violet-600 p-3 rounded-full text-slate-100 duration-300 transform hover:scale-110"
        onClick={() => setCartOpen(true)}
      >
        <StyledBadge badgeContent={numberofProducts}>
          <ShoppingCartIcon style={{ color: "white" }} />
        </StyledBadge>
      </button>
      <Drawer anchor="right" open={cartOpen} onClose={() => setCartOpen(false)}>
        <CartDrawerElements />
      </Drawer>
    </div>
  );
}
