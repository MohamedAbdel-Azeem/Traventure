import React, { useState } from "react";
import "./ProductCard.css"; // Assuming styles are in this file
import { ACTUALProduct } from "../data/ProductData";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBackward,
  faFilter,
  faForward,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";

import { useGetAllProducts } from "../../custom_hooks/products/usegetProducts";
import { useCreateProduct } from "../../custom_hooks/products/usecreateProduct";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import {
  FormControl,
  InputAdornment,
  InputLabel,
  OutlinedInput,
} from "@mui/material";
import ImageUploader from "../PDFs&Images/ImageUploader";
import ProductCard from "../Shenawy/ProductCard";
import ShowingResponse from "../Shenawy/ShowingResponse";
import ClipLoader from "react-spinners/ClipLoader";
const itemsPerPage = 8;
interface ShopPageProps {
  type: string;
}
const ShopPage: React.FC<ShopPageProps> = ({ type }) => {
  const currentuser = location.pathname.split(`/`)[2];
  const currenttype = location.pathname.split(`/`)[1];

  const { data, loading, error } = useGetAllProducts(currenttype, currentuser);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [products, setProducts] = useState(data);
  const [responseMessage, setResponseMessage] = useState<string | null>(null);
  const [showResponse, setShowResponse] = useState(false);
  const [isSortingOptionsOpen, setIsSortingOptionsOpen] = useState(false);
  const [isRatingOptionsOpen, setIsRatingOptionsOpen] = useState(false);
  const [sortOrder, setSortOrder] = useState<string | null>(null);
  const [apiBody, setApiBody] = useState<NewProduct | null>(null);

  useCreateProduct(apiBody);
  interface NewProduct {
    name: string;
    price: number;
    description: string;
    imageUrl: File | null;
    seller?: string;
    quantity: number;
    externalseller?: string;
  }

  React.useEffect(() => {
    if (data) {
      if (currenttype.includes("tourist") || currenttype.includes("guest")) {
        const unarchivedProducts = data.filter(
          (product: ACTUALProduct) => !product.isArchived
        );
        setProducts(unarchivedProducts);
      } else {
        setProducts(data);
      }
    }
  }, [data]);

  const [minPrice, setMinPrice] = useState<number | "">("");
  const [maxPrice, setMaxPrice] = useState<number | "">("");

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1);
  };

  const handleResponseClose = () => {
    setShowResponse(false);
    setResponseMessage(null);
  };

  const handleRatingClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    setIsRatingOptionsOpen(!isRatingOptionsOpen);
  };

  const handleSortToggle = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    setIsSortingOptionsOpen(!isSortingOptionsOpen);
  };

  const handleSortOrder = (order: string) => {
    setSortOrder(order);
    setIsRatingOptionsOpen(false);
    setIsSortingOptionsOpen(false);
  };
  const calculateAverageRating = (product: ACTUALProduct): number => {
    const allRatings = product.feedback.map((fb) => parseFloat(fb.rating));
    const totalRating = allRatings.reduce((acc, rating) => acc + rating, 0);
    return allRatings.length ? totalRating / allRatings.length : 0;
  };

  const filteredProducts = products?.filter((product) => {
    const matchesSearch = product.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesPrice =
      (minPrice === "" || product.price >= minPrice) &&
      (maxPrice === "" || product.price <= maxPrice);
    return matchesSearch && matchesPrice;
  });

  const sortedProducts = (filteredProducts ?? []).sort((a, b) => {
    if (sortOrder) {
      return sortOrder === "asc"
        ? calculateAverageRating(a) - calculateAverageRating(b)
        : calculateAverageRating(b) - calculateAverageRating(a);
    }
    return 0;
  });

  const totalPages = Math.ceil(sortedProducts.length / itemsPerPage);
  const displayedProducts = sortedProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const goToPage = (page: number) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };

  const paginationDisplay = () => {
    const pageNumbers: (number | string)[] = [];
    const maxVisiblePages = 3;

    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      const leftEllipsis = currentPage > Math.floor(maxVisiblePages / 2) + 1;
      const rightEllipsis =
        currentPage < totalPages - Math.floor(maxVisiblePages / 2);

      if (!leftEllipsis && rightEllipsis) {
        for (let i = 1; i <= maxVisiblePages; i++) {
          pageNumbers.push(i);
        }
        pageNumbers.push("...");
        pageNumbers.push(totalPages);
      } else if (leftEllipsis && !rightEllipsis) {
        pageNumbers.push(1);
        pageNumbers.push("...");
        for (let i = totalPages - maxVisiblePages + 1; i <= totalPages; i++) {
          pageNumbers.push(i);
        }
      } else {
        pageNumbers.push(1);
        pageNumbers.push("...");
        for (
          let i = currentPage - Math.floor(maxVisiblePages / 2);
          i <= currentPage + Math.floor(maxVisiblePages / 2);
          i++
        ) {
          if (i > 0 && i <= totalPages) {
            pageNumbers.push(i);
          }
        }
        pageNumbers.push("...");
        pageNumbers.push(totalPages);
      }
    }

    return pageNumbers.map((number, index) => (
      <li
        key={index}
        className={
          number === "..."
            ? "ellipsis"
            : currentPage === number
            ? "active-page"
            : ""
        }
      >
        {typeof number === "number" ? (
          <a onClick={() => goToPage(number)}>{number}</a>
        ) : (
          <span>{number}</span>
        )}
      </li>
    ));
  };

  const [showFilters, setShowFilters] = useState(false);
  const handleCreate = () => {
    const newProductSeller: NewProduct = {
      name: name,
      price: price,
      description: description,
      imageUrl: image,
      seller: currentuser,
      quantity: quantity,
    };

    const newProductAdmin: NewProduct = {
      name: name,
      price: price,
      description: description,
      imageUrl: image,
      externalseller: externalseller,
      quantity: quantity,
    };
    if (type.includes("Admin")) {
      setApiBody(newProductAdmin);
    } else {
      setApiBody(newProductSeller);
    }
    setOpen(false);
  };

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(10);
  const [quantity, setQuantity] = useState(100);
  const [image, setImage] = useState<File | null>(null);
  const [externalseller, setExternalSeller] = useState("");

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 800,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };
  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <ClipLoader size={20} color={"#ffffff"} />
      </div>
    );
  }
  if (error) {
    return <div>Error</div>;
  }

  return (
    <div className="flex flex-col items-center justify-center">
      <header className="bg-gradient-to-r from-purple-500 via-blue-500 to-teal-500 py-16 min-h-[220px] w-full text-center rounded-b-3xl shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 left-0 w-32 h-32 bg-white/25 rounded-full blur-3xl opacity-40 animate-pulse"></div>
          <div className="absolute bottom-0 right-0 w-48 h-48 bg-pink-400/25 rounded-full blur-3xl opacity-50 animate-pulse"></div>
  
          {/* Title and Subtitle */}
          <h1
            className="text-5xl font-extrabold text-white relative drop-shadow-xl"
            style={{
              textShadow: "2px 2px 10px rgba(0, 0, 0, 0.7)",
            }}
          >
            The Shop
          </h1>
          <p className="mt-4 text-xl text-white/90">
            Browse through many of the available products to purchase.
          </p>
          <hr className="border-t-2 border-white/40 w-2/3 mx-auto mt-6" />  

          <div className="search-bar">
          <input
            type="text"
            placeholder="Search products by name..."
            value={searchTerm}
            onChange={handleSearchChange}
            aria-label="Search products"
          />
          {!type.includes("Tourist") ? (
            <button className="submit-button3" onClick={handleOpen}>
              Add New Product <FontAwesomeIcon icon={faPlus} />
            </button>
          ) : (
            <></>
          )}
          <div
            className="sort-container"
            onClick={() => setShowFilters(!showFilters)}
          >
            <button className="sort-button">
              Filter by Price <FontAwesomeIcon icon={faFilter} />{" "}
            </button>
            {showFilters && (
              <div className="filter-options">
                <input
                  type="number"
                  placeholder="Min Price"
                  value={minPrice === "" ? "" : minPrice}
                  onChange={(e) =>
                    setMinPrice(
                      e.target.value ? parseFloat(e.target.value) : ""
                    )
                  }
                  aria-label="Minimum Price"
                  onClick={(e) => e.stopPropagation()} // Prevent the filter from closing
                />
                <input
                  type="number"
                  placeholder="Max Price"
                  value={maxPrice === "" ? "" : maxPrice}
                  onChange={(e) =>
                    setMaxPrice(
                      e.target.value ? parseFloat(e.target.value) : ""
                    )
                  }
                  aria-label="Maximum Price"
                  onClick={(e) => e.stopPropagation()} // Prevent the filter from closing
                />
              </div>
            )}
          </div>

          <div className="sort-container">
            <button className="sort-button" onClick={handleSortToggle}>
              Sort by
            </button>
            {isSortingOptionsOpen && (
              <div className="sorting-options">
                <div className="rating-container">
                  <button onClick={handleRatingClick}>Rating</button>
                  {isRatingOptionsOpen && (
                    <div className="rating-options">
                      <button onClick={() => handleSortOrder("asc")}>
                        Ascending
                      </button>
                      <button onClick={() => handleSortOrder("desc")}>
                        Descending
                      </button>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        </header>
      <Modal open={open} onClose={handleClose}>
        <Box sx={style}>
          <Box className="grid grid-cols-2">
            <FormControl fullWidth sx={{ marginY: 1 }}>
              <InputLabel>Name</InputLabel>
              <OutlinedInput
                value={name}
                onChange={(e) => setName(e.target.value)}
                label="Name"
              />
            </FormControl>

            <FormControl fullWidth sx={{ marginY: 1 }}>
              <InputLabel>Description</InputLabel>
              <OutlinedInput
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                label="Description"
              />
            </FormControl>

            <FormControl fullWidth sx={{ marginY: 1 }}>
              <InputLabel>Price</InputLabel>
              <OutlinedInput
                type="number"
                startAdornment={
                  <InputAdornment position="start">$</InputAdornment>
                }
                value={price}
                onChange={(e) => setPrice(Number(e.target.value))}
                label="Price"
              />
            </FormControl>

            <FormControl fullWidth sx={{ marginY: 1 }}>
              <InputLabel>Quantity</InputLabel>
              <OutlinedInput
                label="Hours"
                type="number"
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
              />
            </FormControl>
            {type.includes("Admin") ? (
              <FormControl fullWidth className="col-span-2" sx={{ marginY: 1 }}>
                <InputLabel>External Seller</InputLabel>
                <OutlinedInput
                  label="ExternalSeller"
                  type="string"
                  value={externalseller}
                  onChange={(e) => {
                    setExternalSeller(e.target.value);
                  }}
                />
              </FormControl>
            ) : (
              <></>
            )}
            <FormControl fullWidth className="col-span-2" sx={{ marginY: 1 }}>
              <ImageUploader
                setSelectedImage={setImage}
                selectedImage={image}
              />
            </FormControl>

            <Button className="col-span-2" onClick={handleCreate}>
              Add
            </Button>
          </Box>
        </Box>
      </Modal>
      <div className="flex flex-col flex-1" style={{ marginTop: "64px" }}>
        
        <div className="flex flex-wrap items-center justify-center w-full gap-14">
          {sortedProducts.length > 0 ? (
            displayedProducts.length > 0 ? (
              displayedProducts.map((product) => (
                <ProductCard
                  type={type}
                  key={product._id}
                  product={product}
                  productId={product._id}
                />
              ))
            ) : (
              <p>No products found on this page.</p>
            )
          ) : (
            <p>No products match your search.</p>
          )}
        </div>

        {showResponse && responseMessage && (
          <ShowingResponse
            message={responseMessage}
            onClose={handleResponseClose}
          />
        )}

        <div className="pagination">
          <ul>
            <li className={currentPage === 1 ? "disabled" : ""}>
              <a onClick={() => goToPage(1)}>
                <FontAwesomeIcon icon={faBackward} />
              </a>
            </li>
            {paginationDisplay()}
            <li className={currentPage === totalPages ? "disabled" : ""}>
              <a onClick={() => goToPage(totalPages)}>
                <FontAwesomeIcon icon={faForward} />
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ShopPage;
