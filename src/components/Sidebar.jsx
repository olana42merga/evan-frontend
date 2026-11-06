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
  const [isOpen, setIsOpen] = useState(false); // Controls mobile sidebar visibility

  // Close sidebar on mobile when a link is clicked
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
      {/* MOBILE HAMBURGER BUTTON (Only visible on small screens) */}
      <div className="d-md-none p-3 text-white" style={{ background: '#111827', borderBottom: '1px solid #1f2937' }}>
        <Button variant="outline-info" onClick={() => setIsOpen(!isOpen)} className="d-flex align-items-center border-0">
          {isOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
          <span className="ms-2 fw-bold">Menu</span>
        </Button>
      </div>

      {/* BACKDROP (Darkens the screen behind the sidebar on mobile) */}
      {isOpen && (
        <div
          className="d-md-none position-fixed top-0 start-0 w-100 h-100"
          style={{ background: 'rgba(0,0,0,0.6)', zIndex: 1040 }}
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* SIDEBAR */}
      <div
        className={`d-flex flex-column flex-shrink-0 p-3 text-white shadow position-fixed position-md-relative ${isOpen ? 'd-flex' : 'd-none d-md-flex'}`}
        style={{
          width: '240px',
          minHeight: 'calc(100vh - 56px)',
          background: '#111827', // Deep navy background
          borderRight: '1px solid #1f2937',
          zIndex: 1050,
          top: '56px', // Below header
          left: 0,
          height: 'calc(100vh - 56px)',
          overflowY: 'auto'
        }}
      >
        {/* BRAND */}
        <div className="text-center pb-3 mb-3 border-bottom border-secondary">
          <div
            className="d-inline-flex align-items-center justify-content-center rounded-circle mb-2"
            style={{
              width: '60px',
              height: '60px',
              background: 'linear-gradient(135deg, #0ea5e9, #3b82f6)',
              boxShadow: '0 4px 15px rgba(14, 165, 233, 0.4)'
            }}
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
                  className="nav-link d-flex align-items-center rounded-3 py-2 px-3 text-decoration-none position-relative"
                  onMouseEnter={() => setHovered(i)}
                  onMouseLeave={() => setHovered(null)}
                  style={{
                    color: active || isHovered ? '#ffffff' : '#94a3b8',
                    background: active
                      ? 'linear-gradient(90deg, #0ea5e9 0%, rgba(14, 165, 233, 0.2) 100%)'
                      : isHovered
                      ? 'rgba(14, 165, 233, 0.1)'
                      : 'transparent',
                    borderLeft: active
                      ? '4px solid #0ea5e9'
                      : isHovered
                      ? '4px solid #0ea5e9'
                      : '4px solid transparent',
                    paddingLeft: isHovered ? '18px' : '14px',
                    fontWeight: active ? 600 : 500,
                    fontSize: '0.95rem',
                    boxShadow: active ? '0 4px 15px rgba(14, 165, 233, 0.2)' : 'none',
                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
                  }}
                >
                  {/* ICON */}
                  <span
                    className="me-3 d-flex align-items-center"
                    style={{
                      fontSize: '18px',
                      color: active || isHovered ? '#0ea5e9' : 'inherit',
                      transform: isHovered || active ? 'scale(1.15)' : 'scale(1)',
                      transition: 'all 0.3s ease',
                      minWidth: '24px'
                    }}
                  >
                    {item.icon}
                  </span>

                  {/* LABEL */}
                  <span>{item.label}</span>

                  {/* ACTIVE DOT */}
                  {active && (
                    <span
                      className="position-absolute top-50 end-0 translate-middle-y me-3 rounded-circle"
                      style={{
                        width: '8px',
                        height: '8px',
                        background: '#0ea5e9',
                        boxShadow: '0 0 10px #0ea5e9'
                      }}
                    />
                  )}
                </Link>
              </Nav.Item>
            );
          })}
        </Nav>

        {/* FOOTER */}
        <div className="pt-3 mt-3 border-top border-secondary text-center">
          <small style={{ color: '#64748b', fontSize: '0.75rem' }}>
            © 2026 DDU
          </small>
        </div>
      </div>
    </>
  );
}