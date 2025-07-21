import React, { useState, useEffect } from 'react';
// import 'bootstrap/dist/css/bootstrap.min.css';
import { RiDashboardLine, RiTableLine, RiBarChartLine, RiSettingsLine, RiUserLine, RiNotificationLine, RiGridLine, RiListCheck, RiBilliardsLine, RiGamepadLine, RiRestaurantLine, RiStopLine, RiPlayLine, RiArrowDownSLine } from 'react-icons/ri';
import { FaPlaystation } from 'react-icons/fa';

const TablesManagement = () => {
    const [currentTime, setCurrentTime] = useState('');
    const [tableTypeFilter, setTableTypeFilter] = useState('all');
    const [viewMode, setViewMode] = useState('grid');
    const [tables, setTables] = useState([
        {
            id: 'S1',
            name: 'Table S1',
            type: 'snooker',
            status: 'running',
            sessionTime: '02:34:15',
            currentBill: '$45.50',
            lightOn: true
        },
        {
            id: 'P1',
            name: 'Table P1',
            type: 'pool',
            status: 'free',
            sessionTime: '00:00:00',
            currentBill: '$0.00',
            lightOn: false
        },
        {
            id: 'PS1',
            name: 'PS1',
            type: 'playstation',
            status: 'running',
            sessionTime: '01:15:32',
            currentBill: '$22.75',
            lightOn: true
        },
        {
            id: 'R1',
            name: 'Table R1',
            type: 'restaurant',
            status: 'free',
            sessionTime: '00:00:00',
            currentBill: '$0.00',
            lightOn: false
        },
        {
            id: 'S2',
            name: 'Table S2',
            type: 'snooker',
            status: 'free',
            sessionTime: '00:00:00',
            currentBill: '$0.00',
            lightOn: false
        },
        {
            id: 'P2',
            name: 'Table P2',
            type: 'pool',
            status: 'running',
            sessionTime: '00:45:20',
            currentBill: '$18.25',
            lightOn: true
        },
        {
            id: 'PS2',
            name: 'PS2',
            type: 'playstation',
            status: 'free',
            sessionTime: '00:00:00',
            currentBill: '$0.00',
            lightOn: false
        },
        {
            id: 'R2',
            name: 'Table R2',
            type: 'restaurant',
            status: 'running',
            sessionTime: '03:22:45',
            currentBill: '$67.50',
            lightOn: true
        }
    ]);

    // Update current time every second
    useEffect(() => {
        const updateClock = () => {
            const now = new Date();
            const timeString = now.toLocaleTimeString('en-US', { hour12: false });
            setCurrentTime(timeString);
        };

        updateClock();
        const interval = setInterval(updateClock, 1000);
        return () => clearInterval(interval);
    }, []);

    // Update session timers for running tables
    useEffect(() => {
        const runningTables = tables.filter(table => table.status === 'running');
        if (runningTables.length === 0) return;

        const interval = setInterval(() => {
            setTables(prevTables =>
                prevTables.map(table => {
                    if (table.status === 'running') {
                        const [hours, minutes, seconds] = table.sessionTime.split(':').map(Number);
                        let totalSeconds = hours * 3600 + minutes * 60 + seconds + 1;

                        const h = Math.floor(totalSeconds / 3600);
                        const m = Math.floor((totalSeconds % 3600) / 60);
                        const s = totalSeconds % 60;

                        const formattedTime = `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;

                        return {
                            ...table,
                            sessionTime: formattedTime
                        };
                    }
                    return table;
                })
            );
        }, 1000);

        return () => clearInterval(interval);
    }, [tables]);

    const toggleLight = (tableId) => {
        setTables(prevTables =>
            prevTables.map(table =>
                table.id === tableId ? { ...table, lightOn: !table.lightOn } : table
            )
        );
    };

    const toggleSession = (tableId) => {
        setTables(prevTables =>
            prevTables.map(table => {
                if (table.id === tableId) {
                    const newStatus = table.status === 'running' ? 'free' : 'running';
                    return {
                        ...table,
                        status: newStatus,
                        sessionTime: newStatus === 'running' ? '00:00:01' : '00:00:00',
                        lightOn: newStatus === 'running' ? true : false
                    };
                }
                return table;
            })
        );
    };

    const filteredTables = tables.filter(table =>
        tableTypeFilter === 'all' || table.type === tableTypeFilter
    );

    const getTableIcon = (type) => {
        switch (type) {
            case 'snooker':
                return <RiBilliardsLine className="text-success fs-5" />;
            case 'pool':
                return <RiBilliardsLine className="text-primary fs-5" />;
            case 'playstation':
                return <FaPlaystation className="text-purple fs-5" />;
            case 'restaurant':
                return <RiRestaurantLine className="text-warning fs-5" />;
            default:
                return <RiTableLine className="text-secondary fs-5" />;
        }
    };

    const getTableIconBg = (type) => {
        switch (type) {
            case 'snooker':
                return 'bg-success bg-opacity-10';
            case 'pool':
                return 'bg-primary bg-opacity-10';
            case 'playstation':
                return 'bg-purple bg-opacity-10';
            case 'restaurant':
                return 'bg-warning bg-opacity-10';
            default:
                return 'bg-secondary bg-opacity-10';
        }
    };

    return (
        <div className="d-flex vh-100 bg-light">
            {/* Main Content */}
            <div className="d-flex flex-column flex-grow-1 overflow-hidden">
                {/* Header */}
                <header className="bg-white border-bottom p-3 p-md-4">
                    <div className="d-flex align-items-center justify-content-between flex-wrap gap-3">
                        <div>
                            <h1 className="h2 mb-1 fw-bold">Tables Management</h1>
                            <p className="mb-0 text-muted">Monitor and control all gaming tables</p>
                        </div>
                        <div className="d-flex align-items-center gap-3 gap-md-4">
                            <div className="text-end">
                                <p className="mb-0 small text-muted">Current Time</p>
                                <p className="mb-0 fs-5 fw-semibold">{currentTime}</p>
                            </div>
                            <div className="d-flex align-items-center justify-content-center bg-gray-100 rounded-circle" style={{ width: '32px', height: '32px' }}>
                                <RiNotificationLine className="text-muted" />
                            </div>
                        </div>
                    </div>
                </header>

                {/* Filter Bar */}
                <div className="bg-white border-bottom p-3 p-md-4">
                    <div className="d-flex align-items-center justify-content-between flex-wrap gap-3">
                        <div className="d-flex align-items-center gap-2 gap-md-3 flex-wrap">
                            {/* Table Type Filter */}
                            <div className="position-relative">
                                <select
                                    id="tableTypeFilter"
                                    className="form-select pe-5"
                                    value={tableTypeFilter}
                                    onChange={(e) => setTableTypeFilter(e.target.value)}
                                >
                                    <option value="all">All Tables</option>
                                    <option value="snooker">Snooker</option>
                                    <option value="pool">Pool</option>
                                    <option value="playstation">PlayStation</option>
                                    <option value="restaurant">Restaurant</option>
                                </select>
                                <div className="position-absolute top-50 end-0 translate-middle-y pe-2 pointer-events-none">

                                </div>
                            </div>

                            {/* View Toggle */}
                            <div className="d-flex bg-gray-100 rounded-3 p-1">
                                <button
                                    className={`btn btn-sm px-2 px-md-3 py-1 rounded-2 ${viewMode === 'grid' ? 'bg-white shadow-sm fw-medium' : 'text-muted'}`}
                                    onClick={() => setViewMode('grid')}
                                >
                                    <RiGridLine className="me-1" /> Grid
                                </button>
                                <button
                                    className={`btn btn-sm px-2 px-md-3 py-1 rounded-2 ${viewMode === 'list' ? 'bg-white shadow-sm fw-medium' : 'text-muted'}`}
                                    onClick={() => setViewMode('list')}
                                >
                                    <RiListCheck className="me-1" /> List
                                </button>
                            </div>
                        </div>

                        {/* Stats */}
                        <div className="d-flex align-items-center gap-3 gap-md-4 flex-wrap">
                            <div className="text-center">
                                <p className="mb-0 h4 fw-bold">8</p>
                                <p className="mb-0 small text-muted">Total Tables</p>
                            </div>
                            <div className="text-center">
                                <p className="mb-0 h4 fw-bold text-success">4</p>
                                <p className="mb-0 small text-muted">Running</p>
                            </div>
                            <div className="text-center">
                                <p className="mb-0 h4 fw-bold text-success">4</p>
                                <p className="mb-0 small text-muted">Available</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Tables Content */}
                <div className="flex-grow-1 overflow-auto p-3 p-md-4">
                    {viewMode === 'grid' ? (
                        <div className="row g-3 g-md-4">
                            {filteredTables.map(table => (
                                <div key={table.id} className="col-12 col-sm-6 col-md-4 col-lg-3">
                                    <div className="bg-white rounded-3 shadow-sm border overflow-hidden h-100 d-flex flex-column">
                                        <div className={`h-2 ${table.status === 'running' ? 'bg-danger' : 'bg-success'}`}></div>
                                        <div className="p-3 p-md-4 flex-grow-1 d-flex flex-column">
                                            <div className="d-flex align-items-center justify-content-between mb-3">
                                                <div className="d-flex align-items-center gap-2 gap-md-3">
                                                    <div className={`rounded-3 d-flex align-items-center justify-content-center ${getTableIconBg(table.type)}`} style={{ width: '40px', height: '40px' }}>
                                                        {getTableIcon(table.type)}
                                                    </div>
                                                    <div>
                                                        <h3 className="mb-0 fw-semibold fs-5">{table.name}</h3>
                                                        <p className="mb-0 small text-muted text-capitalize">{table.type}</p>
                                                    </div>
                                                </div>
                                                <span className={`px-2 py-1 rounded-pill small fw-medium ${table.status === 'running' ? 'bg-danger bg-opacity-10 text-danger' : 'bg-success bg-opacity-10 text-success'}`}>
                                                    {table.status === 'running' ? 'Running' : 'Available'}
                                                </span>
                                            </div>

                                            <div className="mb-3 mb-md-4 flex-grow-1">
                                                {table.status === 'running' ? (
                                                    <>
                                                        <div className="d-flex align-items-center justify-content-between mb-2">
                                                            <span className="small text-muted">Session Time</span>
                                                            <span className="font-monospace fw-bold">{table.sessionTime}</span>
                                                        </div>
                                                        <div className="d-flex align-items-center justify-content-between">
                                                            <span className="small text-muted">Current Bill</span>
                                                            <span className="fw-bold text-primary">{table.currentBill}</span>
                                                        </div>
                                                    </>
                                                ) : (
                                                    <div className="text-center py-3 py-md-4">
                                                        <p className="small text-muted">Ready for new session</p>
                                                    </div>
                                                )}
                                            </div>

                                            <div className="d-grid gap-2 gap-md-3">
                                                <button
                                                    className={`btn w-100 ${table.status === 'running' ? 'btn-danger' : 'btn-success'}`}
                                                    onClick={() => toggleSession(table.id)}
                                                >
                                                    {table.status === 'running' ? (
                                                        <>
                                                            <RiStopLine className="me-2" /> Stop Session
                                                        </>
                                                    ) : (
                                                        <>
                                                            <RiPlayLine className="me-2" /> Start Session
                                                        </>
                                                    )}
                                                </button>

                                                <div className="d-flex align-items-center justify-content-between">
                                                    <span className="small text-muted">Light/TV Control</span>
                                                    <div className="d-flex align-items-center gap-2">
                                                        <div
                                                            className={`toggle-switch ${table.lightOn ? 'active' : ''}`}
                                                            onClick={() => toggleLight(table.id)}
                                                        >
                                                            <div className="toggle-slider"></div>
                                                        </div>
                                                        <span className="x-small text-muted">{table.lightOn ? 'ON' : 'OFF'}</span>
                                                    </div>
                                                </div>

                                                <button className="btn btn-outline-secondary w-100 btn-sm">
                                                    Manual Bill Entry
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="bg-white rounded-3 shadow-sm border overflow-hidden">
                            <div className="table-responsive">
                                <table className="table table-hover mb-0">
                                    <thead className="table-light">
                                        <tr>
                                            <th>Table Info</th>
                                            <th>Status</th>
                                            <th>Session Time</th>
                                            <th className="text-end">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {filteredTables.map(table => (
                                            <tr key={table.id}>
                                                <td>
                                                    <div className="d-flex align-items-center gap-2 gap-md-3">
                                                        <div className={`rounded-3 d-flex align-items-center justify-content-center ${getTableIconBg(table.type)}`} style={{ width: '40px', height: '40px' }}>
                                                            {getTableIcon(table.type)}
                                                        </div>
                                                        <div>
                                                            <h3 className="mb-0 fw-semibold fs-6 fs-md-5">{table.name}</h3>
                                                            <p className="mb-0 small text-muted text-capitalize">{table.type}</p>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td>
                                                    <div className="d-flex align-items-center gap-2">
                                                        <span className={`px-2 py-1 rounded-pill small fw-medium ${table.status === 'running' ? 'bg-danger bg-opacity-10 text-danger' : 'bg-success bg-opacity-10 text-success'}`}>
                                                            {table.status === 'running' ? 'Running' : 'Available'}
                                                        </span>
                                                        {table.status === 'running' && (
                                                            <span className="small text-muted d-none d-md-inline">• Bill: {table.currentBill}</span>
                                                        )}
                                                    </div>
                                                </td>
                                                <td>
                                                    <span className="font-monospace fw-bold">
                                                        {table.status === 'running' ? table.sessionTime : 'Ready'}
                                                    </span>
                                                </td>
                                                <td className="text-end">
                                                    <div className="d-flex align-items-center gap-2 gap-md-3 justify-content-end">
                                                        <button
                                                            className={`btn btn-sm ${table.status === 'running' ? 'btn-danger' : 'btn-success'}`}
                                                            onClick={() => toggleSession(table.id)}
                                                        >
                                                            {table.status === 'running' ? (
                                                                <>
                                                                    <RiStopLine className="me-1 me-md-2" /> <span className="d-none d-md-inline">Stop</span>
                                                                </>
                                                            ) : (
                                                                <>
                                                                    <RiPlayLine className="me-1 me-md-2" /> <span className="d-none d-md-inline">Start</span>
                                                                </>
                                                            )}
                                                        </button>
                                                        <div
                                                            className={`toggle-switch ${table.lightOn ? 'active' : ''}`}
                                                            onClick={() => toggleLight(table.id)}
                                                        >
                                                            <div className="toggle-slider"></div>
                                                        </div>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Custom CSS */}
            <style jsx>{`
        .w-sidebar {
          width: 16rem;
        }
        .hover-bg-gray:hover {
          background-color: #f8f9fa;
        }
        .bg-gray-100 {
          background-color: #f8f9fa;
        }
        .text-purple {
          color: #6f42c1;
        }
        .bg-purple {
          background-color: #6f42c1;
        }
        .toggle-switch {
          width: 40px;
          height: 20px;
          background-color: #e9ecef;
          border-radius: 20px;
          position: relative;
          cursor: pointer;
          transition: background-color 0.3s;
        }
        .toggle-switch.active {
          background-color: #198754;
        }
        .toggle-slider {
          width: 16px;
          height: 16px;
          background-color: white;
          border-radius: 50%;
          position: absolute;
          top: 2px;
          left: 2px;
          transition: transform 0.3s;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
        }
        .toggle-switch.active .toggle-slider {
          transform: translateX(20px);
        }
        .x-small {
          font-size: 0.75rem;
        }
        @media (max-width: 576px) {
          .table-responsive {
            font-size: 0.875rem;
          }
        }
      `}</style>

            {/* Google Fonts */}
            <link href="https://fonts.googleapis.com/css2?family=Pacifico&display=swap" rel="stylesheet" />
        </div>
    );
};

export default TablesManagement;