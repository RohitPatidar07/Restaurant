import React, { useState, useEffect } from 'react';
import './OrderManagement.css';
import TableManagement from './TableManagement';

const OrdersManagement = () => {
  // State management
  const [activeTab, setActiveTab] = useState('register');
  const [activeFloor, setActiveFloor] = useState('main');
  const [selectedCategory, setSelectedCategory] = useState('food');
  const [isCustomerModalOpen, setIsCustomerModalOpen] = useState(false);
  const [isNoteModalOpen, setIsNoteModalOpen] = useState(false);
  const [customerInfo, setCustomerInfo] = useState({
    name: '',
    phone: '',
    specialRequests: ''
  });
  const [orderNote, setOrderNote] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [orderType, setOrderType] = useState('dineIn');
  const [selectedTable, setSelectedTable] = useState(null);
  const [orderItems, setOrderItems] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedSides, setSelectedSides] = useState([]);
  const [isSidesModalOpen, setIsSidesModalOpen] = useState(false);

  // Data
  const categories = [
    { id: 'food', name: 'Food', icon: 'fa fa-cutlery' },
    { id: 'drinks', name: 'Drinks', icon: 'fa fa-coffee' },
    { id: 'games', name: 'Games', icon: 'fa fa-gamepad' }
  ];

  const products = {
    food: [
      {
        id: 1,
        name: 'Classic Bacon Burger',
        price: 12.99,
        image: 'https://readdy.ai/api/search-image?query=delicious%20bacon%20cheeseburger%20with%20melted%20cheese%20crispy%20bacon%20lettuce%20tomato%20on%20artisanal%20bun%20clean%20white%20background%20professional%20food%20photography%20high%20quality&width=200&height=200&seq=burger001&orientation=squarish',
        sides: [
          { id: 's1', name: 'Belgian Fresh Fries', price: 3.99 },
          { id: 's2', name: 'Sweet Potato Fries', price: 4.99 },
          { id: 's3', name: 'Grilled Vegetables', price: 4.99 },
          { id: 's4', name: 'Onion Rings', price: 4.49 }
        ]
      },
      {
        id: 2,
        name: 'Gourmet Pizza',
        price: 15.99,
        image: 'https://readdy.ai/api/search-image?query=artisanal%20pizza%20with%20fresh%20mozzarella%20basil%20cherry%20tomatoes%20and%20olive%20oil%20on%20wooden%20board%20clean%20white%20background%20professional%20food%20photography%20high%20quality&width=200&height=200&seq=pizza001&orientation=squarish',
        sides: [
          { id: 's5', name: 'Garden Salad', price: 4.99 },
          { id: 's6', name: 'Garlic Bread', price: 3.99 },
          { id: 's7', name: 'Caesar Side Salad', price: 5.99 }
        ]
      },
      {
        id: 3,
        name: 'Grilled Chicken',
        price: 16.99,
        image: 'https://readdy.ai/api/search-image?query=perfectly%20grilled%20chicken%20breast%20with%20herbs%20and%20spices%20on%20white%20plate%20garnished%20with%20fresh%20herbs%20clean%20white%20background%20professional%20food%20photography%20high%20quality&width=200&height=200&seq=chicken001&orientation=squarish',
        sides: [
          { id: 's8', name: 'Mashed Potatoes', price: 4.99 },
          { id: 's9', name: 'Steamed Broccoli', price: 3.99 },
          { id: 's10', name: 'Rice Pilaf', price: 3.99 }
        ]
      },
      {
        id: 4,
        name: 'Pasta Carbonara',
        price: 14.99,
        image: 'https://readdy.ai/api/search-image?query=creamy%20pasta%20carbonara%20with%20pancetta%20parmesan%20cheese%20and%20black%20pepper%20in%20elegant%20white%20bowl%20clean%20white%20background%20professional%20food%20photography%20high%20quality&width=200&height=200&seq=pasta001&orientation=squarish',
        sides: [
          { id: 's11', name: 'Garlic Bread', price: 3.99 },
          { id: 's12', name: 'Side Salad', price: 4.99 },
          { id: 's13', name: 'Soup of the Day', price: 4.99 }
        ]
      }
    ],
    drinks: [
      { id: 7, name: 'Coca Cola', price: 2.99, image: 'https://readdy.ai/api/search-image?query=refreshing%20cola%20drink%20in%20tall%20glass%20with%20ice%20and%20straw%20clean%20white%20background%20professional%20beverage%20photography%20high%20quality&width=200&height=200&seq=cola001&orientation=squarish' },
      { id: 8, name: 'Fresh Orange Juice', price: 4.99, image: 'https://readdy.ai/api/search-image?query=fresh%20orange%20juice%20in%20clear%20glass%20with%20orange%20slices%20clean%20white%20background%20professional%20beverage%20photography%20high%20quality%20natural%20drink&width=200&height=200&seq=orange001&orientation=squarish' },
      { id: 9, name: 'Iced Coffee', price: 3.99, image: 'https://readdy.ai/api/search-image?query=iced%20coffee%20with%20cream%20in%20tall%20glass%20with%20ice%20cubes%20clean%20white%20background%20professional%20beverage%20photography%20high%20quality%20cafe%20style&width=200&height=200&seq=coffee001&orientation=squarish' },
      { id: 10, name: 'Lemonade', price: 3.49, image: 'https://readdy.ai/api/search-image?query=fresh%20lemonade%20with%20lemon%20slices%20and%20mint%20in%20glass%20pitcher%20clean%20white%20background%20professional%20beverage%20photography%20high%20quality%20summer%20drink&width=200&height=200&seq=lemon001&orientation=squarish' }
    ],
    games: [
      { id: 11, name: 'Pool Table - 1 Hour', price: 25.99, image: 'https://readdy.ai/api/search-image?query=professional%20pool%20billiard%20table%20with%20green%20felt%20balls%20and%20cues%20in%20modern%20gaming%20room%20with%20clean%20white%20background%20high%20quality%20entertainment%20photography&width=200&height=200&seq=pool001&orientation=squarish' },
      { id: 12, name: 'Ping Pong - 1 Hour', price: 15.99, image: 'https://readdy.ai/api/search-image?query=modern%20ping%20pong%20table%20with%20paddles%20and%20balls%20in%20gaming%20area%20with%20clean%20white%20background%20professional%20sports%20equipment%20photography%20high%20quality&width=200&height=200&seq=pingpong001&orientation=squarish' },
      { id: 13, name: 'Foosball - 1 Hour', price: 12.99, image: 'https://readdy.ai/api/search-image?query=professional%20foosball%20table%20with%20players%20and%20balls%20in%20modern%20game%20room%20with%20clean%20white%20background%20high%20quality%20entertainment%20photography&width=200&height=200&seq=foosball001&orientation=squarish' },
      { id: 14, name: 'Darts - 1 Hour', price: 8.99, image: 'https://readdy.ai/api/search-image?query=professional%20dartboard%20with%20darts%20mounted%20on%20wall%20in%20modern%20game%20room%20with%20clean%20white%20background%20high%20quality%20entertainment%20photography&width=200&height=200&seq=darts001&orientation=squarish' }
    ]
  };

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

  // Helper functions
  const getTableStatusColor = (status) => {
    switch (status) {
      case 'occupied': return 'bg-success';
      case 'available': return 'bg-secondary';
      case 'reserved': return 'bg-warning';
      default: return 'bg-secondary';
    }
  };

  const calculateSubtotal = () => {
    return orderItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  };

  const calculateTax = () => {
    return calculateSubtotal() * 0.08;
  };

  const calculateTotal = () => {
    return calculateSubtotal() + calculateTax();
  };

  const addToOrder = (product) => {
    if (product.sides && product.sides.length > 0) {
      setSelectedProduct(product);
      setSelectedSides([]);
      setIsSidesModalOpen(true);
    } else {
      const existingItem = orderItems.find(item => item.id === product.id);
      if (existingItem) {
        setOrderItems(orderItems.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        ));
      } else {
        setOrderItems([...orderItems, { ...product, quantity: 1 }]);
      }
    }
  };

  const handleSideToggle = (side) => {
    setSelectedSides(prevSides => {
      const sideExists = prevSides.find(s => s.id === side.id);
      if (sideExists) {
        return prevSides.filter(s => s.id !== side.id);
      } else {
        return [...prevSides, side];
      }
    });
  };

  const handleAddWithSides = () => {
    const existingItem = orderItems.find(item =>
      item.id === selectedProduct.id &&
      JSON.stringify(item.sides) === JSON.stringify(selectedSides)
    );
    if (existingItem) {
      setOrderItems(orderItems.map(item =>
        item.id === selectedProduct.id && JSON.stringify(item.sides) === JSON.stringify(selectedSides)
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ));
    } else {
      setOrderItems([...orderItems, {
        ...selectedProduct,
        quantity: 1,
        sides: selectedSides,
        price: selectedProduct.price + selectedSides.reduce((sum, side) => sum + side.price, 0)
      }]);
    }
    setIsSidesModalOpen(false);
    setSelectedProduct(null);
    setSelectedSides([]);
  };

  const filteredProducts = products[selectedCategory].filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Add table highlight effect when component mounts
  useEffect(() => {
    const styles = document.createElement('style');
    styles.innerHTML = `
      .table-highlight {
        outline: 3px solid #3B82F6 !important;
        outline-offset: 4px;
        transition: outline-color 0.3s ease;
      }
      @keyframes pulse {
        0% { outline-color: #3B82F6; }
        50% { outline-color: #60A5FA; }
        100% { outline-color: #3B82F6; }
      }
      .animate-pulse {
        animation: pulse 1s infinite;
      }
    `;
    document.head.appendChild(styles);

    // Add click outside listener for course dropdown
    const handleClickOutside = (event) => {
      const dropdown = document.getElementById('courseDropdown');
      const button = document.getElementById('courseButton');
      if (dropdown && button && !button.contains(event.target) && !dropdown.contains(event.target)) {
        dropdown.classList.add('d-none');
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  const [isActionsModalOpen, setIsActionsModalOpen] = useState(false);
  const [quickJumpInput, setQuickJumpInput] = useState('');


  return (
    <div className="p-3">
      <div>
        <h1 className="fs-3 fw-bold text-dark">Order Management</h1>
      </div>
      {/* Top Navigation */}
      <div className="mt-3 mb-3">
        <div className="d-flex">
          {['tables', 'register', 'orders'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`btn ${activeTab === tab ? 'btn-warning' : 'btn-light'} rounded-pill mx-1`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Register Screen */}
      {activeTab === 'register' && (
        <div className="d-flex flex-column flex-md-row bg-white">
          <div className="bg-white border-end border-gray-200 d-flex flex-column" style={{ height: '570px', width: '300px' }}>
            {/* Customer Section */}
            <div className="p-2 border-bottom border-gray-200">
              <div className="d-flex justify-content-between align-items-center mb-2">
                <h3 className="h6 mb-0">Current Order</h3>
                <span className="text-muted small">Table 5</span>
              </div>
              <div className="d-flex gap-2">
                <button
                  onClick={() => setIsCustomerModalOpen(true)}
                  className="btn btn-light flex-grow-1 text-start btn-sm"
                >
                  <i className="fa fa-user me-2"></i>Customer
                </button>
                <button
                  onClick={() => setIsNoteModalOpen(true)}
                  className="btn btn-light flex-grow-1 text-start btn-sm"
                >
                  <i className="fa fa-sticky-note me-2"></i>Note
                </button>
              </div>
            </div>

            {/* Middle Section: Scrollable Order Items + Calculator */}
            <div className="flex-grow-1 d-flex flex-column overflow-hidden">
              {/* Order Items */}
              <div className="flex-grow-1 p-2" style={{ maxHeight: '300px', overflowY: 'auto' }}>
                <div className="d-flex flex-column gap-2">
                  {orderItems.map((item) => (
                    <div key={item.id} className="d-flex justify-content-between align-items-center p-2 bg-light rounded">
                      <div className="flex-grow-1">
                        <div className="d-flex justify-content-between align-items-center">
                          <span className="fw-semibold small">{item.name}</span>
                          <div className="d-flex align-items-center gap-2">
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                setOrderItems(orderItems.filter(orderItem => orderItem.id !== item.id));
                              }}
                              className="btn btn-link text-danger p-0"
                            >
                              <i className="fa fa-times small"></i>
                            </button>
                            <span className="text-muted small">${(item.price * item.quantity).toFixed(2)}</span>
                          </div>
                        </div>
                        <div className="d-flex align-items-center mt-1">
                          <span className="text-muted small">Qty: {item.quantity}</span>
                          <span className="text-muted small ms-2">${item.price.toFixed(2)} each</span>
                        </div>
                        {item.sides && item.sides.length > 0 && (
                          <div className="mt-1">
                            {item.sides.map((side) => (
                              <div key={side.id} className="d-flex justify-content-between small text-muted">
                                <span>+ {side.name}</span>
                                <span>${side.price.toFixed(2)}</span>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>


              {/* Calculator + Total */}
              <div className="p-2 border-top border-gray-200">
                {/* Calculator Display */}
                <div className="bg-light p-2 rounded mb-2">
                  <div className="text-end fs-4 font-monospace mb-1">
                    ${calculateTotal().toFixed(2)}
                  </div>
                  <div className="text-end small text-muted">
                    Subtotal: ${calculateSubtotal().toFixed(2)} + Tax: ${calculateTax().toFixed(2)}
                  </div>
                </div>

                {/* Calculator Keypad */}
                <div className="d-grid gap-1 mb-2" style={{ gridTemplateColumns: 'repeat(4, 1fr)' }}>
                  {['7', '8', '9', '÷', '4', '5', '6', '×', '1', '2', '3', '-', 'C', '0', '.', '+'].map((key) => (
                    <button
                      key={key}
                      className={`btn btn-sm fw-bold p-1 ${key === 'C' ? 'btn-danger' : ['÷', '×', '-', '+'].includes(key) ? 'btn-info' : 'btn-light'}`}
                      style={{ height: '30px', fontSize: '12px', lineHeight: '12px' }}
                    >
                      {key}
                    </button>
                  ))}
                </div>

                {/* Total Display */}
                <div className="d-flex justify-content-between border-top border-gray-200 pt-2 mb-2">
                  <span className="fw-semibold small">Total</span>
                  <span className="fw-semibold small">${calculateTotal().toFixed(2)}</span>
                </div>

                {/* Order Type & Course */}
                <div className="d-flex gap-2 mb-2">
                  <button
                    onClick={() => {
                      const types = ['dineIn', 'takeOut', 'delivery'];
                      const currentIndex = types.indexOf(orderType);
                      const nextIndex = (currentIndex + 1) % types.length;
                      setOrderType(types[nextIndex]);
                    }}
                    className={`btn btn-sm flex-grow-1 ${orderType === 'dineIn' ? 'btn-warning' :
                      orderType === 'takeOut' ? 'btn-success' : 'btn-purple'
                      }`}
                  >
                    <i className={`fa ${orderType === 'dineIn' ? 'fa-cutlery' :
                      orderType === 'takeOut' ? 'fa-shopping-bag' : 'fa-motorcycle'
                      } me-2 small`}></i>
                    {orderType === 'dineIn' ? 'Dine In' : orderType === 'takeOut' ? 'Take Out' : 'Delivery'}
                  </button>

                  <div className="dropdown">
                    <button
                      className="btn btn-light btn-sm w-100 d-flex align-items-center justify-content-center"
                      type="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      <span className="small">Course</span>
                      <i className="fa fa-chevron-down ms-2 small"></i>
                    </button>
                    <ul className="dropdown-menu w-100 shadow border">
                      {['Appetizer', 'Main Course', 'Dessert', 'All at Once'].map((course) => (
                        <li key={course}>
                          <button
                            className="dropdown-item small text-muted"
                            onClick={() => console.log(`Selected: ${course}`)}
                          >
                            {course}
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <button
                    onClick={() => setIsActionsModalOpen(true)}
                    className="btn btn-light btn-sm"
                  >
                    <i className="fas fa-ellipsis-vertical small"></i>
                  </button>
                </div>

                {/* Action Buttons */}
                <div className="d-flex gap-2">
                  <button
                    onClick={() => {
                      setActiveTab('tables');
                      setSelectedTable(null);
                      setOrderItems([]);
                    }}
                    className="btn btn-dark btn-sm flex-grow-1"
                  >
                    New
                  </button>
                  <button
                    onClick={() => setOrderItems([])}
                    className="btn btn-danger btn-sm flex-grow-1"
                  >
                    <i className="fa fa-trash me-1 small"></i>Clear
                  </button>
                  <button className="btn btn-warning btn-sm flex-grow-1">
                    <i className="fa fa-credit-card me-1 small"></i>Pay
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Right Panel - Product Selection */}
          <div className="flex-grow-1 d-flex flex-column">
            {/* Search Bar */}
            <div className="p-3 bg-white border-bottom border-gray-200">
              <div className="position-relative">
                {/* Input with padding-left to avoid overlap with icon */}
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="form-control"
                />
              </div>
            </div>

            {/* Category Switcher */}
            <div className="p-3 bg-white border-bottom border-gray-200">
              <div className="d-flex gap-2">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`btn ${selectedCategory === category.id ? 'btn-warning' : 'btn-light'}`}
                  >
                    <i className={`${category.icon} me-2`}></i>
                    {category.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Product Grid */}
            <div className="flex-grow-1 p-3 bg-light overflow-auto">
              <div className="row row-cols-2 row-cols-md-3 row-cols-lg-4 g-3">
                {filteredProducts.map((product) => (
                  <div
                    key={product.id}
                    onClick={() => {
                      setSelectedProduct(product);
                      setIsSidesModalOpen(true);
                    }}
                    className="col"
                  >
                    <div className="card h-100 cursor-pointer hover-shadow">
                      {/* <div className="ratio ratio-1x1">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="card-img-top object-fit-cover"
                        />
                      </div> */}
                      <div className="card-body text-center">
                        <h5 className="card-title mb-1">{product.name}</h5>
                        <p className="h5 text-warning mb-0">${product.price.toFixed(2)}</p>
                        <p className="small text-muted mt-1">
                          <i className="fa fa-plus-circle mr-1"></i>
                          Select options
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tables Screen */}
      {activeTab === 'tables' && (
        <div className="d-flex flex-column flex-md-row h-100">
          <TableManagement />
        </div>
      )}

      {/* Orders Screen */}
      {activeTab === 'orders' && (
        <div className="p-4">
          <div className="card text-center">
            <div className="card-body py-5">
              <i className="fa fa-receipt text-muted fs-1 mb-3"></i>
              <h2 className="h4 card-title mb-2">Orders Management</h2>
              <p className="card-text text-muted">Order management functionality will be implemented here.</p>
            </div>
          </div>
        </div>
      )}

      {/* Modals */}
      {/* Customer Modal */}
      {isCustomerModalOpen && (
        <>
          {/* Modal Backdrop */}
          <div className="modal-backdrop fade show"></div>

          {/* Modal Dialog */}
          <div
            className="modal fade show d-block"
            tabIndex="-1"
            role="dialog"
            aria-labelledby="customerModalLabel"
            aria-modal="true"
          >
            <div className="modal-dialog modal-dialog-centered" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="customerModalLabel">Customer Information</h5>
                  <button
                    type="button"
                    className="btn-close"
                    aria-label="Close"
                    onClick={() => setIsCustomerModalOpen(false)}
                  ></button>
                </div>

                <div className="modal-body">
                  <div className="mb-3">
                    <label htmlFor="customerName" className="form-label">Name</label>
                    <input
                      type="text"
                      className="form-control"
                      id="customerName"
                      value={customerInfo.name}
                      onChange={(e) => setCustomerInfo({ ...customerInfo, name: e.target.value })}
                      placeholder="Enter customer name"
                    />
                  </div>

                  <div className="mb-3">
                    <label htmlFor="customerPhone" className="form-label">Phone Number</label>
                    <input
                      type="tel"
                      className="form-control"
                      id="customerPhone"
                      value={customerInfo.phone}
                      onChange={(e) => setCustomerInfo({ ...customerInfo, phone: e.target.value })}
                      placeholder="Enter phone number"
                    />
                  </div>

                  <div className="mb-3">
                    <label htmlFor="customerRequests" className="form-label">Special Requests</label>
                    <textarea
                      className="form-control"
                      id="customerRequests"
                      rows={3}
                      value={customerInfo.specialRequests}
                      onChange={(e) => setCustomerInfo({ ...customerInfo, specialRequests: e.target.value })}
                      placeholder="Enter any special requests"
                    ></textarea>
                  </div>
                </div>

                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => setIsCustomerModalOpen(false)}
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    className="btn btn-warning"
                    onClick={() => {
                      // Add your save logic here
                      setIsCustomerModalOpen(false);
                    }}
                  >
                    Save
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}


      {/* Note Modal */}
      {isNoteModalOpen && (
        <>
          {/* Modal Backdrop */}
          <div className="modal-backdrop fade show"></div>

          {/* Modal */}
          <div
            className="modal fade show d-block"
            tabIndex="-1"
            role="dialog"
            aria-labelledby="orderNotesModalLabel"
            aria-modal="true"
          >
            <div className="modal-dialog modal-dialog-centered" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="orderNotesModalLabel">Order Notes</h5>
                  <button
                    type="button"
                    className="btn-close"
                    aria-label="Close"
                    onClick={() => setIsNoteModalOpen(false)}
                  ></button>
                </div>

                <div className="modal-body">
                  <div className="mb-3">
                    <label htmlFor="orderNotes" className="form-label">Special Instructions</label>
                    <textarea
                      className="form-control"
                      id="orderNotes"
                      rows={6}
                      value={orderNote}
                      onChange={(e) => setOrderNote(e.target.value)}
                      placeholder="Enter cooking preferences, allergies, or special requests..."
                      maxLength={500}
                    ></textarea>
                    <div className="text-end small text-muted mt-1">
                      {orderNote.length}/500 characters
                    </div>
                  </div>
                </div>

                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => setIsNoteModalOpen(false)}
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    className="btn btn-warning"
                    onClick={() => {
                      // Save logic goes here
                      setIsNoteModalOpen(false);
                    }}
                  >
                    Save
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}


      {/* Sides Selection Modal */}
      {isSidesModalOpen && selectedProduct && (
        <>
          {/* Modal Backdrop */}
          <div className="modal-backdrop fade show"></div>

          {/* Modal Dialog */}
          <div
            className="modal fade show d-block"
            tabIndex="-1"
            role="dialog"
            aria-labelledby="sidesModalLabel"
            aria-modal="true"
          >
            <div className="modal-dialog modal-dialog-centered" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <div>
                    <h5 className="modal-title" id="sidesModalLabel">{selectedProduct.name}</h5>
                    <div className="small text-muted">
                      ${selectedProduct.price.toFixed(2)} (+ VAT: 5% DU)
                    </div>
                  </div>
                  <button
                    type="button"
                    className="btn-close"
                    aria-label="Close"
                    onClick={() => {
                      setIsSidesModalOpen(false);
                      setSelectedProduct(null);
                      setSelectedSides([]);
                    }}
                  ></button>
                </div>

                <div className="modal-body">
                  <h6 className="mb-3">Sides</h6>
                  <div className="row row-cols-2 g-3">
                    {selectedProduct?.sides?.map((side) => (
                      <div key={side.id} className="col">
                        <button
                          type="button"
                          onClick={() => handleSideToggle(side)}
                          className={`btn w-100 p-3 ${selectedSides.find((s) => s.id === side.id)
                            ? 'btn-outline-warning active'
                            : 'btn-outline-secondary'
                            }`}
                        >
                          <div className="d-flex flex-column align-items-center">
                            <span className="fw-bold">{side.name}</span>
                          </div>
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => {
                      setIsSidesModalOpen(false);
                      setSelectedProduct(null);
                      setSelectedSides([]);
                    }}
                  >
                    Discard
                  </button>
                  <button
                    type="button"
                    className="btn btn-warning"
                    onClick={handleAddWithSides}
                  >
                    Add
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Actions Modal */}
      {isActionsModalOpen && (
        <>
          {/* Modal Backdrop */}
          <div className="modal-backdrop fade show"></div>

          <div
            className="modal fade show d-block"
            tabIndex="-1"
            role="dialog"
            aria-labelledby="actionsModalLabel"
            aria-modal="true"
          >
            <div className="modal-dialog modal-lg" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="actionsModalLabel">Actions</h5>
                  <button
                    type="button"
                    className="btn-close"
                    aria-label="Close"
                    onClick={() => setIsActionsModalOpen(false)}
                  ></button>
                </div>

                <div className="modal-body">
                  <div className="row row-cols-3 g-3">
                    {[
                      {
                        icon: 'fa-sticky-note',
                        text: 'Customer Note',
                        onClick: () => setIsNoteModalOpen(true),
                      },
                      {
                        icon: 'fa-file-invoice',
                        text: 'Bill',
                        onClick: () => setActiveTab('orders'),
                      },
                      {
                        icon: 'fa-users',
                        text: 'Guests',
                        onClick: () => setIsCustomerModalOpen(true),
                      },
                      {
                        icon: 'fa-percentage',
                        text: 'Split',
                        onClick: () => {
                          const total = calculateTotal();
                          const splitAmount = (total / 2).toFixed(2);
                          alert(`Split amount per person: $${splitAmount}`);
                        },
                      },
                      {
                        icon: 'fa-exchange-alt',
                        text: 'Transfer / Merge',
                        onClick: () => {
                          const tables = document.querySelectorAll('[id^="table-"]');
                          tables.forEach((table) =>
                            table.classList.add('table-highlight')
                          );
                          setTimeout(() => {
                            tables.forEach((table) =>
                              table.classList.remove('table-highlight')
                            );
                          }, 2000);
                        },
                      },
                      {
                        icon: 'fa-sync',
                        text: 'Transfer course',
                        onClick: () => {
                          const courseDropdown =
                            document.getElementById('courseDropdown');
                          if (courseDropdown) {
                            courseDropdown.classList.remove('d-none');
                          }
                        },
                      },
                      {
                        icon: 'fa-list',
                        text: 'Pricelist',
                        onClick: () => {
                          setSelectedCategory('food');
                          setSearchTerm('');
                        },
                      },
                      {
                        icon: 'fa-undo',
                        text: 'Refund',
                        onClick: () => {
                          const confirmRefund = window.confirm(
                            'Are you sure you want to refund this order?'
                          );
                          if (confirmRefund) {
                            // Refund logic here
                          }
                        },
                      },
                      {
                        icon: 'fa-receipt',
                        text: 'Tax',
                        onClick: () => {
                          const taxAmount = calculateTax();
                          alert(`Tax Amount: $${taxAmount.toFixed(2)}`);
                        },
                      },
                    ].map((action, index) => (
                      <div key={index} className="col">
                        <button
                          onClick={() => {
                            action.onClick();
                            setIsActionsModalOpen(false);
                          }}
                          className="btn btn-light w-100 h-100 d-flex flex-column align-items-center justify-content-center p-3"
                        >
                          <i className={`fa ${action.icon} fs-4 mb-2 text-muted`}></i>
                          <span className="small">{action.text}</span>
                        </button>
                      </div>
                    ))}

                    <div className="col-6">
                      <button
                        onClick={() => setIsActionsModalOpen(false)}
                        className="btn btn-outline-danger w-100 h-100 d-flex flex-column align-items-center justify-content-center p-3"
                      >
                        <i className="fa fa-times-circle fs-4 mb-2"></i>
                        <span className="small">Cancel Order</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}


    </div>
  );
};

export default OrdersManagement;