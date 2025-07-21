import React, { useState, useEffect } from 'react';
import {
  Container, Row, Col, Card, Button, Form, Modal,
  Navbar, Nav, Badge, ListGroup, ProgressBar, Toast
} from 'react-bootstrap';
import {
  Wifi, Gamepad, Billiards, Restaurant, Tv, Lightbulb, Music,
  Refresh, Search, Filter, AlertCircle, Check, ChevronDown
} from 'react-bootstrap-icons';

const DeviceMonitor = () => {
  const [toastMessage, setToastMessage] = useState('');
  const [currentDevice, setCurrentDevice] = useState('');
  const [devices, setDevices] = useState([
    {
      id: 1,
      name: 'PlayStation 5',
      location: 'Table PS-01',
      type: 'game',
      icon: <Gamepad className="text-blue-600" size={20} />,
      status: 'online',
      powerState: 'on',
      powerConsumption: 180,
      updated: '2 min ago',
      bgColor: 'bg-blue-50'
    },
    {
      id: 2,
      name: 'Snooker Table',
      location: 'Table SN-03',
      type: 'snooker',
      icon: <Billiards className="text-green-600" size={20} />,
      status: 'online',
      powerState: 'off',
      powerConsumption: 0,
      updated: '1 min ago',
      bgColor: 'bg-green-50'
    },
    {
      id: 3,
      name: 'Coffee Machine',
      location: 'Restaurant Area',
      type: 'restaurant',
      icon: <Restaurant className="text-purple-600" size={20} />,
      status: 'offline',
      powerState: 'off',
      powerConsumption: null,
      updated: '15 min ago',
      bgColor: 'bg-purple-50'
    },
    {
      id: 4,
      name: 'Xbox Series X',
      location: 'Table XB-02',
      type: 'game',
      icon: <Gamepad className="text-orange-600" size={20} />,
      status: 'online',
      powerState: 'on',
      powerConsumption: 165,
      updated: '30 sec ago',
      bgColor: 'bg-orange-50'
    },
    {
      id: 5,
      name: 'Pool Table',
      location: 'Table PL-05',
      type: 'pool',
      icon: <Billiards className="text-teal-600" size={20} />,
      status: 'online',
      powerState: 'on',
      powerConsumption: 45,
      updated: '1 min ago',
      bgColor: 'bg-teal-50'
    },
    {
      id: 6,
      name: 'Smart TV',
      location: 'Lounge Area',
      type: 'tv',
      icon: <Tv className="text-red-600" size={20} />,
      status: 'online',
      powerState: 'off',
      powerConsumption: 2,
      updated: '45 sec ago',
      bgColor: 'bg-red-50'
    },
    {
      id: 7,
      name: 'LED Lighting',
      location: 'Main Hall',
      type: 'light',
      icon: <Lightbulb className="text-indigo-600" size={20} />,
      status: 'online',
      powerState: 'on',
      powerConsumption: 120,
      updated: '3 min ago',
      bgColor: 'bg-indigo-50'
    },
    {
      id: 8,
      name: 'Sound System',
      location: 'Entertainment Zone',
      type: 'audio',
      icon: <Music className="text-pink-600" size={20} />,
      status: 'offline',
      powerState: 'off',
      powerConsumption: null,
      updated: '8 min ago',
      bgColor: 'bg-pink-50'
    }
  ]);

  const toggleDevice = (deviceId) => {
    setDevices(devices.map(device => {
      if (device.id === deviceId) {
        const newState = device.powerState === 'on' ? 'off' : 'on';
        showToast(`${device.name} has been turned ${newState.toUpperCase()}`);
        return { ...device, powerState: newState };
      }
      return device;
    }));
  };

  const showOverrideModal = (deviceName) => {
    setCurrentDevice(deviceName);
    setShowOverrideModal(true);
  };

  const confirmOverride = () => {
    showToast(`Manual override applied to ${currentDevice}`);
    setShowOverrideModal(false);
  };

  const showToast = (message) => {
    setToastMessage(message);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  // Simulate live updates
  useEffect(() => {
    const interval = setInterval(() => {
      // In a real app, you would fetch updated device status here
      console.log('Checking for device updates...');
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="d-flex" style={{ minHeight: '100vh' }}>
      {/* Sidebar */}
      <div className="bg-white shadow" style={{ width: '250px' }}>
        <div className="p-4 border-bottom">
          <h1 className="fw-bold text-dark">GameHub</h1>
        </div>
        <Nav className="flex-column p-3">
          <Nav.Item className="mb-2">
            <div className="d-flex align-items-center p-2 bg-warning bg-opacity-10 rounded">
              <Wifi className="text-warning me-3" size={18} />
              <span className="fw-medium text-dark">Device Monitor</span>
            </div>
            <div className="ms-4 mt-2">
              <Nav.Link className="text-muted py-2">Smart Plug Status</Nav.Link>
              <Nav.Link className="text-muted py-2">Force ON/OFF Control</Nav.Link>
            </div>
          </Nav.Item>
        </Nav>
      </div>

      {/* Main Content */}
      <div className="flex-grow-1 d-flex flex-column overflow-hidden">
        {/* Header */}
        <header className="bg-white shadow-sm border-bottom p-4">
          <Container fluid>
            <div className="d-flex justify-content-between align-items-center">
              <div>
                <h2 className="fw-bold mb-0">Device Monitor</h2>
                <p className="text-muted mb-0">Monitor and control smart plugs across all gaming areas</p>
              </div>
              <div className="d-flex align-items-center gap-3">
                <div className="d-flex align-items-center px-3 py-2 bg-success bg-opacity-10 rounded">
                  <div className="bg-success rounded-circle pulse-dot me-2" style={{ width: '8px', height: '8px' }}></div>
                  <span className="text-success fw-medium small">Live Updates Active</span>
                </div>
                <Button variant="warning" className="text-dark d-flex align-items-center">
                  <Refresh className="me-2" size={16} />
                  Refresh All
                </Button>
              </div>
            </div>
          </Container>
        </header>

        {/* Search and Filter Bar */}
        <div className="bg-white border-bottom p-4">
          <Container fluid>
            <div className="d-flex justify-content-between align-items-center">
              <div className="d-flex align-items-center gap-3">
                <div style={{ width: '250px' }}>
                  <InputGroup>
                    <InputGroup.Text>
                      <Search size={16} />
                    </InputGroup.Text>
                    <Form.Control placeholder="Search devices..." />
                  </InputGroup>
                </div>
                <Dropdown>
                  <Dropdown.Toggle variant="light" className="d-flex align-items-center">
                    <Filter size={16} className="me-2" />
                    Filter by Status
                    <ChevronDown size={16} className="ms-2" />
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    <Dropdown.Item>All Devices</Dropdown.Item>
                    <Dropdown.Item>Online</Dropdown.Item>
                    <Dropdown.Item>Offline</Dropdown.Item>
                    <Dropdown.Item>Powered On</Dropdown.Item>
                    <Dropdown.Item>Powered Off</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </div>
              <div className="d-flex align-items-center text-muted small">
                <span>Total Devices: <strong className="text-dark">24</strong></span>
                <span className="mx-2">|</span>
                <span className="text-success">Online: <strong>22</strong></span>
                <span className="mx-2">|</span>
                <span className="text-danger">Offline: <strong>2</strong></span>
              </div>
            </div>
          </Container>
        </div>

        {/* Device Grid */}
        <div className="flex-grow-1 overflow-auto p-4">
          <Container fluid>
            <Row className="g-4">
              {devices.map(device => (
                <Col key={device.id} xs={12} sm={6} lg={4} xl={3}>
                  <Card className="h-100 shadow-sm hover-shadow">
                    <Card.Body>
                      <div className="d-flex justify-content-between mb-3">
                        <div className="d-flex align-items-center">
                          <div className={`${device.bgColor} rounded p-2 me-3`}>
                            {device.icon}
                          </div>
                          <div>
                            <h5 className="fw-semibold mb-0">{device.name}</h5>
                            <small className="text-muted">{device.location}</small>
                          </div>
                        </div>
                        <div className="d-flex flex-column align-items-end gap-1">
                          <Badge bg={device.status === 'online' ? 'success' : 'secondary'} className="text-uppercase">
                            {device.status}
                          </Badge>
                          <Badge bg={device.powerState === 'on' ? 'primary' : 'danger'} className="text-uppercase">
                            {device.powerState.toUpperCase()}
                          </Badge>
                        </div>
                      </div>

                      <div className="mb-3">
                        <div className="d-flex justify-content-between small text-muted mb-1">
                          <span>Power Consumption</span>
                          <span className="fw-medium text-dark">
                            {device.powerConsumption !== null ? `${device.powerConsumption}W` : '--W'}
                          </span>
                        </div>
                        <ProgressBar
                          now={device.powerConsumption ? (device.powerConsumption / 200) * 100 : 0}
                          variant={device.powerState === 'on' ? 'warning' : 'secondary'}
                          style={{ height: '6px' }}
                        />
                      </div>

                      <div className="d-flex justify-content-between align-items-center">
                        <small className={`text-${device.status === 'offline' ? 'danger' : 'muted'}`}>
                          {device.status === 'offline' ? `Last seen: ${device.updated}` : `Updated: ${device.updated}`}
                        </small>
                        <div className="d-flex align-items-center gap-2">
                          <Form.Check
                            type="switch"
                            id={`switch-${device.id}`}
                            checked={device.powerState === 'on'}
                            onChange={() => toggleDevice(device.id)}
                            disabled={device.status === 'offline'}
                            className={device.status === 'offline' ? 'opacity-50' : ''}
                          />
                          <Button
                            variant="light"
                            size="sm"
                            onClick={() => showOverrideModal(device.name)}
                            disabled={device.status === 'offline'}
                            className={device.status === 'offline' ? 'text-muted' : ''}
                          >
                            Override
                          </Button>
                        </div>
                      </div>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          </Container>
        </div>
      </div>

      {/* Override Confirmation Modal */}
      <Modal show={showOverrideModal} onHide={() => setShowOverrideModal(false)} centered>
        <Modal.Header closeButton>
          <div className="d-flex align-items-center">
            <div className="bg-warning bg-opacity-10 rounded-circle p-2 me-3">
              <AlertCircle className="text-warning" size={20} />
            </div>
            <Modal.Title className="fw-semibold">Manual Override Confirmation</Modal.Title>
          </div>
        </Modal.Header>
        <Modal.Body>
          <p className="text-muted">
            Are you sure you want to manually override the power state for <strong>{currentDevice}</strong>? 
            This action will bypass automated controls.
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="light" onClick={() => setShowOverrideModal(false)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={confirmOverride}>
            Confirm Override
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Success Toast */}
      <Toast 
        show={showToast} 
        onClose={() => setShowToast(false)} 
        className="position-fixed top-0 end-0 m-3" 
        bg="success"
        delay={3000}
        autohide
      >
        <Toast.Body className="text-white d-flex align-items-center">
          <Check className="me-2" size={18} />
          {toastMessage}
        </Toast.Body>
      </Toast>
    </div>
  );
};

export default DeviceMonitor;