import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { Provider } from 'react-redux';
import { store } from './store/store';
import { AuthProvider } from './context/AuthContext';

// Global Components
import Navbar from './components/Navbar';
import Preloader from './components/Preloader';

// Custom Homepage Sections
import Hero from './components/Hero';
import CameraShowcase from './components/CameraShowcase';
import GallerySection from './components/Gallery';
import Contact from './components/Contact';
import Camera3D from './components/Camera3D';

// Pages
import Home from './pages/Home';
import Events from './pages/Events';
import Gallery from './pages/Gallery';
import Login from './pages/Login';
import Register from './pages/Register';
import Bookings from './pages/Bookings';
import AdminEvents from './pages/AdminEvents';
import EventDetails from './pages/EventDetails';
import CustomEventForm from './components/CustomEventForm';
import Wishlist from './components/Wishlist';
// import AddServiceForm from './components/AddServiceForm';
import AddServiceForm from './components/AddServiceForm';
// Component to handle the preloader only on root
function RootPage() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="bg-black">
      <AnimatePresence>{loading && <Preloader />}</AnimatePresence>
      {!loading && (
        <>
          <Hero />
          <CameraShowcase />
          <Camera3D />
          <GallerySection />
          <Contact />
        </>
      )}
    </div>
  );
}

function AppWrapper() {
  const location = useLocation();

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<RootPage />} />
        <Route path="/home" element={<Home />} />
        <Route path="/events" element={<Events />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/bookings" element={<Bookings />} />
        <Route path="/events/:eventId" element={<EventDetails />} />
        <Route path="/admin/events" element={<AdminEvents />} />
        <Route path="/admin/add-service" element={<AddServiceForm />} />
        <Route path="/custom-event" element={<CustomEventForm />} />
        <Route path="/wishlist" element={<Wishlist />} />
      </Routes>
    </div>
  );
}

function App() {
  return (
    <Provider store={store}>
      <AuthProvider>
        <Router>
          <AppWrapper />
        </Router>
      </AuthProvider>
    </Provider>
  );
}

export default App;
