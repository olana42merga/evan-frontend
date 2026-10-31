import React from 'react';
import { Container, Card, Alert } from 'react-bootstrap';
import Header from '../../components/Header';

export default function Admins() {
  return (
    <>
      <Header />
      <Container fluid className="p-4">
        <h2 className="text-primary mb-4">Admins Management</h2>
        <Alert variant="info">
          Admin management is done through the database.
          <br />Add new admins via SSMS or backend endpoint.
        </Alert>
      </Container>
    </>
  );
}
