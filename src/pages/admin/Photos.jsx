import React, { useEffect, useState } from 'react';
import { Container, Card, Table, Button, Form, Row, Col, Alert, Spinner } from 'react-bootstrap';
import Header from '../../components/Header';

const API = 'https://ddu-evangelical-backend-6.onrender.com/api';
const BASE = 'https://ddu-evangelical-backend-6.onrender.com';

export default function Photos() {
  const [photos, setPhotos] = useState([]);
  const [file, setFile] = useState(null);
  const [title, setTitle] = useState('');
  const [msg, setMsg] = useState('');
  const [loading, setLoading] = useState(false);

  const load = () => {
    fetch(API + '/photos').then(r => r.json()).then(d => setPhotos(Array.isArray(d) ? d : [])).catch(() => {});
  };
  useEffect(() => { load(); }, []);

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file) { setMsg('Choose a file first'); return; }
    setLoading(true);
    const fd = new FormData();
    fd.append('file', file);
    fd.append('title', title || file.name);

    try {
      const res = await fetch(API + '/photos/upload', { method: 'POST', body: fd });
      if (res.ok) {
        setMsg('Photo uploaded successfully!');
        setFile(null); setTitle('');
        e.target.reset();
        load();
        setTimeout(() => setMsg(''), 3000);
      } else {
        setMsg('Upload failed');
      }
    } catch { setMsg('Network error'); }
    finally { setLoading(false); }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Delete this photo?')) {
      await fetch(API + '/photos/' + id, { method: 'DELETE' });
      load();
    }
  };

  return (
    <div style={{ background: '#0a0f1c', minHeight: '100vh', color: '#f8fafc' }}>
      <Header />
      <Container fluid className="p-4">
        <h2 className="fw-bold mb-4" style={{ color: '#0ea5e9' }}>Photos Management</h2>

        {msg && <Alert variant={msg.includes('success') ? 'success' : 'danger'}>{msg}</Alert>}

        <Card className="border-0 shadow-sm mb-4" style={{ background: '#111827', border: '1px solid #1f2937' }}>
          <Card.Body>
            <h5 className="text-white mb-3">Upload Photo</h5>
            <Form onSubmit={handleUpload}>
              <Row className="g-2">
                <Col md={5}>
                  <Form.Control type="file" accept="image/*"
                    onChange={e => setFile(e.target.files[0])} required 
                    style={{ background: '#1f2937', color: 'white', border: '1px solid #374151' }} />
                </Col>
                <Col md={5}>
                  <Form.Control placeholder="Title (optional)" value={title}
                    onChange={e => setTitle(e.target.value)} 
                    style={{ background: '#1f2937', color: 'white', border: '1px solid #374151' }} />
                </Col>
                <Col md={2}>
                  <Button type="submit" className="w-100 fw-bold" style={{ background: '#0ea5e9', border: 0, color: '#0a0f1c' }} disabled={loading}>
                    {loading ? <Spinner size="sm" animation="border" /> : 'Upload'}
                  </Button>
                </Col>
              </Row>
            </Form>
          </Card.Body>
        </Card>

        <Card className="border-0 shadow-sm" style={{ background: '#111827', border: '1px solid #1f2937' }}>
          <Card.Body>
            <h5 className="text-white mb-3">All Photos ({photos.length})</h5>
            <Row className="g-3 mt-3">
              {photos.map(p => (
                <Col md={3} key={p.id}>
                  <Card className="border-0 shadow-sm" style={{ background: '#1f2937' }}>
                    <img
                      src={`${BASE}/api/photos/view/${p.id}`} // <-- UPDATED TO NEW ENDPOINT
                      alt={p.title}
                      style={{ height: '200px', objectFit: 'cover' }}
                      onError={(e) => e.target.src = 'https://via.placeholder.com/300x200?text=No+Image'}
                    />
                    <Card.Body className="p-2">
                      <div className="d-flex justify-content-between align-items-center">
                        <small className="text-truncate text-light">{p.title}</small>
                        <Button size="sm" variant="danger" onClick={() => handleDelete(p.id)}>
                          Delete
                        </Button>
                      </div>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
              {photos.length === 0 && (
                <Col><p className="text-center" style={{ color: '#94a3b8' }}>No photos yet</p></Col>
              )}
            </Row>
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
}