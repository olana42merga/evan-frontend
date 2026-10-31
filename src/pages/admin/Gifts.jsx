import React, { useEffect, useState } from 'react';
import { Container, Card, Table, Button, Badge, Alert } from 'react-bootstrap';
import Header from '../../components/Header';
import api from '../../api/axios'; // Using central axios

export default function Gifts() {
  const [gifts, setGifts] = useState([]);
  const [msg, setMsg] = useState('');

  const load = () => {
    api.get('/gifts')
      .then(res => setGifts(Array.isArray(res.data) ? res.data : []))
      .catch((err) => console.error(err));
  };
  
  useEffect(() => { load(); }, []);

  const handleVerify = async (id) => {
    try {
      await api.put(`/gifts/${id}/verify`);
      setMsg('Gift verified successfully!');
      load();
      setTimeout(() => setMsg(''), 3000);
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this gift?')) {
      try {
        await api.delete(`/gifts/${id}`);
        load();
      } catch (err) {
        console.error(err);
      }
    }
  };

  const total = gifts.reduce((sum, g) => sum + (Number(g.amount) || 0), 0);

  return (
    <div style={{ background: '#0a0f1c', minHeight: '100vh', color: '#f8fafc' }}>
      <Header />
      <Container fluid className="p-4">
        <h2 className="fw-bold mb-4" style={{ color: '#0ea5e9' }}>Gifts Management</h2>

        {msg && <Alert variant="success">{msg}</Alert>}

        <Card className="border-0 shadow-sm mb-4" style={{ background: '#111827', border: '1px solid #1f2937' }}>
          <Card.Body>
            <h5 className="text-white">Total Gifts: <span style={{ color: '#10b981' }}>Br {total}</span></h5>
            <small style={{ color: '#94a3b8' }}>
              Verified: {gifts.filter(g => g.status === 'VERIFIED').length} / {gifts.length}
            </small>
          </Card.Body>
        </Card>

        <Card className="border-0 shadow-sm" style={{ background: '#111827', border: '1px solid #1f2937' }}>
          <Card.Body>
            <h5 className="text-white mb-3">All Gifts ({gifts.length})</h5>
            <div className="table-responsive">
              <Table hover className="mt-3" variant="dark" style={{ background: 'transparent' }}>
                <thead>
                  <tr style={{ borderBottom: '2px solid #1f2937' }}>
                    <th className="text-info">ID</th>
                    <th className="text-info">User ID</th>
                    <th className="text-info">Amount</th>
                    <th className="text-info">Method</th>
                    <th className="text-info">Transaction ID</th>
                    <th className="text-info">Status</th>
                    <th className="text-info">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {gifts.map(g => (
                    <tr key={g.id} style={{ verticalAlign: 'middle', borderColor: '#1f2937' }}>
                      <td>{g.id}</td>
                      <td>{g.userId}</td>
                      <td><strong className="text-light">Br {g.amount}</strong></td>
                      <td><Badge bg="info" text="dark">{g.method}</Badge></td>
                      <td className="text-secondary">{g.transactionId || '-'}</td>
                      <td>
                        <Badge bg={g.status === 'VERIFIED' ? 'success' : 'warning'} text="dark">
                          {g.status}
                        </Badge>
                      </td>
                      <td>
                        {g.status !== 'VERIFIED' && (
                          <Button size="sm" variant="outline-success" className="me-2" onClick={() => handleVerify(g.id)}>
                            Verify
                          </Button>
                        )}
                        <Button size="sm" variant="outline-danger" onClick={() => handleDelete(g.id)}>
                          Delete
                        </Button>
                      </td>
                    </tr>
                  ))}
                  {gifts.length === 0 && (
                    <tr><td colSpan="7" className="text-center py-4" style={{ color: '#94a3b8' }}>No gifts yet</td></tr>
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