import React, { useEffect, useRef, useState } from 'react';
import { Container, Card, Row, Col, Button, Badge } from 'react-bootstrap';
import {
  FaMapMarkerAlt, FaEnvelope, FaPhone, FaUsers, FaClock,
  FaHandsHelping, FaBible, FaTelegram, FaFacebook, FaYoutube,
  FaInstagram, FaQuoteLeft, FaArrowRight, FaPaperPlane
} from 'react-icons/fa';
import { FaTiktok } from 'react-icons/fa6';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

const TELEGRAM_URL = 'https://t.me/+iXVyakK4-3lhYzc0';
const TIKTOK_URL = 'https://www.tiktok.com/@focus.fellowship';
const FACEBOOK_URL = 'https://www.facebook.com/focusddufellowship';

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
      { threshold: 0.15 }
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

/* ---------- Hover-lift card behavior (Dark Theme) ---------- */
const hoverLift = {
  base: {
    transition: 'all 0.35s cubic-bezier(0.4, 0, 0.2, 1)',
    border: '1px solid #1f2937',
    background: '#111827',
    cursor: 'default'
  },
  enter: (e, color = '#0ea5e9') => {
    e.currentTarget.style.transform = 'translateY(-10px) scale(1.02)';
    e.currentTarget.style.boxShadow = '0 22px 40px rgba(14, 165, 233, 0.15)';
    e.currentTarget.style.borderColor = color;
  },
  leave: (e) => {
    e.currentTarget.style.transform = 'translateY(0) scale(1)';
    e.currentTarget.style.boxShadow = '0 5px 15px rgba(0,0,0,0.2)';
    e.currentTarget.style.borderColor = '#1f2937';
  }
};

export default function Contact() {
  return (
    <div style={{ background: '#0a0f1c', minHeight: '100vh', color: '#f8fafc' }}>
      <Header />

      {/* HERO BANNER */}
      <div
        className="position-relative overflow-hidden text-white"
        style={{
          background: 'radial-gradient(circle at 50% 0%, #1e3a8a 0%, #0a0f1c 70%)',
          padding: '90px 0 70px'
        }}
      >
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'radial-gradient(circle at 25% 30%, rgba(14,165,233,0.15), transparent 55%), radial-gradient(circle at 80% 70%, rgba(14,165,233,0.1), transparent 55%)',
            pointerEvents: 'none'
          }}
        />
        <Container style={{ position: 'relative', zIndex: 1 }}>
          <div className="text-center">
            <Badge
              bg="info"
              text="dark"
              className="mb-3 px-3 py-2 rounded-pill fw-bold"
              style={{ fontSize: '0.85rem', letterSpacing: '0.5px' }}
            >
              <FaPaperPlane className="me-2" /> Contact & Fellowship
            </Badge>
            <h1 className="display-4 fw-bold mb-3" style={{ color: '#0ea5e9', textShadow: '0 0 30px rgba(14, 165, 233, 0.3)' }}>
              Come Fellowship With Us
            </h1>
            <p
              className="lead mb-0 mx-auto"
              style={{ maxWidth: '680px', color: '#94a3b8' }}
            >
              We would love to hear from you. Reach out, join our gatherings,
              or simply say hello.
            </p>
          </div>
        </Container>
      </div>

      {/* FELLOWSHIP SECTION */}
      <div className="py-5">
        <Container>
          <Reveal>
            <div className="text-center mb-5">
              <div
                className="rounded-circle d-inline-flex align-items-center justify-content-center mb-3"
                style={{
                  width: '90px',
                  height: '90px',
                  background: 'linear-gradient(135deg, #0ea5e9, #3b82f6)',
                  boxShadow: '0 12px 30px rgba(14, 165, 233, 0.3)'
                }}
              >
                <FaUsers size={40} color="white" />
              </div>
              <h2 className="text-white fw-bold mb-2" style={{ color: '#0ea5e9' }}>Fellowship</h2>
              <p
                className="fst-italic mb-0"
                style={{ fontSize: '1.1rem', color: '#94a3b8' }}
              >
                "Growing together in Christ"
              </p>
            </div>
          </Reveal>

          <Row className="g-4">
            <Col md={6} lg={4}>
              <Reveal delay={0}>
                <Card
                  className="h-100 shadow-sm p-4 text-center border-0"
                  style={hoverLift.base}
                  onMouseEnter={(e) => hoverLift.enter(e, '#0ea5e9')}
                  onMouseLeave={hoverLift.leave}
                >
                  <div
                    className="rounded-circle d-flex align-items-center justify-content-center mx-auto mb-3"
                    style={{
                      width: '70px',
                      height: '70px',
                      background: 'linear-gradient(135deg, #0ea5e9, #3b82f6)',
                      flexShrink: 0
                    }}
                  >
                    <FaClock size={30} color="white" />
                  </div>
                  <h5 className="fw-bold text-white">When We Meet</h5>
                  <p className="mb-1" style={{ color: '#cbd5e1' }}>
                    <strong>Thursday Morning</strong> — 11:00 AM
                  </p>
                  <p className="mb-0" style={{ color: '#cbd5e1' }}>
                    <strong>Thursday Afternoon</strong> — 6:00 PM
                  </p>
                </Card>
              </Reveal>
            </Col>

            <Col md={6} lg={4}>
              <Reveal delay={100}>
                <Card
                  className="h-100 shadow-sm p-4 text-center border-0"
                  style={hoverLift.base}
                  onMouseEnter={(e) => hoverLift.enter(e, '#10b981')}
                  onMouseLeave={hoverLift.leave}
                >
                  <div
                    className="rounded-circle d-flex align-items-center justify-content-center mx-auto mb-3"
                    style={{
                      width: '70px',
                      height: '70px',
                      background: 'linear-gradient(135deg, #10b981, #059669)',
                      flexShrink: 0
                    }}
                  >
                    <FaBible size={30} color="white" />
                  </div>
                  <h5 className="fw-bold text-white">What We Do</h5>
                  <p className="mb-1" style={{ color: '#cbd5e1' }}>Bible Study</p>
                  <p className="mb-0" style={{ color: '#cbd5e1' }}>Prayer • Worship • Sharing</p>
                </Card>
              </Reveal>
            </Col>

            <Col md={12} lg={4}>
              <Reveal delay={200}>
                <Card
                  className="h-100 shadow-sm p-4 text-center border-0"
                  style={hoverLift.base}
                  onMouseEnter={(e) => hoverLift.enter(e, '#f59e0b')}
                  onMouseLeave={hoverLift.leave}
                >
                  <div
                    className="rounded-circle d-flex align-items-center justify-content-center mx-auto mb-3"
                    style={{
                      width: '70px',
                      height: '70px',
                      background: 'linear-gradient(135deg, #f59e0b, #d97706)',
                      flexShrink: 0
                    }}
                  >
                    <FaHandsHelping size={30} color="white" />
                  </div>
                  <h5 className="fw-bold text-white">Everyone Is Welcome</h5>
                  <p className="mb-0" style={{ color: '#cbd5e1' }}>
                    New student, returning member, or just curious about faith
                    — come as you are.
                  </p>
                </Card>
              </Reveal>
            </Col>
          </Row>
        </Container>
      </div>

      {/* CONTACT INFO CARDS */}
      <div className="py-5">
        <Container>
          <Reveal>
            <div className="text-center mb-5">
              <h2 className="fw-bold mb-2" style={{ color: '#0ea5e9' }}>Get in Touch</h2>
              <p style={{ color: '#94a3b8' }}>Find us, write to us, or call us</p>
            </div>
          </Reveal>

          <Row className="g-4">
            <Col md={6} lg={4}>
              <Reveal delay={0}>
                <Card
                  className="h-100 text-center shadow-sm p-4 border-0"
                  style={hoverLift.base}
                  onMouseEnter={(e) => hoverLift.enter(e, '#ef4444')}
                  onMouseLeave={hoverLift.leave}
                >
                  <div
                    className="rounded-circle d-flex align-items-center justify-content-center mx-auto mb-3"
                    style={{
                      width: '70px',
                      height: '70px',
                      background: 'linear-gradient(135deg, #ef4444, #b91c1c)',
                      flexShrink: 0
                    }}
                  >
                    <FaMapMarkerAlt size={30} color="white" />
                  </div>
                  <h5 className="fw-bold text-white">Location</h5>
                  <p className="mb-0" style={{ color: '#cbd5e1' }}>Dire Dawa University</p>
                  <p className="mb-0" style={{ color: '#cbd5e1' }}>Main Campus</p>
                </Card>
              </Reveal>
            </Col>

            <Col md={6} lg={4}>
              <Reveal delay={100}>
                <Card
                  className="h-100 text-center shadow-sm p-4 border-0"
                  style={hoverLift.base}
                  onMouseEnter={(e) => hoverLift.enter(e, '#0ea5e9')}
                  onMouseLeave={hoverLift.leave}
                >
                  <div
                    className="rounded-circle d-flex align-items-center justify-content-center mx-auto mb-3"
                    style={{
                      width: '70px',
                      height: '70px',
                      background: 'linear-gradient(135deg, #0ea5e9, #3b82f6)',
                      flexShrink: 0
                    }}
                  >
                    <FaEnvelope size={30} color="white" />
                  </div>
                  <h5 className="fw-bold text-white">Email</h5>
                  <a
                    href="mailto:info@ddu-evangelical.com"
                    className="d-block text-decoration-none"
                    style={{ color: '#cbd5e1' }}
                  >
                    info@ddu-evangelical.com
                  </a>
                  <a
                    href="mailto:obayecha@gmail.com"
                    className="d-block text-decoration-none"
                    style={{ color: '#cbd5e1' }}
                  >
                    obayecha@gmail.com
                  </a>
                </Card>
              </Reveal>
            </Col>

            <Col md={6} lg={4}>
              <Reveal delay={200}>
                <Card
                  className="h-100 text-center shadow-sm p-4 border-0"
                  style={hoverLift.base}
                  onMouseEnter={(e) => hoverLift.enter(e, '#10b981')}
                  onMouseLeave={hoverLift.leave}
                >
                  <div
                    className="rounded-circle d-flex align-items-center justify-content-center mx-auto mb-3"
                    style={{
                      width: '70px',
                      height: '70px',
                      background: 'linear-gradient(135deg, #10b981, #059669)',
                      flexShrink: 0
                    }}
                  >
                    <FaPhone size={30} color="white" />
                  </div>
                  <h5 className="fw-bold text-white">Phone</h5>
                  <a
                    href="tel:+251906612678"
                    className="d-block text-decoration-none"
                    style={{ color: '#cbd5e1' }}
                  >
                    +251 906 612 678
                  </a>
                  <a
                    href="tel:+251941452771"
                    className="d-block text-decoration-none"
                    style={{ color: '#cbd5e1' }}
                  >
                    +251 941 452 771
                  </a>
                </Card>
              </Reveal>
            </Col>
          </Row>
        </Container>
      </div>

      {/* MAP PLACEHOLDER */}
      <div className="py-5">
        <Container>
          <Row className="g-4 align-items-stretch">
            <Col lg={12}>
              <Reveal>
                <Card className="border-0 shadow-sm h-100 overflow-hidden" style={{ background: '#111827', border: '1px solid #1f2937' }}>
                  <div
                    style={{
                      height: '340px',
                      background: '#0a0f1c',
                      position: 'relative',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                  >
                    <div className="text-center">
                      <FaMapMarkerAlt size={64} className="text-danger mb-3" />
                      <h4 className="fw-bold text-white">Dire Dawa University</h4>
                      <p className="mb-3" style={{ color: '#94a3b8' }}>Main Campus, Dire Dawa, Ethiopia</p>
                      <Button
                        variant="primary"
                        href="https://maps.google.com/?q=Dire+Dawa+University"
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          background: '#0ea5e9',
                          color: '#0a0f1c',
                          border: 0,
                          fontWeight: 'bold'
                        }}
                      >
                        Open in Google Maps <FaArrowRight className="ms-2" />
                      </Button>
                    </div>
                  </div>
                </Card>
              </Reveal>
            </Col>
          </Row>
        </Container>
      </div>

      {/* VERSE CARD */}
      <div className="py-5">
        <Container>
          <Reveal>
            <Card
              className="border-0 shadow-sm mx-auto overflow-hidden"
              style={{
                maxWidth: '820px',
                background: '#111827',
                border: '1px solid #1f2937',
                borderLeft: '6px solid #0ea5e9'
              }}
            >
              <Card.Body className="p-5 text-center position-relative">
                <FaQuoteLeft
                  size={40}
                  className="mb-3"
                  style={{ color: '#0ea5e9', opacity: 0.5 }}
                />
                <p
                  className="fst-italic mb-3"
                  style={{
                    fontSize: '1.15rem',
                    lineHeight: 1.8,
                    color: '#f8fafc'
                  }}
                >
                  "Itti fufees Yesus, 'Eenyu illee namoota duratti eenyu akkan ta'e
                  dhugaa ba'ee yoo mul'ise, anis abbaa koo isa waaqa irra jiru
                  duratti dhugaa nan ba'aaf. Eenyu illee namoota duratti yoo na
                  gane garuu, anis immoo abbaa koo isa waaqa irra jiru duratti
                  isa nan gana' jedhe."
                </p>
                <Badge bg="info" text="dark" className="px-3 py-2">
                  Matthew 10:32–33
                </Badge>
              </Card.Body>
            </Card>
          </Reveal>
        </Container>
      </div>

      <Footer />
    </div>
  );
}