import React, { useState } from 'react';
import { Product } from './data/ProductData';
import WaitingResponse from './WaitingResponse';
import ShowingResponse from './ShowingResponse';

interface EditProductModalProps {
  product: Product | null;
  closeModal: () => void;
  saveChanges: (product: Product) => void;
}

const EditProductModal: React.FC<EditProductModalProps> = ({ product, closeModal, saveChanges }) => {
  const [editedProduct, setEditedProduct] = useState<Product>(
    product
      ? { ...product, imageUrls: product.imageUrls || [] }
      : {
          title: '',
          description: '',
          price: 0,
          rating: 0,
          seller: '',
          reviews: [],
          imageUrls: [],
          id: 0,
          quantity: 1, // Initialize quantity
        }
  );

  const [showSaveConfirm, setShowSaveConfirm] = useState(false);
  const [showCancelConfirm, setShowCancelConfirm] = useState(false);
  const [showResponse, setShowResponse] = useState(false);
  const [newImageUrl, setNewImageUrl] = useState<string>('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    const newValue = name === 'price' || name === 'quantity' ? parseFloat(value) : value;
    setEditedProduct(prevProduct => ({
      ...prevProduct,
      [name]: newValue,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowSaveConfirm(true);
  };

  const handleCancel = () => {
    setShowCancelConfirm(true);
  };

  const confirmSave = () => {
    saveChanges(editedProduct);
    setShowSaveConfirm(false);
    setShowResponse(true);
  };

  const cancelSave = () => {
    setShowSaveConfirm(false);
  };

  const confirmCancel = () => {
    closeModal();
    setShowCancelConfirm(false);
  };

  const cancelCloseModal = () => {
    setShowCancelConfirm(false);
  };

  const deleteImageUrl = (index: number) => {
    setEditedProduct(prevProduct => ({
      ...prevProduct,
      imageUrls: prevProduct.imageUrls.filter((_, i) => i !== index),
    }));
  };

  const addImageUrl = () => {
    if (newImageUrl.trim() !== '') {
      setEditedProduct(prevProduct => ({
        ...prevProduct,
        imageUrls: [...prevProduct.imageUrls, newImageUrl.trim()],
      }));
      setNewImageUrl('');
    }
  };

  return (
    <div className="modal-backdrop">
      <div className="modal-content">
        <span className="close-button" onClick={handleCancel}>&times;</span>
        <div className="modal-header">
          <h2 className="modal-title">Edit Product</h2>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Title:</label>
            <input
              type="text"
              className="form-input"
              name="title"
              value={editedProduct.title}
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
              value={editedProduct.price.toString()}
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
              value={editedProduct.quantity.toString()} // Add quantity input
              onChange={handleChange}
              min="1" // Ensure quantity is at least 1
              required
            />
          </div>
          <div className="form-group">
            <label className="form-label">Description:</label>
            <textarea
              className="form-input"
              name="description"
              value={editedProduct.description}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Add New Image URL:</label>
            <input
              type="text"
              className="form-input"
              value={newImageUrl}
              onChange={(e) => setNewImageUrl(e.target.value)}
              placeholder="Enter new image URL"
            />
            <button type="button" className="add-image-button" onClick={addImageUrl}>
              Add Image URL
            </button>
          </div>

          <div className="form-group">
            <ul className="image-url-list">
              {editedProduct.imageUrls.map((url, index) => (
                <li key={index} className="image-url-item">
                  <span className="image-url-text">{url}</span>
                  <button type="button" className="delete-image-button" onClick={() => deleteImageUrl(index)}>
                    &times;
                  </button>
                </li>
              ))}
            </ul>
          </div>
{/* 
          <div className="form-group">
            <label className="form-label">Seller:</label>
            <input
              type="text"
              className="form-input"
              name="seller"
              value={editedProduct.seller}
              onChange={handleChange}
              required
            />
          </div> */}
          <div className="form-group">
            <button type="submit" className="submit-button2">Save Changes</button>
            <button type="button" className="cancel-button2" onClick={handleCancel}>Cancel</button>
          </div>
        </form>

        {showSaveConfirm && (
          <WaitingResponse
            message="Are you sure you want to save these changes?"
            onConfirm={confirmSave}
            onCancel={cancelSave}
          />
        )}

        {showCancelConfirm && (
          <WaitingResponse
            message="Are you sure you want to cancel? Your changes will not be saved."
            onConfirm={confirmCancel}
            onCancel={cancelCloseModal}
          />
        )}
      </div>

      {showResponse && (
        <ShowingResponse
          message="Product changes saved successfully."
          onClose={() => setShowResponse(false)}
        />
      )}
    </div>
  );
};

export default EditProductModal;
