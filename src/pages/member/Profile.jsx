import React from 'react';
import { Container, Card } from 'react-bootstrap';
import Sidebar from '../../components/Sidebar';

export default function Profile() {
  const user = JSON.parse(localStorage.getItem('user')) || {};

  return (
    <div className="d-flex">
      <Sidebar />
      <Container fluid className="p-4">
        <h2 className="text-primary mb-4">Profile</h2>
        <Card className="card-shadow border-0" style={{ maxWidth: '600px' }}>
          <Card.Body className="p-4">
            <p><strong>Username:</strong> {user.username}</p>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>First Name:</strong> {user.firstName}</p>
            <p><strong>Last Name:</strong> {user.lastName}</p>
            <p><strong>Role:</strong> {user.role}</p>
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
}
