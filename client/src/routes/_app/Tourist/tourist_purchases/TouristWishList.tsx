import { useParams } from "react-router-dom";
import { useGetAllProducts } from "../../../../custom_hooks/products/usegetProducts";
import ClipLoader from "react-spinners/ClipLoader";
import ProductCard from "../../../../components/Shenawy/ProductCard";
import { useEffect, useState } from "react";
import { ACTUALProduct } from "../../../../components/data/ProductData";

export function TouristWishList() {
  const { username } = useParams();
  const { data, loading, error } = useGetAllProducts("tourist", username ?? "");

  const [wishListedProducts, setWishListedProducts] = useState<ACTUALProduct[]>(
    []
  );

  useEffect(() => {
    setWishListedProducts(
      data?.filter((product) => product.isWishListed) ?? []
    );
  }, [data]);

  if (loading)
    return <ClipLoader color="#B72B2B" loading={loading} size={50} />;

  if (error) return <h1>Error: Couldn't load page</h1>;

  if (!username) return <h1>Error: No username provided</h1>;

  if (!data) return <h1>Error: No data found</h1>;

  return (
    <div className="w-full h-full bg-slate-100 flex flex-col p-10">
      <h1 className="text-3xl font-medium">My WishList</h1>
      <div className="flex flex-wrap items-start justify-center gap-10 pt-6">
        {wishListedProducts.length > 0 &&
          wishListedProducts.map((product) => (
            <ProductCard
              key={product._id}
              product={product}
              productId={product._id}
              type="Tourist"
            />
          ))}
        {wishListedProducts.length === 0 && (
          <h1 className="text-2xl font-medium">
            You haven't wishlisted any products yet
          </h1>
        )}
      </div>
    </div>
  );
}
