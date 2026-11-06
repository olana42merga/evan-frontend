import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Nav, Button } from 'react-bootstrap';
import {
  FaHome, FaBook, FaGift, FaList, FaEnvelope,
  FaUser, FaImage, FaFilePdf, FaChurch, FaBars, FaTimes
} from 'react-icons/fa';

export default function Sidebar() {
  const location = useLocation();
  const [hovered, setHovered] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  const menu = [
    { path: '/member/dashboard', label: 'Dashboard', icon: <FaHome /> },
    { path: '/member/verse', label: 'Daily Verse', icon: <FaBook /> },
    { path: '/member/send-gift', label: 'Send Gift', icon: <FaGift /> },
    { path: '/member/my-gifts', label: 'My Gifts', icon: <FaList /> },
    { path: '/member/messages', label: 'Messages', icon: <FaEnvelope /> },
    { path: '/member/photos', label: 'Photos', icon: <FaImage /> },
    { path: '/member/pdfs', label: 'PDFs', icon: <FaFilePdf /> },
    { path: '/member/profile', label: 'Profile', icon: <FaUser /> }
  ];

  return (
    <>
      {/* MOBILE HAMBURGER BUTTON */}
      <div className="d-md-none p-3 text-white" style={{ background: '#111827', borderBottom: '1px solid #1f2937' }}>
        <Button variant="outline-info" onClick={() => setIsOpen(!isOpen)} className="d-flex align-items-center border-0">
          {isOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
          <span className="ms-2 fw-bold">Menu</span>
        </Button>
      </div>

      {/* BACKDROP */}
      {isOpen && (
        <div
          className="d-md-none position-fixed top-0 start-0 w-100 h-100"
          style={{ background: 'rgba(0,0,0,0.6)', zIndex: 1040 }}
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* SIDEBAR BODY */}
      <div
        className={`flex-column p-3 text-white ${isOpen ? 'd-flex' : 'd-none d-md-flex'}`}
        style={{
          width: '240px',
          background: '#111827',
          borderRight: '1px solid #1f2937',
          position: window.innerWidth < 768 ? 'fixed' : 'relative', // Fixed on mobile, relative on desktop
          top: window.innerWidth < 768 ? '56px' : '0',
          left: 0,
          height: 'calc(100vh - 56px)',
          zIndex: 1050,
          overflowY: 'auto'
        }}
      >
        {/* BRAND */}
        <div className="text-center pb-3 mb-3 border-bottom border-secondary">
          <div
            className="d-inline-flex align-items-center justify-content-center rounded-circle mb-2"
            style={{ width: '60px', height: '60px', background: 'linear-gradient(135deg, #0ea5e9, #3b82f6)' }}
          >
            <FaChurch size={28} color="white" />
          </div>
          <h6 className="mb-0 fw-bold text-white">DDU Member</h6>
          <small style={{ color: '#0ea5e9', fontSize: '0.75rem' }}>Dashboard</small>
        </div>

        {/* MENU */}
        <Nav className="nav-pills flex-column mb-auto gap-1">
          {menu.map((item, i) => {
            const active = location.pathname === item.path;
            const isHovered = hovered === i;

            return (
              <Nav.Item key={i}>
                <Link
                  to={item.path}
                  className="nav-link d-flex align-items-center rounded-3 py-2 px-3 text-decoration-none"
                  onMouseEnter={() => setHovered(i)}
                  onMouseLeave={() => setHovered(null)}
                  style={{
                    color: active || isHovered ? '#ffffff' : '#94a3b8',
                    background: active ? 'linear-gradient(90deg, #0ea5e9 0%, rgba(14, 165, 233, 0.2) 100%)' : isHovered ? 'rgba(14, 165, 233, 0.1)' : 'transparent',
                    borderLeft: active || isHovered ? '4px solid #0ea5e9' : '4px solid transparent',
                    fontWeight: active ? 600 : 500,
                    fontSize: '0.95rem',
                    transition: 'all 0.3s ease'
                  }}
                >
                  <span className="me-3 d-flex align-items-center" style={{ fontSize: '18px', color: active || isHovered ? '#0ea5e9' : 'inherit' }}>
                    {item.icon}
                  </span>
                  <span>{item.label}</span>
                </Link>
              </Nav.Item>
            );
          })}
        </Nav>
      </div>
    </>
  );
}