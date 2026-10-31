import React from 'react';
import { Container, Card, Row, Col, Button } from 'react-bootstrap';
import { FaPhone, FaUniversity, FaCopy, FaArrowLeft } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

export default function Giving() {
  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    alert('Copied: ' + text);
  };

  return (
    <>
      <Header />
      <Container className="py-5">
        <Link to="/" className="text-decoration-none text-primary mb-3 d-inline-block">
          <FaArrowLeft /> Back to Home
        </Link>

        <h1 className="text-primary mb-2">Support the Ministry</h1>
        <p className="text-muted mb-5">
          Your generous giving helps us continue the work of sharing the Gospel,
          supporting students, and serving our community.
        </p>

        <Row className="g-4">
          {/* TELEBIRR */}
          <Col md={6}>
            <Card className="card-shadow border-0 h-100">
              <Card.Body className="p-4">
                <div className="text-center mb-3">
                  <FaPhone size={48} className="text-success" />
                </div>
                <h3 className="text-center text-success">Telebirr</h3>
                <hr />
                <div className="text-center">
                  <p className="text-muted mb-1">Account Number</p>
                  <h4 className="fw-bold">+251</h4>
                  <p className="text-muted mb-1 mt-3">Account Name</p>
                  <h5>DDU Evangelical Team</h5>
                  <Button
                    variant="success"
                    className="mt-3"
                    onClick={() => copyToClipboard('+25')}
                  >
                    <FaCopy className="me-2" /> Copy Number
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </Col>

          {/* CBE BANK */}
          <Col md={6}>
            <Card className="card-shadow border-0 h-100">
              <Card.Body className="p-4">
                <div className="text-center mb-3">
                  <FaUniversity size={48} className="text-primary" />
                </div>
                <h3 className="text-center text-primary">CBE Bank</h3>
                <hr />
                <div className="text-center">
                  <p className="text-muted mb-1">Account Number</p>
                  <h4 className="fw-bold">1000 102769523</h4>
                  <p className="text-muted mb-1 mt-3">Account Name</p>
                  <h5>Bedhatu fayisa</h5>
                  <p className="text-muted mb-1 mt-3">Branch</p>
                  <h5>Dire Dawa Main Branch</h5>
                  <Button
                    variant="primary"
                    className="mt-3"
                    onClick={() => copyToClipboard('1000102769523')}
                  >
                    <FaCopy className="me-2" /> Copy Number
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* SCRIPTURE */}
        <Card className="card-shadow border-0 mt-5">
          <Card.Body className="p-4 text-center">
            <p className="fst-italic mb-2" style={{ fontSize: '1.1rem' }}>
              "Each of you should give what you have decided in your heart to give,
              not reluctantly or under compulsion, for God loves a cheerful giver."
            </p>
            <small className="text-muted">? 2 Corinthians 9:7 (NIV)</small>
          </Card.Body>
        </Card>
      </Container>
      <Footer />
    </>
  );
}
