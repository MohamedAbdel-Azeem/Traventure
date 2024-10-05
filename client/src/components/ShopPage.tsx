import React, { useState } from 'react';
import './ProductCard.css'; // Assuming styles are in this file
import ProductCard from './ProductCard';
import { ProductData, Product } from './data/ProductData';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBackward, faFilter, faForward, faPlus } from '@fortawesome/free-solid-svg-icons';
import ImprovedSidebar from './ImprovedSidebar';
import WaitingResponse from './WaitingResponse';
import EditProductModal from './EditProductModal';
import ShowingResponse from './ShowingResponse';

const itemsPerPage = 9;

const ProductList: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [products, setProducts] = useState(ProductData);
  const [showWarning, setShowWarning] = useState(false);
  const [productIdToDelete, setProductIdToDelete] = useState<number | null>(null);
  const [responseMessage, setResponseMessage] = useState<string | null>(null);
  const [showResponse, setShowResponse] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isNewProductModalOpen, setIsNewProductModalOpen] = useState(false);
  const [isSortingOptionsOpen, setIsSortingOptionsOpen] = useState(false);
  const [isRatingOptionsOpen, setIsRatingOptionsOpen] = useState(false);
  const [sortOrder, setSortOrder] = useState<string | null>(null);

  // New state to handle price filtering
  const [minPrice, setMinPrice] = useState<number | ''>('');
  const [maxPrice, setMaxPrice] = useState<number | ''>('');

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
      const updatedProducts = products.filter(product => product.id !== productIdToDelete);
      setProducts(updatedProducts);
      const totalPages = Math.ceil(updatedProducts.length / itemsPerPage);
      if (currentPage > totalPages && totalPages > 0) {
        setCurrentPage(totalPages);
      } else if (updatedProducts.length === 0) {
        setCurrentPage(currentPage - 1 > 0 ? currentPage - 1 : 1);
      }
      setResponseMessage(`Product with id ${productIdToDelete} deleted.`);
      setShowResponse(true);
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
    setShowResponse(true);
    closeEditModal();
  };

  const handleResponseClose = () => {
    setShowResponse(false);
    setResponseMessage(null);
  };

  const handleRatingClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation(); // Prevent the click from bubbling up
    setIsRatingOptionsOpen(!isRatingOptionsOpen);
  };

  const handleSortToggle = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation(); // Prevent the click from bubbling up
    setIsSortingOptionsOpen(!isSortingOptionsOpen);
  };

  const handleSortOrder = (order: string) => {
    setSortOrder(order);
    setIsRatingOptionsOpen(false); // Close rating options after selection
    setIsSortingOptionsOpen(false); // Close sorting options
  };

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesPrice =
      (minPrice === '' || product.price >= minPrice) &&
      (maxPrice === '' || product.price <= maxPrice);
    return matchesSearch && matchesPrice;
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortOrder) {
      return sortOrder === 'asc' ? a.rating - b.rating : b.rating - a.rating;
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

  const openNewProductModal = () => {
    setIsNewProductModalOpen(true);
  };

  const [showFilters, setShowFilters] = useState(false);


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

            <button className="submit-button3" onClick={openNewProductModal}>
          Add New Product <FontAwesomeIcon icon={faPlus} />
        </button>
        {/* Price Filter section */}
        <div className="sort-container" onClick={() => setShowFilters(!showFilters)}>
          <button className="sort-button">Filter by Price <FontAwesomeIcon icon={faFilter} /> </button>
          {showFilters && (
            <div className="filter-options">
              <input
                type="number"
                placeholder="Min Price"
                value={minPrice === '' ? '' : minPrice}
                onChange={(e) => setMinPrice(e.target.value ? parseFloat(e.target.value) : '')}
                aria-label="Minimum Price"
                onClick={(e) => e.stopPropagation()} // Prevent the filter from closing
              />
              <input
                type="number"
                placeholder="Max Price"
                value={maxPrice === '' ? '' : maxPrice}
                onChange={(e) => setMaxPrice(e.target.value ? parseFloat(e.target.value) : '')}
                aria-label="Maximum Price"
                onClick={(e) => e.stopPropagation()} // Prevent the filter from closing
              />
            </div>
          )}
        </div>



    

        {/* Sort by section */}
        <div className="sort-container">
          <button className="sort-button" onClick={handleSortToggle}>Sort by</button>
          {isSortingOptionsOpen && (
            <div className="sorting-options">
              <div className="rating-container">
                <button onClick={handleRatingClick}>Rating</button>
                {isRatingOptionsOpen && (
                  <div className="rating-options">
                    <button onClick={() => handleSortOrder('asc')}>Ascending</button>
                    <button onClick={() => handleSortOrder('desc')}>Descending</button>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

      </div>



      <div className="product-list">
        {sortedProducts.length > 0 ? (
          displayedProducts.length > 0 ? (
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

      {isNewProductModalOpen && (
        <EditProductModal
          product={null}
          closeModal={() => setIsNewProductModalOpen(false)}
          saveChanges={(newProduct) => {
            setProducts(prevProducts => [...prevProducts, newProduct]);
            setResponseMessage(`Product "${newProduct.title}" added.`);
            setShowResponse(true);
            setIsNewProductModalOpen(false);
          }}
        />
      )}
    </div>
  );
};

export default ProductList;
