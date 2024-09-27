import React, { useState } from 'react';
import maleIcon from '../assets/male-icon.png';
import femaleIcon from '../assets/female-icon.png';
import { AccountsData } from './data/AccountsData'; // Adjust the path as necessary

const generateRandomPassword = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let password = '';
    for (let i = 0; i < 5; i++) {
        password += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return password;
};

const generateUsername = (group) => {
    const groupPrefix = group.substring(0, 2).toUpperCase();
    let maxId = 0;

    AccountsData.forEach(student => {
        if (student.Username.startsWith(groupPrefix)) {
            const id = parseInt(student.Username.substring(2), 10);
            if (id > maxId) {
                maxId = id;
            }
        }
    });

    return `${groupPrefix}${(maxId + 1).toString().padStart(4, '0')}`;
};

const AddStudentModal = ({ closeModal, addStudent }) => {
    const initialStudent = {
        firstName: '',
        lastName: '',
        email: '',
        PhoneNumber: '',
        Group: '',
        Gender: 'Male',
        State: 'Active',
        ParentName: '',
        ParentPhoneNumber: '',
    };

    const [newStudent, setNewStudent] = useState(initialStudent);
    const [showPassword, setShowPassword] = useState(false);
    const [password, setPassword] = useState(generateRandomPassword());
    

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewStudent(prevStudent => ({
            ...prevStudent,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (window.confirm('Are you sure you want to add this student?')) {
            const username = generateUsername(newStudent.Group);
            const studentData = {
                ...newStudent,
                Username: username,
                password: password
            };
            addStudent(studentData);
            closeModal();
        }
    };

    const handleCancel = () => {
        if (window.confirm('Are you sure you want to cancel? Your changes will not be saved.')) {
            closeModal();
        }
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div className="modal-backdrop">
            <div className="modal-content">
                <span className="close-button" onClick={handleCancel} >&times;</span>
                <div className="modal-header">
                    <h2 className="modal-title">Add Student</h2>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label className="form-label">First Name:</label>
                        <input
                            type="text"
                            className="form-input"
                            name="firstName"
                            value={newStudent.firstName}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label className="form-label">Last Name:</label>
                        <input
                            type="text"
                            className="form-input"
                            name="lastName"
                            value={newStudent.lastName}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label className="form-label">Email:</label>
                        <input
                            type="email"
                            className="form-input"
                            name="email"
                            value={newStudent.email}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label className="form-label">Phone Number:</label>
                        <input
                            type="tel"
                            className="form-input"
                            name="PhoneNumber"
                            value={newStudent.PhoneNumber}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label className="form-label">Parent Name:</label>
                        <input
                            type="text"
                            className="form-input"
                            name="ParentName"
                            value={newStudent.ParentName}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label className="form-label">Parent Phone Number:</label>
                        <input
                            type="tel"
                            className="form-input"
                            name="ParentPhoneNumber"
                            value={newStudent.ParentPhoneNumber}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label className="form-label">Group:</label>
                        <select
                            className="form-input"
                            name="Group"
                            value={newStudent.Group}
                            onChange={handleChange}
                            required
                        >
                               <option value="">Select Group</option>
                            <option value="EBIS">EBIS</option>
                            <option value="ELITE">ELITE</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label className="form-label">Password:</label>
                        <div className="password-input-group">
                            <input
                                type={showPassword ? 'text' : 'password'}
                                className="form-input"
                                name="password"
                                value={password}
                                readOnly
                            />
                        </div>
                        <button type="button" className="toggle-password-button" onClick={togglePasswordVisibility}>
                            {showPassword ? 'Hide' : 'Show'}
                        </button>
                    </div>
                    <div className="form-group">
                        <label className="form-label">Gender:</label>
                        <div className="gender-checkboxes">
                            <label>
                                <input
                                    type="checkbox"
                                    name="Gender"
                                    value="Male"
                                    checked={newStudent.Gender === 'Male'}
                                    onChange={handleChange}
                                />
                                <img src={maleIcon} alt="Male" className="gender-icon" />
                            </label>
                            <label>
                                <input
                                    type="checkbox"
                                    name="Gender"
                                    value="Female"
                                    checked={newStudent.Gender === 'Female'}
                                    onChange={handleChange}
                                />
                                <img src={femaleIcon} alt="Female" className="gender-icon" />
                            </label>
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="form-label">State:</label>
                        <select
                            className="form-input"
                            name="State"
                            value={newStudent.State}
                            onChange={handleChange}
                            required
                        >
                            <option value="Active">Active</option>
                            <option value="Suspended">Suspended</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <button type="submit" className="submit-button">Add Student</button>
                        <button type="button" className="cancel-button" onClick={handleCancel}>Cancel</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddStudentModal;
