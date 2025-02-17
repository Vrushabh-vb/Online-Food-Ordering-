// src/components/Notifications.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Row, Col, Button, ListGroup } from 'react-bootstrap';

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);

// Ensure the backend has an endpoint for fetching notifications
useEffect(() => {
  axios.get('http://localhost:3000/api/admin/notifications')
    .then(response => setNotifications(response.data))
    .catch(error => console.error('Error fetching notifications:', error));
}, []);
  return (
    <Container className="mt-5">
      <Row>
        <Col>
          <h2 className="text-center mb-4">Notifications</h2>
          <ListGroup>
            {notifications.map((notification, index) => (
              <ListGroup.Item key={index}>
                {notification.message}
              </ListGroup.Item>
            ))}
          </ListGroup>
          <Button variant="primary" onClick={() => {
            // Add functionality to send notifications
          }}>
            Send Notification
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default Notifications;