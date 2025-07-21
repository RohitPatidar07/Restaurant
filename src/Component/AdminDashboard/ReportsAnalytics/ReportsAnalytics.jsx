import React, { useState } from 'react';
import {
    Container, Row, Col, Card, Button, Form, Nav, Tab,
    Table, Badge, ProgressBar, Dropdown, Toast
} from 'react-bootstrap';
import {
    BarChart, Calendar, DollarSign, Printer, User, ChevronDown,
    Info, ArrowUp, ArrowDown, Fire, Users, Clock, Table as TableIcon
} from 'react-feather';
import ReactECharts from 'echarts-for-react';

const ReportsAnalytics = () => {
    const [showToast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState('');

    // Chart options
    const sessionTrendsOptions = {
        animation: false,
        grid: { top: 20, right: 20, bottom: 40, left: 40 },
        xAxis: {
            type: 'category',
            data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
            axisLine: { lineStyle: { color: '#e5e7eb' } },
            axisTick: { show: false }
        },
        yAxis: {
            type: 'value',
            axisLine: { show: false },
            axisTick: { show: false },
            splitLine: { lineStyle: { color: '#f3f4f6' } }
        },
        series: [{
            data: [120, 132, 101, 134, 90, 230, 210],
            type: 'line',
            smooth: true,
            lineStyle: { color: 'rgba(87, 181, 231, 1)', width: 3 },
            itemStyle: { color: 'rgba(87, 181, 231, 1)' },
            areaStyle: {
                color: {
                    type: 'linear',
                    x: 0, y: 0, x2: 0, y2: 1,
                    colorStops: [
                        { offset: 0, color: 'rgba(87, 181, 231, 0.1)' },
                        { offset: 1, color: 'rgba(87, 181, 231, 0.01)' }
                    ]
                }
            },
            showSymbol: false
        }]
    };

    const tableUsageOptions = {
        animation: false,
        grid: { top: 20, right: 20, bottom: 40, left: 60 },
        xAxis: {
            type: 'category',
            data: ['Snooker', 'Pool', 'PlayStation', 'Restaurant'],
            axisLine: { lineStyle: { color: '#e5e7eb' } },
            axisTick: { show: false }
        },
        yAxis: {
            type: 'value',
            axisLine: { show: false },
            axisTick: { show: false },
            splitLine: { lineStyle: { color: '#f3f4f6' } }
        },
        series: [{
            data: [45, 38, 52, 28],
            type: 'bar',
            itemStyle: {
                color: 'rgba(141, 211, 199, 1)',
                borderRadius: [4, 4, 0, 0]
            },
            barWidth: '60%'
        }]
    };

    const revenueCategoryOptions = {
        animation: false,
        grid: { top: 20, right: 20, bottom: 40, left: 60 },
        xAxis: {
            type: 'category',
            data: ['Food', 'Drinks', 'Games', 'Others'],
            axisLine: { lineStyle: { color: '#e5e7eb' } },
            axisTick: { show: false }
        },
        yAxis: {
            type: 'value',
            axisLine: { show: false },
            axisTick: { show: false },
            splitLine: { lineStyle: { color: '#f3f4f6' } }
        },
        series: [
            {
                name: 'Table Revenue',
                type: 'bar',
                stack: 'total',
                data: [2200, 1800, 3200, 1220],
                itemStyle: { color: 'rgba(87, 181, 231, 1)', borderRadius: [0, 0, 0, 0] }
            },
            {
                name: 'Order Revenue',
                type: 'bar',
                stack: 'total',
                data: [1800, 1200, 800, 327],
                itemStyle: { color: 'rgba(141, 211, 199, 1)', borderRadius: [4, 4, 0, 0] }
            }
        ]
    };

    const revenueShareOptions = {
        animation: false,
        series: [{
            type: 'pie',
            radius: ['40%', '70%'],
            center: ['50%', '50%'],
            data: [
                { value: 8420, name: 'Table Revenue', itemStyle: { color: 'rgba(87, 181, 231, 1)' } },
                { value: 4127, name: 'Order Revenue', itemStyle: { color: 'rgba(141, 211, 199, 1)' } },
                { value: 300, name: 'Discounts', itemStyle: { color: 'rgba(252, 141, 98, 1)' } }
            ],
            itemStyle: { borderRadius: 8 },
            label: { show: false }
        }]
    };

    const kotVolumeOptions = {
        animation: false,
        grid: { top: 20, right: 20, bottom: 40, left: 40 },
        xAxis: {
            type: 'category',
            data: ['9AM', '10AM', '11AM', '12PM', '1PM', '2PM', '3PM', '4PM', '5PM', '6PM', '7PM', '8PM'],
            axisLine: { lineStyle: { color: '#e5e7eb' } },
            axisTick: { show: false }
        },
        yAxis: {
            type: 'value',
            axisLine: { show: false },
            axisTick: { show: false },
            splitLine: { lineStyle: { color: '#f3f4f6' } }
        },
        series: [{
            data: [12, 18, 25, 42, 38, 35, 28, 45, 52, 48, 35, 22],
            type: 'bar',
            itemStyle: {
                color: 'rgba(87, 181, 231, 1)',
                borderRadius: [4, 4, 0, 0]
            },
            barWidth: '60%'
        }]
    };

    const errorPercentageOptions = {
        animation: false,
        series: [{
            type: 'gauge',
            center: ['50%', '60%'],
            startAngle: 200,
            endAngle: -20,
            min: 0,
            max: 100,
            splitNumber: 10,
            itemStyle: { color: '#ef4444' },
            progress: { show: true, width: 18 },
            pointer: { show: false },
            axisLine: { lineStyle: { width: 18 } },
            axisTick: { show: false },
            splitLine: { show: false },
            axisLabel: { show: false },
            detail: {
                valueAnimation: true,
                formatter: '{value}%',
                color: '#1f2937',
                fontSize: 24,
                fontWeight: 'bold',
                offsetCenter: [0, '20%']
            },
            data: [{ value: 2.3, name: 'Error Rate' }]
        }]
    };

    const showToastMessage = (message) => {
        setToastMessage(message);
        setShowToast(true);
        setTimeout(() => setShowToast(false), 3000);
    };

    return (
        <div className="d-flex flex-column" style={{ minHeight: '100vh' }}>
            {/* Header */}
            <header className="bg-white border-bottom p-3">
                <div className="d-flex justify-content-between align-items-center">
                    <div className="d-flex align-items-center gap-3">
                        <h1 className="h4 mb-0">GameCenter Pro</h1>
                        <h2 className="h5 mb-0 text-muted">Reports & Analytics</h2>
                        <div className="d-flex align-items-center">
                            <span className="real-time-indicator bg-success rounded-circle me-2" style={{ width: '8px', height: '8px' }}></span>
                            <span className="small text-muted">Live</span>
                        </div>
                    </div>

                    <div className="d-flex align-items-center gap-3">
                        <div className="d-flex align-items-center bg-light rounded p-2 border">
                            <Calendar size={16} className="text-muted me-2" />
                            <Form.Select size="sm" variant="light" className="border-0 bg-transparent">
                                <option>Today</option>
                                <option>This Week</option>
                                <option>This Month</option>
                                <option>Custom Range</option>
                            </Form.Select>
                        </div>

                        <div className="d-flex align-items-center gap-2">
                            <div className="bg-warning rounded-circle p-2">
                                <User size={16} className="text-dark" />
                            </div>
                            <span className="small fw-medium">Admin</span>
                        </div>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="flex-grow-1 p-4">
                {/* Navigation Tabs */}
                <Tab.Container defaultActiveKey="daily-sessions">
                    <div className="mb-4 border-bottom">
                        <Nav variant="tabs" className="mb-0">
                            <Nav.Item>
                                <Nav.Link eventKey="daily-sessions" className="d-flex align-items-center gap-2">
                                    <Calendar size={16} />
                                    <span>Daily Sessions</span>
                                </Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link eventKey="revenue" className="d-flex align-items-center gap-2">
                                    <DollarSign size={16} />
                                    <span>Revenue Analysis</span>
                                </Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link eventKey="kot-logs" className="d-flex align-items-center gap-2">
                                    <Printer size={16} />
                                    <span>KOT Logs & Errors</span>
                                </Nav.Link>
                            </Nav.Item>
                        </Nav>
                    </div>

                    <Tab.Content>
                        {/* Daily Sessions Tab */}
                        <Tab.Pane eventKey="daily-sessions">
                            {/* KPI Cards */}
                            <Row className="g-3 mb-4">
                                <Col md={4}>
                                    <Card className="h-100">
                                        <Card.Body>
                                            <div className="d-flex justify-content-between">
                                                <div>
                                                    <p className="small text-muted mb-1">Total Sessions</p>
                                                    <h3 className="h3 fw-bold">1,247</h3>
                                                    <div className="d-flex align-items-center mt-2">
                                                        <ArrowUp size={16} className="text-success me-1" />
                                                        <span className="small text-success">12.5% vs yesterday</span>
                                                    </div>
                                                </div>
                                                <div className="bg-blue-100 rounded p-3">
                                                    <Users size={20} className="text-blue-600" />
                                                </div>
                                            </div>
                                        </Card.Body>
                                    </Card>
                                </Col>

                                <Col md={4}>
                                    <Card className="h-100">
                                        <Card.Body>
                                            <div className="d-flex justify-content-between">
                                                <div>
                                                    <p className="small text-muted mb-1">Average Duration</p>
                                                    <h3 className="h3 fw-bold">2.4h</h3>
                                                    <div className="d-flex align-items-center mt-2">
                                                        <ArrowUp size={16} className="text-success me-1" />
                                                        <span className="small text-success">8.2% increase</span>
                                                    </div>
                                                </div>
                                                <div className="bg-green-100 rounded p-3">
                                                    <Clock size={20} className="text-green-600" />
                                                </div>
                                            </div>
                                        </Card.Body>
                                    </Card>
                                </Col>

                                <Col md={4}>
                                    <Card className="h-100">
                                        <Card.Body>
                                            <div className="d-flex justify-content-between">
                                                <div>
                                                    <p className="small text-muted mb-1">Peak Usage</p>
                                                    <h3 className="h3 fw-bold">8:00 PM</h3>
                                                    <div className="d-flex align-items-center mt-2">
                                                        <ArrowDown size={16} className="text-danger me-1" />
                                                        <span className="small text-danger">30min earlier</span>
                                                    </div>
                                                </div>
                                                <div className="bg-orange-100 rounded p-3">
                                                    <Fire size={20} className="text-orange-600" />
                                                </div>
                                            </div>
                                        </Card.Body>
                                    </Card>
                                </Col>
                            </Row>

                            {/* Charts */}
                            <Row className="g-3 mb-4">
                                <Col md={6}>
                                    <Card>
                                        <Card.Body>
                                            <Card.Title>Session Trends</Card.Title>
                                            <div style={{ height: '300px' }}>
                                                <ReactECharts option={sessionTrendsOptions} />
                                            </div>
                                        </Card.Body>
                                    </Card>
                                </Col>

                                <Col md={6}>
                                    <Card>
                                        <Card.Body>
                                            <Card.Title>Table Usage by Type</Card.Title>
                                            <div style={{ height: '300px' }}>
                                                <ReactECharts option={tableUsageOptions} />
                                            </div>
                                        </Card.Body>
                                    </Card>
                                </Col>
                            </Row>

                            {/* Sessions Table */}
                            <Card className="mb-4">
                                <Card.Header className="d-flex justify-content-between align-items-center">
                                    <Card.Title className="mb-0">Session Details</Card.Title>
                                    <div className="d-flex gap-2">
                                        <Button variant="warning" size="sm" className="text-dark">
                                            Export CSV
                                        </Button>
                                        <Button variant="light" size="sm">
                                            Export PDF
                                        </Button>
                                    </div>
                                </Card.Header>
                                <Card.Body className="p-0">
                                    <Table striped bordered hover className="mb-0">
                                        <thead>
                                            <tr>
                                                <th>Session ID</th>
                                                <th>Table Type</th>
                                                <th>Start Time</th>
                                                <th>End Time</th>
                                                <th>Duration</th>
                                                <th>Revenue</th>
                                                <th>Status</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>#SES001</td>
                                                <td>Snooker Table 1</td>
                                                <td>14:30</td>
                                                <td>17:15</td>
                                                <td>2h 45m</td>
                                                <td>$45.00</td>
                                                <td><Badge bg="success">Completed</Badge></td>
                                            </tr>
                                            <tr>
                                                <td>#SES002</td>
                                                <td>PlayStation 3</td>
                                                <td>15:00</td>
                                                <td>-</td>
                                                <td>1h 23m</td>
                                                <td>$28.50</td>
                                                <td><Badge bg="primary">Active</Badge></td>
                                            </tr>
                                        </tbody>
                                    </Table>
                                </Card.Body>
                            </Card>
                        </Tab.Pane>

                        {/* Revenue Tab */}
                        <Tab.Pane eventKey="revenue">
                            {/* Revenue KPI Cards */}
                            <Row className="g-3 mb-4">
                                <Col md={3}>
                                    <Card>
                                        <Card.Body>
                                            <div className="d-flex justify-content-between">
                                                <div>
                                                    <p className="small text-muted mb-1">Total Revenue</p>
                                                    <h3 className="h4 fw-bold">$12,847</h3>
                                                </div>
                                                <div className="bg-green-100 rounded p-2">
                                                    <DollarSign size={18} className="text-green-600" />
                                                </div>
                                            </div>
                                        </Card.Body>
                                    </Card>
                                </Col>

                                <Col md={3}>
                                    <Card>
                                        <Card.Body>
                                            <div className="d-flex justify-content-between">
                                                <div>
                                                    <p className="small text-muted mb-1">Table Revenue</p>
                                                    <h3 className="h4 fw-bold">$8,420</h3>
                                                </div>
                                                <div className="bg-blue-100 rounded p-2">
                                                    <TableIcon size={18} className="text-blue-600" />
                                                </div>
                                            </div>
                                        </Card.Body>
                                    </Card>
                                </Col>

                                <Col md={3}>
                                    <Card>
                                        <Card.Body>
                                            <div className="d-flex justify-content-between">
                                                <div>
                                                    <p className="small text-muted mb-1">Order Revenue</p>
                                                    <h3 className="h4 fw-bold">$4,127</h3>
                                                </div>
                                                <div className="bg-orange-100 rounded p-2">
                                                    <DollarSign size={18} className="text-orange-600" />
                                                </div>
                                            </div>
                                        </Card.Body>
                                    </Card>
                                </Col>

                                <Col md={3}>
                                    <Card>
                                        <Card.Body>
                                            <div className="d-flex justify-content-between">
                                                <div>
                                                    <p className="small text-muted mb-1">Discounts Applied</p>
                                                    <h3 className="h4 fw-bold">$300</h3>
                                                </div>
                                                <div className="bg-red-100 rounded p-2">
                                                    <DollarSign size={18} className="text-red-600" />
                                                </div>
                                            </div>
                                        </Card.Body>
                                    </Card>
                                </Col>
                            </Row>

                            {/* Revenue Filters */}
                            <Card className="mb-4">
                                <Card.Body>
                                    <Row className="g-3">
                                        <Col md={4}>
                                            <Form.Group className="mb-0">
                                                <Form.Label className="small">Date Range:</Form.Label>
                                                <Form.Select size="sm">
                                                    <option>Last 7 days</option>
                                                    <option>Last 30 days</option>
                                                    <option>This month</option>
                                                </Form.Select>
                                            </Form.Group>
                                        </Col>

                                        <Col md={4}>
                                            <Form.Group className="mb-0">
                                                <Form.Label className="small">Table Type:</Form.Label>
                                                <Form.Select size="sm">
                                                    <option>All Tables</option>
                                                    <option>Snooker</option>
                                                    <option>Pool</option>
                                                    <option>PlayStation</option>
                                                </Form.Select>
                                            </Form.Group>
                                        </Col>

                                        <Col md={4}>
                                            <Form.Group className="mb-0">
                                                <Form.Label className="small">Category:</Form.Label>
                                                <Form.Select size="sm">
                                                    <option>All Categories</option>
                                                    <option>Food</option>
                                                    <option>Drinks</option>
                                                    <option>Games</option>
                                                </Form.Select>
                                            </Form.Group>
                                        </Col>
                                    </Row>
                                </Card.Body>
                            </Card>

                            {/* Revenue Charts */}
                            <Row className="g-3 mb-4">
                                <Col md={4}>
                                    <Card>
                                        <Card.Body>
                                            <Card.Title>Revenue by Category</Card.Title>
                                            <div style={{ height: '300px' }}>
                                                <ReactECharts option={revenueCategoryOptions} />
                                            </div>
                                        </Card.Body>
                                    </Card>
                                </Col>

                                <Col md={4}>
                                    <Card>
                                        <Card.Body>
                                            <Card.Title>Revenue Share</Card.Title>
                                            <div style={{ height: '300px' }}>
                                                <ReactECharts option={revenueShareOptions} />
                                            </div>
                                        </Card.Body>
                                    </Card>
                                </Col>

                                <Col md={4}>
                                    <Card>
                                        <Card.Body>
                                            <Card.Title>Revenue Timeline</Card.Title>
                                            <div style={{ height: '300px' }}>
                                                <ReactECharts option={sessionTrendsOptions} />
                                            </div>
                                        </Card.Body>
                                    </Card>
                                </Col>
                            </Row>

                            {/* Revenue Details Table */}
                            <Card>
                                <Card.Header>
                                    <Card.Title className="mb-0">Revenue Details</Card.Title>
                                </Card.Header>
                                <Card.Body className="p-0">
                                    <Table striped bordered hover className="mb-0">
                                        <thead>
                                            <tr>
                                                <th>Order ID</th>
                                                <th>Table</th>
                                                <th>Category</th>
                                                <th>Items</th>
                                                <th>Amount</th>
                                                <th>Discount</th>
                                                <th>Total</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>#ORD001</td>
                                                <td>Snooker Table 1</td>
                                                <td>Food & Drinks</td>
                                                <td>2 Burgers, 2 Cokes</td>
                                                <td>$24.50</td>
                                                <td>$2.50</td>
                                                <td>$22.00</td>
                                            </tr>
                                        </tbody>
                                    </Table>
                                </Card.Body>
                            </Card>
                        </Tab.Pane>

                        {/* KOT Logs Tab */}
                        <Tab.Pane eventKey="kot-logs">
                            <Row className="g-3 mb-4">
                                <Col md={8}>
                                    <Card>
                                        <Card.Header className="d-flex justify-content-between align-items-center">
                                            <Card.Title className="mb-0">KOT Real-time Feed</Card.Title>
                                            <div className="d-flex gap-3">
                                                <Form.Select size="sm" className="w-auto">
                                                    <option>All Printers</option>
                                                    <option>Kitchen</option>
                                                    <option>Bar</option>
                                                </Form.Select>
                                                <Form.Select size="sm" className="w-auto">
                                                    <option>All Status</option>
                                                    <option>Printed</option>
                                                    <option>Queued</option>
                                                    <option>Error</option>
                                                </Form.Select>
                                            </div>
                                        </Card.Header>
                                        <Card.Body className="p-0">
                                            <div className="p-3" style={{ maxHeight: '400px', overflowY: 'auto' }}>
                                                <div className="d-flex justify-content-between align-items-center p-3 bg-light rounded mb-2">
                                                    <div className="d-flex align-items-center gap-3">
                                                        <span className="bg-success rounded-circle" style={{ width: '12px', height: '12px' }}></span>
                                                        <div>
                                                            <p className="fw-medium mb-0">#KOT001</p>
                                                            <p className="small text-muted mb-0">Table 5 • Kitchen • 14:32</p>
                                                        </div>
                                                    </div>
                                                    <Badge bg="success">Printed</Badge>
                                                </div>

                                                <div className="d-flex justify-content-between align-items-center p-3 bg-light rounded mb-2">
                                                    <div className="d-flex align-items-center gap-3">
                                                        <span className="bg-warning rounded-circle" style={{ width: '12px', height: '12px' }}></span>
                                                        <div>
                                                            <p className="fw-medium mb-0">#KOT002</p>
                                                            <p className="small text-muted mb-0">Table 2 • Bar • 14:35</p>
                                                        </div>
                                                    </div>
                                                    <Badge bg="warning">Queued</Badge>
                                                </div>

                                                <div className="d-flex justify-content-between align-items-center p-3 bg-danger bg-opacity-10 rounded mb-2 border border-danger border-opacity-25">
                                                    <div className="d-flex align-items-center gap-3">
                                                        <span className="bg-danger rounded-circle" style={{ width: '12px', height: '12px' }}></span>
                                                        <div>
                                                            <p className="fw-medium mb-0">#KOT003</p>
                                                            <p className="small text-muted mb-0">Table 8 • Kitchen • 14:38</p>
                                                        </div>
                                                    </div>
                                                    <Badge bg="danger">Error</Badge>
                                                </div>
                                            </div>
                                        </Card.Body>
                                    </Card>
                                </Col>

                                <Col md={4}>
                                    <Card className="h-100">
                                        <Card.Header className="bg-danger bg-opacity-10">
                                            <Card.Title className="mb-0 text-danger">Active Errors</Card.Title>
                                        </Card.Header>
                                        <Card.Body>
                                            <div className="p-3 bg-danger bg-opacity-10 rounded mb-3 border border-danger border-opacity-25">
                                                <div className="mb-3">
                                                    <p className="fw-medium mb-1">#KOT003</p>
                                                    <p className="small text-muted mb-2">Kitchen Printer Offline</p>
                                                    <p className="small text-muted">14:38 - 2 min ago</p>
                                                </div>
                                                <div className="d-flex gap-2">
                                                    <Button variant="warning" size="sm" className="text-dark">
                                                        Retry
                                                    </Button>
                                                    <Button variant="light" size="sm">
                                                        Mark Resolved
                                                    </Button>
                                                </div>
                                            </div>
                                        </Card.Body>
                                    </Card>
                                </Col>
                            </Row>

                            {/* KOT Charts */}
                            <Row className="g-3">
                                <Col md={6}>
                                    <Card>
                                        <Card.Body>
                                            <Card.Title>KOT Volume by Hour</Card.Title>
                                            <div style={{ height: '300px' }}>
                                                <ReactECharts option={kotVolumeOptions} />
                                            </div>
                                        </Card.Body>
                                    </Card>
                                </Col>

                                <Col md={6}>
                                    <Card>
                                        <Card.Body>
                                            <Card.Title>Error Percentage</Card.Title>
                                            <div style={{ height: '300px' }}>
                                                <ReactECharts option={errorPercentageOptions} />
                                            </div>
                                        </Card.Body>
                                    </Card>
                                </Col>
                            </Row>
                        </Tab.Pane>
                    </Tab.Content>
                </Tab.Container>
            </main>

            {/* Toast Notification */}
            <Toast
                show={showToast}
                onClose={() => setShowToast(false)}
                className="position-fixed top-0 end-0 m-3"
                delay={3000}
                autohide
            >
                <Toast.Header>
                    <strong className="me-auto">Notification</strong>
                </Toast.Header>
                <Toast.Body>{toastMessage}</Toast.Body>
            </Toast>

            <style jsx>{`
        .real-time-indicator {
          animation: pulse 2s infinite;
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
        .nav-tabs .nav-link {
          border: none;
          padding: 0.75rem 1.5rem;
          color: #6b7280;
          font-weight: 500;
        }
        .nav-tabs .nav-link.active {
          color: #3b82f6;
          border-bottom: 3px solid #3b82f6;
          background-color: transparent;
        }
        .nav-tabs .nav-link:hover:not(.active) {
          border-color: transparent;
          color: #3b82f6;
        }
      `}</style>
        </div>
    );
};

export default ReportsAnalytics;