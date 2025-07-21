import React, { useState } from 'react';
import { 
  Container, Row, Col, Card, Button, Form, 
  Modal, Navbar, Nav, Badge, Dropdown, 
  FormControl, InputGroup, ListGroup 
} from 'react-bootstrap';
import { 
  Dash, People, Search, Plus, Pencil, Trash, 
  Eye, EyeSlash, X, ChevronDown, Person 
} from 'react-bootstrap-icons';

const StaffManagement = () => {
  const [showModal, setShowModal] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [selectedStaff, setSelectedStaff] = useState('');
  const [staffMembers] = useState([
    { id: 'sarah', name: 'Sarah Johnson', phone: '+1 (555) 123-4567', role: 'Admin', color: 'primary' },
    { id: 'michael', name: 'Michael Chen', phone: '+1 (555) 234-5678', role: 'Staff', color: 'success' },
    { id: 'emily', name: 'Emily Rodriguez', phone: '+1 (555) 345-6789', role: 'Manager', color: 'info' },
    { id: 'david', name: 'David Thompson', phone: '+1 (555) 456-7890', role: 'Staff', color: 'success' },
    { id: 'jessica', name: 'Jessica Park', phone: '+1 (555) 567-8901', role: 'Staff', color: 'success' },
    { id: 'robert', name: 'Robert Williams', phone: '+1 (555) 678-9012', role: 'Manager', color: 'info' }
  ]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowModal(false);
  };

  const handleStaffSelect = (e) => {
    setSelectedStaff(e.target.value);
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const getBadgeVariant = (role) => {
    switch(role) {
      case 'Admin': return 'primary';
      case 'Manager': return 'info';
      case 'Staff': return 'success';
      default: return 'secondary';
    }
  };

  return (
    <div className="d-flex">
   

      {/* Main Content */}
      <div>
    

        {/* Staff List */}
        <Container fluid className="py-4">
          <Row className="g-4 mb-4">
            {staffMembers.map((staff) => (
              <Col key={staff.id} xs={12} md={6} lg={4}>
                <Card className="h-100 shadow-sm">
                  <Card.Body>
                    <div className="d-flex justify-content-between align-items-start mb-3">
                      <div className="d-flex align-items-center">
                        <div className={`bg-${staff.color}-subtle rounded-circle p-3 me-3`}>
                          <Person className={`text-${staff.color}`} size={20} />
                        </div>
                        <div>
                          <h6 className="mb-0">{staff.name}</h6>
                          <small className="text-muted">{staff.phone}</small>
                        </div>
                      </div>
                      <Badge bg={getBadgeVariant(staff.role)}>{staff.role}</Badge>
                    </div>
                    <div className="d-flex">
                      <Button variant="light" className="me-2 flex-grow-1 text-dark">
                        <Pencil className="me-1" />
                        Edit
                      </Button>
                      <Button variant="outline-danger">
                        <Trash />
                      </Button>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>

          {/* Access Management */}
          <Card className="mb-4">
            <Card.Body>
              <h4 className="mb-4">Access Management</h4>
              
              <Form.Group className="mb-4">
                <Form.Label>Select Staff Member</Form.Label>
                <Form.Select onChange={handleStaffSelect} value={selectedStaff}>
                  <option value="">Choose a staff member...</option>
                  {staffMembers.map(staff => (
                    <option key={staff.id} value={staff.id}>
                      {staff.name} ({staff.role})
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>

              <Row className={`g-4 mb-4 ${!selectedStaff ? 'opacity-50' : ''}`}>
                {/* Tables Management */}
                <Col xs={12} md={6} lg={3}>
                  <Card className="bg-light">
                    <Card.Body>
                      <div className="d-flex justify-content-between align-items-center mb-3">
                        <h6 className="mb-0">Tables Management</h6>
                        <Form.Check type="switch" />
                      </div>
                      <ListGroup variant="flush">
                        <ListGroup.Item className="bg-transparent">
                          <Form.Check type="checkbox" label="View Tables" />
                        </ListGroup.Item>
                        <ListGroup.Item className="bg-transparent">
                          <Form.Check type="checkbox" label="Manage Reservations" />
                        </ListGroup.Item>
                        <ListGroup.Item className="bg-transparent">
                          <Form.Check type="checkbox" label="Table Status" />
                        </ListGroup.Item>
                      </ListGroup>
                    </Card.Body>
                  </Card>
                </Col>

                {/* Order Processing */}
                <Col xs={12} md={6} lg={3}>
                  <Card className="bg-light">
                    <Card.Body>
                      <div className="d-flex justify-content-between align-items-center mb-3">
                        <h6 className="mb-0">Order Processing</h6>
                        <Form.Check type="switch" />
                      </div>
                      <ListGroup variant="flush">
                        <ListGroup.Item className="bg-transparent">
                          <Form.Check type="checkbox" label="Create Orders" />
                        </ListGroup.Item>
                        <ListGroup.Item className="bg-transparent">
                          <Form.Check type="checkbox" label="Modify Orders" />
                        </ListGroup.Item>
                        <ListGroup.Item className="bg-transparent">
                          <Form.Check type="checkbox" label="Cancel Orders" />
                        </ListGroup.Item>
                      </ListGroup>
                    </Card.Body>
                  </Card>
                </Col>

                {/* Billing Access */}
                <Col xs={12} md={6} lg={3}>
                  <Card className="bg-light">
                    <Card.Body>
                      <div className="d-flex justify-content-between align-items-center mb-3">
                        <h6 className="mb-0">Billing Access</h6>
                        <Form.Check type="switch" />
                      </div>
                      <ListGroup variant="flush">
                        <ListGroup.Item className="bg-transparent">
                          <Form.Check type="checkbox" label="Generate Bills" />
                        </ListGroup.Item>
                        <ListGroup.Item className="bg-transparent">
                          <Form.Check type="checkbox" label="Process Payments" />
                        </ListGroup.Item>
                        <ListGroup.Item className="bg-transparent">
                          <Form.Check type="checkbox" label="View Reports" />
                        </ListGroup.Item>
                      </ListGroup>
                    </Card.Body>
                  </Card>
                </Col>

                {/* KOT Management */}
                <Col xs={12} md={6} lg={3}>
                  <Card className="bg-light">
                    <Card.Body>
                      <div className="d-flex justify-content-between align-items-center mb-3">
                        <h6 className="mb-0">KOT Management</h6>
                        <Form.Check type="switch" />
                      </div>
                      <ListGroup variant="flush">
                        <ListGroup.Item className="bg-transparent">
                          <Form.Check type="checkbox" label="Print KOT" />
                        </ListGroup.Item>
                        <ListGroup.Item className="bg-transparent">
                          <Form.Check type="checkbox" label="Modify KOT" />
                        </ListGroup.Item>
                        <ListGroup.Item className="bg-transparent">
                          <Form.Check type="checkbox" label="Kitchen Status" />
                        </ListGroup.Item>
                      </ListGroup>
                    </Card.Body>
                  </Card>
                </Col>

                {/* Special Permissions */}
                <Col xs={12} md={6} lg={3}>
                  <Card className="bg-light">
                    <Card.Body>
                      <div className="d-flex justify-content-between align-items-center mb-3">
                        <h6 className="mb-0">Special Permissions</h6>
                        <Form.Check type="switch" />
                      </div>
                      <ListGroup variant="flush">
                        <ListGroup.Item className="bg-transparent">
                          <Form.Check type="checkbox" label="Void Orders" />
                          <div className="ms-4">
                            <Form.Check type="checkbox" label="Void Items" className="text-muted small" />
                            <Form.Check type="checkbox" label="Void Full Order" className="text-muted small" />
                            <Form.Check type="checkbox" label="Void After Payment" className="text-muted small" />
                          </div>
                        </ListGroup.Item>
                        <ListGroup.Item className="bg-transparent">
                          <Form.Check type="checkbox" label="Apply Discounts" />
                          <div className="ms-4">
                            <Form.Check type="checkbox" label="Item Discount" className="text-muted small" />
                            <Form.Check type="checkbox" label="Bill Discount" className="text-muted small" />
                            <Form.Check type="checkbox" label="Special Offers" className="text-muted small" />
                            <div className="d-flex align-items-center small text-muted">
                              <Form.Check type="checkbox" className="me-2" />
                              <span>Max Discount: </span>
                              <Form.Select size="sm" className="ms-2 w-auto">
                                <option>5%</option>
                                <option>10%</option>
                                <option>15%</option>
                                <option>20%</option>
                                <option>25%</option>
                              </Form.Select>
                            </div>
                          </div>
                        </ListGroup.Item>
                      </ListGroup>
                    </Card.Body>
                  </Card>
                </Col>

                {/* Report Access */}
                <Col xs={12} md={6} lg={3}>
                  <Card className="bg-light">
                    <Card.Body>
                      <div className="d-flex justify-content-between align-items-center mb-3">
                        <h6 className="mb-0">Report Access</h6>
                        <Form.Check type="switch" />
                      </div>
                      <ListGroup variant="flush">
                        <ListGroup.Item className="bg-transparent">
                          <Form.Check type="checkbox" label="Full Daily Report" />
                        </ListGroup.Item>
                        <ListGroup.Item className="bg-transparent">
                          <Form.Check type="checkbox" label="Table Daily Report" />
                        </ListGroup.Item>
                        <ListGroup.Item className="bg-transparent">
                          <Form.Check type="checkbox" label="Item/Table Report" />
                        </ListGroup.Item>
                      </ListGroup>
                    </Card.Body>
                  </Card>
                </Col>
              </Row>

              <div className="d-flex justify-content-between align-items-center">
                <Card className="bg-primary-subtle flex-grow-1 me-4">
                  <Card.Body>
                    <h6 className="mb-2">Current Access Summary</h6>
                    <p className="mb-0 small text-muted">
                      Select a staff member to view their current permissions and access rights.
                    </p>
                  </Card.Body>
                </Card>
                <Button variant="warning" className="text-dark">
                  Save Changes
                </Button>
              </div>
            </Card.Body>
          </Card>
        </Container>
      </div>

      {/* Add Staff Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Add New Staff</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Full Name</Form.Label>
              <Form.Control type="text" placeholder="Enter full name" required />
            </Form.Group>
            
            <Form.Group className="mb-3">
              <Form.Label>Username</Form.Label>
              <Form.Control type="text" placeholder="Enter username" required />
            </Form.Group>
            
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" placeholder="Enter email address" required />
            </Form.Group>
            
            <Form.Group className="mb-3">
              <Form.Label>Password</Form.Label>
              <InputGroup>
                <Form.Control 
                  type={passwordVisible ? "text" : "password"} 
                  placeholder="Enter password" 
                  required 
                />
                <InputGroup.Text onClick={togglePasswordVisibility} style={{ cursor: 'pointer' }}>
                  {passwordVisible ? <EyeSlash /> : <Eye />}
                </InputGroup.Text>
              </InputGroup>
            </Form.Group>
            
            <Form.Group className="mb-3">
              <Form.Label>Phone Number</Form.Label>
              <Form.Control type="tel" placeholder="+1 (555) 123-4567" required />
            </Form.Group>
            
            <Form.Group className="mb-4">
              <Form.Label>Role</Form.Label>
              <Form.Select required>
                <option value="">Select a role...</option>
                <option value="admin">Admin</option>
                <option value="manager">Manager</option>
                <option value="staff">Staff</option>
              </Form.Select>
            </Form.Group>
            
            <div className="d-flex gap-3">
              <Button variant="warning" type="submit" className="text-dark flex-grow-1">
                Save Staff
              </Button>
              <Button 
                variant="outline-secondary" 
                className="flex-grow-1" 
                onClick={() => setShowModal(false)}
              >
                Cancel
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default StaffManagement;