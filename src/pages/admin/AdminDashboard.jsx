import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { FaUsers, FaBook, FaCalendar, FaImage, FaFile, FaGift, FaEnvelope, FaCog, FaBullhorn } from 'react-icons/fa';
import Header from '../../components/Header';

const API = 'https://ddu-evangelical-backend-6.onrender.com';

export default function AdminDashboard() {
  const [counts, setCounts] = useState({
    members: 0, verses: 0, programs: 0, posts: 0,
    photos: 0, pdfs: 0, gifts: 0, messages: 0
  });
  const navigate = useNavigate();

  useEffect(() => {
    fetch(API + '/verses').then(r => r.json()).then(d => setCounts(c => ({ ...c, verses: d.length }))).catch(() => {});
    fetch(API + '/programs').then(r => r.json()).then(d => setCounts(c => ({ ...c, programs: d.length }))).catch(() => {});
    fetch(API + '/posts').then(r => r.json()).then(d => setCounts(c => ({ ...c, posts: d.length }))).catch(() => {});
    fetch(API + '/gifts').then(r => r.json()).then(d => setCounts(c => ({ ...c, gifts: d.length }))).catch(() => {});
    fetch(API + '/messages').then(r => r.json()).then(d => setCounts(c => ({ ...c, messages: d.length }))).catch(() => {});
    fetch(API + '/photos').then(r => r.json()).then(d => setCounts(c => ({ ...c, photos: d.length }))).catch(() => {});
    fetch(API + '/pdfs').then(r => r.json()).then(d => setCounts(c => ({ ...c, pdfs: d.length }))).catch(() => {});
    fetch(API + '/admin/members').then(r => r.json()).then(d => setCounts(c => ({ ...c, members: Array.isArray(d) ? d.length : 0 }))).catch(() => {});
  }, []);

  const stats = [
    { icon: <FaUsers size={36} />, label: 'Members', value: counts.members, color: 'primary', path: '/admin/members' },
    { icon: <FaBook size={36} />, label: 'Verses', value: counts.verses, color: 'success', path: '/admin/verses' },
    { icon: <FaCalendar size={36} />, label: 'Programs', value: counts.programs, color: 'info', path: '/admin/programs' },
    { icon: <FaBullhorn size={36} />, label: 'Posts', value: counts.posts, color: 'warning', path: '/admin/posts' },
    { icon: <FaImage size={36} />, label: 'Photos', value: counts.photos, color: 'warning', path: '/admin/photos' },
    { icon: <FaFile size={36} />, label: 'PDFs', value: counts.pdfs, color: 'danger', path: '/admin/pdfs' },
    { icon: <FaGift size={36} />, label: 'Gifts', value: counts.gifts, color: 'success', path: '/admin/gifts' },
    { icon: <FaEnvelope size={36} />, label: 'Messages', value: counts.messages, color: 'primary', path: '/admin/messages' }
  ];

  return (
    <>
      <Header />
      <Container fluid className="p-4">
        <h2 className="text-primary mb-4">Admin Dashboard</h2>
        <Row className="g-3">
          {stats.map((s, i) => (
            <Col md={3} key={i}>
              <Card
                className={`text-center p-4 card-shadow border-0 text-${s.color}`}
                onClick={() => navigate(s.path)}
                style={{ cursor: 'pointer', transition: 'all 0.2s' }}
                onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-4px)'}
                onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
              >
                <div className="mb-2">{s.icon}</div>
                <h6 className="text-dark">{s.label}</h6>
                <h4 className={`text-${s.color} mb-0`}>{s.value}</h4>
                <Button variant={`outline-${s.color}`} size="sm" className="mt-2">
                  Open &rarr;
                </Button>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </>
  );
}
