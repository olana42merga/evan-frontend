import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Header from './Header';
import Sidebar from './Sidebar';

export default function MemberLayout({ title, children }) {
  return (
    <div style={{ background: '#0a0f1c', minHeight: '100vh', color: '#f8fafc' }}>
      <Header />
      
      {/* Main wrapper */}
      <div className="d-flex" style={{ minHeight: 'calc(100vh - 56px)' }}>
        
        {/* Sidebar (Fixed width on desktop, hidden on mobile) */}
        <div className="d-none d-md-block flex-shrink-0">
          <Sidebar />
        </div>

        {/* Main Content */}
        <div className="flex-grow-1 p-3 p-md-4" style={{ overflowX: 'hidden' }}>
          <Container fluid className="p-0">
            <h2 className="fw-bold mb-4" style={{ color: '#0ea5e9' }}>
              {title}
            </h2>
            {children}
          </Container>
        </div>

      </div>
    </div>
  );
}