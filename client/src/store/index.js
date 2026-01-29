import { create } from 'zustand';
import { cartAPI } from '../api';

// Generate session ID
const getSessionId = () => {
  let sessionId = localStorage.getItem('vw_session_id');
  if (!sessionId) {
    sessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    localStorage.setItem('vw_session_id', sessionId);
  }
  return sessionId;
};

export const useCartStore = create((set, get) => ({
  items: [],
  totals: { subtotal: 0, discount: 0, gst: 0, total: 0, itemCount: 0 },
  coupon: null,
  loading: false,
  error: null,
  sessionId: getSessionId(),

  fetchCart: async () => {
    set({ loading: true });
    try {
      const response = await cartAPI.get(get().sessionId);
      set({
        items: response.data.items,
        totals: response.data.totals,
        coupon: response.data.coupon,
        loading: false,
      });
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },

  addItem: async (itemData) => {
    set({ loading: true });
    try {
      const response = await cartAPI.addItem(get().sessionId, itemData);
      set({
        items: response.data.items,
        totals: response.data.totals,
        coupon: response.data.coupon,
        loading: false,
      });
      return { success: true, message: response.message };
    } catch (error) {
      set({ error: error.message, loading: false });
      return { success: false, message: error.message };
    }
  },

  updateQuantity: async (itemId, quantity) => {
    set({ loading: true });
    try {
      const response = await cartAPI.updateItem(get().sessionId, itemId, quantity);
      set({
        items: response.data.items,
        totals: response.data.totals,
        loading: false,
      });
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },

  removeItem: async (itemId) => {
    set({ loading: true });
    try {
      const response = await cartAPI.removeItem(get().sessionId, itemId);
      set({
        items: response.data.items,
        totals: response.data.totals,
        loading: false,
      });
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },

  applyCoupon: async (code) => {
    set({ loading: true });
    try {
      const response = await cartAPI.applyCoupon(get().sessionId, code);
      set({
        items: response.data.items,
        totals: response.data.totals,
        coupon: response.data.coupon,
        loading: false,
      });
      return { success: true, message: response.message };
    } catch (error) {
      set({ error: error.message, loading: false });
      return { success: false, message: error.message };
    }
  },

  removeCoupon: async () => {
    set({ loading: true });
    try {
      const response = await cartAPI.removeCoupon(get().sessionId);
      set({
        items: response.data.items,
        totals: response.data.totals,
        coupon: null,
        loading: false,
      });
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },

  clearCart: async () => {
    set({ loading: true });
    try {
      await cartAPI.clear(get().sessionId);
      set({
        items: [],
        totals: { subtotal: 0, discount: 0, gst: 0, total: 0, itemCount: 0 },
        coupon: null,
        loading: false,
      });
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },
}));

export const useWishlistStore = create((set, get) => ({
  items: [],
  loading: false,
  sessionId: getSessionId(),

  fetchWishlist: async () => {
    set({ loading: true });
    try {
      const response = await cartAPI.getWishlist(get().sessionId);
      set({ items: response.data, loading: false });
    } catch (error) {
      set({ loading: false });
    }
  },

  addToWishlist: async (itemData) => {
    set({ loading: true });
    try {
      const response = await cartAPI.addToWishlist(get().sessionId, itemData);
      set({ items: response.data, loading: false });
      return { success: true };
    } catch (error) {
      set({ loading: false });
      return { success: false, message: error.message };
    }
  },

  removeFromWishlist: async (itemId) => {
    set({ loading: true });
    try {
      const response = await cartAPI.removeFromWishlist(get().sessionId, itemId);
      set({ items: response.data, loading: false });
    } catch (error) {
      set({ loading: false });
    }
  },

  isInWishlist: (itemId) => {
    return get().items.some(item => item.itemId === itemId);
  },
}));

export const useUserStore = create((set) => ({
  user: null,
  isAuthenticated: false,

  setUser: (user) => set({ user, isAuthenticated: !!user }),
  logout: () => set({ user: null, isAuthenticated: false }),
}));
