import { Link, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { 
  ShoppingCart, Heart, Menu, X, Car, Wrench, Settings, 
  ChevronDown, User, Search 
} from 'lucide-react';
import { useCartStore, useWishlistStore } from '../../store';

const brands = [
  { name: 'Volkswagen', slug: 'volkswagen', logo: '/logos/volkswagen.png' },
  { name: 'Audi', slug: 'audi', logo: '/logos/audi.jpeg' },
  { name: 'Porsche', slug: 'porsche', logo: '/logos/porsche.png' },
  { name: 'Skoda', slug: 'skoda', logo: '/logos/skoda.avif' },
  { name: 'Bentley', slug: 'bentley', logo: '/logos/bentley.png' },
  { name: 'Lamborghini', slug: 'lamborghini', logo: '/logos/lamborghini.jpg' },
  { name: 'Bugatti', slug: 'bugatti', logo: '/logos/buggati.png' },
];

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showBrandDropdown, setShowBrandDropdown] = useState(false);
  const location = useLocation();
  const cartItems = useCartStore((state) => state.totals.itemCount);
  const wishlistItems = useWishlistStore((state) => state.items.length);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isActive = (path) => location.pathname === path || location.pathname.startsWith(path + '/');

  const navLinks = [
    { path: '/showroom', label: 'Showroom', icon: Car },
    { path: '/parts', label: 'Genuine Parts', icon: Settings },
    { path: '/service', label: 'Service', icon: Wrench },
  ];

  return (
    <>
      {/* Top Bar */}
      <div className="bg-[#001333] text-white/80 text-sm py-2 hidden md:block">
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <span>🌍 India</span>
            <span>📞 1800-102-0909</span>
          </div>
          <div className="flex items-center gap-6">
            <Link to="/track-order" className="hover:text-white transition">Track Orders</Link>
            <span className="text-white/40">|</span>
            <Link to="#" className="hover:text-white transition">Dealer Locator</Link>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <nav className={`sticky top-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white shadow-lg' 
          : 'bg-[#001e50]'
      }`}>
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-3 group">
              <div className={`w-12 h-12 rounded-full flex items-center justify-center overflow-hidden transition-all duration-300 ${
                isScrolled ? 'bg-white shadow-md' : 'bg-white'
              }`}>
                <img 
                  src="/logos/volkswagen.png" 
                  alt="Volkswagen" 
                  className="w-10 h-10 object-contain"
                />
              </div>
              <div className="hidden sm:block">
                <span className={`font-bold text-xl block transition-colors ${
                  isScrolled ? 'text-[#001e50]' : 'text-white'
                }`}>Volkswagen</span>
                <span className={`text-xs transition-colors ${
                  isScrolled ? 'text-gray-500' : 'text-white/60'
                }`}>Group India</span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-1">
              {/* Brands Dropdown */}
              <div 
                className="relative"
                onMouseEnter={() => setShowBrandDropdown(true)}
                onMouseLeave={() => setShowBrandDropdown(false)}
              >
                <button className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-medium transition-all ${
                  isScrolled 
                    ? 'text-gray-700 hover:bg-gray-100' 
                    : 'text-white hover:bg-white/10'
                }`}>
                  <span>Brands</span>
                  <ChevronDown size={16} className={`transition-transform ${showBrandDropdown ? 'rotate-180' : ''}`} />
                </button>
                
                {/* Brands Dropdown Menu */}
                <div className={`absolute top-full left-0 mt-2 w-64 bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden transition-all duration-300 ${
                  showBrandDropdown ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible -translate-y-2'
                }`}>
                  <div className="p-2">
                    {brands.map((brand) => (
                      <Link
                        key={brand.slug}
                        to={`/showroom?brand=${brand.slug}`}
                        className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-gray-50 transition group"
                      >
                        <div className="w-10 h-10 bg-gray-50 rounded-lg flex items-center justify-center overflow-hidden p-1">
                          <img 
                            src={brand.logo} 
                            alt={brand.name}
                            className="w-full h-full object-contain"
                          />
                        </div>
                        <span className="font-medium text-gray-800 group-hover:text-[#001e50]">{brand.name}</span>
                      </Link>
                    ))}
                  </div>
                  <div className="border-t border-gray-100 p-3 bg-gray-50">
                    <Link 
                      to="/showroom" 
                      className="block text-center text-sm font-semibold text-[#001e50] hover:underline"
                    >
                      View All Models →
                    </Link>
                  </div>
                </div>
              </div>

              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-medium transition-all ${
                    isActive(link.path)
                      ? isScrolled 
                        ? 'bg-[#001e50] text-white' 
                        : 'bg-white text-[#001e50]'
                      : isScrolled
                        ? 'text-gray-700 hover:bg-gray-100'
                        : 'text-white hover:bg-white/10'
                  }`}
                >
                  <link.icon size={18} />
                  <span>{link.label}</span>
                </Link>
              ))}
            </div>

            {/* Right Section */}
            <div className="flex items-center gap-2 md:gap-3">
              {/* Search Button */}
              <button className={`p-2.5 rounded-xl transition-all hidden md:flex ${
                isScrolled 
                  ? 'hover:bg-gray-100 text-gray-600' 
                  : 'hover:bg-white/10 text-white'
              }`}>
                <Search size={20} />
              </button>

              {/* Wishlist */}
              <Link
                to="/wishlist"
                className={`relative p-2.5 rounded-xl transition-all ${
                  isScrolled 
                    ? 'hover:bg-gray-100 text-gray-600' 
                    : 'hover:bg-white/10 text-white'
                }`}
              >
                <Heart size={20} />
                {wishlistItems > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-semibold animate-pulse">
                    {wishlistItems}
                  </span>
                )}
              </Link>

              {/* Cart */}
              <Link
                to="/cart"
                className={`relative p-2.5 rounded-xl transition-all ${
                  isScrolled 
                    ? 'hover:bg-gray-100 text-gray-600' 
                    : 'hover:bg-white/10 text-white'
                }`}
              >
                <ShoppingCart size={20} />
                {cartItems > 0 && (
                  <span className="absolute -top-1 -right-1 bg-[#c9a227] text-[#001e50] text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold">
                    {cartItems}
                  </span>
                )}
              </Link>

              {/* Mobile Menu Button */}
              <button
                className={`lg:hidden p-2.5 rounded-xl transition-all ${
                  isScrolled 
                    ? 'hover:bg-gray-100 text-gray-600' 
                    : 'hover:bg-white/10 text-white'
                }`}
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        <div className={`lg:hidden absolute top-full left-0 right-0 bg-white shadow-2xl border-t border-gray-100 transition-all duration-300 ${
          isMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'
        }`}>
          <div className="max-h-[80vh] overflow-y-auto">
            <div className="p-4">
              {/* Mobile Search */}
              <div className="relative mb-4">
                <Search size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                <input 
                  type="text" 
                  placeholder="Search cars, parts, services..."
                  className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:border-[#001e50] focus:ring-2 focus:ring-[#001e50]/20 outline-none"
                />
              </div>

              {/* Mobile Nav Links */}
              <div className="space-y-2">
                {navLinks.map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={`flex items-center gap-3 px-4 py-3.5 rounded-xl font-medium transition ${
                      isActive(link.path)
                        ? 'bg-[#001e50] text-white'
                        : 'text-gray-700 hover:bg-gray-50'
                    }`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <link.icon size={22} />
                    <span>{link.label}</span>
                  </Link>
                ))}
              </div>

              {/* Mobile Brands */}
              <div className="mt-6 pt-6 border-t border-gray-200">
                <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider px-4 mb-3">Our Brands</h3>
                <div className="grid grid-cols-2 gap-2">
                  {brands.map((brand) => (
                    <Link
                      key={brand.slug}
                      to={`/showroom?brand=${brand.slug}`}
                      className="flex items-center gap-2 px-3 py-2.5 rounded-xl hover:bg-gray-50 transition"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center overflow-hidden p-1">
                        <img 
                          src={brand.logo} 
                          alt={brand.name}
                          className="w-full h-full object-contain"
                        />
                      </div>
                      <span className="text-sm font-medium text-gray-700">{brand.name}</span>
                    </Link>
                  ))}
                </div>
              </div>

              {/* Mobile Contact */}
              <div className="mt-6 pt-6 border-t border-gray-200">
                <div className="bg-[#001e50] rounded-2xl p-4 text-white">
                  <p className="font-semibold mb-2">Need Assistance?</p>
                  <p className="text-white/70 text-sm mb-3">Call us for personalized help</p>
                  <a href="tel:1800-102-0909" className="btn btn-accent w-full">
                    📞 1800-102-0909
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}
