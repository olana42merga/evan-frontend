import React, { useEffect, useState } from 'react';
import { Container, Card, Table, Button, Form, Row, Col, Alert, Badge } from 'react-bootstrap';
import Header from '../../components/Header';
import { getPrograms, addProgram, deleteProgram } from '../../api/programs';
const API = 'https://ddu-evangelical-backend-6.onrender.com/api';
const BASE = 'https://ddu-evangelical-backend-6.onrender.com';

export default function Programs() {
  const [programs, setPrograms] = useState([]);
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [loc, setLoc] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [emails, setEmails] = useState('');
  const [msg, setMsg] = useState('');

  const load = () => getPrograms().then(r => setPrograms(r.data)).catch(() => {});
  useEffect(() => { load(); }, []);

  const handleAdd = async (e) => {
    e.preventDefault();
    await addProgram({
      title,
      description: desc,
      location: loc,
      programDate: date,
      programTime: time,
      notifyEmails: emails
    });
    setMsg('? Program added! Reminders will be sent automatically.');
    setTitle(''); setDesc(''); setLoc(''); setDate(''); setTime(''); setEmails('');
    load();
    setTimeout(() => setMsg(''), 5000);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Delete?')) { await deleteProgram(id); load(); }
  };

  return (
    <>
      <Header />
      <Container fluid className="p-4">
        <h2 className="text-primary mb-4">Programs Management</h2>
        {msg && <Alert variant="success">{msg}</Alert>}

        <Alert variant="info">
          <strong>?? Reminders sent automatically at:</strong>
          <Badge bg="primary" className="ms-2">1 day</Badge>
          <Badge bg="info" className="ms-1">12 hours</Badge>
          <Badge bg="warning" className="ms-1">3 hours</Badge>
          <Badge bg="danger" className="ms-1">1 hour</Badge>
          <div className="mt-2 small">Reminders go to all members + any custom emails you add below.</div>
        </Alert>

        <Card className="card-shadow border-0 mb-4">
          <Card.Body>
            <h5>Add New Program</h5>
            <Form onSubmit={handleAdd}>
              <Row className="g-2">
                <Col md={3}><Form.Control placeholder="Title" value={title} onChange={e => setTitle(e.target.value)} required /></Col>
                <Col md={3}><Form.Control placeholder="Description" value={desc} onChange={e => setDesc(e.target.value)} /></Col>
                <Col md={2}><Form.Control placeholder="Location" value={loc} onChange={e => setLoc(e.target.value)} /></Col>
                <Col md={2}><Form.Control type="date" value={date} onChange={e => setDate(e.target.value)} required /></Col>
                <Col md={2}><Form.Control type="time" value={time} onChange={e => setTime(e.target.value)} required /></Col>
              </Row>
              <Row className="g-2 mt-2">
                <Col md={10}>
                  <Form.Control
                    placeholder="Additional emails (comma-separated): pastor@ddu.edu.et, elder@ddu.edu.et"
                    value={emails}
                    onChange={e => setEmails(e.target.value)}
                  />
                </Col>
                <Col md={2}>
                  <Button type="submit" variant="primary" className="w-100">Add Program</Button>
                </Col>
              </Row>
            </Form>
          </Card.Body>
        </Card>

        <Card className="card-shadow border-0">
          <Card.Body>
            <h5>All Programs ({programs.length})</h5>
            <Table striped hover responsive className="mt-3">
              <thead>
                <tr>
                  <th>ID</th><th>Title</th><th>Description</th><th>Location</th>
                  <th>Date</th><th>Time</th><th>Notify Emails</th><th>Reminders</th><th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {programs.map(p => (
                  <tr key={p.id}>
                    <td>{p.id}</td>
                    <td><strong>{p.title}</strong></td>
                    <td>{p.description}</td>
                    <td>{p.location}</td>
                    <td>{p.programDate || '-'}</td>
                    <td>{p.programTime || '-'}</td>
                    <td>{p.notifyEmails || 'All members'}</td>
                    <td>
                      <Badge bg={p.reminder1DaySent ? 'success' : 'secondary'} className="me-1">1d</Badge>
                      <Badge bg={p.reminder12hSent ? 'success' : 'secondary'} className="me-1">12h</Badge>
                      <Badge bg={p.reminder3hSent ? 'success' : 'secondary'} className="me-1">3h</Badge>
                      <Badge bg={p.reminder1hSent ? 'success' : 'secondary'}>1h</Badge>
                    </td>
                    <td>
                      <Button size="sm" variant="danger" onClick={() => handleDelete(p.id)}>Delete</Button>
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
