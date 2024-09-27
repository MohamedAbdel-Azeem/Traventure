import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import { AccountsData } from '../data/AccountsData';

const Dashboard = () => {
    type AccountType = {
        Username: string;
        firstName: string;
        lastName: string;
        email: string;
        Group: string;
        Gender: string;
        password: string; // Make sure to handle passwords securely in a real app
        Status: string;
        PhoneNumber?: string; // Optional fields
        ParentName?: string;
        ParentPhoneNumber?: string;
    }

    const [user, setUser] = useState<AccountType | null>(null);

    useEffect(() => {
        const storedUsername = localStorage.getItem('username');
        if (storedUsername) {
            const foundUser = AccountsData.find(
                (account) => account.Username === storedUsername
            );
            setUser(foundUser || null); // Ensure setUser is called with null if not found
        }
    }, []);

    return (
        <Container className="dashboard-container">
            <Row>
                <Col>
                    <h1>Dashboard</h1>
                    {user ? (
                        <h2>Welcome, {user.firstName} {user.lastName}</h2>
                    ) : (
                        <h2>No user found. Please log in.</h2>
                    )}
                    {/* Rest of the student page content */}
                </Col>
            </Row>
        </Container>
    );
};

export default Dashboard;
