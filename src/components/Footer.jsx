import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import {
  FaChurch, FaTelegram, FaFacebook, FaYoutube, FaInstagram,
  FaEnvelope, FaPhone, FaMapMarkerAlt
} from 'react-icons/fa';
import { FaTiktok } from 'react-icons/fa6';

const TELEGRAM_URL = 'https://t.me/+iXVyakK4-3lhYzc0';
const TIKTOK_URL = 'https://www.tiktok.com/@focus.fellowship';
const FACEBOOK_URL = 'https://www.facebook.com/focusddufellowship';

export default function Footer() {
  return (
    <footer className="bg-dark text-white pt-5 pb-3 mt-5">
      <Container>
        <Row className="g-4">
          {/* ABOUT */}
          <Col md={4} className="mb-6">
            <div className="d-flex align-items-center mb-3">
              <FaChurch className="me-2 text-warning" size={26} />
              <h5 className="mb-0 fw-bold text-white">FOCUS DDU Evangelical Team</h5>
            </div>
            <p className="text-light small mb-2" style={{ opacity: 0.85 }}>
              A student-led Christian community at Dire Dawa University.
              Growing together in faith, fellowship, and service.
            </p>
            <p className="text-warning small fst-italic mb-0">
              "Faith • Fellowship • Service • Transformation"
            </p>
          </Col>

          {/* CONTACT */}
          <Col md={3} className="mb-3">
            <h6 className="fw-bold text-white mb-3">Contact</h6>
            <ul className="list-unstyled mb-0">
              <li className="mb-3 d-flex align-items-start">
                <FaMapMarkerAlt className="me-2 mt-1 text-primary flex-shrink-0" size={16} />
                <span className="text-light small" style={{ opacity: 0.85 }}>
                  Dire Dawa University
                </span>
              </li>
              <li className="mb-3 d-flex align-items-start">
                <FaEnvelope className="me-2 mt-1 text-primary flex-shrink-0" size={16} />
                <span className="text-light small" style={{ opacity: 0.85 }}>
                  info@ddu-evangelical.com
                </span>
              </li>
              <li className="mb-3 d-flex align-items-start">
                <FaPhone className="me-2 mt-1 text-primary flex-shrink-0" size={16} />
                <span className="text-light small" style={{ opacity: 0.85 }}>
                  +25106612678
                  +25141452771
                </span>
              </li>
            </ul>
          </Col>

          {/* CONNECT */}
          <Col md={3} className="mb-3">
            <h6 className="fw-bold text-white mb-3">Connect</h6>
            <ul className="list-unstyled mb-0">
              <li className="mb-3">
                <a
                  href={TELEGRAM_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-light text-decoration-none d-flex align-items-center"
                  style={{ opacity: 0.85 }}
                >
                  <FaTelegram className="me-2 flex-shrink-0" size={20} style={{ color: '#29b6f6' }} />
                  <span className="small">Telegram</span>
                </a>
              </li>
              <li className="mb-3">
                <a
                  href={TIKTOK_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-light text-decoration-none d-flex align-items-center"
                  style={{ opacity: 0.85 }}
                >
                  <FaTiktok className="me-2 flex-shrink-0" size={20} style={{ color: '#FE2C55' }} />
                  <span className="small">TikTok</span>
                </a>
              </li>
              <li className="mb-3">
                <a
                  href={FACEBOOK_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-light text-decoration-none d-flex align-items-center"
                  style={{ opacity: 0.85 }}
                >
                  <FaFacebook className="me-2 flex-shrink-0" size={20} style={{ color: '#1877F2' }} />
                  <span className="small">Facebook</span>
                </a>
              </li>
              <li className="mb-3">
                <a href="#" className="text-light text-decoration-none d-flex align-items-center" style={{ opacity: 0.85 }}>
                  <FaYoutube className="me-2 flex-shrink-0" size={20} style={{ color: '#FF0000' }} />
                  <span className="small">YouTube</span>
                </a>
              </li>
              <li className="mb-3">
                <a href="#" className="text-light text-decoration-none d-flex align-items-center" style={{ opacity: 0.85 }}>
                  <FaInstagram className="me-2 flex-shrink-0" size={20} style={{ color: '#E1306C' }} />
                  <span className="small">Instagram</span>
                </a>
              </li>
            </ul>
          </Col>
        </Row>

        <hr className="my-4 border-secondary" />

        <div className="text-center">
          <small className="text-light" style={{ opacity: 0.7 }}>
            2026 FOCUS DDU Evangelical Team. All rights reserved.
          </small>
        </div>
      </Container>
    </footer>
  );
}
