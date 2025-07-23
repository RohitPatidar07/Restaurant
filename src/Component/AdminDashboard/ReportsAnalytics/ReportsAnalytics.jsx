import React, { useEffect } from 'react';
import * as echarts from 'echarts';
import { Form, Row, Col } from "react-bootstrap";
import { FaDollarSign, FaUtensils, FaTable, FaTags } from "react-icons/fa";
import { FaUsers, FaClock, FaFire } from "react-icons/fa";

const ReportsAnalytics = () => {

  const kpis = [
    {
      title: "Total Sessions",
      value: "1,247",
      trend: "↑ 12.5% vs yesterday",
      trendColor: "text-success",
      icon: <FaUsers />,
      bg: "bg-primary-subtle",
      iconColor: "text-primary",
    },
    {
      title: "Average Duration",
      value: "2.4h",
      trend: "↑ 8.2% increase",
      trendColor: "text-success",
      icon: <FaClock />,
      bg: "bg-success-subtle",
      iconColor: "text-success",
    },
    {
      title: "Peak Usage",
      value: "8:00 PM",
      trend: "↓ 30min earlier",
      trendColor: "text-danger",
      icon: <FaFire />,
      bg: "bg-warning-subtle",
      iconColor: "text-warning",
    },
  ];

  const cards = [
    {
      title: "Total Revenue",
      value: "$12,847",
      icon: <FaDollarSign />,
      bg: "bg-success-subtle",
      iconColor: "text-success",
    },
    {
      title: "Table Revenue",
      value: "$8,420",
      icon: <FaTable />,
      bg: "bg-primary-subtle",
      iconColor: "text-primary",
    },
    {
      title: "Order Revenue",
      value: "$4,127",
      icon: <FaUtensils />,
      bg: "bg-warning-subtle",
      iconColor: "text-warning",
    },
    {
      title: "Discounts Applied",
      value: "$300",
      icon: <FaTags />,
      bg: "bg-danger-subtle",
      iconColor: "text-danger",
    },
  ];


  useEffect(() => {
    // Initialize charts when component mounts
    initRevenueCategoryChart();
    initRevenueShareChart();
    initRevenueTimelineChart();

    // Cleanup function to dispose charts when component unmounts
    return () => {
      echarts.dispose(document.getElementById('revenue-category-chart'));
      echarts.dispose(document.getElementById('revenue-share-chart'));
      echarts.dispose(document.getElementById('revenue-timeline-chart'));
    };
  }, []);

  const initRevenueCategoryChart = () => {
    const chart = echarts.init(document.getElementById('revenue-category-chart'));
    chart.setOption({
      animation: false,
      grid: { top: 20, right: 20, bottom: 40, left: 60 },
      xAxis: {
        type: 'category',
        data: ['Fixed', 'Dollar', 'Genes', 'Others'],
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
        data: [4000, 3000, 2000, 1000],
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
        data: [2000, 3000, 2500, 4000, 3500, 4500, 3847],
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

  return (
    <div className="">
      {/* Main Content */}
      <div className="flex-grow-1 d-flex flex-column overflow-hidden">
        {/* Content Area */}
        <main className="flex-grow-1 overflow-auto p-4">
          <h1 className="h3 mb-4 font-weight-bold">Reports & Analytics</h1>

          {/* KPI Cards */}
          <div className="row g-4 mb-3">
            {kpis.map((item, idx) => (
              <div key={idx} className="col-md-4">
                <div className="card p-4 rounded shadow-sm bg-white h-100 border-0">
                  <div className="d-flex justify-content-between align-items-start">
                    <div>
                      <p className="small text-muted mb-1">{item.title}</p>
                      <h4 className="fw-bold mb-1">{item.value}</h4>
                      <div className={`small fw-medium ${item.trendColor}`}>
                        {item.trend}
                      </div>
                    </div>
                    <div
                      className={`rounded-circle d-flex align-items-center justify-content-center ${item.bg}`}
                      style={{ width: "36px", height: "36px" }}
                    >
                      <span className={`${item.iconColor} fs-5`}>{item.icon}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Revenue Summary */}
          <div className="row g-4 mb-3">
            {cards.map((card, index) => (
              <div key={index} className="col-md-3">
                <div className="card shadow-sm border-0 rounded-4 h-100">
                  <div className="card-body d-flex justify-content-between align-items-center">
                    <div>
                      <p className="mb-1 text-muted small">{card.title}</p>
                      <h5 className="fw-bold mb-0">{card.value}</h5>
                    </div>
                    <div
                      className={`rounded-circle d-flex align-items-center justify-content-center ${card.bg}`}
                      style={{ width: "36px", height: "36px" }}
                    >
                      <span className={`${card.iconColor} fs-5`}>{card.icon}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="p-3 bg-white rounded shadow-sm d-flex flex-wrap align-items-center gap-3 mb-3">
            <Row className="w-100">
              <Col md={4} sm={12}>
                <Form.Label className="fw-semibold">Date Range:</Form.Label>
                <Form.Select>
                  <option>Last 7 days</option>
                  <option>Last 30 days</option>
                  <option>This Month</option>
                  <option>Custom Range</option>
                </Form.Select>
              </Col>

              <Col md={4} sm={12}>
                <Form.Label className="fw-semibold">Table Type:</Form.Label>
                <Form.Select>
                  <option>All Tables</option>
                  <option>Active Tables</option>
                  <option>Archived Tables</option>
                </Form.Select>
              </Col>

              <Col md={4} sm={12}>
                <Form.Label className="fw-semibold">Category:</Form.Label>
                <Form.Select>
                  <option>All Categories</option>
                  <option>Billing</option>
                  <option>Orders</option>
                  <option>Support</option>
                </Form.Select>
              </Col>
            </Row>
          </div>

          {/* Charts */}
          <div className="row mb-4">
            <div className="col-md-6 mb-3">
              <div className="bg-white p-4 rounded shadow-sm border h-100">
                <h3 className="h5 font-weight-semibold mb-3">Revenue by Category</h3>
                <div id="revenue-category-chart" style={{ height: '300px' }}></div>
              </div>
            </div>

            <div className="col-md-6 mb-3">
              <div className="bg-white p-4 rounded shadow-sm border h-100">
                <h3 className="h5 font-weight-semibold mb-3">Revenue Share</h3>
                <div id="revenue-share-chart" style={{ height: '300px' }}></div>
              </div>
            </div>
          </div>

          <div className="row mb-4">
            <div className="col-md-12">
              <div className="bg-white p-4 rounded shadow-sm border h-100">
                <h3 className="h5 font-weight-semibold mb-3">Revenue Timeline</h3>
                <div id="revenue-timeline-chart" style={{ height: '300px' }}></div>
              </div>
            </div>
          </div>

          {/* Revenue Details Table */}
          <div className="bg-white rounded shadow-sm border">
            <div className="p-3 border-bottom">
              <h3 className="h5 font-weight-semibold mb-0">Revenue Details</h3>
            </div>

            <div className="table-responsive">
              <table className="table mb-0">
                <thead className="bg-light">
                  <tr>
                    <th className="small text-uppercase text-muted">Order ID</th>
                    <th className="small text-uppercase text-muted">Title</th>
                    <th className="small text-uppercase text-muted">Category</th>
                    <th className="small text-uppercase text-muted">Items</th>
                    <th className="small text-uppercase text-muted">Amount</th>
                    <th className="small text-uppercase text-muted">Discount</th>
                    <th className="small text-uppercase text-muted">Total</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="font-weight-bold">ROBO01</td>
                    <td>Snooker Table 1</td>
                    <td>Food & Drinks</td>
                    <td>2 Burgers, 2 Cokes</td>
                    <td>$24.50</td>
                    <td>$2.50</td>
                    <td className="font-weight-bold">$22.00</td>
                  </tr>
                  <tr>
                    <td className="font-weight-bold">ROBO02</td>
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
        </main>
      </div>
    </div>
  );
};

export default ReportsAnalytics;