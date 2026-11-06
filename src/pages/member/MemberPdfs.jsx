import React, { useEffect, useState } from 'react';
import { Card, Table, Spinner, Button } from 'react-bootstrap';
import { FaDownload, FaEye, FaFilePdf } from 'react-icons/fa';
import MemberLayout from '../../components/MemberLayout';

const API = 'https://ddu-evangelical-backend-6.onrender.com/api';
const BASE = 'https://ddu-evangelical-backend-6.onrender.com';

export default function MemberPdfs() {
  const [pdfs, setPdfs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(API + '/pdfs')
      .then(r => r.json())
      .then(d => setPdfs(Array.isArray(d) ? d : []))
      .catch(() => setPdfs([]))
      .finally(() => setLoading(false));
  }, []);

  const handleDownload = (id, name) => {
    const link = document.createElement('a');
    // UPDATED: Uses the database download endpoint
    link.href = `${BASE}/api/pdfs/download/${id}`; 
    link.download = name || 'document.pdf';
    link.target = '_blank';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <MemberLayout title="PDFs & Documents">
      {loading ? (
        <div className="text-center py-5"><Spinner animation="border" variant="info" /></div>
      ) : pdfs.length === 0 ? (
        <div className="text-center py-5">
          <FaFilePdf size={48} className="text-secondary mb-3" />
          <p style={{ color: '#94a3b8' }}>No PDFs available yet.</p>
        </div>
      ) : (
        <Card className="border-0 shadow-sm" style={{ background: '#111827', border: '1px solid #1f2937' }}>
          <Card.Body>
            <h5 className="mb-3 text-white">All Documents ({pdfs.length})</h5>
            <div className="table-responsive">
              <Table hover className="mt-3" variant="dark" style={{ background: 'transparent' }}>
                <thead>
                  <tr style={{ borderBottom: '2px solid #1f2937' }}>
                    <th className="text-info">#</th>
                    <th className="text-info">Title</th>
                    <th className="text-info" style={{ width: '250px' }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {pdfs.map((p, i) => (
                    <tr key={p.id} style={{ verticalAlign: 'middle', borderColor: '#1f2937' }}>
                      <td>{i + 1}</td>
                      <td>
                        <FaFilePdf className="text-danger me-2" />
                        <strong className="text-light">{p.title}</strong>
                      </td>
                      <td>
                        <Button
                          size="sm"
                          variant="outline-info"
                          className="me-2"
                          href={`${BASE}/api/pdfs/download/${p.id}`} // <-- UPDATED
                          target="_blank"
                        >
                          <FaEye /> View
                        </Button>
                        <Button
                          size="sm"
                          style={{ background: '#0ea5e9', border: 0, color: '#0a0f1c' }}
                          className="fw-bold"
                          onClick={() => handleDownload(p.id, p.title + '.pdf')} // <-- UPDATED
                        >
                          <FaDownload /> Download
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
          </Card.Body>
        </Card>
      )}
    </MemberLayout>
  );
}