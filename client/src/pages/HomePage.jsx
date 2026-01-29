import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { 
  ArrowRight, 
  Car, 
  Wrench, 
  Settings, 
  Shield, 
  Award, 
  Clock, 
  ChevronRight,
  Sparkles,
  Star
} from 'lucide-react';
import { carsAPI } from '../api';

// Brand colors
const COLORS = {
  primary: '#001e50',
  accent: '#c9a227',
  dark: '#001333',
};

export default function HomePage() {
  const [featuredCars, setFeaturedCars] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const response = await carsAPI.getAll();
        // Handle both { data: [...] } and direct array responses
        const carsData = response?.data || response || [];
        const shuffled = [...carsData].sort(() => 0.5 - Math.random());
        setFeaturedCars(shuffled.slice(0, 6));
      } catch (error) {
        console.error('Error fetching cars:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchCars();
  }, []);

  const formatPrice = (price) => {
    if (price >= 10000000) return `₹${(price / 10000000).toFixed(2)} Cr`;
    return `₹${(price / 100000).toFixed(2)} Lakh`;
  };

  // Brand logos for the marquee
  const brands = [
    { name: 'Volkswagen', slug: 'volkswagen', logo: '/logos/volkswagen.png' },
    { name: 'Audi', slug: 'audi', logo: '/logos/audi.jpeg' },
    { name: 'Porsche', slug: 'porsche', logo: '/logos/porsche.png' },
    { name: 'Skoda', slug: 'skoda', logo: '/logos/skoda.avif' },
    { name: 'Bentley', slug: 'bentley', logo: '/logos/bentley.png' },
    { name: 'Lamborghini', slug: 'lamborghini', logo: '/logos/lamborghini.jpg' },
    { name: 'Bugatti', slug: 'bugatti', logo: '/logos/buggati.png' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      
      {/* ==================== HERO SECTION ==================== */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden">
        {/* Background */}
        <div 
          className="absolute inset-0"
          style={{
            background: `linear-gradient(135deg, ${COLORS.primary} 0%, ${COLORS.dark} 100%)`
          }}
        />
        
        {/* Decorative Elements - Animated */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div 
            className="absolute -top-1/2 -right-1/4 w-[800px] h-[800px] rounded-full opacity-10 animate-pulse"
            style={{ 
              background: `radial-gradient(circle, ${COLORS.accent} 0%, transparent 70%)`,
              animationDuration: '4s'
            }}
          />
          <div 
            className="absolute -bottom-1/4 -left-1/4 w-[600px] h-[600px] rounded-full opacity-5 animate-pulse"
            style={{ 
              background: `radial-gradient(circle, white 0%, transparent 70%)`,
              animationDuration: '5s',
              animationDelay: '1s'
            }}
          />
          {/* Floating particles */}
          <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-white/20 rounded-full animate-bounce" style={{ animationDuration: '3s' }} />
          <div className="absolute top-1/3 right-1/3 w-3 h-3 bg-[#c9a227]/30 rounded-full animate-bounce" style={{ animationDuration: '4s', animationDelay: '1s' }} />
          <div className="absolute bottom-1/3 left-1/3 w-2 h-2 bg-white/10 rounded-full animate-bounce" style={{ animationDuration: '3.5s', animationDelay: '0.5s' }} />
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 py-20 w-full">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            
            {/* Left Content */}
            <div className="text-white">
              {/* Badge */}
              <div 
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold mb-8 animate-fade-in"
                style={{ backgroundColor: `${COLORS.accent}20`, color: COLORS.accent }}
              >
                <Sparkles size={16} className="animate-spin" style={{ animationDuration: '3s' }} />
                <span>VOLKSWAGEN GROUP INDIA</span>
              </div>

              {/* Heading */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6">
                German Engineering.
                <br />
                <span style={{ color: COLORS.accent }}>Indian Roads.</span>
              </h1>

              {/* Description */}
              <p className="text-lg text-white/70 mb-8 max-w-lg leading-relaxed">
                Experience the complete Volkswagen Group portfolio. From everyday elegance 
                to exotic supercars – discover 7 premium brands in one digital showroom.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-wrap gap-4 mb-12">
                <Link 
                  to="/showroom" 
                  className="group inline-flex items-center gap-3 px-8 py-4 rounded-xl font-bold text-[#001e50] transition-all duration-300 hover:scale-105 hover:shadow-xl"
                  style={{ backgroundColor: COLORS.accent }}
                >
                  Explore Showroom
                  <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link 
                  to="/service" 
                  className="inline-flex items-center gap-3 px-8 py-4 rounded-xl font-bold text-white border-2 border-white/20 hover:bg-white/10 transition-all duration-300"
                >
                  Book Service
                </Link>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-6">
                {[
                  { number: '7', label: 'Premium Brands', icon: '🏆' },
                  { number: '50+', label: 'Car Models', icon: '🚗' },
                  { number: '100+', label: 'Service Centers', icon: '🔧' },
                ].map((stat, index) => (
                  <div 
                    key={index} 
                    className="text-center sm:text-left p-4 rounded-xl bg-white/5 backdrop-blur-sm hover:bg-white/10 transition-all duration-300 cursor-default"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className="text-2xl mb-1">{stat.icon}</div>
                    <div className="text-3xl font-bold" style={{ color: COLORS.accent }}>{stat.number}</div>
                    <div className="text-sm text-white/60">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right - Hero Image */}
            <div className="hidden lg:block relative">
              {/* Animated glow effect */}
              <div 
                className="absolute -inset-4 rounded-3xl opacity-30 blur-2xl animate-pulse"
                style={{ background: `linear-gradient(135deg, ${COLORS.accent} 0%, transparent 70%)` }}
              />
              
              <div className="relative w-full aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl group">
                <img 
                  src="https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800&auto=format&fit=crop&q=80" 
                  alt="Luxury Porsche Car"
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                
                {/* Floating Card with animation */}
                <div className="absolute bottom-6 left-6 right-6 bg-white/95 backdrop-blur-md rounded-2xl p-5 shadow-xl transform hover:scale-[1.02] transition-all duration-300">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-500">Featured Collection</p>
                      <p className="font-bold text-[#001e50] text-lg">2026 Models Available</p>
                    </div>
                    <Link 
                      to="/showroom" 
                      className="w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-lg"
                      style={{ backgroundColor: COLORS.accent }}
                    >
                      <ArrowRight size={20} className="text-[#001e50]" />
                    </Link>
                  </div>
                </div>

                {/* Floating badge */}
                <div className="absolute top-6 right-6 bg-white/90 backdrop-blur-sm rounded-full px-4 py-2 shadow-lg animate-bounce">
                  <span className="text-sm font-bold text-[#001e50]">✨ New Arrivals</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==================== BRAND MARQUEE ==================== */}
      <section className="bg-white py-10 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6">
          <p className="text-center text-sm text-gray-400 uppercase tracking-widest mb-8 font-medium">
            Our Premium Brands
          </p>
          <div className="flex items-center justify-between gap-8 overflow-x-auto scrollbar-hide pb-2">
            {brands.map((brand, index) => (
              <Link 
                key={index} 
                to={`/showroom?brand=${brand.slug}`}
                className="flex-shrink-0 group flex flex-col items-center gap-3 px-4 py-3 rounded-2xl hover:bg-gray-50 transition-all duration-300"
              >
                <div className="w-16 h-16 bg-gray-50 rounded-2xl flex items-center justify-center p-2 group-hover:shadow-lg group-hover:scale-110 transition-all duration-300">
                  <img 
                    src={brand.logo} 
                    alt={brand.name}
                    className="w-full h-full object-contain"
                  />
                </div>
                <span className="text-gray-500 group-hover:text-[#001e50] font-semibold text-sm transition-colors duration-300">
                  {brand.name}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== SERVICES SECTION ==================== */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          
          {/* Section Header */}
          <div className="text-center mb-16">
            <span 
              className="inline-block px-4 py-2 rounded-full text-sm font-semibold mb-4"
              style={{ backgroundColor: `${COLORS.primary}10`, color: COLORS.primary }}
            >
              OUR SERVICES
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-[#001e50] mb-4">
              Everything You Need, One Place
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              From exploring our showroom to maintaining your vehicle – we've got you covered
            </p>
          </div>

          {/* Service Cards */}
          <div className="grid md:grid-cols-3 gap-8">
            
            {/* Digital Showroom Card */}
            <div className="group relative bg-gradient-to-br from-[#001e50] to-[#003580] rounded-2xl p-8 text-white overflow-hidden hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
              <div 
                className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6"
                style={{ backgroundColor: COLORS.accent }}
              >
                <Car className="text-[#001e50]" size={28} />
              </div>
              <h3 className="text-2xl font-bold mb-3">Digital Showroom</h3>
              <p className="text-white/70 mb-6 leading-relaxed">
                Explore 7 premium brands with detailed specifications, 360° views, and transparent pricing.
              </p>
              <Link 
                to="/showroom" 
                className="inline-flex items-center gap-2 font-semibold hover:gap-3 transition-all"
                style={{ color: COLORS.accent }}
              >
                Explore Now <ArrowRight size={18} />
              </Link>
            </div>

            {/* Genuine Parts Card */}
            <div className="group bg-white border-2 border-gray-100 rounded-2xl p-8 hover:border-[#001e50] hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
              <div className="w-16 h-16 bg-emerald-100 rounded-2xl flex items-center justify-center mb-6">
                <Settings className="text-emerald-600" size={28} />
              </div>
              <h3 className="text-2xl font-bold text-[#001e50] mb-3">Genuine Parts</h3>
              <p className="text-gray-600 mb-6 leading-relaxed">
                100% authentic OEM parts with VIN-based compatibility check and doorstep delivery.
              </p>
              <Link 
                to="/parts" 
                className="inline-flex items-center gap-2 text-[#001e50] font-semibold hover:gap-3 transition-all"
              >
                Shop Parts <ArrowRight size={18} />
              </Link>
            </div>

            {/* Service Booking Card */}
            <div className="group bg-white border-2 border-gray-100 rounded-2xl p-8 hover:border-[#001e50] hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
              <div className="w-16 h-16 bg-orange-100 rounded-2xl flex items-center justify-center mb-6">
                <Wrench className="text-orange-600" size={28} />
              </div>
              <h3 className="text-2xl font-bold text-[#001e50] mb-3">Service Booking</h3>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Book appointments online, track service status in real-time, and view complete history.
              </p>
              <Link 
                to="/service" 
                className="inline-flex items-center gap-2 text-[#001e50] font-semibold hover:gap-3 transition-all"
              >
                Book Now <ArrowRight size={18} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ==================== FEATURED CARS SECTION ==================== */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          
          {/* Section Header */}
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
            <div>
              <span 
                className="inline-block px-4 py-2 rounded-full text-sm font-semibold mb-4"
                style={{ backgroundColor: `${COLORS.accent}20`, color: COLORS.primary }}
              >
                FEATURED COLLECTION
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-[#001e50]">
                Handpicked For You
              </h2>
            </div>
            <Link 
              to="/showroom" 
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#001e50] text-white rounded-xl font-semibold hover:bg-[#003580] transition-colors"
            >
              View All Models <ChevronRight size={18} />
            </Link>
          </div>

          {/* Cars Grid */}
          {loading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="bg-white rounded-2xl overflow-hidden shadow-sm">
                  <div className="h-52 bg-gray-200 animate-pulse" />
                  <div className="p-6 space-y-4">
                    <div className="h-6 bg-gray-200 rounded-lg animate-pulse w-3/4" />
                    <div className="h-4 bg-gray-200 rounded-lg animate-pulse w-1/2" />
                    <div className="h-8 bg-gray-200 rounded-lg animate-pulse w-2/3" />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredCars.map((car) => (
                <Link 
                  key={car.id} 
                  to={`/showroom/${car.id}`} 
                  className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-gray-100"
                >
                  {/* Image Container */}
                  <div className="relative h-52 bg-gray-100 overflow-hidden">
                    <img
                      src={car.image}
                      alt={car.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      onError={(e) => {
                        e.target.src = `https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=400&auto=format&fit=crop&q=80`;
                      }}
                    />
                    
                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    
                    {/* Brand Badge */}
                    <div className="absolute top-4 left-4">
                      <span 
                        className="px-3 py-1.5 rounded-full text-xs font-bold text-[#001e50]"
                        style={{ backgroundColor: COLORS.accent }}
                      >
                        {car.brand}
                      </span>
                    </div>

                    {/* Quick View Button */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
                      <span className="px-6 py-3 bg-white/95 backdrop-blur-sm rounded-full font-semibold text-[#001e50] transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                        View Details
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-bold text-xl text-[#001e50] group-hover:text-[#003580] transition-colors">
                        {car.name}
                      </h3>
                    </div>
                    
                    <p className="text-gray-500 text-sm mb-4 flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-emerald-500" />
                      {car.category}
                    </p>
                    
                    <div className="flex items-end justify-between pt-4 border-t border-gray-100">
                      <div>
                        <p className="text-xs text-gray-400 uppercase tracking-wide">Starting at</p>
                        <p className="text-2xl font-bold text-[#001e50]">
                          {formatPrice(car.startingPrice)}
                        </p>
                      </div>
                      <div 
                        className="w-10 h-10 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform"
                        style={{ backgroundColor: `${COLORS.primary}10` }}
                      >
                        <ArrowRight 
                          size={18} 
                          className="text-[#001e50] group-hover:translate-x-0.5 transition-transform" 
                        />
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ==================== WHY CHOOSE US ==================== */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            
            {/* Left Content */}
            <div>
              <span 
                className="inline-block px-4 py-2 rounded-full text-sm font-semibold mb-4"
                style={{ backgroundColor: `${COLORS.primary}10`, color: COLORS.primary }}
              >
                WHY CHOOSE US
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-[#001e50] mb-6">
                The Volkswagen Group Advantage
              </h2>
              <p className="text-gray-600 mb-8 leading-relaxed">
                With decades of German engineering excellence and a commitment to customer satisfaction, 
                we offer an unparalleled automotive experience in India.
              </p>

              {/* Features List */}
              <div className="space-y-6">
                {[
                  {
                    icon: Shield,
                    title: 'Certified Quality',
                    desc: 'Every vehicle meets stringent German quality standards',
                    color: 'bg-blue-100 text-blue-600'
                  },
                  {
                    icon: Award,
                    title: 'Award-Winning Service',
                    desc: 'Recognized for excellence in customer service',
                    color: 'bg-amber-100 text-amber-600'
                  },
                  {
                    icon: Clock,
                    title: 'Quick Turnaround',
                    desc: 'Efficient service with minimal wait times',
                    color: 'bg-emerald-100 text-emerald-600'
                  },
                ].map((feature, index) => (
                  <div key={index} className="flex gap-4">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${feature.color}`}>
                      <feature.icon size={22} />
                    </div>
                    <div>
                      <h4 className="font-bold text-[#001e50] mb-1">{feature.title}</h4>
                      <p className="text-gray-500 text-sm">{feature.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right - Image Grid */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <div className="rounded-2xl overflow-hidden h-48 group cursor-pointer">
                  <img 
                    src="https://images.unsplash.com/photo-1542362567-b07e54358753?w=400&auto=format&fit=crop&q=80" 
                    alt="Audi Interior" 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                </div>
                <div className="rounded-2xl overflow-hidden h-64 group cursor-pointer">
                  <img 
                    src="https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=400&auto=format&fit=crop&q=80" 
                    alt="Porsche Detail" 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                </div>
              </div>
              <div className="space-y-4 pt-8">
                <div className="rounded-2xl overflow-hidden h-64 group cursor-pointer">
                  <img 
                    src="https://images.unsplash.com/photo-1580273916550-e323be2ae537?w=400&auto=format&fit=crop&q=80" 
                    alt="BMW Showroom" 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                </div>
                <div className="rounded-2xl overflow-hidden h-48 bg-gradient-to-br from-[#001e50] to-[#003580] flex items-center justify-center p-6 group hover:shadow-2xl transition-all duration-300">
                  <div className="text-center text-white">
                    <div className="flex justify-center mb-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star key={star} size={20} fill="#c9a227" color="#c9a227" className="group-hover:animate-pulse" />
                      ))}
                    </div>
                    <p className="text-3xl font-bold mb-1">4.9/5</p>
                    <p className="text-white/60 text-sm">Customer Rating</p>
                    <p className="text-xs text-white/40 mt-1">Based on 10,000+ reviews</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==================== CTA SECTION ==================== */}
      <section 
        className="py-24 relative overflow-hidden"
        style={{ background: `linear-gradient(135deg, ${COLORS.primary} 0%, ${COLORS.dark} 100%)` }}
      >
        {/* Decorative Elements - Animated */}
        <div className="absolute inset-0 pointer-events-none">
          <div 
            className="absolute top-0 left-1/4 w-96 h-96 rounded-full opacity-10 animate-pulse"
            style={{ 
              background: `radial-gradient(circle, ${COLORS.accent} 0%, transparent 70%)`,
              animationDuration: '4s'
            }}
          />
          <div 
            className="absolute bottom-0 right-1/4 w-64 h-64 rounded-full opacity-5 animate-pulse"
            style={{ 
              background: `radial-gradient(circle, white 0%, transparent 70%)`,
              animationDuration: '5s'
            }}
          />
          {/* Animated lines */}
          <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#c9a227]/20 to-transparent" />
          <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
            Ready to Experience 
            <span className="block" style={{ color: COLORS.accent }}>German Excellence?</span>
          </h2>
          <p className="text-xl text-white/70 mb-10 max-w-2xl mx-auto">
            Book a test drive, explore our showroom, or connect with our automotive experts today.
          </p>
          
          <div className="flex flex-wrap gap-4 justify-center">
            <Link 
              to="/showroom" 
              className="inline-flex items-center gap-3 px-8 py-4 rounded-xl font-bold transition-all duration-300 hover:scale-105 hover:shadow-xl"
              style={{ backgroundColor: COLORS.accent, color: COLORS.primary }}
            >
              Explore Showroom
              <ArrowRight size={20} />
            </Link>
            <a 
              href="tel:1800-102-0909" 
              className="inline-flex items-center gap-3 px-8 py-4 rounded-xl font-bold text-white border-2 border-white/20 hover:bg-white/10 transition-all duration-300"
            >
              📞 1800-102-0909
            </a>
          </div>

          {/* Trust Badges */}
          <div className="mt-16 flex flex-wrap items-center justify-center gap-8 text-white/50 text-sm">
            <div className="flex items-center gap-2">
              <Shield size={18} />
              <span>Secure Transactions</span>
            </div>
            <div className="flex items-center gap-2">
              <Award size={18} />
              <span>Authorized Dealer</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock size={18} />
              <span>24/7 Support</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
