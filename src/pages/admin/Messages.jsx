import React, { useEffect, useState } from 'react';
import { Container, Card, Table, Button, Form, Modal, Alert, Badge } from 'react-bootstrap';
import Header from '../../components/Header';
import api from '../../api/axios'; // Using central axios

export default function Messages() {
  const [messages, setMessages] = useState([]);
  const [showReply, setShowReply] = useState(false);
  const [selected, setSelected] = useState(null);
  const [reply, setReply] = useState('');
  const [msg, setMsg] = useState('');

  const load = () => {
    api.get('/messages')
      .then(res => setMessages(Array.isArray(res.data) ? res.data : []))
      .catch((err) => console.error(err));
  };
  
  useEffect(() => { load(); }, []);

  const openReply = (m) => {
    setSelected(m);
    setReply(m.reply || '');
    setShowReply(true);
  };

  const handleReply = async (e) => {
    e.preventDefault();
    try {
      await api.put(`/messages/${selected.id}/reply`, { reply });
      setMsg('Reply sent successfully!');
      setShowReply(false);
      load();
      setTimeout(() => setMsg(''), 3000);
    } catch (err) {
      console.error(err);
      setMsg('Failed to send reply.');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Delete this message?')) {
      try {
        await api.delete(`/messages/${id}`);
        load();
      } catch (err) {
        console.error(err);
      }
    }
  };

  return (
    <div style={{ background: '#0a0f1c', minHeight: '100vh', color: '#f8fafc' }}>
      <Header />
      <Container fluid className="p-4">
        <h2 className="fw-bold mb-4" style={{ color: '#0ea5e9' }}>Messages Management</h2>

        {msg && <Alert variant={msg.includes('success') ? 'success' : 'danger'}>{msg}</Alert>}

        <Card className="border-0 shadow-sm" style={{ background: '#111827', border: '1px solid #1f2937' }}>
          <Card.Body>
            <h5 className="text-white mb-3">All Messages ({messages.length})</h5>
            <div className="table-responsive">
              <Table hover className="mt-3" variant="dark" style={{ background: 'transparent' }}>
                <thead>
                  <tr style={{ borderBottom: '2px solid #1f2937' }}>
                    <th className="text-info">ID</th>
                    <th className="text-info">User ID</th>
                    <th className="text-info">Subject</th>
                    <th className="text-info">Message</th>
                    <th className="text-info">Reply</th>
                    <th className="text-info">Status</th>
                    <th className="text-info">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {messages.map(m => (
                    <tr key={m.id} style={{ verticalAlign: 'middle', borderColor: '#1f2937' }}>
                      <td>{m.id}</td>
                      <td>{m.userId}</td>
                      <td><strong className="text-white">{m.subject}</strong></td>
                      <td className="text-secondary">{m.message}</td>
                      <td className="text-secondary small">{m.reply || '-'}</td>
                      <td>
                        <Badge bg={m.status === 'REPLIED' ? 'success' : 'warning'} text="dark">
                          {m.status}
                        </Badge>
                      </td>
                      <td>
                        <Button size="sm" className="me-2" onClick={() => openReply(m)} style={{ background: '#0ea5e9', border: 0, color: '#0a0f1c', fontWeight: 'bold' }}>
                          Reply
                        </Button>
                        <Button size="sm" variant="outline-danger" onClick={() => handleDelete(m.id)}>
                          Delete
                        </Button>
                      </td>
                    </tr>
                  ))}
                  {messages.length === 0 && (
                    <tr><td colSpan="7" className="text-center text-muted py-4">No messages yet</td></tr>
                  )}
                </tbody>
              </Table>
            </div>
          </Card.Body>
        </Card>

        {/* Reply Modal */}
        <Modal show={showReply} onHide={() => setShowReply(false)} centered contentClassName="bg-dark text-light border-secondary">
          <Modal.Header closeButton closeVariant="white" className="border-secondary">
            <Modal.Title>Reply to Message #{selected?.id}</Modal.Title>
          </Modal.Header>
          <Form onSubmit={handleReply}>
            <Modal.Body>
              <p><strong className="text-info">From User ID:</strong> {selected?.userId}</p>
              <p><strong className="text-info">Subject:</strong> {selected?.subject}</p>
              <p><strong className="text-info">Message:</strong></p>
              <p className="text-secondary bg-dark p-3 rounded border border-secondary">{selected?.message}</p>
              <Form.Group>
                <Form.Label className="text-info fw-bold">Your Reply</Form.Label>
                <Form.Control as="textarea" rows={4} value={reply}
                  onChange={e => setReply(e.target.value)} required 
                  style={{ background: '#1f2937', color: 'white', border: '1px solid #374151' }} />
              </Form.Group>
            </Modal.Body>
            <Modal.Footer className="border-secondary">
              <Button variant="secondary" onClick={() => setShowReply(false)}>Cancel</Button>
              <Button type="submit" style={{ background: '#0ea5e9', border: 0, color: '#0a0f1c', fontWeight: 'bold' }}>Send Reply</Button>
            </Modal.Footer>
          </Form>
        </Modal>
      </Container>
    </div>
  );
}