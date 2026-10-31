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
    if (!file) { setMsg('? Choose a PDF file'); return; }
    setLoading(true);
    const fd = new FormData();
    fd.append('file', file);
    fd.append('title', title || file.name);

    try {
      const res = await fetch(API + '/pdfs/upload', { method: 'POST', body: fd });
      if (res.ok) {
        setMsg('? PDF uploaded!');
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
    if (window.confirm('Delete this PDF?')) {
      await fetch(API + '/pdfs/' + id, { method: 'DELETE' });
      load();
    }
  };

  return (
    <>
      <Header />
      <Container fluid className="p-4">
        <h2 className="text-primary mb-4">PDFs Management</h2>

        {msg && <Alert variant={msg.startsWith('?') ? 'success' : 'danger'}>{msg}</Alert>}

        <Card className="card-shadow border-0 mb-4">
          <Card.Body>
            <h5>Upload PDF</h5>
            <Form onSubmit={handleUpload}>
              <Row className="g-2">
                <Col md={5}>
                  <Form.Control type="file" accept="application/pdf"
                    onChange={e => setFile(e.target.files[0])} required />
                </Col>
                <Col md={5}>
                  <Form.Control placeholder="Title (optional)" value={title}
                    onChange={e => setTitle(e.target.value)} />
                </Col>
                <Col md={2}>
                  <Button type="submit" variant="danger" className="w-100" disabled={loading}>
                    {loading ? <Spinner size="sm" animation="border" /> : 'Upload'}
                  </Button>
                </Col>
              </Row>
            </Form>
          </Card.Body>
        </Card>

        <Card className="card-shadow border-0">
          <Card.Body>
            <h5>All PDFs ({pdfs.length})</h5>
            <Table striped hover className="mt-3">
              <thead>
                <tr><th>ID</th><th>Title</th><th>File</th><th>Actions</th></tr>
              </thead>
              <tbody>
                {pdfs.map(p => (
                  <tr key={p.id}>
                    <td>{p.id}</td>
                    <td>{p.title}</td>
                    <td>
                      <a href={BASE + p.filePath} target="_blank" rel="noopener noreferrer">
                        View PDF
                      </a>
                    </td>
                    <td>
                      <Button size="sm" variant="danger" onClick={() => handleDelete(p.id)}>
                        Delete
                      </Button>
                    </td>
                  </tr>
                ))}
                {pdfs.length === 0 && (
                  <tr><td colSpan="4" className="text-center text-muted">No PDFs yet</td></tr>
                )}
              </tbody>
            </Table>
          </Card.Body>
        </Card>
      </Container>
    </>
  );
}
