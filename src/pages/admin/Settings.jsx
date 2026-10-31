import React, { useEffect, useState } from 'react';
import { Container, Card, Form, Button, Alert, Row, Col } from 'react-bootstrap';
import Header from '../../components/Header';

export default function Settings() {
  const [settings, setSettings] = useState({
    siteName: 'DDU Evangelical Team',
    contactEmail: 'info@ddu.edu.et',
    phone: '+251912345678',
    address: 'Dire Dawa University, Main Campus',
    facebook: '',
    telegram: '',
    youtube: ''
  });
  const [msg, setMsg] = useState('');

  useEffect(() => {
    const saved = localStorage.getItem('settings');
    if (saved) setSettings(JSON.parse(saved));
  }, []);

  const handleSave = (e) => {
    e.preventDefault();
    localStorage.setItem('settings', JSON.stringify(settings));
    setMsg('? Settings saved!');
    setTimeout(() => setMsg(''), 3000);
  };

  return (
    <>
      <Header />
      <Container fluid className="p-4">
        <h2 className="text-primary mb-4">Settings</h2>

        {msg && <Alert variant="success">{msg}</Alert>}

        <Card className="card-shadow border-0" style={{ maxWidth: '700px' }}>
          <Card.Body>
            <h5>System Settings</h5>
            <Form onSubmit={handleSave} className="mt-3">
              <Form.Group className="mb-3">
                <Form.Label>Site Name</Form.Label>
                <Form.Control value={settings.siteName}
                  onChange={e => setSettings({ ...settings, siteName: e.target.value })} />
              </Form.Group>
              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Contact Email</Form.Label>
                    <Form.Control value={settings.contactEmail}
                      onChange={e => setSettings({ ...settings, contactEmail: e.target.value })} />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Phone</Form.Label>
                    <Form.Control value={settings.phone}
                      onChange={e => setSettings({ ...settings, phone: e.target.value })} />
                  </Form.Group>
                </Col>
              </Row>
              <Form.Group className="mb-3">
                <Form.Label>Address</Form.Label>
                <Form.Control value={settings.address}
                  onChange={e => setSettings({ ...settings, address: e.target.value })} />
              </Form.Group>
              <h6 className="mt-4">Social Media</h6>
              <Form.Group className="mb-3">
                <Form.Label>Facebook</Form.Label>
                <Form.Control value={settings.facebook}
                  onChange={e => setSettings({ ...settings, facebook: e.target.value })} />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Telegram</Form.Label>
                <Form.Control value={settings.telegram}
                  onChange={e => setSettings({ ...settings, telegram: e.target.value })} />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>YouTube</Form.Label>
                <Form.Control value={settings.youtube}
                  onChange={e => setSettings({ ...settings, youtube: e.target.value })} />
              </Form.Group>
              <Button type="submit" variant="primary">Save Settings</Button>
            </Form>
          </Card.Body>
        </Card>
      </Container>
    </>
  );
}
