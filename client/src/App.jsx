import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { useCartStore, useWishlistStore } from './store';

// Layout
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';

// Pages
import HomePage from './pages/HomePage';
import ShowroomPage from './pages/ShowroomPage';
import CarDetailPage from './pages/CarDetailPage';
import PartsStorePage from './pages/PartsStorePage';
import PartDetailPage from './pages/PartDetailPage';
import ServiceBookingPage from './pages/ServiceBookingPage';
import ServiceStatusPage from './pages/ServiceStatusPage';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
import OrderSuccessPage from './pages/OrderSuccessPage';
import WishlistPage from './pages/WishlistPage';
import AdminDashboard from './pages/AdminDashboard';
import TeamPage from './pages/TeamPage';
import TrackOrderPage from './pages/TrackOrderPage';

import './App.css';

// Layout wrapper that conditionally shows Navbar/Footer
function Layout() {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');

  return (
    <div className="min-h-screen flex flex-col">
      {!isAdminRoute && <Navbar />}
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/showroom" element={<ShowroomPage />} />
          <Route path="/showroom/:carId" element={<CarDetailPage />} />
          <Route path="/parts" element={<PartsStorePage />} />
          <Route path="/parts/:partId" element={<PartDetailPage />} />
          <Route path="/service" element={<ServiceBookingPage />} />
          <Route path="/service/status/:bookingId" element={<ServiceStatusPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/order-success/:orderId" element={<OrderSuccessPage />} />
          <Route path="/wishlist" element={<WishlistPage />} />
          <Route path="/team" element={<TeamPage />} />
          <Route path="/track-order" element={<TrackOrderPage />} />
          <Route path="/admin" element={<AdminDashboard />} />
        </Routes>
      </main>
      {!isAdminRoute && <Footer />}
    </div>
  );
}

function App() {
  const fetchCart = useCartStore((state) => state.fetchCart);
  const fetchWishlist = useWishlistStore((state) => state.fetchWishlist);

  useEffect(() => {
    fetchCart();
    fetchWishlist();
  }, [fetchCart, fetchWishlist]);

  return (
    <Router>
      <Layout />
    </Router>
  );
}

export default App;
