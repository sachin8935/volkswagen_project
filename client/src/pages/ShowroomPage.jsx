import { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { carsAPI } from '../api';
import { 
  Search, Heart, Grid3X3, LayoutList, X, 
  Car, Fuel, Gauge, ArrowRight, Sparkles, ChevronDown
} from 'lucide-react';
import { useWishlistStore } from '../store';

// Brand data with logos
const brands = [
  { id: 'all', name: 'All Brands', logo: null },
  { id: 'volkswagen', name: 'Volkswagen', logo: '/logos/volkswagen.png' },
  { id: 'audi', name: 'Audi', logo: '/logos/audi.jpeg' },
  { id: 'porsche', name: 'Porsche', logo: '/logos/porsche.png' },
  { id: 'skoda', name: 'Skoda', logo: '/logos/skoda.avif' },
  { id: 'bentley', name: 'Bentley', logo: '/logos/bentley.png' },
  { id: 'lamborghini', name: 'Lamborghini', logo: '/logos/lamborghini.jpg' },
  { id: 'bugatti', name: 'Bugatti', logo: '/logos/buggati.png' },
];

const categories = [
  { id: 'all', label: 'All Types', icon: '🚗' },
  { id: 'sedan', label: 'Sedan', icon: '🚙' },
  { id: 'suv', label: 'SUV', icon: '🚐' },
  { id: 'compact suv', label: 'Compact SUV', icon: '🚕' },
  { id: 'hatchback', label: 'Hatchback', icon: '🚗' },
  { id: 'sports', label: 'Sports', icon: '🏎️' },
  { id: 'luxury', label: 'Luxury', icon: '👑' },
  { id: 'supercar', label: 'Supercar', icon: '⚡' },
  { id: 'hypercar', label: 'Hypercar', icon: '🔥' },
];

const sortOptions = [
  { id: 'featured', label: 'Featured' },
  { id: 'price-low', label: 'Price: Low to High' },
  { id: 'price-high', label: 'Price: High to Low' },
  { id: 'name', label: 'Name: A to Z' },
];

export default function ShowroomPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [cars, setCars] = useState([]);
  const [allCars, setAllCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedBrand, setSelectedBrand] = useState(searchParams.get('brand') || 'all');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('featured');
  const [viewMode, setViewMode] = useState('grid');
  const [brandCounts, setBrandCounts] = useState({});

  const { items: wishlist, addItem, removeItem } = useWishlistStore();

  useEffect(() => {
    loadCars();
  }, []);

  useEffect(() => {
    filterAndSortCars();
  }, [allCars, selectedBrand, selectedCategory, sortBy, searchQuery]);

  useEffect(() => {
    if (selectedBrand !== 'all') {
      setSearchParams({ brand: selectedBrand });
    } else {
      setSearchParams({});
    }
  }, [selectedBrand, setSearchParams]);

  const loadCars = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await carsAPI.getAll();
      // Handle both direct array and { data: [...] } response formats
      const data = Array.isArray(response) ? response : (response?.data || []);
      setAllCars(data);
      
      // Calculate brand counts
      const counts = { all: data.length };
      data.forEach(car => {
        const brand = car.brand?.toLowerCase() || 'unknown';
        counts[brand] = (counts[brand] || 0) + 1;
      });
      setBrandCounts(counts);
    } catch (err) {
      console.error('Failed to load cars:', err);
      setError('Failed to load vehicles. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const filterAndSortCars = () => {
    let filtered = [...allCars];

    // Filter by brand
    if (selectedBrand !== 'all') {
      filtered = filtered.filter(car => 
        car.brand?.toLowerCase() === selectedBrand.toLowerCase()
      );
    }

    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(car => 
        car.category?.toLowerCase() === selectedCategory.toLowerCase()
      );
    }

    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase().trim();
      filtered = filtered.filter(car => 
        car.name?.toLowerCase().includes(query) ||
        car.brand?.toLowerCase().includes(query) ||
        car.tagline?.toLowerCase().includes(query) ||
        car.category?.toLowerCase().includes(query)
      );
    }

    // Sort
    switch (sortBy) {
      case 'price-low':
        filtered.sort((a, b) => (a.startingPrice || 0) - (b.startingPrice || 0));
        break;
      case 'price-high':
        filtered.sort((a, b) => (b.startingPrice || 0) - (a.startingPrice || 0));
        break;
      case 'name':
        filtered.sort((a, b) => (a.name || '').localeCompare(b.name || ''));
        break;
      default:
        break;
    }

    setCars(filtered);
  };

  const formatPrice = (price) => {
    if (!price) return 'Price on Request';
    if (price >= 10000000) return `₹${(price / 10000000).toFixed(2)} Cr`;
    return `₹${(price / 100000).toFixed(2)} Lakh`;
  };

  const isInWishlist = (carId) => wishlist.some(item => item.id === carId);

  const toggleWishlist = (e, car) => {
    e.preventDefault();
    e.stopPropagation();
    if (isInWishlist(car.id)) {
      removeItem(car.id);
    } else {
      addItem({ ...car, type: 'car' });
    }
  };

  const clearFilters = () => {
    setSelectedBrand('all');
    setSelectedCategory('all');
    setSearchQuery('');
    setSortBy('featured');
  };

  const hasActiveFilters = selectedBrand !== 'all' || selectedCategory !== 'all' || searchQuery.trim();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Header */}
      <section className="relative bg-gradient-to-br from-[#001e50] via-[#002d6b] to-[#001333] text-white overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#c9a227] rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-white rounded-full blur-3xl" />
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-16 md:py-24">
          <div className="max-w-3xl">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-14 h-14 bg-[#c9a227] rounded-2xl flex items-center justify-center shadow-lg">
                <Car size={28} className="text-[#001e50]" />
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full">
                <Sparkles size={16} className="text-[#c9a227]" />
                <span className="text-sm font-medium">7 Premium Brands</span>
              </div>
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              Digital <span className="text-[#c9a227]">Showroom</span>
            </h1>
            
            <p className="text-lg sm:text-xl text-white/70 max-w-2xl leading-relaxed">
              Explore our complete lineup of luxury vehicles from Volkswagen Group. 
              From everyday elegance to exotic supercars – find your perfect drive.
            </p>

            {/* Quick Stats */}
            <div className="flex flex-wrap gap-6 mt-8">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
                <span className="text-white/60 text-sm">{allCars.length} Vehicles Available</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-[#c9a227] rounded-full" />
                <span className="text-white/60 text-sm">Instant Price Quote</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Brand Filter Bar */}
      <section className="bg-white border-b border-gray-200 sticky top-[80px] z-40 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center gap-2 py-4 overflow-x-auto scrollbar-hide">
            {brands.map((brand) => (
              <button
                key={brand.id}
                onClick={() => setSelectedBrand(brand.id)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-medium whitespace-nowrap transition-all duration-200 ${
                  selectedBrand === brand.id
                    ? 'bg-[#001e50] text-white shadow-lg scale-105'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {brand.logo && (
                  <div className={`w-6 h-6 rounded-md overflow-hidden flex items-center justify-center ${
                    selectedBrand === brand.id ? 'bg-white/20' : 'bg-white'
                  }`}>
                    <img src={brand.logo} alt={brand.name} className="w-5 h-5 object-contain" />
                  </div>
                )}
                <span>{brand.name}</span>
                <span className={`text-xs px-1.5 py-0.5 rounded-md ${
                  selectedBrand === brand.id ? 'bg-white/20' : 'bg-gray-200'
                }`}>
                  {brandCounts[brand.id] || 0}
                </span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        {/* Filter Bar */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 mb-8">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search */}
            <div className="relative flex-1">
              <Search size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search by name, brand, or type..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-10 py-3 rounded-xl border border-gray-200 focus:border-[#001e50] focus:ring-2 focus:ring-[#001e50]/10 outline-none transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <X size={18} />
                </button>
              )}
            </div>

            {/* Filters Row */}
            <div className="flex items-center gap-3 flex-wrap lg:flex-nowrap">
              {/* Category Dropdown */}
              <div className="relative">
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="appearance-none pl-4 pr-10 py-3 rounded-xl border border-gray-200 bg-white focus:border-[#001e50] focus:ring-2 focus:ring-[#001e50]/10 outline-none cursor-pointer min-w-[160px]"
                >
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.icon} {cat.label}
                    </option>
                  ))}
                </select>
                <ChevronDown size={18} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
              </div>

              {/* Sort Dropdown */}
              <div className="relative">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="appearance-none pl-4 pr-10 py-3 rounded-xl border border-gray-200 bg-white focus:border-[#001e50] focus:ring-2 focus:ring-[#001e50]/10 outline-none cursor-pointer min-w-[180px]"
                >
                  {sortOptions.map((opt) => (
                    <option key={opt.id} value={opt.id}>{opt.label}</option>
                  ))}
                </select>
                <ChevronDown size={18} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
              </div>

              {/* View Toggle */}
              <div className="hidden sm:flex items-center bg-gray-100 p-1 rounded-xl">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2.5 rounded-lg transition-all ${
                    viewMode === 'grid' 
                      ? 'bg-white text-[#001e50] shadow-sm' 
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                  title="Grid view"
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
                  title="List view"
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
              
              {selectedBrand !== 'all' && (
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#001e50]/10 text-[#001e50] rounded-full text-sm font-medium">
                  {brands.find(b => b.id === selectedBrand)?.name}
                  <button 
                    onClick={() => setSelectedBrand('all')} 
                    className="hover:bg-[#001e50]/20 rounded-full p-0.5"
                  >
                    <X size={14} />
                  </button>
                </span>
              )}
              
              {selectedCategory !== 'all' && (
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#001e50]/10 text-[#001e50] rounded-full text-sm font-medium">
                  {categories.find(c => c.id === selectedCategory)?.label}
                  <button 
                    onClick={() => setSelectedCategory('all')} 
                    className="hover:bg-[#001e50]/20 rounded-full p-0.5"
                  >
                    <X size={14} />
                  </button>
                </span>
              )}
              
              {searchQuery.trim() && (
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#001e50]/10 text-[#001e50] rounded-full text-sm font-medium">
                  "{searchQuery}"
                  <button 
                    onClick={() => setSearchQuery('')} 
                    className="hover:bg-[#001e50]/20 rounded-full p-0.5"
                  >
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

        {/* Results Header */}
        <div className="flex items-center justify-between mb-6">
          <p className="text-gray-600">
            Showing <span className="font-bold text-[#001e50]">{cars.length}</span> of {allCars.length} vehicles
          </p>
        </div>

        {/* Error State */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-2xl p-6 mb-8 text-center">
            <p className="text-red-600 mb-4">{error}</p>
            <button 
              onClick={loadCars}
              className="px-6 py-2 bg-red-600 text-white rounded-xl hover:bg-red-700 transition-colors"
            >
              Try Again
            </button>
          </div>
        )}

        {/* Loading State */}
        {loading ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-white rounded-2xl overflow-hidden shadow-sm">
                <div className="h-52 bg-gray-200 animate-pulse" />
                <div className="p-6 space-y-4">
                  <div className="h-4 bg-gray-200 rounded-lg animate-pulse w-1/4" />
                  <div className="h-6 bg-gray-200 rounded-lg animate-pulse w-3/4" />
                  <div className="h-4 bg-gray-200 rounded-lg animate-pulse w-1/2" />
                  <div className="flex justify-between pt-4">
                    <div className="h-8 bg-gray-200 rounded-lg animate-pulse w-1/3" />
                    <div className="h-10 bg-gray-200 rounded-lg animate-pulse w-24" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : cars.length > 0 ? (
          /* Grid/List View */
          viewMode === 'grid' ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {cars.map((car) => (
                <Link
                  key={car.id}
                  to={`/showroom/${car.id}`}
                  className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-1 border border-gray-100"
                >
                  {/* Image */}
                  <div className="relative h-52 bg-gray-100 overflow-hidden">
                    <img
                      src={car.image}
                      alt={car.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      onError={(e) => {
                        e.target.src = 'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=400&auto=format&fit=crop&q=80';
                      }}
                    />
                    
                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    
                    {/* Brand Badge */}
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1.5 bg-[#c9a227] text-[#001e50] rounded-full text-xs font-bold shadow-lg">
                        {car.brand}
                      </span>
                    </div>
                    
                    {/* Wishlist Button */}
                    <button
                      onClick={(e) => toggleWishlist(e, car)}
                      className={`absolute top-4 right-4 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
                        isInWishlist(car.id)
                          ? 'bg-red-500 text-white'
                          : 'bg-white/90 text-gray-600 hover:bg-white hover:text-red-500 opacity-0 group-hover:opacity-100'
                      }`}
                    >
                      <Heart size={18} fill={isInWishlist(car.id) ? 'currentColor' : 'none'} />
                    </button>

                    {/* Quick View Overlay */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
                      <span className="px-6 py-3 bg-white/95 backdrop-blur-sm rounded-full font-semibold text-[#001e50] transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 shadow-lg">
                        View Details
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-xs text-gray-500 uppercase tracking-wider font-medium px-2 py-1 bg-gray-100 rounded-md">
                        {car.category}
                      </span>
                    </div>
                    
                    <h3 className="text-xl font-bold text-[#001e50] mb-1 group-hover:text-[#003580] transition-colors">
                      {car.name}
                    </h3>
                    
                    <p className="text-gray-500 text-sm line-clamp-1 mb-4">
                      {car.tagline}
                    </p>

                    {/* Specs */}
                    {car.specs && (
                      <div className="flex items-center gap-4 mb-4 text-xs text-gray-500">
                        {car.specs.engine && (
                          <span className="flex items-center gap-1">
                            <Fuel size={14} className="text-[#001e50]" />
                            {car.specs.engine?.split('/')[0]?.trim()}
                          </span>
                        )}
                        {car.specs.power && (
                          <span className="flex items-center gap-1">
                            <Gauge size={14} className="text-[#001e50]" />
                            {car.specs.power?.split('/')[0]?.trim()}
                          </span>
                        )}
                      </div>
                    )}

                    {/* Price & CTA */}
                    <div className="flex items-end justify-between pt-4 border-t border-gray-100">
                      <div>
                        <p className="text-xs text-gray-400 uppercase tracking-wide">Starting at</p>
                        <p className="text-xl font-bold text-[#001e50]">
                          {formatPrice(car.startingPrice)}
                        </p>
                      </div>
                      <div className="w-10 h-10 bg-[#001e50]/10 rounded-full flex items-center justify-center group-hover:bg-[#001e50] transition-colors">
                        <ArrowRight size={18} className="text-[#001e50] group-hover:text-white transition-colors" />
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            /* List View */
            <div className="space-y-4">
              {cars.map((car) => (
                <Link
                  key={car.id}
                  to={`/showroom/${car.id}`}
                  className="group flex flex-col md:flex-row bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100"
                >
                  {/* Image */}
                  <div className="md:w-80 h-48 md:h-auto flex-shrink-0 relative overflow-hidden">
                    <img
                      src={car.image}
                      alt={car.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      onError={(e) => {
                        e.target.src = 'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=400&auto=format&fit=crop&q=80';
                      }}
                    />
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1.5 bg-[#c9a227] text-[#001e50] rounded-full text-xs font-bold shadow-lg">
                        {car.brand}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1 p-6 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-xs text-gray-500 uppercase tracking-wider font-medium px-2 py-1 bg-gray-100 rounded-md">
                          {car.category}
                        </span>
                        {car.inStock !== false && (
                          <span className="text-xs text-emerald-600 flex items-center gap-1">
                            <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full" />
                            In Stock
                          </span>
                        )}
                      </div>
                      
                      <h3 className="text-2xl font-bold text-[#001e50] group-hover:text-[#003580] transition-colors">
                        {car.name}
                      </h3>
                      
                      <p className="text-gray-600 mt-2">{car.tagline}</p>

                      {/* Specs */}
                      {car.specs && (
                        <div className="flex items-center gap-6 mt-4 text-sm text-gray-500">
                          {car.specs.engine && (
                            <span className="flex items-center gap-2">
                              <Fuel size={16} className="text-[#001e50]" />
                              {car.specs.engine}
                            </span>
                          )}
                          {car.specs.power && (
                            <span className="flex items-center gap-2">
                              <Gauge size={16} className="text-[#001e50]" />
                              {car.specs.power}
                            </span>
                          )}
                        </div>
                      )}
                    </div>

                    {/* Footer */}
                    <div className="flex items-center justify-between mt-6 pt-4 border-t border-gray-100">
                      <div>
                        <p className="text-xs text-gray-400 uppercase tracking-wide">Starting at</p>
                        <p className="text-2xl font-bold text-[#001e50]">
                          {formatPrice(car.startingPrice)}
                        </p>
                      </div>
                      
                      <div className="flex items-center gap-3">
                        <button
                          onClick={(e) => toggleWishlist(e, car)}
                          className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all ${
                            isInWishlist(car.id)
                              ? 'bg-red-50 text-red-500'
                              : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
                          }`}
                        >
                          <Heart size={20} fill={isInWishlist(car.id) ? 'currentColor' : 'none'} />
                        </button>
                        
                        <span className="px-6 py-3 bg-[#001e50] text-white rounded-xl font-semibold group-hover:bg-[#003580] transition-colors flex items-center gap-2">
                          View Details
                          <ArrowRight size={18} />
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )
        ) : (
          /* Empty State */
          <div className="text-center py-20">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Car size={48} className="text-gray-300" />
            </div>
            <h3 className="text-2xl font-bold text-gray-700 mb-2">No vehicles found</h3>
            <p className="text-gray-500 mb-8 max-w-md mx-auto">
              We couldn't find any vehicles matching your criteria. Try adjusting your filters or search query.
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
  );
}
