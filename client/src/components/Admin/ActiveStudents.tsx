import React, { useState } from 'react';
import './Table.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleUp, faChevronDown, faEdit, faBackward, faForward, faPlus } from '@fortawesome/free-solid-svg-icons';
import maleStudentImage from '../../assets/male-icon.png';
import femaleStudentImage from '../../assets/female-icon.png';
import { AccountData } from '../data/RegisteredUsers'; // Adjust the path according to your file structure
import CollapsibleTable from "./ImprovedTable"

const ActiveStudents = () => {
    const [expandedUser, setExpandedUser] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [students, setStudents] = useState(AccountData);
    const [deleteConfirmation, setDeleteConfirmation] = useState(null); // State for delete confirmation
   const [sortConfig, setSortConfig] = useState({ key: 'Username', direction: 'ascending' }); // State for sorting
    const itemsPerPage = 5;

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const goToFirstPage = () => setCurrentPage(1);
    const goToLastPage = () => setCurrentPage(Math.ceil(sortedStudents.length / itemsPerPage));


    const toggleExpand = (userId) => {
        if (expandedUser === userId) {
            setExpandedUser(null);
        } else {
            setExpandedUser(userId);
        }
    };

    const showDeleteConfirmation = (userId) => {
        const confirmDelete = window.confirm(`Are you sure you want to delete student with ID: ${userId}?`);
        if (confirmDelete) {
            setDeleteConfirmation(userId);
            handleDelete(userId);
        }
    };

    const handleDelete = (userId) => {
        const updatedStudents = students.filter(user => user.Username !== userId);
        setStudents(updatedStudents);
        window.alert(`Student with ID: ${userId} has been deleted successfully!`);
        setDeleteConfirmation(null); // Reset delete confirmation Status after deletion
    };

    // Sorting function
    const handleSort = (key) => {
        let direction = 'ascending';
        if (sortConfig.key === key && sortConfig.direction === 'ascending') {
            direction = 'descending';
        }
        setSortConfig({ key, direction });
    };

    const sortedStudents = [...students].sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
            return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
            return sortConfig.direction === 'ascending' ? 1 : -1;
        }
        return 0;
    });



    // Pagination logic
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentStudents = sortedStudents.slice(indexOfFirstItem, indexOfLastItem);

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
        setCurrentPage(1); // Reset to first page when search term changes
    };

    const paginationDisplay = () => {
        const totalPages = Math.ceil(sortedStudents.length / itemsPerPage);
        const pageNumbers = [];
        const maxVisiblePages = 3; // Maximum number of pages to display

        if (totalPages <= maxVisiblePages) {
            // If total pages is less than or equal to max visible pages, display all pages
            for (let i = 1; i <= totalPages; i++) {
                pageNumbers.push(i);
            }
        } else {
            // If more than max visible pages, decide which pages to display
            const leftEllipsis = currentPage > Math.floor(maxVisiblePages / 2) + 1;
            const rightEllipsis = currentPage < totalPages - Math.floor(maxVisiblePages / 2);

            if (!leftEllipsis && rightEllipsis) {
                // Display pages from 1 to maxVisiblePages
                for (let i = 1; i <= maxVisiblePages; i++) {
                    pageNumbers.push(i);
                }
                pageNumbers.push('...');
                pageNumbers.push(totalPages);
            } else if (leftEllipsis && !rightEllipsis) {
                pageNumbers.push(1);
                pageNumbers.push('...');
                // Display last maxVisiblePages pages
                for (let i = totalPages - maxVisiblePages + 1; i <= totalPages; i++) {
                    pageNumbers.push(i);
                }
            } else {
                // Display pages around the current page
                pageNumbers.push(1);
                pageNumbers.push('...');
                for (let i = currentPage - Math.floor(maxVisiblePages / 2); i <= currentPage + Math.floor(maxVisiblePages / 2); i++) {
                    pageNumbers.push(i);
                }
                pageNumbers.push('...');
                pageNumbers.push(totalPages);
            }
        }

        return pageNumbers.map((pageNumber, index) => (
            <li key={index} className={pageNumber === '...' ? 'ellipsis' : (currentPage === pageNumber ? 'active-page' : '')}>
                {pageNumber === '...' ?
                    <span>...</span> :
                    <a onClick={() => paginate(pageNumber)}>{pageNumber}</a>
                }
            </li>
        ));
    };

    // Function to open edit modal
    const openEditModal = (user) => {
        setSelectedUser(user);
        setEditModalOpen(true);
    };

    // Function to close edit modal
    const closeEditModal = () => {
        setSelectedUser(null);
        setEditModalOpen(false);
    };

    // Function to save changes after editing
    const saveChanges = (updatedUser) => {
        const updatedStudents = students.map(user => {
            if (user.Username === updatedUser.Username) {
                return updatedUser;
            }
            return user;
        });
        setStudents(updatedStudents);
        window.alert(`Changes saved successfully!`);
        closeEditModal();
    };




    // Function to close add modal
    const closeAddModal = () => {
        setAddModalOpen(false);
    };

    // Function to add a new student
    const addStudent = (newStudent) => {
        const generateUsername = (group) => {
            const prefix = group.substring(0, 2).toUpperCase();
            const similarUsers = students.filter(user => user.Username.startsWith(prefix));
            const newId = similarUsers.length + 1;
            return `${prefix}${newId.toString().padStart(3, '0')}`;
        };

        const generatePassword = () => {
            const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
            let password = '';
            for (let i = 0; i < 5; i++) {
                password += chars.charAt(Math.floor(Math.random() * chars.length));
            }
            return password;
        };

        const newStudentWithIdAndPassword = {
            ...newStudent,
            Username: generateUsername(newStudent.Group),
            password: generatePassword(),
        };

        setStudents([...students, newStudentWithIdAndPassword]);
        window.alert(`Student ${newStudentWithIdAndPassword.Username} has been added successfully!`);
        closeAddModal();
    };

    return (
        <CollapsibleTable></CollapsibleTable>
    );
}

export default ActiveStudents;
