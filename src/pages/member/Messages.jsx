import React, { useEffect, useState } from 'react';
import { Card, Form, Button, ListGroup, Alert, Spinner, Badge } from 'react-bootstrap';
import { FaReply, FaPaperPlane } from 'react-icons/fa';
import MemberLayout from '../../components/MemberLayout';
import api from '../../api/axios'; // Using central axios

export default function Messages() {
  const [messages, setMessages] = useState([]);
  const [subject, setSubject] = useState('');
  const [body, setBody] = useState('');
  const [msg, setMsg] = useState('');
  const [loading, setLoading] = useState(false);

  const user = JSON.parse(localStorage.getItem('user'));

  const loadMessages = () => {
    api.get('/messages')
      .then(res => {
        // Instead of filtering on the frontend, we fetch all and filter safely
        const allMessages = res.data || [];
        const mine = allMessages.filter(m => String(m.userId) === String(user.id));
        mine.sort((a, b) => b.id - a.id);
        setMessages(mine);
      })
      .catch((err) => console.error("Error fetching messages:", err));
  };

  useEffect(() => { loadMessages(); }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.post('/messages', {
        userId: user.id,
        subject,
        message: body,
        status: 'UNREAD'
      });
      setMsg('Message sent successfully!');
      setSubject(''); setBody('');
      loadMessages();
      setTimeout(() => setMsg(''), 3000);
    } catch (err) {
      console.error(err);
      setMsg('Failed to send message.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <MemberLayout title="Messages">
      <div style={{ background: '#0a0f1c', minHeight: '100vh', padding: '20px' }}>
        
        {/* SEND FORM */}
        <Card className="border-0 mb-4 shadow-sm" style={{ background: '#111827', border: '1px solid #1f2937' }}>
          <Card.Body>
            <h5 className="mb-3 text-white">Send Message to Admin</h5>
            {msg && <Alert variant={msg.includes('success') ? 'success' : 'danger'}>{msg}</Alert>}
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3">
                <Form.Control placeholder="Subject" value={subject}
                  onChange={e => setSubject(e.target.value)} required 
                  style={{ background: '#1f2937', color: 'white', border: '1px solid #374151' }} />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Control as="textarea" rows={4} placeholder="Your message"
                  value={body} onChange={e => setBody(e.target.value)} required 
                  style={{ background: '#1f2937', color: 'white', border: '1px solid #374151' }} />
              </Form.Group>
              <Button type="submit" disabled={loading} style={{ background: '#0ea5e9', border: 0, color: '#0a0f1c', fontWeight: 'bold' }}>
                {loading ? <Spinner size="sm" animation="border" /> : <><FaPaperPlane className="me-2" /> Send</>}
              </Button>
            </Form>
          </Card.Body>
        </Card>

        {/* HISTORY */}
        <Card className="border-0 shadow-sm" style={{ background: '#111827', border: '1px solid #1f2937' }}>
          <Card.Body>
            <h5 className="mb-3 text-white">Message History ({messages.length})</h5>

            {messages.length === 0 ? (
              <p className="text-muted text-center py-4">No messages yet.</p>
            ) : (
              <ListGroup variant="flush">
                {messages.map(m => {
                  const hasReply = m.reply && m.reply.trim() !== '';
                  return (
                    <ListGroup.Item key={m.id} className="py-3" style={{ background: 'transparent', borderColor: '#1f2937' }}>
                      <div className="d-flex justify-content-between align-items-center mb-2">
                        <strong className="text-white">{m.subject}</strong>
                        <Badge bg={hasReply ? 'success' : 'warning'} text="dark">
                          {hasReply ? 'Replied' : 'Pending'}
                        </Badge>
                      </div>

                      <div className="p-3 rounded mb-2" style={{ background: '#1f2937' }}>
                        <small className="text-info d-block mb-1"><strong>You:</strong></small>
                        <div className="text-light">{m.message}</div>
                      </div>

                      {hasReply ? (
                        <div className="p-3 rounded" style={{ background: '#0a0f1c', borderLeft: '3px solid #0ea5e9' }}>
                          <small className="d-block mb-1" style={{ color: '#0ea5e9' }}>
                            <FaReply className="me-1" /> <strong>Admin Reply:</strong>
                          </small>
                          <div className="text-light">{m.reply}</div>
                        </div>
                      ) : (
                        <small className="fst-italic" style={{ color: '#94a3b8' }}>
                          Waiting for admin reply...
                        </small>
                      )}
                    </ListGroup.Item>
                  );
                })}
              </ListGroup>
            )}
          </Card.Body>
        </Card>
      </div>
    </MemberLayout>
  );
}