import React, { useState, useEffect } from 'react';
import {
    Container, Row, Col, Card, Button, Form, ToggleButton, ToggleButtonGroup,
    Navbar, Nav, Badge, ProgressBar, Toast, Tooltip, OverlayTrigger
} from 'react-bootstrap';
import {
    Settings, Dashboard, Printer, Wifi, Image, Information, AlertCircle, ToggleOn
} from 'react-bootstrap-icons';

const BusinessSettings = () => {
    const [operationModes, setOperationModes] = useState({
        restaurant: true,
        gamezone: true,
        lounge: false
    });
    const [systemMode, setSystemMode] = useState('online');
    const [footerMessage, setFooterMessage] = useState(
        'Thank you for visiting GameZone Central! Follow us @gamezonecenter for latest updates and events.'
    );
    const [logoPreview, setLogoPreview] = useState(null);
    const [showOfflineBanner, setShowOfflineBanner] = useState(false);
    const [lastModeChange, setLastModeChange] = useState('January 15, 2025 at 9:15 AM');

    const toggleOperationMode = (mode) => {
        setOperationModes(prev => ({
            ...prev,
            [mode]: !prev[mode]
        }));
    };

    const toggleSystemMode = () => {
        const newMode = systemMode === 'online' ? 'offline' : 'online';
        setSystemMode(newMode);
        setShowOfflineBanner(newMode === 'offline');

        const now = new Date().toLocaleString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: 'numeric',
            minute: '2-digit',
            hour12: true
        });
        setLastModeChange(now);
    };

    const handleLogoUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
                setLogoPreview(event.target.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const removeLogo = () => {
        setLogoPreview(null);
    };

    const handleFooterChange = (e) => {
        setFooterMessage(e.target.value);
    };

    const charCount = footerMessage.length;

    const renderTooltip = (text) => (
        <Tooltip id="button-tooltip">
            {text}
        </Tooltip>
    );

    return (
        <div className="d-flex" style={{ minHeight: '100vh' }}>
            {/* Sidebar */}
            <div className="bg-white shadow" style={{ width: '250px', position: 'fixed', height: '100vh' }}>
                <div className="p-4 border-bottom">
                    <h1 className="fw-bold text-dark">GameHub</h1>
                </div>
                <Nav className="flex-column p-3">
                    <Nav.Item>
                        <Nav.Link href="#" className="d-flex align-items-center text-dark">
                            <Dashboard className="me-3" />
                            Dashboard
                        </Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link active className="d-flex align-items-center bg-warning text-dark rounded">
                            <Settings className="me-3" />
                            Business Settings
                        </Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link href="#" className="d-flex align-items-center text-dark">
                            <Printer className="me-3" />
                            Printer Setup
                        </Nav.Link>
                    </Nav.Item>
                </Nav>
            </div>

            {/* Main Content */}
            <div className="flex-grow-1" style={{ marginLeft: '250px', padding: '2rem' }}>
                {/* Header */}
                <div className="mb-4">
                    <div className="d-flex justify-content-between align-items-center">
                        <div>
                            <nav aria-label="breadcrumb" className="text-muted small mb-2">
                                <span>Dashboard</span>
                                <span className="mx-2">/</span>
                                <span className="text-dark">Business Settings</span>
                            </nav>
                            <h1 className="d-flex align-items-center">
                                <Settings className="me-3" size={24} />
                                Business Settings
                            </h1>
                        </div>
                        <div className="d-flex align-items-center">
                            <span className={`status-dot ${systemMode === 'online' ? 'bg-success' : 'bg-secondary'}`}></span>
                            <span className="ms-2 small text-muted">
                                System {systemMode === 'online' ? 'Online' : 'Offline'}
                            </span>
                        </div>
                    </div>
                </div>

                {/* Offline Mode Banner */}
                {showOfflineBanner && (
                    <div className="bg-warning rounded p-3 mb-4 d-flex align-items-center">
                        <AlertCircle className="text-white me-3" size={20} />
                        <div className="text-white">
                            <div className="fw-bold">System is currently operating in offline mode</div>
                            <div className="small opacity-90">Last switched: {lastModeChange}</div>
                        </div>
                    </div>
                )}

                <Row className="g-4">
                    {/* Operation Modes Card */}
                    <Col lg={6}>
                        <Card className="h-100">
                            <Card.Body>
                                <div className="d-flex align-items-center mb-4">
                                    <ToggleOn className="me-3 text-dark" size={20} />
                                    <h2 className="h5 mb-0">Operation Modes</h2>
                                </div>

                                <div className="d-flex flex-column gap-4">
                                    {/* Restaurant Mode */}
                                    <div className="d-flex justify-content-between align-items-center">
                                        <div className="d-flex align-items-center">
                                            <span className={`status-dot ${operationModes.restaurant ? 'bg-success' : 'bg-secondary'} me-3`}></span>
                                            <div>
                                                <div className="fw-bold">Restaurant Mode</div>
                                                <div className="small text-muted">Enable food ordering and dining services</div>
                                            </div>
                                            <OverlayTrigger
                                                placement="bottom"
                                                overlay={renderTooltip('Manages restaurant operations, menu, and orders')}
                                            >
                                                <span className="ms-2 text-muted">
                                                    <Information size={16} />
                                                </span>
                                            </OverlayTrigger>
                                        </div>
                                        <Form.Check
                                            type="switch"
                                            id="restaurant-mode"
                                            checked={operationModes.restaurant}
                                            onChange={() => toggleOperationMode('restaurant')}
                                        />
                                    </div>

                                    {/* Game Zone Mode */}
                                    <div className="d-flex justify-content-between align-items-center">
                                        <div className="d-flex align-items-center">
                                            <span className={`status-dot ${operationModes.gamezone ? 'bg-success' : 'bg-secondary'} me-3`}></span>
                                            <div>
                                                <div className="fw-bold">Game Zone Mode</div>
                                                <div className="small text-muted">Activate gaming area and arcade management</div>
                                            </div>
                                            <OverlayTrigger
                                                placement="bottom"
                                                overlay={renderTooltip('Controls game machines, scoring, and tournaments')}
                                            >
                                                <span className="ms-2 text-muted">
                                                    <Information size={16} />
                                                </span>
                                            </OverlayTrigger>
                                        </div>
                                        <Form.Check
                                            type="switch"
                                            id="gamezone-mode"
                                            checked={operationModes.gamezone}
                                            onChange={() => toggleOperationMode('gamezone')}
                                        />
                                    </div>

                                    {/* Lounge Mode */}
                                    <div className="d-flex justify-content-between align-items-center">
                                        <div className="d-flex align-items-center">
                                            <span className={`status-dot ${operationModes.lounge ? 'bg-success' : 'bg-secondary'} me-3`}></span>
                                            <div>
                                                <div className="fw-bold">Lounge Mode</div>
                                                <div className="small text-muted">Enable relaxation area and social services</div>
                                            </div>
                                            <OverlayTrigger
                                                placement="bottom"
                                                overlay={renderTooltip('Manages seating areas, events, and social activities')}
                                            >
                                                <span className="ms-2 text-muted">
                                                    <Information size={16} />
                                                </span>
                                            </OverlayTrigger>
                                        </div>
                                        <Form.Check
                                            type="switch"
                                            id="lounge-mode"
                                            checked={operationModes.lounge}
                                            onChange={() => toggleOperationMode('lounge')}
                                        />
                                    </div>
                                </div>

                                <div className="mt-4 pt-3 border-top small text-muted">
                                    Last updated: January 15, 2025 at 2:30 PM
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>

                    {/* Receipt Branding Card */}
                    <Col lg={6}>
                        <Card className="h-100">
                            <Card.Body>
                                <div className="d-flex align-items-center mb-4">
                                    <Image className="me-3 text-dark" size={20} />
                                    <h2 className="h5 mb-0">Receipt Customization</h2>
                                </div>

                                {/* Logo Section */}
                                <div className="mb-4">
                                    <Form.Label>Business Logo</Form.Label>
                                    <div className="d-flex gap-4">
                                        <div className="border rounded p-3 d-flex align-items-center justify-content-center" style={{ width: '120px', height: '80px' }}>
                                            {logoPreview ? (
                                                <img src={logoPreview} alt="Logo Preview" className="img-fluid" />
                                            ) : (
                                                <div className="text-center">
                                                    <Image className="text-muted mb-1" size={24} />
                                                    <div className="small text-muted">No logo</div>
                                                </div>
                                            )}
                                        </div>
                                        <div className="d-flex flex-column gap-2">
                                            <Form.Group controlId="logoUpload">
                                                <Form.Label className="btn btn-warning text-dark">
                                                    Upload Logo
                                                </Form.Label>
                                                <Form.Control
                                                    type="file"
                                                    className="d-none"
                                                    onChange={handleLogoUpload}
                                                    accept="image/*"
                                                />
                                            </Form.Group>
                                            <Button variant="link" className="text-danger p-0 text-start" onClick={removeLogo}>
                                                Remove
                                            </Button>
                                        </div>
                                    </div>
                                    <Form.Text className="text-muted">
                                        Recommended size: 300x200px, PNG or JPG format
                                    </Form.Text>
                                </div>

                                {/* Footer Text Section */}
                                <div className="mb-4">
                                    <Form.Label>Footer Message</Form.Label>
                                    <Form.Control
                                        as="textarea"
                                        rows={3}
                                        value={footerMessage}
                                        onChange={handleFooterChange}
                                        maxLength={200}
                                        placeholder="Enter custom footer message for receipts"
                                    />
                                    <div className="d-flex justify-content-between mt-2">
                                        <Form.Text className="text-muted">
                                            This message will appear at the bottom of all receipts
                                        </Form.Text>
                                        <Form.Text className={charCount > 180 ? 'text-danger' : 'text-muted'}>
                                            {charCount}/200
                                        </Form.Text>
                                    </div>
                                </div>

                                {/* Action Buttons */}
                                <div className="d-flex gap-3">
                                    <Button variant="warning" className="text-dark">
                                        Save Changes
                                    </Button>
                                    <Button variant="outline-secondary">
                                        Reset
                                    </Button>
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>

                    {/* Offline Mode Card */}
                    <Col xs={12}>
                        <Card>
                            <Card.Body>
                                <div className="d-flex justify-content-between align-items-center mb-4">
                                    <div className="d-flex align-items-center">
                                        <Wifi className="me-3 text-dark" size={20} />
                                        <div>
                                            <h2 className="h5 mb-0">System Mode</h2>
                                            <div className="small text-muted">Switch between online and offline operation</div>
                                        </div>
                                    </div>
                                    <div className="d-flex align-items-center gap-3">
                                        <span className="small">Offline</span>
                                        <Form.Check
                                            type="switch"
                                            id="system-mode"
                                            checked={systemMode === 'online'}
                                            onChange={toggleSystemMode}
                                        />
                                        <span className="small">Online</span>
                                    </div>
                                </div>

                                <div className="bg-light rounded p-3">
                                    <div className="d-flex gap-3">
                                        <Information className="text-primary mt-1" size={20} />
                                        <div>
                                            <div className="fw-bold mb-2">About System Modes:</div>
                                            <div className="small">
                                                <p><strong>Online Mode:</strong> Full connectivity with cloud services, real-time updates, and remote monitoring.</p>
                                                <p><strong>Offline Mode:</strong> Local operation only, data syncs when connection is restored.</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-3 small text-muted">
                                    Last mode change: {lastModeChange}
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </div>

            <style jsx>{`
        .status-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          display: inline-block;
        }
      `}</style>
        </div>
    );
};

export default BusinessSettings;