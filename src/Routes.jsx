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
    <BrowserRouter basename="/IOT-Hotline">
      <ErrorBoundary>
        <ScrollToTop />
        <RouterRoutes>
          {/* หน้าแรก */}
          <Route path="/" element={<Homepage />} />

          {/* หน้าอื่นๆ */}
          <Route path="/shopping-cart" element={<ShoppingCart />} />
          <Route path="/service-booking-form" element={<ServiceBookingForm />} />
          <Route path="/product-catalog" element={<ProductCatalog />} />
          <Route path="/job-tracking-dashboard" element={<JobTrackingDashboard />} />
          <Route path="/criminal-check" element={<CriminalCheckPage />} />
          <Route path="/technician-registration" element={<TechnicianRegistrationPage />} />
          <Route path="/technician-matching" element={<TechnicianMatchingPage />} />
          <Route path="/online-courses" element={<OnlineCoursesPage />} />

          {/* ถ้าไม่เจอ path ไหนเลย ให้ไป NotFound */}
          <Route path="*" element={<NotFound />} />
        </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;
