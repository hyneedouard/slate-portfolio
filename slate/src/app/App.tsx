import { useState, useEffect } from 'react';
import { Hero } from '@/app/components/Hero';
import { About } from '@/app/components/About';
import { Services } from '@/app/components/Services';
import { Pricing } from '@/app/components/Pricing';
import { Projects } from '@/app/components/Projects';
import { Testimonials } from '@/app/components/Testimonials';
import { Contact } from '@/app/components/Contact';
import { Navigation } from '@/app/components/Navigation';
import { Footer } from '@/app/components/Footer';
import { ScrollToTop } from '@/app/components/ScrollToTop';
import { ProjectRouter, ProjectType } from '@/app/components/ProjectRouter';
import { OrderForm } from '@/app/components/OrderForm';
import { CookieBanner } from '@/app/components/CookieBanner';
import { LegalPages } from '@/app/components/LegalPages';

export default function App() {
  const [currentProject, setCurrentProject] = useState<ProjectType>(null);
  const [orderData, setOrderData] = useState<{ packageName: string; price: number } | null>(null);
  const [legalPage, setLegalPage] = useState<'privacy' | 'cgv' | 'mentions' | null>(null);

  // Bloquer le scroll quand une modal projet est ouverte
  useEffect(() => {
    if (currentProject || orderData || legalPage) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [currentProject, orderData, legalPage]);

  // Fermer la modal avec la touche Escape
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (currentProject) setCurrentProject(null);
        if (orderData) setOrderData(null);
        if (legalPage) setLegalPage(null);
      }
    };
    
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [currentProject, orderData, legalPage]);

  const handleOrderClick = (packageName: string, price: number) => {
    setOrderData({ packageName, price });
  };

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      <Hero />
      <About />
      <Services />
      <Pricing onOrderClick={handleOrderClick} />
      <Projects onProjectClick={setCurrentProject} />
      <Testimonials />
      <Contact />
      <Footer onLegalClick={setLegalPage} />
      <ScrollToTop />
      <CookieBanner />

      {/* Project Modal */}
      {currentProject && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 overflow-y-auto animate-fade-in"
          onClick={(e) => {
            // Fermer si on clique sur le backdrop
            if (e.target === e.currentTarget) {
              setCurrentProject(null);
            }
          }}
        >
          <div className="min-h-screen">
            <ProjectRouter currentProject={currentProject} onBack={() => setCurrentProject(null)} />
          </div>
        </div>
      )}

      {/* Order Form Modal */}
      {orderData && (
        <OrderForm
          packageName={orderData.packageName}
          price={orderData.price}
          onClose={() => setOrderData(null)}
          onLegalClick={setLegalPage}
        />
      )}

      {/* Legal Pages Modal */}
      <LegalPages page={legalPage} onClose={() => setLegalPage(null)} />
    </div>
  );
}