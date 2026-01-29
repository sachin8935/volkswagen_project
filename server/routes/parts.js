import express from 'express';
import { parts, vinDatabase } from '../data/database.js';

const router = express.Router();

// Get all parts with filters
router.get('/', (req, res) => {
  const { category, subcategory, model, year, search, minPrice, maxPrice } = req.query;
  let filteredParts = [...parts];
  
  if (category) {
    filteredParts = filteredParts.filter(p => p.category.toLowerCase() === category.toLowerCase());
  }
  
  if (subcategory) {
    filteredParts = filteredParts.filter(p => p.subcategory.toLowerCase() === subcategory.toLowerCase());
  }
  
  if (model) {
    filteredParts = filteredParts.filter(p => 
      p.compatibility.some(c => c.model.toLowerCase() === model.toLowerCase())
    );
  }
  
  if (year) {
    const yearNum = parseInt(year);
    filteredParts = filteredParts.filter(p => 
      p.compatibility.some(c => c.years.includes(yearNum))
    );
  }
  
  if (search) {
    const searchLower = search.toLowerCase();
    filteredParts = filteredParts.filter(p => 
      p.name.toLowerCase().includes(searchLower) ||
      p.description.toLowerCase().includes(searchLower) ||
      p.partNumber.toLowerCase().includes(searchLower)
    );
  }
  
  if (minPrice) {
    filteredParts = filteredParts.filter(p => p.price >= parseInt(minPrice));
  }
  
  if (maxPrice) {
    filteredParts = filteredParts.filter(p => p.price <= parseInt(maxPrice));
  }
  
  res.json({
    success: true,
    count: filteredParts.length,
    data: filteredParts
  });
});

// Get part categories
router.get('/categories', (req, res) => {
  const categories = [...new Set(parts.map(p => p.category))];
  const categoryData = categories.map(cat => ({
    name: cat,
    count: parts.filter(p => p.category === cat).length,
    subcategories: [...new Set(parts.filter(p => p.category === cat).map(p => p.subcategory))]
  }));
  
  res.json({ success: true, data: categoryData });
});

// Get single part
router.get('/:id', (req, res) => {
  const part = parts.find(p => p.id === req.params.id);
  
  if (!part) {
    return res.status(404).json({ success: false, message: 'Part not found' });
  }
  
  res.json({ success: true, data: part });
});

// Check compatibility
router.post('/check-compatibility', (req, res) => {
  const { partId, model, year } = req.body;
  const part = parts.find(p => p.id === partId);
  
  if (!part) {
    return res.status(404).json({ success: false, message: 'Part not found' });
  }
  
  const yearNum = parseInt(year);
  const isCompatible = part.compatibility.some(
    c => c.model.toLowerCase() === model.toLowerCase() && c.years.includes(yearNum)
  );
  
  res.json({
    success: true,
    data: {
      partId,
      partName: part.name,
      model,
      year: yearNum,
      isCompatible,
      message: isCompatible 
        ? `${part.name} is compatible with your ${year} ${model}`
        : `${part.name} is NOT compatible with your ${year} ${model}`
    }
  });
});

// VIN-based part matching
router.post('/vin-match', (req, res) => {
  const { vin } = req.body;
  
  const vehicleInfo = vinDatabase[vin];
  
  if (!vehicleInfo) {
    return res.status(404).json({ 
      success: false, 
      message: 'VIN not found in database. Please check and try again.' 
    });
  }
  
  const compatibleParts = parts.filter(p =>
    p.compatibility.some(
      c => c.model === vehicleInfo.model && c.years.includes(vehicleInfo.year)
    )
  );
  
  res.json({
    success: true,
    data: {
      vehicle: vehicleInfo,
      vin,
      compatibleParts: compatibleParts.map(p => ({
        id: p.id,
        name: p.name,
        category: p.category,
        price: p.price,
        stock: p.stock,
        partNumber: p.partNumber
      })),
      totalParts: compatibleParts.length
    }
  });
});

// Check stock
router.get('/:id/stock', (req, res) => {
  const part = parts.find(p => p.id === req.params.id);
  
  if (!part) {
    return res.status(404).json({ success: false, message: 'Part not found' });
  }
  
  res.json({
    success: true,
    data: {
      partId: part.id,
      name: part.name,
      stock: part.stock,
      inStock: part.stock > 0,
      status: part.stock > 20 ? 'In Stock' : part.stock > 0 ? 'Low Stock' : 'Out of Stock'
    }
  });
});

export default router;
