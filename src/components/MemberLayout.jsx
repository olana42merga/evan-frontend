import React from 'react';
import { Container } from 'react-bootstrap';
import Header from './Header';
import Sidebar from './Sidebar';

export default function MemberLayout({ title, children }) {
  return (
    <>
      <Header />
      <div className="d-flex" style={{ minHeight: 'calc(100vh - 56px)' }}>
        <Sidebar />
        <Container fluid className="p-4">
          <h2 className="text-primary mb-4">{title}</h2>
          {children}
        </Container>
      </div>
    </>
  );
}
