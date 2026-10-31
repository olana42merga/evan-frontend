import React, { useEffect, useState } from 'react';
import { Container, Card, Row, Col, Spinner, Modal, Button } from 'react-bootstrap';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { FaArrowRight } from 'react-icons/fa';

const API = 'https://ddu-evangelical-backend-6.onrender.com/api';
const BASE = 'https://ddu-evangelical-backend-6.onrender.com';

export default function Posts() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    fetch(API + '/posts')
      .then(r => r.json())
      .then(d => setPosts(Array.isArray(d) ? d : []))
      .catch(() => setPosts([]))
      .finally(() => setLoading(false));
  }, []);

  const cardStyle = {
    cursor: 'pointer',
    transition: 'all 0.35s cubic-bezier(0.4, 0, 0.2, 1)',
    border: '2px solid transparent',
  };

  const onCardEnter = (e) => {
    e.currentTarget.style.transform = 'translateY(-8px)';
    e.currentTarget.style.boxShadow = '0 20px 40px rgba(0,0,0,0.15)';
    e.currentTarget.style.borderColor = '#3498db';
  };

  const onCardLeave = (e) => {
    e.currentTarget.style.transform = 'translateY(0)';
    e.currentTarget.style.boxShadow = '';
    e.currentTarget.style.borderColor = 'transparent';
  };

  return (
    <>
      <Header />
      <div className="bg-light py-5" style={{ minHeight: '80vh' }}>
        <Container>
          <div className="text-center mb-5">
            <h1 className="text-primary fw-bold mb-2">Latest Posts</h1>
            <p className="text-muted fs-5">Reflections and updates from our team</p>
          </div>

          {loading ? (
            <div className="text-center py-5"><Spinner animation="border" variant="primary" /></div>
          ) : posts.length === 0 ? (
            <Card className="border-0 shadow-sm p-5 text-center rounded-4 mx-auto" style={{ maxWidth: '600px' }}>
              <h5 className="text-muted fw-bold">No posts yet</h5>
              <p className="text-muted mb-0">Check back soon for updates from the team.</p>
            </Card>
          ) : (
            <Row xs={1} sm={2} md={2} lg={3} className="g-4">
              {posts.map(p => {
                const preview = p.content?.length > 150
                  ? p.content.substring(0, 150) + '...'
                  : p.content;
                return (
                  <Col key={p.id} className="d-flex">
                    <Card 
                      className="card-shadow border-0 w-100 d-flex flex-column rounded-4" 
                      style={{ ...cardStyle, minHeight: '380px' }}
                      onMouseEnter={onCardEnter}
                      onMouseLeave={onCardLeave}
                    >
                      {p.imagePath ? (
                        <div style={{ height: '180px', overflow: 'hidden', flexShrink: 0, borderTopLeftRadius: '0.5rem', borderTopRightRadius: '0.5rem' }}>
                          <img
                            src={BASE + p.imagePath}
                            alt={p.title}
                            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                          />
                        </div>
                      ) : (
                        <div style={{ height: '180px', background: '#e9ecef', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          <span className="text-muted">No image</span>
                        </div>
                      )}
                      <Card.Body className="d-flex flex-column p-4">
                        <Card.Title className="fw-bold" style={{ color: '#2c3e50' }}>{p.title}</Card.Title>
                        <Card.Text className="text-muted" style={{ whiteSpace: 'pre-wrap', flexGrow: 1 }}>
                          {preview}
                        </Card.Text>
                        {p.content?.length > 150 && (
                          <span
                            onClick={() => setSelected(p)}
                            className="text-primary fw-bold d-flex align-items-center mt-2"
                            style={{ cursor: 'pointer' }}
                          >
                            Read More <FaArrowRight className="ms-2" />
                          </span>
                        )}
                      </Card.Body>
                    </Card>
                  </Col>
                );
              })}
            </Row>
          )}
        </Container>
      </div>

      <Modal show={!!selected} onHide={() => setSelected(null)} size="lg" centered contentClassName="rounded-4 border-0 shadow-lg">
        <Modal.Header closeButton className="border-0 pb-0">
          <Modal.Title className="fw-bold">{selected?.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body className="p-4">
          {selected?.imagePath && (
            <img
              src={BASE + selected.imagePath}
              alt={selected.title}
              className="rounded-3 mb-4 w-100"
              style={{ maxHeight: '400px', objectFit: 'cover' }}
            />
          )}
          <p style={{ whiteSpace: 'pre-wrap', lineHeight: 1.8 }}>{selected?.content}</p>
        </Modal.Body>
        <Modal.Footer className="border-0 pt-0">
          <Button variant="secondary" className="rounded-pill px-4" onClick={() => setSelected(null)}>Close</Button>
        </Modal.Footer>
      </Modal>

      <Footer />
    </>
  );
}
