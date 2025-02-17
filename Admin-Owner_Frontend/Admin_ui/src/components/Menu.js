import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Row, Col, Form, Button, Table, Alert } from 'react-bootstrap';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const Menu = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [newItem, setNewItem] = useState({ name: '', description: '', price: '', category: '' });
  const { auth } = useContext(AuthContext);
  const authToken = localStorage.getItem('token');
  const decodedToken = JSON.parse(atob(authToken.split('.')[1]));
  const restaurantId = decodedToken.restaurant_id;
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:3000/api/admin/menu/${restaurantId}`, {
      headers: {
        Authorization: `Bearer ${authToken}`
      }
    })
    .then(response => setMenuItems(response.data))
    .catch(error => {
      console.error('Error fetching menu items:', error);
      setError('Failed to fetch menu items. Please try again later.');
    });
  }, [authToken, restaurantId]);

  const handleAddItem = async () => {
    try {
      const response = await axios.post('http://localhost:3000/api/admin/add-menu-item', {
        name: newItem.name,
        description: newItem.description,
        price: newItem.price,
        category: newItem.category,
        restaurant_id: restaurantId
      }, {
        headers: { Authorization: `Bearer ${authToken}` }
      });
      setMenuItems([...menuItems, response.data]);
      setNewItem({ name: '', description: '', price: '', category: '' });
    } catch (error) {
      console.error('Error adding menu item:', error);
      setError('Failed to add menu item. Please try again later.');
    }
  };

  const handleAvailabilityChange = async (itemId, availability) => {
    try {
      await axios.put(`http://localhost:3000/api/admin/update-menu-item-availability`, { item_id: itemId, availability }, {
        headers: { Authorization: `Bearer ${authToken}` }
      });
      setMenuItems(menuItems.map(item => 
        item.item_id === itemId ? { ...item, availability } : item
      ));
    } catch (error) {
      console.error('Error updating menu item availability:', error);
      setError('Failed to update menu item availability. Please try again later.');
    }
  };

  // const handleAvailabilityChange = async (itemId, availability) => {
  //   try {
  //     // Convert string value to boolean
  //     const availabilityBoolean = availability === 'available';
  
  //     await axios.put(`http://localhost:3000/api/admin/update-menu-item-availability`, { item_id: itemId, availability: availabilityBoolean }, {
  //       headers: { Authorization: `Bearer ${authToken}` }
  //     });
  //     setMenuItems(menuItems.map(item => 
  //       item.item_id === itemId ? { ...item, availability: availabilityBoolean } : item
  //     ));
  //   } catch (error) {
  //     console.error('Error updating menu item availability:', error);
  //     setError('Failed to update menu item availability. Please try again later.');
  //   }
  // };

  const handleDeleteMenuItem = async (itemId) => {
    try {
      await axios.delete(`http://localhost:3000/api/admin/delete-menu-item/${itemId}`, {
        headers: { Authorization: `Bearer ${authToken}` }
      });
      setMenuItems(menuItems.filter(item => item.item_id !== itemId));
    } catch (error) {
      console.error('Error deleting menu item:', error);
      setError('Failed to delete menu item. Please try again later.');
    }
  };

  return (
    <Container className="mt-5">
      <Row>
        <Col>
          <h2 className="text-center mb-4">Menu Management</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form>
            <Form.Group controlId="formName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter name"
                value={newItem.name}
                onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
              />
            </Form.Group>
            <Form.Group controlId="formDescription">
              <Form.Label>Description</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter description"
                value={newItem.description}
                onChange={(e) => setNewItem({ ...newItem, description: e.target.value })}
              />
            </Form.Group>
            <Form.Group controlId="formPrice">
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter price"
                value={newItem.price}
                onChange={(e) => setNewItem({ ...newItem, price: e.target.value })}
              />
            </Form.Group>
            <Form.Group controlId="formCategory">
              <Form.Label>Category</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter category"
                value={newItem.category}
                onChange={(e) => setNewItem({ ...newItem, category: e.target.value })}
              />
            </Form.Group>
            <Button variant="primary" onClick={handleAddItem}>
              Add Item
            </Button>
          </Form>
          <Table striped bordered hover className="mt-4">
            <thead>
              <tr>
                <th>Name</th>
                <th>Description</th>
                <th>Price</th>
                <th>Category</th>
                <th>Availability</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
             
            {menuItems.map(item => (
  <tr key={item.item_id}>
    <td>{item.name}</td>
    <td>{item.description}</td>
    <td>{item.price}</td>
    <td>{item.category}</td>
    <td>
      <Form.Control
        as="select"
        value={item.availability ? 'available' : 'not available'}
        onChange={(e) => handleAvailabilityChange(item.item_id, e.target.value === 'available')}
      >
        <option value="available">Available</option>
        <option value="not available">Not Available</option>
      </Form.Control>
    </td>
    <td>
      <Button variant="danger" onClick={() => handleDeleteMenuItem(item.item_id)}>
        Delete
      </Button>
    </td>
  </tr>
))}
            </tbody>
          </Table>
        </Col>
      </Row>
    </Container>
  );
};

export default Menu;