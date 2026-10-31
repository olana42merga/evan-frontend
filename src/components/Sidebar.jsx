import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Nav } from 'react-bootstrap';
import {
  FaHome, FaBook, FaGift, FaList, FaEnvelope,
  FaUser, FaImage, FaFilePdf, FaChurch
} from 'react-icons/fa';

export default function Sidebar() {
  const location = useLocation();
  const [hovered, setHovered] = useState(null);

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
    <div
      className="d-flex flex-column flex-shrink-0 p-3 text-white shadow"
      style={{
        width: '240px',
        minHeight: 'calc(100vh - 56px)',
        background: 'linear-gradient(180deg, #1e2a3a 0%, #2c3e50 50%, #34495e 100%)'
      }}
    >
      {/* BRAND */}
      <div className="text-center pb-3 mb-3 border-bottom border-secondary">
        <div
          className="d-inline-flex align-items-center justify-content-center rounded-circle mb-2"
          style={{
            width: '60px',
            height: '60px',
            background: 'linear-gradient(135deg, #00bcd4, #3498db)',
            boxShadow: '0 4px 15px rgba(0, 188, 212, 0.4)'
          }}
        >
          <FaChurch size={28} color="white" />
        </div>
        <h6 className="mb-0 fw-bold text-white">DDU Member</h6>
        <small style={{ color: '#00e5ff', fontSize: '0.75rem' }}>Dashboard</small>
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
                  color: active || isHovered ? '#ffffff' : '#b8c4d1',
                  background: active
                    ? 'linear-gradient(90deg, #3498db 0%, #2c3e50 100%)'
                    : isHovered
                    ? 'linear-gradient(90deg, rgba(52, 152, 219, 0.25) 0%, rgba(52, 152, 219, 0.05) 100%)'
                    : 'transparent',
                  borderLeft: active
                    ? '4px solid #00e5ff'
                    : isHovered
                    ? '4px solid #00bcd4'
                    : '4px solid transparent',
                  paddingLeft: isHovered ? '18px' : '14px',
                  fontWeight: active ? 600 : 500,
                  fontSize: '0.95rem',
                  boxShadow: active ? '0 4px 15px rgba(52, 152, 219, 0.4)' : 'none',
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
                }}
              >
                {/* ICON */}
                <span
                  className="me-3 d-flex align-items-center"
                  style={{
                    fontSize: '18px',
                    color: active ? '#00e5ff' : isHovered ? '#00bcd4' : 'inherit',
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
                      background: '#00e5ff',
                      boxShadow: '0 0 10px #00e5ff'
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
        <small style={{ color: '#7f8c8d', fontSize: '0.75rem' }}>
          ? 2026 DDU
        </small>
      </div>
    </div>
  );
}
