import React, { useState } from 'react';
import './Table.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleUp, faChevronDown, faEdit, faBackward, faForward, faEllipsis, faCircleXmark,faFilter } from '@fortawesome/free-solid-svg-icons';
import maleStudentImage from '../../assets/male-icon.png';
import femaleStudentImage from '../../assets/female-icon.png';
import { AccountsData } from '../data/AccountsData'; // Adjust the path according to your file structure
import EditAccountModal from '../EditAccountModal'; // Assuming the modal component is defined in EditAccountModal.js

const InactiveStudents = () => {
    const [expandedUser, setExpandedUser] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [students, setStudents] = useState(AccountsData);
    const [deleteConfirmation, setDeleteConfirmation] = useState(null); // State for delete confirmation
    const [RejectConfirmation, setRejectConfirmation] = useState(null); // State for delete confirmation
    const [editModalOpen, setEditModalOpen] = useState(false); // State for edit modal
    const [selectedUser, setSelectedUser] = useState(null); // State to track which user is being edited
    const [sortConfig, setSortConfig] = useState({ key: 'Username', direction: 'ascending' }); // State for sorting
    const [statusFilter, setStatusFilter] = useState(['Pending', 'Suspended']); // State for status filter
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
        setDeleteConfirmation(null); // Reset delete confirmation status after deletion
    };

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

    const filteredStudents = sortedStudents.filter(user =>
        (statusFilter.includes(user.Status)) && // Filter by status
        (user.Username.toLowerCase().includes(searchTerm.toLowerCase()) ||
            `${user.firstName} ${user.lastName}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.Group.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentStudents = filteredStudents.slice(indexOfFirstItem, indexOfLastItem);

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
        setCurrentPage(1); // Reset to first page when search term changes
    };

    const toggleStatusFilter = () => {
        if (statusFilter.length === 2) {
            setStatusFilter(['Pending']);
        } else if (statusFilter[0] === 'Pending') {
            setStatusFilter(['Suspended']);
        } else {
            setStatusFilter(['Pending', 'Suspended']);
        }
        setCurrentPage(1); // Reset to first page when status filter changes
    };

    const paginationDisplay = () => {
        const totalPages = Math.ceil(filteredStudents.length / itemsPerPage);
        const pageNumbers = [];
        const maxVisiblePages = 3; // Maximum number of pages to display

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

    const openEditModal = (user) => {
        setSelectedUser(user);
        setEditModalOpen(true);
    };

    const closeEditModal = () => {
        setSelectedUser(null);
        setEditModalOpen(false);
    };

    const saveChanges = (updatedUser) => {
        const updatedStudents = students.map(user => {
            if (user.Username === updatedUser.Username || user.email === updatedUser.email) {
                return updatedUser;
            }
            return user;
        });
        setStudents(updatedStudents);
        window.alert(`Changes saved successfully!`);
        closeEditModal();
    };

    const handleSuspend = (userId) => {
        const updatedStudents = students.map(user => {
            if (user.Username === userId) {
                user.Status = 'Suspended';
            }
            return user;
        });
        setStudents(updatedStudents);
        window.alert(`Student with ID: ${userId} has been suspended successfully!`);
    };

    const handleunSuspend = (UserId) => {

        const updatedStudents = students.map(user => {
            if (user.Username === UserId) {
                user.Status = 'Active';
            }
            return user;

        });
        setStudents(updatedStudents);
        window.alert(`Student has been unsuspended successfully!`);
    }

    const generateUsername = (group) => {
        const prefix = group.substring(0, 2).toUpperCase();
        const similarUsers = students.filter(user => user.Username.startsWith(prefix));
        const newId = similarUsers.length + 1;
        return `${prefix}${newId.toString().padStart(3, '0')}`;
    };

    const handleAccept = (UserId) => {
        const updatedStudents = students.map(user => {
            if (user.email === UserId) {
                console.log(user);
                user.Username = generateUsername(user.Group);
                user.Status = 'Active';
            }
            console.log(user);
            return user;
        });
        setStudents(updatedStudents);
        window.alert(`Student has been accepted successfully!`);
    }

    const showRejectConfirmation = (userId) => {
        const confirmDelete = window.confirm(`Are you sure you want to REJECT student with email: ${userId}?`);
        if (confirmDelete) {
            setRejectConfirmation(userId);
            handleReject(userId);
        }
    };

    const handleReject = (UserId) => {
        const updatedStudents = students.filter(user => user.Username !== UserId && user.email !== UserId);
        setStudents(updatedStudents);
        window.alert(`Student has been rejected successfully!`);
        setRejectConfirmation(null);
    }

    return (
        <div className="table-container">
            <h2>Inactive Students</h2>
            <div className="search-bar">
                <input
                    type="text"
                    placeholder="Search"
                    value={searchTerm}
                    onChange={handleSearchChange}
                />
            </div>
            <table className="user-table">
                <thead>
                    <tr>
                        <th className="pointer-cursor" onClick={() => handleSort('Username')}>
                            User ID {sortConfig.key === 'Username' && (sortConfig.direction === 'ascending' ? '▲' : '▼')}
                        </th>
                        <th className="pointer-cursor" onClick={() => handleSort('firstName')}>
                            Name {sortConfig.key === 'firstName' && (sortConfig.direction === 'ascending' ? '▲' : '▼')}
                        </th>
                        <th>Group</th>
                        <th className="pointer-cursor" onClick={toggleStatusFilter}>
                            Status <FontAwesomeIcon icon={faFilter} /> {sortConfig.key === 'Status' && (sortConfig.direction === 'ascending' ? '▲' : '▼')}
                        </th>
                        <th></th> {/* Empty th for arrow icon */}
                    </tr>
                </thead>
                <tbody>
                    {currentStudents.map(user => (
                        <React.Fragment key={user.Username || user.email}>
                            <tr onClick={() => toggleExpand(user.Username || user.email)} className={expandedUser === user.Username || expandedUser === user.email ? 'Active' : ''}>
                                <td className="pointer-cursor">{user.Status === 'Pending' ? <span className="pending-icon">...</span> :
                                    user.Username}</td>
                                <td className="pointer-cursor">{user.firstName} {user.lastName}</td>
                                <td>{user.Group}</td>
                                <td className="pointer-cursor">
                                    {user.Status === 'Pending' ? (
                                        <React.Fragment>
                                            <FontAwesomeIcon icon={faEllipsis} className="state-icon suspended-icon" />
                                            <span className="state-text"> Pending</span>
                                        </React.Fragment>
                                    ) : user.Status === 'Suspended' ? (
                                        <React.Fragment>
                                            <FontAwesomeIcon icon={faCircleXmark} className="state-icon pending-icon" />
                                            <span className="state-text"> Suspended</span>
                                        </React.Fragment>
                                    ) : (
                                        user.Status // Fallback in case of unexpected state
                                    )}
                                </td>
                                <td className="expand-arrow">
                                    <FontAwesomeIcon icon={expandedUser === user.Username ? faAngleUp : faChevronDown} />
                                </td>
                            </tr>
                            {expandedUser === (user.Username || user.email) && (
                                <tr className="expanded-row">
                                    <td>
                                        {user.Gender === 'Male' ?
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
                                            {user.Status === 'Pending' &&
                                                <p>
                                                    <button onClick={() => handleAccept(user.email)} className="Accept-button">Accept</button>
                                                </p>
                                            }
                                            {user.Status === 'Pending' &&
                                                <p>
                                                    <button onClick={() => showRejectConfirmation(user.email)} className="suspend-button">Reject</button>
                                                </p>
                                            }
                                            {user.Status === 'Suspended' &&
                                                <p>
                                                    <button onClick={() => showDeleteConfirmation(user.Username)} className="suspend-button">Delete account</button>
                                                </p>
                                            }
                                            {user.Status === 'Suspended' &&
                                                <p>
                                                    <button onClick={() => handleunSuspend(user.Username)} className="suspend-button">Unsuspend</button>
                                                </p>
                                            }
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
        </div>
    );
}

export default InactiveStudents;
