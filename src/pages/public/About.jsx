import React from 'react';
import { Container, Row, Col, Card, Badge, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import {
  FaBible, FaHandsHelping, FaUsers, FaHeart, FaGraduationCap,
  FaGlobeAfrica, FaPrayingHands, FaBookOpen, FaArrowRight, FaCheckCircle
} from 'react-icons/fa';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

export default function About() {
  const values = [
    { icon: <FaBible size={36} color="white" />, gradient: 'linear-gradient(135deg, #0ea5e9, #3b82f6)', title: 'Biblical Foundation', text: 'Every activity, teaching, and decision is grounded in Scripture. We believe the Bible is God\'s inspired Word and our final authority.' },
    { icon: <FaPrayingHands size={36} color="white" />, gradient: 'linear-gradient(135deg, #8b5cf6, #6d28d9)', title: 'Prayer & Devotion', text: 'We gather weekly for prayer, worship, and Bible study. Prayer is not a ritual for us — it is conversation with a living God.' },
    { icon: <FaHandsHelping size={36} color="white" />, gradient: 'linear-gradient(135deg, #10b981, #059669)', title: 'Service & Compassion', text: 'We serve our campus and community through practical acts of love — visiting the sick, supporting the needy, and standing with the marginalized.' },
    { icon: <FaUsers size={36} color="white" />, gradient: 'linear-gradient(135deg, #f59e0b, #d97706)', title: 'Fellowship & Unity', text: 'We are a family. Across departments, languages, and backgrounds, we unite around Christ and grow together in love.' },
    { icon: <FaGraduationCap size={36} color="white" />, gradient: 'linear-gradient(135deg, #ef4444, #b91c1c)', title: 'Academic Excellence', text: 'We encourage our members to excel in their studies as an act of worship — honoring God with the minds He gave us.' },
    { icon: <FaGlobeAfrica size={36} color="white" />, gradient: 'linear-gradient(135deg, #14b8a6, #0f766e)', title: 'Mission & Outreach', text: 'From Dire Dawa to the ends of the earth, we share the gospel through words and deeds, locally and beyond.' }
  ];

  const milestones = [
    { year: 'Founded', text: 'A small group of students began meeting for prayer and Bible study on the Dire Dawa University campus.' },
    { year: 'Growth', text: 'The fellowship expanded across departments and dormitories, welcoming students from every region of Ethiopia.' },
    { year: 'Outreach', text: 'We launched community service projects, hospital visits, and campus evangelism programs.' },
    { year: 'Today', text: 'A vibrant, student-led community committed to worship, discipleship, and service — still growing in faith and number.' }
  ];

  const beliefs = [
    { icon: <FaBookOpen size={24} className="text-info" />, title: 'The Bible', text: 'is the inspired, authoritative Word of God.' },
    { icon: <FaHeart size={24} className="text-danger" />, title: 'Jesus Christ', text: 'is the Son of God, who died and rose again for our salvation.' },
    { icon: <FaPrayingHands size={24} className="text-primary" />, title: 'Salvation', text: 'is by grace through faith in Christ alone.' },
    { icon: <FaUsers size={24} className="text-success" />, title: 'The Church', text: 'is the body of Christ, called to worship and serve together.' },
    { icon: <FaGlobeAfrica size={24} className="text-warning" />, title: 'The Great Commission', text: 'calls us to make disciples of all nations.' },
    { icon: <FaHandsHelping size={24} className="text-secondary" />, title: 'Love', text: 'for God and neighbor is the greatest commandment.' },
  ];

  // Reusable hover style for the dark theme
  const hoverStyle = {
    transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
    cursor: 'default',
    background: '#111827', // Dark card background
    border: '1px solid #1f2937',
    color: '#f8fafc' // Lighter text
  };
  const handleEnter = (e) => {
    e.currentTarget.style.transform = 'translateY(-10px)';
    e.currentTarget.style.boxShadow = '0 20px 40px rgba(14, 165, 233, 0.15)';
    e.currentTarget.style.borderColor = '#0ea5e9';
  };
  const handleLeave = (e) => {
    e.currentTarget.style.transform = 'translateY(0)';
    e.currentTarget.style.boxShadow = '0 5px 15px rgba(0,0,0,0.2)';
    e.currentTarget.style.borderColor = '#1f2937';
  };

  return (
    <div style={{ background: '#0a0f1c', minHeight: '100vh', color: '#f8fafc' }}>
      <Header />

      {/* ═══════════════════════════════════════════ */}
      {/* HERO BANNER (DARK THEME)                    */}
      {/* ═══════════════════════════════════════════ */}
      <div
        className="py-5 text-white position-relative overflow-hidden"
        style={{
          background: 'radial-gradient(circle at 50% 0%, #1e3a8a 0%, #0a0f1c 70%)',
          paddingTop: '100px', paddingBottom: '100px'
        }}
      >
        <div style={{ position: 'absolute', top: '-10%', right: '-5%', width: '400px', height: '400px', background: 'rgba(14, 165, 233, 0.1)', borderRadius: '50%', filter: 'blur(60px)' }} />
        <div style={{ position: 'absolute', bottom: '-20%', left: '-5%', width: '300px', height: '300px', background: 'rgba(14, 165, 233, 0.1)', borderRadius: '50%', filter: 'blur(60px)' }} />

        <Container className="position-relative text-center" style={{ zIndex: 1 }}>
          <Badge bg="info" text="dark" className="mb-3 px-3 py-2 rounded-pill shadow-sm fw-bold text-uppercase" style={{ letterSpacing: '1px' }}>
            Get to know us
          </Badge>
          <h1 className="display-3 fw-bold mb-3" style={{ color: '#0ea5e9', textShadow: '0 0 30px rgba(14, 165, 233, 0.3)' }}>
            About Our Team
          </h1>
          <p className="lead mx-auto" style={{ maxWidth: '720px', fontSize: '1.3rem', color: '#94a3b8' }}>
            A student-led Christian community at Dire Dawa University —
            growing together in faith, fellowship, and service.
          </p>
        </Container>
      </div>

      {/* ═══════════════════════════════════════════ */}
      {/* INTRO (OVERLAPPING DARK CARD)               */}
      {/* ═══════════════════════════════════════════ */}
      <div className="pb-5">
        <Container>
          <Card className="border-0 shadow-lg p-4 p-md-5" style={{ marginTop: '-60px', borderRadius: '20px', background: '#111827', border: '1px solid #1f2937' }}>
            <Row className="align-items-center">
              <Col lg={8}>
                <h2 className="fw-bold mb-4" style={{ color: '#0ea5e9' }}>Who We Are</h2>
                <p className="lead" style={{ lineHeight: 1.9, color: '#f8fafc' }}>
                  The <strong style={{ color: '#38bdf8' }}>FOCUS DDU Evangelical Team</strong> is a student-led Christian
                  community at <strong style={{ color: '#38bdf8' }}>Dire Dawa University</strong>. We are committed
                  to sharing the love of Christ, growing in faith, and serving our
                  campus and community.
                </p>
                <p style={{ lineHeight: 1.8, color: '#94a3b8' }}>
                  We are not a denomination or a formal church. We are a family of students from different backgrounds, departments, and regions of Ethiopia, united by one faith in Jesus Christ.
                </p>
                <p style={{ lineHeight: 1.8, color: '#94a3b8', marginBottom: 0 }}>
                  We meet regularly for worship, prayer, Bible study, and fellowship. We encourage one another to live out the gospel in every area of life.
                </p>
              </Col>
              <Col lg={4} className="d-none d-lg-flex justify-content-center">
                <div className="rounded-circle d-flex align-items-center justify-content-center" style={{ width: '200px', height: '200px', background: 'rgba(14, 165, 233, 0.1)' }}>
                  <FaBible size={80} className="text-info opacity-75" />
                </div>
              </Col>
            </Row>
          </Card>
        </Container>
      </div>

      {/* ═══════════════════════════════════════════ */}
      {/* MISSION & VISION                            */}
      {/* ═══════════════════════════════════════════ */}
      <div className="py-5">
        <Container>
          <Row className="g-4">
            <Col lg={6}>
              <Card className="h-100 border-0 shadow-sm p-5" style={{ ...hoverStyle, borderTop: '5px solid #0ea5e9' }} onMouseEnter={handleEnter} onMouseLeave={handleLeave}>
                <Badge bg="info" text="dark" className="mb-3 align-self-start px-3 py-2 rounded-pill">
                  Our Mission
                </Badge>
                <h3 className="fw-bold text-white mb-3">Why We Exist</h3>
                <p style={{ lineHeight: 1.8, fontSize: '1.05rem', marginBottom: 0, color: '#cbd5e1' }}>
                  To make disciples of Jesus Christ among students at Dire Dawa University and beyond — through worship, biblical teaching, prayer, fellowship, and compassionate service. We exist to help every student encounter Christ and grow in Him.
                </p>
              </Card>
            </Col>

            <Col lg={6}>
              <Card className="h-100 border-0 shadow-sm p-5" style={{ ...hoverStyle, borderTop: '5px solid #10b981' }} onMouseEnter={handleEnter} onMouseLeave={handleLeave}>
                <Badge bg="success" text="dark" className="mb-3 align-self-start px-3 py-2 rounded-pill">
                  Our Vision
                </Badge>
                <h3 className="fw-bold text-white mb-3">Where We're Going</h3>
                <p style={{ lineHeight: 1.8, fontSize: '1.05rem', marginBottom: 0, color: '#cbd5e1' }}>
                  A generation of Ethiopian students transformed by the gospel — leaders of integrity, servants of their communities, and ambassadors of Christ. We envision a campus where faith is alive, hope is real, and love is visible.
                </p>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>

      {/* ═══════════════════════════════════════════ */}
      {/* CORE VALUES                                 */}
      {/* ═══════════════════════════════════════════ */}
      <div className="py-5">
        <Container>
          <div className="text-center mb-5">
            <h2 className="fw-bold mb-2" style={{ color: '#0ea5e9', fontSize: '2.5rem' }}>Our Core Values</h2>
            <p className="fs-5" style={{ color: '#94a3b8' }}>The convictions that shape who we are</p>
          </div>

          <Row className="g-4">
            {values.map((v, i) => (
              <Col md={6} lg={4} key={i}>
                <Card className="h-100 border-0 shadow-sm text-center p-4" style={hoverStyle} onMouseEnter={handleEnter} onMouseLeave={handleLeave}>
                  <div className="rounded-circle d-flex align-items-center justify-content-center mx-auto mb-4" style={{ width: '80px', height: '80px', background: v.gradient, boxShadow: '0 10px 20px rgba(0,0,0,0.3)' }}>
                    {v.icon}
                  </div>
                  <Card.Title className="fw-bold text-white fs-5 mb-3">
                    {v.title}
                  </Card.Title>
                  <Card.Text style={{ lineHeight: 1.7, color: '#cbd5e1' }}>
                    {v.text}
                  </Card.Text>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </div>

      {/* ═══════════════════════════════════════════ */}
      {/* OUR STORY (MODERN DARK TIMELINE)            */}
      {/* ═══════════════════════════════════════════ */}
      <div className="py-5">
        <Container>
          <div className="text-center mb-5">
            <h2 className="fw-bold mb-2" style={{ color: '#0ea5e9', fontSize: '2.5rem' }}>Our Story</h2>
            <p className="fs-5" style={{ color: '#94a3b8' }}>How God has led us this far</p>
          </div>

          <Row>
            <Col lg={8} className="mx-auto">
              <div className="position-relative" style={{ borderLeft: '3px solid #1f2937', marginLeft: '20px', paddingLeft: '30px' }}>
                {milestones.map((m, i) => (
                  <div key={i} className="mb-5 position-relative">
                    {/* Timeline Dot */}
                    <div className="position-absolute d-flex align-items-center justify-content-center" style={{ width: '36px', height: '36px', background: '#0ea5e9', borderRadius: '50%', left: '-49px', top: '0', border: '4px solid #0a0f1c', boxShadow: '0 0 15px rgba(14, 165, 233, 0.5)' }}>
                      <FaCheckCircle size={14} color="#0a0f1c" />
                    </div>
                    
                    {/* Timeline Content */}
                    <h4 className="fw-bold text-white mb-2">{m.year}</h4>
                    <p className="mb-0" style={{ lineHeight: 1.7, fontSize: '1.05rem', color: '#cbd5e1' }}>
                      {m.text}
                    </p>
                  </div>
                ))}
              </div>
            </Col>
          </Row>
        </Container>
      </div>

      {/* ═══════════════════════════════════════════ */}
      {/* WHAT WE BELIEVE                             */}
      {/* ═══════════════════════════════════════════ */}
      <div className="py-5">
        <Container>
          <Card className="border-0 shadow-lg p-4 p-md-5" style={{ borderRadius: '20px', background: '#111827', border: '1px solid #1f2937' }}>
            <h2 className="fw-bold mb-5 text-center" style={{ color: '#0ea5e9', fontSize: '2.5rem' }}>What We Believe</h2>
            <Row className="g-4">
              {beliefs.map((b, i) => (
                <Col md={6} key={i}>
                  <div className="d-flex align-items-start p-3 rounded-3" style={{ background: '#0a0f1c', border: '1px solid #1f2937', transition: 'all 0.3s' }} onMouseEnter={(e) => { e.currentTarget.style.background = '#1f2937'; e.currentTarget.style.borderColor = '#0ea5e9'; }} onMouseLeave={(e) => { e.currentTarget.style.background = '#0a0f1c'; e.currentTarget.style.borderColor = '#1f2937'; }}>
                    <div className="me-3 mt-1 flex-shrink-0">{b.icon}</div>
                    <span style={{ fontSize: '1.05rem', lineHeight: 1.6, color: '#f8fafc' }}>
                      <strong>{b.title}</strong> {b.text}
                    </span>
                  </div>
                </Col>
              ))}
            </Row>
          </Card>
        </Container>
      </div>

      {/* ═══════════════════════════════════════════ */}
      {/* CALL TO ACTION                              */}
      {/* ═══════════════════════════════════════════ */}
      <div className="py-5 text-white text-center position-relative overflow-hidden" style={{ background: 'radial-gradient(circle at 50% 100%, #1e3a8a 0%, #0a0f1c 70%)' }}>
        <Container className="py-5 position-relative" style={{ zIndex: 1 }}>
          <h2 className="display-5 fw-bold mb-3" style={{ color: '#0ea5e9' }}>Join Us</h2>
          <p className="lead mb-5 mx-auto" style={{ maxWidth: '640px', fontSize: '1.2rem', color: '#94a3b8' }}>
            Whether you're a student at Dire Dawa University or simply passing through, you are welcome to fellowship with us.
          </p>
          <Button as={Link} to="/contact" size="lg" className="fw-bold px-5 py-3 rounded-pill shadow-lg" style={{ background: '#0ea5e9', color: '#0a0f1c', border: 'none', fontSize: '1.1rem' }}>
            Get in Touch <FaArrowRight className="ms-2" />
          </Button>
        </Container>
      </div>

      <Footer />
    </div>
  );
}