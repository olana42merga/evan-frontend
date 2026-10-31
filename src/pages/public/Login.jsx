import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Container, Card, Form, Button, Alert, Spinner } from 'react-bootstrap';
import { FaChurch } from 'react-icons/fa';
import Header from '../../components/Header';
import { login } from '../../api/auth'; // Ensure this path is correct
import '../../styles/hero.css';

const HERO_IMAGES = [
  '/hero-images/1.jpg', '/hero-images/2.jpg', '/hero-images/3.jpg',
  '/hero-images/4.jpg', '/hero-images/5.jpg', '/hero-images/6.jpg'
];

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [slide, setSlide] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      setSlide(prev => (prev + 1) % HERO_IMAGES.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const res = await login({ username, password });
      if (res.data && res.data.role) {
        localStorage.setItem('user', JSON.stringify(res.data));
        if (res.data.role === 'ADMIN') navigate('/admin/dashboard');
        else navigate('/member/dashboard');
      } else {
        setError('Invalid credentials');
      }
    } catch (err) {
      setError('Login failed. Check username and password.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Header />
      <div className="hero-rotating" style={{ minHeight: 'calc(100vh - 56px)', height: 'auto' }}>
        {HERO_IMAGES.map((img, i) => (
          <div key={i} className={`hero-slide ${i === slide ? 'active' : ''}`} style={{ backgroundImage: `url(${img})` }} />
        ))}
        <div className="hero-overlay" />
        <Container className="hero-content" style={{ paddingTop: '40px', paddingBottom: '40px' }}>
          <Card className="mx-auto card-shadow border-0" style={{ maxWidth: '430px', background: 'rgba(255, 255, 255, 0.97)', backdropFilter: 'blur(15px)', borderRadius: '20px' }}>
            <Card.Body className="p-4">
              <div className="text-center mb-3">
                <div style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: '80px', height: '80px', borderRadius: '50%', background: 'linear-gradient(135deg, #3498db, #2c3e50)', boxShadow: '0 8px 20px rgba(52, 152, 219, 0.35)' }}>
                  <FaChurch size={40} color="white" />
                </div>
              </div>
              <h2 className="text-center fw-bold mb-1" style={{ fontSize: '2rem', background: 'linear-gradient(135deg, #0066cc, #00bcd4)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                Login
              </h2>
              <p className="text-center mb-4 fw-semibold" style={{ color: '#e74c3c', fontSize: '1rem', letterSpacing: '0.5px' }}>
                Welcome Back to DDU Evangelical Team
              </p>
              {error && <Alert variant="danger">{error}</Alert>}
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                  <Form.Label style={{ color: '#2c3e50', fontWeight: 600, fontSize: '0.95rem' }}>Username</Form.Label>
                  <Form.Control type="text" value={username} onChange={e => setUsername(e.target.value)} placeholder="Enter username" required style={{ border: '2px solid #e0e6ed', borderRadius: '10px', padding: '10px 14px', fontSize: '1rem', transition: 'all 0.3s' }} />
                </Form.Group>
                <Form.Group className="mb-4">
                  <Form.Label style={{ color: '#2c3e50', fontWeight: 600, fontSize: '0.95rem' }}>Password</Form.Label>
                  <Form.Control type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Enter password" required style={{ border: '2px solid #e0e6ed', borderRadius: '10px', padding: '10px 14px', fontSize: '1rem', transition: 'all 0.3s' }} />
                </Form.Group>
                <Button type="submit" disabled={loading} className="w-100 py-2 fw-bold border-0" style={{ background: 'linear-gradient(135deg, #0066cc, #00bcd4)', borderRadius: '10px', fontSize: '1.1rem', letterSpacing: '1px', boxShadow: '0 4px 12px rgba(52, 152, 219, 0.4)', transition: 'all 0.3s' }}>
                  {loading ? <Spinner size="sm" animation="border" /> : 'LOGIN'}
                </Button>
              </Form>
              <p className="text-center mt-4 mb-0" style={{ fontSize: '0.95rem' }}>
                <span style={{ color: '#7f8c8d' }}>Don't have an account? </span>
                <Link to="/register" style={{ color: '#e74c3c', fontWeight: 700, textDecoration: 'none' }}>Register Here</Link>
              </p>
            </Card.Body>
          </Card>
        </Container>
      </div>
    </>
  );
}
