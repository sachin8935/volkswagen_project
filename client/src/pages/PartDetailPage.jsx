import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { partsAPI } from '../api';
import { useCartStore, useWishlistStore } from '../store';
import { 
  ArrowLeft, ShoppingCart, Heart, Star, Check, Shield, 
  Truck, Package, Plus, Minus, Share2, ChevronRight,
  Tag, AlertCircle, CheckCircle, Clock, Award, Wrench
} from 'lucide-react';

const carModels = [
  'Volkswagen Polo', 'Volkswagen Virtus', 'Volkswagen Taigun', 'Volkswagen Tiguan',
  'Audi A4', 'Audi A6', 'Audi Q3', 'Audi Q5', 'Audi Q7',
  'Skoda Kushaq', 'Skoda Slavia', 'Skoda Octavia', 'Skoda Kodiaq',
  'Porsche Macan', 'Porsche Cayenne'
];

const years = Array.from({ length: 10 }, (_, i) => 2025 - i);

export default function PartDetailPage() {
  const { partId } = useParams();
  const [part, setPart] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('description');
  const [addingToCart, setAddingToCart] = useState(false);
  
  // Compatibility check
  const [compatibilityCheck, setCompatibilityCheck] = useState({ model: '', year: '' });
  const [compatibilityResult, setCompatibilityResult] = useState(null);
  const [checkingCompatibility, setCheckingCompatibility] = useState(false);

  const addItem = useCartStore((state) => state.addItem);
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlistStore();

  useEffect(() => {
    loadPartDetails();
  }, [partId]);

  const loadPartDetails = async () => {
    setLoading(true);
    try {
      const response = await partsAPI.getById(partId);
      setPart(response.data);
    } catch (error) {
      // Demo part data
      setPart({
        id: partId,
        name: 'Premium Oil Filter',
        partNumber: 'VW-OF-2024-PRO',
        brand: 'Volkswagen',
        category: 'Filters',
        price: 1499,
        originalPrice: 1999,
        stock: 25,
        rating: 4.8,
        reviewCount: 124,
        image: 'https://imgd.aeplcdn.com/1280x720/cw/spare-parts/Volkswagen-Oil-Filter.png',
        images: [],
        description: 'Premium quality oil filter designed specifically for Volkswagen vehicles. Ensures optimal oil flow and filtration for engine protection.',
        features: [
          'Premium filter media for superior filtration',
          'Anti-drain back valve prevents dry starts',
          'High burst strength for durability',
          'Optimized flow for maximum engine protection',
          '15,000 km service life'
        ],
        specifications: {
          'Part Number': 'VW-OF-2024-PRO',
          'Material': 'Synthetic Fiber',
          'Thread Size': 'M20 x 1.5',
          'Height': '95mm',
          'Outer Diameter': '76mm',
          'Gasket Diameter': '62mm'
        },
        compatibility: ['Polo', 'Virtus', 'Taigun', 'Tiguan']
      });
    }
    setLoading(false);
  };

  const handleQuantityChange = (delta) => {
    const newQty = quantity + delta;
    if (newQty >= 1 && newQty <= (part?.stock || 10)) {
      setQuantity(newQty);
    }
  };

  const handleAddToCart = async () => {
    setAddingToCart(true);
    const result = await addItem({
      itemId: part.id,
      itemType: 'part',
      quantity
    });
    setAddingToCart(false);
  };

  const handleWishlist = async () => {
    if (isInWishlist(part.id)) {
      await removeFromWishlist(part.id);
    } else {
      await addToWishlist({ itemId: part.id, itemType: 'part' });
    }
  };

  const checkCompatibility = async () => {
    if (!compatibilityCheck.model || !compatibilityCheck.year) return;
    
    setCheckingCompatibility(true);
    try {
      const response = await partsAPI.checkCompatibility({
        partId: part.id,
        model: compatibilityCheck.model,
        year: compatibilityCheck.year
      });
      setCompatibilityResult(response.data);
    } catch (error) {
      // Demo response
      const isCompatible = part?.compatibility?.some(c => 
        compatibilityCheck.model.toLowerCase().includes(c.toLowerCase())
      );
      setCompatibilityResult({ compatible: isCompatible });
    }
    setCheckingCompatibility(false);
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: part.name,
          text: `Check out ${part.name} on VW Auto Group!`,
          url: window.location.href
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

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="spinner mx-auto mb-4" />
          <p className="text-gray-500">Loading part details...</p>
        </div>
      </div>
    );
  }

  if (!part) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
        <div className="card card-elevated p-12 text-center max-w-md">
          <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Package size={40} className="text-gray-400" />
          </div>
          <h2 className="text-2xl font-bold text-[#001e50] mb-2">Part Not Found</h2>
          <p className="text-gray-500 mb-6">The part you're looking for doesn't exist.</p>
          <Link to="/parts" className="btn btn-primary">Back to Parts Store</Link>
        </div>
      </div>
    );
  }

  const inWishlist = isInWishlist(part.id);
  const discount = part.originalPrice ? Math.round((1 - part.price / part.originalPrice) * 100) : 0;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-100">
        <div className="container mx-auto px-4 py-3">
          <nav className="flex items-center gap-2 text-sm">
            <Link to="/" className="text-gray-500 hover:text-[#001e50]">Home</Link>
            <ChevronRight size={14} className="text-gray-400" />
            <Link to="/parts" className="text-gray-500 hover:text-[#001e50]">Parts Store</Link>
            <ChevronRight size={14} className="text-gray-400" />
            <span className="text-[#001e50] font-medium truncate">{part.name}</span>
          </nav>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Main Product Section */}
          <div className="grid lg:grid-cols-2 gap-8 mb-12">
            {/* Image Section */}
            <div className="space-y-4">
              <div className="card card-elevated p-8 aspect-square flex items-center justify-center relative overflow-hidden">
                {discount > 0 && (
                  <div className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                    -{discount}%
                  </div>
                )}
                {part.image ? (
                  <img
                    src={part.image}
                    alt={part.name}
                    className="max-w-full max-h-full object-contain"
                  />
                ) : (
                  <Package size={120} className="text-gray-300" />
                )}
              </div>

              {/* Thumbnail Gallery */}
              {part.images?.length > 0 && (
                <div className="flex gap-3">
                  {[part.image, ...part.images].slice(0, 4).map((img, index) => (
                    <button
                      key={index}
                      className="w-20 h-20 border-2 border-gray-200 rounded-xl overflow-hidden hover:border-[#001e50] transition"
                    >
                      <img src={img} alt="" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Info Section */}
            <div className="space-y-6">
              <div>
                <p className="text-sm font-semibold text-[#c9a227] uppercase tracking-wider mb-2">
                  {part.brand} • {part.category}
                </p>
                <h1 className="text-3xl font-bold text-[#001e50] mb-2">{part.name}</h1>
                <p className="text-gray-500">Part #: {part.partNumber}</p>
              </div>

              {/* Rating */}
              {part.rating && (
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        size={18}
                        className={i < Math.floor(part.rating) 
                          ? 'text-yellow-400 fill-yellow-400' 
                          : 'text-gray-300'
                        }
                      />
                    ))}
                  </div>
                  <span className="font-semibold">{part.rating}</span>
                  <span className="text-gray-500">({part.reviewCount} reviews)</span>
                </div>
              )}

              {/* Price */}
              <div className="flex items-baseline gap-3">
                <span className="text-4xl font-bold text-[#001e50]">{formatPrice(part.price)}</span>
                {part.originalPrice && part.originalPrice > part.price && (
                  <span className="text-xl text-gray-400 line-through">
                    {formatPrice(part.originalPrice)}
                  </span>
                )}
              </div>

              {/* Stock Status */}
              <div className="flex items-center gap-2">
                {part.stock > 0 ? (
                  <>
                    <CheckCircle size={18} className="text-green-500" />
                    <span className="text-green-600 font-medium">In Stock</span>
                    <span className="text-gray-500">({part.stock} available)</span>
                  </>
                ) : (
                  <>
                    <AlertCircle size={18} className="text-red-500" />
                    <span className="text-red-600 font-medium">Out of Stock</span>
                  </>
                )}
              </div>

              {/* Quantity & Add to Cart */}
              <div className="flex gap-4">
                <div className="qty-selector">
                  <button onClick={() => handleQuantityChange(-1)} disabled={quantity <= 1}>
                    <Minus size={16} />
                  </button>
                  <span>{quantity}</span>
                  <button onClick={() => handleQuantityChange(1)} disabled={quantity >= part.stock}>
                    <Plus size={16} />
                  </button>
                </div>
                <button
                  onClick={handleAddToCart}
                  disabled={addingToCart || part.stock === 0}
                  className="btn btn-primary flex-1"
                >
                  {addingToCart ? (
                    <>
                      <div className="spinner-sm" />
                      Adding...
                    </>
                  ) : (
                    <>
                      <ShoppingCart size={20} />
                      Add to Cart
                    </>
                  )}
                </button>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3">
                <button
                  onClick={handleWishlist}
                  className={`btn flex-1 ${
                    inWishlist 
                      ? 'bg-red-50 text-red-500 border-red-200 hover:bg-red-100' 
                      : 'btn-secondary'
                  }`}
                >
                  <Heart size={18} className={inWishlist ? 'fill-current' : ''} />
                  {inWishlist ? 'In Wishlist' : 'Add to Wishlist'}
                </button>
                <button onClick={handleShare} className="btn btn-ghost">
                  <Share2 size={18} />
                </button>
              </div>

              {/* Trust Badges */}
              <div className="grid grid-cols-3 gap-4 pt-4 border-t border-gray-100">
                <div className="text-center">
                  <Shield size={24} className="mx-auto mb-2 text-green-500" />
                  <p className="text-xs text-gray-600">100% Genuine</p>
                </div>
                <div className="text-center">
                  <Truck size={24} className="mx-auto mb-2 text-[#001e50]" />
                  <p className="text-xs text-gray-600">Fast Delivery</p>
                </div>
                <div className="text-center">
                  <Award size={24} className="mx-auto mb-2 text-[#c9a227]" />
                  <p className="text-xs text-gray-600">Warranty</p>
                </div>
              </div>

              {/* Compatibility Checker */}
              <div className="card p-4 bg-gray-50">
                <h3 className="font-semibold text-[#001e50] mb-3 flex items-center gap-2">
                  <Wrench size={18} />
                  Check Compatibility
                </h3>
                <div className="grid grid-cols-2 gap-3 mb-3">
                  <select
                    className="input-field text-sm"
                    value={compatibilityCheck.model}
                    onChange={(e) => setCompatibilityCheck({ ...compatibilityCheck, model: e.target.value })}
                  >
                    <option value="">Select Model</option>
                    {carModels.map(model => (
                      <option key={model} value={model}>{model}</option>
                    ))}
                  </select>
                  <select
                    className="input-field text-sm"
                    value={compatibilityCheck.year}
                    onChange={(e) => setCompatibilityCheck({ ...compatibilityCheck, year: e.target.value })}
                  >
                    <option value="">Select Year</option>
                    {years.map(year => (
                      <option key={year} value={year}>{year}</option>
                    ))}
                  </select>
                </div>
                <button
                  onClick={checkCompatibility}
                  disabled={!compatibilityCheck.model || !compatibilityCheck.year || checkingCompatibility}
                  className="btn btn-secondary w-full text-sm"
                >
                  {checkingCompatibility ? 'Checking...' : 'Check Compatibility'}
                </button>
                {compatibilityResult && (
                  <div className={`mt-3 p-3 rounded-lg flex items-center gap-2 ${
                    compatibilityResult.compatible 
                      ? 'bg-green-50 text-green-700' 
                      : 'bg-red-50 text-red-700'
                  }`}>
                    {compatibilityResult.compatible ? (
                      <>
                        <CheckCircle size={18} />
                        <span>This part is compatible with your vehicle!</span>
                      </>
                    ) : (
                      <>
                        <AlertCircle size={18} />
                        <span>This part may not be compatible with your vehicle.</span>
                      </>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Tabs Section */}
          <div className="card card-elevated overflow-hidden">
            <div className="flex border-b border-gray-100">
              {[
                { key: 'description', label: 'Description' },
                { key: 'specifications', label: 'Specifications' },
                { key: 'compatibility', label: 'Compatibility' }
              ].map(tab => (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key)}
                  className={`flex-1 py-4 px-6 font-medium transition ${
                    activeTab === tab.key
                      ? 'text-[#001e50] border-b-2 border-[#001e50] bg-gray-50'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            <div className="p-6">
              {activeTab === 'description' && (
                <div>
                  <p className="text-gray-600 mb-6">{part.description}</p>
                  {part.features?.length > 0 && (
                    <div>
                      <h3 className="font-semibold text-[#001e50] mb-3">Key Features</h3>
                      <ul className="space-y-2">
                        {part.features.map((feature, index) => (
                          <li key={index} className="flex items-start gap-2">
                            <Check size={18} className="text-green-500 mt-0.5 flex-shrink-0" />
                            <span className="text-gray-600">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              )}

              {activeTab === 'specifications' && part.specifications && (
                <div className="grid md:grid-cols-2 gap-4">
                  {Object.entries(part.specifications).map(([key, value]) => (
                    <div key={key} className="flex justify-between py-3 border-b border-gray-100">
                      <span className="text-gray-500">{key}</span>
                      <span className="font-medium text-[#001e50]">{value}</span>
                    </div>
                  ))}
                </div>
              )}

              {activeTab === 'compatibility' && (
                <div>
                  <p className="text-gray-600 mb-4">This part is compatible with the following vehicles:</p>
                  <div className="flex flex-wrap gap-2">
                    {part.compatibility?.map((model, index) => (
                      <span key={index} className="badge badge-primary">
                        {model}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
