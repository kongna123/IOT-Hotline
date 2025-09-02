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
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;
