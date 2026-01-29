const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Generic fetch helper
async function fetchAPI(endpoint, options = {}) {
  const url = `${API_BASE}${endpoint}`;
  const config = {
    headers: {
      'Content-Type': 'application/json',
      ...(options.headers || {}),
    },
    ...options,
  };

  // Ensure headers are merged correctly
  config.headers = {
    'Content-Type': 'application/json',
    ...(options.headers || {}),
  };

  if (config.body && typeof config.body === 'object') {
    config.body = JSON.stringify(config.body);
  }

  const response = await fetch(url, config);
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'API request failed');
  }

  return data;
}

// Cars API
export const carsAPI = {
  getAll: (category) => fetchAPI(`/cars${category ? `?category=${category}` : ''}`),
  getById: (id) => fetchAPI(`/cars/${id}`),
  calculatePrice: (id, data) => fetchAPI(`/cars/${id}/calculate-price`, { method: 'POST', body: data }),
  calculateEMI: (id, data) => fetchAPI(`/cars/${id}/calculate-emi`, { method: 'POST', body: data }),
  bookTestDrive: (id, data) => fetchAPI(`/cars/${id}/test-drive`, { method: 'POST', body: data }),
  reserveCar: (id, data) => fetchAPI(`/cars/${id}/reserve`, { method: 'POST', body: data }),
};

// Parts API
export const partsAPI = {
  getAll: (filters = {}) => {
    const params = new URLSearchParams(filters).toString();
    return fetchAPI(`/parts${params ? `?${params}` : ''}`);
  },
  getById: (id) => fetchAPI(`/parts/${id}`),
  getCategories: () => fetchAPI('/parts/categories'),
  checkCompatibility: (data) => fetchAPI('/parts/check-compatibility', { method: 'POST', body: data }),
  vinMatch: (vin) => fetchAPI('/parts/vin-match', { method: 'POST', body: { vin } }),
  checkStock: (id) => fetchAPI(`/parts/${id}/stock`),
};

// Services API
export const servicesAPI = {
  getTypes: () => fetchAPI('/services/types'),
  getCenters: (city) => fetchAPI(`/services/centers${city ? `?city=${city}` : ''}`),
  getCities: () => fetchAPI('/services/cities'),
  estimate: (data) => fetchAPI('/services/estimate', { method: 'POST', body: data }),
  book: (formData) => {
    return fetch(`${API_BASE}/services/book`, {
      method: 'POST',
      body: formData, // FormData for file upload
    }).then(res => res.json());
  },
  getBooking: (bookingId) => fetchAPI(`/services/booking/${bookingId}`),
  getHistory: (registrationNumber) => fetchAPI(`/services/history/${registrationNumber}`),
};

// Cart API
export const cartAPI = {
  get: (sessionId) => fetchAPI(`/cart/${sessionId}`),
  addItem: (sessionId, data) => fetchAPI(`/cart/${sessionId}/add`, { method: 'POST', body: data }),
  updateItem: (sessionId, itemId, quantity) => fetchAPI(`/cart/${sessionId}/item/${itemId}`, { method: 'PATCH', body: { quantity } }),
  removeItem: (sessionId, itemId) => fetchAPI(`/cart/${sessionId}/item/${itemId}`, { method: 'DELETE' }),
  applyCoupon: (sessionId, code) => fetchAPI(`/cart/${sessionId}/coupon`, { method: 'POST', body: { code } }),
  removeCoupon: (sessionId) => fetchAPI(`/cart/${sessionId}/coupon`, { method: 'DELETE' }),
  clear: (sessionId) => fetchAPI(`/cart/${sessionId}`, { method: 'DELETE' }),
  getWishlist: (sessionId) => fetchAPI(`/cart/${sessionId}/wishlist`),
  addToWishlist: (sessionId, data) => fetchAPI(`/cart/${sessionId}/wishlist`, { method: 'POST', body: data }),
  removeFromWishlist: (sessionId, itemId) => fetchAPI(`/cart/${sessionId}/wishlist/${itemId}`, { method: 'DELETE' }),
};

// Bookings API
export const bookingsAPI = {
  createTestDrive: (data) => fetchAPI('/bookings/test-drive', { method: 'POST', body: data }),
  getTestDrive: (bookingId) => fetchAPI(`/bookings/test-drive/${bookingId}`),
  createReservation: (data) => fetchAPI('/bookings/reservation', { method: 'POST', body: data }),
  getReservation: (reservationId) => fetchAPI(`/bookings/reservation/${reservationId}`),
  updateReservation: (reservationId, data) => fetchAPI(`/bookings/reservation/${reservationId}`, { method: 'PATCH', body: data }),
  getUserBookings: (email) => fetchAPI(`/bookings/user/${email}`),
};

// Payment API
export const paymentAPI = {
  getConfig: () => fetchAPI('/payment/config'),
  createIntent: (data) => fetchAPI('/payment/create-intent', { method: 'POST', body: data }),
  confirmPayment: (data) => fetchAPI('/payment/confirm', { method: 'POST', body: data }),
  createOrder: (data) => fetchAPI('/payment/order', { method: 'POST', body: data }),
  getOrder: (orderId) => fetchAPI(`/payment/order/${orderId}`),
  getInvoiceUrl: (orderId) => `${API_BASE}/payment/invoice/${orderId}`,
};

// AI API
export const aiAPI = {
  askCarAssistant: (question, carData) => fetchAPI('/ai/car-assistant', { 
    method: 'POST', 
    body: { question, carData } 
  }),
  getCarSuggestions: (carId) => fetchAPI(`/ai/car-suggestions/${carId}`),
};

// Default export for simple fetch operations (used by AdminDashboard)
const api = {
  get: (endpoint, options = {}) => {
    const headers = options.headers || {};
    return fetchAPI(endpoint, { ...options, headers: { 'Content-Type': 'application/json', ...headers } });
  },
  post: (endpoint, data, options = {}) => {
    const headers = options.headers || {};
    return fetchAPI(endpoint, { method: 'POST', body: data, headers: { 'Content-Type': 'application/json', ...headers } });
  },
  patch: (endpoint, data, options = {}) => {
    const headers = options.headers || {};
    return fetchAPI(endpoint, { method: 'PATCH', body: data, headers: { 'Content-Type': 'application/json', ...headers } });
  },
  delete: (endpoint, options = {}) => {
    const headers = options.headers || {};
    return fetchAPI(endpoint, { method: 'DELETE', headers: { 'Content-Type': 'application/json', ...headers } });
  },
};

export default api;
