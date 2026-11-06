import React, { useEffect, useRef, useState } from 'react';
import { Container, Row, Col, Card, Spinner, Modal, Button, Badge } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import {
  FaBible, FaHandsHelping, FaUsers, FaArrowRight,
  FaHeart, FaQuoteLeft, FaTelegram
} from 'react-icons/fa';
import api from '../../api/axios'; 
import '../../styles/hero.css';

const BASE = 'https://ddu-evangelical-backend-6.onrender.com';
const TELEGRAM_URL = 'https://t.me/+iXVyakK4-3lhYzc0';

const HERO_IMAGES = [
  '/hero-images/1.jpg', '/hero-images/2.jpg', '/hero-images/3.jpg',
  '/hero-images/4.jpg', '/hero-images/5.jpg', '/hero-images/6.jpg'
];

function Reveal({ children, delay = 0 }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold: 0.12 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(30px)',
        transition: `all 0.7s cubic-bezier(0.4, 0, 0.2, 1) ${delay}ms`
      }}
    >
      {children}
    </div>
  );
}

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [verse, setVerse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState(null);
  const [slide, setSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setSlide(prev => (prev + 1) % HERO_IMAGES.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const fetchData = () => {
      api.get('/verses')
        .then(res => {
          const d = res.data;
          if (Array.isArray(d) && d.length > 0) setVerse(d[0]);
        })
        .catch(() => {});

      api.get('/posts')
        .then(res => {
          const d = res.data;
          setPosts(Array.isArray(d) ? d : []);
        })
        .catch(() => setPosts([]))
        .finally(() => setLoading(false));
    };

    fetchData();
    const interval = setInterval(fetchData, 30000);
    return () => clearInterval(interval);
  }, []);

  const cardStyle = {
    cursor: 'pointer',
    transition: 'all 0.35s cubic-bezier(0.4, 0, 0.2, 1)',
    border: '1px solid #1f2937',
    background: '#111827'
  };

  const onCardEnter = (e, color) => {
    e.currentTarget.style.transform = 'translateY(-10px) scale(1.02)';
    e.currentTarget.style.boxShadow = '0 22px 42px rgba(14, 165, 233, 0.15)';
    e.currentTarget.style.borderColor = color;
  };

  const onCardLeave = (e) => {
    e.currentTarget.style.transform = 'translateY(0) scale(1)';
    e.currentTarget.style.boxShadow = '0 5px 15px rgba(0,0,0,0.2)';
    e.currentTarget.style.borderColor = '#1f2937';
  };

  return (
    <div style={{ background: '#0a0f1c', minHeight: '100vh', color: '#f8fafc' }}>
      <Header />

      <div className="hero-rotating">
        {HERO_IMAGES.map((img, i) => (
          <div
            key={i}
            className={`hero-slide ${i === slide ? 'active' : ''}`}
            style={{ backgroundImage: `url(${img})` }}
          />
        ))}
        
        <div className="hero-overlay" style={{ background: 'rgba(10, 15, 28, 0.6)' }} />
        
        <div className="hero-content px-3 d-flex align-items-center justify-content-center">
          <div style={{ maxWidth: '900px', margin: '0 auto', textAlign: 'center' }}>
            
            <h1 className="fw-bold mb-3 mb-md-4 text-white" style={{ 
              fontSize: 'clamp(2rem, 6vw, 4rem)', 
              letterSpacing: '-1px', 
              lineHeight: '1.2', 
              textShadow: '0 4px 15px rgba(0,0,0,0.8)' 
            }}>
              Welcome to <br />
              <span style={{ 
                background: 'linear-gradient(90deg, #0ea5e9, #38bdf8)', 
                WebkitBackgroundClip: 'text', 
                WebkitTextFillColor: 'transparent',
                fontWeight: 900,
                textShadow: '0 0 30px rgba(14, 165, 233, 0.3)'
              }}>
                FOCUS DDU Evangelical Team
              </span>
            </h1>
            
            <div className="text-light" style={{ 
              fontSize: 'clamp(1rem, 2.5vw, 1.4rem)', 
              lineHeight: '1.8', 
              textShadow: '0 2px 10px rgba(0,0,0,0.9)' 
            }}>
              <span style={{ color: '#0ea5e9', fontWeight: 'bold' }}>“Yesus deebisee,</span> Karichi, 
              dhugaan, jireenyis, ana; anaan yoo ta'e malee, 
              eenyu iyyuu gara abbaa hin dhufu. 
              <span style={{ color: '#0ea5e9', fontWeight: 'bold' }}> (Yoh 14:6)”</span>
            </div>
            
          </div>
        </div>
        
        <div className="hero-dots">
          {HERO_IMAGES.map((_, i) => (
            <div
              key={i}
              className={`hero-dot ${i === slide ? 'active' : ''}`}
              onClick={() => setSlide(i)}
            />
          ))}
        </div>
      </div>

      <div className="py-4 border-bottom" style={{ background: '#111827', borderColor: '#1f2937' }}>
        <Container>
          <Row className="text-center g-3 g-md-4">
            <Col xs={6} md={3}>
              <div className="fw-bold" style={{ color: '#0ea5e9', fontSize: 'clamp(1.5rem, 4vw, 2.2rem)' }}>
                2.2K+
              </div>
              <div className="text-uppercase fw-bold" style={{ color: '#94a3b8', letterSpacing: '1px', fontSize: 'clamp(0.65rem, 1.5vw, 0.8rem)' }}>
                TikTok Followers
              </div>
            </Col>
            <Col xs={6} md={3}>
              <div className="fw-bold" style={{ color: '#10b981', fontSize: 'clamp(1.5rem, 4vw, 2.2rem)' }}>
                5+
              </div>
              <div className="text-uppercase fw-bold" style={{ color: '#94a3b8', letterSpacing: '1px', fontSize: 'clamp(0.65rem, 1.5vw, 0.8rem)' }}>
                Years of Ministry
              </div>
            </Col>
            <Col xs={6} md={3}>
              <div className="fw-bold" style={{ color: '#f59e0b', fontSize: 'clamp(1.5rem, 4vw, 2.2rem)' }}>
                100+
              </div>
              <div className="text-uppercase fw-bold" style={{ color: '#94a3b8', letterSpacing: '1px', fontSize: 'clamp(0.65rem, 1.5vw, 0.8rem)' }}>
                Students Reached
              </div>
            </Col>
            <Col xs={6} md={3}>
              <div className="fw-bold" style={{ color: '#ef4444', fontSize: 'clamp(1.5rem, 4vw, 2.2rem)' }}>
                Weekly
              </div>
              <div className="text-uppercase fw-bold" style={{ color: '#94a3b8', letterSpacing: '1px', fontSize: 'clamp(0.65rem, 1.5vw, 0.8rem)' }}>
                Fellowship Meetings
              </div>
            </Col>
          </Row>
        </Container>
      </div>

      <div className="py-5">
        <Container>
          <Reveal>
            <div className="text-center mb-5 px-3">
              <Badge bg="info" text="dark" className="mb-2 px-3 py-2 rounded-pill fw-bold text-uppercase" style={{ letterSpacing: '1px' }}>
                News & Updates
              </Badge>
              <h2 className="fw-bold mb-2" style={{ color: '#0ea5e9', fontSize: 'clamp(1.8rem, 4vw, 2.5rem)' }}>
                Latest Posts
              </h2>
              <p style={{ color: '#94a3b8', fontSize: 'clamp(1rem, 2vw, 1.2rem)' }}>
                Reflections and updates from our team
              </p>
            </div>
          </Reveal>

          {loading ? (
            <div className="text-center py-5">
              <Spinner animation="border" variant="info" />
            </div>
          ) : posts.length === 0 ? (
            <Card className="border-0 shadow-sm p-4 p-md-5 text-center mx-auto" style={{ maxWidth: '600px', background: '#111827', border: '1px solid #1f2937' }}>
              <FaBible size={48} className="text-info mb-3 mx-auto opacity-50" />
              <h5 className="text-white fw-bold">No posts yet</h5>
              <p style={{ color: '#94a3b8' }} className="mb-0">Check back soon for updates from the team.</p>
            </Card>
          ) : (
            <Row xs={1} sm={2} md={2} lg={3} className="g-4">
              {posts.slice(0, 6).map((p, idx) => {
                const preview = p.content?.length > 150
                  ? p.content.substring(0, 150) + '...'
                  : p.content;
                return (
                  <Col key={p.id} className="d-flex">
                    <Reveal delay={idx * 80} className="w-100">
                      <Card
                        className="card-shadow border-0 w-100 d-flex flex-column h-100"
                        style={{ ...cardStyle, minHeight: '350px' }}
                        onMouseEnter={(e) => onCardEnter(e, '#0ea5e9')}
                        onMouseLeave={onCardLeave}
                      >
                        {p.imagePath ? (
                          <div style={{ height: 'clamp(160px, 20vw, 200px)', overflow: 'hidden', flexShrink: 0 }}>
                            <img
                              src={`${BASE}/api/posts/image/${p.id}`} // <-- UPDATED TO NEW ENDPOINT
                              alt={p.title}
                              style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s ease' }}
                              onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.06)')}
                              onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
                            />
                          </div>
                        ) : (
                          <div style={{ height: 'clamp(160px, 20vw, 200px)', background: '#1f2937', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <FaBible size={36} className="text-secondary" />
                          </div>
                        )}
                        <Card.Body className="d-flex flex-column p-4">
                          <Card.Title className="fw-bold mb-3 text-white" style={{ fontSize: 'clamp(1.1rem, 2vw, 1.3rem)' }}>
                            {p.title}
                          </Card.Title>
                          <Card.Text className="flex-grow-1" style={{ whiteSpace: 'pre-wrap', fontSize: 'clamp(0.9rem, 1.5vw, 1rem)', lineHeight: '1.6', color: '#94a3b8' }}>
                            {preview}
                          </Card.Text>
                          {p.content?.length > 150 && (
                            <span
                              onClick={() => setSelected(p)}
                              className="fw-bold d-flex align-items-center mt-3"
                              style={{ cursor: 'pointer', transition: 'gap 0.2s', fontSize: 'clamp(0.9rem, 1.5vw, 1rem)', color: '#0ea5e9' }}
                            >
                              Read More <FaArrowRight className="ms-2" />
                            </span>
                          )}
                        </Card.Body>
                      </Card>
                    </Reveal>
                  </Col>
                );
              })}
            </Row>
          )}
        </Container>
      </div>

      {/* ... (Keep the rest of the Home page exactly the same, just update the Modal image source below) ... */}
      
      <Modal show={!!selected} onHide={() => setSelected(null)} size="lg" centered contentClassName="border-0 shadow-lg rounded-4" style={{ color: '#f8fafc' }}>
        <Modal.Header closeButton closeVariant="white" className="border-0 pb-0" style={{ background: '#111827' }}>
          <Modal.Title className="fw-bold fs-4" style={{ color: '#0ea5e9' }}>{selected?.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body className="p-3 p-md-4" style={{ background: '#111827' }}>
          {selected?.imagePath && (
            <img
              src={`${BASE}/api/posts/image/${selected.id}`} // <-- UPDATED TO NEW ENDPOINT
              alt={selected.title}
              className="rounded-3 mb-4 w-100"
              style={{ maxHeight: '400px', objectFit: 'cover' }}
            />
          )}
          <p style={{ whiteSpace: 'pre-wrap', lineHeight: 1.8, fontSize: 'clamp(1rem, 2vw, 1.1rem)', color: '#cbd5e1' }}>
            {selected?.content}
          </p>
        </Modal.Body>
        <Modal.Footer className="border-0 pt-0" style={{ background: '#111827' }}>
          <Button variant="secondary" className="rounded-pill px-4 fw-bold" onClick={() => setSelected(null)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      <Footer />
    </div>
  );
}