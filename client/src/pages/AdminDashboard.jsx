import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../api';

// Admin Login Component
const AdminLogin = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await api.post('/admin/login', { username, password });
      if (response.success) {
        localStorage.setItem('adminToken', response.data.token);
        localStorage.setItem('adminUser', JSON.stringify(response.data.admin));
        onLogin(response.data.admin);
      }
    } catch (err) {
      setError(err.message || 'Invalid credentials');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#001e50] to-[#001333] flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-8">
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-[#001e50] rounded-2xl flex items-center justify-center mx-auto mb-4">
            <span className="text-4xl">🔐</span>
          </div>
          <h1 className="text-2xl font-bold text-gray-800">Admin Portal</h1>
          <p className="text-gray-500 mt-2">Volkswagen Group Management</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <div className="bg-red-50 text-red-600 px-4 py-3 rounded-lg text-sm">
              {error}
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Username
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#001e50] focus:border-transparent outline-none transition-all"
              placeholder="Enter username"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#001e50] focus:border-transparent outline-none transition-all"
              placeholder="Enter password"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#001e50] text-white py-3 rounded-xl font-semibold hover:bg-[#002d6b] transition-colors disabled:opacity-50"
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>

        <div className="mt-6 text-center">
          <Link to="/" className="text-[#001e50] hover:underline text-sm">
            ← Back to Website
          </Link>
        </div>

        <div className="mt-6 pt-6 border-t border-gray-200 text-center text-xs text-gray-400">
          <p>Default: admin / admin@123</p>
        </div>
      </div>
    </div>
  );
};

const AdminDashboard = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [adminUser, setAdminUser] = useState(null);
  const [activeTab, setActiveTab] = useState('overview');
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    testDrives: 0,
    serviceBookings: 0,
    partsOrders: 0,
    carReservations: 0,
    totalRevenue: 0
  });
  const [testDrives, setTestDrives] = useState([]);
  const [serviceBookings, setServiceBookings] = useState([]);
  const [orders, setOrders] = useState([]);
  const [reservations, setReservations] = useState([]);

  // Check for existing token on mount
  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    const user = localStorage.getItem('adminUser');
    
    if (token && user) {
      verifyToken(token, JSON.parse(user));
    } else {
      setLoading(false);
    }
  }, []);

  const verifyToken = async (token, user) => {
    try {
      const response = await api.get('/admin/verify', {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (response.success) {
        setIsAuthenticated(true);
        setAdminUser(user);
      } else {
        handleLogout();
      }
    } catch (error) {
      handleLogout();
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = (user) => {
    setIsAuthenticated(true);
    setAdminUser(user);
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminUser');
    setIsAuthenticated(false);
    setAdminUser(null);
  };

  // Get auth headers
  const getAuthHeaders = () => ({
    headers: { Authorization: `Bearer ${localStorage.getItem('adminToken')}` }
  });

  useEffect(() => {
    if (isAuthenticated) {
      fetchDashboardData();
    }
  }, [isAuthenticated]);

  useEffect(() => {
    if (!isAuthenticated) return;
    
    if (activeTab === 'test-drives') fetchTestDrives();
    else if (activeTab === 'service-bookings') fetchServiceBookings();
    else if (activeTab === 'orders') fetchOrders();
    else if (activeTab === 'reservations') fetchReservations();
  }, [activeTab, isAuthenticated]);

  const fetchDashboardData = async () => {
    try {
      const response = await api.get('/admin/dashboard', getAuthHeaders());
      if (response.success) {
        setStats(response.data.stats);
      }
    } catch (error) {
      console.error('Error fetching dashboard:', error);
      if (error.message?.includes('401')) handleLogout();
    }
  };

  const fetchTestDrives = async () => {
    try {
      const response = await api.get('/admin/test-drives', getAuthHeaders());
      if (response.success) {
        setTestDrives(response.data);
      }
    } catch (error) {
      console.error('Error fetching test drives:', error);
    }
  };

  const fetchServiceBookings = async () => {
    try {
      const response = await api.get('/admin/service-bookings', getAuthHeaders());
      if (response.success) {
        setServiceBookings(response.data);
      }
    } catch (error) {
      console.error('Error fetching service bookings:', error);
    }
  };

  const fetchOrders = async () => {
    try {
      const response = await api.get('/admin/orders', getAuthHeaders());
      if (response.success) {
        setOrders(response.data);
      }
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };

  const fetchReservations = async () => {
    try {
      const response = await api.get('/admin/reservations', getAuthHeaders());
      if (response.success) {
        setReservations(response.data);
      }
    } catch (error) {
      console.error('Error fetching reservations:', error);
    }
  };

  const updateTestDriveStatus = async (id, status) => {
    try {
      await api.patch(`/admin/test-drives/${id}`, { status }, getAuthHeaders());
      fetchTestDrives();
      fetchDashboardData();
    } catch (error) {
      console.error('Error updating test drive:', error);
    }
  };

  const updateServiceStatus = async (id, status) => {
    try {
      await api.patch(`/admin/service-bookings/${id}`, { status }, getAuthHeaders());
      fetchServiceBookings();
      fetchDashboardData();
    } catch (error) {
      console.error('Error updating service:', error);
    }
  };

  const updateOrderStatus = async (id, orderStatus) => {
    try {
      await api.patch(`/admin/orders/${id}`, { orderStatus }, getAuthHeaders());
      fetchOrders();
      fetchDashboardData();
    } catch (error) {
      console.error('Error updating order:', error);
    }
  };

  const deleteItem = async (type, id) => {
    if (!confirm('Are you sure you want to delete this item?')) return;
    
    try {
      await api.delete(`/admin/${type}/${id}`, getAuthHeaders());
      if (type === 'test-drives') fetchTestDrives();
      else if (type === 'service-bookings') fetchServiceBookings();
      else if (type === 'orders') fetchOrders();
      else if (type === 'reservations') fetchReservations();
      fetchDashboardData();
    } catch (error) {
      console.error('Error deleting item:', error);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount);
  };

  const getStatusColor = (status) => {
    const colors = {
      pending: 'bg-yellow-100 text-yellow-800',
      confirmed: 'bg-blue-100 text-blue-800',
      completed: 'bg-green-100 text-green-800',
      cancelled: 'bg-red-100 text-red-800',
      scheduled: 'bg-purple-100 text-purple-800',
      'in-progress': 'bg-orange-100 text-orange-800',
      'vehicle-received': 'bg-cyan-100 text-cyan-800',
      placed: 'bg-gray-100 text-gray-800',
      processing: 'bg-indigo-100 text-indigo-800',
      shipped: 'bg-blue-100 text-blue-800',
      delivered: 'bg-green-100 text-green-800'
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  const tabs = [
    { id: 'overview', label: 'Overview', icon: '📊' },
    { id: 'test-drives', label: 'Test Drives', icon: '🚗' },
    { id: 'service-bookings', label: 'Service Bookings', icon: '🔧' },
    { id: 'orders', label: 'Parts Orders', icon: '📦' },
    { id: 'reservations', label: 'Car Reservations', icon: '🏷️' }
  ];

  // Show loading spinner
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-[#001e50]"></div>
      </div>
    );
  }

  // Show login if not authenticated
  if (!isAuthenticated) {
    return <AdminLogin onLogin={handleLogin} />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-[#001e50] text-white py-6 px-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Admin Dashboard</h1>
            <p className="text-blue-200 text-sm mt-1">Welcome, {adminUser?.name || 'Admin'}</p>
          </div>
          <div className="flex items-center gap-4">
            <Link to="/" className="bg-white/10 hover:bg-white/20 px-4 py-2 rounded-lg transition-colors">
              ← Back to Site
            </Link>
            <button 
              onClick={handleLogout}
              className="bg-red-500/80 hover:bg-red-600 px-4 py-2 rounded-lg transition-colors"
            >
              Logout
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Tabs */}
        <div className="flex flex-wrap gap-2 mb-8 bg-white p-2 rounded-xl shadow-sm">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                activeTab === tab.id
                  ? 'bg-[#001e50] text-white shadow-md'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <span className="mr-2">{tab.icon}</span>
              {tab.label}
            </button>
          ))}
        </div>

        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
              <div className="bg-white p-6 rounded-xl shadow-sm border-l-4 border-blue-500">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-500 text-sm">Test Drives</p>
                    <p className="text-3xl font-bold text-gray-800">{stats.testDrives}</p>
                  </div>
                  <div className="text-4xl">🚗</div>
                </div>
              </div>
              
              <div className="bg-white p-6 rounded-xl shadow-sm border-l-4 border-orange-500">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-500 text-sm">Service Bookings</p>
                    <p className="text-3xl font-bold text-gray-800">{stats.serviceBookings}</p>
                  </div>
                  <div className="text-4xl">🔧</div>
                </div>
              </div>
              
              <div className="bg-white p-6 rounded-xl shadow-sm border-l-4 border-green-500">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-500 text-sm">Parts Orders</p>
                    <p className="text-3xl font-bold text-gray-800">{stats.partsOrders}</p>
                  </div>
                  <div className="text-4xl">📦</div>
                </div>
              </div>
              
              <div className="bg-white p-6 rounded-xl shadow-sm border-l-4 border-purple-500">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-500 text-sm">Car Reservations</p>
                    <p className="text-3xl font-bold text-gray-800">{stats.carReservations}</p>
                  </div>
                  <div className="text-4xl">🏷️</div>
                </div>
              </div>
              
              <div className="bg-white p-6 rounded-xl shadow-sm border-l-4 border-[#c9a227]">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-500 text-sm">Total Revenue</p>
                    <p className="text-2xl font-bold text-gray-800">{formatCurrency(stats.totalRevenue)}</p>
                  </div>
                  <div className="text-4xl">💰</div>
                </div>
              </div>
            </div>

            {/* Quick Info */}
            <div className="bg-linear-to-r from-[#001e50] to-[#001333] text-white p-8 rounded-xl">
              <h2 className="text-xl font-bold mb-4">Welcome to Volkswagen Admin Portal</h2>
              <p className="text-blue-200 mb-6">
                Manage all your bookings, orders, and customer data from this centralized dashboard.
                All data is securely stored in MongoDB and updates in real-time.
              </p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                <div className="bg-white/10 p-4 rounded-lg">
                  <p className="text-2xl font-bold">{stats.testDrives}</p>
                  <p className="text-sm text-blue-200">Test Drives</p>
                </div>
                <div className="bg-white/10 p-4 rounded-lg">
                  <p className="text-2xl font-bold">{stats.serviceBookings}</p>
                  <p className="text-sm text-blue-200">Services</p>
                </div>
                <div className="bg-white/10 p-4 rounded-lg">
                  <p className="text-2xl font-bold">{stats.partsOrders}</p>
                  <p className="text-sm text-blue-200">Orders</p>
                </div>
                <div className="bg-white/10 p-4 rounded-lg">
                  <p className="text-2xl font-bold">{stats.carReservations}</p>
                  <p className="text-sm text-blue-200">Reservations</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Test Drives Tab */}
        {activeTab === 'test-drives' && (
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-xl font-bold text-gray-800">Test Drive Bookings</h2>
              <p className="text-gray-500 text-sm">Manage all test drive appointments</p>
            </div>
            
            {testDrives.length === 0 ? (
              <div className="p-12 text-center text-gray-500">
                <div className="text-6xl mb-4">🚗</div>
                <p className="text-lg">No test drive bookings yet</p>
                <p className="text-sm">Test drives will appear here when customers book them</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Booking ID</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Customer</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Car</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date & Time</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Location</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {testDrives.map((td) => (
                      <tr key={td._id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 text-sm font-medium text-[#001e50]">{td.bookingId}</td>
                        <td className="px-6 py-4">
                          <div className="text-sm font-medium text-gray-900">{td.customerName}</div>
                          <div className="text-sm text-gray-500">{td.customerEmail}</div>
                          <div className="text-sm text-gray-500">{td.customerPhone}</div>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-900">{td.carName}</td>
                        <td className="px-6 py-4">
                          <div className="text-sm text-gray-900">{td.preferredDate}</div>
                          <div className="text-sm text-gray-500">{td.preferredTime}</div>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-900">{td.location}</td>
                        <td className="px-6 py-4">
                          <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(td.status)}`}>
                            {td.status}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            <select
                              value={td.status}
                              onChange={(e) => updateTestDriveStatus(td._id, e.target.value)}
                              className="text-sm border border-gray-300 rounded px-2 py-1"
                            >
                              <option value="pending">Pending</option>
                              <option value="confirmed">Confirmed</option>
                              <option value="completed">Completed</option>
                              <option value="cancelled">Cancelled</option>
                            </select>
                            <button
                              onClick={() => deleteItem('test-drives', td._id)}
                              className="text-red-600 hover:text-red-800 text-sm"
                            >
                              🗑️
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* Service Bookings Tab */}
        {activeTab === 'service-bookings' && (
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-xl font-bold text-gray-800">Service Bookings</h2>
              <p className="text-gray-500 text-sm">Manage vehicle service appointments</p>
            </div>
            
            {serviceBookings.length === 0 ? (
              <div className="p-12 text-center text-gray-500">
                <div className="text-6xl mb-4">🔧</div>
                <p className="text-lg">No service bookings yet</p>
                <p className="text-sm">Service bookings will appear here when customers book them</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Booking ID</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Customer</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Vehicle</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Service</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date & Time</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Cost</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {serviceBookings.map((sb) => (
                      <tr key={sb._id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 text-sm font-medium text-[#001e50]">{sb.bookingId}</td>
                        <td className="px-6 py-4">
                          <div className="text-sm font-medium text-gray-900">{sb.customerName}</div>
                          <div className="text-sm text-gray-500">{sb.customerEmail}</div>
                          <div className="text-sm text-gray-500">{sb.customerPhone}</div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm text-gray-900">{sb.carModel} ({sb.carYear})</div>
                          <div className="text-sm text-gray-500">{sb.registrationNumber}</div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm text-gray-900">{sb.serviceType}</div>
                          <div className="text-sm text-gray-500">{sb.serviceCenter}</div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm text-gray-900">{sb.preferredDate}</div>
                          <div className="text-sm text-gray-500">{sb.preferredTime}</div>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-900">
                          {formatCurrency(sb.estimatedCost || 0)}
                        </td>
                        <td className="px-6 py-4">
                          <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(sb.status)}`}>
                            {sb.status}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            <select
                              value={sb.status}
                              onChange={(e) => updateServiceStatus(sb._id, e.target.value)}
                              className="text-sm border border-gray-300 rounded px-2 py-1"
                            >
                              <option value="scheduled">Scheduled</option>
                              <option value="vehicle-received">Vehicle Received</option>
                              <option value="in-progress">In Progress</option>
                              <option value="completed">Completed</option>
                              <option value="cancelled">Cancelled</option>
                            </select>
                            <button
                              onClick={() => deleteItem('service-bookings', sb._id)}
                              className="text-red-600 hover:text-red-800 text-sm"
                            >
                              🗑️
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* Parts Orders Tab */}
        {activeTab === 'orders' && (
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-xl font-bold text-gray-800">Parts Orders</h2>
              <p className="text-gray-500 text-sm">Manage genuine parts orders</p>
            </div>
            
            {orders.length === 0 ? (
              <div className="p-12 text-center text-gray-500">
                <div className="text-6xl mb-4">📦</div>
                <p className="text-lg">No orders yet</p>
                <p className="text-sm">Orders will appear here when customers place them</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Order ID</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Customer</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Items</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Total</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Payment</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {orders.map((order) => (
                      <tr key={order._id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 text-sm font-medium text-[#001e50]">{order.orderId}</td>
                        <td className="px-6 py-4">
                          <div className="text-sm font-medium text-gray-900">{order.customerInfo?.name}</div>
                          <div className="text-sm text-gray-500">{order.customerInfo?.email}</div>
                          <div className="text-sm text-gray-500">{order.customerInfo?.phone}</div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm text-gray-900">{order.items?.length || 0} items</div>
                          {order.items?.slice(0, 2).map((item, i) => (
                            <div key={i} className="text-xs text-gray-500">{item.name} x{item.quantity}</div>
                          ))}
                          {order.items?.length > 2 && (
                            <div className="text-xs text-gray-400">+{order.items.length - 2} more</div>
                          )}
                        </td>
                        <td className="px-6 py-4 text-sm font-medium text-gray-900">
                          {formatCurrency(order.pricing?.total || 0)}
                        </td>
                        <td className="px-6 py-4">
                          <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(order.paymentInfo?.status)}`}>
                            {order.paymentInfo?.status || 'pending'}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(order.orderStatus)}`}>
                            {order.orderStatus}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-500">
                          {formatDate(order.createdAt)}
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            <select
                              value={order.orderStatus}
                              onChange={(e) => updateOrderStatus(order._id, e.target.value)}
                              className="text-sm border border-gray-300 rounded px-2 py-1"
                            >
                              <option value="placed">Placed</option>
                              <option value="confirmed">Confirmed</option>
                              <option value="processing">Processing</option>
                              <option value="shipped">Shipped</option>
                              <option value="delivered">Delivered</option>
                              <option value="cancelled">Cancelled</option>
                            </select>
                            <button
                              onClick={() => deleteItem('orders', order._id)}
                              className="text-red-600 hover:text-red-800 text-sm"
                            >
                              🗑️
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* Car Reservations Tab */}
        {activeTab === 'reservations' && (
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-xl font-bold text-gray-800">Car Reservations</h2>
              <p className="text-gray-500 text-sm">Manage vehicle reservations and bookings</p>
            </div>
            
            {reservations.length === 0 ? (
              <div className="p-12 text-center text-gray-500">
                <div className="text-6xl mb-4">🏷️</div>
                <p className="text-lg">No car reservations yet</p>
                <p className="text-sm">Reservations will appear here when customers book vehicles</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Reservation ID</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Customer</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Car</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Variant & Color</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Price</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Payment</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {reservations.map((res) => (
                      <tr key={res._id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 text-sm font-medium text-[#001e50]">{res.reservationId}</td>
                        <td className="px-6 py-4">
                          <div className="text-sm font-medium text-gray-900">{res.customerName}</div>
                          <div className="text-sm text-gray-500">{res.customerEmail}</div>
                          <div className="text-sm text-gray-500">{res.customerPhone}</div>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-900">{res.carName}</td>
                        <td className="px-6 py-4">
                          <div className="text-sm text-gray-900">{res.variantName}</div>
                          <div className="text-sm text-gray-500">{res.colorName}</div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm font-medium text-gray-900">{formatCurrency(res.totalPrice || 0)}</div>
                          <div className="text-xs text-gray-500">Token: {formatCurrency(res.tokenAmount || 0)}</div>
                        </td>
                        <td className="px-6 py-4">
                          <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(res.paymentStatus)}`}>
                            {res.paymentStatus}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(res.reservationStatus)}`}>
                            {res.reservationStatus}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <button
                            onClick={() => deleteItem('reservations', res._id)}
                            className="text-red-600 hover:text-red-800 text-sm"
                          >
                            🗑️
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
