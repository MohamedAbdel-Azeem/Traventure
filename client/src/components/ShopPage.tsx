import React, { useState } from 'react';
import './ProductCard.css'; // Assuming styles are in this file
import ProductCard from './ProductCard';
import { ProductData } from './data/ProductData';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBackward, faForward } from '@fortawesome/free-solid-svg-icons';
import ImprovedSidebar from "./ImprovedSidebar";

const itemsPerPage = 9; // Set number of products per page to 9

const ProductList: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState(''); // New state for search term

  // Calculate total pages
  const totalPages = Math.ceil(ProductData.length / itemsPerPage);

  // Function to handle page change
  const goToPage = (page: number) => {
    if (page < 1 || page > totalPages) return; // Prevent out-of-bounds
    setCurrentPage(page);
  };

  // Function to filter products based on the search term
  const filteredProducts = ProductData.filter(product =>
    product.title.toLowerCase().includes(searchTerm.toLowerCase()) // Adjust based on your ProductData structure
  );

  // Get the products for the current page
  const displayedProducts = filteredProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Handle search input change
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1); // Reset to first page when search term changes
  };

  // Function to display pagination with ellipses
  const paginationDisplay = () => {
    const pageNumbers = [];
    const maxVisiblePages = 3; // Maximum number of pages to display

    const totalPagesFiltered = Math.ceil(filteredProducts.length / itemsPerPage);

    if (totalPagesFiltered <= maxVisiblePages) {
      for (let i = 1; i <= totalPagesFiltered; i++) {
        pageNumbers.push(i);
      }
    } else {
      const leftEllipsis = currentPage > Math.floor(maxVisiblePages / 2) + 1;
      const rightEllipsis = currentPage < totalPagesFiltered - Math.floor(maxVisiblePages / 2);

      if (!leftEllipsis && rightEllipsis) {
        for (let i = 1; i <= maxVisiblePages; i++) {
          pageNumbers.push(i);
        }
        pageNumbers.push('...');
        pageNumbers.push(totalPagesFiltered);
      } else if (leftEllipsis && !rightEllipsis) {
        pageNumbers.push(1);
        pageNumbers.push('...');
        for (let i = totalPagesFiltered - maxVisiblePages + 1; i <= totalPagesFiltered; i++) {
          pageNumbers.push(i);
        }
      } else {
        pageNumbers.push(1);
        pageNumbers.push('...');
        for (let i = currentPage - Math.floor(maxVisiblePages / 2); i <= currentPage + Math.floor(maxVisiblePages / 2); i++) {
          if (i > 0 && i <= totalPagesFiltered) {
            pageNumbers.push(i);
          }
        }
        pageNumbers.push('...');
        pageNumbers.push(totalPagesFiltered);
      }
    }

    return pageNumbers.map((number, index) => (
      <li key={index} className={number === '...' ? 'ellipsis' : (currentPage === number ? 'active-page' : '')}>
        {typeof number === 'number' ? (
          <a onClick={() => goToPage(number)}>{number}</a>
        ) : (
          <span>{number}</span> // Display ellipsis
        )}
      </li>
    ));
  };

  return (
    <div className="">
      <ImprovedSidebar title="Admin"/>
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search products by name..."
          value={searchTerm}
          onChange={handleSearchChange}
        />
      </div>

      <div className="product-list">
        {displayedProducts.map((product, index) => (
          <ProductCard key={index} product={product} />
        ))}
      </div>

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
    </div>
  );
};

export default ProductList;
