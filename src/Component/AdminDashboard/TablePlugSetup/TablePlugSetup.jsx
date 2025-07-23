import React, { useState } from 'react';
// import 'bootstrap/dist/css/bootstrap.min.css';
import {
    FaGamepad, FaBell, FaUser, FaTachometerAlt, FaMoneyBillAlt,
    FaTable, FaUsers, FaChartBar, FaCog, FaTableTennis,
    FaClock, FaPlug, FaPlus, FaAngleDown, FaEdit,
    FaTrashAlt, FaPlay, FaStop, FaTimes
} from 'react-icons/fa';

function TabelPlugSetup() {
    const [selectedTableType, setSelectedTableType] = useState('Select table type');
    const [selectedRateTable, setSelectedRateTable] = useState('Select table or group');
    const [selectedPlugTable, setSelectedPlugTable] = useState('Select table');
    const [tableTypeDropdownOpen, setTableTypeDropdownOpen] = useState(false);
    const [rateTableDropdownOpen, setRateTableDropdownOpen] = useState(false);
    const [plugTableDropdownOpen, setPlugTableDropdownOpen] = useState(false);
    const [groupModalOpen, setGroupModalOpen] = useState(false);
    const [editingTable, setEditingTable] = useState(null);
    const [tableStatus, setTableStatus] = useState('active');
    const [plugStatus, setPlugStatus] = useState({
        PLUG_001: 'online',
        PLUG_002: 'offline',
        PLUG_003: 'online'
    });

    const toggleDropdown = (dropdownType) => {
        switch (dropdownType) {
            case 'tableType':
                setTableTypeDropdownOpen(!tableTypeDropdownOpen);
                setRateTableDropdownOpen(false);
                setPlugTableDropdownOpen(false);
                break;
            case 'rateTable':
                setRateTableDropdownOpen(!rateTableDropdownOpen);
                setTableTypeDropdownOpen(false);
                setPlugTableDropdownOpen(false);
                break;
            case 'plugTable':
                setPlugTableDropdownOpen(!plugTableDropdownOpen);
                setTableTypeDropdownOpen(false);
                setRateTableDropdownOpen(false);
                break;
            default:
                break;
        }
    };

    const selectTableType = (type) => {
        setSelectedTableType(type);
        setTableTypeDropdownOpen(false);
    };

    const selectRateTable = (table) => {
        setSelectedRateTable(table);
        setRateTableDropdownOpen(false);
    };

    const selectPlugTable = (table) => {
        setSelectedPlugTable(table);
        setPlugTableDropdownOpen(false);
    };

    const editTable = (name, type, status) => {
        setEditingTable({ name, type, status });
        setSelectedTableType(type);
        setTableStatus(status);
    };

    const handleTableSubmit = (e) => {
        e.preventDefault();
        if (editingTable) {
            console.log('Updating table:', editingTable.name);
            setEditingTable(null);
        } else {
            console.log('Adding new table');
        }
    };

    const togglePlug = (plugId, action) => {
        console.log(`${action.toUpperCase()} plug ${plugId}`);
        setPlugStatus(prev => ({
            ...prev,
            [plugId]: action === 'on' ? 'online' : 'offline'
        }));
    };

    const handleGroupSubmit = (e) => {
        e.preventDefault();
        console.log('Creating new group');
        setGroupModalOpen(false);
    };

    return (
        <div className="p-3">
            <div className="">
                {/* Main Content */}
                <div className="">
                    <div className="mb-4">
                        <h2 className="h2 fw-bold text-dark">Table & Plug Setup</h2>
                        <p className="text-muted">Manage table types, configure rates, and control smart plugs</p>
                    </div>

                    <div className="row g-4">
                        {/* Add/Edit Table Type Section */}
                        <div className="col-12 col-xl-6">
                            <div className="bg-white rounded shadow-sm p-3 p-md-4 h-100">
                                <div className="d-flex align-items-center gap-3 mb-4">
                                    <div className="bg-warning rounded p-2">
                                        <FaTable className="text-dark" />
                                    </div>
                                    <h5 className=" fw-light text-dark mb-0">
                                        {editingTable ? 'Edit Table Type' : 'Add/Edit Table Type'}
                                    </h5>
                                </div>

                                <form onSubmit={handleTableSubmit} className="mb-4">
                                    <div className="mb-3">
                                        <label className="form-label">Table Name</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="Enter table name"
                                            defaultValue={editingTable?.name || ''}
                                        />
                                    </div>

                                    <div className="mb-3">
                                        <label className="form-label">Table Type</label>
                                        <div className="position-relative">
                                            <button
                                                type="button"
                                                className="form-control text-start d-flex justify-content-between align-items-center"
                                                onClick={() => toggleDropdown('tableType')}
                                            >
                                                <span>{selectedTableType}</span>
                                                <FaAngleDown />
                                            </button>
                                            {tableTypeDropdownOpen && (
                                                <div className="position-absolute top-100 start-0 end-0 bg-white border rounded mt-1 shadow-lg z-3">
                                                    <div className="py-1">
                                                        <button
                                                            type="button"
                                                            className="w-100 text-start btn btn-light d-flex align-items-center gap-2"
                                                            onClick={() => selectTableType('Snooker')}
                                                        >
                                                            <FaTableTennis className="text-success" />
                                                            <span>Snooker</span>
                                                        </button>
                                                        <button
                                                            type="button"
                                                            className="w-100 text-start btn btn-light d-flex align-items-center gap-2"
                                                            onClick={() => selectTableType('Pool')}
                                                        >
                                                            <FaTableTennis className="text-primary" />
                                                            <span>Pool</span>
                                                        </button>
                                                        <button
                                                            type="button"
                                                            className="w-100 text-start btn btn-light d-flex align-items-center gap-2"
                                                            onClick={() => selectTableType('PlayStation')}
                                                        >
                                                            <FaGamepad className="text-purple" />
                                                            <span>PlayStation</span>
                                                        </button>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    <div className="mb-4">
                                        <label className="form-label">Status</label>
                                        <div className="d-flex gap-4">
                                            <label className="d-flex align-items-center gap-2 cursor-pointer">
                                                <input
                                                    type="radio"
                                                    name="status"
                                                    value="active"
                                                    className="form-check-input"
                                                    checked={tableStatus === 'active'}
                                                    onChange={() => setTableStatus('active')}
                                                />
                                                <span className="text-dark">Active</span>
                                            </label>
                                            <label className="d-flex align-items-center gap-2 cursor-pointer">
                                                <input
                                                    type="radio"
                                                    name="status"
                                                    value="inactive"
                                                    className="form-check-input"
                                                    checked={tableStatus === 'inactive'}
                                                    onChange={() => setTableStatus('inactive')}
                                                />
                                                <span className="text-dark">Inactive</span>
                                            </label>
                                        </div>
                                    </div>

                                    <button type="submit" className="w-100 btn btn-warning text-dark fw-medium">
                                        {editingTable ? 'Update Table Type' : 'Add Table Type'}
                                    </button>
                                </form>

                                {/* Table List */}
                                <div className="border rounded overflow-hidden">
                                    <div className="bg-dark text-white px-3 py-2">
                                        <h4 className="fw-medium mb-0">Existing Table Types</h4>
                                    </div>
                                    <div className="divide-y">
                                        <div className="px-3 py-2 d-flex justify-content-between align-items-center hover-bg-warning-subtle">
                                            <div className="d-flex align-items-center gap-3">
                                                <FaTableTennis className="text-success fs-5" />
                                                <div>
                                                    <div className="fw-medium text-dark">Snooker Table 1</div>
                                                    <div className="text-muted small">Snooker • Active</div>
                                                </div>
                                            </div>
                                            <div className="d-flex gap-2">
                                                <button
                                                    className="btn btn-sm btn-outline-warning"
                                                    onClick={() => editTable('Snooker Table 1', 'Snooker', 'active')}
                                                >
                                                    <FaEdit />
                                                </button>
                                                <button className="btn btn-sm btn-outline-danger">
                                                    <FaTrashAlt />
                                                </button>
                                            </div>
                                        </div>
                                        <div className="px-3 py-2 d-flex justify-content-between align-items-center hover-bg-warning-subtle">
                                            <div className="d-flex align-items-center gap-3">
                                                <FaTableTennis className="text-primary fs-5" />
                                                <div>
                                                    <div className="fw-medium text-dark">Pool Table A</div>
                                                    <div className="text-muted small">Pool • Active</div>
                                                </div>
                                            </div>
                                            <div className="d-flex gap-2">
                                                <button
                                                    className="btn btn-sm btn-outline-warning"
                                                    onClick={() => editTable('Pool Table A', 'Pool', 'active')}
                                                >
                                                    <FaEdit />
                                                </button>
                                                <button className="btn btn-sm btn-outline-danger">
                                                    <FaTrashAlt />
                                                </button>
                                            </div>
                                        </div>
                                        <div className="px-3 py-2 d-flex justify-content-between align-items-center hover-bg-warning-subtle">
                                            <div className="d-flex align-items-center gap-3">
                                                <FaGamepad className="text-purple fs-5" />
                                                <div>
                                                    <div className="fw-medium text-dark">PlayStation Zone 1</div>
                                                    <div className="text-muted small">PlayStation • Active</div>
                                                </div>
                                            </div>
                                            <div className="d-flex gap-2">
                                                <button
                                                    className="btn btn-sm btn-outline-warning"
                                                    onClick={() => editTable('PlayStation Zone 1', 'PlayStation', 'active')}
                                                >
                                                    <FaEdit />
                                                </button>
                                                <button className="btn btn-sm btn-outline-danger">
                                                    <FaTrashAlt />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Set Hourly/Fixed Rate Section */}
                        <div className="col-12 col-xl-6">
                            <div className="bg-white rounded shadow-sm p-3 p-md-4 h-100">
                                <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center mb-4 gap-3">
                                    <div className="d-flex align-items-center gap-3">
                                        <div className="bg-warning rounded p-2">
                                            <FaClock className="text-dark" />
                                        </div>
                                        <h5 className=" fw-light text-dark mb-0">Set Hourly/Fixed Rate</h5>
                                    </div>
                                    <button
                                        type="button"
                                        className="btn btn-warning text-dark d-flex align-items-center gap-2"
                                        onClick={() => setGroupModalOpen(true)}
                                    >
                                        <FaPlus />
                                        <span>Create Group</span>
                                    </button>
                                </div>

                                <form className="mb-4">
                                    <div className="mb-3">
                                        <label className="form-label">Select Table/Group</label>
                                        <div className="position-relative">
                                            <button
                                                type="button"
                                                className="form-control text-start d-flex justify-content-between align-items-center"
                                                onClick={() => toggleDropdown('rateTable')}
                                            >
                                                <span>{selectedRateTable}</span>
                                                <FaAngleDown />
                                            </button>
                                            {rateTableDropdownOpen && (
                                                <div className="position-absolute top-100 start-0 end-0 bg-white border rounded mt-1 shadow-lg z-3">
                                                    <div className="py-1">
                                                        <div className="px-3 py-1 small fw-medium text-muted bg-light">Groups</div>
                                                        <button
                                                            type="button"
                                                            className="w-100 text-start btn btn-light d-flex align-items-center gap-2"
                                                            onClick={() => selectRateTable('Premium Snooker Group')}
                                                        >
                                                            <FaUsers className="text-warning" />
                                                            <span>Premium Snooker Group</span>
                                                            <span className="text-muted small ms-2">(3 tables)</span>
                                                        </button>
                                                        <button
                                                            type="button"
                                                            className="w-100 text-start btn btn-light d-flex align-items-center gap-2"
                                                            onClick={() => selectRateTable('Standard Pool Group')}
                                                        >
                                                            <FaUsers className="text-warning" />
                                                            <span>Standard Pool Group</span>
                                                            <span className="text-muted small ms-2">(2 tables)</span>
                                                        </button>
                                                        <div className="px-3 py-1 small fw-medium text-muted bg-light">Individual Tables</div>
                                                        <button
                                                            type="button"
                                                            className="w-100 text-start btn btn-light"
                                                            onClick={() => selectRateTable('Snooker Table 1')}
                                                        >
                                                            Snooker Table 1
                                                        </button>
                                                        <button
                                                            type="button"
                                                            className="w-100 text-start btn btn-light"
                                                            onClick={() => selectRateTable('Pool Table A')}
                                                        >
                                                            Pool Table A
                                                        </button>
                                                        <button
                                                            type="button"
                                                            className="w-100 text-start btn btn-light"
                                                            onClick={() => selectRateTable('PlayStation Zone 1')}
                                                        >
                                                            PlayStation Zone 1
                                                        </button>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    <div className="row g-3 mb-3">
                                        <div className="col-12 col-md-6">
                                            <label className="form-label">Hourly Rate ($)</label>
                                            <input
                                                type="number"
                                                className="form-control"
                                                placeholder="0.00"
                                                defaultValue="15.00"
                                            />
                                        </div>
                                        <div className="col-12 col-md-6">
                                            <label className="form-label">Fixed Rate ($)</label>
                                            <input
                                                type="number"
                                                className="form-control"
                                                placeholder="0.00"
                                                defaultValue="50.00"
                                            />
                                        </div>
                                    </div>

                                    <div className="mb-4">
                                        <label className="form-label">Discounted Rate (%) <span className="text-muted">Optional</span></label>
                                        <input
                                            type="number"
                                            className="form-control"
                                            placeholder="0"
                                            defaultValue="10"
                                        />
                                    </div>

                                    <button type="submit" className="w-100 btn btn-warning text-dark fw-medium">
                                        Save Changes
                                    </button>
                                </form>

                                {/* Rate Preview */}
                                <div className="bg-dark text-white rounded p-3">
                                    <h4 className="fw-medium mb-3">Rate Preview</h4>
                                    <div className="small">
                                        <div className="d-flex justify-content-between mb-2">
                                            <span>Hourly Rate:</span>
                                            <span>$15.00/hour</span>
                                        </div>
                                        <div className="d-flex justify-content-between mb-2">
                                            <span>Fixed Rate:</span>
                                            <span>$50.00/session</span>
                                        </div>
                                        <div className="d-flex justify-content-between">
                                            <span>With 10% Discount:</span>
                                            <span>$13.50/hour</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Smart Plug Mapping Section */}
                        <div className="col-12">
                            <div className="bg-white rounded shadow-sm p-3 p-md-4">
                                <div className="d-flex align-items-center gap-3 mb-4">
                                    <div className="bg-warning rounded p-2">
                                        <FaPlug className="text-dark" />
                                    </div>
                                    <h5 className=" fw-light text-dark mb-0">Map Smart Plug (ON/OFF Control)</h5>
                                </div>

                                <div className="row g-4">
                                    {/* Plug Assignment Form */}
                                    <div className="col-12 col-lg-6">
                                        <h4 className="fw-medium text-dark mb-3">Assign Smart Plug</h4>
                                        <form>
                                            <div className="mb-3">
                                                <label className="form-label">Select Table</label>
                                                <div className="position-relative">
                                                    <button
                                                        type="button"
                                                        className="form-control text-start d-flex justify-content-between align-items-center"
                                                        onClick={() => toggleDropdown('plugTable')}
                                                    >
                                                        <span>{selectedPlugTable}</span>
                                                        <FaAngleDown />
                                                    </button>
                                                    {plugTableDropdownOpen && (
                                                        <div className="position-absolute top-100 start-0 end-0 bg-white border rounded mt-1 shadow-lg z-3">
                                                            <div className="py-1">
                                                                <button
                                                                    type="button"
                                                                    className="w-100 text-start btn btn-light"
                                                                    onClick={() => selectPlugTable('Snooker Table 1')}
                                                                >
                                                                    Snooker Table 1
                                                                </button>
                                                                <button
                                                                    type="button"
                                                                    className="w-100 text-start btn btn-light"
                                                                    onClick={() => selectPlugTable('Pool Table A')}
                                                                >
                                                                    Pool Table A
                                                                </button>
                                                                <button
                                                                    type="button"
                                                                    className="w-100 text-start btn btn-light"
                                                                    onClick={() => selectPlugTable('PlayStation Zone 1')}
                                                                >
                                                                    PlayStation Zone 1
                                                                </button>
                                                            </div>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>

                                            <div className="mb-4">
                                                <label className="form-label">Smart Plug ID</label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    placeholder="Enter plug ID (e.g., PLUG_001)"
                                                />
                                            </div>

                                            <button type="submit" className="w-100 btn btn-warning text-dark fw-medium">
                                                Map Smart Plug
                                            </button>
                                        </form>
                                    </div>

                                    {/* Plug Control Panel */}
                                    <div className="col-12 col-lg-6">
                                        <h4 className="fw-medium text-dark mb-3">Smart Plug Control</h4>
                                        <div className="d-flex flex-column gap-3">
                                            {/* Plug Control Item */}
                                            <div className="border rounded p-3">
                                                <div className="d-flex flex-column flex-sm-row justify-content-between align-items-start align-items-sm-center mb-3 gap-2">
                                                    <div className="d-flex align-items-center gap-3">
                                                        <FaTableTennis className="text-success fs-5" />
                                                        <div>
                                                            <div className="fw-medium text-dark">Snooker Table 1</div>
                                                            <div className="text-muted small">Plug ID: PLUG_001</div>
                                                        </div>
                                                    </div>
                                                    <div className="d-flex align-items-center gap-2">
                                                        <div className={`rounded-circle ${plugStatus.PLUG_001 === 'online' ? 'bg-success' : 'bg-danger'}`} style={{ width: '12px', height: '12px' }}></div>
                                                        <span className={`small fw-medium ${plugStatus.PLUG_001 === 'online' ? 'text-success' : 'text-danger'}`}>
                                                            {plugStatus.PLUG_001 === 'online' ? 'ONLINE' : 'OFFLINE'}
                                                        </span>
                                                    </div>
                                                </div>
                                                <div className="d-flex gap-3">
                                                    <button
                                                        className={`btn flex-grow-1 ${plugStatus.PLUG_001 === 'online' ? 'btn-success' : 'btn-secondary'}`}
                                                        onClick={() => togglePlug('PLUG_001', 'on')}
                                                        disabled={plugStatus.PLUG_001 === 'online'}
                                                    >
                                                        <div className="d-flex align-items-center justify-content-center gap-2">
                                                            <FaPlay />
                                                            <span>Turn ON</span>
                                                        </div>
                                                    </button>
                                                    <button
                                                        className={`btn flex-grow-1 ${plugStatus.PLUG_001 === 'offline' ? 'btn-danger' : 'btn-secondary'}`}
                                                        onClick={() => togglePlug('PLUG_001', 'off')}
                                                        disabled={plugStatus.PLUG_001 === 'offline'}
                                                    >
                                                        <div className="d-flex align-items-center justify-content-center gap-2">
                                                            <FaStop />
                                                            <span>Turn OFF</span>
                                                        </div>
                                                    </button>
                                                </div>
                                            </div>

                                            <div className="border rounded p-3">
                                                <div className="d-flex flex-column flex-sm-row justify-content-between align-items-start align-items-sm-center mb-3 gap-2">
                                                    <div className="d-flex align-items-center gap-3">
                                                        <FaTableTennis className="text-primary fs-5" />
                                                        <div>
                                                            <div className="fw-medium text-dark">Pool Table A</div>
                                                            <div className="text-muted small">Plug ID: PLUG_002</div>
                                                        </div>
                                                    </div>
                                                    <div className="d-flex align-items-center gap-2">
                                                        <div className={`rounded-circle ${plugStatus.PLUG_002 === 'online' ? 'bg-success' : 'bg-danger'}`} style={{ width: '12px', height: '12px' }}></div>
                                                        <span className={`small fw-medium ${plugStatus.PLUG_002 === 'online' ? 'text-success' : 'text-danger'}`}>
                                                            {plugStatus.PLUG_002 === 'online' ? 'ONLINE' : 'OFFLINE'}
                                                        </span>
                                                    </div>
                                                </div>
                                                <div className="d-flex gap-3">
                                                    <button
                                                        className={`btn flex-grow-1 ${plugStatus.PLUG_002 === 'online' ? 'btn-success' : 'btn-secondary'}`}
                                                        onClick={() => togglePlug('PLUG_002', 'on')}
                                                        disabled={plugStatus.PLUG_002 === 'online'}
                                                    >
                                                        <div className="d-flex align-items-center justify-content-center gap-2">
                                                            <FaPlay />
                                                            <span>Turn ON</span>
                                                        </div>
                                                    </button>
                                                    <button
                                                        className={`btn flex-grow-1 ${plugStatus.PLUG_002 === 'offline' ? 'btn-danger' : 'btn-secondary'}`}
                                                        onClick={() => togglePlug('PLUG_002', 'off')}
                                                        disabled={plugStatus.PLUG_002 === 'offline'}
                                                    >
                                                        <div className="d-flex align-items-center justify-content-center gap-2">
                                                            <FaStop />
                                                            <span>Turn OFF</span>
                                                        </div>
                                                    </button>
                                                </div>
                                            </div>

                                            <div className="border rounded p-3">
                                                <div className="d-flex flex-column flex-sm-row justify-content-between align-items-start align-items-sm-center mb-3 gap-2">
                                                    <div className="d-flex align-items-center gap-3">
                                                        <FaGamepad className="text-purple fs-5" />
                                                        <div>
                                                            <div className="fw-medium text-dark">PlayStation Zone 1</div>
                                                            <div className="text-muted small">Plug ID: PLUG_003</div>
                                                        </div>
                                                    </div>
                                                    <div className="d-flex align-items-center gap-2">
                                                        <div className={`rounded-circle ${plugStatus.PLUG_003 === 'online' ? 'bg-success' : 'bg-danger'}`} style={{ width: '12px', height: '12px' }}></div>
                                                        <span className={`small fw-medium ${plugStatus.PLUG_003 === 'online' ? 'text-success' : 'text-danger'}`}>
                                                            {plugStatus.PLUG_003 === 'online' ? 'ONLINE' : 'OFFLINE'}
                                                        </span>
                                                    </div>
                                                </div>
                                                <div className="d-flex gap-3">
                                                    <button
                                                        className={`btn flex-grow-1 ${plugStatus.PLUG_003 === 'online' ? 'btn-success' : 'btn-secondary'}`}
                                                        onClick={() => togglePlug('PLUG_003', 'on')}
                                                        disabled={plugStatus.PLUG_003 === 'online'}
                                                    >
                                                        <div className="d-flex align-items-center justify-content-center gap-2">
                                                            <FaPlay />
                                                            <span>Turn ON</span>
                                                        </div>
                                                    </button>
                                                    <button
                                                        className={`btn flex-grow-1 ${plugStatus.PLUG_003 === 'offline' ? 'btn-danger' : 'btn-secondary'}`}
                                                        onClick={() => togglePlug('PLUG_003', 'off')}
                                                        disabled={plugStatus.PLUG_003 === 'offline'}
                                                    >
                                                        <div className="d-flex align-items-center justify-content-center gap-2">
                                                            <FaStop />
                                                            <span>Turn OFF</span>
                                                        </div>
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Group Management Modal */}
            {groupModalOpen && (
                <div className="modal show d-block bg-dark bg-opacity-50" tabIndex="-1" style={{ zIndex: 1050 }}>
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Create Table Group</h5>
                                <button
                                    type="button"
                                    className="btn-close"
                                    onClick={() => setGroupModalOpen(false)}
                                ></button>
                            </div>
                            <form onSubmit={handleGroupSubmit}>
                                <div className="modal-body">
                                    <div className="mb-3">
                                        <label className="form-label">Group Name</label>
                                        <input type="text" className="form-control" placeholder="Enter group name" />
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">Select Tables</label>
                                        <div className="border rounded overflow-auto" style={{ maxHeight: '200px' }}>
                                            <div className="p-2 d-flex flex-column gap-2">
                                                <div className="form-check">
                                                    <input
                                                        type="checkbox"
                                                        className="form-check-input"
                                                        id="snooker1"
                                                        value="snooker1"
                                                    />
                                                    <label className="form-check-label" htmlFor="snooker1">Snooker Table 1</label>
                                                </div>
                                                <div className="form-check">
                                                    <input
                                                        type="checkbox"
                                                        className="form-check-input"
                                                        id="snooker2"
                                                        value="snooker2"
                                                    />
                                                    <label className="form-check-label" htmlFor="snooker2">Snooker Table 2</label>
                                                </div>
                                                <div className="form-check">
                                                    <input
                                                        type="checkbox"
                                                        className="form-check-input"
                                                        id="pool1"
                                                        value="pool1"
                                                    />
                                                    <label className="form-check-label" htmlFor="pool1">Pool Table A</label>
                                                </div>
                                                <div className="form-check">
                                                    <input
                                                        type="checkbox"
                                                        className="form-check-input"
                                                        id="pool2"
                                                        value="pool2"
                                                    />
                                                    <label className="form-check-label" htmlFor="pool2">Pool Table B</label>
                                                </div>
                                                <div className="form-check">
                                                    <input
                                                        type="checkbox"
                                                        className="form-check-input"
                                                        id="ps1"
                                                        value="ps1"
                                                    />
                                                    <label className="form-check-label" htmlFor="ps1">PlayStation Zone 1</label>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row g-3 mb-3">
                                        <div className="col-md-6">
                                            <label className="form-label">Hourly Rate ($)</label>
                                            <input type="number" className="form-control" placeholder="0.00" />
                                        </div>
                                        <div className="col-md-6">
                                            <label className="form-label">Fixed Rate ($)</label>
                                            <input type="number" className="form-control" placeholder="0.00" />
                                        </div>
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">Discounted Rate (%) <span className="text-muted">Optional</span></label>
                                        <input type="number" className="form-control" placeholder="0" />
                                    </div>
                                </div>
                                <div className="modal-footer">
                                    <button
                                        type="button"
                                        className="btn btn-secondary"
                                        onClick={() => setGroupModalOpen(false)}
                                    >
                                        Cancel
                                    </button>
                                    <button type="submit" className="btn btn-warning text-dark">
                                        Create Group
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default TabelPlugSetup;