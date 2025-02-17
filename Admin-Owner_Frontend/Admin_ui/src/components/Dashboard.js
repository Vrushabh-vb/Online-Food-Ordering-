import React, { useContext, useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link, Navigate } from 'react-router-dom';
import { Navbar, Nav, Container, Row, Col, Button } from 'react-bootstrap';
import Menu from './Menu';
import Orders from './Orders';
import Notifications from './Notifications';
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';

const Dashboard = ({ setAuth }) => {
  const { auth } = useContext(AuthContext);
  const [restaurantName, setRestaurantName] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRestaurantDetails = async () => {
      const authToken = localStorage.getItem('token');
      const decodedToken = JSON.parse(atob(authToken.split('.')[1]));
      console.log('Decoded JWT Token:', decodedToken); // Log the decoded token

      const adminId = decodedToken.id;

      try {
        const response = await axios.get(`http://localhost:3000/api/admin/restaurant/${adminId}`, {
          headers: { Authorization: `Bearer ${authToken}` }
        });
        setRestaurantName(response.data.name);
      } catch (error) {
        console.error('Error fetching restaurant details:', error.response?.data || error.message);
        setError('Failed to fetch restaurant details. Please try again later.');
      }
    };

    if (auth) {
      fetchRestaurantDetails();
    }
  }, [auth]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setAuth(null);
  };

  return (
    <Router>
      <Navbar bg="dark" variant="dark" className="mb-5">
        <Navbar.Brand href="#home">Admin Dashboard</Navbar.Brand>
        <Nav className="mr-auto">
          <Nav.Link as={Link} to="/menu">Menu Management</Nav.Link>
          <Nav.Link as={Link} to="/orders">Order Management</Nav.Link>
          <Nav.Link as={Link} to="/notifications">Notifications</Nav.Link>
        </Nav>
        <Nav className="ml-auto">
          {restaurantName ? (
            <Nav.Link className="text-white">{`Restaurant: ${restaurantName}`}</Nav.Link>
          ) : (
            <Nav.Link className="text-white">Loading...</Nav.Link>
          )}
          <Nav.Link onClick={handleLogout} className="text-white">
            Logout
          </Nav.Link>
        </Nav>
      </Navbar>
      <Container>
        <Row>
          <Col>
            <Routes>
              <Route path="/menu" element={<Menu />} />
              <Route path="/orders" element={<Orders />} />
              <Route path="/notifications" element={<Notifications />} />
              <Route path="/" element={<Navigate replace to="/orders" />} />
            </Routes>
          </Col>
        </Row>
      </Container>
    </Router>
  );
};

export default Dashboard;