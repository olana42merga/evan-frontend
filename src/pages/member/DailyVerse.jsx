import React, { useEffect, useState } from 'react';
import { Container, Card, Spinner } from 'react-bootstrap';
import { FaBook } from 'react-icons/fa';
import Sidebar from '../../components/Sidebar';
import api from '../../api/axios'; // Use central axios to guarantee the right URL

export default function DailyVerse() {
  const [verse, setVerse] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Using the central api instance
    api.get('/verses')
      .then(res => {
        const d = res.data;
        if (Array.isArray(d) && d.length > 0) {
          // Grab the newest verse. If backend returns newest first, this is d[0].
          // If it returns oldest first, this is d[d.length - 1].
          // We will assume the backend returns an array and we just grab the first one.
          setVerse(d[0]); 
        }
      })
      .catch((err) => console.error("Error fetching verse:", err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="d-flex" style={{ background: '#0a0f1c', minHeight: '100vh', color: '#f8fafc' }}>
      <Sidebar />
      <Container fluid className="p-4">
        <h2 className="fw-bold mb-4" style={{ color: '#0ea5e9' }}>Daily Verse</h2>

        {loading ? (
          <div className="text-center py-5"><Spinner animation="border" variant="info" /></div>
        ) : verse ? (
          <Card 
            className="shadow-lg border-0" 
            style={{ maxWidth: '700px', background: '#111827', border: '1px solid #1f2937', borderRadius: '20px' }}
          >
            <Card.Body className="p-5 text-center">
              <div 
                className="rounded-circle d-inline-flex align-items-center justify-content-center mb-4"
                style={{ width: '80px', height: '80px', background: 'linear-gradient(135deg, #0ea5e9, #3b82f6)', boxShadow: '0 10px 20px rgba(14, 165, 233, 0.3)' }}
              >
                <FaBook size={36} color="white" />
              </div>
              
              <h3 className="fw-bold mb-3" style={{ color: '#0ea5e9' }}>{verse.reference}</h3>
              
              <p className="fst-italic text-light" style={{ fontSize: '1.25rem', lineHeight: 1.8 }}>
                "{verse.verseText}"
              </p>
              
              <p className="mt-3 fw-bold" style={{ color: '#94a3b8' }}>
                — {verse.translation}
              </p>
            </Card.Body>
          </Card>
        ) : (
          <Card className="border-0 shadow-sm p-5 text-center" style={{ background: '#111827', border: '1px solid #1f2937', maxWidth: '700px' }}>
            <p style={{ color: '#94a3b8' }} className="mb-0">No verse available yet. Check back later.</p>
          </Card>
        )}
      </Container>
    </div>
  );
}