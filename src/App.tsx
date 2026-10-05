import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ScrollToTop } from './components/layout/ScrollToTop';
import { Home } from './pages/Home';
import { AboutPage } from './pages/AboutPage';
import { ProductsPage } from './pages/ProductsPage';
import { ProductDetailPage } from './pages/ProductDetailPage';
import { QualityAssurancePage } from './pages/QualityAssurancePage';
import { ExportServicesPage } from './pages/ExportServicesPage';
import { ContactPage } from './pages/ContactPage';
import { RequestQuotePage } from './pages/RequestQuotePage';

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/products/:slug" element={<ProductDetailPage />} />
        <Route path="/quality-assurance" element={<QualityAssurancePage />} />
        <Route path="/export-services" element={<ExportServicesPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/request-a-quote" element={<RequestQuotePage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
