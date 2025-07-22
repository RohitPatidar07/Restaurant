import React, { useState } from 'react';
import { RiPrinterLine, RiRestaurantLine, RiGobletLine, RiArrowDownSLine, RiLoader4Line, RiCheckLine } from 'react-icons/ri';

const PrinterSetup = () => {
  // State for printer mappings
  const [kitchenPrinter, setKitchenPrinter] = useState('hp-kitchen-01');
  const [barPrinter, setBarPrinter] = useState('canon-bar-01');
  const [kitchenMapping, setKitchenMapping] = useState('Food → HP LaserJet Kitchen 01');
  const [barMapping, setBarMapping] = useState('Drinks → Canon PIXMA Bar 01');
  
  // State for save button feedback
  const [kitchenSaveStatus, setKitchenSaveStatus] = useState(false);
  const [barSaveStatus, setBarSaveStatus] = useState(false);
  
  // State for printer controls
  const [printers, setPrinters] = useState([
    {
      id: 'hp-kitchen-01',
      name: 'HP LaserJet Kitchen 01',
      type: 'Kitchen Printer',
      active: true,
      testPrinting: false,
      testComplete: false
    },
    {
      id: 'canon-bar-01',
      name: 'Canon PIXMA Bar 01',
      type: 'Bar Printer',
      active: true,
      testPrinting: false,
      testComplete: false
    },
    {
      id: 'epson-kitchen-02',
      name: 'Epson TM-T88VI Kitchen 02',
      type: 'Kitchen Printer',
      active: false,
      testPrinting: false,
      testComplete: false
    },
    {
      id: 'brother-bar-03',
      name: 'Brother HL-L2350DW Bar 03',
      type: 'Bar Printer',
      active: false,
      testPrinting: false,
      testComplete: false
    }
  ]);

  // Handle save kitchen mapping
  const handleSaveKitchen = () => {
    const selectedPrinter = printers.find(p => p.id === kitchenPrinter);
    if (selectedPrinter) {
      setKitchenMapping(`Food → ${selectedPrinter.name}`);
      setKitchenSaveStatus(true);
      setTimeout(() => setKitchenSaveStatus(false), 2000);
    }
  };

  // Handle save bar mapping
  const handleSaveBar = () => {
    const selectedPrinter = printers.find(p => p.id === barPrinter);
    if (selectedPrinter) {
      setBarMapping(`Drinks → ${selectedPrinter.name}`);
      setBarSaveStatus(true);
      setTimeout(() => setBarSaveStatus(false), 2000);
    }
  };

  // Toggle printer status
  const togglePrinter = (id) => {
    setPrinters(printers.map(printer => 
      printer.id === id ? { ...printer, active: !printer.active } : printer
    ));
  };

  // Test printer
  const testPrinter = (id) => {
    setPrinters(printers.map(printer => 
      printer.id === id ? { ...printer, testPrinting: true } : printer
    ));
    
    setTimeout(() => {
      setPrinters(printers.map(printer => 
        printer.id === id 
          ? { ...printer, testPrinting: false, testComplete: true } 
          : printer
      ));
      
      setTimeout(() => {
        setPrinters(printers.map(printer => 
          printer.id === id 
            ? { ...printer, testComplete: false } 
            : printer
        ));
      }, 2000);
    }, 1500);
  };

  return (
    <div className="p-3">
      <div className="row">
        <div className="col-12">
          <div className="d-flex align-items-center gap-3 mb-3">
           
            <h1 className="h2 fw-bold text-dark">Printer Setup</h1>
          </div>
      
        </div>
      </div>

      <div className="row g-4">
        {/* Left Column - Printer Mappings */}
        <div className="col-lg-4">
          {/* Food to Kitchen Printer Mapping */}
          <div className="card bg-white mb-4">
            <div className="card-body">
              <div className="d-flex align-items-center gap-3 mb-3">
                <RiRestaurantLine className="text-warning" />
                <h2 className="h5 mb-0">Map Food → Kitchen Printer</h2>
              </div>
              
              <div className="mb-3">
                <label className="form-label">Select Kitchen Printer</label>
                <div className="input-group">
                  <select 
                    className="form-select"
                    value={kitchenPrinter}
                    onChange={(e) => setKitchenPrinter(e.target.value)}
                  >
                    <option value="hp-kitchen-01">HP LaserJet Kitchen 01</option>
                    <option value="epson-kitchen-02">Epson TM-T88VI Kitchen 02</option>
                    <option value="star-kitchen-03">Star TSP143III Kitchen 03</option>
                  </select>
                  <span className="input-group-text">
                    <RiArrowDownSLine />
                  </span>
                </div>
              </div>
              
              <div className="alert alert-light mb-3">
                <p className="mb-1 small text-muted">Current Mapping:</p>
                <p className="mb-0 fw-medium">{kitchenMapping}</p>
              </div>
              
              <button 
                className={`btn w-100 ${kitchenSaveStatus ? 'btn-success' : 'btn-warning'}`}
                onClick={handleSaveKitchen}
              >
                {kitchenSaveStatus ? 'Saved!' : 'Save Kitchen Mapping'}
              </button>
            </div>
          </div>
          
          {/* Drinks to Bar Printer Mapping */}
          <div className="card bg-white">
            <div className="card-body">
              <div className="d-flex align-items-center gap-3 mb-3">
                <RiGobletLine className="text-warning" />
                <h2 className="h5 mb-0">Map Drinks → Bar Printer</h2>
              </div>
              
              <div className="mb-3">
                <label className="form-label">Select Bar Printer</label>
                <div className="input-group">
                  <select 
                    className="form-select"
                    value={barPrinter}
                    onChange={(e) => setBarPrinter(e.target.value)}
                  >
                    <option value="canon-bar-01">Canon PIXMA Bar 01</option>
                    <option value="epson-bar-02">Epson TM-T20III Bar 02</option>
                    <option value="brother-bar-03">Brother HL-L2350DW Bar 03</option>
                  </select>
                  <span className="input-group-text">
                    <RiArrowDownSLine />
                  </span>
                </div>
              </div>
              
              <div className="alert alert-light mb-3">
                <p className="mb-1 small text-muted">Current Mapping:</p>
                <p className="mb-0 fw-medium">{barMapping}</p>
              </div>
              
              <button 
                className={`btn w-100 ${barSaveStatus ? 'btn-success' : 'btn-warning'}`}
                onClick={handleSaveBar}
              >
                {barSaveStatus ? 'Saved!' : 'Save Bar Mapping'}
              </button>
            </div>
          </div>
        </div>
        
        {/* Right Column - Printer Controls */}
        <div className="col-lg-8">
          <div className="card bg-white h-100">
            <div className="card-body">
              <h2 className="h5 mb-4">Test / Enable / Disable Printers</h2>
              
              <div className="row g-3">
                {printers.map(printer => (
                  <div className="col-12" key={printer.id}>
                    <div className={`card ${printer.active ? 'border-warning' : 'border-secondary'}`}>
                      <div className="card-body">
                        <div className="d-flex justify-content-between align-items-center mb-3">
                          <div className="d-flex align-items-center gap-3">
                            <RiPrinterLine className={`fs-4 ${printer.active ? 'text-warning' : 'text-secondary'}`} />
                            <div>
                              <h3 className="h6 mb-0">{printer.name}</h3>
                              <p className="small text-muted mb-0">{printer.type}</p>
                            </div>
                          </div>
                          <div className="d-flex align-items-center gap-2">
                            <div className={`rounded-circle ${printer.active ? 'bg-success' : 'bg-secondary'}`} style={{ width: '12px', height: '12px' }}></div>
                            <span className={`small fw-medium ${printer.active ? 'text-success' : 'text-secondary'}`}>
                              {printer.active ? 'Active' : 'Disabled'}
                            </span>
                          </div>
                        </div>
                        
                        <div className="d-flex justify-content-between align-items-center">
                          <div>
                            <button 
                              className={`btn btn-sm ${printer.active ? 'btn-outline-secondary' : 'btn-outline-secondary disabled'}`}
                              onClick={() => printer.active && testPrinter(printer.id)}
                              disabled={!printer.active || printer.testPrinting || printer.testComplete}
                            >
                              {printer.testPrinting ? (
                                <>
                                  <RiLoader4Line className="me-1 animate-spin" />
                                  Testing...
                                </>
                              ) : printer.testComplete ? (
                                <>
                                  <RiCheckLine className="me-1" />
                                  Test Sent
                                </>
                              ) : (
                                <>
                                  <RiPrinterLine className="me-1" />
                                  Test Print
                                </>
                              )}
                            </button>
                          </div>
                          
                          <div className="form-check form-switch">
                            <input
                         className="form-check-input bg-warning border-warning"
                              type="checkbox"
                              id={`toggle-${printer.id}`}
                              checked={printer.active}
                              onChange={() => togglePrinter(printer.id)}
                              style={{ width: '2.5em', height: '1.5em' }}
                            />
                            <label className="form-check-label ms-2" htmlFor={`toggle-${printer.id}`}>
                              Enable
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrinterSetup;