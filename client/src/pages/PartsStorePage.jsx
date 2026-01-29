import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { partsAPI } from '../api';
import { useCartStore, useWishlistStore } from '../store';
import { 
  Search, ShoppingCart, Heart, 
  X, Package, SlidersHorizontal, Grid3X3,
  LayoutList, Shield, Truck, CheckCircle2, 
  Plus, Minus, ChevronDown, Sparkles, Tag
} from 'lucide-react';

const models = [
  'Volkswagen Polo', 'Volkswagen Virtus', 'Volkswagen Taigun', 'Volkswagen Tiguan',
  'Audi A4', 'Audi Q3', 'Audi Q5', 'Audi Q7',
  'Skoda Kushaq', 'Skoda Slavia', 'Skoda Octavia'
];

const sortOptions = [
  { id: 'featured', label: 'Featured' },
  { id: 'price-low', label: 'Price: Low to High' },
  { id: 'price-high', label: 'Price: High to Low' },
  { id: 'newest', label: 'Newest First' },
];

const categoryIcons = {
  'Engine': '🔧',
  'Brakes': '🛞',
  'Filters': '🌬️',
  'Electrical': '⚡',
  'Suspension': '🔩',
  'Accessories': '✨',
  'Fluids': '🛢️',
  'Body Parts': '🚗',
};

export default function PartsStorePage() {
  const [parts, setParts] = useState([]);
  const [allParts, setAllParts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedModel, setSelectedModel] = useState('');
  const [sortBy, setSortBy] = useState('featured');
  const [viewMode, setViewMode] = useState('grid');
  const [showFilters, setShowFilters] = useState(false);
  const [addedToCart, setAddedToCart] = useState({});
  const [updatingCart, setUpdatingCart] = useState({});

  const { items: cartItems, addItem, updateQuantity, removeItem: removeCartItem, fetchCart } = useCartStore();
  const { items: wishlist, addItem: addToWishlist, removeItem: removeFromWishlist } = useWishlistStore();

  useEffect(() => {
    loadParts();
    loadCategories();
    fetchCart();
  }, []);

  useEffect(() => {
    filterAndSortParts();
  }, [allParts, searchQuery, selectedCategory, selectedModel, sortBy]);

  const loadParts = async () => {
    setLoading(true);
    try {
      const response = await partsAPI.getAll();
      const data = Array.isArray(response) ? response : response.data || [];
      setAllParts(data);
    } catch (error) {
      console.error('Failed to load parts:', error);
    }
    setLoading(false);
  };

  const loadCategories = async () => {
    try {
      const response = await partsAPI.getCategories();
      const data = Array.isArray(response) ? response : response.data || [];
      setCategories(data);
    } catch (error) {
      console.error('Failed to load categories:', error);
    }
  };

  const filterAndSortParts = () => {
    let filtered = [...allParts];

    // Filter by search
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(part => 
        part.name?.toLowerCase().includes(query) ||
        part.partNumber?.toLowerCase().includes(query) ||
        part.description?.toLowerCase().includes(query)
      );
    }

    // Filter by category
    if (selectedCategory) {
      filtered = filtered.filter(part => 
        part.category?.toLowerCase() === selectedCategory.toLowerCase()
      );
    }

    // Sort
    switch (sortBy) {
      case 'price-low':
        filtered.sort((a, b) => (a.price || 0) - (b.price || 0));
        break;
      case 'price-high':
        filtered.sort((a, b) => (b.price || 0) - (a.price || 0));
        break;
      case 'newest':
        filtered.reverse();
        break;
      default:
        break;
    }

    setParts(filtered);
  };

  // Get cart item details for a part
  const getCartItem = (partId) => {
    return cartItems.find(item => item.itemId === partId && item.itemType === 'part');
  };

  const getCartQuantity = (partId) => {
    const cartItem = getCartItem(partId);
    return cartItem ? cartItem.quantity : 0;
  };

  // Add 1 to cart (either new item or increment existing)
  const handleAddOne = async (part) => {
    const cartItem = getCartItem(part.id);
    const currentQty = cartItem ? cartItem.quantity : 0;
    setUpdatingCart(prev => ({ ...prev, [part.id]: true }));
    
    if (currentQty === 0) {
      // New item - add to cart
      const result = await addItem({
        itemId: part.id,
        itemType: 'part',
        quantity: 1
      });
      if (result.success) {
        setAddedToCart(prev => ({ ...prev, [part.id]: true }));
        setTimeout(() => setAddedToCart(prev => ({ ...prev, [part.id]: false })), 1500);
      }
    } else {
      // Existing item - increment by 1 using cart item's unique ID
      await updateQuantity(cartItem.id, currentQty + 1);
    }
    
    setUpdatingCart(prev => ({ ...prev, [part.id]: false }));
  };

  // Remove 1 from cart
  const handleRemoveOne = async (part) => {
    const cartItem = getCartItem(part.id);
    if (!cartItem) return;
    
    const currentQty = cartItem.quantity;
    setUpdatingCart(prev => ({ ...prev, [part.id]: true }));
    
    if (currentQty === 1) {
      // Last item - remove from cart using cart item's unique ID
      await removeCartItem(cartItem.id);
    } else {
      // Decrement by 1 using cart item's unique ID
      await updateQuantity(cartItem.id, currentQty - 1);
    }
    
    setUpdatingCart(prev => ({ ...prev, [part.id]: false }));
  };

  const isInWishlist = (partId) => wishlist.some(item => item.id === partId);

  const toggleWishlist = (e, part) => {
    e.preventDefault();
    e.stopPropagation();
    if (isInWishlist(part.id)) {
      removeFromWishlist(part.id);
    } else {
      addToWishlist({ ...part, type: 'part' });
    }
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(price);
  };

  const getDiscount = (mrp, price) => {
    if (!mrp || mrp <= price) return 0;
    return Math.round(((mrp - price) / mrp) * 100);
  };

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedCategory('');
    setSelectedModel('');
    setSortBy('featured');
  };

  const hasActiveFilters = searchQuery || selectedCategory || selectedModel;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Header */}
      <section className="relative bg-gradient-to-br from-[#001e50] via-[#002d6b] to-[#001333] text-white overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#c9a227] rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-white rounded-full blur-3xl" />
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-16 md:py-20">
          <div className="max-w-3xl">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-14 h-14 bg-[#c9a227] rounded-2xl flex items-center justify-center shadow-lg">
                <Package size={28} className="text-[#001e50]" />
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full">
                <Sparkles size={16} className="text-[#c9a227]" />
                <span className="text-sm font-medium">100% Genuine Parts</span>
              </div>
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              Genuine <span className="text-[#c9a227]">Parts Store</span>
            </h1>
            
            <p className="text-lg sm:text-xl text-white/70 max-w-2xl mb-8 leading-relaxed">
              Shop authentic Volkswagen Group parts with warranty. Perfect fit guaranteed for your vehicle.
            </p>
            
            {/* Trust Badges */}
            <div className="flex flex-wrap gap-4">
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-xl">
                <Shield size={20} className="text-[#c9a227]" />
                <span className="text-sm font-medium">OEM Quality</span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-xl">
                <Truck size={20} className="text-[#c9a227]" />
                <span className="text-sm font-medium">Fast Delivery</span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-xl">
                <CheckCircle2 size={20} className="text-[#c9a227]" />
                <span className="text-sm font-medium">Warranty Included</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Sidebar Filters */}
          <div className={`lg:w-72 flex-shrink-0 ${showFilters ? 'block' : 'hidden lg:block'}`}>
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sticky top-24">
              <div className="flex justify-between items-center mb-6">
                <h3 className="font-bold text-lg text-[#001e50]">Filters</h3>
                {hasActiveFilters && (
                  <button
                    onClick={clearFilters}
                    className="text-sm text-red-500 hover:text-red-600 font-medium"
                  >
                    Clear All
                  </button>
                )}
              </div>

              {/* Search */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">Search Parts</label>
                <div className="relative">
                  <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Part name or number..."
                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:border-[#001e50] focus:ring-2 focus:ring-[#001e50]/10 outline-none transition-all"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                  {searchQuery && (
                    <button 
                      onClick={() => setSearchQuery('')}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      <X size={16} />
                    </button>
                  )}
                </div>
              </div>

              {/* Category */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                <div className="relative">
                  <select
                    className="w-full appearance-none pl-4 pr-10 py-3 rounded-xl border border-gray-200 focus:border-[#001e50] focus:ring-2 focus:ring-[#001e50]/10 outline-none cursor-pointer"
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                  >
                    <option value="">All Categories</option>
                    {categories.map((cat) => (
                      <option key={cat.name || cat} value={cat.name || cat}>
                        {cat.name || cat} {cat.count ? `(${cat.count})` : ''}
                      </option>
                    ))}
                  </select>
                  <ChevronDown size={18} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                </div>
              </div>

              {/* Car Model */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">Compatible Model</label>
                <div className="relative">
                  <select
                    className="w-full appearance-none pl-4 pr-10 py-3 rounded-xl border border-gray-200 focus:border-[#001e50] focus:ring-2 focus:ring-[#001e50]/10 outline-none cursor-pointer"
                    value={selectedModel}
                    onChange={(e) => setSelectedModel(e.target.value)}
                  >
                    <option value="">All Models</option>
                    {models.map((model) => (
                      <option key={model} value={model}>{model}</option>
                    ))}
                  </select>
                  <ChevronDown size={18} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                </div>
              </div>

              {/* Categories Quick Links */}
              <div className="border-t border-gray-100 pt-6">
                <h4 className="font-medium text-gray-700 mb-3">Popular Categories</h4>
                <div className="space-y-2">
                  {['Engine', 'Brakes', 'Filters', 'Electrical', 'Accessories'].map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setSelectedCategory(cat)}
                      className={`w-full text-left px-4 py-3 rounded-xl text-sm transition-all flex items-center gap-2 ${
                        selectedCategory === cat 
                          ? 'bg-[#001e50] text-white shadow-lg' 
                          : 'text-gray-600 hover:bg-gray-50 border border-gray-100'
                      }`}
                    >
                      <span>{categoryIcons[cat] || '📦'}</span>
                      {cat}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Toolbar */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 mb-6">
              <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => setShowFilters(!showFilters)}
                    className="lg:hidden flex items-center gap-2 px-4 py-2.5 bg-gray-100 rounded-xl font-medium text-gray-700 hover:bg-gray-200 transition-colors"
                  >
                    <SlidersHorizontal size={18} />
                    Filters
                  </button>
                  <p className="text-gray-600">
                    Showing <span className="font-bold text-[#001e50]">{parts.length}</span> parts
                  </p>
                </div>

                <div className="flex items-center gap-3 w-full md:w-auto">
                  {/* Sort */}
                  <div className="relative flex-1 md:flex-none">
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                      className="appearance-none w-full md:w-auto pl-4 pr-10 py-2.5 rounded-xl border border-gray-200 bg-white focus:border-[#001e50] focus:ring-2 focus:ring-[#001e50]/10 outline-none cursor-pointer min-w-[180px]"
                    >
                      {sortOptions.map((opt) => (
                        <option key={opt.id} value={opt.id}>{opt.label}</option>
                      ))}
                    </select>
                    <ChevronDown size={18} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                  </div>

                  {/* View Toggle */}
                  <div className="hidden md:flex items-center bg-gray-100 p-1 rounded-xl">
                    <button
                      onClick={() => setViewMode('grid')}
                      className={`p-2.5 rounded-lg transition-all ${
                        viewMode === 'grid' 
                          ? 'bg-white text-[#001e50] shadow-sm' 
                          : 'text-gray-500 hover:text-gray-700'
                      }`}
                    >
                      <Grid3X3 size={20} />
                    </button>
                    <button
                      onClick={() => setViewMode('list')}
                      className={`p-2.5 rounded-lg transition-all ${
                        viewMode === 'list' 
                          ? 'bg-white text-[#001e50] shadow-sm' 
                          : 'text-gray-500 hover:text-gray-700'
                      }`}
                    >
                      <LayoutList size={20} />
                    </button>
                  </div>
                </div>
              </div>

              {/* Active Filters */}
              {hasActiveFilters && (
                <div className="flex items-center gap-2 mt-4 pt-4 border-t border-gray-100 flex-wrap">
                  <span className="text-sm text-gray-500">Active filters:</span>
                  {searchQuery && (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#001e50]/10 text-[#001e50] rounded-full text-sm font-medium">
                      "{searchQuery}"
                      <button onClick={() => setSearchQuery('')} className="hover:bg-[#001e50]/20 rounded-full p-0.5">
                        <X size={14} />
                      </button>
                    </span>
                  )}
                  {selectedCategory && (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#001e50]/10 text-[#001e50] rounded-full text-sm font-medium">
                      {selectedCategory}
                      <button onClick={() => setSelectedCategory('')} className="hover:bg-[#001e50]/20 rounded-full p-0.5">
                        <X size={14} />
                      </button>
                    </span>
                  )}
                  {selectedModel && (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#001e50]/10 text-[#001e50] rounded-full text-sm font-medium">
                      {selectedModel}
                      <button onClick={() => setSelectedModel('')} className="hover:bg-[#001e50]/20 rounded-full p-0.5">
                        <X size={14} />
                      </button>
                    </span>
                  )}
                  <button
                    onClick={clearFilters}
                    className="text-sm text-red-500 hover:text-red-600 font-medium ml-2"
                  >
                    Clear all
                  </button>
                </div>
              )}
            </div>

            {/* Parts Grid */}
            {loading ? (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="bg-white rounded-2xl overflow-hidden shadow-sm">
                    <div className="h-48 bg-gray-200 animate-pulse" />
                    <div className="p-5 space-y-3">
                      <div className="h-4 bg-gray-200 rounded-lg animate-pulse w-1/4" />
                      <div className="h-5 bg-gray-200 rounded-lg animate-pulse w-3/4" />
                      <div className="h-4 bg-gray-200 rounded-lg animate-pulse w-1/2" />
                      <div className="flex justify-between pt-4">
                        <div className="h-8 bg-gray-200 rounded-lg animate-pulse w-1/3" />
                        <div className="h-10 bg-gray-200 rounded-lg animate-pulse w-24" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : parts.length > 0 ? (
              viewMode === 'grid' ? (
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {parts.map((part) => {
                    const cartQty = getCartQuantity(part.id);
                    const discount = getDiscount(part.mrp, part.price);
                    const isAdded = addedToCart[part.id];
                    
                    return (
                      <div 
                        key={part.id} 
                        className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100"
                      >
                        {/* Image */}
                        <div className="relative h-48 bg-gradient-to-br from-gray-50 to-gray-100 overflow-hidden">
                          <img
                            src={part.image}
                            alt={part.name}
                            className="w-full h-full object-contain p-6 group-hover:scale-105 transition-transform duration-500"
                            onError={(e) => {
                              e.target.src = 'https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=300&auto=format&fit=crop&q=80';
                            }}
                          />
                          
                          {/* Wishlist Button */}
                          <button
                            onClick={(e) => toggleWishlist(e, part)}
                            className={`absolute top-3 right-3 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
                              isInWishlist(part.id)
                                ? 'bg-red-500 text-white'
                                : 'bg-white/90 text-gray-600 hover:bg-white hover:text-red-500 opacity-0 group-hover:opacity-100'
                            }`}
                          >
                            <Heart size={18} fill={isInWishlist(part.id) ? 'currentColor' : 'none'} />
                          </button>

                          {/* Stock Badge */}
                          <div className="absolute bottom-3 left-3">
                            {part.inStock ? (
                              <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-emerald-500 text-white rounded-full text-xs font-medium">
                                <span className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" />
                                In Stock ({part.inStock})
                              </span>
                            ) : (
                              <span className="px-2.5 py-1 bg-red-500 text-white rounded-full text-xs font-medium">
                                Out of Stock
                              </span>
                            )}
                          </div>

                          {/* Discount Badge */}
                          {discount > 0 && (
                            <div className="absolute top-3 left-3">
                              <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-[#c9a227] text-[#001e50] rounded-full text-xs font-bold">
                                <Tag size={12} />
                                {discount}% OFF
                              </span>
                            </div>
                          )}

                          {/* Cart Quantity Badge */}
                          {cartQty > 0 && (
                            <div className="absolute top-12 left-3">
                              <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-[#001e50] text-white rounded-full text-xs font-bold shadow-lg">
                                <ShoppingCart size={12} />
                                {cartQty} in cart
                              </span>
                            </div>
                          )}
                        </div>

                        {/* Content */}
                        <div className="p-5">
                          <div className="flex items-center gap-2 mb-2">
                            <span className="text-xs text-[#001e50] uppercase tracking-wider font-semibold px-2 py-1 bg-[#001e50]/10 rounded-md">
                              {part.category}
                            </span>
                          </div>
                          
                          <h3 className="font-bold text-[#001e50] text-lg mb-1 line-clamp-2 min-h-[56px]">
                            {part.name}
                          </h3>
                          
                          <p className="text-xs text-gray-400 mb-4">
                            Part #: <span className="font-medium text-gray-500">{part.partNumber}</span>
                          </p>
                          
                          {/* Price */}
                          <div className="pt-4 border-t border-gray-100">
                            <div className="flex items-end justify-between mb-4">
                              <div>
                                {part.mrp && part.mrp > part.price && (
                                  <p className="text-sm text-gray-400 line-through">{formatPrice(part.mrp)}</p>
                                )}
                                <p className="text-2xl font-bold text-[#001e50]">{formatPrice(part.price)}</p>
                              </div>
                            </div>
                            
                            {/* Cart Controls - Direct +/- actions */}
                            {cartQty > 0 ? (
                              /* Item IS in cart - show quantity controls that directly update */
                              <div className="flex items-center justify-between bg-[#001e50] rounded-xl p-1">
                                <button
                                  onClick={() => handleRemoveOne(part)}
                                  disabled={updatingCart[part.id]}
                                  className="w-12 h-12 flex items-center justify-center bg-white/10 hover:bg-white/20 rounded-lg transition-colors disabled:opacity-50"
                                >
                                  <Minus size={20} className="text-white" />
                                </button>
                                <div className="text-center px-4">
                                  {updatingCart[part.id] ? (
                                    <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin mx-auto" />
                                  ) : (
                                    <>
                                      <span className="text-2xl font-bold text-white">{cartQty}</span>
                                      <p className="text-[10px] text-white/70">in cart</p>
                                    </>
                                  )}
                                </div>
                                <button
                                  onClick={() => handleAddOne(part)}
                                  disabled={updatingCart[part.id]}
                                  className="w-12 h-12 flex items-center justify-center bg-[#c9a227] hover:bg-[#d4af37] rounded-lg transition-colors disabled:opacity-50"
                                >
                                  <Plus size={20} className="text-[#001e50]" />
                                </button>
                              </div>
                            ) : (
                              /* Item NOT in cart - simple Add button */
                              <button
                                onClick={() => handleAddOne(part)}
                                disabled={!part.inStock || updatingCart[part.id]}
                                className={`w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl font-semibold transition-all ${
                                  !part.inStock 
                                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                    : isAdded
                                      ? 'bg-emerald-500 text-white'
                                      : 'bg-[#001e50] text-white hover:bg-[#003580] hover:shadow-lg'
                                }`}
                              >
                                {updatingCart[part.id] ? (
                                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                ) : isAdded ? (
                                  <>
                                    <CheckCircle2 size={18} />
                                    Added!
                                  </>
                                ) : (
                                  <>
                                    <ShoppingCart size={18} />
                                    Add to Cart
                                  </>
                                )}
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                /* List View */
                <div className="space-y-4">
                  {parts.map((part) => {
                    const cartQty = getCartQuantity(part.id);
                    const discount = getDiscount(part.mrp, part.price);
                    const isAdded = addedToCart[part.id];
                    
                    return (
                      <div 
                        key={part.id} 
                        className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all border border-gray-100 flex flex-col md:flex-row"
                      >
                        {/* Image */}
                        <div className="md:w-56 h-48 md:h-auto flex-shrink-0 bg-gradient-to-br from-gray-50 to-gray-100 relative">
                          <img
                            src={part.image}
                            alt={part.name}
                            className="w-full h-full object-contain p-6"
                            onError={(e) => {
                              e.target.src = 'https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=300&auto=format&fit=crop&q=80';
                            }}
                          />
                          
                          {discount > 0 && (
                            <div className="absolute top-3 left-3">
                              <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-[#c9a227] text-[#001e50] rounded-full text-xs font-bold">
                                <Tag size={12} />
                                {discount}% OFF
                              </span>
                            </div>
                          )}
                        </div>

                        {/* Content */}
                        <div className="flex-1 p-6 flex flex-col justify-between">
                          <div>
                            <div className="flex items-center gap-2 mb-2 flex-wrap">
                              <span className="text-xs text-[#001e50] uppercase tracking-wider font-semibold px-2 py-1 bg-[#001e50]/10 rounded-md">
                                {part.category}
                              </span>
                              {part.inStock ? (
                                <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-emerald-100 text-emerald-700 rounded-full text-xs font-medium">
                                  <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full" />
                                  In Stock ({part.inStock})
                                </span>
                              ) : (
                                <span className="px-2.5 py-1 bg-red-100 text-red-600 rounded-full text-xs font-medium">
                                  Out of Stock
                                </span>
                              )}
                              {cartQty > 0 && (
                                <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-[#001e50] text-white rounded-full text-xs font-bold">
                                  <ShoppingCart size={12} />
                                  {cartQty} in cart
                                </span>
                              )}
                            </div>
                            
                            <h3 className="text-xl font-bold text-[#001e50] mb-1">{part.name}</h3>
                            <p className="text-sm text-gray-400 mb-2">Part #: {part.partNumber}</p>
                            <p className="text-gray-600 line-clamp-2">{part.description}</p>
                          </div>

                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mt-4 pt-4 border-t border-gray-100">
                            <div>
                              {part.mrp && part.mrp > part.price && (
                                <p className="text-sm text-gray-400 line-through">{formatPrice(part.mrp)}</p>
                              )}
                              <p className="text-2xl font-bold text-[#001e50]">{formatPrice(part.price)}</p>
                            </div>
                            
                            <div className="flex items-center gap-3">
                              <button
                                onClick={(e) => toggleWishlist(e, part)}
                                className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all ${
                                  isInWishlist(part.id)
                                    ? 'bg-red-50 text-red-500'
                                    : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
                                }`}
                              >
                                <Heart size={20} fill={isInWishlist(part.id) ? 'currentColor' : 'none'} />
                              </button>
                              
                              {/* Cart Controls - Direct +/- actions */}
                              {cartQty > 0 ? (
                                /* Item IS in cart - show quantity controls that directly update */
                                <div className="flex items-center bg-[#001e50] rounded-xl p-1">
                                  <button
                                    onClick={() => handleRemoveOne(part)}
                                    disabled={updatingCart[part.id]}
                                    className="w-11 h-11 flex items-center justify-center bg-white/10 hover:bg-white/20 rounded-lg transition-colors disabled:opacity-50"
                                  >
                                    <Minus size={18} className="text-white" />
                                  </button>
                                  <div className="px-5 text-center min-w-[60px]">
                                    {updatingCart[part.id] ? (
                                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mx-auto" />
                                    ) : (
                                      <>
                                        <span className="text-xl font-bold text-white">{cartQty}</span>
                                        <p className="text-[10px] text-white/70">in cart</p>
                                      </>
                                    )}
                                  </div>
                                  <button
                                    onClick={() => handleAddOne(part)}
                                    disabled={updatingCart[part.id]}
                                    className="w-11 h-11 flex items-center justify-center bg-[#c9a227] hover:bg-[#d4af37] rounded-lg transition-colors disabled:opacity-50"
                                  >
                                    <Plus size={18} className="text-[#001e50]" />
                                  </button>
                                </div>
                              ) : (
                                /* Item NOT in cart - simple Add button */
                                <button
                                  onClick={() => handleAddOne(part)}
                                  disabled={!part.inStock || updatingCart[part.id]}
                                  className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all ${
                                    !part.inStock 
                                      ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                      : isAdded
                                        ? 'bg-emerald-500 text-white'
                                        : 'bg-[#001e50] text-white hover:bg-[#003580]'
                                  }`}
                                >
                                  {updatingCart[part.id] ? (
                                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                  ) : isAdded ? (
                                    <>
                                      <CheckCircle2 size={18} />
                                      Added!
                                    </>
                                  ) : (
                                    <>
                                      <ShoppingCart size={18} />
                                      Add to Cart
                                    </>
                                  )}
                                </button>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )
            ) : (
              /* Empty State */
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-12 text-center">
                <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Package size={48} className="text-gray-300" />
                </div>
                <h3 className="text-2xl font-bold text-gray-700 mb-2">No parts found</h3>
                <p className="text-gray-500 mb-8 max-w-md mx-auto">
                  We couldn't find any parts matching your criteria. Try adjusting your filters or search query.
                </p>
                <button
                  onClick={clearFilters}
                  className="px-8 py-3 bg-[#001e50] text-white rounded-xl font-semibold hover:bg-[#003580] transition-colors"
                >
                  Clear All Filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
