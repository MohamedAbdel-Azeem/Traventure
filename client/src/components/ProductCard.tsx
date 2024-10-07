import React, { useEffect, useState } from 'react';
import './ProductCard.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark, faCartShopping, faPencil } from '@fortawesome/free-solid-svg-icons';
import { ACTUALProduct } from './data/ProductData';
import { TextField } from '@mui/material';
import useEditProduct from "../custom_hooks/products/useeditProduct";

interface ProductCardProps {
    product: ACTUALProduct;
    productId: string;
    type:string;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, type }) => {
    const [showPopup, setShowPopup] = useState(false);
    const [currentProduct, setCurrentProduct] = useState<ACTUALProduct>(product);
    const [editedProduct, setEditedProduct] = useState<ACTUALProduct>(currentProduct);

    const togglePopup = () => {
        setShowPopup(prev => !prev);
    };


    useEffect(() => {
        // Disable body scroll when popup is open
        document.body.style.overflow = showPopup ? 'hidden' : 'unset';
        
        // Clean up the effect
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [showPopup]);

    const getTruncatedDescription = (description: string) => {
        return description.length > 50 ? `${description.slice(0, 50)}...` : description;
    };

    const calculateAverageRating = (product: ACTUALProduct): number => {
        const allRatings = product.feedback.map(fb => parseFloat(fb.rating));
        const totalRating = allRatings.reduce((acc, rating) => acc + rating, 0);
        return allRatings.length ? totalRating / allRatings.length : 0;
      };
    
      const averageRating = calculateAverageRating(product);
      const [isEditMode, setIsEditMode] = useState(false);
    const [apiBody, setApiBody] = useState<ACTUALProduct | null>(currentProduct);
      const handleEditClick = () => {
        setIsEditMode(true);
      };
    
      const handleChange = () => {
        setCurrentProduct(editedProduct);
        setApiBody(editedProduct);
    };

    useEditProduct(currentProduct._id,apiBody);
      const handleSaveClick = () => {
        setIsEditMode(false);
        handleChange();
      };
  
      const changeQuantity = (input : number) => {
        setEditedProduct(prevProduct => ({
            ...prevProduct,
            quantity: input,
          }));
      }    
      const changePrice = (input : number) => {
        setEditedProduct(prevProduct => ({
            ...prevProduct,
            price: input,
          }));
      }
      const changeDescription = (input : string) => {
        setEditedProduct(prevProduct => ({
            ...prevProduct,
            description: input,
          }));
      }

      const changeName = (input : string) => {
        setEditedProduct(prevProduct => ({
            ...prevProduct,
            name: input,
          }));
      }



    return (
        <div className="product-card">
            <div className="card-header">
                {currentProduct.imageUrl? (
                    <img src={currentProduct.imageUrl} alt="Product" className="product-image" />
                ) : (
                    <div className="no-image">No images</div> 
                )}
            </div>
            <div className="card-body">
                <h3 className="product-title">{currentProduct.name}</h3>
                <p className="product-description">{getTruncatedDescription(currentProduct.description)}</p>
                <div className="card-footer">
                    <span className="product-price">${currentProduct.price}</span>
                    <span className="product-rating">
                        {Array.from({ length: 5 }, (v, i) => {
                            if (i < Math.floor(averageRating)) {
                                return '★'; // Full star
                            } else if (i < averageRating) {
                                return '☆'; // Half star (if rating is decimal)
                            }
                            return '☆'; // Empty star
                        })}
                    </span>
                    <button onClick={togglePopup} className="view-more-button">
                        View more
                    </button>
                </div>
            </div>

            {showPopup && (
                <div className="popup-overlay" onClick={togglePopup}>
                    <div className="popup-content" onClick={(e) => e.stopPropagation()}>
                        <div className="carousel">
                            {currentProduct.imageUrl? (
                                <>
                                    <img
                                        src={currentProduct.imageUrl}
                                        alt="Product"
                                        className="popup-image"
                                    />
                                </>
                            ) : (
                                <div className="no-image">No images</div>
                            )}
                        </div>
                        <div className="popup-flex flex flex-col">
                                {isEditMode?<TextField
                                    multiline
                                    maxRows="3"
                                    value={editedProduct.name}
                                    onChange={(e) => 
                                    changeName(e.target.value)}  sx={{'& .MuiInputBase-input': {
                                        textAlign: 'center',
                                        padding: '3.6px',
                                    }, width: '100%', height: '24px', marginBottom: '35px' }}  label="Name"/>:<strong className="p-[5px]">{currentProduct.name}</strong>}
                                    
                            <div className="flex flex-row">
                            <div className="popup-description-box">
                                {isEditMode?<TextField
                                    multiline
                                    maxRows="3"
                                    value={editedProduct.description}
                                    onChange={(e) => 
                                    changeDescription(e.target.value)}  sx={{
                                         marginBottom: '18px', width:'100%' }}  label="Description"/>:<>
                                    <h4>Description</h4><p className="popup-description">{currentProduct.description}</p></>}
                            </div>
                            <div className="popup-reviews-box">
                                <h4>Reviews</h4>
                                <div className="popup-reviews">
                                    <ul>
                                        {currentProduct.feedback.map((review, index) => (
                                            <li key={index}>{review.name + ":" + review.review}</li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                            </div>
                        </div>
                        <div className="popup-bottom">
                            <div className="flex flex-col">
                                {isEditMode?<TextField
                                    value={editedProduct.price}
                                    onChange={(e) => 
                                    changePrice(Number(e.target.value))}  sx={{ width: '188px', height: '24px', marginBottom: '30px' }} size="small" label="Price"/>
                                :<p><strong>Price:</strong> ${currentProduct.price}</p>}
                                
                               <p><strong>Seller:</strong> {
                               currentProduct.externalseller?currentProduct.externalseller:currentProduct.seller.name
                               }</p>
                                
                                {isEditMode?<TextField 
                                    value={editedProduct.quantity}
                                    onChange={(e) => 
                                    changeQuantity(Number(e.target.value))} 
                                    sx={{ width: '188px', height: '24px', marginBottom: '18px' }} size="small" label="Quantity"/>
                                :<p><strong>In stock:</strong> {currentProduct.quantity}</p>}
                            </div>
                            {type.includes("Tourist")?
                            <button className="add-to-cart-button">
                                <FontAwesomeIcon icon={faCartShopping} /> Add to Cart
                            </button>:
                    <button title="edit" onClick={() => {
                        if (!isEditMode) { handleEditClick(); }
                         else { handleSaveClick(); }}} className="editBtn mr-[50px]">
                    <svg height="1em" viewBox="0 0 512 512">
                        <path
                        d="M410.3 231l11.3-11.3-33.9-33.9-62.1-62.1L291.7 89.8l-11.3 11.3-22.6 22.6L58.6 322.9c-10.4 10.4-18 23.3-22.2 37.4L1 480.7c-2.5 8.4-.2 17.5 6.1 23.7s15.3 8.5 23.7 6.1l120.3-35.4c14.1-4.2 27-11.8 37.4-22.2L387.7 253.7 410.3 231zM160 399.4l-9.1 22.7c-4 3.1-8.5 5.4-13.3 6.9L59.4 452l23-78.1c1.4-4.9 3.8-9.4 6.9-13.3l22.7-9.1v32c0 8.8 7.2 16 16 16h32zM362.7 18.7L348.3 33.2 325.7 55.8 314.3 67.1l33.9 33.9 62.1 62.1 33.9 33.9 11.3-11.3 22.6-22.6 14.5-14.5c25-25 25-65.5 0-90.5L453.3 18.7c-25-25-65.5-25-90.5 0zm-47.4 168l-144 144c-6.2 6.2-16.4 6.2-22.6 0s-6.2-16.4 0-22.6l144-144c6.2-6.2 16.4-6.2 22.6 0s6.2 16.4 0 22.6z"
                        ></path>
                    </svg>
                    </button>}
                        </div>
                        <button title="closepopup" onClick={togglePopup} className="close-popup">
                            <FontAwesomeIcon icon={faXmark} />
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProductCard;
