import React, { useState } from 'react';
import { Product } from './data/ProductData';
import WaitingResponse from './WaitingResponse';
import ShowingResponse from './ShowingResponse';

interface EditProductModalProps {
  product: Product;
  closeModal: () => void;
  saveChanges: (product: Product) => void;
}

const EditProductModal: React.FC<EditProductModalProps> = ({ product, closeModal, saveChanges }) => {
  const [editedProduct, setEditedProduct] = useState<Product>({ ...product });
  const [showSaveConfirm, setShowSaveConfirm] = useState(false);
  const [showCancelConfirm, setShowCancelConfirm] = useState(false);
  const [showResponse, setShowResponse] = useState(false); // State to control showing response

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    const newValue = name === 'price' ? parseFloat(value) : value;
    setEditedProduct(prevProduct => ({
      ...prevProduct,
      [name]: newValue
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowSaveConfirm(true); // Show save confirmation
  };

  const handleCancel = () => {
    setShowCancelConfirm(true); // Show cancel confirmation
  };

  const confirmSave = () => {
    saveChanges(editedProduct);   // Save the product changes
    setShowSaveConfirm(false);    // Hide save confirmation dialog
    setShowResponse(true);        // Show response message after saving
  };

  const cancelSave = () => {
    setShowSaveConfirm(false);    // Hide save confirmation dialog without saving
  };

  const confirmCancel = () => {
    closeModal();
    setShowCancelConfirm(false);  // Hide cancel confirmation and close modal
  };

  const cancelCloseModal = () => {
    setShowCancelConfirm(false);  // Hide cancel confirmation and keep modal open
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
            <label className="form-label">Image URLs (comma separated):</label>
            <input
              type="text"
              className="form-input"
              name="imageUrls"
              value={editedProduct.imageUrls.join(', ')}
              onChange={(e) => {
                const value = e.target.value.split(',').map(url => url.trim());
                setEditedProduct(prevProduct => ({
                  ...prevProduct,
                  imageUrls: value
                }));
              }}
              required
            />
          </div>
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
          </div>
          <div className="form-group">
            <button type="submit" className="submit-button">Save Changes</button>
            <button type="button" className="cancel-button" onClick={handleCancel}>Cancel</button>
          </div>
        </form>

        {/* Showing save confirmation */}
        {showSaveConfirm && (
          <WaitingResponse
            message="Are you sure you want to save these changes?"
            onConfirm={confirmSave}
            onCancel={cancelSave}
          />
        )}

        {/* Showing cancel confirmation */}
        {showCancelConfirm && (
          <WaitingResponse
            message="Are you sure you want to cancel? Your changes will not be saved."
            onConfirm={confirmCancel}
            onCancel={cancelCloseModal}
          />
        )}
      </div>

      {/* Show response only after save is confirmed */}
      {showResponse && (
        <ShowingResponse 
          message="Product changes saved successfully." 
          onClose={() => setShowResponse(false)} // Handle close action for the response message
        />
      )}
    </div>
  );
};

export default EditProductModal;
