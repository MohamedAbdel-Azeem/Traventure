import React, { useEffect, useState } from "react";
import "./ProductCard.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faXmark,
  faCartShopping,
  faPencil,
} from "@fortawesome/free-solid-svg-icons";
import { ACTUALProduct } from "./data/ProductData";
import { Rating, TextField } from "@mui/material";
import useEditProduct from "../custom_hooks/products/useeditProduct";
import { useLocation } from "react-router-dom";
import ImageUploader from "./ImageUploader";
import ClipLoader from "react-spinners/ClipLoader";
import ArchiveIcon from "@mui/icons-material/Archive";
import UnarchiveIcon from "@mui/icons-material/Unarchive";
import { ToggleArchive } from "../custom_hooks/products/useToggleArchive";
import { useSelector } from "react-redux";
interface ProductCardProps {
  product: ACTUALProduct;
  productId: string;
  type: string;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, type }) => {
  const currentuser = useLocation().pathname.split("/")[2];
  const [showPopup, setShowPopup] = useState(false);
  const [currentProduct, setCurrentProduct] = useState<ACTUALProduct>(product);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [editedProduct, setEditedProduct] =
    useState<ACTUALProduct>(currentProduct);
  const { updateProduct, isLoading, didSucceed, error, updatedProduct } =
    useEditProduct(currentProduct, editedProduct, selectedImage);
  const togglePopup = () => {
    setShowPopup((prev) => !prev);
  };

  const exchangeRate = useSelector(
    (state: any) => state.exchangeRate.exchangeRate
  );
  const currentCurrency = useSelector(
    (state: any) => state.exchangeRate.currentCurrency
  );

  const currentImageUrl = currentProduct.imageUrl;
  useEffect(() => {
    const fetchImage = async (url: string) => {
      const response = await fetch(url);
      const blob = await response.blob();
      const file = new File([blob], "image.jpg", { type: blob.type });
      setSelectedImage(file);
    };

    if (currentImageUrl) {
      fetchImage(currentImageUrl);
    }
  }, [currentImageUrl]);

  useEffect(() => {
    // Disable body scroll when popup is open
    document.body.style.overflow = showPopup ? "hidden" : "unset";

    // Clean up the effect
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [showPopup]);

  const getTruncatedDescription = (description: string) => {
    return description.length > 50
      ? `${description.slice(0, 50)}...`
      : description;
  };

  const calculateAverageRating = (product: ACTUALProduct): number => {
    const allRatings = product.feedback.map((fb) => parseFloat(fb.rating));
    const totalRating = allRatings.reduce((acc, rating) => acc + rating, 0);
    return allRatings.length ? totalRating / allRatings.length : 0;
  };

  const averageRating = calculateAverageRating(product);

  const [isEditMode, setIsEditMode] = useState(false);

  const handleEditClick = () => {
    setIsEditMode(true);
  };

  const handleChange = () => {
    updateProduct();
    if (!isLoading && didSucceed && updatedProduct) {
      setCurrentProduct(updatedProduct);
    } else if (isLoading) {
      console.log("Loading");
    }
  };

  const handleSaveClick = () => {
    handleChange();
    setIsEditMode(false);
  };

  const handleToggleArchive = async () => {
    const newProduct = (await ToggleArchive(
      currentProduct._id
    )) as unknown as ACTUALProduct;
    if (newProduct) {
      const updatedProduct = { ...product, isArchived: newProduct.isArchived };
      setCurrentProduct(updatedProduct);
    }
  };

  const changeQuantity = (input: number) => {
    setEditedProduct((prevProduct) => ({
      ...prevProduct,
      quantity: input,
    }));
  };
  const changePrice = (input: number) => {
    setEditedProduct((prevProduct) => ({
      ...prevProduct,
      price: input,
    }));
  };
  const changeDescription = (input: string) => {
    setEditedProduct((prevProduct) => ({
      ...prevProduct,
      description: input,
    }));
  };

  const changeName = (input: string) => {
    setEditedProduct((prevProduct) => ({
      ...prevProduct,
      name: input,
    }));
  };
  const changeUrl = (input: string) => {
    setEditedProduct((prevProduct) => ({
      ...prevProduct,
      imageUrl: input,
    }));
  };

  console.log("ProductCard", currentProduct);

  return (
    <div className="product-card">
      <div className="card-header">
        {currentProduct.imageUrl ? (
          <img
            src={currentProduct.imageUrl}
            alt="Product"
            className="product-image"
          />
        ) : (
          <div className="no-image">No images</div>
        )}
      </div>
      <div className="card-body">
        <h3 className="product-title">{currentProduct.name}</h3>
        <p className="product-description">
          {getTruncatedDescription(currentProduct.description)}
        </p>

        <div className="flex flex-row justify-between items-center">
          <span className="product-price">
            {currentCurrency} {(currentProduct.price * exchangeRate).toFixed(2)}
          </span>
          <Rating
            disabled
            name="rating"
            value={averageRating}
            precision={0.1}
          />
          <button onClick={togglePopup} className="view-more-button w-[70px]">
            View more
          </button>
        </div>
      </div>

      {showPopup && (
        <div className="popup-overlay" onClick={togglePopup}>
          <div className="popup-content" onClick={(e) => e.stopPropagation()}>
            {isEditMode ? (
              <ImageUploader
                setSelectedImage={setSelectedImage}
                selectedImage={selectedImage}
              />
            ) : (
              <img
                src={currentProduct.imageUrl}
                alt="Product"
                className="popup-image"
              />
            )}
            <div className="popup-flex flex flex-col">
              {isEditMode ? (
                <TextField
                  multiline
                  maxRows="3"
                  value={editedProduct.name}
                  onChange={(e) => changeName(e.target.value)}
                  sx={{
                    "& .MuiInputBase-input": {
                      textAlign: "center",
                      padding: "3.6px",
                    },
                    width: "100%",
                    height: "24px",
                    marginBottom: "35px",
                  }}
                  label="Name"
                />
              ) : (
                <strong className="p-[5px]">{currentProduct.name}</strong>
              )}

              <div className="flex flex-row">
                <div className="popup-description-box">
                  {isEditMode ? (
                    <TextField
                      multiline
                      maxRows="3"
                      value={editedProduct.description}
                      onChange={(e) => changeDescription(e.target.value)}
                      sx={{
                        marginBottom: "18px",
                        width: "100%",
                      }}
                      label="Description"
                    />
                  ) : (
                    <>
                      <h4>Description</h4>
                      <p className="popup-description">
                        {currentProduct.description}
                      </p>
                    </>
                  )}
                </div>
                <div className="popup-reviews-box">
                  <h4>Reviews</h4>
                  <div className="popup-reviews">
                    <ul>
                      {currentProduct.feedback.map((review, index) => (
                        <li key={index}>
                          {(review.touristUsername ?? "Anonymous User") +
                            " : " +
                            review.review}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <div className="popup-bottom">
              <div className="flex flex-col">
                {isEditMode ? (
                  <TextField
                    value={editedProduct.price}
                    onChange={(e) => changePrice(Number(e.target.value))}
                    sx={{
                      width: "188px",
                      height: "24px",
                      marginBottom: "30px",
                    }}
                    size="small"
                    label="Price"
                  />
                ) : (
                  <p>
                    <strong>Price:</strong> ${currentProduct.price}
                  </p>
                )}

                <p>
                  <strong>Seller:</strong>{" "}
                  {currentProduct.externalseller
                    ? currentProduct.externalseller
                    : currentProduct.seller.username}
                </p>

                {isEditMode ? (
                  <TextField
                    value={editedProduct.quantity}
                    onChange={(e) => changeQuantity(Number(e.target.value))}
                    sx={{
                      width: "188px",
                      height: "24px",
                      marginBottom: "18px",
                    }}
                    size="small"
                    label="Quantity"
                  />
                ) : (
                  <p>
                    <strong>In stock:</strong> {currentProduct.quantity}
                  </p>
                )}
              </div>
              {type.includes("Tourist") ? (
                <button className="add-to-cart-button">
                  <FontAwesomeIcon icon={faCartShopping} /> Add to Cart
                </button>
              ) : type.includes("Admin") ||
                (type.includes("Seller") &&
                  currentProduct.seller &&
                  currentProduct.seller.username === currentuser) ? (
                <div className="flex items-center justify-center gap-4">
                  {!isLoading ? (
                    <>
                      {!isEditMode ? (
                        <button
                          title="edit"
                          onClick={() => {
                            if (!isEditMode) {
                              handleEditClick();
                            } else {
                              handleSaveClick();
                            }
                          }}
                          className="editBtn"
                        >
                          <svg height="1em" viewBox="0 0 512 512">
                            <path d="M410.3 231l11.3-11.3-33.9-33.9-62.1-62.1L291.7 89.8l-11.3 11.3-22.6 22.6L58.6 322.9c-10.4 10.4-18 23.3-22.2 37.4L1 480.7c-2.5 8.4-.2 17.5 6.1 23.7s15.3 8.5 23.7 6.1l120.3-35.4c14.1-4.2 27-11.8 37.4-22.2L387.7 253.7 410.3 231zM160 399.4l-9.1 22.7c-4 3.1-8.5 5.4-13.3 6.9L59.4 452l23-78.1c1.4-4.9 3.8-9.4 6.9-13.3l22.7-9.1v32c0 8.8 7.2 16 16 16h32zM362.7 18.7L348.3 33.2 325.7 55.8 314.3 67.1l33.9 33.9 62.1 62.1 33.9 33.9 11.3-11.3 22.6-22.6 14.5-14.5c25-25 25-65.5 0-90.5L453.3 18.7c-25-25-65.5-25-90.5 0zm-47.4 168l-144 144c-6.2 6.2-16.4 6.2-22.6 0s-6.2-16.4 0-22.6l144-144c6.2-6.2 16.4-6.2 22.6 0s6.2 16.4 0 22.6z"></path>
                          </svg>
                        </button>
                      ) : (
                        <button
                          title="edit"
                          onClick={() => {
                            if (!isEditMode) {
                              handleEditClick();
                            } else {
                              handleSaveClick();
                            }
                          }}
                          className="editBtn"
                        >
                          <svg height="1em" viewBox="0 0 512 512">
                            <path d="M410.3 231l11.3-11.3-33.9-33.9-62.1-62.1L291.7 89.8l-11.3 11.3-22.6 22.6L58.6 322.9c-10.4 10.4-18 23.3-22.2 37.4L1 480.7c-2.5 8.4-.2 17.5 6.1 23.7s15.3 8.5 23.7 6.1l120.3-35.4c14.1-4.2 27-11.8 37.4-22.2L387.7 253.7 410.3 231zM160 399.4l-9.1 22.7c-4 3.1-8.5 5.4-13.3 6.9L59.4 452l23-78.1c1.4-4.9 3.8-9.4 6.9-13.3l22.7-9.1v32c0 8.8 7.2 16 16 16h32zM362.7 18.7L348.3 33.2 325.7 55.8 314.3 67.1l33.9 33.9 62.1 62.1 33.9 33.9 11.3-11.3 22.6-22.6 14.5-14.5c25-25 25-65.5 0-90.5L453.3 18.7c-25-25-65.5-25-90.5 0zm-47.4 168l-144 144c-6.2 6.2-16.4 6.2-22.6 0s-6.2-16.4 0-22.6l144-144c6.2-6.2 16.4-6.2 22.6 0s6.2 16.4 0 22.6z"></path>
                          </svg>
                        </button>
                      )}
                    </>
                  ) : (
                    <ClipLoader color="#ffffff" loading={isLoading} size={20} />
                  )}
                  {!isEditMode && (
                    <button
                      title="toggle archive"
                      onClick={handleToggleArchive}
                    >
                      {currentProduct.isArchived ? (
                        <button title="Unarchive" className="archiveBtn">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            version="1.1"
                            viewBox="0 0 2048 2048"
                            width="512"
                            height="512"
                          >
                            <path
                              className="toshrink"
                              d="m0 0 1233 1 13 3 13 7 10 9 8 9 7 14 3 13v743l-3 13-7 14-8 10-10 8-14 7-12 3-14 1h-1183l-83-1-13-4-10-5-11-9-9-11-6-13-4-16-1-56v-74l1-604 2-14 5-12 7-11 7-8 13-9 11-5 9-2zm432 234v190h321l2-1 1-41v-147l-1-1zm-122 334-10 3-8 5-8 9-7 16-15 40-4 14v10l4 12 7 9 9 6 9 3 12 1h593l13-2 10-5 8-8 5-10 2-12-2-12-16-43-7-16-6-9-7-6-10-4-5-1h-8l-9 2-10 6-8 9-4 9-1 5v11l4 12-495 1 4-10 1-4v-9l-3-10-6-10-7-6-8-4-8-2z"
                              fill="white"
                            />
                            <path
                              className="toremainasis"
                              d="m0 0h947l15 3 12 5 12 7 12 11 9 13 6 13 3 11 1 7v297l-5-4-7-9-9-11-13-16-14-17-18-22-14-17-11-14-11-13-9-11-14-17-18-22-13-16-6-7-10-7-9-3-9-1h-709l-12 2-10 5-9 8-11 14-11 13-11 14-11 13-9 11-13 16-14 17-18 22-11 13-11 14-12 14-7 9-10 12-7 9-2 1-1-51v-225l1-23 3-14 5-12 7-11 11-12 14-10 14-6z"
                              fill="white"
                            />

                            <path
                              className="tocome"
                              d="m0 0 646 1 12 5 9 9 5 10 2 10v32l-1 1h-710l-1-1v-36l3-9 5-9 8-7 11-5z"
                              fill="white"
                            />
                            <path
                              className="tocome2"
                              d="m0 0h833l12 3 11 7 7 8 5 10 2 8v42l-1 1h-905v-45l4-11 6-9 9-8 8-4z"
                              fill="white"
                            />
                          </svg>
                        </button>
                      ) : (
                        <button title="Archive" className="archiveBtn">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            version="1.1"
                            viewBox="0 0 2048 2048"
                            width="512"
                            height="512"
                          >
                            <path
                              transform="translate(430,843)"
                              d="m0 0 1233 1 13 3 13 7 10 9 8 9 7 14 3 13v743l-3 13-7 14-8 10-10 8-14 7-12 3-14 1h-1183l-83-1-13-4-10-5-11-9-9-11-6-13-4-16-1-56v-74l1-604 2-14 5-12 7-11 7-8 13-9 11-5 9-2zm432 234v190h321l2-1 1-41v-147l-1-1zm-122 334-10 3-8 5-8 9-7 16-15 40-4 14v10l4 12 7 9 9 6 9 3 12 1h593l13-2 10-5 8-8 5-10 2-12-2-12-16-43-7-16-6-9-7-6-10-4-5-1h-8l-9 2-10 6-8 9-4 9-1 5v11l4 12-495 1 4-10 1-4v-9l-3-10-6-10-7-6-8-4-8-2z"
                              fill="white"
                            />
                            <path
                              transform="translate(551,350)"
                              d="m0 0h947l15 3 12 5 12 7 12 11 9 13 6 13 3 11 1 7v297l-5-4-7-9-9-11-13-16-14-17-18-22-14-17-11-14-11-13-9-11-14-17-18-22-13-16-6-7-10-7-9-3-9-1h-709l-12 2-10 5-9 8-11 14-11 13-11 14-11 13-9 11-13 16-14 17-18 22-11 13-11 14-12 14-7 9-10 12-7 9-2 1-1-51v-225l1-23 3-14 5-12 7-11 11-12 14-10 14-6z"
                              fill="white"
                            />
                            <path
                              className="togrow"
                              d="m0 0 646 1 12 5 9 9 5 10 2 10v32l-1 1h-710l-1-1v-36l3-9 5-9 8-7 11-5z"
                              fill="white"
                            />
                            <path
                              className="togrow2"
                              d="m0 0h833l12 3 11 7 7 8 5 10 2 8v42l-1 1h-905v-45l4-11 6-9 9-8 8-4z"
                              fill="white"
                            />
                          </svg>
                        </button>
                      )}
                    </button>
                  )}
                </div>
              ) : (
                <></>
              )}
            </div>
            <button
              title="closepopup"
              onClick={togglePopup}
              className="close-popup"
            >
              <FontAwesomeIcon icon={faXmark} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductCard;
