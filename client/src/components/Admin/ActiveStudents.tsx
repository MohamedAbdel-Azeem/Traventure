import React, { useState } from 'react';
import './Table.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleUp, faChevronDown, faEdit, faBackward, faForward, faPlus } from '@fortawesome/free-solid-svg-icons';
import maleStudentImage from '../../assets/male-icon.png';
import femaleStudentImage from '../../assets/female-icon.png';
import { AccountsData } from '../data/AccountsData'; // Adjust the path according to your file structure
import EditAccountModal from '../EditAccountModal'; // Assuming the modal component is defined in EditAccountModal.js
import AddStudentModal from '../AddStudentModal'; // Assuming the modal component is defined in AddStudentModal.js

const ActiveStudents = () => {
    const [expandedUser, setExpandedUser] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [students, setStudents] = useState(AccountsData);
    const [deleteConfirmation, setDeleteConfirmation] = useState(null); // State for delete confirmation
    const [editModalOpen, setEditModalOpen] = useState(false); // State for edit modal
    const [selectedUser, setSelectedUser] = useState(null); // State to track which user is being edited
    const [addModalOpen, setAddModalOpen] = useState(false); // State for add modal
    const [sortConfig, setSortConfig] = useState({ key: 'Username', direction: 'ascending' }); // State for sorting
    const itemsPerPage = 5;

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const goToFirstPage = () => setCurrentPage(1);
    const goToLastPage = () => setCurrentPage(Math.ceil(filteredStudents.length / itemsPerPage));


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

    // Filter active students and those whose username doesn't start with "AT"
    const filteredStudents = sortedStudents.filter(user =>
        user.Status === "Active" &&
        !user.Username.startsWith('AT') &&
        (user.Username.toLowerCase().includes(searchTerm.toLowerCase()) ||
            `${user.firstName} ${user.lastName}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
            (user.Group.toLowerCase().includes(searchTerm.toLowerCase()))
        )
    );

    // Pagination logic
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentStudents = filteredStudents.slice(indexOfFirstItem, indexOfLastItem);

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
        setCurrentPage(1); // Reset to first page when search term changes
    };

    const paginationDisplay = () => {
        const totalPages = Math.ceil(filteredStudents.length / itemsPerPage);
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

    // Function to handle suspending a student
    const handleSuspend = (userId) => {
        const updatedStudents = students.map(user => {
            if (user.Username === userId) {
                user.Status = "Suspended";
            }
            return user;
        });
        setStudents(updatedStudents);
        window.alert(`Student with ID: ${userId} has been suspended successfully!`);
    };

    // Function to open add modal
    const openAddModal = () => {
        setAddModalOpen(true);
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
        <div className="table-container">
            <h2>Active Students</h2>
            <div className="search-bar">
                <input
                    type="text"
                    placeholder="Search"
                    value={searchTerm}
                    onChange={handleSearchChange}
                />
                <br/>
                <br/>
                <button className="submit-button" onClick={openAddModal}>
                    Add Student <FontAwesomeIcon icon={faPlus} />
                </button>
            </div>
            <table className="user-table">
                <thead>
                    <tr>
                        <th onClick={() => handleSort('Username')}>
                            User ID {sortConfig.key === 'Username' && (sortConfig.direction === 'ascending' ? '▲' : '▼')}
                        </th>
                        <th onClick={() => handleSort('firstName')}>
                            Name {sortConfig.key === 'firstName' && (sortConfig.direction === 'ascending' ? '▲' : '▼')}
                        </th>
                        <th>Group</th>
                        <th></th> {/* Empty th for arrow icon */}
                    </tr>
                </thead>
                <tbody>
                    {currentStudents.map(user => (
                        <React.Fragment key={user.Username}>
                            <tr onClick={() => toggleExpand(user.Username)} className={expandedUser === user.Username ? 'Active' : ''}>
                                <td>{user.Username}</td>
                                <td>{user.firstName} {user.lastName}</td>
                                <td>{user.Group}</td>
                                <td className="expand-arrow">
                                    <FontAwesomeIcon icon={expandedUser === user.Username ? faAngleUp : faChevronDown} />
                                </td>
                            </tr>
                            {expandedUser === user.Username && (
                                <tr className="expanded-row">
                                    <td>
                                        {user.Gender === "Male" ?
                                            <img src={maleStudentImage} alt="Male Student" className="student-image" />
                                            :
                                            <img src={femaleStudentImage} alt="Female Student" className="student-image" />
                                        }
                                    </td>
                                    <td>
                                        <div>
                                            <p>Email: {user.email}</p>
                                            <p>Phone: {user.PhoneNumber}</p>
                                            <p>Parent name: {user.ParentName}</p>
                                            <p>Parent phone number: {user.ParentPhoneNumber}</p>
                                            {/* Add more details here as needed */}
                                        </div>
                                    </td>
                                    <td>
                                        <div>
                                            <button className="edit-button" onClick={() => openEditModal(user)}>Edit <FontAwesomeIcon icon={faEdit} /> </button>
                                        </div>
                                    </td>
                                    <td>
                                        <div>
                                            <p>
                                                <button onClick={() => showDeleteConfirmation(user.Username)} className="suspend-button">Delete account</button>
                                            </p>
                                            <p>
                                                <button onClick={() => handleSuspend(user.Username)} className="suspend-button">Suspend</button>
                                            </p>
                                        </div>
                                    </td>
                                </tr>
                            )}
                        </React.Fragment>
                    ))}
                </tbody>
            </table>
            <div className="pagination">
                <ul>
                    <li className={currentPage === 1 ? 'disabled' : ''}>
                        <a onClick={goToFirstPage}> <FontAwesomeIcon icon={faBackward} /> </a>
                    </li>
                    {paginationDisplay()}
                    <li className={currentPage === Math.ceil(filteredStudents.length / itemsPerPage) ? 'disabled' : ''}>
                        <a onClick={goToLastPage}><FontAwesomeIcon icon={faForward} /> </a>
                    </li>
                </ul>
            </div>

            {/* Edit Account Modal */}
            {editModalOpen && selectedUser &&
                <EditAccountModal
                    user={selectedUser}
                    closeModal={closeEditModal}
                    saveChanges={saveChanges}
                />
            }

            {/* Add Student Modal */}
            {addModalOpen &&
                <AddStudentModal
                    closeModal={closeAddModal}
                    addStudent={addStudent}
                />
            }
        </div>
    );
}

export default ActiveStudents;
