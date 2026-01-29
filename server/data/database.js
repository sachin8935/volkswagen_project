// Volkswagen Group - Complete Car Database
export const cars = [
  // VOLKSWAGEN
  {
    id: 'vw-virtus',
    brand: 'Volkswagen',
    name: 'Virtus',
    tagline: 'The Big Sedan',
    category: 'Sedan',
    image: 'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=600&auto=format&fit=crop&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=600&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=600&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=600&auto=format&fit=crop&q=80'
    ],
    startingPrice: 1199000,
    variants: [
      { id: 'comfortline', name: 'Comfortline', price: 1199000 },
      { id: 'highline', name: 'Highline', price: 1399000 },
      { id: 'topline', name: 'Topline', price: 1549000 },
      { id: 'gt-line', name: 'GT Line', price: 1699000 },
      { id: 'gt-plus', name: 'GT Plus', price: 1899000 }
    ],
    colors: [
      { id: 'candy-white', name: 'Candy White', hex: '#FFFFFF' },
      { id: 'carbon-steel', name: 'Carbon Steel Grey', hex: '#4A4A4A' },
      { id: 'curcuma-yellow', name: 'Curcuma Yellow', hex: '#F5C518' },
      { id: 'wild-cherry', name: 'Wild Cherry Red', hex: '#8B0000' },
      { id: 'reflex-silver', name: 'Reflex Silver', hex: '#C0C0C0' },
      { id: 'rising-blue', name: 'Rising Blue', hex: '#1E3A5F' }
    ],
    specs: {
      engine: '1.0L TSI / 1.5L TSI EVO',
      power: '115 PS / 150 PS',
      torque: '178 Nm / 250 Nm',
      transmission: '6-Speed MT / 7-Speed DSG',
      fuelType: 'Petrol',
      mileage: '18.67 - 19.40 km/l'
    },
    features: ['Ventilated Seats', 'Wireless Charging', '10.1" Touchscreen', 'Digital Cockpit', 'Sunroof', '6 Airbags', 'Cruise Control', 'Auto Headlamps'],
    description: 'The Volkswagen Virtus brings German engineering excellence to the sedan segment with its refined performance and premium features.'
  },
  {
    id: 'vw-taigun',
    brand: 'Volkswagen',
    name: 'Taigun',
    tagline: 'Born Confident',
    category: 'Compact SUV',
    image: 'https://images.unsplash.com/photo-1609521263047-f8f205293f24?w=600&auto=format&fit=crop&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1609521263047-f8f205293f24?w=600&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1609521263047-f8f205293f24?w=600&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=600&auto=format&fit=crop&q=80'
    ],
    startingPrice: 1170000,
    variants: [
      { id: 'comfortline', name: 'Comfortline', price: 1170000 },
      { id: 'highline', name: 'Highline', price: 1420000 },
      { id: 'topline', name: 'Topline', price: 1599000 },
      { id: 'gt-line', name: 'GT Line', price: 1699000 },
      { id: 'gt-plus', name: 'GT Plus', price: 1899000 }
    ],
    colors: [
      { id: 'candy-white', name: 'Candy White', hex: '#FFFFFF' },
      { id: 'carbon-steel', name: 'Carbon Steel Grey', hex: '#4A4A4A' },
      { id: 'wild-cherry', name: 'Wild Cherry Red', hex: '#8B0000' },
      { id: 'curcuma-yellow', name: 'Curcuma Yellow', hex: '#F5C518' },
      { id: 'rising-blue', name: 'Rising Blue', hex: '#1E3A5F' }
    ],
    specs: {
      engine: '1.0L TSI / 1.5L TSI EVO',
      power: '115 PS / 150 PS',
      torque: '178 Nm / 250 Nm',
      transmission: '6-Speed MT / 7-Speed DSG',
      fuelType: 'Petrol',
      mileage: '17.88 - 18.64 km/l'
    },
    features: ['Electric Sunroof', 'Ambient Lighting', 'Digital Cockpit Pro', 'Wireless CarPlay', '6 Airbags', 'ESC', 'Hill Hold Control', 'Rear AC Vents'],
    description: 'The Taigun is a compact SUV that combines German engineering with bold design and confidence-inspiring performance.'
  },
  {
    id: 'vw-tiguan',
    brand: 'Volkswagen',
    name: 'Tiguan R-Line',
    tagline: 'Luxury Meets Performance',
    category: 'SUV',
    image: 'https://images.unsplash.com/photo-1617814076367-b759c7d7e738?w=600&auto=format&fit=crop&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1617814076367-b759c7d7e738?w=600&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1617814076367-b759c7d7e738?w=600&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=600&auto=format&fit=crop&q=80'
    ],
    startingPrice: 3542000,
    variants: [
      { id: 'elegance', name: 'Elegance', price: 3542000 },
      { id: 'r-line', name: 'R-Line', price: 3699000 }
    ],
    colors: [
      { id: 'oryx-white', name: 'Oryx White Pearl', hex: '#F5F5F5' },
      { id: 'deep-black', name: 'Deep Black Pearl', hex: '#0A0A0A' },
      { id: 'dolphin-grey', name: 'Dolphin Grey', hex: '#6B6B6B' },
      { id: 'kings-red', name: 'Kings Red', hex: '#8B0000' }
    ],
    specs: {
      engine: '2.0L TSI',
      power: '190 PS',
      torque: '320 Nm',
      transmission: '7-Speed DSG 4MOTION',
      fuelType: 'Petrol',
      mileage: '12.65 km/l'
    },
    features: ['Panoramic Sunroof', 'Matrix LED Headlights', 'Digital Cockpit Pro', 'Harman Kardon Sound', '4MOTION AWD', 'DCC Adaptive Chassis', 'Park Assist', '8 Airbags'],
    description: 'The Tiguan R-Line delivers premium SUV experience with advanced technology, 4MOTION all-wheel drive, and sporty aesthetics.'
  },
  {
    id: 'vw-golf-gti',
    brand: 'Volkswagen',
    name: 'Golf GTI',
    tagline: 'The Original Hot Hatch',
    category: 'Performance Hatchback',
    image: 'https://images.unsplash.com/photo-1616455579100-2ceaa4eb2d37?w=600&auto=format&fit=crop&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1616455579100-2ceaa4eb2d37?w=600&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1616455579100-2ceaa4eb2d37?w=600&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=600&auto=format&fit=crop&q=80'
    ],
    startingPrice: 4500000,
    variants: [
      { id: 'gti', name: 'GTI', price: 4500000 },
      { id: 'gti-clubsport', name: 'GTI Clubsport', price: 5200000 }
    ],
    colors: [
      { id: 'pure-white', name: 'Pure White', hex: '#FFFFFF' },
      { id: 'tornado-red', name: 'Tornado Red', hex: '#CC0000' },
      { id: 'deep-black', name: 'Deep Black Pearl', hex: '#0A0A0A' },
      { id: 'atlantic-blue', name: 'Atlantic Blue', hex: '#1A3A5C' }
    ],
    specs: {
      engine: '2.0L TSI',
      power: '245 PS',
      torque: '370 Nm',
      transmission: '7-Speed DSG',
      fuelType: 'Petrol',
      mileage: '14.2 km/l'
    },
    features: ['GTI Sport Seats', 'Digital Cockpit Pro', 'DCC Adaptive Suspension', 'Progressive Steering', 'Drive Mode Select', 'Performance Monitor', 'Akrapovič Exhaust (Clubsport)', 'Limited-Slip Differential'],
    description: 'The legendary Golf GTI continues to set the benchmark for hot hatchbacks with its perfect blend of performance and practicality.'
  },

  // SKODA
  {
    id: 'skoda-kushaq',
    brand: 'Skoda',
    name: 'Kushaq',
    tagline: 'Built for India. Built to Explore.',
    category: 'Compact SUV',
    image: 'https://images.unsplash.com/photo-1619767886558-efdc259cde1a?w=600&auto=format&fit=crop&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1619767886558-efdc259cde1a?w=600&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1619767886558-efdc259cde1a?w=600&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=600&auto=format&fit=crop&q=80'
    ],
    startingPrice: 1109000,
    variants: [
      { id: 'active', name: 'Active', price: 1109000 },
      { id: 'ambition', name: 'Ambition', price: 1299000 },
      { id: 'style', name: 'Style', price: 1499000 },
      { id: 'monte-carlo', name: 'Monte Carlo', price: 1799000 }
    ],
    colors: [
      { id: 'candy-white', name: 'Candy White', hex: '#FFFFFF' },
      { id: 'carbon-steel', name: 'Carbon Steel', hex: '#4A4A4A' },
      { id: 'tornado-red', name: 'Tornado Red', hex: '#CC0000' },
      { id: 'honey-orange', name: 'Honey Orange', hex: '#FF8C00' },
      { id: 'reflex-silver', name: 'Reflex Silver', hex: '#C0C0C0' }
    ],
    specs: {
      engine: '1.0L TSI / 1.5L TSI',
      power: '115 PS / 150 PS',
      torque: '178 Nm / 250 Nm',
      transmission: '6-Speed MT / 6-Speed AT / 7-Speed DSG',
      fuelType: 'Petrol',
      mileage: '17.5 - 20.0 km/l'
    },
    features: ['Electric Sunroof', 'Ventilated Seats', 'Wireless Charging', '10" Touchscreen', 'Connected Car Tech', '6 Airbags', 'TPMS', 'Cruise Control'],
    description: 'The Skoda Kushaq combines European design philosophy with Indian sensibilities for an SUV that is Simply Clever.'
  },
  {
    id: 'skoda-slavia',
    brand: 'Skoda',
    name: 'Slavia',
    tagline: 'Designed to Inspire',
    category: 'Sedan',
    image: 'https://images.unsplash.com/photo-1590362891991-f776e747a588?w=600&auto=format&fit=crop&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1590362891991-f776e747a588?w=600&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1590362891991-f776e747a588?w=600&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=600&auto=format&fit=crop&q=80'
    ],
    startingPrice: 1089000,
    variants: [
      { id: 'active', name: 'Active', price: 1089000 },
      { id: 'ambition', name: 'Ambition', price: 1289000 },
      { id: 'style', name: 'Style', price: 1489000 },
      { id: 'monte-carlo', name: 'Monte Carlo', price: 1789000 }
    ],
    colors: [
      { id: 'candy-white', name: 'Candy White', hex: '#FFFFFF' },
      { id: 'carbon-steel', name: 'Carbon Steel', hex: '#4A4A4A' },
      { id: 'tornado-red', name: 'Tornado Red', hex: '#CC0000' },
      { id: 'magic-black', name: 'Magic Black', hex: '#0A0A0A' },
      { id: 'brilliant-silver', name: 'Brilliant Silver', hex: '#C0C0C0' }
    ],
    specs: {
      engine: '1.0L TSI / 1.5L TSI',
      power: '115 PS / 150 PS',
      torque: '178 Nm / 250 Nm',
      transmission: '6-Speed MT / 6-Speed AT / 7-Speed DSG',
      fuelType: 'Petrol',
      mileage: '18.0 - 20.0 km/l'
    },
    features: ['Electric Sunroof', 'Ventilated Seats', '10" Touchscreen', 'Digital Cockpit', 'Wireless CarPlay', '6 Airbags', 'ESC', 'Rain Sensing Wipers'],
    description: 'The Slavia brings Skoda\'s signature Simply Clever features to the premium sedan segment with style and substance.'
  },
  {
    id: 'skoda-kylaq',
    brand: 'Skoda',
    name: 'Kylaq',
    tagline: 'Small SUV, Big Attitude',
    category: 'Sub-4m SUV',
    image: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=600&auto=format&fit=crop&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=600&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=600&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=600&auto=format&fit=crop&q=80'
    ],
    startingPrice: 899000,
    variants: [
      { id: 'classic', name: 'Classic', price: 899000 },
      { id: 'signature', name: 'Signature', price: 1049000 },
      { id: 'signature-plus', name: 'Signature Plus', price: 1199000 },
      { id: 'prestige', name: 'Prestige', price: 1449000 }
    ],
    colors: [
      { id: 'candy-white', name: 'Candy White', hex: '#FFFFFF' },
      { id: 'brilliant-silver', name: 'Brilliant Silver', hex: '#C0C0C0' },
      { id: 'carbon-steel', name: 'Carbon Steel', hex: '#4A4A4A' },
      { id: 'tornado-red', name: 'Tornado Red', hex: '#CC0000' },
      { id: 'lava-blue', name: 'Lava Blue', hex: '#1E3A5F' }
    ],
    specs: {
      engine: '1.0L TSI',
      power: '115 PS',
      torque: '178 Nm',
      transmission: '6-Speed MT / 6-Speed AT',
      fuelType: 'Petrol',
      mileage: '19.0 - 20.5 km/l'
    },
    features: ['Sunroof', 'Wireless Charging', '10.1" Touchscreen', 'Connected Car Tech', '6 Airbags', 'ESC', 'Hill Hold', 'Auto Climate Control'],
    description: 'The Kylaq is Skoda\'s entry into the compact SUV segment, offering premium features in a value-focused package.'
  },
  {
    id: 'skoda-kodiaq',
    brand: 'Skoda',
    name: 'Kodiaq',
    tagline: 'Adventure Ready',
    category: 'Premium SUV',
    image: 'https://images.unsplash.com/photo-1606611013016-96950a6b8d9f?w=600&auto=format&fit=crop&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1606611013016-96950a6b8d9f?w=600&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1606611013016-96950a6b8d9f?w=600&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=600&auto=format&fit=crop&q=80'
    ],
    startingPrice: 3899000,
    variants: [
      { id: 'style', name: 'Style', price: 3899000 },
      { id: 'l-k', name: 'L&K', price: 4499000 },
      { id: 'sportline', name: 'Sportline', price: 4299000 }
    ],
    colors: [
      { id: 'moon-white', name: 'Moon White', hex: '#F5F5F5' },
      { id: 'magic-black', name: 'Magic Black', hex: '#0A0A0A' },
      { id: 'graphite-grey', name: 'Graphite Grey', hex: '#4A4A4A' },
      { id: 'lava-blue', name: 'Lava Blue', hex: '#1E3A5F' }
    ],
    specs: {
      engine: '2.0L TSI',
      power: '190 PS',
      torque: '320 Nm',
      transmission: '7-Speed DSG 4x4',
      fuelType: 'Petrol',
      mileage: '12.0 km/l'
    },
    features: ['Panoramic Sunroof', '7 Seats', 'Canton Sound System', 'Virtual Cockpit', '4x4', 'DCC', 'Matrix LED', '9 Airbags'],
    description: 'The Kodiaq is Skoda\'s flagship SUV offering 7-seat versatility with premium luxury and capable all-wheel drive.'
  },
  {
    id: 'skoda-octavia-rs',
    brand: 'Skoda',
    name: 'Octavia RS',
    tagline: 'Performance Redefined',
    category: 'Performance Sedan',
    image: 'https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?w=600&auto=format&fit=crop&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?w=600&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?w=600&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=600&auto=format&fit=crop&q=80'
    ],
    startingPrice: 5099000,
    variants: [
      { id: 'rs-245', name: 'RS 245', price: 5099000 }
    ],
    colors: [
      { id: 'steel-grey', name: 'Steel Grey', hex: '#4A4A4A' },
      { id: 'race-blue', name: 'Race Blue', hex: '#001F5F' },
      { id: 'magic-black', name: 'Magic Black', hex: '#0A0A0A' },
      { id: 'corrida-red', name: 'Corrida Red', hex: '#CC0000' }
    ],
    specs: {
      engine: '2.0L TSI',
      power: '245 PS',
      torque: '370 Nm',
      transmission: '7-Speed DSG',
      fuelType: 'Petrol',
      mileage: '14.2 km/l'
    },
    features: ['RS Sports Seats', 'Virtual Cockpit', 'Progressive Steering', 'DCC', 'Drive Mode Select', 'Canton Sound', 'Matrix LED', '8 Airbags'],
    description: 'The Octavia RS combines everyday practicality with exhilarating performance for the enthusiast driver.'
  },

  // AUDI
  {
    id: 'audi-a4',
    brand: 'Audi',
    name: 'A4',
    tagline: 'Vorsprung durch Technik',
    category: 'Luxury Sedan',
    image: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=600&auto=format&fit=crop&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=600&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=600&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=600&auto=format&fit=crop&q=80'
    ],
    startingPrice: 4599000,
    variants: [
      { id: 'premium', name: 'Premium', price: 4599000 },
      { id: 'premium-plus', name: 'Premium Plus', price: 4999000 },
      { id: 'technology', name: 'Technology', price: 5499000 }
    ],
    colors: [
      { id: 'ibis-white', name: 'Ibis White', hex: '#FFFFFF' },
      { id: 'mythos-black', name: 'Mythos Black', hex: '#0A0A0A' },
      { id: 'navarra-blue', name: 'Navarra Blue', hex: '#1A3A5C' },
      { id: 'manhattan-grey', name: 'Manhattan Grey', hex: '#6B6B6B' },
      { id: 'tango-red', name: 'Tango Red', hex: '#CC0000' }
    ],
    specs: {
      engine: '2.0L TFSI',
      power: '190 PS',
      torque: '320 Nm',
      transmission: '7-Speed S tronic',
      fuelType: 'Petrol',
      mileage: '17.42 km/l'
    },
    features: ['Virtual Cockpit Plus', 'MMI Touch Display', 'Bang & Olufsen Sound', 'Matrix LED', 'Audi Drive Select', 'quattro AWD', 'Park Assist', '8 Airbags'],
    description: 'The Audi A4 defines the premium sedan segment with cutting-edge technology and refined driving dynamics.'
  },
  {
    id: 'audi-a6',
    brand: 'Audi',
    name: 'A6',
    tagline: 'Business Class',
    category: 'Executive Sedan',
    image: 'https://images.unsplash.com/photo-1542282088-fe8426682b8f?w=600&auto=format&fit=crop&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=600&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=600&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=600&auto=format&fit=crop&q=80'
    ],
    startingPrice: 6499000,
    variants: [
      { id: 'premium-plus', name: 'Premium Plus', price: 6499000 },
      { id: 'technology', name: 'Technology', price: 7199000 }
    ],
    colors: [
      { id: 'ibis-white', name: 'Ibis White', hex: '#FFFFFF' },
      { id: 'mythos-black', name: 'Mythos Black', hex: '#0A0A0A' },
      { id: 'firmament-blue', name: 'Firmament Blue', hex: '#1A3A5C' },
      { id: 'daytona-grey', name: 'Daytona Grey', hex: '#6B6B6B' }
    ],
    specs: {
      engine: '2.0L TFSI / 3.0L TFSI',
      power: '245 PS / 340 PS',
      torque: '370 Nm / 500 Nm',
      transmission: '7-Speed S tronic',
      fuelType: 'Petrol',
      mileage: '14.11 km/l'
    },
    features: ['Dual MMI Touch Displays', 'Virtual Cockpit Plus', 'Bang & Olufsen 3D Sound', 'HD Matrix LED', 'Air Suspension', 'quattro AWD', 'Audi Pre Sense', '8 Airbags'],
    description: 'The Audi A6 delivers executive luxury with advanced technology and sophisticated design.'
  },
  {
    id: 'audi-a8-l',
    brand: 'Audi',
    name: 'A8 L',
    tagline: 'The Art of Progress',
    category: 'Flagship Sedan',
    image: 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=600&auto=format&fit=crop&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1542282088-fe8426682b8f?w=600&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1542282088-fe8426682b8f?w=600&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=600&auto=format&fit=crop&q=80'
    ],
    startingPrice: 14499000,
    variants: [
      { id: 'celebration', name: 'Celebration', price: 14499000 },
      { id: 'technology', name: 'Technology', price: 16999000 }
    ],
    colors: [
      { id: 'glacier-white', name: 'Glacier White', hex: '#F5F5F5' },
      { id: 'firmament-blue', name: 'Firmament Blue', hex: '#1A3A5C' },
      { id: 'vesuvius-grey', name: 'Vesuvius Grey', hex: '#4A4A4A' },
      { id: 'mythos-black', name: 'Mythos Black', hex: '#0A0A0A' }
    ],
    specs: {
      engine: '3.0L TFSI',
      power: '340 PS',
      torque: '500 Nm',
      transmission: '8-Speed Tiptronic',
      fuelType: 'Petrol',
      mileage: '10.8 km/l'
    },
    features: ['Predictive Active Suspension', 'Rear Relaxation Package', 'Bang & Olufsen Advanced', 'OLED Rear Lights', 'Foot Massage', 'quattro AWD', 'Night Vision', '10 Airbags'],
    description: 'The Audi A8 L represents the pinnacle of luxury motoring with groundbreaking technology and unparalleled comfort.'
  },
  {
    id: 'audi-s5-sportback',
    brand: 'Audi',
    name: 'S5 Sportback',
    tagline: 'Performance Meets Elegance',
    category: 'Performance Coupe',
    image: 'https://images.unsplash.com/photo-1596611047764-8e81846e9bf0?w=600&auto=format&fit=crop&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?w=600&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?w=600&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=600&auto=format&fit=crop&q=80'
    ],
    startingPrice: 7799000,
    variants: [
      { id: 'sportback', name: 'S5 Sportback', price: 7799000 }
    ],
    colors: [
      { id: 'tango-red', name: 'Tango Red', hex: '#CC0000' },
      { id: 'navarra-blue', name: 'Navarra Blue', hex: '#1A3A5C' },
      { id: 'glacier-white', name: 'Glacier White', hex: '#F5F5F5' },
      { id: 'mythos-black', name: 'Mythos Black', hex: '#0A0A0A' }
    ],
    specs: {
      engine: '3.0L TFSI V6',
      power: '354 PS',
      torque: '500 Nm',
      transmission: '8-Speed Tiptronic',
      fuelType: 'Petrol',
      mileage: '12.7 km/l'
    },
    features: ['S Sport Seats', 'Virtual Cockpit Plus', 'quattro Sport Differential', 'Audi Drive Select', 'Bang & Olufsen 3D', 'Matrix LED', 'Sport Suspension', '8 Airbags'],
    description: 'The S5 Sportback blends coupe aesthetics with everyday practicality and exhilarating V6 performance.'
  },
  {
    id: 'audi-q3',
    brand: 'Audi',
    name: 'Q3',
    tagline: 'Urban Explorer',
    category: 'Compact SUV',
    image: 'https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=600&auto=format&fit=crop&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=600&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=600&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=600&auto=format&fit=crop&q=80'
    ],
    startingPrice: 4399000,
    variants: [
      { id: 'premium-plus', name: 'Premium Plus', price: 4399000 },
      { id: 'technology', name: 'Technology', price: 4899000 }
    ],
    colors: [
      { id: 'glacier-white', name: 'Glacier White', hex: '#F5F5F5' },
      { id: 'mythos-black', name: 'Mythos Black', hex: '#0A0A0A' },
      { id: 'navarra-blue', name: 'Navarra Blue', hex: '#1A3A5C' },
      { id: 'pulse-orange', name: 'Pulse Orange', hex: '#FF6600' }
    ],
    specs: {
      engine: '2.0L TFSI',
      power: '190 PS',
      torque: '320 Nm',
      transmission: '7-Speed S tronic',
      fuelType: 'Petrol',
      mileage: '15.0 km/l'
    },
    features: ['Virtual Cockpit', 'MMI Navigation Plus', 'Panoramic Sunroof', 'Audi Drive Select', 'quattro AWD', 'Park Assist', 'Wireless Charging', '6 Airbags'],
    description: 'The Q3 brings Audi\'s luxury DNA to the compact SUV segment with premium features and agile handling.'
  },
  {
    id: 'audi-q3-sportback',
    brand: 'Audi',
    name: 'Q3 Sportback',
    tagline: 'Style Meets Function',
    category: 'Coupe SUV',
    image: 'https://images.unsplash.com/photo-1580274455191-1c62238fa333?w=600&auto=format&fit=crop&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=600&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=600&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=600&auto=format&fit=crop&q=80'
    ],
    startingPrice: 4699000,
    variants: [
      { id: 'premium-plus', name: 'Premium Plus', price: 4699000 },
      { id: 'technology', name: 'Technology', price: 5199000 }
    ],
    colors: [
      { id: 'glacier-white', name: 'Glacier White', hex: '#F5F5F5' },
      { id: 'mythos-black', name: 'Mythos Black', hex: '#0A0A0A' },
      { id: 'chronos-grey', name: 'Chronos Grey', hex: '#4A4A4A' },
      { id: 'turbo-blue', name: 'Turbo Blue', hex: '#0077BE' }
    ],
    specs: {
      engine: '2.0L TFSI',
      power: '190 PS',
      torque: '320 Nm',
      transmission: '7-Speed S tronic',
      fuelType: 'Petrol',
      mileage: '14.5 km/l'
    },
    features: ['Virtual Cockpit', 'MMI Touch Display', 'Panoramic Sunroof', 'S Line Package', 'quattro AWD', 'Audi Connect', 'Matrix LED', '6 Airbags'],
    description: 'The Q3 Sportback combines coupe-like styling with SUV practicality for those who want to stand out.'
  },
  {
    id: 'audi-q5',
    brand: 'Audi',
    name: 'Q5',
    tagline: 'Premium SUV Excellence',
    category: 'Luxury SUV',
    image: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=600&auto=format&fit=crop&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=600&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=600&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=600&auto=format&fit=crop&q=80'
    ],
    startingPrice: 6599000,
    variants: [
      { id: 'premium-plus', name: 'Premium Plus', price: 6599000 },
      { id: 'technology', name: 'Technology', price: 7199000 }
    ],
    colors: [
      { id: 'glacier-white', name: 'Glacier White', hex: '#F5F5F5' },
      { id: 'mythos-black', name: 'Mythos Black', hex: '#0A0A0A' },
      { id: 'navarra-blue', name: 'Navarra Blue', hex: '#1A3A5C' },
      { id: 'manhattan-grey', name: 'Manhattan Grey', hex: '#6B6B6B' }
    ],
    specs: {
      engine: '2.0L TFSI',
      power: '249 PS',
      torque: '370 Nm',
      transmission: '7-Speed S tronic',
      fuelType: 'Petrol',
      mileage: '13.0 km/l'
    },
    features: ['Virtual Cockpit Plus', 'MMI Touch Dual Display', 'Air Suspension', 'quattro AWD', 'Bang & Olufsen 3D', 'Matrix LED', 'Panoramic Sunroof', '8 Airbags'],
    description: 'The Q5 sets the benchmark for premium SUVs with its blend of luxury, technology, and versatility.'
  },
  {
    id: 'audi-q7',
    brand: 'Audi',
    name: 'Q7',
    tagline: 'The Conqueror',
    category: 'Full-Size SUV',
    image: 'https://images.unsplash.com/photo-1614200179396-2bdb77ebf81b?w=600&auto=format&fit=crop&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=600&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=600&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=600&auto=format&fit=crop&q=80'
    ],
    startingPrice: 8599000,
    variants: [
      { id: 'premium-plus', name: 'Premium Plus', price: 8599000 },
      { id: 'technology', name: 'Technology', price: 9499000 }
    ],
    colors: [
      { id: 'glacier-white', name: 'Glacier White', hex: '#F5F5F5' },
      { id: 'mythos-black', name: 'Mythos Black', hex: '#0A0A0A' },
      { id: 'samurai-grey', name: 'Samurai Grey', hex: '#4A4A4A' },
      { id: 'navarra-blue', name: 'Navarra Blue', hex: '#1A3A5C' }
    ],
    specs: {
      engine: '3.0L TFSI V6',
      power: '340 PS',
      torque: '500 Nm',
      transmission: '8-Speed Tiptronic',
      fuelType: 'Petrol',
      mileage: '11.4 km/l'
    },
    features: ['7 Seats', 'Virtual Cockpit Plus', 'Adaptive Air Suspension', 'quattro AWD', 'Bang & Olufsen Advanced', 'HD Matrix LED', 'Park Assist Plus', '8 Airbags'],
    description: 'The Q7 combines imposing presence with refined luxury for families who demand the best.'
  },
  {
    id: 'audi-q8',
    brand: 'Audi',
    name: 'Q8',
    tagline: 'Flagship of the Q Family',
    category: 'Luxury Coupe SUV',
    image: 'https://images.unsplash.com/photo-1619682817481-e994891cd1f5?w=600&auto=format&fit=crop&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1614200179396-2bdb77ebf81b?w=600&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1614200179396-2bdb77ebf81b?w=600&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=600&auto=format&fit=crop&q=80'
    ],
    startingPrice: 11500000,
    variants: [
      { id: 'celebration', name: 'Celebration', price: 11500000 },
      { id: 'technology', name: 'Technology', price: 12799000 }
    ],
    colors: [
      { id: 'glacier-white', name: 'Glacier White', hex: '#F5F5F5' },
      { id: 'mythos-black', name: 'Mythos Black', hex: '#0A0A0A' },
      { id: 'dragon-orange', name: 'Dragon Orange', hex: '#FF6600' },
      { id: 'galaxy-blue', name: 'Galaxy Blue', hex: '#1A3A5C' }
    ],
    specs: {
      engine: '3.0L TFSI V6',
      power: '340 PS',
      torque: '500 Nm',
      transmission: '8-Speed Tiptronic',
      fuelType: 'Petrol',
      mileage: '10.9 km/l'
    },
    features: ['Dual MMI Touch Displays', 'HD Matrix LED with Laser', 'Air Suspension', 'All-Wheel Steering', 'Bang & Olufsen 3D Advanced', 'Night Vision', 'Head-Up Display', '8 Airbags'],
    description: 'The Q8 is Audi\'s flagship SUV, combining coupe aesthetics with commanding presence and cutting-edge technology.'
  },

  // PORSCHE
  {
    id: 'porsche-macan',
    brand: 'Porsche',
    name: 'Macan',
    tagline: 'Life, Intensified',
    category: 'Compact SUV',
    image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=600&auto=format&fit=crop&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=600&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=600&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=600&auto=format&fit=crop&q=80'
    ],
    startingPrice: 8349000,
    variants: [
      { id: 'macan', name: 'Macan', price: 8349000 },
      { id: 'macan-s', name: 'Macan S', price: 9999000 },
      { id: 'macan-gts', name: 'Macan GTS', price: 11500000 }
    ],
    colors: [
      { id: 'white', name: 'White', hex: '#FFFFFF' },
      { id: 'black', name: 'Black', hex: '#0A0A0A' },
      { id: 'miami-blue', name: 'Miami Blue', hex: '#009CDE' },
      { id: 'papaya', name: 'Papaya Metallic', hex: '#FF8C00' },
      { id: 'carmine-red', name: 'Carmine Red', hex: '#CC0000' }
    ],
    specs: {
      engine: '2.0L Turbo / 2.9L V6 Twin-Turbo',
      power: '265 PS / 380 PS / 440 PS',
      torque: '400 Nm / 520 Nm / 550 Nm',
      transmission: '7-Speed PDK',
      fuelType: 'Petrol',
      mileage: '10.8 km/l'
    },
    features: ['Porsche Active Suspension Management', 'Sport Chrono Package', 'Porsche Communication Management', 'BOSE Surround Sound', 'Porsche Torque Vectoring Plus', 'Park Assist', 'LED Matrix Headlights', '8 Airbags'],
    description: 'The Macan delivers the Porsche driving experience in a compact SUV package - agile, powerful, and unmistakably sports car.'
  },
  {
    id: 'porsche-cayenne',
    brand: 'Porsche',
    name: 'Cayenne',
    tagline: 'The Sports Car Among SUVs',
    category: 'SUV',
    image: 'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=600&auto=format&fit=crop&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=600&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=600&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=600&auto=format&fit=crop&q=80'
    ],
    startingPrice: 13499000,
    variants: [
      { id: 'cayenne', name: 'Cayenne', price: 13499000 },
      { id: 'cayenne-s', name: 'Cayenne S', price: 16999000 },
      { id: 'cayenne-gts', name: 'Cayenne GTS', price: 19999000 },
      { id: 'cayenne-turbo', name: 'Cayenne Turbo GT', price: 24999000 }
    ],
    colors: [
      { id: 'white', name: 'White', hex: '#FFFFFF' },
      { id: 'jet-black', name: 'Jet Black Metallic', hex: '#0A0A0A' },
      { id: 'moonlight-blue', name: 'Moonlight Blue', hex: '#1A3A5C' },
      { id: 'mahogany', name: 'Mahogany Metallic', hex: '#4A2525' }
    ],
    specs: {
      engine: '3.0L V6 Turbo / 4.0L V8 Twin-Turbo',
      power: '340 PS - 640 PS',
      torque: '450 Nm - 850 Nm',
      transmission: '8-Speed Tiptronic S',
      fuelType: 'Petrol',
      mileage: '9.5 km/l'
    },
    features: ['Adaptive Air Suspension', 'Rear-Axle Steering', 'Porsche Dynamic Chassis Control', 'Sport Chrono Package', 'Burmester 3D High-End Sound', 'Night Vision Assist', 'Head-Up Display', '10 Airbags'],
    description: 'The Cayenne proves that an SUV can be a true sports car - combining breathtaking performance with everyday versatility.'
  },
  {
    id: 'porsche-911',
    brand: 'Porsche',
    name: '911 Carrera',
    tagline: 'Timeless Machine',
    category: 'Sports Car',
    image: 'https://images.unsplash.com/photo-1611859266238-4b98091d9d9b?w=600&auto=format&fit=crop&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=600&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=600&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=600&auto=format&fit=crop&q=80'
    ],
    startingPrice: 17599000,
    variants: [
      { id: 'carrera', name: 'Carrera', price: 17599000 },
      { id: 'carrera-s', name: 'Carrera S', price: 19899000 },
      { id: 'carrera-4s', name: 'Carrera 4S', price: 21299000 },
      { id: 'turbo-s', name: 'Turbo S', price: 32999000 },
      { id: 'gt3', name: 'GT3', price: 34999000 }
    ],
    colors: [
      { id: 'guards-red', name: 'Guards Red', hex: '#CC0000' },
      { id: 'racing-yellow', name: 'Racing Yellow', hex: '#FFD700' },
      { id: 'gt-silver', name: 'GT Silver Metallic', hex: '#C0C0C0' },
      { id: 'miami-blue', name: 'Miami Blue', hex: '#009CDE' },
      { id: 'black', name: 'Black', hex: '#0A0A0A' }
    ],
    specs: {
      engine: '3.0L Twin-Turbo Flat-6 / 3.8L Twin-Turbo / 4.0L NA',
      power: '385 PS - 510 PS',
      torque: '450 Nm - 530 Nm',
      transmission: '8-Speed PDK / 7-Speed Manual',
      fuelType: 'Petrol',
      mileage: '10.2 km/l'
    },
    features: ['PASM Sport Suspension', 'Sport Chrono Package', 'PCCB Carbon Ceramic Brakes', 'Rear-Axle Steering', 'Burmester High-End Sound', 'Sport Exhaust', 'Active Aerodynamics', '6 Airbags'],
    description: 'The 911 is the heart and soul of Porsche - an icon that has defined the sports car for over 60 years.'
  },
  {
    id: 'porsche-panamera',
    brand: 'Porsche',
    name: 'Panamera',
    tagline: 'Luxury Meets Performance',
    category: 'Luxury Sedan',
    image: 'https://images.unsplash.com/photo-1571607388263-1044f9ea01dd?w=600&auto=format&fit=crop&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=600&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=600&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=600&auto=format&fit=crop&q=80'
    ],
    startingPrice: 15999000,
    variants: [
      { id: 'panamera', name: 'Panamera', price: 15999000 },
      { id: 'panamera-4', name: 'Panamera 4', price: 17599000 },
      { id: 'panamera-gts', name: 'Panamera GTS', price: 22999000 },
      { id: 'turbo-s', name: 'Turbo S', price: 29999000 }
    ],
    colors: [
      { id: 'white', name: 'White', hex: '#FFFFFF' },
      { id: 'jet-black', name: 'Jet Black Metallic', hex: '#0A0A0A' },
      { id: 'gentian-blue', name: 'Gentian Blue', hex: '#1A3A5C' },
      { id: 'volcano-grey', name: 'Volcano Grey', hex: '#4A4A4A' }
    ],
    specs: {
      engine: '2.9L V6 Twin-Turbo / 4.0L V8 Twin-Turbo',
      power: '330 PS - 630 PS',
      torque: '450 Nm - 820 Nm',
      transmission: '8-Speed PDK',
      fuelType: 'Petrol',
      mileage: '9.8 km/l'
    },
    features: ['Adaptive Air Suspension', 'Rear-Axle Steering', 'Sport Chrono Package', 'Burmester 3D High-End Sound', 'Porsche InnoDrive', 'Night Vision', 'Soft-Close Doors', '10 Airbags'],
    description: 'The Panamera is the sports car for four - combining pure Porsche performance with luxury and everyday practicality.'
  },
  {
    id: 'porsche-taycan',
    brand: 'Porsche',
    name: 'Taycan',
    tagline: 'Soul, Electrified',
    category: 'Electric Sports Sedan',
    image: 'https://images.unsplash.com/photo-1614200187524-dc4b892acf16?w=600&auto=format&fit=crop&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1614200179396-2bdb77ebf81b?w=600&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1614200179396-2bdb77ebf81b?w=600&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=600&auto=format&fit=crop&q=80'
    ],
    startingPrice: 14999000,
    variants: [
      { id: 'taycan', name: 'Taycan', price: 14999000 },
      { id: 'taycan-4s', name: 'Taycan 4S', price: 16999000 },
      { id: 'turbo', name: 'Turbo', price: 19999000 },
      { id: 'turbo-s', name: 'Turbo S', price: 24999000 }
    ],
    colors: [
      { id: 'frozen-blue', name: 'Frozen Blue', hex: '#89CFF0' },
      { id: 'carmine-red', name: 'Carmine Red', hex: '#CC0000' },
      { id: 'mamba-green', name: 'Mamba Green', hex: '#2E8B57' },
      { id: 'ice-grey', name: 'Ice Grey Metallic', hex: '#C0C0C0' }
    ],
    specs: {
      engine: 'Dual Electric Motors',
      power: '408 PS - 761 PS',
      torque: '345 Nm - 1050 Nm',
      transmission: '2-Speed Automatic',
      fuelType: 'Electric',
      mileage: '3.3 km/kWh (WLTP Range: 484 km)'
    },
    features: ['800V Architecture', 'Adaptive Air Suspension', 'Porsche Electric Sport Sound', 'Head-Up Display', 'Night Vision', 'Sport Chrono Package', 'Burmester 3D Sound', '10 Airbags'],
    description: 'The Taycan is the first all-electric Porsche - proving that electrification can be thrilling, emotional, and unmistakably Porsche.'
  },

  // BENTLEY
  {
    id: 'bentley-bentayga',
    brand: 'Bentley',
    name: 'Bentayga',
    tagline: 'Extraordinary Journeys',
    category: 'Luxury SUV',
    image: 'https://images.unsplash.com/photo-1563720360172-67b8f3dce741?w=600&auto=format&fit=crop&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1563720360172-67b8f3dce741?w=600&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1563720360172-67b8f3dce741?w=600&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=600&auto=format&fit=crop&q=80'
    ],
    startingPrice: 41200000,
    variants: [
      { id: 'v8', name: 'V8', price: 41200000 },
      { id: 'azure', name: 'Azure V8', price: 44500000 },
      { id: 'speed', name: 'Speed', price: 52500000 },
      { id: 'ewb', name: 'EWB Mulliner', price: 62500000 }
    ],
    colors: [
      { id: 'glacier-white', name: 'Glacier White', hex: '#F5F5F5' },
      { id: 'onyx', name: 'Onyx', hex: '#0A0A0A' },
      { id: 'windsor-blue', name: 'Windsor Blue', hex: '#1A3A5C' },
      { id: 'dragon-red', name: 'Dragon Red II', hex: '#8B0000' }
    ],
    specs: {
      engine: '4.0L V8 Twin-Turbo / 6.0L W12 Twin-Turbo',
      power: '550 PS / 635 PS',
      torque: '770 Nm / 900 Nm',
      transmission: '8-Speed Automatic',
      fuelType: 'Petrol',
      mileage: '7.5 km/l'
    },
    features: ['All-Terrain Specification', 'Bentley Dynamic Ride', 'Naim Audio System', 'Mulliner Driving Specification', 'Rear Entertainment', 'Night Vision', 'Refrigerator Compartment', '10 Airbags'],
    description: 'The Bentayga is the definitive luxury SUV - offering unmatched refinement, craftsmanship, and performance.'
  },
  {
    id: 'bentley-continental-gt',
    brand: 'Bentley',
    name: 'Continental GT',
    tagline: 'The Definition of Grand Touring',
    category: 'Grand Tourer',
    image: 'https://images.unsplash.com/photo-1580273916550-e323be2ae537?w=600&auto=format&fit=crop&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1580273916550-e323be2ae537?w=600&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1580273916550-e323be2ae537?w=600&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=600&auto=format&fit=crop&q=80'
    ],
    startingPrice: 39500000,
    variants: [
      { id: 'v8', name: 'V8', price: 39500000 },
      { id: 'v8-convertible', name: 'V8 Convertible', price: 42500000 },
      { id: 'speed', name: 'Speed', price: 52000000 },
      { id: 'mulliner', name: 'Mulliner', price: 62000000 }
    ],
    colors: [
      { id: 'alpine-green', name: 'Alpine Green', hex: '#2E8B57' },
      { id: 'beluga', name: 'Beluga', hex: '#0A0A0A' },
      { id: 'moonbeam', name: 'Moonbeam', hex: '#C0C0C0' },
      { id: 'orange-flame', name: 'Orange Flame', hex: '#FF6600' }
    ],
    specs: {
      engine: '4.0L V8 Twin-Turbo / 6.0L W12 Twin-Turbo',
      power: '550 PS / 659 PS',
      torque: '770 Nm / 900 Nm',
      transmission: '8-Speed Dual-Clutch',
      fuelType: 'Petrol',
      mileage: '8.2 km/l'
    },
    features: ['Rotating Display', 'All-Wheel Steering', 'Bentley Dynamic Ride', 'Naim for Bentley Audio', 'Diamond-Knurled Controls', 'Handcrafted Interior', 'Night Vision', '8 Airbags'],
    description: 'The Continental GT is the ultimate grand tourer - combining exquisite handcraftsmanship with extraordinary performance.'
  },
  {
    id: 'bentley-flying-spur',
    brand: 'Bentley',
    name: 'Flying Spur',
    tagline: 'Pinnacle of Luxury Sedans',
    category: 'Luxury Sedan',
    image: 'https://images.unsplash.com/photo-1567818735868-e71b99932e29?w=600&auto=format&fit=crop&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1563720360172-67b8f3dce741?w=600&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1563720360172-67b8f3dce741?w=600&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=600&auto=format&fit=crop&q=80'
    ],
    startingPrice: 39000000,
    variants: [
      { id: 'v8', name: 'V8', price: 39000000 },
      { id: 'v8-mulliner', name: 'V8 Mulliner', price: 45000000 },
      { id: 'speed', name: 'Speed', price: 52000000 },
      { id: 'mulliner', name: 'Mulliner', price: 65000000 }
    ],
    colors: [
      { id: 'glacier-white', name: 'Glacier White', hex: '#F5F5F5' },
      { id: 'beluga', name: 'Beluga', hex: '#0A0A0A' },
      { id: 'verdant', name: 'Verdant', hex: '#2E8B57' },
      { id: 'extreme-silver', name: 'Extreme Silver', hex: '#C0C0C0' }
    ],
    specs: {
      engine: '4.0L V8 Twin-Turbo / 6.0L W12 Twin-Turbo',
      power: '550 PS / 635 PS',
      torque: '770 Nm / 900 Nm',
      transmission: '8-Speed Dual-Clutch',
      fuelType: 'Petrol',
      mileage: '7.8 km/l'
    },
    features: ['All-Wheel Steering', 'Bentley Dynamic Ride', 'Naim for Bentley Audio', 'Rear Touchscreen Tablets', 'Champagne Cooler', 'Airline Seat Specification', 'Night Vision', '10 Airbags'],
    description: 'The Flying Spur combines breathtaking performance with unrivaled luxury - the world\'s finest luxury sedan.'
  },

  // LAMBORGHINI
  {
    id: 'lamborghini-revuelto',
    brand: 'Lamborghini',
    name: 'Revuelto',
    tagline: 'The Vision of Tomorrow',
    category: 'Supercar',
    image: 'https://images.unsplash.com/photo-1621135802920-133df287f89c?w=600&auto=format&fit=crop&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=600&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=600&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=600&auto=format&fit=crop&q=80'
    ],
    startingPrice: 850000000,
    variants: [
      { id: 'revuelto', name: 'Revuelto', price: 850000000 }
    ],
    colors: [
      { id: 'verde-mantis', name: 'Verde Mantis', hex: '#00FF00' },
      { id: 'arancio-apod', name: 'Arancio Apod', hex: '#FF6600' },
      { id: 'giallo-orion', name: 'Giallo Orion', hex: '#FFD700' },
      { id: 'blu-nethuns', name: 'Blu Nethuns', hex: '#0077BE' },
      { id: 'bianco-asopo', name: 'Bianco Asopo', hex: '#FFFFFF' }
    ],
    specs: {
      engine: '6.5L V12 Hybrid',
      power: '1015 PS',
      torque: '725 Nm',
      transmission: '8-Speed Dual-Clutch',
      fuelType: 'Hybrid',
      mileage: '5.5 km/l'
    },
    features: ['Hybrid V12 Powertrain', 'Carbon Fiber Monocoque', 'Active Aerodynamics', 'Torque Vectoring', 'LDVI System', 'Launch Control', 'Driving Modes', '6 Airbags'],
    description: 'The Revuelto is Lamborghini\'s first V12 hybrid supercar - combining naturally aspirated fury with electrified performance.'
  },
  {
    id: 'lamborghini-urus',
    brand: 'Lamborghini',
    name: 'Urus SE',
    tagline: 'The Super SUV',
    category: 'Performance SUV',
    image: 'https://images.unsplash.com/photo-1607853554439-0069ec0f29b6?w=600&auto=format&fit=crop&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=600&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=600&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=600&auto=format&fit=crop&q=80'
    ],
    startingPrice: 45000000,
    variants: [
      { id: 'urus-s', name: 'Urus S', price: 45000000 },
      { id: 'urus-se', name: 'Urus SE', price: 52000000 },
      { id: 'urus-performante', name: 'Urus Performante', price: 57000000 }
    ],
    colors: [
      { id: 'giallo-auge', name: 'Giallo Auge', hex: '#FFD700' },
      { id: 'arancio-borealis', name: 'Arancio Borealis', hex: '#FF6600' },
      { id: 'verde-selvans', name: 'Verde Selvans', hex: '#2E8B57' },
      { id: 'nero-noctis', name: 'Nero Noctis', hex: '#0A0A0A' },
      { id: 'blu-eleos', name: 'Blu Eleos', hex: '#1A3A5C' }
    ],
    specs: {
      engine: '4.0L V8 Twin-Turbo / V8 Hybrid',
      power: '666 PS / 800 PS',
      torque: '850 Nm / 950 Nm',
      transmission: '8-Speed Automatic',
      fuelType: 'Petrol / Hybrid',
      mileage: '7.0 km/l'
    },
    features: ['ANIMA Driving Modes', 'Rear-Wheel Steering', 'Active Roll Stabilization', 'Carbon Ceramic Brakes', 'Alcantara Interior', 'Bang & Olufsen Sound', 'Night Vision', '8 Airbags'],
    description: 'The Urus redefines the super SUV segment - bringing Lamborghini DNA to an entirely new vehicle category.'
  },
  {
    id: 'lamborghini-temerario',
    brand: 'Lamborghini',
    name: 'Temerario',
    tagline: 'Fearless by Design',
    category: 'Supercar',
    image: 'https://images.unsplash.com/photo-1519245659620-e859806a8d3b?w=600&auto=format&fit=crop&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=600&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=600&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=600&auto=format&fit=crop&q=80'
    ],
    startingPrice: 450000000,
    variants: [
      { id: 'temerario', name: 'Temerario', price: 450000000 }
    ],
    colors: [
      { id: 'verde-shock', name: 'Verde Shock', hex: '#00FF00' },
      { id: 'blu-marinus', name: 'Blu Marinus', hex: '#0077BE' },
      { id: 'rosso-efesto', name: 'Rosso Efesto', hex: '#CC0000' },
      { id: 'bianco-icarus', name: 'Bianco Icarus', hex: '#FFFFFF' }
    ],
    specs: {
      engine: '4.0L V8 Twin-Turbo Hybrid',
      power: '920 PS',
      torque: '730 Nm',
      transmission: '8-Speed Dual-Clutch',
      fuelType: 'Hybrid',
      mileage: '6.5 km/l'
    },
    features: ['Hybrid Powertrain', 'Active Aerodynamics', 'Carbon Fiber Body', 'Torque Vectoring', 'LDVI System', 'Track Mode', 'Launch Control', '6 Airbags'],
    description: 'The Temerario is Lamborghini\'s next-generation V8 supercar - fearless design meets hybrid performance.'
  },

  // BUGATTI
  {
    id: 'bugatti-chiron',
    brand: 'Bugatti',
    name: 'Chiron',
    tagline: 'Breaking New Dimensions',
    category: 'Hypercar',
    image: 'https://images.unsplash.com/photo-1566023124709-0d11e49c1bb8?w=600&auto=format&fit=crop&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1566023124709-0d11e49c1bb8?w=600&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1566023124709-0d11e49c1bb8?w=600&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=600&auto=format&fit=crop&q=80'
    ],
    startingPrice: 2100000000,
    variants: [
      { id: 'chiron', name: 'Chiron', price: 2100000000 },
      { id: 'chiron-sport', name: 'Chiron Sport', price: 2300000000 },
      { id: 'chiron-pur-sport', name: 'Chiron Pur Sport', price: 2700000000 },
      { id: 'chiron-super-sport', name: 'Chiron Super Sport', price: 3200000000 }
    ],
    colors: [
      { id: 'blue-carbon', name: 'Blue Carbon', hex: '#1A3A5C' },
      { id: 'atlantic-blue', name: 'Atlantic Blue', hex: '#0077BE' },
      { id: 'nocturne', name: 'Nocturne', hex: '#0A0A0A' },
      { id: 'quartz-white', name: 'Quartz White', hex: '#F5F5F5' }
    ],
    specs: {
      engine: '8.0L Quad-Turbo W16',
      power: '1500 PS',
      torque: '1600 Nm',
      transmission: '7-Speed Dual-Clutch',
      fuelType: 'Petrol',
      mileage: '4.5 km/l'
    },
    features: ['Active Aerodynamics', 'Adaptive Chassis', 'Skyview Roof', 'Diamond Membrane Speakers', 'Telemetry System', 'Speed Key', 'Carbon Fiber Monocoque', '6 Airbags'],
    description: 'The Chiron represents the pinnacle of automotive engineering - where art, form, and technique create the ultimate hypercar.'
  },
  {
    id: 'bugatti-veyron',
    brand: 'Bugatti',
    name: 'Veyron',
    tagline: 'The Original Hypercar',
    category: 'Hypercar',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&auto=format&fit=crop&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1566023124709-0d11e49c1bb8?w=600&auto=format&fit=crop&q=80'
    ],
    startingPrice: 1500000000,
    variants: [
      { id: 'veyron', name: 'Veyron 16.4', price: 1500000000 },
      { id: 'grand-sport', name: 'Grand Sport', price: 1800000000 },
      { id: 'super-sport', name: 'Super Sport', price: 2100000000 }
    ],
    colors: [
      { id: 'two-tone-blue', name: 'Two-Tone Blue', hex: '#1A3A5C' },
      { id: 'silver-black', name: 'Silver & Black', hex: '#C0C0C0' },
      { id: 'red-black', name: 'Red & Black', hex: '#CC0000' }
    ],
    specs: {
      engine: '8.0L Quad-Turbo W16',
      power: '1001 PS / 1200 PS',
      torque: '1250 Nm / 1500 Nm',
      transmission: '7-Speed Dual-Clutch',
      fuelType: 'Petrol',
      mileage: '4.0 km/l'
    },
    features: ['Active Aerodynamics', 'Ten Radiators', 'All-Wheel Drive', 'Carbon Fiber Monocoque', 'Telemetry System', 'Speed Key (Super Sport)', 'Deployable Rear Wing', '4 Airbags'],
    description: 'The Veyron broke all records and redefined what was possible - the car that started the modern hypercar era.'
  },
  {
    id: 'bugatti-divo',
    brand: 'Bugatti',
    name: 'Divo',
    tagline: 'Agile. Nimble. Agressive.',
    category: 'Hypercar',
    image: 'https://images.unsplash.com/photo-1597404294360-feeeda04612e?w=600&auto=format&fit=crop&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=600&auto=format&fit=crop&q=80'
    ],
    startingPrice: 4100000000,
    variants: [
      { id: 'divo', name: 'Divo', price: 4100000000 }
    ],
    colors: [
      { id: 'titanium-liquid', name: 'Titanium Liquid Silver', hex: '#C0C0C0' },
      { id: 'bugatti-light-blue', name: 'Bugatti Light Blue Sport', hex: '#87CEEB' },
      { id: 'matte-grey', name: 'Matte Grey', hex: '#4A4A4A' }
    ],
    specs: {
      engine: '8.0L Quad-Turbo W16',
      power: '1500 PS',
      torque: '1600 Nm',
      transmission: '7-Speed Dual-Clutch',
      fuelType: 'Petrol',
      mileage: '4.2 km/l'
    },
    features: ['Track-Focused Aerodynamics', 'Weight Reduction', 'Stiffer Suspension', 'Wider Air Intakes', 'NACA Ducts', 'Extreme Downforce', 'Limited to 40 Units', '6 Airbags'],
    description: 'The Divo is the most agile Bugatti ever made - built for corners, sculpted by the wind, limited to just 40 examples.'
  }
];

// Parts Database
export const parts = [
  {
    id: 'oil-filter-01',
    name: 'Genuine Oil Filter',
    category: 'Engine',
    partNumber: 'VW-OF-001',
    price: 899,
    mrp: 1199,
    image: 'https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=400',
    compatibility: ['vw-virtus', 'vw-taigun', 'vw-tiguan', 'skoda-kushaq', 'skoda-slavia'],
    inStock: 50,
    description: 'Genuine Volkswagen oil filter for optimal engine protection and performance.',
    specifications: { brand: 'Volkswagen Original', warranty: '1 Year', material: 'Premium Filter Media' }
  },
  {
    id: 'air-filter-01',
    name: 'High-Flow Air Filter',
    category: 'Engine',
    partNumber: 'VW-AF-002',
    price: 1499,
    mrp: 1999,
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400',
    compatibility: ['vw-virtus', 'vw-taigun', 'skoda-kushaq', 'skoda-slavia', 'skoda-kylaq'],
    inStock: 35,
    description: 'Premium air filter designed to improve airflow while filtering harmful particles.',
    specifications: { brand: 'Volkswagen Original', warranty: '1 Year', filterType: 'Panel Type' }
  },
  {
    id: 'spark-plug-set',
    name: 'Iridium Spark Plug Set (4)',
    category: 'Engine',
    partNumber: 'VW-SP-003',
    price: 3999,
    mrp: 4999,
    image: 'https://images.unsplash.com/photo-1600861195091-690c92f1d2cc?w=400',
    compatibility: ['vw-virtus', 'vw-taigun', 'vw-golf-gti', 'skoda-kushaq', 'skoda-slavia', 'skoda-octavia-rs'],
    inStock: 25,
    description: 'Premium iridium spark plugs for superior ignition and longer service life.',
    specifications: { brand: 'NGK/Bosch', warranty: '2 Years', type: 'Iridium' }
  },
  {
    id: 'brake-pad-front',
    name: 'Front Brake Pad Set',
    category: 'Brakes',
    partNumber: 'VW-BP-001',
    price: 4599,
    mrp: 5999,
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400',
    compatibility: ['vw-virtus', 'vw-taigun', 'vw-tiguan', 'skoda-kushaq', 'skoda-slavia', 'skoda-kodiaq'],
    inStock: 20,
    description: 'Genuine front brake pads with low dust formula and excellent stopping power.',
    specifications: { brand: 'Volkswagen Original', warranty: '2 Years', position: 'Front Axle' }
  },
  {
    id: 'brake-disc-front',
    name: 'Front Brake Disc Set',
    category: 'Brakes',
    partNumber: 'VW-BD-002',
    price: 8999,
    mrp: 11999,
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400',
    compatibility: ['vw-virtus', 'vw-taigun', 'vw-tiguan', 'skoda-kushaq', 'skoda-slavia'],
    inStock: 15,
    description: 'Ventilated front brake discs for superior heat dissipation and braking performance.',
    specifications: { brand: 'Volkswagen Original', warranty: '2 Years', type: 'Ventilated' }
  },
  {
    id: 'battery-agm',
    name: 'AGM Start-Stop Battery',
    category: 'Electrical',
    partNumber: 'VW-BT-001',
    price: 18999,
    mrp: 22999,
    image: 'https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?w=400',
    compatibility: ['vw-virtus', 'vw-taigun', 'vw-tiguan', 'vw-golf-gti', 'skoda-kushaq', 'skoda-slavia', 'skoda-kodiaq'],
    inStock: 10,
    description: 'Premium AGM battery designed for vehicles with start-stop technology.',
    specifications: { brand: 'Varta', warranty: '3 Years', capacity: '70Ah' }
  },
  {
    id: 'headlight-led',
    name: 'LED Headlight Bulb Set',
    category: 'Electrical',
    partNumber: 'VW-HL-002',
    price: 5999,
    mrp: 7999,
    image: 'https://images.unsplash.com/photo-1489824904134-891ab64532f1?w=400',
    compatibility: ['vw-virtus', 'vw-taigun', 'skoda-kushaq', 'skoda-slavia', 'skoda-kylaq'],
    inStock: 30,
    description: 'Premium LED headlight bulbs for enhanced visibility and modern appearance.',
    specifications: { brand: 'Philips', warranty: '2 Years', type: 'H7 LED' }
  },
  {
    id: 'shock-absorber-front',
    name: 'Front Shock Absorber Set',
    category: 'Suspension',
    partNumber: 'VW-SA-001',
    price: 12999,
    mrp: 16999,
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400',
    compatibility: ['vw-virtus', 'vw-taigun', 'skoda-kushaq', 'skoda-slavia'],
    inStock: 12,
    description: 'Premium front shock absorbers for improved ride comfort and handling.',
    specifications: { brand: 'Sachs', warranty: '2 Years', type: 'Gas-Filled' }
  },
  {
    id: 'roof-rails',
    name: 'Roof Rails Set',
    category: 'Accessories',
    partNumber: 'VW-RR-001',
    price: 8999,
    mrp: 11999,
    image: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=400',
    compatibility: ['vw-taigun', 'vw-tiguan', 'skoda-kushaq', 'skoda-kodiaq'],
    inStock: 20,
    description: 'Genuine roof rails for additional cargo carrying capability.',
    specifications: { brand: 'Volkswagen Original', warranty: '3 Years', material: 'Aluminum' }
  },
  {
    id: 'floor-mats',
    name: 'Premium Floor Mat Set',
    category: 'Accessories',
    partNumber: 'VW-FM-002',
    price: 3499,
    mrp: 4499,
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400',
    compatibility: ['vw-virtus', 'vw-taigun', 'vw-tiguan', 'vw-golf-gti', 'skoda-kushaq', 'skoda-slavia'],
    inStock: 40,
    description: 'Premium rubber floor mats with custom fit and branded design.',
    specifications: { brand: 'Volkswagen Original', warranty: '1 Year', material: 'Heavy-Duty Rubber' }
  },
  {
    id: 'engine-oil-5w40',
    name: 'Engine Oil 5W-40 (4L)',
    category: 'Fluids',
    partNumber: 'VW-EO-001',
    price: 3999,
    mrp: 4999,
    image: 'https://images.unsplash.com/photo-1635784040371-d03a7e5b6ec1?w=400',
    compatibility: ['vw-virtus', 'vw-taigun', 'vw-tiguan', 'vw-golf-gti', 'skoda-kushaq', 'skoda-slavia', 'skoda-kodiaq', 'skoda-octavia-rs'],
    inStock: 60,
    description: 'VW 502 00 approved synthetic engine oil for optimal performance.',
    specifications: { brand: 'Castrol EDGE', specification: 'VW 502 00', viscosity: '5W-40' }
  },
  {
    id: 'coolant-g13',
    name: 'G13 Coolant (1.5L)',
    category: 'Fluids',
    partNumber: 'VW-CL-002',
    price: 1299,
    mrp: 1699,
    image: 'https://images.unsplash.com/photo-1635784040371-d03a7e5b6ec1?w=400',
    compatibility: ['vw-virtus', 'vw-taigun', 'vw-tiguan', 'vw-golf-gti', 'skoda-kushaq', 'skoda-slavia', 'skoda-kodiaq'],
    inStock: 45,
    description: 'Genuine G13 coolant concentrate for all VAG vehicles.',
    specifications: { brand: 'Volkswagen Original', type: 'G13 Concentrate', color: 'Lilac' }
  }
];

// Service Types
export const serviceTypes = [
  { id: 'general-service', name: 'General Service', description: 'Regular maintenance including oil change, filter replacement, and multi-point inspection', estimatedTime: '3-4 hours', basePrice: 5999, includes: ['Engine Oil Change', 'Oil Filter', 'Air Filter Check', '50-Point Inspection', 'Tire Rotation', 'Fluid Top-up'] },
  { id: 'major-service', name: 'Major Service', description: 'Comprehensive service with all fluids, filters, and detailed inspection', estimatedTime: '5-6 hours', basePrice: 12999, includes: ['All General Service Items', 'Spark Plugs', 'Brake Fluid Change', 'Coolant Change', 'Transmission Fluid Check', 'Detailed Brake Inspection'] },
  { id: 'repair-diagnosis', name: 'Repair & Diagnosis', description: 'Comprehensive diagnostic scan and repair recommendation', estimatedTime: '1-2 hours', basePrice: 1999, includes: ['OBD-II Scan', 'Visual Inspection', 'Test Drive', 'Detailed Report', 'Repair Estimate'] },
  { id: 'insurance-repair', name: 'Insurance Repair', description: 'Accident repair and insurance claim assistance', estimatedTime: 'Varies', basePrice: 0, includes: ['Damage Assessment', 'Insurance Documentation', 'Genuine Parts', 'Paint Matching', 'Quality Assurance'] },
  { id: 'ac-service', name: 'AC Service & Repair', description: 'Complete air conditioning system service and repair', estimatedTime: '2-3 hours', basePrice: 2499, includes: ['AC Gas Top-up', 'Compressor Check', 'Condenser Cleaning', 'Vent Sanitization', 'Performance Test'] },
  { id: 'wheel-alignment', name: 'Wheel Alignment & Balancing', description: '3D wheel alignment and computerized balancing', estimatedTime: '1-2 hours', basePrice: 1999, includes: ['3D Alignment', 'All Wheel Balancing', 'Tire Inspection', 'Suspension Check', 'Steering Check'] }
];

// Service Centers
export const serviceCenters = [
  { id: 'sc-mumbai-01', name: 'Volkswagen Mumbai Central', city: 'Mumbai', address: '123 Worli Sea Face, Mumbai 400018', phone: '+91 22 1234 5678', email: 'mumbai.central@volkswagen.co.in', timing: '8:00 AM - 8:00 PM', rating: 4.8, reviews: 256, services: ['general-service', 'major-service', 'repair-diagnosis', 'insurance-repair', 'ac-service', 'wheel-alignment'], brands: ['Volkswagen', 'Skoda'] },
  { id: 'sc-delhi-01', name: 'Volkswagen Delhi Connaught Place', city: 'Delhi', address: '45 Barakhamba Road, New Delhi 110001', phone: '+91 11 1234 5678', email: 'delhi.cp@volkswagen.co.in', timing: '9:00 AM - 7:00 PM', rating: 4.7, reviews: 189, services: ['general-service', 'major-service', 'repair-diagnosis', 'insurance-repair', 'ac-service', 'wheel-alignment'], brands: ['Volkswagen', 'Skoda'] },
  { id: 'sc-bangalore-01', name: 'Audi Bangalore Whitefield', city: 'Bangalore', address: '78 ITPL Main Road, Whitefield, Bangalore 560066', phone: '+91 80 1234 5678', email: 'bangalore.whitefield@audi.co.in', timing: '9:00 AM - 8:00 PM', rating: 4.9, reviews: 312, services: ['general-service', 'major-service', 'repair-diagnosis', 'insurance-repair', 'ac-service', 'wheel-alignment'], brands: ['Audi', 'Volkswagen', 'Skoda'] },
  { id: 'sc-chennai-01', name: 'Porsche Chennai OMR', city: 'Chennai', address: '234 OMR, Sholinganallur, Chennai 600119', phone: '+91 44 1234 5678', email: 'chennai.omr@porsche.co.in', timing: '10:00 AM - 7:00 PM', rating: 4.9, reviews: 145, services: ['general-service', 'major-service', 'repair-diagnosis', 'insurance-repair', 'ac-service', 'wheel-alignment'], brands: ['Porsche', 'Audi'] },
  { id: 'sc-hyderabad-01', name: 'Volkswagen Hyderabad Banjara Hills', city: 'Hyderabad', address: '56 Road No. 12, Banjara Hills, Hyderabad 500034', phone: '+91 40 1234 5678', email: 'hyderabad.banjara@volkswagen.co.in', timing: '9:00 AM - 7:00 PM', rating: 4.6, reviews: 167, services: ['general-service', 'major-service', 'repair-diagnosis', 'insurance-repair', 'ac-service', 'wheel-alignment'], brands: ['Volkswagen', 'Skoda'] },
  { id: 'sc-pune-01', name: 'Skoda Pune Hinjewadi', city: 'Pune', address: '89 Phase 1, Hinjewadi, Pune 411057', phone: '+91 20 1234 5678', email: 'pune.hinjewadi@skoda.co.in', timing: '9:00 AM - 7:00 PM', rating: 4.7, reviews: 134, services: ['general-service', 'major-service', 'repair-diagnosis', 'ac-service', 'wheel-alignment'], brands: ['Skoda', 'Volkswagen'] },
  { id: 'sc-kolkata-01', name: 'Bentley Kolkata Park Street', city: 'Kolkata', address: '12 Park Street, Kolkata 700016', phone: '+91 33 1234 5678', email: 'kolkata.parkstreet@bentley.co.in', timing: '10:00 AM - 6:00 PM', rating: 4.9, reviews: 89, services: ['general-service', 'major-service', 'repair-diagnosis', 'insurance-repair'], brands: ['Bentley', 'Lamborghini', 'Bugatti'] }
];

// VIN Database
export const vinDatabase = {
  'WVWZZZ3CZWE123456': { carId: 'vw-virtus', year: 2024, variant: 'GT Plus' },
  'WVWZZZ5NZWM789012': { carId: 'vw-taigun', year: 2024, variant: 'Topline' },
  'WVGZZZ5NZWM345678': { carId: 'vw-tiguan', year: 2023, variant: 'R-Line' },
  'TMBJC9NE1L0123456': { carId: 'skoda-kushaq', year: 2024, variant: 'Monte Carlo' },
  'WAUZZZ8K9LA123456': { carId: 'audi-a4', year: 2024, variant: 'Technology' },
  'WP0ZZZ99ZLS123456': { carId: 'porsche-911', year: 2024, variant: 'Carrera S' }
};

// Coupons
export const coupons = [
  { code: 'VW10', description: '10% off on all parts', discountType: 'percentage', discountValue: 10, minOrder: 2000, maxDiscount: 5000, validTill: '2026-12-31', applicableOn: ['parts'] },
  { code: 'FIRST500', description: '₹500 off on first order', discountType: 'fixed', discountValue: 500, minOrder: 1500, maxDiscount: 500, validTill: '2026-12-31', applicableOn: ['parts', 'service'] },
  { code: 'SERVICE20', description: '20% off on service bookings', discountType: 'percentage', discountValue: 20, minOrder: 3000, maxDiscount: 3000, validTill: '2026-12-31', applicableOn: ['service'] },
  { code: 'PARTS15', description: '15% off on parts orders above ₹5000', discountType: 'percentage', discountValue: 15, minOrder: 5000, maxDiscount: 2500, validTill: '2026-12-31', applicableOn: ['parts'] },
  { code: 'LUXURY25', description: '25% off on premium brand services', discountType: 'percentage', discountValue: 25, minOrder: 10000, maxDiscount: 10000, validTill: '2026-12-31', applicableOn: ['service'] }
];

// Brands list
export const brands = [
  { id: 'volkswagen', name: 'Volkswagen', logo: '/brands/vw.svg', tier: 'mainstream' },
  { id: 'skoda', name: 'Skoda', logo: '/brands/skoda.svg', tier: 'mainstream' },
  { id: 'audi', name: 'Audi', logo: '/brands/audi.svg', tier: 'premium' },
  { id: 'porsche', name: 'Porsche', logo: '/brands/porsche.svg', tier: 'luxury' },
  { id: 'bentley', name: 'Bentley', logo: '/brands/bentley.svg', tier: 'ultra-luxury' },
  { id: 'lamborghini', name: 'Lamborghini', logo: '/brands/lamborghini.svg', tier: 'supercar' },
  { id: 'bugatti', name: 'Bugatti', logo: '/brands/bugatti.svg', tier: 'hypercar' }
];
