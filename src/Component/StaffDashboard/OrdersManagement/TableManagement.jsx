import React, { useState } from 'react';
import "./TableManagement.css"
import FloorPlanLayout from './FloorPlanLayout';

const TableManagement = () => {
  // State management
  const [activeTab, setActiveTab] = useState('register');
  const [activeFloor, setActiveFloor] = useState('main');
  const [searchTerm, setSearchTerm] = useState('');
  const [quickJumpInput, setQuickJumpInput] = useState('');
  const [selectedTable, setSelectedTable] = useState(null);

  const mainFloorTables = [
    { id: 1, status: 'occupied', guests: 4, order: 'Order #1234' },
    { id: 2, status: 'available', guests: 0, order: null },
    { id: 3, status: 'occupied', guests: 2, order: 'Order #1235' },
    { id: 4, status: 'available', guests: 0, order: null },
    { id: 5, status: 'reserved', guests: 6, order: null },
    { id: 6, status: 'occupied', guests: 3, order: 'Order #1236' },
    { id: 7, status: 'available', guests: 0, order: null },
    { id: 8, status: 'available', guests: 0, order: null },
    { id: 9, status: 'occupied', guests: 2, order: 'Order #1237' },
    { id: 10, status: 'available', guests: 0, order: null },
    { id: 11, status: 'available', guests: 0, order: null },
    { id: 12, status: 'occupied', guests: 5, order: 'Order #1238' }
  ];

  const patioTables = [
    { id: 101, status: 'available', guests: 0, order: null },
    { id: 102, status: 'occupied', guests: 2, order: 'Order #P101' },
    { id: 103, status: 'available', guests: 0, order: null },
    { id: 104, status: 'reserved', guests: 4, order: null },
    { id: 105, status: 'occupied', guests: 3, order: 'Order #P102' },
    { id: 106, status: 'available', guests: 0, order: null },
    { id: 107, status: 'occupied', guests: 2, order: 'Order #P103' },
    { id: 108, status: 'available', guests: 0, order: null }
  ];

  const [tables, setTables] = useState(mainFloorTables);

  const handleJump = () => {
    const num = parseInt(quickJumpInput, 10);
    if (isNaN(num)) return;

    const tableId = activeFloor === 'main' ? num : num + 100;
    const tableElement = document.getElementById(`table-${tableId}`);
    if (tableElement) {
      document.querySelectorAll('.table-highlight').forEach((el) => {
        el.classList.remove('table-highlight', 'animate-pulse');
      });
      tableElement.classList.add('table-highlight', 'animate-pulse');
      tableElement.scrollIntoView({ behavior: 'smooth', block: 'center' });

      const tableData = tables.find((t) => t.id === tableId);
      if (tableData && tableData.status === 'available') {
        setTimeout(() => {
          setSelectedTable(tableId);
          setActiveTab('register');
          const updatedTables = tables.map((t) =>
            t.id === tableId
              ? {
                  ...t,
                  status: 'occupied',
                  guests: 0,
                  order: `Order #${Math.floor(Math.random() * 9000) + 1000}`,
                }
              : t
          );
          setTables(updatedTables);
        }, 500);
      }

      setTimeout(() => {
        tableElement.classList.remove('table-highlight', 'animate-pulse');
      }, 2000);
    }
  };

  return (
    <div className="container-fluid p-0">
      {/* Mobile Header */}
      <div className="d-md-none bg-light p-3 border-bottom">
        <h3 className="h5 mb-0">Table Management</h3>
      </div>

      <div className="d-flex flex-column flex-md-row w-100">
        {/* Floor Plan Layout - Main Content */}
        <div className="flex-grow-1">
          <div style={{
      backgroundColor: '#8B7355',
      minHeight: '100vh',
      padding: '20px',
      fontFamily: 'Arial, sans-serif'
    }}>
      <div style={{ display: 'flex', height: '600px', gap: '20px' }}>

        {/* Left Kitchen/Service Area */}
        <div style={{ width: '280px' }}>
          {/* Main Kitchen Area */}
          <div style={{
            backgroundColor: '#5A5A5A',
            height: '480px',
            borderRadius: '8px',
            padding: '15px',
            marginBottom: '15px',
            border: '3px solid #4A4A4A'
          }}>
            {/* Top Equipment Row */}
            <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
              <div style={{
                backgroundColor: '#6B6B6B',
                width: '45px',
                height: '80px',
                borderRadius: '4px',
                border: '2px solid #3A3A3A'
              }}></div>
              <div style={{
                backgroundColor: '#6B6B6B',
                width: '45px',
                height: '80px',
                borderRadius: '4px',
                border: '2px solid #3A3A3A'
              }}></div>
              <div style={{
                backgroundColor: '#6B6B6B',
                width: '45px',
                height: '80px',
                borderRadius: '4px',
                border: '2px solid #3A3A3A'
              }}></div>
              <div style={{
                backgroundColor: '#6B6B6B',
                width: '45px',
                height: '80px',
                borderRadius: '4px',
                border: '2px solid #3A3A3A'
              }}></div>
            </div>

            {/* Large Equipment/Counter */}
            <div style={{
              backgroundColor: '#6B6B6B',
              height: '120px',
              borderRadius: '6px',
              border: '3px solid #3A3A3A',
              marginBottom: '20px'
            }}></div>

            {/* Circular Elements (Burners) */}
            <div style={{
              display: 'flex',
              justifyContent: 'center',
              gap: '15px',
              marginBottom: '25px'
            }}>
              <div style={{
                width: '35px',
                height: '35px',
                backgroundColor: '#E8E8E8',
                borderRadius: '50%',
                border: '2px solid #CCCCCC'
              }}></div>
              <div style={{
                width: '35px',
                height: '35px',
                backgroundColor: '#E8E8E8',
                borderRadius: '50%',
                border: '2px solid #CCCCCC'
              }}></div>
            </div>

            {/* Bottom Equipment */}
            <div style={{
              backgroundColor: '#6B6B6B',
              height: '100px',
              borderRadius: '6px',
              border: '3px solid #3A3A3A'
            }}></div>
          </div>

          {/* Storage/Utility Area */}
          <div style={{
            backgroundColor: '#C4A574',
            height: '105px',
            borderRadius: '6px',
            border: '2px solid #B8956B',
            padding: '10px'
          }}>
            <div style={{
              backgroundColor: '#E6C085',
              width: '60px',
              height: '45px',
              borderRadius: '3px',
              border: '1px solid #D4A574'
            }}></div>
          </div>
        </div>

        {/* Main Dining Area */}
        <div style={{ flex: 1 }}>
          {/* Top Row - Plants and Large Oval Table */}
          <div style={{
            display: 'flex',
            alignItems: 'flex-start',
            marginBottom: '40px',
            height: '140px'
          }}>
            {/* Left Plant */}
            <div style={{
              width: '70px',
              height: '70px',
              backgroundColor: '#4CAF50',
              borderRadius: '50%',
              marginRight: '40px',
              marginTop: '20px',
              position: 'relative',
              border: '3px solid #45A049'
            }}>
              <div style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: '45px',
                height: '45px',
                backgroundColor: '#66BB6A',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'black',
                fontWeight: 'bold',
                fontSize: '16px'
              }}>
                1
              </div>
            </div>

            {/* Right Plant */}
            <div style={{
              width: '70px',
              height: '70px',
              backgroundColor: '#4CAF50',
              borderRadius: '50%',
              marginRight: '40px',
              marginTop: '20px',
              position: 'relative',
              border: '3px solid #45A049'
            }}>
              <div style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: '45px',
                height: '45px',
                backgroundColor: '#66BB6A',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'black',
                fontWeight: 'bold',
                fontSize: '16px'
              }}>
                2
              </div>
            </div>


            {/* Large Oval Table */}
            <div style={{
              width: '260px',
              height: '140px',
              backgroundColor: '#7BA3E0',
              borderRadius: '70px',
              position: 'relative',
              border: '3px solid #6B8FD1',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '32px',
              fontWeight: 'bold',
              color: 'black'
            }}>
              3
              {/* Top seats */}
              {[0, 1, 2, 3, 4].map((i) => (
                <div key={`top-${i}`} style={{
                  position: 'absolute',
                  width: '24px',
                  height: '16px',
                  backgroundColor: '#5577BB',
                  borderRadius: '4px',
                  top: '-20px',
                  left: `${30 + i * 40}px`,
                  border: '1px solid #4466AA',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                  fontSize: '10px',
                  fontWeight: 'bold'
                }}>

                </div>
              ))}

              {/* Bottom seats */}
              {[0, 1, 2, 3, 4].map((i) => (
                <div key={`bottom-${i}`} style={{
                  position: 'absolute',
                  width: '24px',
                  height: '16px',
                  backgroundColor: '#5577BB',
                  borderRadius: '4px',
                  bottom: '-20px',
                  left: `${30 + i * 40}px`,
                  border: '1px solid #4466AA',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                  fontSize: '10px',
                  fontWeight: 'bold'
                }}>

                </div>
              ))}

              {/* Left seats */}
              {[0, 1].map((i) => (
                <div key={`left-${i}`} style={{
                  position: 'absolute',
                  width: '16px',
                  height: '24px',
                  backgroundColor: '#5577BB',
                  borderRadius: '4px',
                  left: '-20px',
                  top: `${40 + i * 30}px`,
                  border: '1px solid #4466AA',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                  fontSize: '10px',
                  fontWeight: 'bold'
                }}>

                </div>
              ))}

              {/* Right seats */}
              {[0, 1].map((i) => (
                <div key={`right-${i}`} style={{
                  position: 'absolute',
                  width: '16px',
                  height: '24px',
                  backgroundColor: '#5577BB',
                  borderRadius: '4px',
                  right: '-20px',
                  top: `${40 + i * 30}px`,
                  border: '1px solid #4466AA',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                  fontSize: '10px',
                  fontWeight: 'bold'
                }}>

                </div>
              ))}
            </div>

          </div>

          {/* Table Grid - 3 rows of 3 tables each */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '60px 80px',
            paddingLeft: '40px'
          }}>
            {/* Tables 4-12 */}
            {[4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14].map((tableNum) => (
              <div key={tableNum} style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
              }}>
                <div style={{ position: 'relative' }}>
                  {/* Table */}
                  <div style={{
                    width: '80px',
                    height: '80px',
                    backgroundColor: '#D4C4A8',
                    borderRadius: '8px',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    fontSize: '16px',
                    fontWeight: 'bold',
                    color: '#333',
                    border: '2px solid #C4B498'
                  }}>
                    {tableNum}
                  </div>

                  {/* Chairs around table */}
                  {/* Top chairs */}
                  {[0, 1].map((i) => (
                    <div key={`top-${i}`} style={{
                      position: 'absolute',
                      width: '22px',
                      height: '14px',
                      backgroundColor: '#5577BB',
                      borderRadius: '3px',
                      top: '-18px',
                      left: `${18 + i * 26}px`,
                      border: '1px solid #4466AA'
                    }}></div>
                  ))}

                  {/* Bottom chairs */}
                  {[0, 1].map((i) => (
                    <div key={`bottom-${i}`} style={{
                      position: 'absolute',
                      width: '22px',
                      height: '14px',
                      backgroundColor: '#5577BB',
                      borderRadius: '3px',
                      bottom: '-18px',
                      left: `${18 + i * 26}px`,
                      border: '1px solid #4466AA'
                    }}></div>
                  ))}

                  {/* Left chairs */}
                  {[0, 1].map((i) => (
                    <div key={`left-${i}`} style={{
                      position: 'absolute',
                      width: '14px',
                      height: '22px',
                      backgroundColor: '#5577BB',
                      borderRadius: '3px',
                      left: '-18px',
                      top: `${18 + i * 26}px`,
                      border: '1px solid #4466AA'
                    }}></div>
                  ))}

                  {/* Right chairs */}
                  {[0, 1].map((i) => (
                    <div key={`right-${i}`} style={{
                      position: 'absolute',
                      width: '14px',
                      height: '22px',
                      backgroundColor: '#5577BB',
                      borderRadius: '3px',
                      right: '-18px',
                      top: `${18 + i * 26}px`,
                      border: '1px solid #4466AA'
                    }}></div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* Drinking Zone */}
      <div style={{
        display: 'flex',
        justifyContent: 'flex-end',
        paddingRight: '40px'
      }}>
        <div style={{ position: 'relative' }}>
          {/* Bar Table */}
          <div style={{
            width: '160px',
            height: '60px',
            backgroundColor: '#8B4513',
            borderRadius: '8px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            fontSize: '14px',
            fontWeight: 'bold',
            color: '#FFF',
            border: '3px solid #654321',
            boxShadow: '0 2px 4px rgba(0,0,0,0.3)'
          }}>
            DRINKING ZONE
          </div>
        </div>
      </div>
    </div>
        </div>

        {/* Right Panel - Number Pad */}
        <div 
          id="right-panel"
          className="bg-white border-start border-gray-200 p-3 d-none d-md-block"
          style={{ width: '260px' }}
        >
          <h3 className="h5 mb-3">Quick Jump</h3>

          {/* Input Field */}
          <div className="mb-3">
            <input
              type="number"
              min="0"
              className="form-control form-control-sm"
              placeholder="Enter table number"
              value={quickJumpInput}
              onChange={(e) => setQuickJumpInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleJump()}
            />
          </div>

          {/* Number Buttons */}
          <div className="row row-cols-3 g-2 mb-3">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 0].map((num) => (
              <div key={num} className="col">
                <button
                  onClick={() => setQuickJumpInput((prev) => prev + num.toString())}
                  className="btn btn-light btn-sm w-100"
                  style={{ height: '40px', fontSize: '14px' }}
                >
                  {num}
                </button>
              </div>
            ))}

            {/* Back Button */}
            <div className="col">
              <button
                onClick={() => setQuickJumpInput((prev) => prev.slice(0, -1))}
                className="btn btn-danger btn-sm w-100"
                style={{ height: '40px', fontSize: '14px' }}
              >
                ←
              </button>
            </div>
          </div>

          {/* Jump Button */}
          <button
            className="btn btn-warning w-100 mb-4"
            onClick={handleJump}
            disabled={!quickJumpInput}
          >
            Jump
          </button>

          {/* Status Legend */}
          <div className="mb-2">
            <h4 className="h6 mb-2">Table Status</h4>
            <div className="d-flex flex-column gap-2">
              <div className="d-flex align-items-center">
                <div className="bg-success rounded-circle me-2" style={{ width: '16px', height: '16px' }}></div>
                <span className="small">Occupied</span>
              </div>
              <div className="d-flex align-items-center">
                <div className="bg-secondary rounded-circle me-2" style={{ width: '16px', height: '16px' }}></div>
                <span className="small">Available</span>
              </div>
              <div className="d-flex align-items-center">
                <div className="bg-warning rounded-circle me-2" style={{ width: '16px', height: '16px' }}></div>
                <span className="small">Reserved</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Bottom Panel (hidden on desktop) */}
      <div className="d-md-none fixed-bottom bg-white border-top p-3">
        <div className="mb-3">
          <input
            type="number"
            min="0"
            className="form-control form-control-sm"
            placeholder="Enter table number"
            value={quickJumpInput}
            onChange={(e) => setQuickJumpInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleJump()}
          />
        </div>
        <div className="row row-cols-5 g-2 mb-2">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 0].map((num) => (
            <div key={num} className="col">
              <button
                onClick={() => setQuickJumpInput((prev) => prev + num.toString())}
                className="btn btn-light btn-sm w-100 py-2"
              >
                {num}
              </button>
            </div>
          ))}
        </div>
        <div className="d-flex gap-2">
          <button
            onClick={() => setQuickJumpInput((prev) => prev.slice(0, -1))}
            className="btn btn-danger btn-sm flex-grow-1"
          >
            ← Back
          </button>
          <button
            className="btn btn-warning btn-sm flex-grow-1"
            onClick={handleJump}
            disabled={!quickJumpInput}
          >
            Jump
          </button>
        </div>
      </div>
    </div>
  );
};

export default TableManagement;









// import React, { useState } from 'react';

// const RestaurantTableManagement = () => {
//   const [selectedTable, setSelectedTable] = useState(null);

//   const tables = [
//     { id: 1, guests: 4, status: 'occupied', orderNumber: '#1234' },
//     { id: 2, guests: 2, status: 'available' },
//     { id: 3, guests: 2, status: 'occupied', orderNumber: '#1235' },
//     { id: 4, guests: 4, status: 'available' },
//     { id: 5, guests: 6, status: 'reserved', orderNumber: '#1236' },
//     { id: 6, guests: 4, status: 'occupied' },
//     { id: 7, guests: 2, status: 'available' },
//     { id: 8, guests: 4, status: 'available' },
//     { id: 9, guests: 2, status: 'occupied', orderNumber: '#1237' },
//     { id: 10, guests: 4, status: 'available' },
//     { id: 11, guests: 2, status: 'available' },
//     { id: 12, guests: 6, status: 'occupied', orderNumber: '#1238' }
//   ];

//   const poolTables = [
//     { id: 'P1', status: 'occupied' },
//     { id: 'P2', status: 'occupied' },
//     { id: 'P3', status: 'occupied' },
//     { id: 'P4', status: 'occupied' }
//   ];

//   const getTableStatusColor = (status) => {
//     switch (status) {
//       case 'occupied': return '#28a745'; // Green
//       case 'available': return '#6c757d'; // Gray
//       case 'reserved': return '#ffc107'; // Yellow
//       default: return '#6c757d';
//     }
//   };

//   const getTableStatusBorder = (status) => {
//     switch (status) {
//       case 'occupied': return '#dc3545'; // Red border
//       case 'available': return '#17a2b8'; // Blue border
//       case 'reserved': return '#fd7e14'; // Orange border
//       default: return '#6c757d';
//     }
//   };

//   return (
//     <div className="restaurant-management" style={{ 
//       backgroundColor: '#2c3e50', 
//       minHeight: '100vh', 
//       color: 'white',
//       fontFamily: 'Arial, sans-serif'
//     }}>
//       {/* Header */}
//       <nav className="navbar navbar-dark" style={{ backgroundColor: '#34495e', padding: '10px 20px' }}>
//         <div className="d-flex align-items-center">
//           <button className="btn btn-primary me-3">Main Floor</button>
//           <button className="btn btn-outline-light">Patio</button>
//         </div>
//         <button className="btn btn-success">+ New Order</button>
//       </nav>

//       <div className="container-fluid">
//         <div className="row">
//           {/* Left Sidebar */}
//           <div className="col-2" style={{ backgroundColor: '#34495e', minHeight: 'calc(100vh - 60px)', padding: '20px 15px' }}>
//             {/* Reception */}
//             <div className="mb-4">
//               <div className="text-center p-3" style={{ 
//                 backgroundColor: '#4a6741', 
//                 borderRadius: '8px',
//                 border: '2px solid #5cb85c'
//               }}>
//                 <div style={{ fontSize: '24px', marginBottom: '5px' }}>🏠</div>
//                 <div style={{ fontSize: '12px' }}>Reception</div>
//               </div>
//             </div>

//             {/* Bar */}
//             <div className="mb-4">
//               <div className="text-center">
//                 <div style={{ fontSize: '14px', marginBottom: '15px' }}>Bar</div>
//               </div>
//             </div>

//             {/* Status Icons */}
//             <div className="d-flex justify-content-around mb-4">
//               <div style={{ color: '#ffc107', fontSize: '18px' }}>🍺</div>
//               <div style={{ color: '#dc3545', fontSize: '18px' }}>🔥</div>
//               <div style={{ color: '#ffc107', fontSize: '18px' }}>📋</div>
//             </div>

//             {/* Kitchen Status */}
//             <div className="mt-5">
//               <div className="text-center p-3" style={{ 
//                 backgroundColor: '#343a40',
//                 borderRadius: '8px'
//               }}>
//                 <div style={{ fontSize: '14px', marginBottom: '10px' }}>Kitchen</div>
//                 <div className="d-flex justify-content-center">
//                   <span className="badge bg-warning me-2">6</span>
//                   <span className="badge bg-info">11</span>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Main Content */}
//           <div className="col-7" style={{ padding: '20px' }}>
//             {/* Tables Grid */}
//             <div className="row g-3">
//               {tables.map((table) => (
//                 <div key={table.id} className="col-4">
//                   <div 
//                     className="text-center p-3 position-relative"
//                     style={{ 
//                       backgroundColor: getTableStatusColor(table.status),
//                       borderRadius: '12px',
//                       border: `3px solid ${getTableStatusBorder(table.status)}`,
//                       cursor: 'pointer',
//                       minHeight: '100px',
//                       display: 'flex',
//                       flexDirection: 'column',
//                       justifyContent: 'center'
//                     }}
//                     onClick={() => setSelectedTable(table.id)}
//                   >
//                     {/* Table Number */}
//                     <div style={{ 
//                       fontSize: '24px', 
//                       fontWeight: 'bold',
//                       marginBottom: '5px'
//                     }}>
//                       {table.id}
//                     </div>
                    
//                     {/* Order Number */}
//                     {table.orderNumber && (
//                       <div style={{ 
//                         fontSize: '12px',
//                         marginBottom: '5px'
//                       }}>
//                         {table.orderNumber}
//                       </div>
//                     )}
                    
//                     {/* Guest Count */}
//                     <div style={{ fontSize: '12px' }}>
//                       {table.guests} guests
//                     </div>

//                     {/* Status indicators */}
//                     <div className="position-absolute" style={{ top: '5px', left: '5px' }}>
//                       <div style={{ 
//                         width: '8px', 
//                         height: '8px', 
//                         backgroundColor: '#17a2b8', 
//                         borderRadius: '50%' 
//                       }}></div>
//                     </div>
//                     <div className="position-absolute" style={{ top: '5px', right: '5px' }}>
//                       <div style={{ 
//                         width: '8px', 
//                         height: '8px', 
//                         backgroundColor: '#28a745', 
//                         borderRadius: '50%' 
//                       }}></div>
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>

//           {/* Right Sidebar */}
//           <div className="col-3" style={{ backgroundColor: '#34495e', minHeight: 'calc(100vh - 60px)', padding: '20px 15px' }}>
//             {/* Pool Tables */}
//             <div className="mb-4">
//               <h6 className="text-center mb-3">Pool Tables</h6>
//               <div className="row g-2">
//                 {poolTables.map((table) => (
//                   <div key={table.id} className="col-6">
//                     <div 
//                       className="text-center p-3"
//                       style={{ 
//                         backgroundColor: '#28a745',
//                         borderRadius: '8px',
//                         minHeight: '80px',
//                         display: 'flex',
//                         alignItems: 'center',
//                         justifyContent: 'center'
//                       }}
//                     >
//                       <div>
//                         <div style={{ fontSize: '18px', fontWeight: 'bold' }}>
//                           {table.id}
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>

//             {/* Table Status Legend */}
//             <div className="mb-4">
//               <h6 className="mb-3">Table Status</h6>
//               <div className="mb-2">
//                 <span className="badge me-2" style={{ backgroundColor: '#28a745' }}>●</span>
//                 <small>Occupied</small>
//               </div>
//               <div className="mb-2">
//                 <span className="badge me-2" style={{ backgroundColor: '#6c757d' }}>●</span>
//                 <small>Available</small>
//               </div>
//               <div className="mb-2">
//                 <span className="badge me-2" style={{ backgroundColor: '#ffc107' }}>●</span>
//                 <small>Reserved</small>
//               </div>
//             </div>

//             {/* Quick Jump */}
//             <div>
//               <h6 className="text-center mb-3">Quick Jump</h6>
//               <div className="row g-2">
//                 {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
//                   <div key={num} className="col-4">
//                     <button 
//                       className="btn btn-outline-light w-100"
//                       style={{ 
//                         aspectRatio: '1',
//                         fontSize: '16px',
//                         fontWeight: 'bold'
//                       }}
//                       onClick={() => setSelectedTable(num)}
//                     >
//                       {num}
//                     </button>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default RestaurantTableManagement;