import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import CartDrawerElements from "./CartDrawerElements";
import { Drawer } from "@mui/material";
import { useState } from "react";

export default function CartButton() {
  const [cartOpen, setCartOpen] = useState(false);

  return (
    <div>
      <button
        className="fixed bottom-6 right-6 bg-violet-600 p-3 rounded-full text-slate-100 duration-300 transform hover:scale-110"
        onClick={() => setCartOpen(true)}
      >
        <ShoppingCartIcon />
      </button>
      <Drawer anchor="right" open={cartOpen} onClose={() => setCartOpen(false)}>
        <CartDrawerElements />
      </Drawer>
    </div>
  );
}
