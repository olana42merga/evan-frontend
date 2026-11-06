import React, { useEffect, useState } from 'react';
import { Card, Row, Col, Spinner, Button, Modal } from 'react-bootstrap';
import { FaDownload, FaImage } from 'react-icons/fa';
import MemberLayout from '../../components/MemberLayout';

const API = 'https://ddu-evangelical-backend-6.onrender.com/api';
const BASE = 'https://ddu-evangelical-backend-6.onrender.com';

export default function MemberPhotos() {
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    fetch(API + '/photos')
      .then(r => r.json())
      .then(d => setPhotos(Array.isArray(d) ? d : []))
      .catch(() => setPhotos([]))
      .finally(() => setLoading(false));
  }, []);

  const handleDownload = (id, name) => {
    const link = document.createElement('a');
    link.href = `${BASE}/api/photos/view/${id}`; // <-- UPDATED
    link.download = name || 'photo.jpg';
    link.target = '_blank';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <MemberLayout title="Photos">
      {loading ? (
        <div className="text-center py-5"><Spinner animation="border" variant="info" /></div>
      ) : photos.length === 0 ? (
        <div className="text-center py-5">
          <FaImage size={48} className="text-secondary mb-3" />
          <p style={{ color: '#94a3b8' }}>No photos available yet.</p>
        </div>
      ) : (
        <Row xs={1} sm={2} md={3} lg={4} className="g-3">
          {photos.map(p => (
            <Col key={p.id}>
              <Card className="border-0 shadow-sm h-100" style={{ background: '#111827', border: '1px solid #1f2937' }}>
                <div
                  style={{ height: '200px', overflow: 'hidden', cursor: 'pointer' }}
                  onClick={() => setSelected(p)}
                >
                  <img
                    src={`${BASE}/api/photos/view/${p.id}`} // <-- UPDATED
                    alt={p.title}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                </div>
                <Card.Body className="p-3">
                  <Card.Title className="h6 mb-2 text-white">{p.title}</Card.Title>
                  <div className="d-flex gap-2">
                    <Button
                      size="sm"
                      variant="outline-info"
                      className="flex-fill"
                      onClick={() => setSelected(p)}
                    >
                      View
                    </Button>
                    <Button
                      size="sm"
                      style={{ background: '#0ea5e9', border: 0, color: '#0a0f1c' }}
                      className="flex-fill fw-bold"
                      onClick={() => handleDownload(p.id, p.title + '.jpg')}
                    >
                      <FaDownload /> Download
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      )}

      {/* VIEW MODAL */}
      <Modal show={!!selected} onHide={() => setSelected(null)} size="lg" centered contentClassName="bg-dark text-light border-secondary">
        <Modal.Header closeButton closeVariant="white" className="border-secondary">
          <Modal.Title style={{ color: '#0ea5e9' }}>{selected?.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body className="text-center">
          <img
            src={`${BASE}/api/photos/view/${selected?.id}`} // <-- UPDATED
            alt={selected?.title}
            style={{ maxWidth: '100%', maxHeight: '70vh', borderRadius: '8px' }}
          />
        </Modal.Body>
        <Modal.Footer className="border-secondary">
          <Button
            style={{ background: '#0ea5e9', border: 0, color: '#0a0f1c' }}
            className="fw-bold"
            onClick={() => handleDownload(selected?.id, selected?.title + '.jpg')}
          >
            <FaDownload /> Download
          </Button>
          <Button variant="secondary" onClick={() => setSelected(null)}>Close</Button>
        </Modal.Footer>
      </Modal>
    </MemberLayout>
  );
}