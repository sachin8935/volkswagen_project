import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { paymentAPI } from '../api';
import { 
  Check, Download, Package, ArrowRight, Home, 
  Mail, Phone, MapPin, Truck, Calendar, CreditCard,
  Share2, Printer, FileText
} from 'lucide-react';
import confetti from 'canvas-confetti';

export default function OrderSuccessPage() {
  const { orderId } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadOrder();
    // Trigger confetti on mount
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#001e50', '#c9a227', '#4ade80']
    });
  }, [orderId]);

  const loadOrder = async () => {
    try {
      const response = await paymentAPI.getOrder(orderId);
      if (response.success && response.data) {
        // Map MongoDB order format to display format
        const orderData = response.data;
        setOrder({
          orderId: orderData.orderId,
          createdAt: orderData.createdAt,
          status: orderData.orderStatus,
          items: orderData.items || [],
          totals: {
            subtotal: orderData.pricing?.subtotal || 0,
            discount: orderData.pricing?.discount || 0,
            shipping: 0,
            tax: orderData.pricing?.gst || 0,
            total: orderData.pricing?.total || 0
          },
          customer: {
            name: orderData.customerInfo?.name || '',
            email: orderData.customerInfo?.email || '',
            phone: orderData.customerInfo?.phone || ''
          },
          shippingAddress: orderData.customerInfo?.address || {},
          estimatedDelivery: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString(),
          paymentInfo: orderData.paymentInfo
        });
      } else {
        throw new Error('Order not found');
      }
    } catch (error) {
      console.error('Error loading order:', error);
      // Show minimal info if order not found
      setOrder({
        orderId,
        createdAt: new Date().toISOString(),
        status: 'confirmed',
        items: [],
        totals: { subtotal: 0, discount: 0, shipping: 0, tax: 0, total: 0 },
        customer: { name: '', email: '', phone: '' },
        shippingAddress: {},
        estimatedDelivery: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString()
      });
    }
    setLoading(false);
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(price);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const handleDownloadInvoice = () => {
    // In production, this would download the actual invoice
    alert('Invoice download will start shortly...');
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'My VW Auto Group Order',
          text: `I just ordered from VW Auto Group! Order #${orderId}`,
          url: window.location.href
        });
      } catch (err) {
        console.log('Share cancelled');
      }
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="spinner mx-auto mb-4" />
          <p className="text-gray-500">Loading your order...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          {/* Success Banner */}
          <div className="card card-elevated p-8 md:p-12 text-center mb-8">
            <div className="w-24 h-24 bg-linear-to-br from-green-400 to-green-600 
                          rounded-full flex items-center justify-center mx-auto mb-6 
                          shadow-lg shadow-green-200 animate-bounce-slow">
              <Check className="text-white" size={48} strokeWidth={3} />
            </div>
            
            <h1 className="text-3xl md:text-4xl font-bold text-[#001e50] mb-3">
              Order Confirmed!
            </h1>
            <p className="text-gray-500 text-lg mb-6">
              Thank you for your purchase. Your order has been successfully placed.
            </p>
            
            <div className="inline-flex items-center gap-3 bg-gray-50 rounded-full px-6 py-3">
              <span className="text-gray-500">Order ID:</span>
              <span className="font-mono font-bold text-[#001e50]">{orderId}</span>
            </div>

            <div className="flex flex-wrap justify-center gap-3 mt-8">
              <button onClick={handleDownloadInvoice} className="btn btn-secondary">
                <Download size={18} />
                Download Invoice
              </button>
              <button onClick={handleShare} className="btn btn-ghost">
                <Share2 size={18} />
                Share
              </button>
            </div>
          </div>

          {/* Order Timeline */}
          <div className="card card-elevated p-6 mb-8">
            <h2 className="font-bold text-[#001e50] mb-6">Order Status</h2>
            <div className="flex items-center justify-between relative">
              <div className="absolute top-4 left-8 right-8 h-1 bg-gray-200 rounded">
                <div className="h-full w-1/4 bg-green-500 rounded" />
              </div>
              
              {[
                { label: 'Confirmed', icon: Check, active: true },
                { label: 'Processing', icon: Package, active: false },
                { label: 'Shipped', icon: Truck, active: false },
                { label: 'Delivered', icon: Home, active: false }
              ].map((step, index) => (
                <div key={step.label} className="relative z-10 flex flex-col items-center">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    step.active 
                      ? 'bg-green-500 text-white' 
                      : 'bg-gray-200 text-gray-400'
                  }`}>
                    <step.icon size={16} />
                  </div>
                  <span className={`text-xs mt-2 ${
                    step.active ? 'text-green-600 font-medium' : 'text-gray-400'
                  }`}>
                    {step.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Order Items */}
            <div className="card card-elevated p-6">
              <h2 className="font-bold text-[#001e50] mb-4 flex items-center gap-2">
                <Package size={20} />
                Order Items
              </h2>
              <div className="space-y-4">
                {order?.items?.map((item, index) => (
                  <div key={index} className="flex justify-between items-center py-3 border-b border-gray-100 last:border-0">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                        <Package size={20} className="text-gray-400" />
                      </div>
                      <div>
                        <p className="font-medium text-sm">{item.name}</p>
                        <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
                      </div>
                    </div>
                    <p className="font-semibold text-[#001e50]">
                      {formatPrice(item.price * item.quantity)}
                    </p>
                  </div>
                ))}
              </div>

              {/* Totals */}
              {order?.totals && (
                <div className="mt-4 pt-4 border-t border-gray-100 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Subtotal</span>
                    <span>{formatPrice(order.totals.subtotal)}</span>
                  </div>
                  {order.totals.discount > 0 && (
                    <div className="flex justify-between text-sm text-green-600">
                      <span>Discount</span>
                      <span>-{formatPrice(order.totals.discount)}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Shipping</span>
                    <span>{order.totals.shipping === 0 ? 'Free' : formatPrice(order.totals.shipping)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Tax</span>
                    <span>{formatPrice(order.totals.tax)}</span>
                  </div>
                  <div className="flex justify-between pt-3 border-t border-gray-200 font-bold text-lg">
                    <span className="text-[#001e50]">Total Paid</span>
                    <span className="text-[#001e50]">{formatPrice(order.totals.total)}</span>
                  </div>
                </div>
              )}
            </div>

            {/* Delivery & Contact Info */}
            <div className="space-y-6">
              {/* Delivery Info */}
              <div className="card card-elevated p-6">
                <h2 className="font-bold text-[#001e50] mb-4 flex items-center gap-2">
                  <Truck size={20} />
                  Delivery Details
                </h2>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <MapPin size={18} className="text-gray-400 mt-1 flex-shrink-0" />
                    <div>
                      <p className="text-sm text-gray-500">Shipping Address</p>
                      <p className="font-medium">
                        {order?.shippingAddress?.street}<br />
                        {order?.shippingAddress?.city}, {order?.shippingAddress?.state}<br />
                        {order?.shippingAddress?.pincode}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Calendar size={18} className="text-gray-400 mt-1 flex-shrink-0" />
                    <div>
                      <p className="text-sm text-gray-500">Estimated Delivery</p>
                      <p className="font-medium text-green-600">
                        {order?.estimatedDelivery ? formatDate(order.estimatedDelivery) : '3-5 Business Days'}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Customer Info */}
              <div className="card card-elevated p-6">
                <h2 className="font-bold text-[#001e50] mb-4 flex items-center gap-2">
                  <CreditCard size={20} />
                  Payment & Contact
                </h2>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                      <Check size={18} className="text-green-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Payment Status</p>
                      <p className="font-medium text-green-600">Paid via Card</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Mail size={18} className="text-gray-400" />
                    <div>
                      <p className="text-sm text-gray-500">Email</p>
                      <p className="font-medium">{order?.customer?.email || 'customer@example.com'}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone size={18} className="text-gray-400" />
                    <div>
                      <p className="text-sm text-gray-500">Phone</p>
                      <p className="font-medium">+91 {order?.customer?.phone || '9876543210'}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Help Section */}
          <div className="card card-elevated p-6 mt-8">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div>
                <h3 className="font-bold text-[#001e50]">Need Help?</h3>
                <p className="text-sm text-gray-500">Our support team is here to assist you</p>
              </div>
              <div className="flex gap-3">
                <a href="tel:1800-123-4567" className="btn btn-secondary">
                  <Phone size={18} />
                  1800-123-4567
                </a>
                <a href="mailto:support@vwautogroup.com" className="btn btn-ghost">
                  <Mail size={18} />
                  Email Us
                </a>
              </div>
            </div>
          </div>

          {/* Continue Shopping */}
          <div className="text-center mt-8">
            <Link to="/" className="btn btn-primary btn-lg">
              <Home size={20} />
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
