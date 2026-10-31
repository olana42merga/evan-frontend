import React, { useEffect, useState } from 'react';
import { Container, Card, Table } from 'react-bootstrap';
import Sidebar from '../../components/Sidebar';
import { getGifts } from '../../api/gifts';
const API = 'https://ddu-evangelical-backend-6.onrender.com/api';

export default function MyGifts() {
  const [gifts, setGifts] = useState([]);

  useEffect(() => {
    getGifts().then(res => setGifts(res.data)).catch(err => console.log(err));
  }, []);

  return (
    <div className="d-flex">
      <Sidebar />
      <Container fluid className="p-4">
        <h2 className="text-primary mb-4">My Gifts</h2>
        <Card className="card-shadow border-0">
          <Card.Body>
            {gifts.length === 0 ? (
              <p className="text-muted text-center py-4">No gifts yet.</p>
            ) : (
              <Table striped hover responsive>
                <thead>
                  <tr><th>ID</th><th>Amount</th><th>Method</th><th>Status</th></tr>
                </thead>
                <tbody>
                  {gifts.map(g => (
                    <tr key={g.id}>
                      <td>{g.id}</td>
                      <td>Br {g.amount}</td>
                      <td>{g.method}</td>
                      <td>{g.status}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            )}
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
}
