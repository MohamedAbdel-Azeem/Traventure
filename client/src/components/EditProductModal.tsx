// EditProductModal.tsx
import React, { useState } from 'react';
import './EditProductModal.css'; // Add your styles here

interface Product {
  id: number;
  name: string;
  price: number;
  // Include any other product properties you need
}

interface EditProductModalProps {
  product: Product;
  closeModal: () => void;
  saveChanges: (updatedProduct: Product) => void;
}

const EditProductModal: React.FC<EditProductModalProps> = ({ product, closeModal, saveChanges }) => {
  const [name, setName] = useState(product.name);
  const [price, setPrice] = useState(product.price);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    saveChanges({ ...product, name, price }); // Pass the updated product
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Edit Product</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Name:
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
          </label>
          <label>
            Price:
            <input type="number" value={price} onChange={(e) => setPrice(Number(e.target.value))} required />
          </label>
          <div className="modal-actions">
            <button type="submit">Save</button>
            <button type="button" onClick={closeModal}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProductModal;
