import React, { useEffect, useState } from 'react';
import { Container, Card, Button, Form, Row, Col, Alert, Spinner, Modal } from 'react-bootstrap';
import { FaEdit, FaTrash } from 'react-icons/fa';
import Header from '../../components/Header';

const API = 'https://ddu-evangelical-backend-6.onrender.com/api';
const BASE = 'https://ddu-evangelical-backend-6.onrender.com';

export default function Posts() {
  const [posts, setPosts] = useState([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [image, setImage] = useState(null);
  const [msg, setMsg] = useState('');
  const [loading, setLoading] = useState(false);
  const [editing, setEditing] = useState(null);
  const [showEdit, setShowEdit] = useState(false);
  const [editImage, setEditImage] = useState(null);
  const [editTitle, setEditTitle] = useState('');
  const [editContent, setEditContent] = useState('');

  const load = () => {
    fetch(API + '/posts').then(r => r.json()).then(d => setPosts(Array.isArray(d) ? d : [])).catch(() => {});
  };
  useEffect(() => { load(); }, []);

  const handleCreate = async (e) => {
    e.preventDefault();
    setLoading(true); setMsg('');
    const fd = new FormData();
    fd.append('title', title);
    fd.append('content', content);
    if (image) fd.append('image', image);

    try {
      const res = await fetch(API + '/posts', { method: 'POST', body: fd });
      if (res.ok) {
        setMsg('? Post created!');
        setTitle(''); setContent(''); setImage(null);
        e.target.reset();
        load();
        setTimeout(() => setMsg(''), 3000);
      } else { setMsg('? Failed'); }
    } catch { setMsg('? Network error'); }
    finally { setLoading(false); }
  };

  const openEdit = (p) => {
    setEditing(p);
    setEditTitle(p.title);
    setEditContent(p.content || '');
    setEditImage(null);
    setShowEdit(true);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);
    const fd = new FormData();
    fd.append('title', editTitle);
    fd.append('content', editContent);
    if (editImage) fd.append('image', editImage);

    try {
      const res = await fetch(API + '/posts/' + editing.id, { method: 'PUT', body: fd });
      if (res.ok) {
        setMsg('? Post updated!');
        setShowEdit(false);
        load();
      }
    } catch {}
    finally { setLoading(false); }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Delete this post?')) {
      await fetch(API + '/posts/' + id, { method: 'DELETE' });
      load();
    }
  };

  return (
    <>
      <Header />
      <Container fluid className="p-4">
        <h2 className="text-primary mb-4">Posts Management</h2>
        {msg && <Alert variant="success">{msg}</Alert>}

        <Card className="card-shadow border-0 mb-4">
          <Card.Body>
            <h5>Create New Post</h5>
            <Form onSubmit={handleCreate}>
              <Row className="g-2">
                <Col md={12}>
                  <Form.Control placeholder="Post Title" value={title}
                    onChange={e => setTitle(e.target.value)} required />
                </Col>
                <Col md={12} className="mt-2">
                  <Form.Control as="textarea" rows={4} placeholder="Post Content"
                    value={content} onChange={e => setContent(e.target.value)} required />
                </Col>
                <Col md={8} className="mt-2">
                  <Form.Control type="file" accept="image/*"
                    onChange={e => setImage(e.target.files[0])} />
                </Col>
                <Col md={4} className="mt-2 d-flex align-items-end">
                  <Button type="submit" variant="primary" className="w-100" disabled={loading}>
                    {loading ? <Spinner size="sm" animation="border" /> : 'Create Post'}
                  </Button>
                </Col>
              </Row>
            </Form>
          </Card.Body>
        </Card>

        <h5 className="mb-3">All Posts ({posts.length})</h5>

        <Row xs={1} sm={1} md={2} lg={3} xl={3} className="g-4">
          {posts.map(p => (
            <Col key={p.id} className="d-flex">
              <Card className="card-shadow border-0 w-100 h-100 d-flex flex-column">
                {p.imagePath && (
                  <div style={{ height: '200px', overflow: 'hidden', flexShrink: 0 }}>
                    <img
                      src={BASE + p.imagePath}
                      alt={p.title}
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      onError={(e) => { e.target.parentElement.style.display = 'none'; }}
                    />
                  </div>
                )}
                <Card.Body className="d-flex flex-column">
                  <Card.Title className="fw-bold">{p.title}</Card.Title>
                  <Card.Text className="text-muted flex-grow-1">
                    {p.content?.length > 100 ? p.content.substring(0, 100) + '...' : p.content}
                  </Card.Text>
                  <div className="d-flex gap-2 mt-3">
                    <Button size="sm" variant="outline-primary" className="flex-fill"
                      onClick={() => openEdit(p)}>
                      <FaEdit /> Edit
                    </Button>
                    <Button size="sm" variant="outline-danger" className="flex-fill"
                      onClick={() => handleDelete(p.id)}>
                      <FaTrash /> Delete
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>

        <Modal show={showEdit} onHide={() => setShowEdit(false)} centered size="lg">
          <Modal.Header closeButton><Modal.Title>Edit Post</Modal.Title></Modal.Header>
          <Form onSubmit={handleUpdate}>
            <Modal.Body>
              <Form.Group className="mb-3">
                <Form.Label>Title</Form.Label>
                <Form.Control value={editTitle}
                  onChange={e => setEditTitle(e.target.value)} required />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Content</Form.Label>
                <Form.Control as="textarea" rows={6} value={editContent}
                  onChange={e => setEditContent(e.target.value)} required />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Replace Image (optional)</Form.Label>
                <Form.Control type="file" accept="image/*"
                  onChange={e => setEditImage(e.target.files[0])} />
              </Form.Group>
              {editing?.imagePath && (
                <img src={BASE + editing.imagePath} alt="current"
                  style={{ maxWidth: '100%', maxHeight: '150px', borderRadius: '8px' }} />
              )}
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={() => setShowEdit(false)}>Cancel</Button>
              <Button variant="primary" type="submit" disabled={loading}>
                {loading ? <Spinner size="sm" animation="border" /> : 'Save Changes'}
              </Button>
            </Modal.Footer>
          </Form>
        </Modal>
      </Container>
    </>
  );
}
