import React, { useState } from 'react';
import { 
  RiGamepadLine, 
  RiBilliardsLine, 
  RiRestaurantLine, 
  RiTvLine, 
  RiLightbulbLine, 
  RiMusicLine,
  RiRefreshLine,
  RiSearchLine,
  RiFilterLine,
  RiArrowDownSLine,
  RiAlertLine,
  RiCheckLine
} from 'react-icons/ri';

const DeviceMonitor = () => {
  const [devices, setDevices] = useState([
    {
      id: 1,
      name: 'PlayStation 5',
      location: 'Table PS-01',
      icon: <RiGamepadLine className="text-blue-600" />,
      status: 'online',
      powerState: 'on',
      powerConsumption: 180,
      lastUpdated: '2 min ago',
      bgColor: 'bg-blue-50'
    },
    {
      id: 2,
      name: 'Snooker Table',
      location: 'Table SN-03',
      icon: <RiBilliardsLine className="text-green-600" />,
      status: 'online',
      powerState: 'off',
      powerConsumption: 0,
      lastUpdated: '1 min ago',
      bgColor: 'bg-green-50'
    },
    {
      id: 3,
      name: 'Coffee Machine',
      location: 'Restaurant Area',
      icon: <RiRestaurantLine className="text-purple-600" />,
      status: 'offline',
      powerState: 'off',
      powerConsumption: null,
      lastUpdated: '15 min ago',
      bgColor: 'bg-purple-50'
    },
    {
      id: 4,
      name: 'Xbox Series X',
      location: 'Table XB-02',
      icon: <RiGamepadLine className="text-orange-600" />,
      status: 'online',
      powerState: 'on',
      powerConsumption: 165,
      lastUpdated: '30 sec ago',
      bgColor: 'bg-orange-50'
    },
    {
      id: 5,
      name: 'Pool Table',
      location: 'Table PL-05',
      icon: <RiBilliardsLine className="text-teal-600" />,
      status: 'online',
      powerState: 'on',
      powerConsumption: 45,
      lastUpdated: '1 min ago',
      bgColor: 'bg-teal-50'
    },
    {
      id: 6,
      name: 'Smart TV',
      location: 'Lounge Area',
      icon: <RiTvLine className="text-red-600" />,
      status: 'online',
      powerState: 'off',
      powerConsumption: 2,
      lastUpdated: '45 sec ago',
      bgColor: 'bg-red-50'
    },
    {
      id: 7,
      name: 'LED Lighting',
      location: 'Main Hall',
      icon: <RiLightbulbLine className="text-indigo-600" />,
      status: 'online',
      powerState: 'on',
      powerConsumption: 120,
      lastUpdated: '3 min ago',
      bgColor: 'bg-indigo-50'
    },
    {
      id: 8,
      name: 'Sound System',
      location: 'Entertainment Zone',
      icon: <RiMusicLine className="text-pink-600" />,
      status: 'offline',
      powerState: 'off',
      powerConsumption: null,
      lastUpdated: '8 min ago',
      bgColor: 'bg-pink-50'
    }
  ]);

  const [showModal, setShowModal] = useState(false);
  const [currentDevice, setCurrentDevice] = useState(null);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  const toggleDevice = (deviceId) => {
    setDevices(devices.map(device => {
      if (device.id === deviceId) {
        const newPowerState = device.powerState === 'on' ? 'off' : 'on';
        const message = `${device.name} has been turned ${newPowerState.toUpperCase()}`;
        
        setToastMessage(message);
        setShowToast(true);
        setTimeout(() => setShowToast(false), 3000);
        
        return {
          ...device,
          powerState: newPowerState
        };
      }
      return device;
    }));
  };

  const showOverrideModal = (device) => {
    setCurrentDevice(device);
    setShowModal(true);
  };

  const confirmOverride = () => {
    setToastMessage(`Manual override applied to ${currentDevice.name}`);
    setShowToast(true);
    setShowModal(false);
    setTimeout(() => setShowToast(false), 3000);
  };

  const onlineCount = devices.filter(d => d.status === 'online').length;
  const offlineCount = devices.filter(d => d.status === 'offline').length;

  return (
    <div className="device-monitor-container bg-light min-vh-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-bottom py-3 px-4">
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center">
          <div className="mb-3 mb-md-0">
            <h1 className="fs-3 fw-bold text-dark">Device Monitor</h1>
            <p className="text-muted mb-0">Monitor and control smart plugs across all gaming areas</p>
          </div>
          <div className="d-flex align-items-center gap-3">
            <div className="d-flex align-items-center px-3 py-2 bg-success bg-opacity-10 rounded-3">
              <span className="device-status-dot bg-success me-2"></span>
              <span className="text-success small fw-medium">Live Updates Active</span>
            </div>
            <button className="btn btn-warning d-flex align-items-center">
              <RiRefreshLine className="me-2" />
              Refresh All
            </button>
          </div>
        </div>
      </header>

      {/* Search and Filter Bar */}
      <div className="bg-white px-4 py-3 border-bottom">
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center">
          <div className="d-flex flex-wrap gap-3 mb-3 mb-md-0">
            <div className="position-relative">
              <RiSearchLine className="position-absolute top-50 start-0 translate-middle-y ms-3 text-muted" />
              <input 
                type="text" 
                placeholder="Search devices..." 
                className="form-control ps-5" 
              />
            </div>
            <div className="dropdown">
              <button 
                className="btn btn-outline-secondary dropdown-toggle d-flex align-items-center" 
                type="button" 
                data-bs-toggle="dropdown"
              >
                <RiFilterLine className="me-2" />
                Filter by Status
              </button>
              <ul className="dropdown-menu">
                <li><button className="dropdown-item">All Status</button></li>
                <li><button className="dropdown-item">Online</button></li>
                <li><button className="dropdown-item">Offline</button></li>
              </ul>
            </div>
          </div>
          <div className="d-flex gap-3 text-muted small">
            <span>Total Devices: <strong className="text-dark">{devices.length}</strong></span>
            <span className="text-success">Online: <strong>{onlineCount}</strong></span>
            <span className="text-danger">Offline: <strong>{offlineCount}</strong></span>
          </div>
        </div>
      </div>

      {/* Device Grid */}
      <div className="container-fluid py-4">
        <div className="row g-4">
          {devices.map(device => (
            <div key={device.id} className="col-12 col-sm-6 col-lg-4 col-xl-3">
              <div className="card shadow-sm border-0 h-100">
                <div className="card-body p-4">
                  <div className="d-flex justify-content-between align-items-start mb-3">
                    <div className="d-flex align-items-center">
                      <div className={`${device.bgColor} rounded-3 p-3 me-3`}>
                        {device.icon}
                      </div>
                      <div>
                        <h3 className="fw-bold mb-1">{device.name}</h3>
                        <p className="text-muted small mb-0">{device.location}</p>
                      </div>
                    </div>
                    <div className="d-flex flex-column align-items-end gap-1">
                      <span className={`badge ${device.status === 'online' ? 'bg-success' : 'bg-secondary'} text-white`}>
                        {device.status === 'online' ? 'Online' : 'Offline'}
                      </span>
                      <span className={`badge ${device.powerState === 'on' ? 'bg-primary' : 'bg-danger'} text-white`}>
                        {device.powerState.toUpperCase()}
                      </span>
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    <div className="d-flex justify-content-between small text-muted mb-2">
                      <span>Power Consumption</span>
                      <span className="fw-medium">
                        {device.powerConsumption !== null ? `${device.powerConsumption}W` : '--W'}
                      </span>
                    </div>
                    <div className="progress" style={{ height: '6px' }}>
                      <div 
                        className={`progress-bar ${device.powerState === 'on' ? 'bg-warning' : 'bg-secondary'}`}
                        style={{ 
                          width: `${device.powerConsumption ? Math.min(device.powerConsumption / 2, 100) : 0}%` 
                        }}
                      ></div>
                    </div>
                  </div>
                  
                  <div className="d-flex justify-content-between align-items-center">
                    <div className={`small ${device.status === 'offline' ? 'text-danger' : 'text-muted'}`}>
                      {device.status === 'offline' ? 'Last seen: ' : 'Updated: '}
                      {device.lastUpdated}
                    </div>
                    <div className="d-flex gap-2">
                      <div 
                        className={`device-toggle-switch position-relative rounded-pill ${device.powerState === 'on' ? 'bg-warning' : 'bg-dark'} ${device.status === 'offline' ? 'opacity-50' : ''}`}
                        onClick={() => device.status === 'online' && toggleDevice(device.id)}
                        style={{ width: '48px', height: '24px', cursor: device.status === 'offline' ? 'not-allowed' : 'pointer' }}
                      >
                        <div 
                          className="position-absolute top-1 start-1 bg-white rounded-circle shadow-sm"
                          style={{ 
                            width: '20px', 
                            height: '20px',
                            transform: device.powerState === 'on' ? 'translateX(24px)' : 'translateX(0)',
                            transition: 'transform 0.3s ease'
                          }}
                        ></div>
                      </div>
                      <button 
                        className={`btn btn-sm ${device.status === 'offline' ? 'btn-outline-secondary disabled' : 'btn-outline-dark'}`}
                        onClick={() => device.status === 'online' && showOverrideModal(device)}
                        disabled={device.status === 'offline'}
                      >
                        Override
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Override Modal */}
      {showModal && (
        <div className="modal-overlay position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center" style={{ zIndex: 1050, backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="bg-white rounded-3 p-4" style={{ maxWidth: '500px', width: '90%' }}>
            <div className="d-flex align-items-center mb-4">
              <div className="bg-warning bg-opacity-25 rounded-circle p-3 me-3">
                <RiAlertLine className="text-warning fs-4" />
              </div>
              <h3 className="fs-5 fw-bold mb-0">Manual Override Confirmation</h3>
            </div>
            <p className="text-muted mb-4">
              Are you sure you want to manually override the power state for <strong>{currentDevice?.name}</strong>? This action will bypass automated controls.
            </p>
            <div className="d-flex justify-content-end gap-3">
              <button 
                className="btn btn-outline-secondary"
                onClick={() => setShowModal(false)}
              >
                Cancel
              </button>
              <button 
                className="btn btn-danger"
                onClick={confirmOverride}
              >
                Confirm Override
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Success Toast */}
      {showToast && (
        <div 
          className="position-fixed top-4 end-4 bg-success text-white px-4 py-3 rounded-3 shadow d-flex align-items-center"
          style={{ zIndex: 1050, animation: 'slideIn 0.3s forwards' }}
        >
          <RiCheckLine className="me-2" />
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
};

export default DeviceMonitor;