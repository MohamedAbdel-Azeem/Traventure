import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

export default function CartButton() {
  return (
    <button className="fixed bottom-6 right-6 bg-violet-600 p-3 rounded-full text-slate-100 duration-300 transform hover:scale-110">
      <ShoppingCartIcon />
    </button>
  );
}
