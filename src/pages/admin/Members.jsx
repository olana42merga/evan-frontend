import React, { useEffect, useState } from 'react';
import { Container, Card, Table, Button, Form, Row, Col, Alert, Modal, Spinner, Badge } from 'react-bootstrap';
import { FaEdit, FaTrash, FaUserPlus } from 'react-icons/fa';
import Header from '../../components/Header';
import api from '../../api/axios'; // Using central axios

export default function Members() {
  const [members, setMembers] = useState([]);
  const [showCreate, setShowCreate] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [selected, setSelected] = useState(null);
  const [msg, setMsg] = useState('');
  const [err, setErr] = useState('');
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true); // Added a separate loading state for the table

  const emptyForm = { email: '', firstName: '', lastName: '', phone: '', role: 'MEMBER' };
  const [form, setForm] = useState(emptyForm);

  const load = () => {
    setFetching(true);
    // CHANGED: Using '/users' instead of '/admin/members' to ensure we get EVERYONE
    api.get('/users') 
      .then(res => {
        const allUsers = res.data || [];
        setMembers(allUsers);
      })
      .catch((error) => {
        console.error(error);
        // Fallback to the old endpoint if /users doesn't exist
        api.get('/admin/members')
          .then(res => setMembers(Array.isArray(res.data) ? res.data : []))
          .catch(() => setMembers([]));
      })
      .finally(() => setFetching(false));
  };

  useEffect(() => { load(); }, []);

  // CREATE
  const handleCreate = async (e) => {
    e.preventDefault();
    if (loading) return;
    setLoading(true); setErr('');
    try {
      const res = await api.post('/auth/create-member', form);
      setMsg(`Created: ${res.data.username} | Email sent to ${res.data.email}`);
      setShowCreate(false);
      setForm(emptyForm);
      load();
      setTimeout(() => setMsg(''), 6000);
    } catch (error) {
      setErr(error.response?.data?.error || 'Network error');
    } finally {
      setLoading(false);
    }
  };

  // OPEN EDIT
  const openEdit = (member) => {
    setSelected(member);
    setForm({
      email: member.email || '',
      firstName: member.firstName || '',
      lastName: member.lastName || '',
      phone: member.phone || '',
      role: member.role || 'MEMBER'
    });
    setErr('');
    setShowEdit(true);
  };

  // UPDATE
  const handleUpdate = async (e) => {
    e.preventDefault();
    if (loading || !selected) return;
    setLoading(true); setErr('');
    try {
      const res = await api.put(`/admin/members/${selected.id}`, form);
      setMsg(`Updated: ${res.data.username}`);
      setShowEdit(false);
      load();
      setTimeout(() => setMsg(''), 6000);
    } catch (error) {
      setErr(error.response?.data?.error || 'Network error');
    } finally {
      setLoading(false);
    }
  };

  // OPEN DELETE
  const openDelete = (member) => {
    setSelected(member);
    setErr('');
    setShowDelete(true);
  };

  // DELETE
  const handleDelete = async () => {
    if (loading || !selected) return;
    setLoading(true); setErr('');
    try {
      await api.delete(`/admin/members/${selected.id}`);
      setMsg(`Deleted: ${selected.username}`);
      setShowDelete(false);
      load();
      setTimeout(() => setMsg(''), 6000);
    } catch (error) {
      setErr(error.response?.data?.error || 'Network error');
    } finally {
      setLoading(false);
    }
  };

  // Common dark input style
  const inputStyle = { background: '#1f2937', color: 'white', border: '1px solid #374151' };

  return (
    <div style={{ background: '#0a0f1c', minHeight: '100vh', color: '#f8fafc' }}>
      <Header />
      <Container fluid className="p-4">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2 className="fw-bold mb-0" style={{ color: '#0ea5e9' }}>Members Management</h2>
          <Button style={{ background: '#10b981', border: 0, color: 'white', fontWeight: 'bold' }} onClick={() => { setForm(emptyForm); setErr(''); setShowCreate(true); }}>
            <FaUserPlus className="me-2" /> Create Member
          </Button>
        </div>

        {msg && <Alert variant="success">{msg}</Alert>}

        <Card className="border-0 shadow-sm" style={{ background: '#111827', border: '1px solid #1f2937' }}>
          <Card.Body>
            <h5 className="text-white mb-3">All Registered Users ({members.length})</h5>
            
            {fetching ? (
              <div className="text-center py-5"><Spinner animation="border" variant="info" /></div>
            ) : (
              <div className="table-responsive">
                <Table hover className="mt-3" variant="dark" style={{ background: 'transparent' }}>
                  <thead>
                    <tr style={{ borderBottom: '2px solid #1f2937' }}>
                      <th className="text-info">ID</th>
                      <th className="text-info">Username</th>
                      <th className="text-info">Email</th>
                      <th className="text-info">Name</th>
                      <th className="text-info">Phone</th>
                      <th className="text-info">Role</th>
                      <th className="text-info" style={{ width: '150px' }}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {members.map(m => (
                      <tr key={m.id} style={{ verticalAlign: 'middle', borderColor: '#1f2937' }}>
                        <td>{m.id}</td>
                        <td><strong className="text-white">{m.username}</strong></td>
                        <td className="text-secondary">{m.email}</td>
                        <td className="text-light">{m.firstName} {m.lastName}</td>
                        <td className="text-secondary">{m.phone || '-'}</td>
                        <td>
                          <Badge bg={m.role === 'ADMIN' ? 'danger' : 'primary'}>
                            {m.role}
                          </Badge>
                        </td>
                        <td>
                          <Button size="sm" variant="outline-info" className="me-2" onClick={() => openEdit(m)}>
                            <FaEdit />
                          </Button>
                          <Button size="sm" variant="outline-danger" onClick={() => openDelete(m)} disabled={m.username === 'admin'}>
                            <FaTrash />
                          </Button>
                        </td>
                      </tr>
                    ))}
                    {members.length === 0 && (
                      <tr><td colSpan="7" className="text-center text-muted py-4">No members found</td></tr>
                    )}
                  </tbody>
                </Table>
              </div>
            )}
          </Card.Body>
        </Card>

        {/* CREATE MODAL */}
        <Modal show={showCreate} onHide={() => setShowCreate(false)} centered backdrop="static" contentClassName="bg-dark text-light border-secondary">
          <Modal.Header closeButton closeVariant="white" className="border-secondary"><Modal.Title>Create Member</Modal.Title></Modal.Header>
          <Form onSubmit={handleCreate}>
            <Modal.Body>
              {err && <Alert variant="danger">{err}</Alert>}
              <Alert variant="info" className="small">
                Auto-generates username &amp; password. Credentials sent to member's email.
              </Alert>
              <Form.Group className="mb-3">
                <Form.Label>Email *</Form.Label>
                <Form.Control type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} required disabled={loading} style={inputStyle} />
              </Form.Group>
              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>First Name *</Form.Label>
                    <Form.Control value={form.firstName} onChange={e => setForm({ ...form, firstName: e.target.value })} required disabled={loading} style={inputStyle} />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Last Name *</Form.Label>
                    <Form.Control value={form.lastName} onChange={e => setForm({ ...form, lastName: e.target.value })} required disabled={loading} style={inputStyle} />
                  </Form.Group>
                </Col>
              </Row>
              <Form.Group className="mb-3">
                <Form.Label>Phone</Form.Label>
                <Form.Control value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} disabled={loading} style={inputStyle} />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Role</Form.Label>
                <Form.Select value={form.role} onChange={e => setForm({ ...form, role: e.target.value })} disabled={loading} style={inputStyle}>
                  <option value="MEMBER">Member</option>
                  <option value="ADMIN">Admin</option>
                </Form.Select>
              </Form.Group>
            </Modal.Body>
            <Modal.Footer className="border-secondary">
              <Button variant="secondary" onClick={() => setShowCreate(false)} disabled={loading}>Cancel</Button>
              <Button style={{ background: '#10b981', border: 0 }} type="submit" disabled={loading}>
                {loading ? <><Spinner size="sm" animation="border" /> Creating...</> : 'Create & Send Email'}
              </Button>
            </Modal.Footer>
          </Form>
        </Modal>

        {/* EDIT MODAL */}
        <Modal show={showEdit} onHide={() => setShowEdit(false)} centered backdrop="static" contentClassName="bg-dark text-light border-secondary">
          <Modal.Header closeButton closeVariant="white" className="border-secondary">
            <Modal.Title>Edit Member: {selected?.username}</Modal.Title>
          </Modal.Header>
          <Form onSubmit={handleUpdate}>
            <Modal.Body>
              {err && <Alert variant="danger">{err}</Alert>}
              <Form.Group className="mb-3">
                <Form.Label>Email *</Form.Label>
                <Form.Control type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} required disabled={loading} style={inputStyle} />
              </Form.Group>
              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>First Name</Form.Label>
                    <Form.Control value={form.firstName} onChange={e => setForm({ ...form, firstName: e.target.value })} disabled={loading} style={inputStyle} />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control value={form.lastName} onChange={e => setForm({ ...form, lastName: e.target.value })} disabled={loading} style={inputStyle} />
                  </Form.Group>
                </Col>
              </Row>
              <Form.Group className="mb-3">
                <Form.Label>Phone</Form.Label>
                <Form.Control value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} disabled={loading} style={inputStyle} />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Role</Form.Label>
                <Form.Select value={form.role} onChange={e => setForm({ ...form, role: e.target.value })} disabled={loading || selected?.username === 'admin'} style={inputStyle}>
                  <option value="MEMBER">Member</option>
                  <option value="ADMIN">Admin</option>
                </Form.Select>
              </Form.Group>
            </Modal.Body>
            <Modal.Footer className="border-secondary">
              <Button variant="secondary" onClick={() => setShowEdit(false)} disabled={loading}>Cancel</Button>
              <Button style={{ background: '#0ea5e9', border: 0, color: '#0a0f1c' }} type="submit" disabled={loading}>
                {loading ? <><Spinner size="sm" animation="border" /> Saving...</> : 'Save Changes'}
              </Button>
            </Modal.Footer>
          </Form>
        </Modal>

        {/* DELETE CONFIRM MODAL */}
        <Modal show={showDelete} onHide={() => setShowDelete(false)} centered contentClassName="bg-dark text-light border-secondary">
          <Modal.Header closeButton closeVariant="white" className="border-secondary">
            <Modal.Title className="text-danger">Confirm Delete</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {err && <Alert variant="danger">{err}</Alert>}
            <p>Are you sure you want to delete <strong>{selected?.username}</strong>?</p>
            <p className="text-secondary small">Email: {selected?.email}</p>
            <p className="text-danger small">This action cannot be undone.</p>
          </Modal.Body>
          <Modal.Footer className="border-secondary">
            <Button variant="secondary" onClick={() => setShowDelete(false)} disabled={loading}>Cancel</Button>
            <Button variant="danger" onClick={handleDelete} disabled={loading}>
              {loading ? <><Spinner size="sm" animation="border" /> Deleting...</> : 'Yes, Delete'}
            </Button>
          </Modal.Footer>
        </Modal>
      </Container>
    </div>
  );
}