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

/* ---------- Scroll-reveal wrapper ---------- */
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

  /* Auto-Update Logic */
  useEffect(() => {
    const fetchData = () => {
      api.get('/verses')
        .then(res => {
          const d = res.data;
          if (Array.isArray(d) && d.length > 0) setVerse(d[0]); // Gets newest verse
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

    // 1. Fetch immediately when the component mounts
    fetchData();

    // 2. Fetch automatically every 30 seconds to catch new posts
    const interval = setInterval(fetchData, 30000);

    // Cleanup interval on unmount
    return () => clearInterval(interval);
  }, []);

  // Dark theme card styling
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

      {/* ═══════════════════════════════════════════ */}
      {/* HERO SLIDER                                 */}
      {/* ═══════════════════════════════════════════ */}
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

      {/* ═══════════════════════════════════════════ */}
      {/* STATS BAR                                   */}
      {/* ═══════════════════════════════════════════ */}
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

      {/* ═══════════════════════════════════════════ */}
      {/* LATEST POSTS                                */}
      {/* ═══════════════════════════════════════════ */}
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
                              src={BASE + p.imagePath}
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

      {/* ═══════════════════════════════════════════ */}
      {/* SCRIPTURE BANNER                            */}
      {/* ═══════════════════════════════════════════ */}
      <div
        className="py-5 text-white position-relative overflow-hidden"
        style={{ background: 'radial-gradient(circle at 50% 50%, #1e3a8a 0%, #0a0f1c 70%)' }}
      >
        <Container className="position-relative text-center px-4" style={{ zIndex: 1 }}>
          <Reveal>
            <FaQuoteLeft size={40} className="mb-4 opacity-50" style={{ color: '#0ea5e9' }} />
            <h2 className="fst-italic mb-4 mx-auto fw-bold" style={{ fontSize: 'clamp(1.3rem, 3.5vw, 2rem)', maxWidth: '900px', lineHeight: 1.6, textShadow: '0 2px 10px rgba(0,0,0,0.5)' }}>
              "Egaa dhaqaa, maqaa abbaatii fi ilmaatti, kan Hafuura Qulqulluuttis isaan cuuphuudhaan, <span style={{ color: '#0ea5e9' }}>saba hundumaa bartoota koo godhaa!</span>"
            </h2>
            <Badge bg="info" text="dark" className="px-4 py-2 rounded-pill fs-6 fw-bold shadow">
              Matthew 28:19
            </Badge>
          </Reveal>
        </Container>
      </div>

      {/* ═══════════════════════════════════════════ */}
      {/* WHAT WE DO — 3 CARDS                        */}
      {/* ═══════════════════════════════════════════ */}
      <div className="py-5">
        <Container>
          <Reveal>
            <div className="text-center mb-5 px-3">
              <Badge bg="success" text="dark" className="mb-2 px-3 py-2 rounded-pill fw-bold text-uppercase" style={{ letterSpacing: '1px' }}>
                Our Pillars
              </Badge>
              <h2 className="fw-bold mb-2" style={{ color: '#0ea5e9', fontSize: 'clamp(1.8rem, 4vw, 2.5rem)' }}>
                What We Do
              </h2>
              <p style={{ color: '#94a3b8', fontSize: 'clamp(1rem, 2vw, 1.2rem)' }}>Our mission in action</p>
            </div>
          </Reveal>

          <Row className="g-4">
            {/* BIBLE VERSE CARD */}
            <Col xs={12} md={4}>
              <Reveal delay={0}>
                <Card
                  className="h-100 text-center border-0 shadow-sm"
                  style={cardStyle}
                  onMouseEnter={(e) => onCardEnter(e, '#0ea5e9')}
                  onMouseLeave={onCardLeave}
                >
                  <Card.Body className="p-4 d-flex flex-column">
                    <div className="rounded-circle d-flex align-items-center justify-content-center mx-auto mb-4" style={{ width: 'clamp(70px, 10vw, 90px)', height: 'clamp(70px, 10vw, 90px)', background: 'linear-gradient(135deg, #0ea5e9, #3b82f6)', flexShrink: 0 }}>
                      <FaBible size={36} color="white" />
                    </div>
                    <Card.Title className="fw-bold mb-3 text-white" style={{ fontSize: 'clamp(1.2rem, 2vw, 1.5rem)' }}>
                      Bible Verse
                    </Card.Title>
                    {verse ? (
                      <>
                        <Badge bg="info" text="dark" className="mx-auto mb-3 px-3 py-2 rounded-pill" style={{ letterSpacing: '1px' }}>
                          {verse.reference}
                        </Badge>
                        <p className="fst-italic flex-grow-1" style={{ lineHeight: '1.7', fontSize: 'clamp(0.9rem, 1.5vw, 1.1rem)', color: '#cbd5e1' }}>
                          "{verse.verseText?.length > 100
                            ? verse.verseText.substring(0, 100) + '...'
                            : verse.verseText}"
                        </p>
                        <small className="fw-bold" style={{ letterSpacing: '1px', color: '#94a3b8' }}>
                          — {verse.translation}
                        </small>
                      </>
                    ) : (
                      <p className="flex-grow-1" style={{ lineHeight: '1.7', fontSize: 'clamp(0.9rem, 1.5vw, 1.1rem)', color: '#cbd5e1' }}>
                        Daily verse from the Word of God
                      </p>
                    )}
                  </Card.Body>
                </Card>
              </Reveal>
            </Col>

            {/* GIVING CARD */}
            <Col xs={12} md={4}>
              <Reveal delay={100}>
                <Card
                  as={Link}
                  to="/giving"
                  className="h-100 text-center border-0 shadow-sm text-decoration-none"
                  style={cardStyle}
                  onMouseEnter={(e) => onCardEnter(e, '#10b981')}
                  onMouseLeave={onCardLeave}
                >
                  <Card.Body className="p-4 d-flex flex-column">
                    <div className="rounded-circle d-flex align-items-center justify-content-center mx-auto mb-4" style={{ width: 'clamp(70px, 10vw, 90px)', height: 'clamp(70px, 10vw, 90px)', background: 'linear-gradient(135deg, #10b981, #059669)', flexShrink: 0 }}>
                      <FaHandsHelping size={36} color="white" />
                    </div>
                    <Card.Title className="fw-bold mb-3 text-white" style={{ fontSize: 'clamp(1.2rem, 2vw, 1.5rem)' }}>
                      Giving
                    </Card.Title>
                    <p className="flex-grow-1" style={{ lineHeight: '1.7', fontSize: 'clamp(0.9rem, 1.5vw, 1.1rem)', color: '#cbd5e1' }}>
                      Support the ministry through Telebirr & CBE to help us reach more students with the Gospel.
                    </p>
                    <div className="fw-bold d-flex align-items-center justify-content-center mt-3" style={{ fontSize: 'clamp(0.9rem, 1.5vw, 1rem)', color: '#10b981' }}>
                      View accounts <FaArrowRight className="ms-2" />
                    </div>
                  </Card.Body>
                </Card>
              </Reveal>
            </Col>

            {/* FELLOWSHIP CARD */}
            <Col xs={12} md={4}>
              <Reveal delay={200}>
                <Card
                  as={Link}
                  to="/contact"
                  className="h-100 text-center border-0 shadow-sm text-decoration-none"
                  style={cardStyle}
                  onMouseEnter={(e) => onCardEnter(e, '#f59e0b')}
                  onMouseLeave={onCardLeave}
                >
                  <Card.Body className="p-4 d-flex flex-column">
                    <div className="rounded-circle d-flex align-items-center justify-content-center mx-auto mb-4" style={{ width: 'clamp(70px, 10vw, 90px)', height: 'clamp(70px, 10vw, 90px)', background: 'linear-gradient(135deg, #f59e0b, #d97706)', flexShrink: 0 }}>
                      <FaUsers size={36} color="white" />
                    </div>
                    <Card.Title className="fw-bold mb-3 text-white" style={{ fontSize: 'clamp(1.2rem, 2vw, 1.5rem)' }}>
                      Fellowship
                    </Card.Title>
                    <p className="flex-grow-1" style={{ lineHeight: '1.7', fontSize: 'clamp(0.9rem, 1.5vw, 1.1rem)', color: '#cbd5e1' }}>
                      Growing together in Christ through weekly worship, Bible study, and prayer.
                    </p>
                    <div className="fw-bold d-flex align-items-center justify-content-center mt-3" style={{ fontSize: 'clamp(0.9rem, 1.5vw, 1rem)', color: '#f59e0b' }}>
                      Contact us <FaArrowRight className="ms-2" />
                    </div>
                  </Card.Body>
                </Card>
              </Reveal>
            </Col>
          </Row>
        </Container>
      </div>

      {/* ═══════════════════════════════════════════ */}
      {/* JOIN US CTA                                 */}
      {/* ═══════════════════════════════════════════ */}
      <div className="py-5">
        <Container>
          <Reveal>
            <Card
              className="border-0 shadow-lg overflow-hidden"
              style={{ background: '#111827', border: '1px solid #1f2937', borderLeft: '8px solid #0ea5e9' }}
            >
              <Card.Body className="p-4 p-md-5 text-center">
                <div className="rounded-circle d-inline-flex align-items-center justify-content-center mb-4" style={{ width: 'clamp(70px, 10vw, 80px)', height: 'clamp(70px, 10vw, 80px)', background: 'linear-gradient(135deg, #0ea5e9, #3b82f6)', boxShadow: '0 10px 20px rgba(14, 165, 233, 0.3)' }}>
                  <FaHeart size={36} color="white" />
                </div>
                <h2 className="fw-bold mb-3 text-white" style={{ fontSize: 'clamp(1.8rem, 4vw, 2.2rem)' }}>
                  Join Our Fellowship
                </h2>
                <p className="mb-4 mx-auto" style={{ maxWidth: '650px', lineHeight: '1.7', fontSize: 'clamp(1rem, 2vw, 1.25rem)', color: '#94a3b8' }}>
                  Whether you are a new student, a returning member, or simply curious about faith — you are welcome here. <strong style={{ color: '#f8fafc' }}>Come as you are.</strong>
                </p>
                <div className="d-flex justify-content-center flex-column flex-sm-row gap-3 mt-4">
                  <Button
                    as={Link}
                    to="/contact"
                    size="lg"
                    className="border-0 fw-bold px-4 py-3 rounded-pill shadow"
                    style={{ background: '#0ea5e9', color: '#0a0f1c', fontSize: 'clamp(1rem, 2vw, 1.2rem)' }}
                  >
                    Contact Us <FaArrowRight className="ms-2" />
                  </Button>
                  <Button
                    href={TELEGRAM_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    size="lg"
                    variant="outline-info"
                    className="fw-bold px-4 py-3 rounded-pill text-light border-info"
                    style={{ fontSize: 'clamp(1rem, 2vw, 1.2rem)' }}
                  >
                    <FaTelegram className="me-2" /> Join Telegram
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </Reveal>
        </Container>
      </div>

      {/* ═══════════════════════════════════════════ */}
      {/* MODAL                                       */}
      {/* ═══════════════════════════════════════════ */}
      <Modal show={!!selected} onHide={() => setSelected(null)} size="lg" centered contentClassName="border-0 shadow-lg rounded-4" style={{ color: '#f8fafc' }}>
        <Modal.Header closeButton closeVariant="white" className="border-0 pb-0" style={{ background: '#111827' }}>
          <Modal.Title className="fw-bold fs-4" style={{ color: '#0ea5e9' }}>{selected?.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body className="p-3 p-md-4" style={{ background: '#111827' }}>
          {selected?.imagePath && (
            <img
              src={BASE + selected.imagePath}
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