import React, { useState } from 'react';
import { Card, Form, Button, Alert, Spinner, Row, Col } from 'react-bootstrap';
import { FaPhone, FaUniversity, FaCopy, FaUpload, FaFileAlt, FaImage, FaTimes } from 'react-icons/fa';
import MemberLayout from '../../components/MemberLayout';
import api from '../../api/axios'; // Using central axios

export default function SendGift() {
  const [amount, setAmount] = useState('');
  const [method, setMethod] = useState('TELEBIRR');
  const [transactionId, setTransactionId] = useState('');
  const [purpose, setPurpose] = useState('OFFERING');
  const [note, setNote] = useState('');
  const [file, setFile] = useState(null);
  const [filePreview, setFilePreview] = useState(null);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const copy = (text) => {
    navigator.clipboard.writeText(text);
    alert('Copied: ' + text);
  };

  const handleFileChange = (e) => {
    const f = e.target.files[0];
    if (!f) return;

    if (f.size > 5 * 1024 * 1024) {
      setError('File too large (max 5 MB)');
      return;
    }

    const allowed = ['image/jpeg', 'image/png', 'image/jpg', 'application/pdf'];
    if (!allowed.includes(f.type)) {
      setError('Only JPG, PNG, or PDF allowed');
      return;
    }

    setFile(f);
    setError('');

    if (f.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => setFilePreview(e.target.result);
      reader.readAsDataURL(f);
    } else {
      setFilePreview(null);
    }
  };

  const removeFile = () => {
    setFile(null);
    setFilePreview(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccess(''); setError('');

    try {
      const user = JSON.parse(localStorage.getItem('user'));

      const fd = new FormData();
      fd.append('userId', user.id);
      fd.append('amount', amount);
      fd.append('method', method);
      if (transactionId) fd.append('transactionId', transactionId);
      fd.append('purpose', purpose);
      if (note) fd.append('note', note);
      if (file) fd.append('file', file);

      // Using axios for FormData (Axios automatically sets the correct headers)
      await api.post('/gifts', fd);

      setSuccess('Gift submitted! Admin will verify your transfer.');
      setAmount(''); setTransactionId(''); setNote('');
      setFile(null); setFilePreview(null);
      e.target.reset();
      setTimeout(() => setSuccess(''), 8000);
    } catch (err) {
      setError('Failed to submit gift. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Reusable dark input style
  const inputStyle = { background: '#1f2937', color: 'white', border: '1px solid #374151' };

  return (
    <MemberLayout title="Send Gift">
      <div style={{ background: '#0a0f1c', minHeight: '100vh', padding: '20px' }}>
        
        {success && <Alert variant="success">{success}</Alert>}
        {error && <Alert variant="danger">{error}</Alert>}

        <Row className="g-4">
          {/* LEFT: Account Info */}
          <Col md={5}>
            <Card className="border-0 shadow-sm mb-3" style={{ background: '#111827', border: '1px solid #1f2937' }}>
              <Card.Body className="text-center p-4">
                <FaPhone size={40} className="text-success mb-3" />
                <h5 className="text-white">Telebirr</h5>
                <p className="fw-bold mb-1 text-light">+251 906 612 678</p>
                <p className="small" style={{ color: '#94a3b8' }}>DDU Evangelical Team</p>
                <Button variant="outline-success" size="sm" onClick={() => copy('+251906612678')}>
                  <FaCopy className="me-1" /> Copy Number
                </Button>
              </Card.Body>
            </Card>

            <Card className="border-0 shadow-sm" style={{ background: '#111827', border: '1px solid #1f2937' }}>
              <Card.Body className="text-center p-4">
                <FaUniversity size={40} className="text-info mb-3" />
                <h5 className="text-white">CBE Bank</h5>
                <p className="fw-bold mb-1 text-light">1000 102769523</p>
                <p className="small" style={{ color: '#94a3b8' }}>Dire Dawa Main Branch</p>
                <Button variant="outline-info" size="sm" onClick={() => copy('1000102769523')}>
                  <FaCopy className="me-1" /> Copy Number
                </Button>
              </Card.Body>
            </Card>

            <Alert variant="dark" className="mt-3 small border-secondary" style={{ background: '#1f2937', color: '#cbd5e1' }}>
              <strong className="text-info">Steps:</strong><br />
              1. Transfer to one of the accounts above<br />
              2. Take a screenshot / get the receipt<br />
              3. Fill the form and upload the file
            </Alert>
          </Col>

          {/* RIGHT: Gift Form */}
          <Col md={7}>
            <Card className="border-0 shadow-sm" style={{ background: '#111827', border: '1px solid #1f2937' }}>
              <Card.Body className="p-4">
                <h5 className="text-white mb-3">Gift Details</h5>

                <Form onSubmit={handleSubmit}>
                  <Form.Group className="mb-3">
                    <Form.Label className="text-light">Amount (Br) *</Form.Label>
                    <Form.Control type="number" value={amount} onChange={e => setAmount(e.target.value)} placeholder="e.g. 500" required min="1" style={inputStyle} />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label className="text-light">Payment Method *</Form.Label>
                    <Form.Select value={method} onChange={e => setMethod(e.target.value)} style={inputStyle}>
                      <option value="TELEBIRR">Telebirr</option>
                      <option value="CBE">CBE Bank</option>
                    </Form.Select>
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label className="text-light">Transaction ID (optional)</Form.Label>
                    <Form.Control value={transactionId} onChange={e => setTransactionId(e.target.value)} placeholder="e.g. TXN123456789" style={inputStyle} />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label className="text-light">Purpose</Form.Label>
                    <Form.Select value={purpose} onChange={e => setPurpose(e.target.value)} style={inputStyle}>
                      <option value="TITHE">Tithe</option>
                      <option value="OFFERING">Offering</option>
                      <option value="BUILDING">Building Fund</option>
                      <option value="MISSIONS">Missions</option>
                      <option value="CHARITY">Charity</option>
                      <option value="OTHER">Other</option>
                    </Form.Select>
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label className="text-light">Note (optional)</Form.Label>
                    <Form.Control as="textarea" rows={2} value={note} onChange={e => setNote(e.target.value)} placeholder="Additional information..." style={inputStyle} />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label className="text-light">
                      <FaUpload className="me-2" /> Upload Proof (Screenshot / PDF) *
                    </Form.Label>

                    {!file ? (
                      <Form.Control type="file" accept="image/jpeg,image/png,image/jpg,application/pdf" onChange={handleFileChange} required style={inputStyle} />
                    ) : (
                      <div className="p-3 border rounded" style={{ borderColor: '#374151', background: '#1f2937' }}>
                        <div className="d-flex justify-content-between align-items-center mb-2">
                          <div className="d-flex align-items-center">
                            {file.type.startsWith('image/') ? (
                              <FaImage className="text-info me-2" />
                            ) : (
                              <FaFileAlt className="text-danger me-2" />
                            )}
                            <div>
                              <div className="fw-bold small text-white">{file.name}</div>
                              <div className="small" style={{ color: '#94a3b8' }}>{(file.size / 1024).toFixed(1)} KB</div>
                            </div>
                          </div>
                          <Button size="sm" variant="outline-danger" onClick={removeFile}>
                            <FaTimes />
                          </Button>
                        </div>

                        {filePreview && (
                          <img src={filePreview} alt="preview" style={{ maxWidth: '100%', maxHeight: '150px', borderRadius: '4px' }} />
                        )}

                        {!filePreview && file.type === 'application/pdf' && (
                          <div className="text-center small" style={{ color: '#94a3b8' }}>
                            PDF file ready to upload
                          </div>
                        )}
                      </div>
                    )}

                    <Form.Text style={{ color: '#94a3b8' }}>
                      Max 5 MB. Allowed: JPG, PNG, PDF
                    </Form.Text>
                  </Form.Group>

                  <Button type="submit" disabled={loading} className="w-100 py-2 fw-bold" style={{ background: '#0ea5e9', color: '#0a0f1c', border: 0 }}>
                    {loading ? (
                      <><Spinner size="sm" animation="border" className="me-2" /> Submitting...</>
                    ) : (
                      <><FaUpload className="me-2" /> Submit Gift</>
                    )}
                  </Button>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </div>
    </MemberLayout>
  );
}