import React, { useEffect } from 'react';
import * as echarts from 'echarts';

const ReportsAnalytics = () => {
  useEffect(() => {
    // Initialize all charts when component mounts
    initSessionTrendsChart();
    initTableUsageChart();
    initRevenueCategoryChart();
    initRevenueShareChart();
    initRevenueTimelineChart();
    initKOTVolumeChart();
    initErrorPercentageChart();
  }, []);

  const initSessionTrendsChart = () => {
    const chart = echarts.init(document.getElementById('session-trends-chart'));
    chart.setOption({
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
      }],
      tooltip: {
        trigger: 'axis',
        backgroundColor: 'rgba(255, 255, 255, 0.95)',
        borderColor: '#e5e7eb',
        textStyle: { color: '#1f2937' }
      }
    });
  };

  const initTableUsageChart = () => {
    const chart = echarts.init(document.getElementById('table-usage-chart'));
    chart.setOption({
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
      }],
      tooltip: {
        trigger: 'axis',
        backgroundColor: 'rgba(255, 255, 255, 0.95)',
        borderColor: '#e5e7eb',
        textStyle: { color: '#1f2937' }
      }
    });
  };

  const initRevenueCategoryChart = () => {
    const chart = echarts.init(document.getElementById('revenue-category-chart'));
    chart.setOption({
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
      ],
      tooltip: {
        trigger: 'axis',
        backgroundColor: 'rgba(255, 255, 255, 0.95)',
        borderColor: '#e5e7eb',
        textStyle: { color: '#1f2937' }
      }
    });
  };

  const initRevenueShareChart = () => {
    const chart = echarts.init(document.getElementById('revenue-share-chart'));
    chart.setOption({
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
        label: { show: false },
        emphasis: { itemStyle: { shadowBlur: 10, shadowOffsetX: 0, shadowColor: 'rgba(0, 0, 0, 0.5)' } }
      }],
      tooltip: {
        trigger: 'item',
        backgroundColor: 'rgba(255, 255, 255, 0.95)',
        borderColor: '#e5e7eb',
        textStyle: { color: '#1f2937' }
      }
    });
  };

  const initRevenueTimelineChart = () => {
    const chart = echarts.init(document.getElementById('revenue-timeline-chart'));
    chart.setOption({
      animation: false,
      grid: { top: 20, right: 20, bottom: 40, left: 60 },
      xAxis: {
        type: 'category',
        data: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
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
        data: [2800, 3200, 3100, 3747],
        type: 'line',
        smooth: true,
        lineStyle: { color: 'rgba(251, 191, 114, 1)', width: 3 },
        itemStyle: { color: 'rgba(251, 191, 114, 1)' },
        areaStyle: {
          color: {
            type: 'linear',
            x: 0, y: 0, x2: 0, y2: 1,
            colorStops: [
              { offset: 0, color: 'rgba(251, 191, 114, 0.1)' },
              { offset: 1, color: 'rgba(251, 191, 114, 0.01)' }
            ]
          }
        },
        showSymbol: false
      }],
      tooltip: {
        trigger: 'axis',
        backgroundColor: 'rgba(255, 255, 255, 0.95)',
        borderColor: '#e5e7eb',
        textStyle: { color: '#1f2937' }
      }
    });
  };

  const initKOTVolumeChart = () => {
    const chart = echarts.init(document.getElementById('kot-volume-chart'));
    chart.setOption({
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
      }],
      tooltip: {
        trigger: 'axis',
        backgroundColor: 'rgba(255, 255, 255, 0.95)',
        borderColor: '#e5e7eb',
        textStyle: { color: '#1f2937' }
      }
    });
  };

  const initErrorPercentageChart = () => {
    const chart = echarts.init(document.getElementById('error-percentage-chart'));
    chart.setOption({
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
    });
  };

  const showSection = (sectionId) => {
    // Hide all sections
    document.querySelectorAll('.section-content').forEach(section => {
      section.classList.add('d-none');
    });
    
    // Show selected section
    document.getElementById(sectionId).classList.remove('d-none');
  };

  return (
    <div className="d-flex vh-100 bg-light">
      {/* Sidebar */}
    

      {/* Main Content */}
      <div className="flex-grow-1 d-flex flex-column overflow-hidden">
        {/* Header */}
       

        {/* Content Area */}
        <main className="flex-grow-1 overflow-auto p-4">
          {/* Daily Sessions Section */}
          <div id="daily-sessions" className="section-content">
            {/* KPI Cards */}
            <div className="row mb-4">
              <div className="col-md-4 mb-3">
                <div className="kpi-card p-4 rounded shadow-sm h-100">
                  <div className="d-flex justify-content-between">
                    <div>
                      <p className="small text-muted mb-1">Total Sessions</p>
                      <p className="h3 font-weight-bold">1,247</p>
                      <div className="d-flex align-items-center mt-2">
                        <i className="ri-arrow-up-line text-success mr-1"></i>
                        <span className="small text-success">12.5% vs yesterday</span>
                      </div>
                    </div>
                    <div className="bg-primary-light rounded d-flex align-items-center justify-content-center" style={{width: '48px', height: '48px'}}>
                      <i className="ri-group-line text-primary"></i>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="col-md-4 mb-3">
                <div className="kpi-card p-4 rounded shadow-sm h-100">
                  <div className="d-flex justify-content-between">
                    <div>
                      <p className="small text-muted mb-1">Average Duration</p>
                      <p className="h3 font-weight-bold">2.4h</p>
                      <div className="d-flex align-items-center mt-2">
                        <i className="ri-arrow-up-line text-success mr-1"></i>
                        <span className="small text-success">8.2% increase</span>
                      </div>
                    </div>
                    <div className="bg-success-light rounded d-flex align-items-center justify-content-center" style={{width: '48px', height: '48px'}}>
                      <i className="ri-time-line text-success"></i>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="col-md-4 mb-3">
                <div className="kpi-card p-4 rounded shadow-sm h-100">
                  <div className="d-flex justify-content-between">
                    <div>
                      <p className="small text-muted mb-1">Peak Usage</p>
                      <p className="h3 font-weight-bold">8:00 PM</p>
                      <div className="d-flex align-items-center mt-2">
                        <i className="ri-arrow-down-line text-danger mr-1"></i>
                        <span className="small text-danger">30min earlier</span>
                      </div>
                    </div>
                    <div className="bg-warning-light rounded d-flex align-items-center justify-content-center" style={{width: '48px', height: '48px'}}>
                      <i className="ri-fire-line text-warning"></i>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Charts */}
            <div className="row mb-4">
              <div className="col-md-6 mb-3">
                <div className="bg-white p-4 rounded shadow-sm border h-100">
                  <h3 className="h5 font-weight-semibold mb-3">Session Trends</h3>
                  <div id="session-trends-chart" style={{height: '300px'}}></div>
                </div>
              </div>
              
              <div className="col-md-6 mb-3">
                <div className="bg-white p-4 rounded shadow-sm border h-100">
                  <h3 className="h5 font-weight-semibold mb-3">Table Usage by Type</h3>
                  <div id="table-usage-chart" style={{height: '300px'}}></div>
                </div>
              </div>
            </div>
            
            {/* Sessions Table */}
            <div className="bg-white rounded shadow-sm border">
              <div className="p-3 border-bottom">
                <div className="d-flex justify-content-between align-items-center">
                  <h3 className="h5 font-weight-semibold mb-0">Session Details</h3>
                  <div>
                    <button className="btn btn-warning btn-sm mr-2">
                      Export CSV
                    </button>
                    <button className="btn btn-light btn-sm">
                      Export PDF
                    </button>
                  </div>
                </div>
              </div>
              
              <div className="table-responsive">
                <table className="table">
                  <thead className="bg-light">
                    <tr>
                      <th className="small text-uppercase text-muted">Session ID</th>
                      <th className="small text-uppercase text-muted">Table Type</th>
                      <th className="small text-uppercase text-muted">Start Time</th>
                      <th className="small text-uppercase text-muted">End Time</th>
                      <th className="small text-uppercase text-muted">Duration</th>
                      <th className="small text-uppercase text-muted">Revenue</th>
                      <th className="small text-uppercase text-muted">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="font-weight-bold">#SES001</td>
                      <td>Snooker Table 1</td>
                      <td>14:30</td>
                      <td>17:15</td>
                      <td>2h 45m</td>
                      <td className="font-weight-bold">$45.00</td>
                      <td>
                        <span className="badge badge-success">Completed</span>
                      </td>
                    </tr>
                    <tr>
                      <td className="font-weight-bold">#SES002</td>
                      <td>PlayStation 3</td>
                      <td>15:00</td>
                      <td>-</td>
                      <td>1h 23m</td>
                      <td className="font-weight-bold">$28.50</td>
                      <td>
                        <span className="badge badge-primary">Active</span>
                      </td>
                    </tr>
                    <tr>
                      <td className="font-weight-bold">#SES003</td>
                      <td>Pool Table 2</td>
                      <td>16:20</td>
                      <td>18:45</td>
                      <td>2h 25m</td>
                      <td className="font-weight-bold">$38.75</td>
                      <td>
                        <span className="badge badge-success">Completed</span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Revenue Section */}
          <div id="revenue" className="section-content d-none">
            {/* Revenue KPI Cards */}
            <div className="row mb-4">
              <div className="col-md-3 mb-3">
                <div className="kpi-card p-4 rounded shadow-sm h-100">
                  <div className="d-flex justify-content-between">
                    <div>
                      <p className="small text-muted mb-1">Total Revenue</p>
                      <p className="h4 font-weight-bold">$12,847</p>
                    </div>
                    <div className="bg-success-light rounded d-flex align-items-center justify-content-center" style={{width: '40px', height: '40px'}}>
                      <i className="ri-money-dollar-circle-line text-success"></i>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="col-md-3 mb-3">
                <div className="kpi-card p-4 rounded shadow-sm h-100">
                  <div className="d-flex justify-content-between">
                    <div>
                      <p className="small text-muted mb-1">Table Revenue</p>
                      <p className="h4 font-weight-bold">$8,420</p>
                    </div>
                    <div className="bg-primary-light rounded d-flex align-items-center justify-content-center" style={{width: '40px', height: '40px'}}>
                      <i className="ri-table-line text-primary"></i>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="col-md-3 mb-3">
                <div className="kpi-card p-4 rounded shadow-sm h-100">
                  <div className="d-flex justify-content-between">
                    <div>
                      <p className="small text-muted mb-1">Order Revenue</p>
                      <p className="h4 font-weight-bold">$4,127</p>
                    </div>
                    <div className="bg-warning-light rounded d-flex align-items-center justify-content-center" style={{width: '40px', height: '40px'}}>
                      <i className="ri-restaurant-line text-warning"></i>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="col-md-3 mb-3">
                <div className="kpi-card p-4 rounded shadow-sm h-100">
                  <div className="d-flex justify-content-between">
                    <div>
                      <p className="small text-muted mb-1">Discounts Applied</p>
                      <p className="h4 font-weight-bold">$300</p>
                    </div>
                    <div className="bg-danger-light rounded d-flex align-items-center justify-content-center" style={{width: '40px', height: '40px'}}>
                      <i className="ri-discount-percent-line text-danger"></i>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Revenue Filters */}
            <div className="bg-white p-3 rounded shadow-sm border mb-4">
              <div className="d-flex flex-wrap">
                <div className="d-flex align-items-center mr-3 mb-2">
                  <label className="small font-weight-medium mr-2">Date Range:</label>
                  <select className="form-control form-control-sm">
                    <option>Last 7 days</option>
                    <option>Last 30 days</option>
                    <option>This month</option>
                  </select>
                </div>
                
                <div className="d-flex align-items-center mr-3 mb-2">
                  <label className="small font-weight-medium mr-2">Table Type:</label>
                  <select className="form-control form-control-sm">
                    <option>All Tables</option>
                    <option>Snooker</option>
                    <option>Pool</option>
                    <option>PlayStation</option>
                  </select>
                </div>
                
                <div className="d-flex align-items-center mb-2">
                  <label className="small font-weight-medium mr-2">Category:</label>
                  <select className="form-control form-control-sm">
                    <option>All Categories</option>
                    <option>Food</option>
                    <option>Drinks</option>
                    <option>Games</option>
                  </select>
                </div>
              </div>
            </div>
            
            {/* Revenue Charts */}
            <div className="row mb-4">
              <div className="col-md-4 mb-3">
                <div className="bg-white p-4 rounded shadow-sm border h-100">
                  <h3 className="h5 font-weight-semibold mb-3">Revenue by Category</h3>
                  <div id="revenue-category-chart" style={{height: '300px'}}></div>
                </div>
              </div>
              
              <div className="col-md-4 mb-3">
                <div className="bg-white p-4 rounded shadow-sm border h-100">
                  <h3 className="h5 font-weight-semibold mb-3">Revenue Share</h3>
                  <div id="revenue-share-chart" style={{height: '300px'}}></div>
                </div>
              </div>
              
              <div className="col-md-4 mb-3">
                <div className="bg-white p-4 rounded shadow-sm border h-100">
                  <h3 className="h5 font-weight-semibold mb-3">Revenue Timeline</h3>
                  <div id="revenue-timeline-chart" style={{height: '300px'}}></div>
                </div>
              </div>
            </div>

            {/* Revenue Details Table */}
            <div className="bg-white rounded shadow-sm border">
              <div className="p-3 border-bottom">
                <h3 className="h5 font-weight-semibold mb-0">Revenue Details</h3>
              </div>
              
              <div className="table-responsive">
                <table className="table">
                  <thead className="bg-light">
                    <tr>
                      <th className="small text-uppercase text-muted">Order ID</th>
                      <th className="small text-uppercase text-muted">Table</th>
                      <th className="small text-uppercase text-muted">Category</th>
                      <th className="small text-uppercase text-muted">Items</th>
                      <th className="small text-uppercase text-muted">Amount</th>
                      <th className="small text-uppercase text-muted">Discount</th>
                      <th className="small text-uppercase text-muted">Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="font-weight-bold">#ORD001</td>
                      <td>Snooker Table 1</td>
                      <td>Food & Drinks</td>
                      <td>2 Burgers, 2 Cokes</td>
                      <td>$24.50</td>
                      <td>$2.50</td>
                      <td className="font-weight-bold">$22.00</td>
                    </tr>
                    <tr>
                      <td className="font-weight-bold">#ORD002</td>
                      <td>PlayStation 3</td>
                      <td>Game Time</td>
                      <td>2 Hours Gaming</td>
                      <td>$30.00</td>
                      <td>$0.00</td>
                      <td className="font-weight-bold">$30.00</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* KOT Logs Section */}
          <div id="kot-logs" className="section-content d-none">
            <div className="row">
              {/* KOT List */}
              <div className="col-md-8 mb-3">
                <div className="bg-white rounded shadow-sm border h-100">
                  <div className="p-3 border-bottom">
                    <div className="d-flex justify-content-between align-items-center">
                      <h3 className="h5 font-weight-semibold mb-0">KOT Real-time Feed</h3>
                      <div className="d-flex">
                        <select className="form-control form-control-sm mr-2">
                          <option>All Printers</option>
                          <option>Kitchen</option>
                          <option>Bar</option>
                        </select>
                        <select className="form-control form-control-sm">
                          <option>All Status</option>
                          <option>Printed</option>
                          <option>Queued</option>
                          <option>Error</option>
                        </select>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-3" style={{maxHeight: '384px', overflowY: 'auto'}}>
                    <div className="d-flex justify-content-between align-items-center p-3 bg-light rounded mb-2">
                      <div className="d-flex align-items-center">
                        <div className="status-printed rounded-circle mr-3" style={{width: '12px', height: '12px'}}></div>
                        <div>
                          <p className="font-weight-medium mb-0">#KOT001</p>
                          <p className="small text-muted">Table 5 • Kitchen • 14:32</p>
                        </div>
                      </div>
                      <span className="badge badge-success">Printed</span>
                    </div>
                    
                    <div className="d-flex justify-content-between align-items-center p-3 bg-light rounded mb-2">
                      <div className="d-flex align-items-center">
                        <div className="status-queued rounded-circle mr-3" style={{width: '12px', height: '12px'}}></div>
                        <div>
                          <p className="font-weight-medium mb-0">#KOT002</p>
                          <p className="small text-muted">Table 2 • Bar • 14:35</p>
                        </div>
                      </div>
                      <span className="badge badge-warning">Queued</span>
                    </div>
                    
                    <div className="d-flex justify-content-between align-items-center p-3 bg-danger-light rounded mb-2 border border-danger">
                      <div className="d-flex align-items-center">
                        <div className="status-error rounded-circle mr-3" style={{width: '12px', height: '12px'}}></div>
                        <div>
                          <p className="font-weight-medium mb-0">#KOT003</p>
                          <p className="small text-muted">Table 8 • Kitchen • 14:38</p>
                        </div>
                      </div>
                      <span className="badge badge-danger">Error</span>
                    </div>
                    
                    <div className="d-flex justify-content-between align-items-center p-3 bg-light rounded">
                      <div className="d-flex align-items-center">
                        <div className="status-printed rounded-circle mr-3" style={{width: '12px', height: '12px'}}></div>
                        <div>
                          <p className="font-weight-medium mb-0">#KOT004</p>
                          <p className="small text-muted">Table 1 • Bar • 14:40</p>
                        </div>
                      </div>
                      <span className="badge badge-success">Printed</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Error Panel */}
              <div className="col-md-4 mb-3">
                <div className="bg-white rounded shadow-sm border h-100">
                  <div className="p-3 border-bottom border-danger">
                    <h3 className="h5 font-weight-semibold text-danger mb-0">Active Errors</h3>
                  </div>
                  
                  <div className="p-3">
                    <div className="p-3 bg-danger-light rounded border border-danger mb-3">
                      <div className="mb-2">
                        <p className="font-weight-medium mb-0">#KOT003</p>
                        <p className="small text-muted">Kitchen Printer Offline</p>
                        <p className="small text-muted mt-1">14:38 - 2 min ago</p>
                      </div>
                      <div className="d-flex">
                        <button className="btn btn-warning btn-sm mr-2">
                          Retry
                        </button>
                        <button className="btn btn-light btn-sm">
                          Mark Resolved
                        </button>
                      </div>
                    </div>
                    
                    <div className="p-3 bg-warning-light rounded border border-warning">
                      <div className="mb-2">
                        <p className="font-weight-medium mb-0">#KOT007</p>
                        <p className="small text-muted">Paper Jam - Bar Printer</p>
                        <p className="small text-muted mt-1">14:42 - Just now</p>
                      </div>
                      <div className="d-flex">
                        <button className="btn btn-warning btn-sm mr-2">
                          Retry
                        </button>
                        <button className="btn btn-light btn-sm">
                          Mark Resolved
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* KOT Charts */}
            <div className="row mt-3">
              <div className="col-md-6 mb-3">
                <div className="bg-white p-4 rounded shadow-sm border h-100">
                  <h3 className="h5 font-weight-semibold mb-3">KOT Volume by Hour</h3>
                  <div id="kot-volume-chart" style={{height: '300px'}}></div>
                </div>
              </div>
              
              <div className="col-md-6 mb-3">
                <div className="bg-white p-4 rounded shadow-sm border h-100">
                  <h3 className="h5 font-weight-semibold mb-3">Error Percentage</h3>
                  <div id="error-percentage-chart" style={{height: '300px'}}></div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default ReportsAnalytics;