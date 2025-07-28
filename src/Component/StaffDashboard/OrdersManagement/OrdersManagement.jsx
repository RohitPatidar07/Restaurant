import React, { useState, useEffect } from 'react';
import { RiDashboardLine, RiRestaurantLine, RiTableLine, RiGamepadLine, RiPrinterLine, RiBarChartLine, RiSettingsLine, RiRefreshLine, RiAddLine, RiSubtractLine, RiCloseLine, RiCupLine, RiSearchLine, RiShoppingCartLine, RiFilterLine, RiCheckLine } from 'react-icons/ri';
import { Dropdown } from 'react-bootstrap';

const OrdersManagement = () => {
  // State for category tabs
  const [activeCategory, setActiveCategory] = useState(null);
  const [expandedCategory, setExpandedCategory] = useState(null);

  // State for cart
  const [cart, setCart] = useState(new Map());
  const [selectedTable, setSelectedTable] = useState(null);

  // State for modal
  const [showModal, setShowModal] = useState(false);
  const [serviceType, setServiceType] = useState('dine-in');
  const [orderType, setOrderType] = useState('food');
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [tableNumber, setTableNumber] = useState('');

  // State for mobile view
  const [showCart, setShowCart] = useState(false);

  // State for table filtering
  const [tableFilter, setTableFilter] = useState('all');
  const [showTableFilter, setShowTableFilter] = useState(false);

  // Generate more tables for demonstration
  const generateTables = () => {
    const baseTables = [
      { id: 'pool-1', name: 'Pool Table 1', status: 'available', details: 'Last cleaned: 10:30 AM', color: 'primary', type: 'game' },
      { id: 'pool-2', name: 'Pool Table 2', status: 'occupied', details: 'Started: 2:15 PM', color: 'warning', type: 'game' },
      { id: 'snooker-1', name: 'Snooker 1', status: 'available', details: 'Last cleaned: 11:45 AM', color: 'secondary', type: 'game' },
      { id: 'ps-1', name: 'PlayStation 1', status: 'reserved', details: 'Reserved for 3:00 PM', color: 'danger', type: 'game' },
      { id: 'ps-2', name: 'PlayStation 2', status: 'occupied', details: 'Started: 1:30 PM', color: 'warning', type: 'game' },
      { id: 'restaurant-1', name: 'Restaurant T1', status: 'available', details: 'Seats: 4', color: 'secondary', type: 'dining' },
      { id: 'restaurant-2', name: 'Restaurant T2', status: 'available', details: 'Seats: 2', color: 'secondary', type: 'dining' },
      { id: 'restaurant-3', name: 'Restaurant T3', status: 'occupied', details: 'Started: 1:45 PM', color: 'warning', type: 'dining' },
      { id: 'restaurant-4', name: 'Restaurant T4', status: 'available', details: 'Seats: 6', color: 'secondary', type: 'dining' },
      { id: 'restaurant-5', name: 'Restaurant T5', status: 'reserved', details: 'Reserved for 3:30 PM', color: 'danger', type: 'dining' },
      { id: 'restaurant-6', name: 'Restaurant T6', status: 'available', details: 'Seats: 4', color: 'secondary', type: 'dining' },
      { id: 'restaurant-7', name: 'Restaurant T7', status: 'available', details: 'Seats: 8', color: 'secondary', type: 'dining' },
      { id: 'restaurant-8', name: 'Restaurant T8', status: 'occupied', details: 'Started: 2:00 PM', color: 'warning', type: 'dining' },
      { id: 'pool-3', name: 'Pool Table 3', status: 'available', details: 'Last cleaned: 12:30 PM', color: 'primary', type: 'game' },
      { id: 'pool-4', name: 'Pool Table 4', status: 'available', details: 'Last cleaned: 1:00 PM', color: 'primary', type: 'game' },
      { id: 'snooker-2', name: 'Snooker 2', status: 'occupied', details: 'Started: 12:45 PM', color: 'warning', type: 'game' },
      { id: 'ps-3', name: 'PlayStation 3', status: 'available', details: 'Ready to use', color: 'secondary', type: 'game' },
      { id: 'ps-4', name: 'PlayStation 4', status: 'reserved', details: 'Reserved for 4:00 PM', color: 'danger', type: 'game' },
      { id: 'ps-5', name: 'PlayStation 5', status: 'available', details: 'Ready to use', color: 'secondary', type: 'game' },
      { id: 'ps-6', name: 'PlayStation 6', status: 'occupied', details: 'Started: 1:15 PM', color: 'warning', type: 'game' }
    ];

    return baseTables;
  };

  const tables = generateTables();

  // Filter tables based on selected filter
  const filteredTables = tables.filter(table => {
    if (tableFilter === 'all') return true;
    if (tableFilter === 'available') return table.status === 'available';
    if (tableFilter === 'occupied') return table.status === 'occupied';
    if (tableFilter === 'reserved') return table.status === 'reserved';
    if (tableFilter === 'dining') return table.type === 'dining';
    if (tableFilter === 'game') return table.type === 'game';
    return true;
  });

  // Menu items data organized by categories
  const menuCategories = {
    food: {
      name: "Food",
      items: [
        { id: 1, name: 'Margherita Pizza', description: 'Fresh basil and mozzarella', price: 18.50, image: 'https://readdy.ai/api/search-image?query=margherita%20pizza%20with%20fresh%20basil%20and%20mozzarella%20cheese%20on%20white%20background%2C%20professional%20food%20photography%2C%20clean%20minimal%20background&width=200&height=200&seq=pizza1&orientation=squarish' },
        { id: 2, name: 'Chicken Burger', description: 'Crispy chicken with fresh lettuce', price: 12.99, image: 'https://readdy.ai/api/search-image?query=delicious%20crispy%20chicken%20burger%20with%20lettuce%20tomato%20and%20cheese%20on%20white%20background%2C%20professional%20food%20photography%2C%20clean%20minimal%20background&width=200&height=200&seq=burger1&orientation=squarish' },
        { id: 3, name: 'Grilled Salmon', description: 'Fresh salmon with vegetables', price: 24.99, image: 'https://readdy.ai/api/search-image?query=grilled%20salmon%20steak%20with%20vegetables%20and%20lemon%20on%20white%20background%2C%20professional%20food%20photography%2C%20clean%20minimal%20background&width=200&height=200&seq=salmon1&orientation=squarish' },
        { id: 4, name: 'Caesar Salad', description: 'Crisp romaine with parmesan', price: 9.99, image: 'https://readdy.ai/api/search-image?query=caesar%20salad%20with%20croutons%20parmesan%20cheese%20and%20dressing%20on%20white%20background%2C%20professional%20food%20photography%2C%20clean%20minimal%20background&width=200&height=200&seq=salad1&orientation=squarish' }
      ]
    },
    drinks: {
      name: "Drinks",
      items: [
        { id: 5, name: 'Fresh Orange Juice', description: '100% fresh squeezed', price: 4.99, image: 'https://readdy.ai/api/search-image?query=fresh%20orange%20juice%20in%20glass%20with%20orange%20slices%20on%20white%20background%2C%20professional%20beverage%20photography%2C%20clean%20minimal%20background&width=200&height=200&seq=juice1&orientation=squarish' },
        { id: 6, name: 'Iced Coffee', description: 'Premium blend with milk foam', price: 3.50, image: 'https://readdy.ai/api/search-image?query=iced%20coffee%20with%20milk%20foam%20in%20tall%20glass%20on%20white%20background%2C%20professional%20beverage%20photography%2C%20clean%20minimal%20background&width=200&height=200&seq=coffee1&orientation=squarish' }
      ]
    },
    games: {
      name: "Games",
      items: [
        { id: 7, name: 'Pool Table', description: 'Per hour gaming session', price: 15.00, image: 'https://readdy.ai/api/search-image?query=pool%20table%20with%20colorful%20billiard%20balls%20and%20cues%20in%20game%20center%20on%20white%20background%2C%20professional%20photography%2C%20clean%20minimal%20background&width=200&height=200&seq=pool1&orientation=squarish' },
        { id: 8, name: 'PlayStation 5', description: 'Latest games available', price: 20.00, image: 'https://readdy.ai/api/search-image?query=playstation%20gaming%20console%20with%20controllers%20and%20games%20in%20entertainment%20center%20on%20white%20background%2C%20professional%20photography%2C%20clean%20minimal%20background&width=200&height=200&seq=ps1&orientation=squarish' }
      ]
    }
  };

  // Handle quantity changes
  const handleQuantityChange = (item, action) => {
    const newCart = new Map(cart);
    const currentQuantity = newCart.get(item.id)?.quantity || 0;

    if (action === 'increase') {
      newCart.set(item.id, { ...item, quantity: currentQuantity + 1 });
    } else if (action === 'decrease' && currentQuantity > 0) {
      if (currentQuantity === 1) {
        newCart.delete(item.id);
      } else {
        newCart.set(item.id, { ...item, quantity: currentQuantity - 1 });
      }
    }

    setCart(newCart);
  };

  // Clear cart
  const clearCart = () => {
    setCart(new Map());
  };

  // Send to kitchen
  const sendToKitchen = () => {
    if (!selectedTable) {
      alert('Please select a table first');
      return;
    }
    alert(`Order sent to Kitchen/Bar for ${selectedTable}`);
    clearCart();
    setSelectedTable(null);
  };

  // Calculate order totals
  const calculateTotals = () => {
    let subtotal = 0;
    cart.forEach(item => {
      subtotal += item.quantity * item.price;
    });
    const tax = subtotal * 0.08;
    const total = subtotal + tax;
    return { subtotal, tax, total };
  };

  // Open/close modal
  const openNewOrderModal = () => setShowModal(true);
  const closeNewOrderModal = () => setShowModal(false);

  // Create new order
  const createNewOrder = () => {
    if (serviceType === 'dine-in' && !tableNumber) {
      alert('Please select a table for dine-in service');
      return;
    }
    if (!orderType) {
      alert('Please select an order type');
      return;
    }
    closeNewOrderModal();
  };

  // Get status badge class
  const getStatusBadgeClass = (status) => {
    switch (status) {
      case 'available': return 'bg-primary bg-opacity-10 text-primary';
      case 'occupied': return 'bg-warning bg-opacity-10 text-warning';
      case 'reserved': return 'bg-danger bg-opacity-10 text-danger';
      default: return 'bg-secondary bg-opacity-10 text-secondary';
    }
  };

  // Get table type icon
  const getTableTypeIcon = (type) => {
    return type === 'game' ? <RiGamepadLine /> : <RiRestaurantLine />;
  };

  // Toggle category expansion
  const toggleCategory = (category) => {
    if (expandedCategory === category) {
      setExpandedCategory(null);
    } else {
      setExpandedCategory(category);
      setActiveCategory(category);
    }
  };

  const { subtotal, tax, total } = calculateTotals();

  return (
    <div className="d-flex vh-100" style={{ overflowX: 'hidden' }}>
      {/* Main Content */}
      <div className="d-flex flex-column flex-grow-1 overflow-hidden">
        {/* Header */}
        <div className="p-3">
          <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center">
            <div className="">
              <h1 className="fs-3 fw-bold text-dark">Orders Management</h1>
            </div>
            <div className="d-flex flex-wrap align-items-center gap-2 gap-md-3">
              <div className="d-none d-md-flex gap-4 small text-muted">
                <span className="d-flex align-items-center">
                  <span className="d-inline-block rounded-circle bg-dark me-2" style={{ width: '8px', height: '8px' }}></span>
                  Active Orders: 12
                </span>
                <span className="d-flex align-items-center">
                  <span className="d-inline-block rounded-circle bg-warning me-2" style={{ width: '8px', height: '8px' }}></span>
                  Pending KOTs: 3
                </span>
              </div>
              <button className="btn btn-light d-flex align-items-center btn-sm">
                <RiRefreshLine className="me-1 me-md-2" />
                <span className="d-none d-md-inline">Refresh</span>
              </button>
              <button
                className="btn btn-dark d-flex align-items-center btn-sm"
                onClick={openNewOrderModal}
              >
                <RiAddLine className="me-1 me-md-2" />
                <span className="d-none d-md-inline">New Order</span>
                <span className="d-md-none">New</span>
              </button>
            </div>
          </div>
        </div>

        {/* Main Panel */}
        <div className="d-flex flex-column flex-md-row flex-grow-1 overflow-hidden position-relative">
          {/* Menu Section */}
          <div className={`flex-grow-1 p-3 overflow-auto ${showCart ? 'd-none d-md-block' : ''}`} style={{ scrollbarWidth: 'none' }}>
            {/* Category Tabs - Mobile */}
            <div className="d-md-none mb-3">
              <div className="btn-group w-100" role="group">
                {/* <button 
                  className={`btn btn-sm ${activeCategory === 'food' ? 'btn-warning' : 'btn-outline-secondary'}`}
                  onClick={() => setActiveCategory('food')}
                >
                  <RiRestaurantLine />
                </button>
                <button 
                  className={`btn btn-sm ${activeCategory === 'drinks' ? 'btn-warning' : 'btn-outline-secondary'}`}
                  onClick={() => setActiveCategory('drinks')}
                >
                  <RiCupLine />
                </button>
                <button 
                  className={`btn btn-sm ${activeCategory === 'games' ? 'btn-warning' : 'btn-outline-secondary'}`}
                  onClick={() => setActiveCategory('games')}
                >
                  <RiGamepadLine />
                </button> */}
                <button
                  className={`btn btn-sm ${showCart ? 'btn-warning' : 'btn-outline-secondary'}`}
                  onClick={() => setShowCart(true)}
                >
                  <RiShoppingCartLine />
                  {cart.size > 0 && (
                    <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                      {Array.from(cart.values()).reduce((acc, item) => acc + item.quantity, 0)}
                    </span>
                  )}
                </button>
              </div>
            </div>

            {/* Search and Filters */}
            <div className="mb-3 mb-md-4 d-flex flex-column flex-md-row gap-2 gap-md-3">
              <div className="position-relative flex-grow-1">
                <div className="position-absolute top-50 start-0 translate-middle-y ps-3">
                  <RiSearchLine />
                </div>
                <input
                  type="text"
                  className="form-control ps-5"
                  placeholder="Search menu items..."
                />
              </div>
              <div className="d-flex gap-2">
                <button className="btn btn-outline-secondary btn-sm">Popular</button>
                <button className="btn btn-outline-secondary btn-sm">Vegetarian</button>
                <button className="btn btn-outline-secondary btn-sm d-none d-md-inline-block">Spicy</button>
              </div>
            </div>

            {/* Menu Categories Grid */}
            <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-3 g-md-4 mb-4">
              {Object.entries(menuCategories).map(([categoryKey, categoryData]) => (
                <div key={categoryKey} className="col">
                  <div
                    className={`card h-100 ${expandedCategory === categoryKey ? 'border-warning' : ''}`}
                    onClick={() => toggleCategory(categoryKey)}
                    style={{ cursor: 'pointer' }}
                  >
                    <div className="card-body p-3">
                      <div className="d-flex justify-content-between align-items-center mb-2">
                        <h3 className="h5 fw-semibold mb-0">{categoryData.name}</h3>
                        <span className="badge bg-light text-dark rounded-pill">
                          {categoryData.items.length} items
                        </span>
                      </div>

                      {/* Show first 2 items as preview */}
                      {expandedCategory !== categoryKey && (
                        <div className="mt-3">
                          {categoryData.items.slice(0, 2).map(item => (
                            <div
                              key={item.id}
                              className="d-flex justify-content-between align-items-center py-2 border-bottom"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleQuantityChange(item, 'increase');
                              }}
                            >
                              <div className="flex-grow-1">
                                <h6 className="fw-medium mb-0">{item.name}</h6>
                                <p className="small text-muted mb-0">{item.description}</p>
                              </div>
                              <div className="d-flex align-items-center">
                                <span className="fw-semibold me-2">${item.price.toFixed(2)}</span>
                                <button
                                  className="btn btn-sm btn-dark rounded-circle p-0 d-flex align-items-center justify-content-center"
                                  style={{ width: '24px', height: '24px' }}
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleQuantityChange(item, 'increase');
                                  }}
                                >
                                  <RiAddLine size={12} />
                                </button>
                              </div>
                            </div>
                          ))}
                          {categoryData.items.length > 2 && (
                            <div className="text-center mt-2">
                              <button
                                className="btn btn-link text-warning p-0 small"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  toggleCategory(categoryKey);
                                }}
                              >
                                + {categoryData.items.length - 2} more items
                              </button>
                            </div>
                          )}
                        </div>
                      )}

                      {/* Show all items when expanded */}
                      {expandedCategory === categoryKey && (
                        <div className="mt-3">
                          {categoryData.items.map(item => (
                            <div
                              key={item.id}
                              className="d-flex justify-content-between align-items-center py-2 border-bottom"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleQuantityChange(item, 'increase');
                              }}
                            >
                              <div className="flex-grow-1">
                                <h6 className="fw-medium mb-0">{item.name}</h6>
                                <p className="small text-muted mb-0">{item.description}</p>
                              </div>
                              <div className="d-flex align-items-center gap-2">
                                <span className="fw-semibold">${item.price.toFixed(2)}</span>
                                <div className="d-flex align-items-center gap-1">
                                  <button
                                    className="btn btn-sm btn-light rounded-circle p-0 d-flex align-items-center justify-content-center"
                                    style={{ width: '24px', height: '24px' }}
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      handleQuantityChange(item, 'decrease');
                                    }}
                                  >
                                    <RiSubtractLine size={12} />
                                  </button>
                                  <span className="fw-medium" style={{ width: '20px', textAlign: 'center', fontSize: '0.9rem' }}>
                                    {cart.get(item.id)?.quantity || 0}
                                  </span>
                                  <button
                                    className="btn btn-sm btn-dark rounded-circle p-0 d-flex align-items-center justify-content-center"
                                    style={{ width: '24px', height: '24px' }}
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      handleQuantityChange(item, 'increase');
                                    }}
                                  >
                                    <RiAddLine size={12} />
                                  </button>
                                </div>
                              </div>
                            </div>
                          ))}
                          <div className="text-center mt-2">
                            <button
                              className="btn btn-link text-muted p-0 small"
                              onClick={(e) => {
                                e.stopPropagation();
                                setExpandedCategory(null);
                              }}
                            >
                              Show less
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Table Assignment Section */}
            <div className="mt-4">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h2 className="h5 fw-semibold mb-0">Assign to Table</h2>
                <div className="position-relative">
                  <button
                    className="btn btn-sm btn-outline-secondary d-flex align-items-center"
                    onClick={() => setShowTableFilter(!showTableFilter)}
                  >
                    <RiFilterLine className="me-1" />
                    Filter
                  </button>
                  {showTableFilter && (
                    <div className="position-absolute end-0 mt-1 bg-white border rounded shadow p-2" style={{ zIndex: 100, width: '180px' }}>
                      <div
                        className={`d-flex align-items-center p-2 rounded ${tableFilter === 'all' ? 'bg-light' : ''}`}
                        onClick={() => setTableFilter('all')}
                        style={{ cursor: 'pointer' }}
                      >
                        {tableFilter === 'all' && <RiCheckLine className="me-2 text-primary" />}
                        <span>All Tables</span>
                      </div>
                      <div
                        className={`d-flex align-items-center p-2 rounded ${tableFilter === 'available' ? 'bg-light' : ''}`}
                        onClick={() => setTableFilter('available')}
                        style={{ cursor: 'pointer' }}
                      >
                        {tableFilter === 'available' && <RiCheckLine className="me-2 text-primary" />}
                        <span>Available</span>
                      </div>
                      <div
                        className={`d-flex align-items-center p-2 rounded ${tableFilter === 'occupied' ? 'bg-light' : ''}`}
                        onClick={() => setTableFilter('occupied')}
                        style={{ cursor: 'pointer' }}
                      >
                        {tableFilter === 'occupied' && <RiCheckLine className="me-2 text-primary" />}
                        <span>Occupied</span>
                      </div>
                      <div
                        className={`d-flex align-items-center p-2 rounded ${tableFilter === 'reserved' ? 'bg-light' : ''}`}
                        onClick={() => setTableFilter('reserved')}
                        style={{ cursor: 'pointer' }}
                      >
                        {tableFilter === 'reserved' && <RiCheckLine className="me-2 text-primary" />}
                        <span>Reserved</span>
                      </div>
                      <div className="dropdown-divider my-1"></div>
                      <div
                        className={`d-flex align-items-center p-2 rounded ${tableFilter === 'dining' ? 'bg-light' : ''}`}
                        onClick={() => setTableFilter('dining')}
                        style={{ cursor: 'pointer' }}
                      >
                        {tableFilter === 'dining' && <RiCheckLine className="me-2 text-primary" />}
                        <span>Dining Tables</span>
                      </div>
                      <div
                        className={`d-flex align-items-center p-2 rounded ${tableFilter === 'game' ? 'bg-light' : ''}`}
                        onClick={() => setTableFilter('game')}
                        style={{ cursor: 'pointer' }}
                      >
                        {tableFilter === 'game' && <RiCheckLine className="me-2 text-primary" />}
                        <span>Game Tables</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-3">
                {filteredTables.map(table => (
                  <div key={table.id} className="col">
                    <div
                      className={`card h-100 ${selectedTable === table.id ? 'border-primary border-2' : ''}`}
                      onClick={() => table.status !== 'reserved' && setSelectedTable(table.id)}
                      style={{
                        cursor: table.status === 'reserved' ? 'not-allowed' : 'pointer',
                        opacity: table.status === 'reserved' ? 0.7 : 1
                      }}
                    >
                      <div className="card-body p-3">
                        <div className="d-flex justify-content-between align-items-start mb-2">
                          <div>
                            <h3 className="h6 fw-semibold mb-0">
                              {table.name.split(' ')[0]} {table.name.split(' ')[1].charAt(0)}{table.name.split(' ')[1].slice(1).match(/\d+/)?.[0] || ''}
                            </h3>
                            <div className="d-flex align-items-center mt-1">
                              <span className={`badge rounded-pill ${getStatusBadgeClass(table.status)}`}>
                                {table.status.charAt(0).toUpperCase() + table.status.slice(1).substring(0, 3)}
                              </span>
                              <span className="ms-2 text-muted">
                                {getTableTypeIcon(table.type)}
                              </span>
                            </div>
                          </div>
                          {selectedTable === table.id && (
                            <span className="badge bg-primary rounded-circle p-1">
                              <RiCheckLine size={12} />
                            </span>
                          )}
                        </div>
                        <p className="small text-muted mb-0">{table.details}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Cart Panel - Mobile (Bottom Sheet) */}
          <div className={`d-md-none position-fixed bottom-0 start-0 end-0 bg-white rounded-top-3 shadow-lg ${showCart ? '' : 'translate-y-100'}`}
            style={{
              zIndex: 1050,
              transition: 'transform 0.3s ease-in-out',
              transform: showCart ? 'translateY(0)' : 'translateY(100%)',
              maxHeight: '80vh'
            }}>
            <div className="p-3 border-bottom d-flex justify-content-between align-items-center">
              <h5 className="mb-0 fw-semibold">Order Summary</h5>
              <button className="btn btn-sm btn-outline-secondary" onClick={() => setShowCart(false)}>
                <RiCloseLine />
              </button>
            </div>
            <div className="p-3 overflow-auto" style={{ maxHeight: '60vh' }}>
              {cart.size === 0 ? (
                <div className="text-center text-muted py-4">
                  <RiShoppingCartLine size={32} className="mb-2 text-muted" />
                  <p>No items in cart</p>
                </div>
              ) : (
                <div className="d-flex flex-column gap-2">
                  {Array.from(cart.values()).map(item => (
                    <div key={item.id} className="d-flex justify-content-between align-items-center py-2 border-bottom">
                      <div className="flex-grow-1">
                        <h6 className="fw-medium mb-0">{item.name}</h6>
                        <p className="small text-muted mb-0">${item.price.toFixed(2)} × {item.quantity}</p>
                      </div>
                      <span className="fw-semibold">${(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
            <div className="p-3 border-top">
              <div className="mb-2">
                <div className="d-flex justify-content-between small mb-1">
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="d-flex justify-content-between small mb-2">
                  <span>Tax (8%)</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
                <div className="d-flex justify-content-between fw-semibold border-top pt-2">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>
              <button
                className={`btn w-100 mb-2 ${cart.size === 0 ? 'btn-secondary disabled' : 'btn-dark'}`}
                disabled={cart.size === 0}
                onClick={sendToKitchen}
              >
                <RiPrinterLine className="me-2" />
                Send to Kitchen/Bar
              </button>
              <button
                className="btn btn-outline-secondary w-100"
                onClick={clearCart}
              >
                Clear Cart
              </button>
            </div>
          </div>

          {/* Cart Panel - Desktop */}
          <div className="d-none d-md-flex flex-column border-start bg-white" style={{ width: '1300px', scrollbarWidth: 'none' }}>
            <div className="p-4 border-bottom">
              <h2 className="h5 fw-semibold mb-2">Order Summary</h2>
              <div className="small text-muted">
                <p>Table: <span className="fw-medium text-dark">{selectedTable || 'Not Selected'}</span></p>
                <p>Time: <span className="fw-medium text-dark">2:45 PM</span></p>
              </div>
            </div>
            <div className="flex-grow-1 p-4 overflow-auto">
              {cart.size === 0 ? (
                <div className="text-center text-muted py-4">
                  <RiShoppingCartLine size={48} className="mb-3 text-muted" />
                  <p>No items in cart</p>
                  <p className="small">Add items from menu</p>
                </div>
              ) : (
                <div className="d-flex flex-column gap-3">
                  {Array.from(cart.values()).map(item => (
                    <div key={item.id} className="d-flex justify-content-between py-3 border-bottom">
                      <div className="flex-grow-1">
                        <h4 className="fw-medium">{item.name}</h4>
                        <p className="small text-muted">${item.price.toFixed(2)} × {item.quantity}</p>
                      </div>
                      <span className="fw-semibold">${(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
            <div className="p-4 border-top">
              <div className="mb-3">
                <div className="d-flex justify-content-between small mb-1">
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="d-flex justify-content-between small mb-2">
                  <span>Tax (8%)</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
                <div className="d-flex justify-content-between fw-semibold border-top pt-2">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>
              <button
                className={`btn w-100 mb-2 d-flex align-items-center justify-content-center ${cart.size === 0 ? 'btn-secondary disabled' : 'btn-dark'}`}
                disabled={cart.size === 0}
                onClick={sendToKitchen}
              >
                <RiPrinterLine className="me-2" />
                Send to Kitchen/Bar
              </button>
              <button
                className="btn btn-outline-secondary w-100"
                onClick={clearCart}
              >
                Clear Cart
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* New Order Modal */}
      {showModal && (
        <div className="modal fade show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header border-bottom">
                <h5 className="modal-title fw-semibold">New Order</h5>
                <button type="button" className="btn-close" onClick={closeNewOrderModal}></button>
              </div>
              <div className="modal-body">
                <div className="mb-4">
                  <label className="form-label">Service Type</label>
                  <div className="btn-group w-100" role="group">
                    <input
                      type="radio"
                      className="btn-check"
                      name="service-type"
                      id="dine-in"
                      autoComplete="off"
                      checked={serviceType === 'dine-in'}
                      onChange={() => setServiceType('dine-in')}
                    />
                    <label className={`btn ${serviceType === 'dine-in' ? 'btn-warning' : 'btn-outline-secondary'}`} htmlFor="dine-in">
                      Dine In
                    </label>

                    <input
                      type="radio"
                      className="btn-check"
                      name="service-type"
                      id="take-away"
                      autoComplete="off"
                      checked={serviceType === 'take-away'}
                      onChange={() => setServiceType('take-away')}
                    />
                    <label className={`btn ${serviceType === 'take-away' ? 'btn-warning' : 'btn-outline-secondary'}`} htmlFor="take-away">
                      Take Away
                    </label>
                  </div>
                </div>

                {serviceType === 'dine-in' && (
                  <>
                    <div className="mb-4">
                      <label className="form-label">Location</label>
                      <div className="row g-3">
                        <div className="col-6">
                          <button
                            type="button"
                            className={`btn w-100 h-100 d-flex flex-column align-items-center justify-content-center py-3 ${selectedLocation === 'restaurant' ? 'border-warning bg-warning bg-opacity-10' : 'border'}`}
                            onClick={() => setSelectedLocation('restaurant')}
                          >
                            <RiRestaurantLine size={24} className="mb-2" />
                            <span className="small">Restaurant</span>
                          </button>
                        </div>
                        <div className="col-6">
                          <button
                            type="button"
                            className={`btn w-100 h-100 d-flex flex-column align-items-center justify-content-center py-3 ${selectedLocation === 'pool' ? 'border-warning bg-warning bg-opacity-10' : 'border'}`}
                            onClick={() => setSelectedLocation('pool')}
                          >
                            <RiGamepadLine size={24} className="mb-2" />
                            <span className="small">Pool Area</span>
                          </button>
                        </div>
                      </div>
                    </div>

                    <Dropdown drop="down" className="mb-4">
                      <label className="form-label">Select Table</label>

                      <Dropdown.Toggle
                        className="form-select w-100 text-start fw-normal"
                        style={{
                          backgroundColor: 'white',
                          color: 'black',
                          border: '1px solid #ced4da',
                          padding: '6px 12px',
                          fontSize: '0.9rem',
                          borderRadius: '0.375rem',
                          height: '38px',
                          lineHeight: '24px'
                        }}
                      >
                        {tableNumber
                          ? tables.find((t) => t.id === tableNumber)?.name
                          : "Select a table"}
                      </Dropdown.Toggle>


                      <Dropdown.Menu
                        className="w-100 custom-scroll-dropdown"
                        style={{ maxHeight: "200px", overflowY: "auto" }}
                      >
                        <Dropdown.Header className='h3 fw-bold text-dark'>Restaurant Tables</Dropdown.Header>
                        {tables.filter(t => t.type === 'dining').map(table => (
                          <Dropdown.Item
                            key={table.id}
                            disabled={table.status !== 'available'}
                            onClick={() => setTableNumber(table.id)}
                          >
                            {table.name} ({table.status.charAt(0).toUpperCase() + table.status.slice(1)})
                          </Dropdown.Item>
                        ))}

                        <Dropdown.Divider />
                        <Dropdown.Header className='h3 fw-bold text-dark'>Game Tables</Dropdown.Header>
                        {tables.filter(t => t.type === 'game').map(table => (
                          <Dropdown.Item
                            key={table.id}
                            disabled={table.status !== 'available'}
                            onClick={() => setTableNumber(table.id)}
                          >
                            {table.name} ({table.status.charAt(0).toUpperCase() + table.status.slice(1)})
                          </Dropdown.Item>
                        ))}
                      </Dropdown.Menu>
                    </Dropdown>
                  </>
                )}

                <div className="mb-4">
                  <label className="form-label">Order Type</label>
                  <div className="d-flex gap-4">
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="order-type"
                        id="food"
                        checked={orderType === 'food'}
                        onChange={() => setOrderType('food')}
                      />
                      <label className="form-check-label" htmlFor="food">
                        Food & Drinks
                      </label>
                    </div>
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="order-type"
                        id="game"
                        checked={orderType === 'game'}
                        onChange={() => setOrderType('game')}
                      />
                      <label className="form-check-label" htmlFor="game">
                        Game Session
                      </label>
                    </div>
                  </div>
                </div>

                <div className="mb-0">
                  <label className="form-label">Special Instructions</label>
                  <textarea
                    className="form-control"
                    rows="3"
                    placeholder="Add any special instructions..."
                  ></textarea>
                </div>
              </div>
              <div className="modal-footer bg-light">
                <button
                  type="button"
                  className="btn btn-outline-secondary"
                  onClick={closeNewOrderModal}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="btn btn-dark"
                  onClick={createNewOrder}
                >
                  Create Order
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrdersManagement;