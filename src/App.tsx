import React, { useRef } from 'react';
import { StoreProvider } from './context/StoreContext';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { FloatingActions } from './components/layout/FloatingActions';
import { HeroSection } from './components/home/HeroSection';
import { CoreValues } from './components/home/CoreValues';
import { FeaturedSection } from './components/home/FeaturedSection';
import { FarmStorySection } from './components/home/FarmStorySection';
import { CustomerReviews } from './components/home/CustomerReviews';
import { NutritionBlog } from './components/home/NutritionBlog';
import { ProductCatalog } from './components/shop/ProductCatalog';
import { ProductDetailModal } from './components/shop/ProductDetailModal';
import { AIChatbotModal } from './components/ai-assistant/AIChatbotModal';
import { CustomComboBuilder } from './components/combo-builder/CustomComboBuilder';
import { CartDrawer } from './components/cart/CartDrawer';
import { CheckoutModal } from './components/cart/CheckoutModal';
import { UserDashboardModal } from './components/account/UserDashboardModal';
import { OrderSuccessModal } from './components/account/OrderSuccessModal';
import { ToastContainer } from './components/ui/Toast';

const MainLayout: React.FC = () => {
  const catalogRef = useRef<HTMLDivElement>(null);
  const storyRef = useRef<HTMLDivElement>(null);
  const blogRef = useRef<HTMLDivElement>(null);

  const scrollToCatalog = () => {
    catalogRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToStory = () => {
    storyRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToBlog = () => {
    blogRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#1C2826] flex flex-col font-sans selection:bg-[#1E7547] selection:text-white">
      {/* Header */}
      <Header
        onNavigateToCatalog={scrollToCatalog}
        onNavigateToStory={scrollToStory}
        onNavigateToBlog={scrollToBlog}
      />

      {/* Main Page Flow — Clean, Logical & Uncluttered */}
      <main className="flex-1">
        {/* 1. Hero Section */}
        <HeroSection onExploreCatalog={scrollToCatalog} />

        {/* 2. Product Catalog with Clean Horizontal Filter Bar */}
        <div ref={catalogRef}>
          <ProductCatalog />
        </div>

        {/* 3. Custom Combo Builder Banner */}
        <FeaturedSection onViewAllCatalog={scrollToCatalog} />

        {/* 4. Core Values & Clean Comparison */}
        <CoreValues />

        {/* 5. Brand Farm-to-Table Story */}
        <div ref={storyRef}>
          <FarmStorySection />
        </div>

        {/* 6. Customer Testimonials */}
        <CustomerReviews />

        {/* 7. Nutrition & Calorie Education Blog */}
        <div ref={blogRef}>
          <NutritionBlog />
        </div>
      </main>

      {/* Footer */}
      <Footer
        onNavigateToCatalog={scrollToCatalog}
        onNavigateToStory={scrollToStory}
        onNavigateToBlog={scrollToBlog}
      />

      {/* Clean Single Floating Action for AI Nutrition Assistant */}
      <FloatingActions />

      {/* Global Interactive Modals & Drawers */}
      <ProductDetailModal />
      <AIChatbotModal />
      <CustomComboBuilder />
      <CartDrawer />
      <CheckoutModal />
      <UserDashboardModal />
      <OrderSuccessModal />
      <ToastContainer />
    </div>
  );
};

export default function App() {
  return (
    <StoreProvider>
      <MainLayout />
    </StoreProvider>
  );
}
