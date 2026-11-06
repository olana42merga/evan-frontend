import React from 'react';
import { Container } from 'react-bootstrap';
import Header from './Header';
import Sidebar from './Sidebar';

export default function MemberLayout({ title, children }) {
  return (
    <div style={{ background: '#0a0f1c', minHeight: '100vh', color: '#f8fafc' }}>
      <Header />
      
      <div className="d-flex" style={{ minHeight: 'calc(100vh - 56px)' }}>
        {/* The Sidebar component we just updated */}
        <Sidebar />
        
        {/* MAIN CONTENT AREA */}
        <div 
          className="flex-grow-1 p-3 p-md-4" 
          style={{ 
            // On desktop, add left margin so it doesn't go under the fixed sidebar
            // On mobile, no margin
            marginLeft: window.innerWidth > 768 ? '240px' : '0',
            width: '100%',
            overflowX: 'hidden'
          }}
        >
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