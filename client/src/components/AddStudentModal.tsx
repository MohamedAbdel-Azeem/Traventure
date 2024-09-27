import React, { useState } from 'react';

const generateRandomPassword = () => {
    // Your password generation logic
    return 'randomPassword123';
};

const generateUsername = (groupPrefix) => {
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
        email: "",
        Username: "",
        password: "",
        mobileNumber: "",
        nationality: "",
        DOB: "",
        Occupation: "",
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

    return (
        <div className="modal">
            <form onSubmit={handleSubmit}>
                <label>
                    Email:
                    <input
                        type="email"
                        name="email"
                        value={newStudent.email}
                        onChange={handleChange}
                        required
                    />
                </label>
                <label>
                    Username:
                    <input
                        type="text"
                        name="Username"
                        value={newStudent.Username}
                        onChange={handleChange}
                        required
                    />
                </label>
                <label>
                    Password:
                    <input
                        type={showPassword ? "text" : "password"}
                        name="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <button type="button" onClick={() => setShowPassword(!showPassword)}>
                        {showPassword ? "Hide" : "Show"}
                    </button>
                </label>
                <label>
                    Mobile Number:
                    <input
                        type="text"
                        name="mobileNumber"
                        value={newStudent.mobileNumber}
                        onChange={handleChange}
                        required
                    />
                </label>
                <label>
                    Nationality:
                    <input
                        type="text"
                        name="nationality"
                        value={newStudent.nationality}
                        onChange={handleChange}
                        required
                    />
                </label>
                <label>
                    Date of Birth:
                    <input
                        type="date"
                        name="DOB"
                        value={newStudent.DOB}
                        onChange={handleChange}
                        required
                    />
                </label>
                <label>
                    Occupation:
                    <input
                        type="text"
                        name="Occupation"
                        value={newStudent.Occupation}
                        onChange={handleChange}
                        required
                    />
                </label>
                <button type="submit">Add Student</button>
                <button type="button" onClick={closeModal}>Cancel</button>
            </form>
        </div>
    );
};

export default AddStudentModal;