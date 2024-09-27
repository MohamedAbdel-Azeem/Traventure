import React, { useState } from 'react';
import maleIcon from '../assets/male-icon.png'; // Ensure the correct path to your image
import femaleIcon from '../assets/female-icon.png'; // Ensure the correct path to your image

const EditAccountModal = ({ user, closeModal, saveChanges }) => {
    const [editedUser, setEditedUser] = useState({ ...user });
    const [showPassword, setShowPassword] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditedUser(prevUser => ({
            ...prevUser,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (window.confirm('Are you sure you want to save these changes?')) {
            saveChanges(editedUser);
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
                <span className="close-button" onClick={handleCancel}>&times;</span>
                <div className="modal-header">
                    <h2 className="modal-title">Edit Account</h2>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label className="form-label">First Name:</label>
                        <input
                            type="text"
                            className="form-input"
                            name="firstName"
                            value={editedUser.firstName}
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
                            value={editedUser.lastName}
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
                            value={editedUser.email}
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
                            value={editedUser.PhoneNumber}
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
                            value={editedUser.ParentName}
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
                            value={editedUser.ParentPhoneNumber}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label className="form-label">Group:</label>
                        <input
                            type="text"
                            className="form-input"
                            name="Group"
                            value={editedUser.Group}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label className="form-label">Password:</label>
                        <div className="password-input-group">
                            <input
                                type={showPassword ? 'text' : 'password'}
                                className="form-input"
                                name="password"
                                value={editedUser.password}
                                onChange={handleChange}
                                required
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
                                    checked={editedUser.Gender === 'Male'}
                                    onChange={handleChange}
                                />
                                <img src={maleIcon} alt="Male" className="gender-icon" />
                            </label>
                            <label>
                                <input
                                    type="checkbox"
                                    name="Gender"
                                    value="Female"
                                    checked={editedUser.Gender === 'Female'}
                                    onChange={handleChange}
                                />
                                <img src={femaleIcon} alt="Female" className="gender-icon"/>
                            </label>
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="form-label">State:</label>
                        <select
                            className="form-input"
                            name="State"
                            value={editedUser.State}
                            onChange={handleChange}
                            required
                        >
                            <option value="Active" >Active</option>
                            <option value="Suspended">Suspended</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <button type="submit" className="submit-button">Save Changes</button>
                        <button type="button" className="cancel-button" onClick={handleCancel}>Cancel</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditAccountModal;
