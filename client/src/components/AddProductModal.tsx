import React, { useState } from 'react';
import { ProductData } from './data/ProductData'; // Adjust the path as necessary

const generateProductId = () => {
    let maxId = 0;

    ProductData.forEach(product => {
        if (product.id > maxId) {
            maxId = product.id;
        }
    });

    return maxId + 1;
};

interface AddProductModalProps {
    closeModal: () => void;
    addProduct: (product: any) => void;
}

const AddProductModal: React.FC<AddProductModalProps> = ({ closeModal, addProduct }) => {
    const initialProduct = {
        title: '',
        description: '',
        price: '',
        quantity: 1, // Default quantity is set to 1
        rating: 0, // Default rating is set to 0 stars
        seller: '',
        imageUrls: [''], // Start with one empty image URL
    };

    const [newProduct, setNewProduct] = useState(initialProduct);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setNewProduct(prevProduct => ({
            ...prevProduct,
            [name]: value
        }));
    };

    const handleImageChange = (index: number, value: string) => {
        const updatedImageUrls = [...newProduct.imageUrls];
        updatedImageUrls[index] = value;
        setNewProduct(prevProduct => ({
            ...prevProduct,
            imageUrls: updatedImageUrls
        }));
    };

    const addImageField = () => {
        setNewProduct(prevProduct => ({
            ...prevProduct,
            imageUrls: [...prevProduct.imageUrls, ''] // Add an empty string for a new image URL
        }));
    };

    const removeImageField = (index: number) => {
        const updatedImageUrls = newProduct.imageUrls.filter((_, i) => i !== index);
        setNewProduct(prevProduct => ({
            ...prevProduct,
            imageUrls: updatedImageUrls
        }));
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const hasEmptyImageUrl = newProduct.imageUrls.some(url => url.trim() === '');

        if (hasEmptyImageUrl) {
            alert('Please fill in all image URLs before submitting.');
            return;
        }

        if (window.confirm('Are you sure you want to add this product?')) {
            const productData = {
                ...newProduct,
                id: generateProductId(),
                reviews: [] // Initialize with an empty array for reviews
            };
            addProduct(productData);
            closeModal();
        }
    };

    const handleCancel = () => {
        if (window.confirm('Are you sure you want to cancel? Your changes will not be saved.')) {
            closeModal();
        }
    };

    return (
        <div className="modal-backdrop">
            <div className="modal-content">
                <span className="close-button" onClick={handleCancel}>&times;</span>
                <div className="modal-header">
                    <h2 className="modal-title">Add Product</h2>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label className="form-label">Title:</label>
                        <input
                            type="text"
                            className="form-input"
                            name="title"
                            value={newProduct.title}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label className="form-label">Description:</label>
                        <textarea
                            className="form-input"
                            name="description"
                            value={newProduct.description}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label className="form-label">Price:</label>
                        <input
                            type="number"
                            className="form-input"
                            name="price"
                            value={newProduct.price}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label className="form-label">Quantity:</label>
                        <input
                            type="number"
                            className="form-input"
                            name="quantity"
                            value={newProduct.quantity}
                            onChange={handleChange}
                            min="1" // Minimum quantity is 1
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label className="form-label">Seller:</label>
                        <input
                            type="text"
                            className="form-input"
                            name="seller"
                            value={newProduct.seller}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    {newProduct.imageUrls.map((url, index) => (
                        <div key={index} className="form-group">
                            <label className="form-label">Image URL {index + 1}:</label>
                            <input
                                type="text"
                                className="form-input"
                                value={url}
                                onChange={(e) => handleImageChange(index, e.target.value)}
                                required
                            />
                            {newProduct.imageUrls.length > 1 && (
                                <button type="button" onClick={() => removeImageField(index)}>Remove</button>
                            )}
                        </div>
                    ))}
                    <button type="button" onClick={addImageField}>Add More Images</button>

                    <div className="form-group">
                        <button type="submit" className="submit-button">Add Product</button>
                        <button type="button" className="cancel-button" onClick={handleCancel}>Cancel</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddProductModal;
