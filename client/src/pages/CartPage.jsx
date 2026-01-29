import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCartStore } from '../store';
import { 
  ShoppingCart, Trash2, Plus, Minus, Tag, 
  ArrowRight, Package, X, ShoppingBag, Shield,
  Truck, CreditCard, CheckCircle2
} from 'lucide-react';

export default function CartPage() {
  const navigate = useNavigate();
  const { items, totals, coupon, loading, fetchCart, updateQuantity, removeItem, applyCoupon, removeCoupon } = useCartStore();
  const [couponCode, setCouponCode] = useState('');
  const [couponError, setCouponError] = useState('');
  const [couponSuccess, setCouponSuccess] = useState('');

  useEffect(() => {
    fetchCart();
  }, [fetchCart]);

  const handleApplyCoupon = async () => {
    if (!couponCode.trim()) return;
    setCouponError('');
    setCouponSuccess('');
    const result = await applyCoupon(couponCode);
    if (result.success) {
      setCouponSuccess(result.message);
      setCouponCode('');
    } else {
      setCouponError(result.message);
    }
  };

  const handleRemoveCoupon = async () => {
    await removeCoupon();
    setCouponSuccess('');
    setCouponError('');
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(price);
  };

  if (loading && items.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="spinner mx-auto mb-4" />
          <p className="text-gray-500">Loading your cart...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-100">
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-[#001e50] rounded-2xl flex items-center justify-center">
              <ShoppingCart size={28} className="text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-[#001e50]">Shopping Cart</h1>
              <p className="text-gray-500">{items.length} item{items.length !== 1 ? 's' : ''} in your cart</p>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {items.length === 0 ? (
          <div className="card card-elevated p-12 text-center max-w-lg mx-auto">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <ShoppingBag size={48} className="text-gray-300" />
            </div>
            <h2 className="text-2xl font-bold text-gray-600 mb-2">Your cart is empty</h2>
            <p className="text-gray-400 mb-8">Start shopping for genuine parts or explore our showroom</p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link to="/parts" className="btn btn-primary">
                <Package size={20} />
                Shop Parts
              </Link>
              <Link to="/showroom" className="btn btn-secondary">
                Explore Showroom
              </Link>
            </div>
          </div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {items.map((item) => (
                <div key={item.id} className="card card-elevated p-6 hover:shadow-lg transition-shadow">
                  <div className="flex gap-5">
                    {/* Image */}
                    <div className="w-28 h-28 bg-gray-50 rounded-xl flex-shrink-0 overflow-hidden">
                      {item.image ? (
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <Package size={36} className="text-gray-300" />
                        </div>
                      )}
                    </div>

                    {/* Details */}
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-start gap-4">
                        <div>
                          <span className="badge badge-primary text-xs">{item.itemType}</span>
                          <h3 className="font-bold text-[#001e50] mt-1 text-lg">{item.name}</h3>
                          {item.variant && (
                            <p className="text-sm text-gray-500 mt-1">{item.variant} • {item.color}</p>
                          )}
                          {item.partNumber && (
                            <p className="text-xs text-gray-400 mt-1">Part #: {item.partNumber}</p>
                          )}
                        </div>
                        <button
                          onClick={() => removeItem(item.id)}
                          className="btn btn-icon btn-ghost text-gray-400 hover:text-red-500 hover:bg-red-50"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>

                      <div className="flex items-center justify-between mt-4">
                        {/* Quantity */}
                        {item.itemType === 'part' ? (
                          <div className="qty-selector">
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="qty-btn"
                              disabled={item.quantity <= 1}
                            >
                              <Minus size={16} />
                            </button>
                            <span className="qty-value">{item.quantity}</span>
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="qty-btn"
                            >
                              <Plus size={16} />
                            </button>
                          </div>
                        ) : (
                          <span className="badge badge-primary">Qty: {item.quantity}</span>
                        )}

                        {/* Price */}
                        <div className="text-right">
                          {item.mrp && item.mrp > item.price && (
                            <p className="price-old">{formatPrice(item.mrp * item.quantity)}</p>
                          )}
                          <p className="price price-lg">{formatPrice(item.price * item.quantity)}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="card card-elevated p-6 sticky top-24">
                <h2 className="text-xl font-bold text-[#001e50] mb-6">Order Summary</h2>

                {/* Coupon Code */}
                <div className="mb-6">
                  <label className="input-label flex items-center gap-2">
                    <Tag size={16} />
                    Coupon Code
                  </label>
                  {coupon ? (
                    <div className="flex items-center justify-between bg-green-50 border-2 border-green-200 p-4 rounded-xl">
                      <div>
                        <p className="font-bold text-green-800">{coupon.code}</p>
                        <p className="text-xs text-green-600">{coupon.description}</p>
                      </div>
                      <button
                        onClick={handleRemoveCoupon}
                        className="text-green-600 hover:text-green-800 hover:bg-green-100 p-1 rounded"
                      >
                        <X size={20} />
                      </button>
                    </div>
                  ) : (
                    <div className="flex gap-2">
                      <input
                        type="text"
                        placeholder="Enter code"
                        className="input-field flex-1 uppercase"
                        value={couponCode}
                        onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                      />
                      <button
                        onClick={handleApplyCoupon}
                        className="btn btn-secondary"
                      >
                        Apply
                      </button>
                    </div>
                  )}
                  {couponError && (
                    <p className="text-sm text-red-500 mt-2">{couponError}</p>
                  )}
                  {couponSuccess && (
                    <p className="text-sm text-green-500 mt-2">{couponSuccess}</p>
                  )}
                </div>

                {/* Price Breakdown */}
                <div className="space-y-3 py-4 border-y border-gray-100">
                  <div className="flex justify-between text-gray-600">
                    <span>Subtotal ({totals.itemCount} items)</span>
                    <span>{formatPrice(totals.subtotal)}</span>
                  </div>
                  {totals.discount > 0 && (
                    <div className="flex justify-between text-green-600">
                      <span>Discount</span>
                      <span>- {formatPrice(totals.discount)}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-gray-600">
                    <span>GST (18%)</span>
                    <span>{formatPrice(totals.gst)}</span>
                  </div>
                </div>

                <div className="flex justify-between items-center py-4">
                  <span className="text-lg font-semibold text-gray-700">Total</span>
                  <span className="price price-xl">{formatPrice(totals.total)}</span>
                </div>

                <button
                  onClick={() => navigate('/checkout')}
                  className="btn btn-primary btn-lg w-full mt-4"
                >
                  Proceed to Checkout
                  <ArrowRight size={20} />
                </button>

                {/* Trust Badges */}
                <div className="grid grid-cols-3 gap-3 mt-6 pt-6 border-t border-gray-100">
                  <div className="text-center">
                    <Shield size={24} className="text-green-500 mx-auto mb-1" />
                    <p className="text-xs text-gray-500">Secure</p>
                  </div>
                  <div className="text-center">
                    <Truck size={24} className="text-blue-500 mx-auto mb-1" />
                    <p className="text-xs text-gray-500">Fast Delivery</p>
                  </div>
                  <div className="text-center">
                    <CheckCircle2 size={24} className="text-[#001e50] mx-auto mb-1" />
                    <p className="text-xs text-gray-500">Genuine</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
