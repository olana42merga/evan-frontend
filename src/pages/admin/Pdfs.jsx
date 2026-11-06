import React, { useEffect, useState } from 'react';
import { Container, Card, Table, Button, Form, Row, Col, Alert, Spinner } from 'react-bootstrap';
import Header from '../../components/Header';

const API = 'https://ddu-evangelical-backend-6.onrender.com/api';
const BASE = 'https://ddu-evangelical-backend-6.onrender.com';

export default function Pdfs() {
  const [pdfs, setPdfs] = useState([]);
  const [file, setFile] = useState(null);
  const [title, setTitle] = useState('');
  const [msg, setMsg] = useState('');
  const [loading, setLoading] = useState(false);

  const load = () => {
    fetch(API + '/pdfs').then(r => r.json()).then(d => setPdfs(Array.isArray(d) ? d : [])).catch(() => {});
  };
  useEffect(() => { load(); }, []);

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file) { setMsg('Choose a PDF file'); return; }
    setLoading(true);
    const fd = new FormData();
    fd.append('file', file);
    fd.append('title', title || file.name);

    try {
      const res = await fetch(API + '/pdfs/upload', { method: 'POST', body: fd });
      if (res.ok) {
        setMsg('PDF uploaded!');
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
    if (window.confirm('Delete this PDF?')) {
      await fetch(API + '/pdfs/' + id, { method: 'DELETE' });
      load();
    }
  };

  const inputStyle = { background: '#1f2937', color: 'white', border: '1px solid #374151' };

  return (
    <div style={{ background: '#0a0f1c', minHeight: '100vh', color: '#f8fafc' }}>
      <Header />
      <Container fluid className="p-4">
        <h2 className="fw-bold mb-4" style={{ color: '#0ea5e9' }}>PDFs Management</h2>

        {msg && <Alert variant={msg.includes('failed') || msg.includes('Network') ? 'danger' : 'success'}>{msg}</Alert>}

        <Card className="border-0 shadow-sm mb-4" style={{ background: '#111827', border: '1px solid #1f2937' }}>
          <Card.Body>
            <h5 className="text-white mb-3">Upload PDF</h5>
            <Form onSubmit={handleUpload}>
              <Row className="g-2">
                <Col md={5}>
                  <Form.Control type="file" accept="application/pdf"
                    onChange={e => setFile(e.target.files[0])} required style={inputStyle} />
                </Col>
                <Col md={5}>
                  <Form.Control placeholder="Title (optional)" value={title}
                    onChange={e => setTitle(e.target.value)} style={inputStyle} />
                </Col>
                <Col md={2}>
                  <Button type="submit" className="w-100 fw-bold" style={{ background: '#ef4444', border: 0 }} disabled={loading}>
                    {loading ? <Spinner size="sm" animation="border" /> : 'Upload'}
                  </Button>
                </Col>
              </Row>
            </Form>
          </Card.Body>
        </Card>

        <Card className="border-0 shadow-sm" style={{ background: '#111827', border: '1px solid #1f2937' }}>
          <Card.Body>
            <h5 className="text-white mb-3">All PDFs ({pdfs.length})</h5>
            <div className="table-responsive">
              <Table hover className="mt-3" variant="dark" style={{ background: 'transparent' }}>
                <thead>
                  <tr style={{ borderBottom: '2px solid #1f2937' }}>
                    <th className="text-info">ID</th>
                    <th className="text-info">Title</th>
                    <th className="text-info">File</th>
                    <th className="text-info">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {pdfs.map(p => (
                    <tr key={p.id} style={{ verticalAlign: 'middle', borderColor: '#1f2937' }}>
                      <td>{p.id}</td>
                      <td className="text-light">{p.title}</td>
                      <td>
                        {/* UPDATED: Uses the database download endpoint */}
                        <a href={`${BASE}/api/pdfs/download/${p.id}`} target="_blank" rel="noopener noreferrer" style={{ color: '#0ea5e9', textDecoration: 'none' }}>
                          View PDF
                        </a>
                      </td>
                      <td>
                        <Button size="sm" variant="outline-danger" onClick={() => handleDelete(p.id)}>
                          Delete
                        </Button>
                      </td>
                    </tr>
                  ))}
                  {pdfs.length === 0 && (
                    <tr><td colSpan="4" className="text-center py-4" style={{ color: '#94a3b8' }}>No PDFs yet</td></tr>
                  )}
                </tbody>
              </Table>
            </div>
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
}