import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { servicesAPI } from '../api';
import { 
  ArrowLeft, Check, Clock, MapPin, Car, Phone, Calendar, 
  FileText, RefreshCw, Wrench, CheckCircle, AlertCircle,
  Download, Share2, MessageSquare, Shield, Award, User
} from 'lucide-react';

const statusSteps = [
  { key: 'scheduled', label: 'Scheduled', icon: Calendar },
  { key: 'vehicle-received', label: 'Vehicle Received', icon: Car },
  { key: 'in-progress', label: 'In Progress', icon: Wrench },
  { key: 'quality-check', label: 'Quality Check', icon: CheckCircle },
  { key: 'ready', label: 'Ready', icon: Check }
];

export default function ServiceStatusPage() {
  const { bookingId } = useParams();
  const [booking, setBooking] = useState(null);
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [activeTab, setActiveTab] = useState('status');

  useEffect(() => {
    loadBookingDetails();
  }, [bookingId]);

  const loadBookingDetails = async () => {
    setLoading(true);
    try {
      const response = await servicesAPI.getBooking(bookingId);
      setBooking(response.data);
      
      if (response.data?.registrationNumber) {
        const historyRes = await servicesAPI.getHistory(response.data.registrationNumber);
        setHistory(historyRes.data || []);
      }
    } catch (error) {
      // Demo booking data
      setBooking({
        id: bookingId,
        status: 'in-progress',
        serviceType: 'Periodic Service',
        carModel: 'Volkswagen Virtus',
        carYear: '2023',
        registrationNumber: 'MH 01 AB 1234',
        serviceCenterName: 'Mumbai Central Service',
        serviceCenterAddress: '123 Auto Mall, Mumbai',
        preferredDate: new Date().toISOString(),
        preferredTime: '10:00 AM',
        customerName: 'Sachin Kumar',
        customerEmail: 'sachin89359@gmail.com',
        customerPhone: '8935904820',
        estimatedCost: 8999,
        estimatedCompletion: new Date(Date.now() + 2 * 60 * 60 * 1000).toISOString(),
        serviceAdvisor: 'Rahul Sharma',
        updates: [
          { time: '09:00 AM', message: 'Vehicle received at service center', type: 'info' },
          { time: '09:30 AM', message: 'Initial inspection completed', type: 'info' },
          { time: '10:15 AM', message: 'Service work started', type: 'info' },
          { time: '11:00 AM', message: 'Engine oil change completed', type: 'success' }
        ]
      });
      setHistory([
        { date: '2024-06-15', service: 'General Repair', amount: 4500 },
        { date: '2024-01-20', service: 'Periodic Service', amount: 7999 }
      ]);
    }
    setLoading(false);
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    await loadBookingDetails();
    setRefreshing(false);
  };

  const getCurrentStatusIndex = () => {
    return statusSteps.findIndex(s => s.key === booking?.status) || 0;
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatTime = (dateString) => {
    return new Date(dateString).toLocaleTimeString('en-IN', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(price);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="spinner mx-auto mb-4" />
          <p className="text-gray-500">Loading service status...</p>
        </div>
      </div>
    );
  }

  if (!booking) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
        <div className="card card-elevated p-12 text-center max-w-md">
          <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <AlertCircle size={40} className="text-gray-400" />
          </div>
          <h2 className="text-2xl font-bold text-[#001e50] mb-2">Booking Not Found</h2>
          <p className="text-gray-500 mb-6">Booking ID: {bookingId}</p>
          <Link to="/service" className="btn btn-primary">Book New Service</Link>
        </div>
      </div>
    );
  }

  const statusIndex = getCurrentStatusIndex();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="hero-gradient hero-pattern text-white py-8">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <Link to="/service" className="inline-flex items-center gap-2 text-white/70 hover:text-white mb-4 transition">
              <ArrowLeft size={18} />
              Back to Service Booking
            </Link>
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <h1 className="text-2xl font-bold">Service Status</h1>
                  <span className={`badge ${
                    booking.status === 'ready' || booking.status === 'completed'
                      ? 'badge-success'
                      : booking.status === 'in-progress'
                      ? 'badge-gold'
                      : 'badge-primary'
                  }`}>
                    {statusSteps.find(s => s.key === booking.status)?.label || booking.status}
                  </span>
                </div>
                <p className="text-white/70">
                  Booking ID: <span className="font-mono">{bookingId}</span>
                </p>
              </div>
              <button 
                onClick={handleRefresh} 
                disabled={refreshing}
                className="btn bg-white/10 hover:bg-white/20 text-white border-0"
              >
                <RefreshCw size={18} className={refreshing ? 'animate-spin' : ''} />
                Refresh
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Status Progress */}
      <div className="bg-white border-b border-gray-100">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-5xl mx-auto">
            <div className="flex items-center justify-between relative">
              <div className="absolute top-5 left-0 right-0 h-1 bg-gray-200 -z-10">
                <div 
                  className="h-full bg-linear-to-r from-[#001e50] to-[#c9a227] transition-all duration-500"
                  style={{ width: `${(statusIndex / (statusSteps.length - 1)) * 100}%` }}
                />
              </div>
              {statusSteps.map((step, index) => {
                const isCompleted = index <= statusIndex;
                const isCurrent = index === statusIndex;
                return (
                  <div key={step.key} className="flex flex-col items-center relative z-10">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all
                      ${isCompleted 
                        ? 'bg-linear-to-br from-[#001e50] to-[#00356b] text-white shadow-lg' 
                        : 'bg-gray-200 text-gray-400'
                      }
                      ${isCurrent ? 'ring-4 ring-[#001e50]/20' : ''}
                    `}>
                      <step.icon size={18} />
                    </div>
                    <span className={`text-xs mt-2 font-medium hidden md:block
                      ${isCompleted ? 'text-[#001e50]' : 'text-gray-400'}
                    `}>
                      {step.label}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-5xl mx-auto">
          {/* Tabs */}
          <div className="flex gap-4 mb-6 border-b border-gray-200">
            {[
              { key: 'status', label: 'Live Updates' },
              { key: 'details', label: 'Booking Details' },
              { key: 'history', label: 'Service History' }
            ].map(tab => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`pb-3 px-1 font-medium transition border-b-2 -mb-px ${
                  activeTab === tab.key
                    ? 'text-[#001e50] border-[#001e50]'
                    : 'text-gray-500 border-transparent hover:text-gray-700'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Panel */}
            <div className="lg:col-span-2">
              {/* Live Updates Tab */}
              {activeTab === 'status' && (
                <div className="card card-elevated p-6">
                  <h2 className="font-bold text-[#001e50] mb-6 flex items-center gap-2">
                    <Clock size={20} />
                    Live Updates
                  </h2>
                  <div className="space-y-4">
                    {booking.updates?.map((update, index) => (
                      <div key={index} className="flex gap-4">
                        <div className="flex flex-col items-center">
                          <div className={`w-3 h-3 rounded-full ${
                            update.type === 'success' ? 'bg-green-500' : 'bg-[#001e50]'
                          }`} />
                          {index < booking.updates.length - 1 && (
                            <div className="w-0.5 h-full bg-gray-200 my-1" />
                          )}
                        </div>
                        <div className="flex-1 pb-4">
                          <p className="text-sm text-gray-500">{update.time}</p>
                          <p className="font-medium">{update.message}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {booking.estimatedCompletion && (
                    <div className="mt-6 p-4 bg-[#001e50]/5 rounded-xl">
                      <p className="text-sm text-gray-500">Estimated Completion</p>
                      <p className="font-bold text-[#001e50] text-lg">
                        {formatTime(booking.estimatedCompletion)}
                      </p>
                    </div>
                  )}
                </div>
              )}

              {/* Booking Details Tab */}
              {activeTab === 'details' && (
                <div className="space-y-6">
                  <div className="card card-elevated p-6">
                    <h2 className="font-bold text-[#001e50] mb-4 flex items-center gap-2">
                      <Wrench size={20} />
                      Service Details
                    </h2>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-gray-500">Service Type</p>
                        <p className="font-semibold">{booking.serviceType}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Estimated Cost</p>
                        <p className="font-semibold text-[#001e50]">
                          {formatPrice(booking.estimatedCost)}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Date & Time</p>
                        <p className="font-semibold">
                          {formatDate(booking.preferredDate)} at {booking.preferredTime}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Service Advisor</p>
                        <p className="font-semibold">{booking.serviceAdvisor}</p>
                      </div>
                    </div>
                  </div>

                  <div className="card card-elevated p-6">
                    <h2 className="font-bold text-[#001e50] mb-4 flex items-center gap-2">
                      <Car size={20} />
                      Vehicle Details
                    </h2>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-gray-500">Vehicle</p>
                        <p className="font-semibold">{booking.carModel} ({booking.carYear})</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Registration</p>
                        <p className="font-semibold font-mono">{booking.registrationNumber}</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Service History Tab */}
              {activeTab === 'history' && (
                <div className="card card-elevated p-6">
                  <h2 className="font-bold text-[#001e50] mb-4 flex items-center gap-2">
                    <FileText size={20} />
                    Service History
                  </h2>
                  {history.length === 0 ? (
                    <p className="text-gray-500 text-center py-8">No previous service records</p>
                  ) : (
                    <div className="space-y-3">
                      {history.map((record, index) => (
                        <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                          <div>
                            <p className="font-semibold">{record.service}</p>
                            <p className="text-sm text-gray-500">{formatDate(record.date)}</p>
                          </div>
                          <p className="font-bold text-[#001e50]">{formatPrice(record.amount)}</p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1 space-y-6">
              {/* Service Center */}
              <div className="card card-elevated p-6">
                <h3 className="font-bold text-[#001e50] mb-4 flex items-center gap-2">
                  <MapPin size={18} />
                  Service Center
                </h3>
                <p className="font-semibold mb-1">{booking.serviceCenterName}</p>
                <p className="text-sm text-gray-500 mb-4">{booking.serviceCenterAddress}</p>
                <a 
                  href={`https://maps.google.com/?q=${encodeURIComponent(booking.serviceCenterAddress)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-secondary w-full"
                >
                  <MapPin size={16} />
                  Get Directions
                </a>
              </div>

              {/* Contact */}
              <div className="card card-elevated p-6">
                <h3 className="font-bold text-[#001e50] mb-4 flex items-center gap-2">
                  <User size={18} />
                  Contact
                </h3>
                <div className="space-y-3">
                  <a 
                    href="tel:1800-123-4567"
                    className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition"
                  >
                    <Phone size={18} className="text-[#001e50]" />
                    <div>
                      <p className="text-xs text-gray-500">Helpline</p>
                      <p className="font-medium">1800-123-4567</p>
                    </div>
                  </a>
                  <a 
                    href="#"
                    className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition"
                  >
                    <MessageSquare size={18} className="text-[#001e50]" />
                    <div>
                      <p className="text-xs text-gray-500">Chat Support</p>
                      <p className="font-medium">Start Chat</p>
                    </div>
                  </a>
                </div>
              </div>

              {/* Trust Badges */}
              <div className="card p-4 space-y-3">
                <div className="flex items-center gap-3 text-sm text-gray-600">
                  <Shield size={18} className="text-green-500" />
                  <span>Genuine Parts Guaranteed</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-600">
                  <Award size={18} className="text-[#001e50]" />
                  <span>Certified Technicians</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
