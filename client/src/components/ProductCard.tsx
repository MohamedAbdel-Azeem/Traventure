import React, { useEffect, useState } from 'react';
import './ProductCard.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark, faChevronLeft, faChevronRight, faCartShopping, faPencil, faTrashCan } from '@fortawesome/free-solid-svg-icons';

interface Product {
    imageUrls: string[];
    title: string;
    description: string;
    price: string;
    rating: number;
    seller: string;
    reviews: string[];
}

interface ProductCardProps {
    product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
    const [showPopup, setShowPopup] = useState(false);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    const togglePopup = () => {
        setShowPopup(!showPopup);
    };

    const handleNextImage = () => {
        setCurrentImageIndex((prevIndex) =>
            prevIndex === product.imageUrls.length - 1 ? 0 : prevIndex + 1
        );
    };

    const handlePrevImage = () => {
        setCurrentImageIndex((prevIndex) =>
            prevIndex === 0 ? product.imageUrls.length - 1 : prevIndex - 1
        );
    };

    useEffect(() => {
        // Disable body scroll when popup is open
        if (showPopup) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }

        // Clean up the effect
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [showPopup]);

    const getTruncatedDescription = (description: string) => {
        return description.length > 50 ? `${description.slice(0, 50)}...` : description;
    };

    return (
        <div className="product-card">
            <div className="card-header">
                <img src={product.imageUrls[0]} alt="Product" className="product-image" />
                <div className="card-actions">
                    <button className="edit-button"><FontAwesomeIcon icon={faPencil} /></button>
                    <button className="delete-button"><FontAwesomeIcon icon={faTrashCan} /></button>
                    
                </div>
            </div>

            <div className="card-body">
                <h3 className="product-title">{product.title}</h3>
                <p className="product-description">{getTruncatedDescription(product.description)}</p>
                <div className="card-footer">
                    <span className="product-price">{product.price}</span>
                    <span className="product-rating">
                        {'★'.repeat(product.rating)}{'☆'.repeat(5 - product.rating)}
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
                <img
                    src={product.imageUrls[currentImageIndex]}
                    alt="Product"
                    className="popup-image"
                />
                <div className="carousel-buttons">
                    <button onClick={handlePrevImage} className="prev-image">
                        <FontAwesomeIcon icon={faChevronLeft} />
                    </button>
                    <button onClick={handleNextImage} className="next-image">
                        <FontAwesomeIcon icon={faChevronRight} />
                    </button>
                </div>
            </div>
            <div className="popup-flex">
                <div className="popup-description-box">
                    <h4>Description</h4>
                    <p className="popup-description">{product.description}</p>
                </div>
                <div className="popup-reviews-box">
                    <h4>Reviews</h4>
                    <div className="popup-reviews">
                        <ul>
                            {product.reviews.map((review, index) => (
                                <li key={index}>{review}</li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
            <div className="popup-bottom">
                <div>
                    <p><strong>Price:</strong> {product.price}</p>
                    <p><strong>Seller:</strong> {product.seller}</p>
                </div>
                <button className="add-to-cart-button">
                    <FontAwesomeIcon icon={faCartShopping} /> Add to Cart
                </button>
            </div>
            <button onClick={togglePopup} className="close-popup">
                <FontAwesomeIcon icon={faXmark} />
            </button>
        </div>
    </div>
)}

        </div>
    );
};

export default ProductCard;
