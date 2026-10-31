import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Container, Card, Form, Button, Alert, Spinner } from 'react-bootstrap';
import { FaUserPlus } from 'react-icons/fa';
import Header from '../../components/Header';
import { register } from '../../api/auth'; // Ensure this path is correct
import '../../styles/hero.css';

const HERO_IMAGES = [
  '/hero-images/1.jpg', '/hero-images/2.jpg', '/hero-images/3.jpg'
];

export default function Register() {
  const [formData, setFormData] = useState({
    firstName: '', lastName: '', email: '', phone: '', username: '', password: ''
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const [slide, setSlide] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      setSlide(prev => (prev + 1) % HERO_IMAGES.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);
    try {
      await register(formData); 
      setSuccess('Registration successful! Redirecting to login...');
      setTimeout(() => navigate('/login'), 2000);
    } catch (err) {
      setError(err.response?.data?.error || 'Registration failed. Email might already exist.');
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
          <Card className="mx-auto border-0" style={{ maxWidth: '500px', background: 'rgba(255, 255, 255, 0.97)', backdropFilter: 'blur(15px)', borderRadius: '20px' }}>
            <Card.Body className="p-4">
              <div className="text-center mb-3">
                <div style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: '70px', height: '70px', borderRadius: '50%', background: 'linear-gradient(135deg, #e74c3c, #c0392b)', boxShadow: '0 8px 20px rgba(231, 76, 60, 0.35)' }}>
                  <FaUserPlus size={30} color="white" />
                </div>
              </div>
              <h2 className="text-center fw-bold mb-4" style={{ fontSize: '1.8rem', color: '#2c3e50' }}>
                Create an Account
              </h2>
              {error && <Alert variant="danger">{error}</Alert>}
              {success && <Alert variant="success">{success}</Alert>}
              <Form onSubmit={handleSubmit}>
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <Form.Group>
                      <Form.Label>First Name</Form.Label>
                      <Form.Control type="text" name="firstName" required onChange={handleChange} />
                    </Form.Group>
                  </div>
                  <div className="col-md-6 mb-3">
                    <Form.Group>
                      <Form.Label>Last Name</Form.Label>
                      <Form.Control type="text" name="lastName" required onChange={handleChange} />
                    </Form.Group>
                  </div>
                </div>
                <Form.Group className="mb-3">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control type="email" name="email" required onChange={handleChange} />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Phone Number</Form.Label>
                  <Form.Control type="text" name="phone" onChange={handleChange} />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Username</Form.Label>
                  <Form.Control type="text" name="username" required onChange={handleChange} />
                </Form.Group>
                <Form.Group className="mb-4">
                  <Form.Label>Password</Form.Label>
                  <Form.Control type="password" name="password" required onChange={handleChange} />
                </Form.Group>
                <Button type="submit" disabled={loading} className="w-100 py-2 fw-bold border-0" style={{ background: 'linear-gradient(135deg, #0066cc, #00bcd4)', borderRadius: '10px' }}>
                  {loading ? <Spinner size="sm" animation="border" /> : 'REGISTER'}
                </Button>
              </Form>
              <p className="text-center mt-4 mb-0" style={{ fontSize: '0.95rem' }}>
                <span style={{ color: '#7f8c8d' }}>Already have an account? </span>
                <Link to="/login" style={{ color: '#0066cc', fontWeight: 700, textDecoration: 'none' }}>
                  Login Here
                </Link>
              </p>
            </Card.Body>
          </Card>
        </Container>
      </div>
    </>
  );
}
