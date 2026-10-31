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
    if (!file) { setMsg('? Choose a file first'); return; }
    setLoading(true);
    const fd = new FormData();
    fd.append('file', file);
    fd.append('title', title || file.name);

    try {
      const res = await fetch(API + '/photos/upload', { method: 'POST', body: fd });
      if (res.ok) {
        setMsg('? Photo uploaded!');
        setFile(null); setTitle('');
        e.target.reset();
        load();
        setTimeout(() => setMsg(''), 3000);
      } else {
        setMsg('? Upload failed');
      }
    } catch { setMsg('? Network error'); }
    finally { setLoading(false); }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Delete this photo?')) {
      await fetch(API + '/photos/' + id, { method: 'DELETE' });
      load();
    }
  };

  return (
    <>
      <Header />
      <Container fluid className="p-4">
        <h2 className="text-primary mb-4">Photos Management</h2>

        {msg && <Alert variant={msg.startsWith('?') ? 'success' : 'danger'}>{msg}</Alert>}

        <Card className="card-shadow border-0 mb-4">
          <Card.Body>
            <h5>Upload Photo</h5>
            <Form onSubmit={handleUpload}>
              <Row className="g-2">
                <Col md={5}>
                  <Form.Control type="file" accept="image/*"
                    onChange={e => setFile(e.target.files[0])} required />
                </Col>
                <Col md={5}>
                  <Form.Control placeholder="Title (optional)" value={title}
                    onChange={e => setTitle(e.target.value)} />
                </Col>
                <Col md={2}>
                  <Button type="submit" variant="warning" className="w-100" disabled={loading}>
                    {loading ? <Spinner size="sm" animation="border" /> : 'Upload'}
                  </Button>
                </Col>
              </Row>
            </Form>
          </Card.Body>
        </Card>

        <Card className="card-shadow border-0">
          <Card.Body>
            <h5>All Photos ({photos.length})</h5>
            <Row className="g-3 mt-3">
              {photos.map(p => (
                <Col md={3} key={p.id}>
                  <Card className="border-0 card-shadow">
                    <img
                      src={BASE + p.filePath}
                      alt={p.title}
                      style={{ height: '200px', objectFit: 'cover' }}
                      onError={(e) => e.target.src = 'https://via.placeholder.com/300x200?text=No+Image'}
                    />
                    <Card.Body className="p-2">
                      <div className="d-flex justify-content-between align-items-center">
                        <small className="text-truncate">{p.title}</small>
                        <Button size="sm" variant="danger" onClick={() => handleDelete(p.id)}>
                          Delete
                        </Button>
                      </div>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
              {photos.length === 0 && (
                <Col><p className="text-muted text-center">No photos yet</p></Col>
              )}
            </Row>
          </Card.Body>
        </Card>
      </Container>
    </>
  );
}
