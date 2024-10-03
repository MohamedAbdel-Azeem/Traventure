import React, { useState } from 'react';
import './WaitingResponse.css'; // Assuming styles are in this file
import ProductCard from './ProductCard';
import { ProductData, Product } from './data/ProductData';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBackward, faForward } from '@fortawesome/free-solid-svg-icons';
import ImprovedSidebar from './ImprovedSidebar';
import WaitingResponse from './WaitingResponse';
import EditProductModal from './EditProductModal'; // Import your EditProductModal
import ShowingResponse from './ShowingResponse'; // Import your ShowingResponse component

const itemsPerPage = 9; // Set number of products per page to 9

const ProductList: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [products, setProducts] = useState(ProductData);
  const [showWarning, setShowWarning] = useState(false);
  const [productIdToDelete, setProductIdToDelete] = useState<number | null>(null);
  const [responseMessage, setResponseMessage] = useState<string | null>(null);
  const [showResponse, setShowResponse] = useState(false); // State for showing response
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1);
  };

  const handleDelete = (id: number) => {
    setShowWarning(true);
    setProductIdToDelete(id);
  };

  const handleConfirmDelete = () => {
    if (productIdToDelete !== null) {
      setProducts(prevProducts => prevProducts.filter(product => product.id !== productIdToDelete));
      setResponseMessage(`Product with id ${productIdToDelete} deleted.`); // Set response message
      setShowResponse(true); // Show response message
    }
    setShowWarning(false);
    setProductIdToDelete(null);
  };

  const handleCancelDelete = () => {
    setShowWarning(false);
    setProductIdToDelete(null);
  };

  const handleEdit = (product: Product) => {
    setSelectedProduct(product);
    setIsEditModalOpen(true);
  };

  const closeEditModal = () => {
    setIsEditModalOpen(false);
    setSelectedProduct(null);
  };

  const saveChanges = (updatedProduct: Product) => {
    setProducts(prevProducts =>
      prevProducts.map(product =>
        product.id === updatedProduct.id ? updatedProduct : product
      )
    );
    setResponseMessage(`Product with id ${updatedProduct.id} updated.`);
    setShowResponse(true); // Show response message
    closeEditModal();
  };

  const handleResponseClose = () => {
    setShowResponse(false);
    setResponseMessage(null);
  };

  const filteredProducts = products.filter(product =>
    product.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const displayedProducts = filteredProducts.slice(
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
      const rightEllipsis = currentPage < totalPages - Math.floor(maxVisiblePages / 2);

      if (!leftEllipsis && rightEllipsis) {
        for (let i = 1; i <= maxVisiblePages; i++) {
          pageNumbers.push(i);
        }
        pageNumbers.push('...');
        pageNumbers.push(totalPages);
      } else if (leftEllipsis && !rightEllipsis) {
        pageNumbers.push(1);
        pageNumbers.push('...');
        for (let i = totalPages - maxVisiblePages + 1; i <= totalPages; i++) {
          pageNumbers.push(i);
        }
      } else {
        pageNumbers.push(1);
        pageNumbers.push('...');
        for (let i = currentPage - Math.floor(maxVisiblePages / 2); i <= currentPage + Math.floor(maxVisiblePages / 2); i++) {
          if (i > 0 && i <= totalPages) {
            pageNumbers.push(i);
          }
        }
        pageNumbers.push('...');
        pageNumbers.push(totalPages);
      }
    }

    return pageNumbers.map((number, index) => (
      <li key={index} className={number === '...' ? 'ellipsis' : (currentPage === number ? 'active-page' : '')}>
        {typeof number === 'number' ? (
          <a onClick={() => goToPage(number)}>{number}</a>
        ) : (
          <span>{number}</span>
        )}
      </li>
    ));
  };

  return (
    <div className="">
      <ImprovedSidebar title="Admin" />
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search products by name..."
          value={searchTerm}
          onChange={handleSearchChange}
          aria-label="Search products"
        />
      </div>

      <div className="product-list">
        {displayedProducts.length > 0 ? (
          displayedProducts.map((product) => (
            <ProductCard 
              key={product.id}
              product={product}
              onDelete={handleDelete}
              productId={product.id}
              onEdit={handleEdit}
            />
          ))
        ) : (
          <p>No products found.</p>
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
          <li className={currentPage === 1 ? 'disabled' : ''}>
            <a onClick={() => goToPage(1)}>
              <FontAwesomeIcon icon={faBackward} />
            </a>
          </li>
          {paginationDisplay()}
          <li className={currentPage === totalPages ? 'disabled' : ''}>
            <a onClick={() => goToPage(totalPages)}>
              <FontAwesomeIcon icon={faForward} />
            </a>
          </li>
        </ul>
      </div>

      {showWarning && (
        <WaitingResponse
          message="Are you sure you want to delete this product?"
          onConfirm={handleConfirmDelete}
          onCancel={handleCancelDelete}
        />
      )}

      {isEditModalOpen && selectedProduct && (
        <EditProductModal
          product={selectedProduct}
          closeModal={closeEditModal}
          saveChanges={saveChanges}
        />
      )}
    </div>
  );
};

export default ProductList;
