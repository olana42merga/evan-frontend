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

  const handleDownload = (url, name) => {
    const link = document.createElement('a');
    link.href = BASE + url;
    link.download = name || 'photo.jpg';
    link.target = '_blank';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <MemberLayout title="Photos">
      {loading ? (
        <div className="text-center py-5"><Spinner animation="border" /></div>
      ) : photos.length === 0 ? (
        <div className="text-center py-5">
          <FaImage size={48} className="text-muted mb-3" />
          <p className="text-muted">No photos available yet.</p>
        </div>
      ) : (
        <Row xs={1} sm={2} md={3} lg={4} className="g-3">
          {photos.map(p => (
            <Col key={p.id}>
              <Card className="card-shadow border-0 h-100">
                <div
                  style={{ height: '200px', overflow: 'hidden', cursor: 'pointer' }}
                  onClick={() => setSelected(p)}
                >
                  <img
                    src={BASE + p.filePath}
                    alt={p.title}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                </div>
                <Card.Body className="p-3">
                  <Card.Title className="h6 mb-2">{p.title}</Card.Title>
                  <div className="d-flex gap-2">
                    <Button
                      size="sm"
                      variant="outline-primary"
                      className="flex-fill"
                      onClick={() => setSelected(p)}
                    >
                      View
                    </Button>
                    <Button
                      size="sm"
                      variant="primary"
                      className="flex-fill"
                      onClick={() => handleDownload(p.filePath, p.title + '.jpg')}
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
      <Modal show={!!selected} onHide={() => setSelected(null)} size="lg" centered>
        <Modal.Header closeButton>
          <Modal.Title>{selected?.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body className="text-center">
          <img
            src={BASE + selected?.filePath}
            alt={selected?.title}
            style={{ maxWidth: '100%', maxHeight: '70vh', borderRadius: '8px' }}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="primary"
            onClick={() => handleDownload(selected?.filePath, selected?.title + '.jpg')}
          >
            <FaDownload /> Download
          </Button>
          <Button variant="secondary" onClick={() => setSelected(null)}>Close</Button>
        </Modal.Footer>
      </Modal>
    </MemberLayout>
  );
}
