import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import { FaChurch, FaSignOutAlt, FaSignInAlt, FaTachometerAlt } from 'react-icons/fa';

export default function Header() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/login');
    window.location.reload();
  };

  return (
    <Navbar bg="dark" variant="dark" expand="lg" className="shadow-sm">
      <Container fluid>
        <Navbar.Brand
          as={Link}
          to="/"
          className="d-flex align-items-center fw-bold"
          style={{ fontWeight: 800, letterSpacing: '0.3px' }}
        >
          <FaChurch className="me-2" size={24} />
          <span className="fw-bold">FOCUS DDU Evangelical Team</span>
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="main-nav" />

        <Navbar.Collapse id="main-nav">
          <Nav className="ms-auto align-items-lg-center">
            <Nav.Link as={Link} to="/" className="fw-bold">
              Home
            </Nav.Link>
            <Nav.Link as={Link} to="/about" className="fw-bold">
              About
            </Nav.Link>
            <Nav.Link as={Link} to="/posts" className="fw-bold">
              Posts
            </Nav.Link>
            <Nav.Link as={Link} to="/contact" className="fw-bold">
              Contact
            </Nav.Link>

            {user ? (
              <>
                <Nav.Link
                  as={Link}
                  to={user.role === 'ADMIN' ? '/admin/dashboard' : '/member/dashboard'}
                  className="fw-bold"
                >
                  <FaTachometerAlt className="me-1" />
                  Dashboard
                </Nav.Link>

                <Button
                  variant="outline-light"
                  size="sm"
                  onClick={handleLogout}
                  className="ms-lg-2 mt-2 mt-lg-0 d-flex align-items-center fw-bold"
                >
                  <FaSignOutAlt className="me-1" />
                  Logout
                </Button>
              </>
            ) : (
              <Button
                as={Link}
                to="/login"
                variant="primary"
                size="sm"
                className="ms-lg-2 mt-2 mt-lg-0 d-flex align-items-center fw-bold"
              >
                <FaSignInAlt className="me-1" />
                Login
              </Button>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
