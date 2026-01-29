import express from 'express';
import { v4 as uuidv4 } from 'uuid';
import { parts, coupons } from '../data/database.js';

const router = express.Router();

// In-memory cart and wishlist storage (keyed by sessionId)
const carts = new Map();
const wishlists = new Map();

// Get cart
router.get('/:sessionId', (req, res) => {
  const cart = carts.get(req.params.sessionId) || { items: [], coupon: null };
  const calculatedCart = calculateCartTotals(cart);
  res.json({ success: true, data: calculatedCart });
});

// Add item to cart
router.post('/:sessionId/add', (req, res) => {
  const { itemId, itemType, quantity = 1, variantId, colorId, itemData } = req.body;
  const sessionId = req.params.sessionId;
  
  let cart = carts.get(sessionId) || { items: [], coupon: null };
  
  // Check if item already exists
  const existingIndex = cart.items.findIndex(
    item => item.itemId === itemId && item.variantId === variantId
  );
  
  if (existingIndex > -1) {
    cart.items[existingIndex].quantity += quantity;
  } else {
    let itemDetails;
    
    if (itemType === 'part') {
      const part = parts.find(p => p.id === itemId);
      if (!part) {
        return res.status(404).json({ success: false, message: 'Part not found' });
      }
      itemDetails = {
        id: uuidv4(),
        itemId: part.id,
        itemType: 'part',
        name: part.name,
        price: part.price,
        mrp: part.mrp,
        image: part.image,
        partNumber: part.partNumber,
        quantity,
        stock: part.stock
      };
    } else if (itemType === 'car') {
      // Car items from frontend data
      itemDetails = {
        id: uuidv4(),
        itemId,
        itemType: 'car',
        name: itemData.name,
        variant: itemData.variant,
        color: itemData.color,
        variantId,
        colorId,
        price: itemData.price,
        tokenAmount: itemData.tokenAmount,
        image: itemData.image,
        quantity: 1
      };
    } else if (itemType === 'service') {
      itemDetails = {
        id: uuidv4(),
        itemId,
        itemType: 'service',
        name: itemData.name,
        price: itemData.price,
        estimatedTime: itemData.estimatedTime,
        quantity: 1
      };
    } else {
      return res.status(400).json({ success: false, message: 'Invalid item type' });
    }
    
    cart.items.push(itemDetails);
  }
  
  carts.set(sessionId, cart);
  const calculatedCart = calculateCartTotals(cart);
  
  res.json({ success: true, data: calculatedCart, message: 'Item added to cart' });
});

// Update cart item quantity
router.patch('/:sessionId/item/:itemId', (req, res) => {
  const { quantity } = req.body;
  const { sessionId, itemId } = req.params;
  
  const cart = carts.get(sessionId);
  
  if (!cart) {
    return res.status(404).json({ success: false, message: 'Cart not found' });
  }
  
  const itemIndex = cart.items.findIndex(item => item.id === itemId);
  
  if (itemIndex === -1) {
    return res.status(404).json({ success: false, message: 'Item not found in cart' });
  }
  
  if (quantity <= 0) {
    cart.items.splice(itemIndex, 1);
  } else {
    cart.items[itemIndex].quantity = quantity;
  }
  
  carts.set(sessionId, cart);
  const calculatedCart = calculateCartTotals(cart);
  
  res.json({ success: true, data: calculatedCart });
});

// Remove item from cart
router.delete('/:sessionId/item/:itemId', (req, res) => {
  const { sessionId, itemId } = req.params;
  
  const cart = carts.get(sessionId);
  
  if (!cart) {
    return res.status(404).json({ success: false, message: 'Cart not found' });
  }
  
  cart.items = cart.items.filter(item => item.id !== itemId);
  carts.set(sessionId, cart);
  const calculatedCart = calculateCartTotals(cart);
  
  res.json({ success: true, data: calculatedCart, message: 'Item removed from cart' });
});

// Apply coupon
router.post('/:sessionId/coupon', (req, res) => {
  const { code } = req.body;
  const sessionId = req.params.sessionId;
  
  const cart = carts.get(sessionId) || { items: [], coupon: null };
  const coupon = coupons.find(c => c.code.toUpperCase() === code.toUpperCase());
  
  if (!coupon) {
    return res.status(400).json({ success: false, message: 'Invalid coupon code' });
  }
  
  const now = new Date();
  const validTill = new Date(coupon.validTill);
  
  if (now > validTill) {
    return res.status(400).json({ success: false, message: 'Coupon has expired' });
  }
  
  const subtotal = cart.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  
  if (subtotal < coupon.minAmount) {
    return res.status(400).json({ 
      success: false, 
      message: `Minimum order amount of ₹${coupon.minAmount.toLocaleString()} required for this coupon` 
    });
  }
  
  cart.coupon = coupon;
  carts.set(sessionId, cart);
  const calculatedCart = calculateCartTotals(cart);
  
  res.json({ 
    success: true, 
    data: calculatedCart, 
    message: `Coupon "${code}" applied successfully!` 
  });
});

// Remove coupon
router.delete('/:sessionId/coupon', (req, res) => {
  const sessionId = req.params.sessionId;
  const cart = carts.get(sessionId);
  
  if (cart) {
    cart.coupon = null;
    carts.set(sessionId, cart);
  }
  
  const calculatedCart = calculateCartTotals(cart || { items: [], coupon: null });
  res.json({ success: true, data: calculatedCart, message: 'Coupon removed' });
});

// Clear cart
router.delete('/:sessionId', (req, res) => {
  carts.delete(req.params.sessionId);
  res.json({ success: true, data: { items: [], totals: { subtotal: 0, discount: 0, gst: 0, total: 0 } } });
});

// === WISHLIST ENDPOINTS ===

// Get wishlist
router.get('/:sessionId/wishlist', (req, res) => {
  const wishlist = wishlists.get(req.params.sessionId) || [];
  res.json({ success: true, data: wishlist });
});

// Add to wishlist
router.post('/:sessionId/wishlist', (req, res) => {
  const { itemId, itemType } = req.body;
  const sessionId = req.params.sessionId;
  
  let wishlist = wishlists.get(sessionId) || [];
  
  if (wishlist.some(item => item.itemId === itemId)) {
    return res.status(400).json({ success: false, message: 'Item already in wishlist' });
  }
  
  if (itemType === 'part') {
    const part = parts.find(p => p.id === itemId);
    if (!part) {
      return res.status(404).json({ success: false, message: 'Part not found' });
    }
    wishlist.push({
      id: uuidv4(),
      itemId: part.id,
      itemType: 'part',
      name: part.name,
      price: part.price,
      image: part.image,
      addedAt: new Date().toISOString()
    });
  }
  
  wishlists.set(sessionId, wishlist);
  res.json({ success: true, data: wishlist, message: 'Added to wishlist' });
});

// Remove from wishlist
router.delete('/:sessionId/wishlist/:itemId', (req, res) => {
  const { sessionId, itemId } = req.params;
  let wishlist = wishlists.get(sessionId) || [];
  
  wishlist = wishlist.filter(item => item.itemId !== itemId);
  wishlists.set(sessionId, wishlist);
  
  res.json({ success: true, data: wishlist, message: 'Removed from wishlist' });
});

// Helper function to calculate cart totals
function calculateCartTotals(cart) {
  const subtotal = cart.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  
  let discount = 0;
  if (cart.coupon) {
    if (cart.coupon.type === 'percentage') {
      discount = Math.min(
        Math.round(subtotal * cart.coupon.discount / 100),
        cart.coupon.maxDiscount
      );
    } else {
      discount = cart.coupon.discount;
    }
  }
  
  const taxableAmount = subtotal - discount;
  const gst = Math.round(taxableAmount * 0.18); // 18% GST
  const total = taxableAmount + gst;
  
  return {
    items: cart.items,
    coupon: cart.coupon,
    totals: {
      subtotal,
      discount,
      gst,
      total,
      itemCount: cart.items.reduce((sum, item) => sum + item.quantity, 0)
    }
  };
}

export default router;
