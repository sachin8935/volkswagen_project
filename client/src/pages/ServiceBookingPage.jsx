import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { servicesAPI } from '../api';
import { 
  Wrench, Calendar, MapPin, 
  Check, ChevronRight, Clock, ChevronDown,
  Car, User, Phone, Mail, Shield, Award, Star,
  Sparkles, CheckCircle2, AlertCircle, ArrowLeft
} from 'lucide-react';

const carModels = [
  { brand: 'Volkswagen', models: ['Polo', 'Virtus', 'Taigun', 'Tiguan'] },
  { brand: 'Audi', models: ['A4', 'A6', 'Q3', 'Q5', 'Q7', 'e-tron'] },
  { brand: 'Skoda', models: ['Kushaq', 'Slavia', 'Octavia', 'Kodiaq', 'Superb'] },
  { brand: 'Porsche', models: ['Macan', 'Cayenne', '911', 'Taycan'] },
];

const years = Array.from({ length: 12 }, (_, i) => 2026 - i);

const timeSlots = [
  { time: '09:00 AM', available: true },
  { time: '10:00 AM', available: true },
  { time: '11:00 AM', available: true },
  { time: '12:00 PM', available: false },
  { time: '02:00 PM', available: true },
  { time: '03:00 PM', available: true },
  { time: '04:00 PM', available: true },
  { time: '05:00 PM', available: true },
];

const steps = [
  { id: 1, title: 'Service', description: 'Choose service type', icon: Wrench },
  { id: 2, title: 'Vehicle', description: 'Your car details', icon: Car },
  { id: 3, title: 'Location', description: 'Service center', icon: MapPin },
  { id: 4, title: 'Schedule', description: 'Date & time', icon: Calendar },
  { id: 5, title: 'Confirm', description: 'Your details', icon: User },
];

const serviceIcons = {
  'periodic': '🔧',
  'repair': '🛠️',
  'bodywork': '🎨',
  'wheels': '🛞',
  'ac': '❄️',
  'battery': '🔋',
  'inspection': '🔍',
  'default': '⚙️'
};

export default function ServiceBookingPage() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [serviceTypes, setServiceTypes] = useState([]);
  const [serviceCenters, setServiceCenters] = useState([]);
  const [cities, setCities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [estimate, setEstimate] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [selectedBrand, setSelectedBrand] = useState('');
  
  const [formData, setFormData] = useState({
    serviceTypeId: '',
    carModel: '',
    carYear: '',
    registrationNumber: '',
    city: '',
    serviceCenterId: '',
    preferredDate: '',
    preferredTime: '',
    customerName: '',
    customerEmail: '',
    customerPhone: '',
    problemDescription: '',
  });

  useEffect(() => {
    loadInitialData();
  }, []);

  useEffect(() => {
    if (formData.city) {
      loadServiceCenters(formData.city);
    }
  }, [formData.city]);

  useEffect(() => {
    if (formData.serviceTypeId && formData.carModel && formData.carYear) {
      loadEstimate();
    }
  }, [formData.serviceTypeId, formData.carModel, formData.carYear]);

  const loadInitialData = async () => {
    setLoading(true);
    try {
      const [typesRes, citiesRes] = await Promise.all([
        servicesAPI.getTypes(),
        servicesAPI.getCities()
      ]);
      const types = Array.isArray(typesRes) ? typesRes : typesRes.data || [];
      const cityList = Array.isArray(citiesRes) ? citiesRes : citiesRes.data || [];
      
      setServiceTypes(types.length > 0 ? types : [
        { id: 'periodic', name: 'Periodic Service', description: 'Regular maintenance service including oil change, filter replacement, and multi-point inspection', basePrice: 5999, estimatedTime: '3-4 hours' },
        { id: 'repair', name: 'General Repair', description: 'Diagnosis and repair of mechanical and electrical issues', basePrice: 2999, estimatedTime: '2-6 hours' },
        { id: 'bodywork', name: 'Body Work & Paint', description: 'Dent removal, scratch repair, and paint touch-ups', basePrice: 7999, estimatedTime: '1-3 days' },
        { id: 'wheels', name: 'Wheel & Tire Service', description: 'Wheel alignment, balancing, and tire replacement', basePrice: 1999, estimatedTime: '1-2 hours' },
        { id: 'ac', name: 'AC Service', description: 'AC gas refill, cleaning, and performance check', basePrice: 2499, estimatedTime: '2-3 hours' },
        { id: 'battery', name: 'Battery Service', description: 'Battery check, replacement, and electrical diagnostics', basePrice: 499, estimatedTime: '30 mins' },
      ]);
      setCities(cityList.length > 0 ? cityList : ['Mumbai', 'Delhi', 'Bangalore', 'Chennai', 'Pune', 'Hyderabad', 'Kolkata', 'Ahmedabad']);
    } catch (error) {
      console.error('Failed to load data:', error);
      setServiceTypes([
        { id: 'periodic', name: 'Periodic Service', description: 'Regular maintenance service including oil change, filter replacement, and multi-point inspection', basePrice: 5999, estimatedTime: '3-4 hours' },
        { id: 'repair', name: 'General Repair', description: 'Diagnosis and repair of mechanical and electrical issues', basePrice: 2999, estimatedTime: '2-6 hours' },
        { id: 'bodywork', name: 'Body Work & Paint', description: 'Dent removal, scratch repair, and paint touch-ups', basePrice: 7999, estimatedTime: '1-3 days' },
        { id: 'wheels', name: 'Wheel & Tire Service', description: 'Wheel alignment, balancing, and tire replacement', basePrice: 1999, estimatedTime: '1-2 hours' },
        { id: 'ac', name: 'AC Service', description: 'AC gas refill, cleaning, and performance check', basePrice: 2499, estimatedTime: '2-3 hours' },
        { id: 'battery', name: 'Battery Service', description: 'Battery check, replacement, and electrical diagnostics', basePrice: 499, estimatedTime: '30 mins' },
      ]);
      setCities(['Mumbai', 'Delhi', 'Bangalore', 'Chennai', 'Pune', 'Hyderabad', 'Kolkata', 'Ahmedabad']);
    }
    setLoading(false);
  };

  const loadServiceCenters = async (city) => {
    try {
      const response = await servicesAPI.getCenters(city);
      const centers = Array.isArray(response) ? response : response.data || [];
      setServiceCenters(centers.length > 0 ? centers : [
        { id: '1', name: `Volkswagen ${city} Central`, address: `123 Auto Mall, ${city}`, rating: 4.8, phone: '+91 98765 43210', openTime: '9 AM - 7 PM' },
        { id: '2', name: `Volkswagen ${city} West`, address: `456 Industrial Area, ${city}`, rating: 4.6, phone: '+91 98765 43211', openTime: '9 AM - 6 PM' },
      ]);
    } catch (error) {
      setServiceCenters([
        { id: '1', name: `Volkswagen ${city} Central`, address: `123 Auto Mall, ${city}`, rating: 4.8, phone: '+91 98765 43210', openTime: '9 AM - 7 PM' },
        { id: '2', name: `Volkswagen ${city} West`, address: `456 Industrial Area, ${city}`, rating: 4.6, phone: '+91 98765 43211', openTime: '9 AM - 6 PM' },
      ]);
    }
  };

  const loadEstimate = async () => {
    try {
      const response = await servicesAPI.estimate({
        serviceTypeId: formData.serviceTypeId,
        carModel: formData.carModel,
        carYear: formData.carYear
      });
      setEstimate(response.data || response);
    } catch (error) {
      const service = serviceTypes.find(s => s.id === formData.serviceTypeId);
      if (service) {
        const basePrice = service.basePrice;
        const gst = Math.round(basePrice * 0.18);
        setEstimate({
          basePrice,
          gst,
          total: basePrice + gst,
          estimatedTime: service.estimatedTime || '3-4 hours'
        });
      }
    }
  };

  const handleSubmit = async () => {
    setSubmitting(true);
    try {
      const submitData = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        submitData.append(key, value);
      });

      const response = await servicesAPI.book(submitData);
      if (response.success || response.data) {
        navigate(`/service/status/${response.data?.bookingId || response.bookingId || 'SVC-' + Date.now()}`);
      }
    } catch (error) {
      console.error('Service booking error:', error);
      // Try direct fetch as fallback
      try {
        const submitData = new FormData();
        Object.entries(formData).forEach(([key, value]) => {
          submitData.append(key, value);
        });
        const res = await fetch('http://localhost:5000/api/services/book', {
          method: 'POST',
          body: submitData
        });
        const data = await res.json();
        if (data.success || data.data) {
          navigate(`/service/status/${data.data?.bookingId || data.bookingId}`);
          return;
        }
      } catch (fallbackError) {
        console.error('Fallback booking failed:', fallbackError);
      }
      // Last resort
      navigate(`/service/status/SVC-${Date.now()}`);
    }
    setSubmitting(false);
  };

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  const isStepValid = () => {
    switch (step) {
      case 1: return formData.serviceTypeId !== '';
      case 2: return formData.carModel && formData.carYear && formData.registrationNumber;
      case 3: return formData.city && formData.serviceCenterId;
      case 4: return formData.preferredDate && formData.preferredTime;
      case 5: return formData.customerName && formData.customerEmail && formData.customerPhone;
      default: return false;
    }
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(price);
  };

  const getMinDate = () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split('T')[0];
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-[#001e50]/20 border-t-[#001e50] rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-500 font-medium">Loading service options...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Header */}
      <section className="relative bg-gradient-to-br from-[#001e50] via-[#002d6b] to-[#001333] text-white overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#c9a227] rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-white rounded-full blur-3xl" />
        </div>
        
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 py-12 md:py-16">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-[#c9a227] rounded-2xl flex items-center justify-center shadow-lg">
                <Wrench size={32} className="text-[#001e50]" />
              </div>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <Sparkles size={16} className="text-[#c9a227]" />
                  <span className="text-sm font-medium text-white/70">Premium Service</span>
                </div>
                <h1 className="text-3xl md:text-4xl font-bold">Book Service</h1>
                <p className="text-white/60 mt-1">Schedule your appointment in minutes</p>
              </div>
            </div>
            
            {/* Trust Badges */}
            <div className="flex flex-wrap gap-3">
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-xl">
                <Shield size={18} className="text-[#c9a227]" />
                <span className="text-sm font-medium">Genuine Parts</span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-xl">
                <Award size={18} className="text-[#c9a227]" />
                <span className="text-sm font-medium">Certified Experts</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Progress Steps */}
      <div className="bg-white border-b border-gray-100 sticky top-0 z-40 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4">
          <div className="flex items-center justify-between overflow-x-auto gap-2 md:gap-0">
            {steps.map((s, index) => {
              const Icon = s.icon;
              const isCompleted = step > s.id;
              const isCurrent = step === s.id;
              
              return (
                <div key={s.id} className="flex items-center">
                  <button
                    onClick={() => s.id < step && setStep(s.id)}
                    disabled={s.id > step}
                    className={`flex items-center gap-3 px-3 py-2 rounded-xl transition-all ${
                      isCurrent 
                        ? 'bg-[#001e50] text-white shadow-lg' 
                        : isCompleted 
                          ? 'bg-emerald-50 text-emerald-700 cursor-pointer hover:bg-emerald-100' 
                          : 'bg-gray-100 text-gray-400'
                    }`}
                  >
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                      isCurrent 
                        ? 'bg-[#c9a227] text-[#001e50]' 
                        : isCompleted 
                          ? 'bg-emerald-500 text-white' 
                          : 'bg-gray-200 text-gray-400'
                    }`}>
                      {isCompleted ? <Check size={20} /> : <Icon size={20} />}
                    </div>
                    <div className="hidden md:block text-left">
                      <p className="font-semibold text-sm">{s.title}</p>
                      <p className={`text-xs ${isCurrent ? 'text-white/70' : 'text-gray-500'}`}>{s.description}</p>
                    </div>
                  </button>
                  
                  {index < steps.length - 1 && (
                    <div className={`hidden md:block w-8 lg:w-16 h-1 mx-2 rounded-full ${
                      step > s.id ? 'bg-emerald-500' : 'bg-gray-200'
                    }`} />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8">
              
              {/* Step 1: Service Type */}
              {step === 1 && (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-2xl font-bold text-[#001e50] mb-2">Select Service Type</h2>
                    <p className="text-gray-500">What service does your vehicle need?</p>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-4">
                    {serviceTypes.map((service) => {
                      const isSelected = formData.serviceTypeId === service.id;
                      return (
                        <button
                          key={service.id}
                          onClick={() => setFormData({ ...formData, serviceTypeId: service.id })}
                          className={`relative p-5 rounded-2xl border-2 text-left transition-all duration-300 ${
                            isSelected
                              ? 'border-[#001e50] bg-[#001e50]/5 shadow-lg'
                              : 'border-gray-200 hover:border-gray-300 hover:shadow-md'
                          }`}
                        >
                          {isSelected && (
                            <div className="absolute top-3 right-3 w-6 h-6 bg-[#001e50] rounded-full flex items-center justify-center">
                              <Check size={14} className="text-white" />
                            </div>
                          )}
                          <div className="text-3xl mb-3">{serviceIcons[service.id] || serviceIcons.default}</div>
                          <h3 className="font-bold text-[#001e50] text-lg mb-1">{service.name}</h3>
                          <p className="text-sm text-gray-500 mb-3 line-clamp-2">{service.description}</p>
                          <div className="flex items-center justify-between">
                            <span className="text-xs text-gray-400 flex items-center gap-1">
                              <Clock size={12} />
                              {service.estimatedTime || '2-4 hours'}
                            </span>
                            <span className="font-bold text-[#c9a227]">{formatPrice(service.basePrice)}</span>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Step 2: Vehicle Info */}
              {step === 2 && (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-2xl font-bold text-[#001e50] mb-2">Vehicle Information</h2>
                    <p className="text-gray-500">Tell us about your vehicle</p>
                  </div>
                  
                  {/* Brand Selection */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-3">Select Brand</label>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                      {carModels.map((brand) => (
                        <button
                          key={brand.brand}
                          onClick={() => {
                            setSelectedBrand(brand.brand);
                            setFormData({ ...formData, carModel: '' });
                          }}
                          className={`p-4 rounded-xl border-2 text-center transition-all ${
                            selectedBrand === brand.brand
                              ? 'border-[#001e50] bg-[#001e50]/5'
                              : 'border-gray-200 hover:border-gray-300'
                          }`}
                        >
                          <img 
                            src={`/logos/${brand.brand.toLowerCase()}.png`} 
                            alt={brand.brand}
                            className="w-12 h-12 mx-auto mb-2 object-contain"
                            onError={(e) => { e.target.style.display = 'none'; }}
                          />
                          <span className="font-medium text-sm">{brand.brand}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                  
                  {/* Model & Year */}
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Model</label>
                      <div className="relative">
                        <select
                          className="w-full appearance-none px-4 py-3.5 rounded-xl border border-gray-200 bg-white focus:border-[#001e50] focus:ring-2 focus:ring-[#001e50]/10 outline-none transition-all font-medium"
                          value={formData.carModel}
                          onChange={(e) => setFormData({ ...formData, carModel: e.target.value })}
                          disabled={!selectedBrand}
                        >
                          <option value="">Select Model</option>
                          {selectedBrand && carModels.find(b => b.brand === selectedBrand)?.models.map((model) => (
                            <option key={model} value={`${selectedBrand} ${model}`}>{model}</option>
                          ))}
                        </select>
                        <ChevronDown size={18} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Year</label>
                      <div className="relative">
                        <select
                          className="w-full appearance-none px-4 py-3.5 rounded-xl border border-gray-200 bg-white focus:border-[#001e50] focus:ring-2 focus:ring-[#001e50]/10 outline-none transition-all font-medium"
                          value={formData.carYear}
                          onChange={(e) => setFormData({ ...formData, carYear: e.target.value })}
                        >
                          <option value="">Select Year</option>
                          {years.map((year) => (
                            <option key={year} value={year}>{year}</option>
                          ))}
                        </select>
                        <ChevronDown size={18} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                      </div>
                    </div>
                  </div>
                  
                  {/* Registration Number */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Registration Number</label>
                    <input
                      type="text"
                      className="w-full px-4 py-3.5 rounded-xl border border-gray-200 focus:border-[#001e50] focus:ring-2 focus:ring-[#001e50]/10 outline-none transition-all uppercase font-mono text-lg tracking-wider"
                      placeholder="MH 01 AB 1234"
                      value={formData.registrationNumber}
                      onChange={(e) => setFormData({ ...formData, registrationNumber: e.target.value.toUpperCase() })}
                    />
                  </div>
                  
                  {/* Problem Description */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Describe the Issue <span className="text-gray-400 font-normal">(Optional)</span>
                    </label>
                    <textarea
                      className="w-full px-4 py-3.5 rounded-xl border border-gray-200 focus:border-[#001e50] focus:ring-2 focus:ring-[#001e50]/10 outline-none transition-all min-h-[120px] resize-none"
                      placeholder="Tell us about any specific issues or concerns..."
                      value={formData.problemDescription}
                      onChange={(e) => setFormData({ ...formData, problemDescription: e.target.value })}
                    />
                  </div>
                </div>
              )}

              {/* Step 3: Location */}
              {step === 3 && (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-2xl font-bold text-[#001e50] mb-2">Select Service Center</h2>
                    <p className="text-gray-500">Choose a convenient location near you</p>
                  </div>
                  
                  {/* City Selection */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">City</label>
                    <div className="relative">
                      <MapPin size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                      <select
                        className="w-full appearance-none pl-11 pr-10 py-3.5 rounded-xl border border-gray-200 bg-white focus:border-[#001e50] focus:ring-2 focus:ring-[#001e50]/10 outline-none transition-all font-medium"
                        value={formData.city}
                        onChange={(e) => setFormData({ ...formData, city: e.target.value, serviceCenterId: '' })}
                      >
                        <option value="">Select City</option>
                        {cities.map((city) => (
                          <option key={city} value={city}>{city}</option>
                        ))}
                      </select>
                      <ChevronDown size={18} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                    </div>
                  </div>
                  
                  {/* Service Centers */}
                  {formData.city && (
                    <div className="space-y-4">
                      <label className="block text-sm font-semibold text-gray-700">Available Service Centers</label>
                      {serviceCenters.map((center) => {
                        const isSelected = formData.serviceCenterId === center.id;
                        return (
                          <button
                            key={center.id}
                            onClick={() => setFormData({ ...formData, serviceCenterId: center.id })}
                            className={`w-full p-5 rounded-2xl border-2 text-left transition-all ${
                              isSelected
                                ? 'border-[#001e50] bg-[#001e50]/5 shadow-lg'
                                : 'border-gray-200 hover:border-gray-300 hover:shadow-md'
                            }`}
                          >
                            <div className="flex items-start justify-between gap-4">
                              <div className="flex-1">
                                <div className="flex items-center gap-2 mb-1">
                                  <h3 className="font-bold text-[#001e50] text-lg">{center.name}</h3>
                                  {isSelected && (
                                    <span className="w-5 h-5 bg-[#001e50] rounded-full flex items-center justify-center">
                                      <Check size={12} className="text-white" />
                                    </span>
                                  )}
                                </div>
                                <p className="text-gray-500 text-sm flex items-center gap-1.5 mb-2">
                                  <MapPin size={14} />
                                  {center.address}
                                </p>
                                <div className="flex items-center gap-4 text-sm">
                                  <span className="flex items-center gap-1 text-gray-500">
                                    <Clock size={14} />
                                    {center.openTime || '9 AM - 7 PM'}
                                  </span>
                                  <span className="flex items-center gap-1 text-gray-500">
                                    <Phone size={14} />
                                    {center.phone || '+91 98765 43210'}
                                  </span>
                                </div>
                              </div>
                              {center.rating && (
                                <div className="flex items-center gap-1 px-3 py-1.5 bg-[#c9a227]/10 text-[#c9a227] rounded-lg font-bold">
                                  <Star size={16} fill="currentColor" />
                                  {center.rating}
                                </div>
                              )}
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>
              )}

              {/* Step 4: Schedule */}
              {step === 4 && (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-2xl font-bold text-[#001e50] mb-2">Schedule Appointment</h2>
                    <p className="text-gray-500">Choose your preferred date and time</p>
                  </div>
                  
                  {/* Date Selection */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Preferred Date</label>
                    <div className="relative">
                      <Calendar size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                      <input
                        type="date"
                        className="w-full pl-11 pr-4 py-3.5 rounded-xl border border-gray-200 focus:border-[#001e50] focus:ring-2 focus:ring-[#001e50]/10 outline-none transition-all font-medium"
                        min={getMinDate()}
                        value={formData.preferredDate}
                        onChange={(e) => setFormData({ ...formData, preferredDate: e.target.value })}
                      />
                    </div>
                  </div>
                  
                  {/* Time Slots */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-3">Preferred Time</label>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                      {timeSlots.map((slot) => {
                        const isSelected = formData.preferredTime === slot.time;
                        return (
                          <button
                            key={slot.time}
                            onClick={() => slot.available && setFormData({ ...formData, preferredTime: slot.time })}
                            disabled={!slot.available}
                            className={`p-4 rounded-xl border-2 text-center font-medium transition-all ${
                              !slot.available
                                ? 'border-gray-100 bg-gray-50 text-gray-300 cursor-not-allowed'
                                : isSelected
                                  ? 'border-[#001e50] bg-[#001e50] text-white shadow-lg'
                                  : 'border-gray-200 text-gray-600 hover:border-gray-300 hover:shadow-md'
                            }`}
                          >
                            <Clock size={18} className={`mx-auto mb-1 ${isSelected ? 'text-[#c9a227]' : ''}`} />
                            <span>{slot.time}</span>
                            {!slot.available && <p className="text-xs mt-1">Booked</p>}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                  
                  {formData.preferredDate && formData.preferredTime && (
                    <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 flex items-center gap-3">
                      <CheckCircle2 size={20} className="text-emerald-600" />
                      <p className="text-emerald-800">
                        <span className="font-semibold">Appointment:</span>{' '}
                        {new Date(formData.preferredDate).toLocaleDateString('en-IN', {
                          weekday: 'long', month: 'long', day: 'numeric', year: 'numeric'
                        })} at {formData.preferredTime}
                      </p>
                    </div>
                  )}
                </div>
              )}

              {/* Step 5: Contact */}
              {step === 5 && (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-2xl font-bold text-[#001e50] mb-2">Contact Information</h2>
                    <p className="text-gray-500">We'll send booking confirmation to these details</p>
                  </div>
                  
                  {/* Name */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Full Name</label>
                    <div className="relative">
                      <User size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                      <input
                        type="text"
                        className="w-full pl-11 pr-4 py-3.5 rounded-xl border border-gray-200 focus:border-[#001e50] focus:ring-2 focus:ring-[#001e50]/10 outline-none transition-all font-medium"
                        placeholder="Enter your full name"
                        value={formData.customerName}
                        onChange={(e) => setFormData({ ...formData, customerName: e.target.value })}
                      />
                    </div>
                  </div>
                  
                  {/* Email & Phone */}
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Email Address</label>
                      <div className="relative">
                        <Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input
                          type="email"
                          className="w-full pl-11 pr-4 py-3.5 rounded-xl border border-gray-200 focus:border-[#001e50] focus:ring-2 focus:ring-[#001e50]/10 outline-none transition-all"
                          placeholder="your@email.com"
                          value={formData.customerEmail}
                          onChange={(e) => setFormData({ ...formData, customerEmail: e.target.value })}
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Phone Number</label>
                      <div className="relative">
                        <Phone size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input
                          type="tel"
                          className="w-full pl-11 pr-4 py-3.5 rounded-xl border border-gray-200 focus:border-[#001e50] focus:ring-2 focus:ring-[#001e50]/10 outline-none transition-all"
                          placeholder="+91 98765 43210"
                          value={formData.customerPhone}
                          onChange={(e) => setFormData({ ...formData, customerPhone: e.target.value })}
                        />
                      </div>
                    </div>
                  </div>
                  
                  {/* Terms */}
                  <div className="bg-gray-50 rounded-xl p-4 flex items-start gap-3">
                    <AlertCircle size={20} className="text-gray-400 mt-0.5" />
                    <p className="text-sm text-gray-600">
                      By confirming this booking, you agree to our{' '}
                      <a href="#" className="text-[#001e50] font-medium hover:underline">Terms of Service</a> and{' '}
                      <a href="#" className="text-[#001e50] font-medium hover:underline">Privacy Policy</a>.
                    </p>
                  </div>
                </div>
              )}

              {/* Navigation Buttons */}
              <div className="flex justify-between mt-8 pt-6 border-t border-gray-100">
                {step > 1 ? (
                  <button 
                    onClick={prevStep} 
                    className="flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-gray-600 hover:bg-gray-100 transition-all"
                  >
                    <ArrowLeft size={18} />
                    Previous
                  </button>
                ) : (
                  <div />
                )}
                
                {step < 5 ? (
                  <button
                    onClick={nextStep}
                    disabled={!isStepValid()}
                    className={`flex items-center gap-2 px-8 py-3 rounded-xl font-semibold transition-all ${
                      isStepValid()
                        ? 'bg-[#001e50] text-white hover:bg-[#003580] shadow-lg hover:shadow-xl'
                        : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                    }`}
                  >
                    Continue
                    <ChevronRight size={18} />
                  </button>
                ) : (
                  <button
                    onClick={handleSubmit}
                    disabled={!isStepValid() || submitting}
                    className={`flex items-center gap-2 px-8 py-3.5 rounded-xl font-bold text-lg transition-all ${
                      isStepValid() && !submitting
                        ? 'bg-[#c9a227] text-[#001e50] hover:bg-[#d4af37] shadow-lg hover:shadow-xl'
                        : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                    }`}
                  >
                    {submitting ? (
                      <>
                        <div className="w-5 h-5 border-2 border-[#001e50]/30 border-t-[#001e50] rounded-full animate-spin" />
                        Booking...
                      </>
                    ) : (
                      <>
                        Confirm Booking
                        <Check size={20} />
                      </>
                    )}
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Sidebar Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sticky top-32">
              <h3 className="font-bold text-[#001e50] text-lg mb-4 flex items-center gap-2">
                <span className="w-8 h-8 bg-[#001e50]/10 rounded-lg flex items-center justify-center">
                  📋
                </span>
                Booking Summary
              </h3>
              
              {/* Service Type */}
              {formData.serviceTypeId && (
                <div className="mb-4 pb-4 border-b border-gray-100">
                  <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">Service Type</p>
                  <p className="font-semibold text-[#001e50]">
                    {serviceTypes.find(s => s.id === formData.serviceTypeId)?.name}
                  </p>
                </div>
              )}

              {/* Vehicle */}
              {formData.carModel && (
                <div className="mb-4 pb-4 border-b border-gray-100">
                  <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">Vehicle</p>
                  <p className="font-semibold text-[#001e50]">{formData.carModel}</p>
                  <p className="text-sm text-gray-500">Year: {formData.carYear}</p>
                  {formData.registrationNumber && (
                    <p className="text-sm font-mono text-gray-500 mt-1">{formData.registrationNumber}</p>
                  )}
                </div>
              )}

              {/* Service Center */}
              {formData.serviceCenterId && (
                <div className="mb-4 pb-4 border-b border-gray-100">
                  <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">Service Center</p>
                  <p className="font-semibold text-[#001e50]">
                    {serviceCenters.find(c => c.id === formData.serviceCenterId)?.name}
                  </p>
                  <p className="text-sm text-gray-500">{formData.city}</p>
                </div>
              )}

              {/* Appointment */}
              {formData.preferredDate && (
                <div className="mb-4 pb-4 border-b border-gray-100">
                  <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">Appointment</p>
                  <p className="font-semibold text-[#001e50]">
                    {new Date(formData.preferredDate).toLocaleDateString('en-IN', {
                      weekday: 'short', month: 'short', day: 'numeric'
                    })}
                  </p>
                  {formData.preferredTime && (
                    <p className="text-sm text-gray-500">{formData.preferredTime}</p>
                  )}
                </div>
              )}

              {/* Estimate */}
              {estimate && (
                <div className="bg-gradient-to-br from-[#001e50]/5 to-[#c9a227]/10 rounded-xl p-4 mb-4">
                  <p className="text-xs text-gray-500 uppercase tracking-wider mb-3 font-semibold">Estimated Cost</p>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-500">Service Charge</span>
                      <span className="font-medium">{formatPrice(estimate.basePrice)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">GST (18%)</span>
                      <span className="font-medium">{formatPrice(estimate.gst)}</span>
                    </div>
                    <div className="flex justify-between pt-2 border-t border-gray-200">
                      <span className="font-bold text-[#001e50]">Total</span>
                      <span className="font-bold text-[#c9a227] text-lg">{formatPrice(estimate.total)}</span>
                    </div>
                  </div>
                  {estimate.estimatedTime && (
                    <p className="text-xs text-gray-500 mt-3 flex items-center gap-1.5 pt-3 border-t border-gray-200">
                      <Clock size={14} />
                      Est. duration: {estimate.estimatedTime}
                    </p>
                  )}
                  <p className="text-xs text-gray-400 mt-2 italic">
                    * Final cost may vary after inspection
                  </p>
                </div>
              )}

              {/* Trust Badges */}
              <div className="space-y-3 pt-4 border-t border-gray-100">
                <div className="flex items-center gap-3 text-sm">
                  <div className="w-8 h-8 bg-emerald-100 rounded-lg flex items-center justify-center">
                    <Shield size={16} className="text-emerald-600" />
                  </div>
                  <span className="text-gray-600">100% Genuine Parts</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Award size={16} className="text-blue-600" />
                  </div>
                  <span className="text-gray-600">Certified Technicians</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <div className="w-8 h-8 bg-[#c9a227]/10 rounded-lg flex items-center justify-center">
                    <CheckCircle2 size={16} className="text-[#c9a227]" />
                  </div>
                  <span className="text-gray-600">Service Warranty</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
