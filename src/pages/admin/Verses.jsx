import React, { useEffect, useState } from 'react';
import { Container, Card, Table, Button, Form, Row, Col, Alert } from 'react-bootstrap';
import Header from '../../components/Header';
import { getVerses, addVerse, deleteVerse } from '../../api/verses';
const API = 'https://ddu-evangelical-backend-6.onrender.com/api';
const BASE = 'https://ddu-evangelical-backend-6.onrender.com';
export default function Verses() {
  const [verses, setVerses] = useState([]);
  const [ref, setRef] = useState('');
  const [text, setText] = useState('');
  const [trans, setTrans] = useState('NIV');
  const [msg, setMsg] = useState('');

  const load = () => {
    getVerses().then(r => setVerses(r.data)).catch(err => console.log(err));
  };
  useEffect(() => { load(); }, []);

  const handleAdd = async (e) => {
    e.preventDefault();
    try {
      await addVerse({ reference: ref, verseText: text, translation: trans });
      setMsg('Verse added!');
      setRef(''); setText(''); setTrans('NIV');
      load();
      setTimeout(() => setMsg(''), 3000);
    } catch { setMsg('Failed to add verse'); }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Delete this verse?')) {
      await deleteVerse(id);
      load();
    }
  };

  return (
    <>
      <Header />
      <Container fluid className="p-4">
        <h2 className="text-primary mb-4">Verses Management</h2>

        {msg && <Alert variant="success">{msg}</Alert>}

        <Card className="card-shadow border-0 mb-4">
          <Card.Body>
            <h5>Add New Verse</h5>
            <Form onSubmit={handleAdd}>
              <Row className="g-2">
                <Col md={3}>
                  <Form.Control placeholder="Reference (e.g. John 3:16)"
                    value={ref} onChange={e => setRef(e.target.value)} required />
                </Col>
                <Col md={5}>
                  <Form.Control placeholder="Verse text"
                    value={text} onChange={e => setText(e.target.value)} required />
                </Col>
                <Col md={2}>
                  <Form.Select value={trans} onChange={e => setTrans(e.target.value)}>
                    <option value="NIV">NIV (English)</option>
                    <option value="KJV">KJV (English)</option>
                    <option value="ESV">ESV (English)</option>
                    <option value="NLT">NLT (English)</option>
                    <option value="KQ">KQ (Afaan Oromo)</option>
                    <option value="AMH">???? (Amharic)</option>
                    <option value="TIG">???? (Tigrinya)</option>
                    <option value="OTHER">Other</option>
                  </Form.Select>
                </Col>
                <Col md={2}>
                  <Button type="submit" variant="primary" className="w-100">Add Verse</Button>
                </Col>
              </Row>
            </Form>
          </Card.Body>
        </Card>

        <Card className="card-shadow border-0">
          <Card.Body>
            <h5>All Verses ({verses.length})</h5>
            <Table striped hover responsive className="mt-3">
              <thead>
                <tr><th>ID</th><th>Reference</th><th>Verse Text</th><th>Translation</th><th>Actions</th></tr>
              </thead>
              <tbody>
                {verses.map(v => (
                  <tr key={v.id}>
                    <td>{v.id}</td>
                    <td><strong>{v.reference}</strong></td>
                    <td>{v.verseText?.substring(0, 80)}...</td>
                    <td><span className="badge bg-info">{v.translation}</span></td>
                    <td>
                      <Button size="sm" variant="danger" onClick={() => handleDelete(v.id)}>
                        Delete
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Card.Body>
        </Card>
      </Container>
    </>
  );
}
