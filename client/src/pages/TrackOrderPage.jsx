import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Search, Phone, Package, Car, Wrench, Calendar, 
  ChevronLeft, ChevronRight, Clock, MapPin, CheckCircle, 
  AlertCircle, Loader2, ShoppingBag, CreditCard, User,
  Mail, FileText, ExternalLink, RefreshCw
} from 'lucide-react';

const TrackOrderPage = () => {
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [trackingData, setTrackingData] = useState(null);
  const [activeTab, setActiveTab] = useState('all');
  const [selectedOrder, setSelectedOrder] = useState(null);

  const handleSearch = async (e) => {
    e.preventDefault();
    
    if (!phone || phone.replace(/\D/g, '').length < 10) {
      setError('Please enter a valid 10-digit phone number');
      return;
    }

    setLoading(true);
    setError('');
    setTrackingData(null);

    try {
      const response = await fetch(`http://localhost:5000/api/tracking/by-phone/${phone}`);
      const data = await response.json();

      if (data.success) {
        setTrackingData(data.data);
        if (data.data.total === 0) {
          setError('No orders found for this phone number');
        }
      } else {
        setError(data.message || 'Failed to fetch tracking information');
      }
    } catch (err) {
      setError('Unable to connect to server. Please try again.');
      console.error('Tracking error:', err);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    const statusColors = {
      'pending': 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
      'confirmed': 'bg-green-500/20 text-green-400 border-green-500/30',
      'processing': 'bg-blue-500/20 text-blue-400 border-blue-500/30',
      'shipped': 'bg-purple-500/20 text-purple-400 border-purple-500/30',
      'delivered': 'bg-green-500/20 text-green-400 border-green-500/30',
      'completed': 'bg-green-500/20 text-green-400 border-green-500/30',
      'cancelled': 'bg-red-500/20 text-red-400 border-red-500/30',
      'in_progress': 'bg-blue-500/20 text-blue-400 border-blue-500/30',
      'scheduled': 'bg-indigo-500/20 text-indigo-400 border-indigo-500/30'
    };
    return statusColors[status?.toLowerCase()] || 'bg-gray-500/20 text-gray-400 border-gray-500/30';
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case 'parts_order':
        return <Package className="w-5 h-5" />;
      case 'test_drive':
        return <Car className="w-5 h-5" />;
      case 'service_booking':
        return <Wrench className="w-5 h-5" />;
      case 'car_reservation':
        return <CreditCard className="w-5 h-5" />;
      default:
        return <FileText className="w-5 h-5" />;
    }
  };

  const getTypeColor = (type) => {
    switch (type) {
      case 'parts_order':
        return 'from-orange-500 to-amber-500';
      case 'test_drive':
        return 'from-blue-500 to-cyan-500';
      case 'service_booking':
        return 'from-purple-500 to-pink-500';
      case 'car_reservation':
        return 'from-green-500 to-emerald-500';
      default:
        return 'from-gray-500 to-slate-500';
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  const formatPrice = (price) => {
    if (!price) return '₹0';
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(price);
  };

  const getFilteredOrders = () => {
    if (!trackingData) return [];
    
    switch (activeTab) {
      case 'parts':
        return trackingData.orders || [];
      case 'test_drives':
        return trackingData.testDrives || [];
      case 'services':
        return trackingData.serviceBookings || [];
      case 'reservations':
        return trackingData.carReservations || [];
      default:
        return trackingData.all || [];
    }
  };

  const tabs = [
    { id: 'all', label: 'All', count: trackingData?.total || 0 },
    { id: 'parts', label: 'Parts Orders', count: trackingData?.orders?.length || 0 },
    { id: 'test_drives', label: 'Test Drives', count: trackingData?.testDrives?.length || 0 },
    { id: 'services', label: 'Services', count: trackingData?.serviceBookings?.length || 0 },
    { id: 'reservations', label: 'Car Reservations', count: trackingData?.carReservations?.length || 0 }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Header */}
      <div className="bg-slate-900/50 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <Link to="/" className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors">
            <ChevronLeft className="w-5 h-5" />
            Back to Home
          </Link>
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative py-16 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"></div>
        </div>

        <div className="relative max-w-4xl mx-auto px-6 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500/10 rounded-full text-blue-400 text-sm font-medium mb-6">
            <Search className="w-4 h-4" />
            Track Your Orders
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Order <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">Tracking</span>
          </h1>
          
          <p className="text-lg text-gray-400 mb-10 max-w-2xl mx-auto">
            Enter your phone number to track all your orders, test drive bookings, service appointments, and car reservations.
          </p>

          {/* Search Form */}
          <form onSubmit={handleSearch} className="max-w-xl mx-auto">
            <div className="relative">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">
                <Phone className="w-5 h-5" />
              </div>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Enter your 10-digit phone number"
                className="w-full pl-12 pr-32 py-4 rounded-2xl bg-white/5 border border-white/10 text-white placeholder:text-gray-500 focus:outline-none focus:border-blue-500 transition-colors text-lg"
              />
              <button
                type="submit"
                disabled={loading}
                className="absolute right-2 top-1/2 -translate-y-1/2 px-6 py-2.5 bg-blue-500 hover:bg-blue-600 disabled:bg-blue-500/50 rounded-xl text-white font-semibold transition-colors flex items-center gap-2"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Searching...
                  </>
                ) : (
                  <>
                    <Search className="w-5 h-5" />
                    Track
                  </>
                )}
              </button>
            </div>
          </form>

          {/* Error Message */}
          {error && (
            <div className="mt-6 p-4 bg-red-500/10 border border-red-500/30 rounded-xl text-red-400 flex items-center justify-center gap-2">
              <AlertCircle className="w-5 h-5" />
              {error}
            </div>
          )}
        </div>
      </section>

      {/* Results Section */}
      {trackingData && trackingData.total > 0 && (
        <section className="py-12">
          <div className="max-w-6xl mx-auto px-6">
            {/* Summary Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              <div className="p-4 rounded-xl bg-orange-500/10 border border-orange-500/30">
                <Package className="w-6 h-6 text-orange-400 mb-2" />
                <p className="text-2xl font-bold text-white">{trackingData.orders?.length || 0}</p>
                <p className="text-gray-400 text-sm">Parts Orders</p>
              </div>
              <div className="p-4 rounded-xl bg-blue-500/10 border border-blue-500/30">
                <Car className="w-6 h-6 text-blue-400 mb-2" />
                <p className="text-2xl font-bold text-white">{trackingData.testDrives?.length || 0}</p>
                <p className="text-gray-400 text-sm">Test Drives</p>
              </div>
              <div className="p-4 rounded-xl bg-purple-500/10 border border-purple-500/30">
                <Wrench className="w-6 h-6 text-purple-400 mb-2" />
                <p className="text-2xl font-bold text-white">{trackingData.serviceBookings?.length || 0}</p>
                <p className="text-gray-400 text-sm">Service Bookings</p>
              </div>
              <div className="p-4 rounded-xl bg-green-500/10 border border-green-500/30">
                <CreditCard className="w-6 h-6 text-green-400 mb-2" />
                <p className="text-2xl font-bold text-white">{trackingData.carReservations?.length || 0}</p>
                <p className="text-gray-400 text-sm">Car Reservations</p>
              </div>
            </div>

            {/* Tabs */}
            <div className="flex flex-wrap gap-2 mb-8 p-2 bg-white/5 rounded-xl">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-4 py-2 rounded-lg font-medium transition-all flex items-center gap-2 ${
                    activeTab === tab.id
                      ? 'bg-blue-500 text-white'
                      : 'text-gray-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {tab.label}
                  <span className={`px-2 py-0.5 rounded-full text-xs ${
                    activeTab === tab.id ? 'bg-white/20' : 'bg-white/10'
                  }`}>
                    {tab.count}
                  </span>
                </button>
              ))}
            </div>

            {/* Orders List */}
            <div className="space-y-4">
              {getFilteredOrders().map((order, idx) => (
                <div 
                  key={order.id || idx}
                  className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden hover:border-white/20 transition-all"
                >
                  <div className="p-6">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                      {/* Left - Icon & Info */}
                      <div className="flex items-start gap-4">
                        <div className={`p-3 rounded-xl bg-gradient-to-br ${getTypeColor(order.type)}`}>
                          {getTypeIcon(order.type)}
                        </div>
                        <div>
                          <div className="flex items-center gap-3 mb-1">
                            <h3 className="text-lg font-semibold text-white">{order.typeLabel}</h3>
                            <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(order.status)}`}>
                              {order.status?.replace('_', ' ').toUpperCase()}
                            </span>
                          </div>
                          <p className="text-gray-400 text-sm">ID: {order.id}</p>
                          
                          {/* Type-specific info */}
                          {order.type === 'parts_order' && (
                            <p className="text-gray-300 mt-2">
                              {order.itemCount} items • {order.items}
                            </p>
                          )}
                          {order.type === 'test_drive' && (
                            <div className="flex flex-wrap gap-4 mt-2 text-sm">
                              <span className="text-gray-300 flex items-center gap-1">
                                <Car className="w-4 h-4 text-blue-400" />
                                {order.carName}
                              </span>
                              <span className="text-gray-300 flex items-center gap-1">
                                <MapPin className="w-4 h-4 text-blue-400" />
                                {order.location}
                              </span>
                              <span className="text-gray-300 flex items-center gap-1">
                                <Calendar className="w-4 h-4 text-blue-400" />
                                {order.scheduledDate} at {order.scheduledTime}
                              </span>
                            </div>
                          )}
                          {order.type === 'service_booking' && (
                            <div className="flex flex-wrap gap-4 mt-2 text-sm">
                              <span className="text-gray-300 flex items-center gap-1">
                                <Wrench className="w-4 h-4 text-purple-400" />
                                {order.serviceType}
                              </span>
                              <span className="text-gray-300 flex items-center gap-1">
                                <Car className="w-4 h-4 text-purple-400" />
                                {order.vehicleModel} ({order.vehicleNumber})
                              </span>
                              <span className="text-gray-300 flex items-center gap-1">
                                <Calendar className="w-4 h-4 text-purple-400" />
                                {order.scheduledDate} at {order.scheduledTime}
                              </span>
                            </div>
                          )}
                          {order.type === 'car_reservation' && (
                            <div className="flex flex-wrap gap-4 mt-2 text-sm">
                              <span className="text-gray-300 flex items-center gap-1">
                                <Car className="w-4 h-4 text-green-400" />
                                {order.carName}
                              </span>
                              <span className="text-gray-300">
                                {order.variant} • {order.color}
                              </span>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Right - Price & Date */}
                      <div className="text-right">
                        {(order.total > 0 || order.tokenAmount > 0) && (
                          <p className="text-xl font-bold text-white mb-1">
                            {formatPrice(order.total || order.tokenAmount)}
                          </p>
                        )}
                        <p className="text-gray-500 text-sm flex items-center justify-end gap-1">
                          <Clock className="w-4 h-4" />
                          {formatDate(order.date)}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Expand Details */}
                  <button
                    onClick={() => setSelectedOrder(selectedOrder === order.id ? null : order.id)}
                    className="w-full px-6 py-3 bg-white/5 border-t border-white/10 text-gray-400 hover:text-white hover:bg-white/10 transition-colors flex items-center justify-center gap-2 text-sm"
                  >
                    {selectedOrder === order.id ? 'Hide Details' : 'View Details'}
                    <ChevronRight className={`w-4 h-4 transition-transform ${selectedOrder === order.id ? 'rotate-90' : ''}`} />
                  </button>

                  {/* Expanded Details */}
                  {selectedOrder === order.id && (
                    <div className="px-6 py-4 bg-white/5 border-t border-white/10">
                      <div className="grid md:grid-cols-2 gap-4 text-sm">
                        {order.details?.customer && (
                          <div className="flex items-center gap-2">
                            <User className="w-4 h-4 text-gray-500" />
                            <span className="text-gray-400">Customer:</span>
                            <span className="text-white">{order.details.customer}</span>
                          </div>
                        )}
                        {order.details?.email && (
                          <div className="flex items-center gap-2">
                            <Mail className="w-4 h-4 text-gray-500" />
                            <span className="text-gray-400">Email:</span>
                            <span className="text-white">{order.details.email}</span>
                          </div>
                        )}
                        {order.details?.paymentStatus && (
                          <div className="flex items-center gap-2">
                            <CreditCard className="w-4 h-4 text-gray-500" />
                            <span className="text-gray-400">Payment:</span>
                            <span className={`capitalize ${order.details.paymentStatus === 'paid' ? 'text-green-400' : 'text-yellow-400'}`}>
                              {order.details.paymentStatus}
                            </span>
                          </div>
                        )}
                        {order.details?.dealership && (
                          <div className="flex items-center gap-2">
                            <MapPin className="w-4 h-4 text-gray-500" />
                            <span className="text-gray-400">Dealership:</span>
                            <span className="text-white">{order.details.dealership}</span>
                          </div>
                        )}
                        {order.serviceCenterName && (
                          <div className="flex items-center gap-2">
                            <MapPin className="w-4 h-4 text-gray-500" />
                            <span className="text-gray-400">Service Center:</span>
                            <span className="text-white">{order.serviceCenterName}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {getFilteredOrders().length === 0 && (
              <div className="text-center py-12">
                <Package className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                <p className="text-gray-400">No orders found in this category</p>
              </div>
            )}
          </div>
        </section>
      )}

      {/* Empty State */}
      {!trackingData && !loading && !error && (
        <section className="py-20">
          <div className="max-w-4xl mx-auto px-6">
            <div className="grid md:grid-cols-3 gap-6">
              <div className="p-6 rounded-2xl bg-white/5 border border-white/10 text-center">
                <div className="w-12 h-12 rounded-xl bg-orange-500/20 flex items-center justify-center mx-auto mb-4">
                  <Package className="w-6 h-6 text-orange-400" />
                </div>
                <h3 className="text-white font-semibold mb-2">Parts Orders</h3>
                <p className="text-gray-400 text-sm">Track your genuine parts orders and delivery status</p>
              </div>
              <div className="p-6 rounded-2xl bg-white/5 border border-white/10 text-center">
                <div className="w-12 h-12 rounded-xl bg-blue-500/20 flex items-center justify-center mx-auto mb-4">
                  <Car className="w-6 h-6 text-blue-400" />
                </div>
                <h3 className="text-white font-semibold mb-2">Test Drives</h3>
                <p className="text-gray-400 text-sm">View your scheduled test drive appointments</p>
              </div>
              <div className="p-6 rounded-2xl bg-white/5 border border-white/10 text-center">
                <div className="w-12 h-12 rounded-xl bg-purple-500/20 flex items-center justify-center mx-auto mb-4">
                  <Wrench className="w-6 h-6 text-purple-400" />
                </div>
                <h3 className="text-white font-semibold mb-2">Service Bookings</h3>
                <p className="text-gray-400 text-sm">Check your service appointment status</p>
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default TrackOrderPage;
