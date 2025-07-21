import React, { useState } from 'react';
import {
  Container, Row, Col, Card, Form, Button, Modal,
  Navbar, Nav, Dropdown, InputGroup, ListGroup, Badge
} from 'react-bootstrap';
import {
  Gamepad, Dashboard, Bill, Table, People, BarChart, Settings,
  Bell, Person, Time, Plug, Plus, Pencil, Trash, Play, Stop,
  ChevronDown, Billiards, Restaurant, Group, X
} from 'react-bootstrap-icons';

const TablePlugSetup = () => {
  const [showGroupModal, setShowGroupModal] = useState(false);
  const [selectedTableType, setSelectedTableType] = useState('Select table type');
  const [selectedRateTable, setSelectedRateTable] = useState('Select table or group');
  const [selectedPlugTable, setSelectedPlugTable] = useState('Select table');
  const [tableStatus, setTableStatus] = useState('active');
  const [editingTable, setEditingTable] = useState(null);
  const [plugStatus, setPlugStatus] = useState({
    PLUG_001: 'online',
    PLUG_002: 'offline',
    PLUG_003: 'online'
  });

  const tableTypes = [
    { name: 'Snooker', icon: <Billiards color="green" /> },
    { name: 'Pool', icon: <Billiards color="blue" /> },
    { name: 'PlayStation', icon: <Gamepad color="purple" /> },
    { name: 'Restaurant', icon: <Restaurant color="orange" /> }
  ];

  const tables = [
    { id: 'snooker1', name: 'Snooker Table 1', type: 'Snooker', status: 'active' },
    { id: 'pool1', name: 'Pool Table A', type: 'Pool', status: 'active' },
    { id: 'ps1', name: 'PlayStation Zone 1', type: 'PlayStation', status: 'active' }
  ];

  const tableGroups = [
    { name: 'Premium Snooker Group', count: 3 },
    { name: 'Standard Pool Group', count: 2 }
  ];

  const togglePlug = (plugId, action) => {
    setPlugStatus(prev => ({
      ...prev,
      [plugId]: action === 'on' ? 'online' : 'offline'
    }));
  };

  const handleTableSubmit = (e) => {
    e.preventDefault();
    if (editingTable) {
      console.log('Updating table:', editingTable);
      setEditingTable(null);
    } else {
      console.log('Adding new table');
    }
  };

  const editTable = (table) => {
    setEditingTable(table);
    setSelectedTableType(table.type);
    setTableStatus(table.status);
  };

  const getTableIcon = (type) => {
    const tableType = tableTypes.find(t => t.name === type);
    return tableType ? tableType.icon : <Table />;
  };

  return (
    <div className="d-flex flex-column min-vh-100">
      {/* Header */}
      <Navbar bg="dark" variant="dark" className="shadow">
        <Container fluid>
          <Navbar.Brand className="d-flex align-items-center">
            <Gamepad color="gold" size={24} className="me-2" />
            <span className="fw-bold" style={{ fontFamily: 'Pacifico, cursive' }}>GameHub</span>
          </Navbar.Brand>
          <div className="d-flex">
            <Button variant="link" className="text-white">
              <Bell size={20} />
            </Button>
            <Button variant="link" className="text-white">
              <Person size={20} />
            </Button>
          </div>
        </Container>
      </Navbar>

      <div className="d-flex flex-grow-1">
        {/* Sidebar */}
        <div className="bg-white shadow" style={{ width: '250px' }}>
          <Nav className="flex-column p-3">
            <Nav.Item>
              <Nav.Link href="#" className="d-flex align-items-center text-dark">
                <Dashboard className="me-3" />
                Dashboard
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link href="#" className="d-flex align-items-center text-dark">
                <Bill className="me-3" />
                Billing & Orders
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link active className="d-flex align-items-center bg-warning text-dark rounded">
                <Table className="me-3" />
                Table & Plug Setup
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link href="#" className="d-flex align-items-center text-dark">
                <People className="me-3" />
                Customer Management
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link href="#" className="d-flex align-items-center text-dark">
                <BarChart className="me-3" />
                Reports & Analytics
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link href="#" className="d-flex align-items-center text-dark">
                <Settings className="me-3" />
                Settings
              </Nav.Link>
            </Nav.Item>
          </Nav>
        </div>

        {/* Main Content */}
        <main className="flex-grow-1 p-4">
          <Container fluid>
            <div className="mb-4">
              <h2 className="fw-bold">Table & Plug Setup</h2>
              <p className="text-muted">Manage table types, configure rates, and control smart plugs</p>
            </div>

            <Row className="g-4">
              {/* Add/Edit Table Type Section */}
              <Col xl={6}>
                <Card className="shadow-sm h-100">
                  <Card.Body>
                    <div className="d-flex align-items-center mb-4">
                      <div className="bg-warning rounded p-2 me-3">
                        <Table className="text-dark" />
                      </div>
                      <h4 className="fw-semibold mb-0">
                        {editingTable ? 'Edit Table Type' : 'Add/Edit Table Type'}
                      </h4>
                    </div>

                    <Form onSubmit={handleTableSubmit}>
                      <Form.Group className="mb-3">
                        <Form.Label>Table Name</Form.Label>
                        <Form.Control 
                          type="text" 
                          placeholder="Enter table name" 
                          defaultValue={editingTable?.name}
                          required 
                        />
                      </Form.Group>

                      <Form.Group className="mb-3">
                        <Form.Label>Table Type</Form.Label>
                        <Dropdown>
                          <Dropdown.Toggle variant="light" className="w-100 text-start d-flex justify-content-between align-items-center">
                            {selectedTableType}
                            <ChevronDown />
                          </Dropdown.Toggle>
                          <Dropdown.Menu className="w-100">
                            {tableTypes.map((type) => (
                              <Dropdown.Item 
                                key={type.name}
                                onClick={() => setSelectedTableType(type.name)}
                              >
                                <div className="d-flex align-items-center">
                                  {type.icon}
                                  <span className="ms-2">{type.name}</span>
                                </div>
                              </Dropdown.Item>
                            ))}
                          </Dropdown.Menu>
                        </Dropdown>
                      </Form.Group>

                      <Form.Group className="mb-4">
                        <Form.Label>Status</Form.Label>
                        <div className="d-flex">
                          <Form.Check
                            type="radio"
                            id="active"
                            name="status"
                            label="Active"
                            checked={tableStatus === 'active'}
                            onChange={() => setTableStatus('active')}
                            className="me-4"
                          />
                          <Form.Check
                            type="radio"
                            id="inactive"
                            name="status"
                            label="Inactive"
                            checked={tableStatus === 'inactive'}
                            onChange={() => setTableStatus('inactive')}
                          />
                        </div>
                      </Form.Group>

                      <Button variant="warning" type="submit" className="w-100 text-dark">
                        {editingTable ? 'Update Table Type' : 'Add Table Type'}
                      </Button>
                    </Form>

                    <hr className="my-4" />

                    <div className="border rounded">
                      <div className="bg-dark text-white p-3">
                        <h5 className="mb-0">Existing Table Types</h5>
                      </div>
                      <ListGroup variant="flush">
                        {tables.map((table) => (
                          <ListGroup.Item key={table.id} className="d-flex justify-content-between align-items-center">
                            <div className="d-flex align-items-center">
                              {getTableIcon(table.type)}
                              <div className="ms-3">
                                <div className="fw-medium">{table.name}</div>
                                <small className="text-muted">
                                  {table.type} • {table.status === 'active' ? 'Active' : 'Inactive'}
                                </small>
                              </div>
                            </div>
                            <div>
                              <Button 
                                variant="link" 
                                className="text-warning p-1"
                                onClick={() => editTable(table)}
                              >
                                <Pencil />
                              </Button>
                              <Button variant="link" className="text-danger p-1">
                                <Trash />
                              </Button>
                            </div>
                          </ListGroup.Item>
                        ))}
                      </ListGroup>
                    </div>
                  </Card.Body>
                </Card>
              </Col>

              {/* Set Hourly/Fixed Rate Section */}
              <Col xl={6}>
                <Card className="shadow-sm h-100">
                  <Card.Body>
                    <div className="d-flex justify-content-between align-items-center mb-4">
                      <div className="d-flex align-items-center">
                        <div className="bg-warning rounded p-2 me-3">
                          <Time className="text-dark" />
                        </div>
                        <h4 className="fw-semibold mb-0">Set Hourly/Fixed Rate</h4>
                      </div>
                      <Button 
                        variant="warning" 
                        className="text-dark d-flex align-items-center"
                        onClick={() => setShowGroupModal(true)}
                      >
                        <Plus className="me-2" />
                        Create Group
                      </Button>
                    </div>

                    <Form>
                      <Form.Group className="mb-3">
                        <Form.Label>Select Table/Group</Form.Label>
                        <Dropdown>
                          <Dropdown.Toggle variant="light" className="w-100 text-start d-flex justify-content-between align-items-center">
                            {selectedRateTable}
                            <ChevronDown />
                          </Dropdown.Toggle>
                          <Dropdown.Menu className="w-100">
                            <Dropdown.Header>Groups</Dropdown.Header>
                            {tableGroups.map((group) => (
                              <Dropdown.Item 
                                key={group.name}
                                onClick={() => setSelectedRateTable(group.name)}
                              >
                                <div className="d-flex align-items-center">
                                  <Group className="me-2 text-warning" />
                                  <span>{group.name}</span>
                                  <small className="text-muted ms-2">({group.count} tables)</small>
                                </div>
                              </Dropdown.Item>
                            ))}
                            <Dropdown.Header>Individual Tables</Dropdown.Header>
                            {tables.map((table) => (
                              <Dropdown.Item 
                                key={table.id}
                                onClick={() => setSelectedRateTable(table.name)}
                              >
                                {table.name}
                              </Dropdown.Item>
                            ))}
                          </Dropdown.Menu>
                        </Dropdown>
                      </Form.Group>

                      <Row className="mb-3">
                        <Col md={6}>
                          <Form.Group>
                            <Form.Label>Hourly Rate ($)</Form.Label>
                            <Form.Control type="number" placeholder="0.00" defaultValue="15.00" />
                          </Form.Group>
                        </Col>
                        <Col md={6}>
                          <Form.Group>
                            <Form.Label>Fixed Rate ($)</Form.Label>
                            <Form.Control type="number" placeholder="0.00" defaultValue="50.00" />
                          </Form.Group>
                        </Col>
                      </Row>

                      <Form.Group className="mb-4">
                        <Form.Label>Discounted Rate (%) <span className="text-muted">Optional</span></Form.Label>
                        <Form.Control type="number" placeholder="0" defaultValue="10" />
                      </Form.Group>

                      <Button variant="warning" type="submit" className="w-100 text-dark">
                        Save Changes
                      </Button>
                    </Form>

                    <div className="bg-dark text-white rounded p-3 mt-4">
                      <h5 className="mb-3">Rate Preview</h5>
                      <div className="d-flex flex-column gap-2">
                        <div className="d-flex justify-content-between">
                          <span>Hourly Rate:</span>
                          <span>$15.00/hour</span>
                        </div>
                        <div className="d-flex justify-content-between">
                          <span>Fixed Rate:</span>
                          <span>$50.00/session</span>
                        </div>
                        <div className="d-flex justify-content-between">
                          <span>With 10% Discount:</span>
                          <span>$13.50/hour</span>
                        </div>
                      </div>
                    </div>
                  </Card.Body>
                </Card>
              </Col>

              {/* Smart Plug Mapping Section */}
              <Col xs={12}>
                <Card className="shadow-sm">
                  <Card.Body>
                    <div className="d-flex align-items-center mb-4">
                      <div className="bg-warning rounded p-2 me-3">
                        <Plug className="text-dark" />
                      </div>
                      <h4 className="fw-semibold mb-0">Map Smart Plug (ON/OFF Control)</h4>
                    </div>

                    <Row>
                      {/* Plug Assignment Form */}
                      <Col lg={6} className="mb-4 mb-lg-0">
                        <h5 className="fw-medium mb-3">Assign Smart Plug</h5>
                        <Form>
                          <Form.Group className="mb-3">
                            <Form.Label>Select Table</Form.Label>
                            <Dropdown>
                              <Dropdown.Toggle variant="light" className="w-100 text-start d-flex justify-content-between align-items-center">
                                {selectedPlugTable}
                                <ChevronDown />
                              </Dropdown.Toggle>
                              <Dropdown.Menu className="w-100">
                                {tables.map((table) => (
                                  <Dropdown.Item 
                                    key={table.id}
                                    onClick={() => setSelectedPlugTable(table.name)}
                                  >
                                    {table.name}
                                  </Dropdown.Item>
                                ))}
                              </Dropdown.Menu>
                            </Dropdown>
                          </Form.Group>

                          <Form.Group className="mb-3">
                            <Form.Label>Smart Plug ID</Form.Label>
                            <Form.Control type="text" placeholder="Enter plug ID (e.g., PLUG_001)" />
                          </Form.Group>

                          <Button variant="warning" type="submit" className="w-100 text-dark">
                            Map Smart Plug
                          </Button>
                        </Form>
                      </Col>

                      {/* Plug Control Panel */}
                      <Col lg={6}>
                        <h5 className="fw-medium mb-3">Smart Plug Control</h5>
                        <div className="d-flex flex-column gap-3">
                          {tables.map((table) => {
                            const plugId = `PLUG_00${table.id === 'snooker1' ? 1 : table.id === 'pool1' ? 2 : 3}`;
                            const isOnline = plugStatus[plugId] === 'online';
                            
                            return (
                              <Card key={plugId} className="border">
                                <Card.Body>
                                  <div className="d-flex justify-content-between align-items-center mb-3">
                                    <div className="d-flex align-items-center">
                                      {getTableIcon(table.type)}
                                      <div className="ms-3">
                                        <div className="fw-medium">{table.name}</div>
                                        <small className="text-muted">Plug ID: {plugId}</small>
                                      </div>
                                    </div>
                                    <div className="d-flex align-items-center">
                                      <div className={`w-3 h-3 rounded-circle me-2 ${isOnline ? 'bg-success' : 'bg-danger'}`}></div>
                                      <span className={`small fw-medium ${isOnline ? 'text-success' : 'text-danger'}`}>
                                        {isOnline ? 'ONLINE' : 'OFFLINE'}
                                      </span>
                                    </div>
                                  </div>
                                  <div className="d-flex gap-3">
                                    <Button
                                      variant={isOnline ? 'success' : 'secondary'}
                                      className="flex-grow-1 d-flex justify-content-center align-items-center gap-2"
                                      onClick={() => togglePlug(plugId, 'on')}
                                      disabled={!isOnline && plugId === 'PLUG_002'}
                                    >
                                      <Play />
                                      Turn ON
                                    </Button>
                                    <Button
                                      variant={isOnline ? 'danger' : 'secondary'}
                                      className="flex-grow-1 d-flex justify-content-center align-items-center gap-2"
                                      onClick={() => togglePlug(plugId, 'off')}
                                      disabled={!isOnline && plugId === 'PLUG_002'}
                                    >
                                      <Stop />
                                      Turn OFF
                                    </Button>
                                  </div>
                                </Card.Body>
                              </Card>
                            );
                          })}
                        </div>
                      </Col>
                    </Row>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </Container>
        </main>
      </div>

      {/* Group Management Modal */}
      <Modal show={showGroupModal} onHide={() => setShowGroupModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Create Table Group</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Group Name</Form.Label>
              <Form.Control type="text" placeholder="Enter group name" />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Select Tables</Form.Label>
              <div className="border rounded" style={{ maxHeight: '200px', overflowY: 'auto' }}>
                <ListGroup variant="flush">
                  {tables.map((table) => (
                    <ListGroup.Item key={table.id}>
                      <Form.Check
                        type="checkbox"
                        id={`table-${table.id}`}
                        label={table.name}
                      />
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              </div>
            </Form.Group>

            <Row className="mb-3">
              <Col md={6}>
                <Form.Group>
                  <Form.Label>Hourly Rate ($)</Form.Label>
                  <Form.Control type="number" placeholder="0.00" />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group>
                  <Form.Label>Fixed Rate ($)</Form.Label>
                  <Form.Control type="number" placeholder="0.00" />
                </Form.Group>
              </Col>
            </Row>

            <Form.Group className="mb-4">
              <Form.Label>Discounted Rate (%) <span className="text-muted">Optional</span></Form.Label>
              <Form.Control type="number" placeholder="0" />
            </Form.Group>

            <div className="d-flex gap-3">
              <Button
                variant="light"
                className="flex-grow-1"
                onClick={() => setShowGroupModal(false)}
              >
                Cancel
              </Button>
              <Button variant="warning" type="submit" className="flex-grow-1 text-dark">
                Create Group
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default TablePlugSetup;