import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useWishlistStore, useCartStore } from '../store';
import { 
  Heart, ShoppingCart, Trash2, Package, ArrowRight, 
  Car, Eye, Share2, Star, Sparkles
} from 'lucide-react';

export default function WishlistPage() {
  const { items, loading, fetchWishlist, removeFromWishlist } = useWishlistStore();
  const addItem = useCartStore((state) => state.addItem);
  const [removingId, setRemovingId] = useState(null);

  useEffect(() => {
    fetchWishlist();
  }, [fetchWishlist]);

  const handleMoveToCart = async (item) => {
    const result = await addItem({
      itemId: item.itemId,
      itemType: item.itemType,
      quantity: 1
    });
    if (result.success) {
      await removeFromWishlist(item.itemId);
    }
  };

  const handleRemove = async (itemId) => {
    setRemovingId(itemId);
    await removeFromWishlist(itemId);
    setRemovingId(null);
  };

  const handleShare = async (item) => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: item.name,
          text: `Check out ${item.name} on VW Auto Group!`,
          url: window.location.origin + (item.itemType === 'car' ? `/showroom/${item.itemId}` : `/parts/${item.itemId}`)
        });
      } catch (err) {
        console.log('Share cancelled');
      }
    }
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
          <p className="text-gray-500">Loading your wishlist...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Header */}
      <div className="hero-gradient hero-pattern text-white py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-14 h-14 bg-red-500 rounded-2xl flex items-center justify-center">
                <Heart size={28} className="text-white fill-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold">My Wishlist</h1>
                <p className="text-white/70">
                  {items.length === 0 
                    ? "Your wishlist is empty" 
                    : `${items.length} ${items.length === 1 ? 'item' : 'items'} saved`
                  }
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {items.length === 0 ? (
            <div className="card card-elevated p-16 text-center">
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Heart size={48} className="text-gray-300" />
              </div>
              <h2 className="text-2xl font-bold text-[#001e50] mb-2">Your wishlist is empty</h2>
              <p className="text-gray-500 mb-8 max-w-md mx-auto">
                Save items you like by clicking the heart icon on any product. 
                We'll keep them here for you.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/showroom" className="btn btn-primary">
                  <Car size={18} />
                  Explore Cars
                </Link>
                <Link to="/parts" className="btn btn-secondary">
                  <Package size={18} />
                  Browse Parts
                </Link>
              </div>
            </div>
          ) : (
            <>
              {/* Quick Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                <div className="card p-4 text-center">
                  <p className="text-2xl font-bold text-[#001e50]">{items.length}</p>
                  <p className="text-sm text-gray-500">Total Items</p>
                </div>
                <div className="card p-4 text-center">
                  <p className="text-2xl font-bold text-[#001e50]">
                    {items.filter(i => i.itemType === 'car').length}
                  </p>
                  <p className="text-sm text-gray-500">Cars</p>
                </div>
                <div className="card p-4 text-center">
                  <p className="text-2xl font-bold text-[#001e50]">
                    {items.filter(i => i.itemType === 'part').length}
                  </p>
                  <p className="text-sm text-gray-500">Parts</p>
                </div>
                <div className="card p-4 text-center">
                  <p className="text-2xl font-bold text-[#c9a227]">
                    {formatPrice(items.reduce((sum, item) => sum + (item.price || 0), 0))}
                  </p>
                  <p className="text-sm text-gray-500">Total Value</p>
                </div>
              </div>

              {/* Wishlist Grid */}
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {items.map((item) => (
                  <div 
                    key={item.id} 
                    className={`card card-elevated overflow-hidden group transition-all duration-300 ${
                      removingId === item.itemId ? 'opacity-50 scale-95' : ''
                    }`}
                  >
                    <div className="relative h-48 bg-linear-to-br from-gray-100 to-gray-50 overflow-hidden">
                      {item.image ? (
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          {item.itemType === 'car' ? (
                            <Car size={56} className="text-gray-300" />
                          ) : (
                            <Package size={56} className="text-gray-300" />
                          )}
                        </div>
                      )}
                      
                      {/* Overlay Actions */}
                      <div className="absolute top-3 right-3 flex gap-2">
                        <button
                          onClick={() => handleShare(item)}
                          className="p-2 bg-white/90 backdrop-blur rounded-full text-gray-600 
                                     hover:bg-white hover:text-[#001e50] transition shadow-sm"
                        >
                          <Share2 size={16} />
                        </button>
                        <button
                          onClick={() => handleRemove(item.itemId)}
                          disabled={removingId === item.itemId}
                          className="p-2 bg-white/90 backdrop-blur rounded-full text-red-500 
                                     hover:bg-red-500 hover:text-white transition shadow-sm"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>

                      {/* Type Badge */}
                      <div className="absolute bottom-3 left-3">
                        <span className={`badge ${
                          item.itemType === 'car' 
                            ? 'bg-[#001e50] text-white' 
                            : 'bg-[#c9a227] text-[#001e50]'
                        }`}>
                          {item.itemType === 'car' ? 'Vehicle' : 'Part'}
                        </span>
                      </div>
                    </div>

                    <div className="p-5">
                      {item.brand && (
                        <p className="text-xs font-semibold text-[#c9a227] uppercase tracking-wider mb-1">
                          {item.brand}
                        </p>
                      )}
                      <h3 className="font-bold text-lg text-[#001e50] line-clamp-1 mb-2">
                        {item.name}
                      </h3>
                      
                      <div className="flex items-baseline gap-2 mb-4">
                        <span className="text-2xl font-bold text-[#001e50]">
                          {formatPrice(item.price)}
                        </span>
                        {item.originalPrice && item.originalPrice > item.price && (
                          <span className="text-sm text-gray-400 line-through">
                            {formatPrice(item.originalPrice)}
                          </span>
                        )}
                      </div>

                      <div className="flex gap-3">
                        <button
                          onClick={() => handleMoveToCart(item)}
                          className="btn btn-primary flex-1 text-sm"
                        >
                          <ShoppingCart size={16} />
                          Add to Cart
                        </button>
                        <Link
                          to={item.itemType === 'car' ? `/showroom/${item.itemId}` : `/parts/${item.itemId}`}
                          className="btn btn-secondary"
                        >
                          <Eye size={16} />
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Continue Shopping */}
              <div className="mt-12 text-center">
                <p className="text-gray-500 mb-4">Looking for more?</p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link to="/showroom" className="btn btn-ghost">
                    <Car size={18} />
                    Browse Cars
                    <ArrowRight size={18} />
                  </Link>
                  <Link to="/parts" className="btn btn-ghost">
                    <Package size={18} />
                    Browse Parts
                    <ArrowRight size={18} />
                  </Link>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
