// Login.js
import React, { useState } from 'react';
import axios from 'axios';
import { Container, Row, Col, Form, Button, Alert } from 'react-bootstrap';

// import { AuthContext } from '../context/AuthContext';

const Login = ({ setAuth }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await axios.post('http://localhost:3000/api/auth/admin/login', {
        email,
        password,
      });
      const token = response.data.token;
      localStorage.setItem('token', token);
      setAuth(token);
    } catch (error) {
      if (error.response && error.response.data) {
        setError(error.response.data.message || 'Invalid credentials.');
      } else {
        setError('An error occurred. Please try again later.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className="mt-5">
      <Row>
        <Col md={6} className="mx-auto">
          <h2 className="text-center mb-4">Login</h2>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group controlId="formPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </Form.Group>
            <Button variant="primary" type="submit" disabled={loading}>
              {loading ? 'Logging in...' : 'Login'}
            </Button>
          </Form>
          {error && <Alert variant="danger">{error}</Alert>}
        </Col>
      </Row>
    </Container>
  );
};

export default Login;