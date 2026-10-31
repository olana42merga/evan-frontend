import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { FaBook, FaGift, FaEnvelope, FaUser, FaList, FaImage, FaFilePdf } from 'react-icons/fa';
import Header from '../../components/Header';
import Sidebar from '../../components/Sidebar';

export default function Dashboard() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user')) || {};

  const cards = [
    { icon: <FaBook size={40} />, label: 'Daily Verse', color: 'primary', path: '/member/verse' },
    { icon: <FaGift size={40} />, label: 'Send Gift', color: 'success', path: '/member/send-gift' },
    { icon: <FaList size={40} />, label: 'My Gifts', color: 'info', path: '/member/my-gifts' },
    { icon: <FaEnvelope size={40} />, label: 'Messages', color: 'warning', path: '/member/messages' },
    { icon: <FaImage size={40} />, label: 'Photos', color: 'danger', path: '/member/photos' },
    { icon: <FaFilePdf size={40} />, label: 'PDFs', color: 'secondary', path: '/member/pdfs' },
    { icon: <FaUser size={40} />, label: 'Profile', color: 'dark', path: '/member/profile' }
  ];

  return (
    <>
      <Header />
      <div className="d-flex" style={{ minHeight: 'calc(100vh - 56px)' }}>
        <Sidebar />
        <Container fluid className="p-4">
          <h2 className="text-primary mb-1">
            Welcome, {user.firstName || user.username}!
          </h2>
          <p className="text-muted mb-4">Member Dashboard</p>

          <Row className="g-3 mt-3">
            {cards.map((c, i) => (
              <Col md={4} lg={3} key={i}>
                <Card
                  className={`text-center p-4 card-shadow border-0 text-${c.color}`}
                  onClick={() => navigate(c.path)}
                  style={{ cursor: 'pointer', transition: 'all 0.2s' }}
                  onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-4px)'}
                  onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
                >
                  <div className="mb-2">{c.icon}</div>
                  <h5 className="text-dark">{c.label}</h5>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </div>
    </>
  );
}
