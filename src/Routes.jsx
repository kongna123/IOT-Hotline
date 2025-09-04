import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
import NotFound from "pages/NotFound";
import ShoppingCart from './pages/shopping-cart';
import ServiceBookingForm from './pages/service-booking-form';
import ProductCatalog from './pages/product-catalog';
import JobTrackingDashboard from './pages/job-tracking-dashboard';
import Homepage from './pages/homepage';
import CriminalCheckPage from './pages/criminal-check';
import TechnicianRegistrationPage from './pages/technician-registration';
import TechnicianMatchingPage from './pages/technician-matching';
import OnlineCoursesPage from './pages/online-courses';

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
      <ScrollToTop />
      <RouterRoutes>
        {/* Define your route here */}
        <Route path="/" element={<Homepage />} />
        <Route path="/shopping-cart" element={<ShoppingCart />} />
        <Route path="/service-booking-form" element={<ServiceBookingForm />} />
        <Route path="/product-catalog" element={<ProductCatalog />} />
        <Route path="/job-tracking-dashboard" element={<JobTrackingDashboard />} />
        <Route path="/homepage" element={<Homepage />} />
        <Route path="/criminal-check" element={<CriminalCheckPage />} />
        <Route path="/technician-registration" element={<TechnicianRegistrationPage />} />
        <Route path="/technician-matching" element={<TechnicianMatchingPage />} />
        <Route path="/online-courses" element={<OnlineCoursesPage />} />
        {/* Route สำหรับ NotFound ต้องอยู่ล่างสุดเสมอ */}
        <Route path="*" element={<NotFound />} />
    <Route path="/criminal-check" element={<CriminalCheckPage />} />
    <Route path="/technician-registration" element={<TechnicianRegistrationPage />} />
    <Route path="/technician-matching" element={<TechnicianMatchingPage />} />
    <Route path="/online-courses" element={<OnlineCoursesPage />} />
      </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;