import express from 'express';
import { cars } from '../data/database.js';

const router = express.Router();

// Get all cars
router.get('/', (req, res) => {
  const { category, brand } = req.query;
  let filteredCars = cars;
  
  if (category) {
    filteredCars = filteredCars.filter(car => 
      car.category?.toLowerCase() === category.toLowerCase()
    );
  }
  
  if (brand) {
    filteredCars = filteredCars.filter(car => 
      car.brand?.toLowerCase() === brand.toLowerCase()
    );
  }
  
  res.json({
    success: true,
    count: filteredCars.length,
    data: filteredCars.map(car => ({
      id: car.id,
      name: car.name,
      brand: car.brand,
      tagline: car.tagline,
      category: car.category,
      startingPrice: car.startingPrice,
      basePrice: car.startingPrice,
      image: car.image,
      gallery: car.gallery,
      specs: car.specs,
      features: car.features,
      inStock: car.inStock !== false
    }))
  });
});

// Get single car details
router.get('/:id', (req, res) => {
  const car = cars.find(c => c.id === req.params.id);
  
  if (!car) {
    return res.status(404).json({ success: false, message: 'Car not found' });
  }
  
  res.json({ success: true, data: car });
});

// Calculate price
router.post('/:id/calculate-price', (req, res) => {
  const { variantId, colorId, accessories = [] } = req.body;
  const car = cars.find(c => c.id === req.params.id);
  
  if (!car) {
    return res.status(404).json({ success: false, message: 'Car not found' });
  }
  
  const variant = car.variants.find(v => v.id === variantId) || car.variants[0];
  const color = car.colors.find(c => c.id === colorId) || car.colors[0];
  
  const basePrice = variant.price;
  const colorPrice = color.price;
  const accessoriesPrice = 0; // Can be extended
  const subtotal = basePrice + colorPrice + accessoriesPrice;
  const gst = Math.round(subtotal * 0.28);
  const total = subtotal + gst;
  
  res.json({
    success: true,
    data: {
      breakdown: {
        basePrice,
        colorPrice,
        accessoriesPrice,
        subtotal,
        gst,
        total
      },
      variant: variant.name,
      color: color.name
    }
  });
});

// Calculate EMI
router.post('/:id/calculate-emi', (req, res) => {
  const { principal, tenure, interestRate = 8.5, downPayment = 0 } = req.body;
  
  const loanAmount = principal - downPayment;
  const monthlyRate = interestRate / 12 / 100;
  const emi = Math.round(
    (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, tenure)) /
    (Math.pow(1 + monthlyRate, tenure) - 1)
  );
  
  const totalAmount = emi * tenure;
  const totalInterest = totalAmount - loanAmount;
  
  res.json({
    success: true,
    data: {
      emi,
      loanAmount,
      tenure,
      interestRate,
      totalAmount,
      totalInterest,
      downPayment
    }
  });
});

// Book test drive
router.post('/:id/test-drive', (req, res) => {
  const { name, email, phone, location, preferredDate, preferredTime } = req.body;
  const car = cars.find(c => c.id === req.params.id);
  
  if (!car) {
    return res.status(404).json({ success: false, message: 'Car not found' });
  }
  
  // Simulate booking
  const bookingId = `TD-${Date.now()}`;
  
  res.json({
    success: true,
    data: {
      bookingId,
      car: car.name,
      location,
      preferredDate,
      preferredTime,
      status: 'confirmed',
      message: `Your test drive for ${car.name} has been booked. Our team will contact you shortly.`
    }
  });
});

// Reserve car
router.post('/:id/reserve', (req, res) => {
  const { variantId, colorId, name, email, phone, dealerLocation } = req.body;
  const car = cars.find(c => c.id === req.params.id);
  
  if (!car) {
    return res.status(404).json({ success: false, message: 'Car not found' });
  }
  
  const variant = car.variants.find(v => v.id === variantId) || car.variants[0];
  const color = car.colors.find(c => c.id === colorId) || car.colors[0];
  
  const reservationId = `RES-${Date.now()}`;
  
  res.json({
    success: true,
    data: {
      reservationId,
      car: car.name,
      variant: variant.name,
      color: color.name,
      tokenAmount: car.tokenAmount,
      estimatedDelivery: car.deliveryTime,
      status: 'pending_payment',
      message: `Your reservation for ${car.name} ${variant.name} has been initiated. Please complete the token payment to confirm.`
    }
  });
});

export default router;
