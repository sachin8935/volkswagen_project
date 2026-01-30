import React, { useState, useEffect, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { carsAPI, bookingsAPI } from '../api';
import { useCartStore } from '../store';
import { useWishlistStore } from '../store';
import CarAIAssistant, { AIAssistantButton } from '../components/CarAIAssistant';
import { 
  Heart, Share2, ChevronLeft, ChevronRight, Star, Shield, 
  Fuel, Gauge, Settings, Calendar, MapPin, Phone, User,
  Check, X, Play, Pause, Clock, Award, Zap, Car, 
  ChevronDown, ChevronUp, Sparkles, ArrowRight, Mail,
  CreditCard, Calculator, IndianRupee, Building, Navigation
} from 'lucide-react';

const CarDetailPage = () => {
  const { carId } = useParams();
  const [car, setCar] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedVariant, setSelectedVariant] = useState(0);
  const [selectedColor, setSelectedColor] = useState(0);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [showTestDriveModal, setShowTestDriveModal] = useState(false);
  const [showEMIModal, setShowEMIModal] = useState(false);
  const [showAIAssistant, setShowAIAssistant] = useState(false);
  const [testDriveStep, setTestDriveStep] = useState(1);
  const [expandedFeature, setExpandedFeature] = useState(null);
  const [scrolled, setScrolled] = useState(false);
  const heroRef = useRef(null);
  
  const [testDriveData, setTestDriveData] = useState({
    name: '',
    email: '',
    phone: '',
    preferredDate: '',
    preferredTime: '',
    location: 'mumbai',
    message: ''
  });

  const [emiData, setEmiData] = useState({
    loanAmount: 0,
    downPayment: 20,
    tenure: 60,
    interestRate: 8.5
  });

  // Scroll effect for floating header
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 100);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Auto-rotate images
  useEffect(() => {
    if (!isAutoPlaying || !car?.gallery?.length) return;
    const interval = setInterval(() => {
      setCurrentImageIndex(prev => (prev + 1) % car.gallery.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [isAutoPlaying, car?.gallery?.length]);

  useEffect(() => {
    const fetchCar = async () => {
      try {
        console.log('Fetching car with id:', carId);
        const response = await carsAPI.getById(carId);
        console.log('API Response:', response);
        if (response.success && response.data) {
          setCar(response.data);
          if (response.data?.variants?.[0]?.price) {
            setEmiData(prev => ({
              ...prev,
              loanAmount: response.data.variants[0].price * 0.8
            }));
          }
        } else {
          console.error('Invalid response structure:', response);
        }
      } catch (error) {
        console.error('Error fetching car:', error);
      } finally {
        setLoading(false);
      }
    };
    if (carId) {
      fetchCar();
    }
  }, [carId]);

  const calculateEMI = () => {
    const principal = emiData.loanAmount;
    const rate = emiData.interestRate / 12 / 100;
    const time = emiData.tenure;
    const emi = principal * rate * Math.pow(1 + rate, time) / (Math.pow(1 + rate, time) - 1);
    return Math.round(emi);
  };

  const handleTestDriveSubmit = async (e) => {
    e.preventDefault();
    try {
      const bookingData = {
        carId: car.id,
        carName: `${car.brand} ${car.name}`,
        variant: car.variants[selectedVariant].name,
        ...testDriveData,
        status: 'pending'
      };
      await bookingsAPI.createTestDrive(bookingData);
      alert('Test drive booked successfully! Our team will contact you shortly.');
      setShowTestDriveModal(false);
      setTestDriveStep(1);
      setTestDriveData({
        name: '', email: '', phone: '', preferredDate: '',
        preferredTime: '', location: 'mumbai', message: ''
      });
    } catch (error) {
      console.error('Error booking test drive:', error);
      alert('Failed to book test drive. Please try again.');
    }
  };

  const dealerLocations = [
    { id: 'mumbai', name: 'Mumbai Central', address: 'Volkswagen Arena, Prabhadevi', slots: 12 },
    { id: 'delhi', name: 'Delhi NCR', address: 'Volkswagen Hub, Connaught Place', slots: 8 },
    { id: 'bangalore', name: 'Bangalore', address: 'Volkswagen Experience, MG Road', slots: 15 },
    { id: 'chennai', name: 'Chennai', address: 'Volkswagen World, Anna Nagar', slots: 10 },
    { id: 'pune', name: 'Pune', address: 'Volkswagen Center, Koregaon Park', slots: 6 }
  ];

  const timeSlots = [
    '10:00 AM', '11:00 AM', '12:00 PM', '02:00 PM', '03:00 PM', '04:00 PM', '05:00 PM'
  ];

  const featureCategories = [
    {
      id: 'safety',
      name: 'Safety Features',
      icon: Shield,
      color: 'from-red-500 to-orange-500',
      features: ['6 Airbags', 'ABS with EBD', 'Electronic Stability Control', 'Hill Hold Control', 'ISOFIX Child Seat Mounts', 'Rear Parking Sensors']
    },
    {
      id: 'comfort',
      name: 'Comfort & Convenience',
      icon: Sparkles,
      color: 'from-blue-500 to-cyan-500',
      features: ['Automatic Climate Control', 'Ventilated Front Seats', 'Powered Driver Seat', 'Cruise Control', 'Keyless Entry & Go', 'Rain Sensing Wipers']
    },
    {
      id: 'tech',
      name: 'Technology',
      icon: Zap,
      color: 'from-purple-500 to-pink-500',
      features: ['10.1" Touchscreen Infotainment', 'Wireless Apple CarPlay & Android Auto', 'Digital Cockpit Pro', 'Connected Car Features', 'Wireless Phone Charging', '8-Speaker Sound System']
    },
    {
      id: 'exterior',
      name: 'Exterior',
      icon: Car,
      color: 'from-green-500 to-teal-500',
      features: ['LED Headlamps with DRLs', 'LED Tail Lamps', 'R17 Alloy Wheels', 'Chrome Accents', 'Shark Fin Antenna', 'Electric Sunroof']
    }
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 flex items-center justify-center">
        <div className="relative">
          <div className="w-20 h-20 border-4 border-blue-500/30 rounded-full animate-spin border-t-blue-500"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <Car className="w-8 h-8 text-blue-400 animate-pulse" />
          </div>
        </div>
      </div>
    );
  }

  if (!car) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <Car className="w-16 h-16 text-gray-500 mx-auto mb-4" />
          <p className="text-gray-400 text-lg">Car not found</p>
          <Link to="/showroom" className="mt-4 inline-block text-blue-400 hover:text-blue-300">
            ← Back to Showroom
          </Link>
        </div>
      </div>
    );
  }

  const currentVariant = car.variants[selectedVariant];
  const currentColor = car.colors?.[selectedColor];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Floating Header */}
      <div className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? 'bg-slate-900/95 backdrop-blur-lg shadow-2xl py-3' : 'bg-transparent py-6'
      }`}>
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <Link to="/showroom" className="flex items-center gap-2 text-white/80 hover:text-white transition-colors">
            <ChevronLeft className="w-5 h-5" />
            <span className={`transition-opacity duration-300 ${scrolled ? 'opacity-100' : 'opacity-0'}`}>
              Back to Showroom
            </span>
          </Link>
          
          <div className={`text-center transition-all duration-300 ${scrolled ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'}`}>
            <h2 className="text-white font-semibold">{car.brand} {car.name}</h2>
            <p className="text-blue-400 text-sm">₹{(currentVariant?.price / 100000).toFixed(2)} Lakh*</p>
          </div>

          <div className="flex items-center gap-3">
            <button className="p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all">
              <Share2 className="w-5 h-5" />
            </button>
            <button className="p-2.5 rounded-full bg-white/10 hover:bg-red-500/80 text-white transition-all">
              <Heart className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <section ref={heroRef} className="relative min-h-screen pt-20 overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-900/40 via-transparent to-purple-900/40"></div>
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-6 py-12">
          <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[80vh]">
            {/* Left - Car Info */}
            <div className="order-2 lg:order-1 space-y-8">
              <div>
                <p className="text-blue-400 font-medium tracking-wider uppercase mb-2">{car.brand}</p>
                <h1 className="text-5xl md:text-7xl font-bold text-white mb-4">
                  {car.name}
                </h1>
                <p className="text-xl text-gray-400 max-w-lg">{car.tagline || 'Experience German engineering at its finest.'}</p>
              </div>

              {/* Quick Specs */}
              <div className="flex flex-wrap gap-6">
                <div className="flex items-center gap-3 bg-white/5 rounded-2xl px-5 py-3">
                  <Gauge className="w-6 h-6 text-blue-400" />
                  <div>
                    <p className="text-xs text-gray-500 uppercase">Power</p>
                    <p className="text-white font-semibold">{currentVariant?.specs?.power || '150 PS'}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 bg-white/5 rounded-2xl px-5 py-3">
                  <Fuel className="w-6 h-6 text-green-400" />
                  <div>
                    <p className="text-xs text-gray-500 uppercase">Mileage</p>
                    <p className="text-white font-semibold">{currentVariant?.specs?.mileage || '18 km/l'}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 bg-white/5 rounded-2xl px-5 py-3">
                  <Settings className="w-6 h-6 text-purple-400" />
                  <div>
                    <p className="text-xs text-gray-500 uppercase">Transmission</p>
                    <p className="text-white font-semibold">{currentVariant?.specs?.transmission || 'Automatic'}</p>
                  </div>
                </div>
              </div>

              {/* Price & CTA */}
              <div className="space-y-4">
                <div className="flex items-baseline gap-3">
                  <span className="text-4xl font-bold text-white">₹{(currentVariant?.price / 100000).toFixed(2)}</span>
                  <span className="text-gray-400">Lakh*</span>
                  <span className="text-xs text-gray-500">(Ex-showroom)</span>
                </div>
                
                <div className="flex flex-wrap gap-4">
                  <button 
                    onClick={() => setShowTestDriveModal(true)}
                    className="group relative px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-500 rounded-xl text-white font-semibold overflow-hidden transition-all hover:shadow-2xl hover:shadow-blue-500/30 hover:scale-105"
                  >
                    <span className="relative z-10 flex items-center gap-2">
                      <Calendar className="w-5 h-5" />
                      Book Test Drive
                    </span>
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-blue-400 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  </button>
                  
                  <button 
                    onClick={() => setShowEMIModal(true)}
                    className="px-8 py-4 border-2 border-white/20 hover:border-white/40 rounded-xl text-white font-semibold transition-all hover:bg-white/5 flex items-center gap-2"
                  >
                    <Calculator className="w-5 h-5" />
                    Calculate EMI
                  </button>
                </div>
              </div>
            </div>

            {/* Right - Car Image Gallery */}
            <div className="order-1 lg:order-2 relative">
              <div className="relative aspect-[4/3] rounded-3xl overflow-hidden bg-gradient-to-br from-slate-800 to-slate-900">
                {/* Main Image */}
                <img 
                  src={car.gallery?.[currentImageIndex] || car.image}
                  alt={`${car.brand} ${car.name}`}
                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                />
                
                {/* Image Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent"></div>
                
                {/* Navigation Arrows */}
                {car.gallery?.length > 1 && (
                  <>
                    <button 
                      onClick={() => {
                        setIsAutoPlaying(false);
                        setCurrentImageIndex(prev => prev === 0 ? car.gallery.length - 1 : prev - 1);
                      }}
                      className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white backdrop-blur-sm transition-all"
                    >
                      <ChevronLeft className="w-6 h-6" />
                    </button>
                    <button 
                      onClick={() => {
                        setIsAutoPlaying(false);
                        setCurrentImageIndex(prev => (prev + 1) % car.gallery.length);
                      }}
                      className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white backdrop-blur-sm transition-all"
                    >
                      <ChevronRight className="w-6 h-6" />
                    </button>
                  </>
                )}

                {/* Auto-play Toggle & Dots */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-4">
                  {car.gallery?.length > 1 && (
                    <>
                      <button 
                        onClick={() => setIsAutoPlaying(!isAutoPlaying)}
                        className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white backdrop-blur-sm transition-all"
                      >
                        {isAutoPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                      </button>
                      <div className="flex gap-2">
                        {car.gallery.map((_, idx) => (
                          <button
                            key={idx}
                            onClick={() => {
                              setIsAutoPlaying(false);
                              setCurrentImageIndex(idx);
                            }}
                            className={`w-2 h-2 rounded-full transition-all ${
                              idx === currentImageIndex ? 'bg-white w-6' : 'bg-white/40 hover:bg-white/60'
                            }`}
                          />
                        ))}
                      </div>
                    </>
                  )}
                </div>
              </div>

              {/* Thumbnail Strip */}
              {car.gallery?.length > 1 && (
                <div className="flex gap-3 mt-4 justify-center">
                  {car.gallery.slice(0, 5).map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => {
                        setIsAutoPlaying(false);
                        setCurrentImageIndex(idx);
                      }}
                      className={`relative w-16 h-12 rounded-lg overflow-hidden transition-all ${
                        idx === currentImageIndex ? 'ring-2 ring-blue-500 scale-110' : 'opacity-60 hover:opacity-100'
                      }`}
                    >
                      <img src={img} alt="" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Variants Section */}
      <section className="py-20 bg-gradient-to-b from-slate-900 to-slate-800">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Choose Your Variant</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">Select the perfect configuration that matches your lifestyle and preferences.</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {car.variants?.map((variant, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedVariant(idx)}
                className={`relative p-6 rounded-2xl border-2 text-left transition-all duration-300 ${
                  selectedVariant === idx 
                    ? 'border-blue-500 bg-blue-500/10 shadow-xl shadow-blue-500/20' 
                    : 'border-white/10 bg-white/5 hover:border-white/30'
                }`}
              >
                {idx === 1 && (
                  <span className="absolute -top-3 left-4 px-3 py-1 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full text-xs font-semibold text-white">
                    MOST POPULAR
                  </span>
                )}
                
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-semibold text-white">{variant.name}</h3>
                    <p className="text-gray-400 text-sm mt-1">{variant.fuelType || 'Petrol'} • {variant.transmission || 'Manual'}</p>
                  </div>
                  <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                    selectedVariant === idx ? 'border-blue-500 bg-blue-500' : 'border-white/30'
                  }`}>
                    {selectedVariant === idx && <Check className="w-4 h-4 text-white" />}
                  </div>
                </div>

                <div className="flex items-baseline gap-2 mb-4">
                  <span className="text-2xl font-bold text-white">₹{(variant.price / 100000).toFixed(2)}</span>
                  <span className="text-gray-500 text-sm">Lakh*</span>
                </div>

                <div className="flex flex-wrap gap-2">
                  {variant.highlights?.slice(0, 3).map((highlight, hIdx) => (
                    <span key={hIdx} className="px-2 py-1 bg-white/5 rounded-lg text-xs text-gray-400">
                      {highlight}
                    </span>
                  )) || (
                    <>
                      <span className="px-2 py-1 bg-white/5 rounded-lg text-xs text-gray-400">Touchscreen</span>
                      <span className="px-2 py-1 bg-white/5 rounded-lg text-xs text-gray-400">Alloy Wheels</span>
                    </>
                  )}
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Colors Section */}
      {car.colors?.length > 0 && (
        <section className="py-16 bg-slate-800">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
              <div>
                <h2 className="text-2xl font-bold text-white mb-2">Exterior Colors</h2>
                <p className="text-gray-400">Currently viewing: <span className="text-white">{currentColor?.name || 'Standard'}</span></p>
              </div>
              
              <div className="flex gap-3">
                {car.colors.map((color, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedColor(idx)}
                    className={`group relative p-1 rounded-full transition-all ${
                      selectedColor === idx ? 'ring-2 ring-blue-500 ring-offset-2 ring-offset-slate-800' : ''
                    }`}
                    title={color.name}
                  >
                    <div 
                      className="w-10 h-10 rounded-full border-2 border-white/20"
                      style={{ backgroundColor: color.hex }}
                    />
                    <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-xs text-gray-400 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
                      {color.name}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Features Section */}
      <section className="py-20 bg-gradient-to-b from-slate-800 to-slate-900">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Premium Features</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">Discover the features that make this car exceptional.</p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {featureCategories.map((category) => (
              <div 
                key={category.id}
                className="bg-white/5 rounded-2xl overflow-hidden border border-white/10"
              >
                <button
                  onClick={() => setExpandedFeature(expandedFeature === category.id ? null : category.id)}
                  className="w-full p-6 flex items-center justify-between text-left hover:bg-white/5 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div className={`p-3 rounded-xl bg-gradient-to-br ${category.color}`}>
                      <category.icon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-white">{category.name}</h3>
                      <p className="text-sm text-gray-400">{category.features.length} features</p>
                    </div>
                  </div>
                  {expandedFeature === category.id ? (
                    <ChevronUp className="w-5 h-5 text-gray-400" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-gray-400" />
                  )}
                </button>
                
                {expandedFeature === category.id && (
                  <div className="px-6 pb-6 pt-2 border-t border-white/10">
                    <div className="grid grid-cols-2 gap-3">
                      {category.features.map((feature, idx) => (
                        <div key={idx} className="flex items-center gap-2">
                          <Check className="w-4 h-4 text-green-400 flex-shrink-0" />
                          <span className="text-gray-300 text-sm">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Test Drive CTA Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-blue-800"></div>
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,...')] opacity-10"></div>
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-400/10 rounded-full blur-3xl"></div>
        
        <div className="relative max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Ready to Experience the Drive?
          </h2>
          <p className="text-xl text-blue-100 mb-10 max-w-2xl mx-auto">
            Book your test drive today and discover why the {car.name} is the perfect choice for you.
          </p>
          
          <div className="flex flex-wrap justify-center gap-6 mb-12">
            <div className="flex items-center gap-3 text-white/90">
              <div className="p-2 rounded-full bg-white/10">
                <Clock className="w-5 h-5" />
              </div>
              <span>30-min experience</span>
            </div>
            <div className="flex items-center gap-3 text-white/90">
              <div className="p-2 rounded-full bg-white/10">
                <MapPin className="w-5 h-5" />
              </div>
              <span>5+ locations</span>
            </div>
            <div className="flex items-center gap-3 text-white/90">
              <div className="p-2 rounded-full bg-white/10">
                <Award className="w-5 h-5" />
              </div>
              <span>Expert guidance</span>
            </div>
          </div>

          <button 
            onClick={() => setShowTestDriveModal(true)}
            className="group inline-flex items-center gap-3 px-10 py-5 bg-white text-blue-600 rounded-2xl font-bold text-lg hover:bg-blue-50 transition-all hover:shadow-2xl hover:scale-105"
          >
            <Calendar className="w-6 h-6" />
            Book Your Test Drive Now
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </section>

      {/* Test Drive Modal */}
      {showTestDriveModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={() => setShowTestDriveModal(false)}></div>
          
          <div className="relative w-full max-w-2xl bg-gradient-to-br from-slate-900 to-slate-800 rounded-3xl shadow-2xl overflow-hidden max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="relative p-6 border-b border-white/10">
              <button 
                onClick={() => setShowTestDriveModal(false)}
                className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
              
              <h3 className="text-2xl font-bold text-white pr-10">Book Your Test Drive</h3>
              <p className="text-gray-400 mt-1">{car.brand} {car.name} - {currentVariant?.name}</p>
              
              {/* Progress Steps */}
              <div className="flex items-center justify-center gap-4 mt-6">
                {[1, 2, 3].map((step) => (
                  <div key={step} className="flex items-center gap-2">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center font-semibold transition-all ${
                      testDriveStep >= step 
                        ? 'bg-blue-500 text-white' 
                        : 'bg-white/10 text-gray-500'
                    }`}>
                      {testDriveStep > step ? <Check className="w-4 h-4" /> : step}
                    </div>
                    {step < 3 && (
                      <div className={`w-12 h-0.5 ${testDriveStep > step ? 'bg-blue-500' : 'bg-white/10'}`}></div>
                    )}
                  </div>
                ))}
              </div>
              <div className="flex justify-between text-xs text-gray-500 mt-2 px-2">
                <span>Location</span>
                <span>Date & Time</span>
                <span>Your Details</span>
              </div>
            </div>

            <form onSubmit={handleTestDriveSubmit}>
              <div className="p-6">
                {/* Step 1: Location */}
                {testDriveStep === 1 && (
                  <div className="space-y-4">
                    <h4 className="text-lg font-semibold text-white mb-4">Select Dealership Location</h4>
                    <div className="space-y-3">
                      {dealerLocations.map((location) => (
                        <label
                          key={location.id}
                          className={`flex items-center p-4 rounded-xl border-2 cursor-pointer transition-all ${
                            testDriveData.location === location.id
                              ? 'border-blue-500 bg-blue-500/10'
                              : 'border-white/10 hover:border-white/30'
                          }`}
                        >
                          <input
                            type="radio"
                            name="location"
                            value={location.id}
                            checked={testDriveData.location === location.id}
                            onChange={(e) => setTestDriveData({ ...testDriveData, location: e.target.value })}
                            className="sr-only"
                          />
                          <div className="p-3 rounded-xl bg-white/5 mr-4">
                            <Building className="w-6 h-6 text-blue-400" />
                          </div>
                          <div className="flex-1">
                            <p className="text-white font-medium">{location.name}</p>
                            <p className="text-gray-400 text-sm">{location.address}</p>
                          </div>
                          <div className="text-right">
                            <span className="text-green-400 text-sm">{location.slots} slots available</span>
                          </div>
                        </label>
                      ))}
                    </div>
                  </div>
                )}

                {/* Step 2: Date & Time */}
                {testDriveStep === 2 && (
                  <div className="space-y-6">
                    <div>
                      <label className="block text-white font-medium mb-3">Select Date</label>
                      <input
                        type="date"
                        value={testDriveData.preferredDate}
                        onChange={(e) => setTestDriveData({ ...testDriveData, preferredDate: e.target.value })}
                        min={new Date().toISOString().split('T')[0]}
                        className="w-full p-4 rounded-xl bg-white/5 border border-white/10 text-white focus:border-blue-500 focus:outline-none"
                        required
                      />
                    </div>
                    
                    <div>
                      <label className="block text-white font-medium mb-3">Select Time Slot</label>
                      <div className="grid grid-cols-3 md:grid-cols-4 gap-3">
                        {timeSlots.map((slot) => (
                          <button
                            key={slot}
                            type="button"
                            onClick={() => setTestDriveData({ ...testDriveData, preferredTime: slot })}
                            className={`p-3 rounded-xl text-center transition-all ${
                              testDriveData.preferredTime === slot
                                ? 'bg-blue-500 text-white'
                                : 'bg-white/5 text-gray-300 hover:bg-white/10'
                            }`}
                          >
                            {slot}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* Step 3: Personal Details */}
                {testDriveStep === 3 && (
                  <div className="space-y-4">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-white font-medium mb-2">Full Name</label>
                        <div className="relative">
                          <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                          <input
                            type="text"
                            value={testDriveData.name}
                            onChange={(e) => setTestDriveData({ ...testDriveData, name: e.target.value })}
                            className="w-full pl-12 pr-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:border-blue-500 focus:outline-none"
                            placeholder="Sachin Kumar"
                            required
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-white font-medium mb-2">Phone Number</label>
                        <div className="relative">
                          <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                          <input
                            type="tel"
                            value={testDriveData.phone}
                            onChange={(e) => setTestDriveData({ ...testDriveData, phone: e.target.value })}
                            className="w-full pl-12 pr-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:border-blue-500 focus:outline-none"
                            placeholder="+91 98765 43210"
                            required
                          />
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-white font-medium mb-2">Email Address</label>
                      <div className="relative">
                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                        <input
                          type="email"
                          value={testDriveData.email}
                          onChange={(e) => setTestDriveData({ ...testDriveData, email: e.target.value })}
                          className="w-full pl-12 pr-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:border-blue-500 focus:outline-none"
                          placeholder="john@example.com"
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-white font-medium mb-2">Additional Notes (Optional)</label>
                      <textarea
                        value={testDriveData.message}
                        onChange={(e) => setTestDriveData({ ...testDriveData, message: e.target.value })}
                        className="w-full p-4 rounded-xl bg-white/5 border border-white/10 text-white focus:border-blue-500 focus:outline-none resize-none"
                        rows="3"
                        placeholder="Any specific requests or questions..."
                      />
                    </div>

                    {/* Booking Summary */}
                    <div className="p-4 rounded-xl bg-blue-500/10 border border-blue-500/30">
                      <h5 className="text-white font-medium mb-3">Booking Summary</h5>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-400">Car</span>
                          <span className="text-white">{car.brand} {car.name}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">Variant</span>
                          <span className="text-white">{currentVariant?.name}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">Location</span>
                          <span className="text-white">{dealerLocations.find(l => l.id === testDriveData.location)?.name}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">Date & Time</span>
                          <span className="text-white">{testDriveData.preferredDate} at {testDriveData.preferredTime}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Modal Footer */}
              <div className="p-6 border-t border-white/10 flex justify-between">
                {testDriveStep > 1 ? (
                  <button
                    type="button"
                    onClick={() => setTestDriveStep(testDriveStep - 1)}
                    className="px-6 py-3 rounded-xl text-white hover:bg-white/10 transition-colors"
                  >
                    Back
                  </button>
                ) : (
                  <div></div>
                )}
                
                {testDriveStep < 3 ? (
                  <button
                    type="button"
                    onClick={() => {
                      if (testDriveStep === 2 && (!testDriveData.preferredDate || !testDriveData.preferredTime)) {
                        alert('Please select date and time');
                        return;
                      }
                      setTestDriveStep(testDriveStep + 1);
                    }}
                    className="px-8 py-3 bg-blue-500 hover:bg-blue-600 rounded-xl text-white font-semibold transition-colors flex items-center gap-2"
                  >
                    Continue
                    <ArrowRight className="w-4 h-4" />
                  </button>
                ) : (
                  <button
                    type="submit"
                    className="px-8 py-3 bg-green-500 hover:bg-green-600 rounded-xl text-white font-semibold transition-colors flex items-center gap-2"
                  >
                    <Check className="w-5 h-5" />
                    Confirm Booking
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>
      )}

      {/* EMI Calculator Modal */}
      {showEMIModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={() => setShowEMIModal(false)}></div>
          
          <div className="relative w-full max-w-lg bg-gradient-to-br from-slate-900 to-slate-800 rounded-3xl shadow-2xl overflow-hidden">
            <div className="p-6 border-b border-white/10 flex items-center justify-between">
              <div>
                <h3 className="text-2xl font-bold text-white">EMI Calculator</h3>
                <p className="text-gray-400 text-sm mt-1">{car.brand} {car.name}</p>
              </div>
              <button 
                onClick={() => setShowEMIModal(false)}
                className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-6">
              {/* On-Road Price */}
              <div className="p-4 rounded-xl bg-blue-500/10 border border-blue-500/30 flex items-center justify-between">
                <span className="text-gray-400">On-road Price</span>
                <span className="text-2xl font-bold text-white">₹{((currentVariant?.price * 1.15) / 100000).toFixed(2)} Lakh</span>
              </div>

              {/* Down Payment */}
              <div>
                <div className="flex justify-between mb-2">
                  <label className="text-white font-medium">Down Payment</label>
                  <span className="text-blue-400">{emiData.downPayment}%</span>
                </div>
                <input
                  type="range"
                  min="10"
                  max="90"
                  value={emiData.downPayment}
                  onChange={(e) => {
                    const dp = parseInt(e.target.value);
                    setEmiData({ 
                      ...emiData, 
                      downPayment: dp,
                      loanAmount: currentVariant?.price * 1.15 * (1 - dp / 100)
                    });
                  }}
                  className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-blue-500"
                />
                <div className="flex justify-between text-sm text-gray-500 mt-1">
                  <span>₹{((currentVariant?.price * 1.15 * emiData.downPayment / 100) / 100000).toFixed(2)} L</span>
                  <span>₹{((currentVariant?.price * 1.15 * (1 - emiData.downPayment / 100)) / 100000).toFixed(2)} L loan</span>
                </div>
              </div>

              {/* Tenure */}
              <div>
                <div className="flex justify-between mb-2">
                  <label className="text-white font-medium">Loan Tenure</label>
                  <span className="text-blue-400">{emiData.tenure} months</span>
                </div>
                <div className="flex gap-2">
                  {[24, 36, 48, 60, 72, 84].map((months) => (
                    <button
                      key={months}
                      onClick={() => setEmiData({ ...emiData, tenure: months })}
                      className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all ${
                        emiData.tenure === months 
                          ? 'bg-blue-500 text-white' 
                          : 'bg-white/5 text-gray-400 hover:bg-white/10'
                      }`}
                    >
                      {months/12}yr
                    </button>
                  ))}
                </div>
              </div>

              {/* Interest Rate */}
              <div>
                <div className="flex justify-between mb-2">
                  <label className="text-white font-medium">Interest Rate</label>
                  <span className="text-blue-400">{emiData.interestRate}%</span>
                </div>
                <input
                  type="range"
                  min="7"
                  max="15"
                  step="0.5"
                  value={emiData.interestRate}
                  onChange={(e) => setEmiData({ ...emiData, interestRate: parseFloat(e.target.value) })}
                  className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-blue-500"
                />
              </div>

              {/* EMI Result */}
              <div className="p-6 rounded-xl bg-gradient-to-r from-green-500/20 to-emerald-500/20 border border-green-500/30 text-center">
                <p className="text-gray-400 text-sm mb-1">Your Monthly EMI</p>
                <div className="flex items-center justify-center gap-2">
                  <IndianRupee className="w-8 h-8 text-green-400" />
                  <span className="text-4xl font-bold text-white">{calculateEMI().toLocaleString()}</span>
                </div>
                <p className="text-gray-500 text-sm mt-2">for {emiData.tenure} months</p>
              </div>

              <button className="w-full py-4 bg-blue-500 hover:bg-blue-600 rounded-xl text-white font-semibold transition-colors flex items-center justify-center gap-2">
                <CreditCard className="w-5 h-5" />
                Apply for Loan
              </button>
            </div>
          </div>
        </div>
      )}

      {/* AI Assistant */}
      {!showAIAssistant && (
        <AIAssistantButton 
          onClick={() => setShowAIAssistant(true)} 
          carName={car.name}
        />
      )}
      
      <CarAIAssistant 
        carData={car}
        isOpen={showAIAssistant}
        onClose={() => setShowAIAssistant(false)}
      />
    </div>
  );
};

export default CarDetailPage;
