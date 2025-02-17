import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Row, Col, Table, Button, Alert, Form } from 'react-bootstrap';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      const authToken = localStorage.getItem('token');
      const decodedToken = JSON.parse(atob(authToken.split('.')[1]));
      const restaurantId = decodedToken.restaurant_id;

      try {
        const response = await axios.get(`http://localhost:3000/api/admin/orders/${restaurantId}`, {
          headers: { Authorization: `Bearer ${authToken}` }
        });
        console.log('Orders data:', response.data); // Log the data returned by the backend
        setOrders(response.data);
      } catch (error) {
        console.error('Error fetching orders:', error.response?.data || error.message);
        // setError('Failed to fetch orders. Please try again later.');
        // setError('No active orders found..');
        // <p>No active orders found.</p>
      }
    };

    fetchOrders();
  }, []);

  const handleStatusChange = async (orderId, newStatus) => {
    const authToken = localStorage.getItem('token');

    try {
      await axios.put(`http://localhost:3000/api/admin/update-order-status`, { order_id: orderId, status: newStatus }, {
        headers: { Authorization: `Bearer ${authToken}` }
      });
      // Update the local state to reflect the change
      setOrders(orders.map(order => 
        order.order_id === orderId ? { ...order, status: newStatus } : order
      ));
    } catch (error) {
      console.error('Error updating order status:', error.response?.data || error.message);
      // setError('Failed to update order status. Please try again later.');
      setError('No active orders found..');
    }
  };

  return (
    <Container className="mt-5">
      <Row>
        <Col>
          <h2 className="text-center mb-4">Order Management</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          {!error && (
            <>
            
              <h3>Active Orders</h3>
          
              {orders.filter(order => !['completed', 'canceled'].includes(order.status)).length <= 0 ? (
                <p>No active orders found.</p>
              ) : (
                <Table striped bordered hover>
                  <thead>
                    <tr>
                      <th>Order ID</th>
                      <th>Customer ID</th>
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.filter(order => !['completed', 'canceled'].includes(order.status)).map(order => (
                      <tr key={order.order_id}>
                        <td>{order.order_id}</td>
                        <td>{order.customer_id || 'N/A'}</td>
                        <td>{order.status}</td>
                        <td>
                          <Form.Group controlId="statusSelect">
                            <Form.Control as="select" defaultValue={order.status} onChange={(e) => handleStatusChange(order.order_id, e.target.value)}>
                              <option value="pending">Pending</option>
                              <option value="preparing">Preparing</option>
                              <option value="ready">Ready</option>
                              <option value="completed">Completed</option>
                              <option value="canceled">Canceled</option>
                            </Form.Control>
                          </Form.Group>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              )}

              <h3>Completed Orders</h3>
              {orders.filter(order => order.status === 'completed').length === 0 ? (
                <p>No completed orders found.</p>
              ) : (
                <Table striped bordered hover>
                  <thead>
                    <tr>
                      <th>Order ID</th>
                      <th>Customer ID</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.filter(order => order.status === 'completed').map(order => (
                      <tr key={order.order_id}>
                        <td>{order.order_id}</td>
                        <td>{order.customer_id || 'N/A'}</td>
                        <td>{order.status}</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              )}
            </>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default Orders;