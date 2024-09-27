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


    return (
        <div className="w-full flex items-center justify-center">
        <div className="w-[1500px]">
            <CollapsibleTable />
        </div>
    </div>
        
    );
}

export default ActiveStudents;
