import React, { useEffect, useState } from 'react';
import { Card, Table, Spinner, Button, Row, Col } from 'react-bootstrap';
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

  const handleDownload = (url, name) => {
    const link = document.createElement('a');
    link.href = BASE + url;
    link.download = name || 'document.pdf';
    link.target = '_blank';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <MemberLayout title="PDFs & Documents">
      {loading ? (
        <div className="text-center py-5"><Spinner animation="border" /></div>
      ) : pdfs.length === 0 ? (
        <div className="text-center py-5">
          <FaFilePdf size={48} className="text-muted mb-3" />
          <p className="text-muted">No PDFs available yet.</p>
        </div>
      ) : (
        <Card className="card-shadow border-0">
          <Card.Body>
            <h5 className="mb-3">All Documents ({pdfs.length})</h5>
            <Table striped hover responsive>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Title</th>
                  <th style={{ width: '250px' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {pdfs.map((p, i) => (
                  <tr key={p.id}>
                    <td>{i + 1}</td>
                    <td>
                      <FaFilePdf className="text-danger me-2" />
                      <strong>{p.title}</strong>
                    </td>
                    <td>
                      <Button
                        size="sm"
                        variant="outline-primary"
                        className="me-2"
                        href={BASE + p.filePath}
                        target="_blank"
                      >
                        <FaEye /> View
                      </Button>
                      <Button
                        size="sm"
                        variant="primary"
                        onClick={() => handleDownload(p.filePath, p.title + '.pdf')}
                      >
                        <FaDownload /> Download
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Card.Body>
        </Card>
      )}
    </MemberLayout>
  );
}
