import React, { useEffect, useState } from 'react';
import './App.css';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedUser, setSelectedUser] = useState(null);
  const [darkMode, setDarkMode] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [newUser, setNewUser] = useState({ name: '', role: '', email: '', description: '' });

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = () => {
    setLoading(true);
    fetch('http://localhost:8080/api/users')
      .then(res => res.json())
      .then(data => {
        setUsers(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Fetch error:', err);
        setLoading(false);
      });
  };

  const handleAddUser = () => {
    fetch('http://localhost:8080/api/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newUser),
    })
      .then(res => res.json())
      .then(() => {
        fetchUsers(); // refresh list
        setShowAddModal(false);
        setNewUser({ name: '', role: '', email: '', description: '' });
      })
      .catch(err => console.error('Add user error:', err));
  };

  const filteredUsers = users.filter(
    user =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.role.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className={`app-bg min-vh-100 d-flex flex-column align-items-center text-dark px-4 py-5 ${darkMode ? 'dark-mode text-light' : ''}`}>
      {/* Top Controls */}
      <div className="w-100 d-flex justify-content-between mb-4">
        <button className="btn btn-outline-light" onClick={() => setDarkMode(!darkMode)}>
          {darkMode ? '☀️ Light Mode' : '🌙 Dark Mode'}
        </button>
        <button className="btn btn-success" onClick={() => setShowAddModal(true)}>
          ➕ Add User
        </button>
      </div>

      {/* Title */}
      <h1 className="text-center mb-4 fw-bold display-5">🚀 Portfolio Users</h1>

      {/* Search bar */}
      <Form.Control
        type="text"
        placeholder="Search by name or role..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="mb-4 w-50"
      />

      {/* Cards */}
      {loading ? (
        <p className="text-center text-secondary">Loading users...</p>
      ) : filteredUsers.length === 0 ? (
        <p className="text-center text-danger">No users found.</p>
      ) : (
        <div className="row justify-content-center w-100 px-3">
          {filteredUsers.map((user, index) => (
            <div className="col-md-3 mb-4" key={index}>
              <div className="card user-card h-100 shadow-sm text-center" onClick={() => setSelectedUser(user)}>
                <div className="card-body">
                  <h5 className="card-title fw-bold">{user.name}</h5>
                  <p className="card-text text-muted">{user.role}</p>
                  <span className="hover-info">Click to view more</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* View User Modal */}
      <Modal show={selectedUser !== null} onHide={() => setSelectedUser(null)} centered>
        <Modal.Header closeButton>
          <Modal.Title>User Profile</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedUser && (
            <>
              <h4>{selectedUser.name}</h4>
              <p><strong>Role:</strong> {selectedUser.role}</p>
              <p><strong>Email:</strong> {selectedUser.email || 'Not Available'}</p>
              <p><strong>Description:</strong> {selectedUser.description || 'No description added.'}</p>
            </>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setSelectedUser(null)}>Close</Button>
        </Modal.Footer>
      </Modal>

      {/* Add User Modal */}
      <Modal show={showAddModal} onHide={() => setShowAddModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Add New User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-2">
              <Form.Label>Name</Form.Label>
              <Form.Control type="text" value={newUser.name} onChange={(e) => setNewUser({ ...newUser, name: e.target.value })} />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>Role</Form.Label>
              <Form.Control type="text" value={newUser.role} onChange={(e) => setNewUser({ ...newUser, role: e.target.value })} />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" value={newUser.email} onChange={(e) => setNewUser({ ...newUser, email: e.target.value })} />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>Description</Form.Label>
              <Form.Control as="textarea" rows={3} value={newUser.description} onChange={(e) => setNewUser({ ...newUser, description: e.target.value })} />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowAddModal(false)}>Cancel</Button>
          <Button variant="primary" onClick={handleAddUser}>Save</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default App;
