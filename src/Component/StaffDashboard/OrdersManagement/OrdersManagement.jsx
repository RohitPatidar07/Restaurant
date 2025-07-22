import React, { useState, useEffect } from 'react';
// import 'bootstrap/dist/css/bootstrap.min.css';
import { RiDashboardLine, RiRestaurantLine, RiTableLine, RiGamepadLine, RiPrinterLine, RiBarChartLine, RiSettingsLine, RiRefreshLine, RiAddLine, RiSubtractLine, RiCloseLine, RiCupLine, RiSearchLine, RiShoppingCartLine } from 'react-icons/ri';

const OrdersManagement = () => {
  // State for category tabs
  const [activeCategory, setActiveCategory] = useState('food');
  
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
  
  // Menu items data
  const menuItems = {
    food: [
      { id: 1, name: 'Chicken Burger', description: 'Crispy chicken with fresh lettuce', price: 12.99, image: 'https://readdy.ai/api/search-image?query=delicious%20crispy%20chicken%20burger%20with%20lettuce%20tomato%20and%20cheese%20on%20white%20background%2C%20professional%20food%20photography%2C%20clean%20minimal%20background&width=200&height=200&seq=burger1&orientation=squarish' },
      { id: 2, name: 'Margherita Pizza', description: 'Fresh basil and mozzarella', price: 18.50, image: 'https://readdy.ai/api/search-image?query=margherita%20pizza%20with%20fresh%20basil%20and%20mozzarella%20cheese%20on%20white%20background%2C%20professional%20food%20photography%2C%20clean%20minimal%20background&width=200&height=200&seq=pizza1&orientation=squarish' },
      { id: 3, name: 'Grilled Salmon', description: 'Fresh salmon with vegetables', price: 24.99, image: 'https://readdy.ai/api/search-image?query=grilled%20salmon%20steak%20with%20vegetables%20and%20lemon%20on%20white%20background%2C%20professional%20food%20photography%2C%20clean%20minimal%20background&width=200&height=200&seq=salmon1&orientation=squarish' },
      { id: 4, name: 'Caesar Salad', description: 'Crisp romaine with parmesan', price: 9.99, image: 'https://readdy.ai/api/search-image?query=caesar%20salad%20with%20croutons%20parmesan%20cheese%20and%20dressing%20on%20white%20background%2C%20professional%20food%20photography%2C%20clean%20minimal%20background&width=200&height=200&seq=salad1&orientation=squarish' }
    ],
    drinks: [
      { id: 5, name: 'Fresh Orange Juice', description: '100% fresh squeezed', price: 4.99, image: 'https://readdy.ai/api/search-image?query=fresh%20orange%20juice%20in%20glass%20with%20orange%20slices%20on%20white%20background%2C%20professional%20beverage%20photography%2C%20clean%20minimal%20background&width=200&height=200&seq=juice1&orientation=squarish' },
      { id: 6, name: 'Iced Coffee', description: 'Premium blend with milk foam', price: 3.50, image: 'https://readdy.ai/api/search-image?query=iced%20coffee%20with%20milk%20foam%20in%20tall%20glass%20on%20white%20background%2C%20professional%20beverage%20photography%2C%20clean%20minimal%20background&width=200&height=200&seq=coffee1&orientation=squarish' }
    ],
    games: [
      { id: 7, name: 'Pool Table', description: 'Per hour gaming session', price: 15.00, image: 'https://readdy.ai/api/search-image?query=pool%20table%20with%20colorful%20billiard%20balls%20and%20cues%20in%20game%20center%20on%20white%20background%2C%20professional%20photography%2C%20clean%20minimal%20background&width=200&height=200&seq=pool1&orientation=squarish' },
      { id: 8, name: 'PlayStation 5', description: 'Latest games available', price: 20.00, image: 'https://readdy.ai/api/search-image?query=playstation%20gaming%20console%20with%20controllers%20and%20games%20in%20entertainment%20center%20on%20white%20background%2C%20professional%20photography%2C%20clean%20minimal%20background&width=200&height=200&seq=ps1&orientation=squarish' }
    ]
  };

  // Tables data
  const tables = [
    { id: 'pool-1', name: 'Pool Table 1', status: 'available', details: 'Last cleaned: 10:30 AM', color: 'primary' },
    { id: 'pool-2', name: 'Pool Table 2', status: 'occupied', details: 'Started: 2:15 PM', color: 'warning' },
    { id: 'snooker-1', name: 'Snooker 1', status: 'available', details: 'Last cleaned: 11:45 AM', color: 'secondary' },
    { id: 'ps-1', name: 'PlayStation 1', status: 'reserved', details: 'Reserved for 3:00 PM', color: 'danger' },
    { id: 'ps-2', name: 'PlayStation 2', status: 'occupied', details: 'Started: 1:30 PM', color: 'warning' },
    { id: 'restaurant-1', name: 'Restaurant T1', status: 'available', details: 'Seats: 4', color: 'secondary' }
  ];

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

  const { subtotal, tax, total } = calculateTotals();

  return (
    <div className="d-flex vh-100" style={{ overflowX: 'hidden' }}>
      {/* Main Content */}
      <div className="d-flex flex-column flex-grow-1 overflow-hidden">
        {/* Header */}
        <div className="p-3">
          <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center">
            <div className="mb-3 mb-md-0">
              <h1 className="fs-3 fw-bold text-dark">Orders Management</h1>
              <div className="d-flex align-items-center text-muted small">
                <span>Dashboard</span>
                <span className="mx-2">•</span>
                <span>Orders</span>
              </div>
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
          <div className={`flex-grow-1 p-3 p-md-4 overflow-auto ${showCart ? 'd-none d-md-block' : ''}`}>
            {/* Category Tabs - Mobile */}
            <div className="d-md-none mb-3">
              <div className="btn-group w-100" role="group">
                <button 
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
                </button>
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

            {/* Category Tabs - Desktop */}
            <div className="d-none d-md-block mb-4">
              <div className="d-inline-flex bg-light rounded p-1">
                <button 
                  className={`btn ${activeCategory === 'food' ? 'bg-white text-warning shadow-sm' : 'text-muted'}`}
                  onClick={() => setActiveCategory('food')}
                >
                  <RiRestaurantLine className="me-2" />
                  Food
                </button>
                <button 
                  className={`btn ${activeCategory === 'drinks' ? 'bg-white text-warning shadow-sm' : 'text-muted'}`}
                  onClick={() => setActiveCategory('drinks')}
                >
                  <RiCupLine className="me-2" />
                  Drinks
                </button>
                <button 
                  className={`btn ${activeCategory === 'games' ? 'bg-white text-warning shadow-sm' : 'text-muted'}`}
                  onClick={() => setActiveCategory('games')}
                >
                  <RiGamepadLine className="me-2" />
                  Games
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

            {/* Menu Items Grid */}
            <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-3 g-md-4 mb-4">
              {menuItems[activeCategory].map(item => (
                <div key={item.id} className="col">
                  <div className="card  h-100">
                    <img 
                      src={item.image} 
                      className="card-img-top" 
                      alt={item.name} 
                      style={{ height: '120px', objectFit: 'cover' }} 
                    />
                    <div className="card-body p-3">
                      <h5 className="card-title h6 mb-1">{item.name}</h5>
                      <p className="card-text text-muted small mb-2">{item.description}</p>
                      <div className="d-flex justify-content-between align-items-center">
                        <span className="fw-bold" style={{ color: '#1F2937' }}>${item.price.toFixed(2)}</span>
                        <div className="d-flex align-items-center gap-1 gap-md-2">
                          <button 
                            className="btn btn-sm btn-light rounded-circle p-0 d-flex align-items-center justify-content-center" 
                            style={{ width: '28px', height: '28px' }}
                            onClick={() => handleQuantityChange(item, 'decrease')}
                          >
                            <RiSubtractLine size={12} />
                          </button>
                          <span className="fw-medium" style={{ width: '24px', textAlign: 'center', fontSize: '0.9rem' }}>
                            {cart.get(item.id)?.quantity || 0}
                          </span>
                          <button 
                            className="btn btn-sm btn-dark rounded-circle p-0 d-flex align-items-center justify-content-center" 
                            style={{ width: '28px', height: '28px' }}
                            onClick={() => handleQuantityChange(item, 'increase')}
                          >
                            <RiAddLine size={12} />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Table Assignment Section */}
            <div className="mt-4">
              <h2 className="h5 fw-semibold mb-3">Assign to Table</h2>
              <div className="table-responsive">
                <table className="table table-sm table-hover">
                  <thead className="table-light">
                    <tr>
                      <th>Table Name</th>
                      <th>Status</th>
                      <th className="d-none d-md-table-cell">Details</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {tables.map(table => (
                      <tr 
                        key={table.id} 
                        className={`${selectedTable === table.id ? 'table-active' : ''} ${table.status === 'reserved' ? 'text-muted' : 'cursor-pointer'}`}
                        onClick={() => table.status !== 'reserved' && setSelectedTable(table.id)}
                      >
                        <td>
                          <div className="d-flex align-items-center">
                            <span className={`d-inline-block rounded-circle bg-${table.color} me-2`} style={{ width: '10px', height: '10px' }}></span>
                            <span className={`fw-medium ${table.status === 'reserved' ? 'text-muted' : 'text-dark'}`}>
                              {table.name.split(' ')[0]} {table.name.split(' ')[1].charAt(0)}{table.name.split(' ')[1].slice(1).match(/\d+/)?.[0] || ''}
                            </span>
                          </div>
                        </td>
                        <td>
                          <span className={`badge rounded-pill ${getStatusBadgeClass(table.status)}`}>
                            {table.status.charAt(0).toUpperCase() + table.status.slice(1).substring(0, 3)}
                          </span>
                        </td>
                        <td className="small text-muted d-none d-md-table-cell">{table.details}</td>
                        <td>
                          {table.status !== 'reserved' ? (
                            <button 
                              className="btn btn-link p-0 text-decoration-none"
                              style={{ color: '#FFC107', fontSize: '0.8rem' }}
                              onClick={(e) => {
                                e.stopPropagation();
                                setSelectedTable(table.id);
                              }}
                            >
                              Select
                            </button>
                          ) : (
                            <button className="btn btn-link p-0 text-decoration-none text-muted" disabled style={{ fontSize: '0.8rem' }}>
                              Select
                            </button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
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
          <div className="d-none d-md-flex flex-column border-start bg-white" style={{ width: '320px' }}>
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

                    <div className="mb-4">
                      <label className="form-label">Select Table</label>
                      <select 
                        className="form-select"
                        value={tableNumber}
                        onChange={(e) => setTableNumber(e.target.value)}
                      >
                        <optgroup label="Restaurant Tables">
                          <option value="">Select a table</option>
                          <option value="restaurant-1">Restaurant T1</option>
                          <option value="restaurant-2">Restaurant T2</option>
                          <option value="restaurant-3">Restaurant T3</option>
                        </optgroup>
                        <optgroup label="Game Tables">
                          <option value="pool-1">Pool Table 1</option>
                          <option value="pool-2">Pool Table 2</option>
                          <option value="snooker-1">Snooker 1</option>
                        </optgroup>
                        <optgroup label="Gaming Stations">
                          <option value="ps-1">PlayStation 1</option>
                          <option value="ps-2">PlayStation 2</option>
                        </optgroup>
                      </select>
                    </div>
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