import { Navbar } from '../components/Navbar';
import { Hero } from '../components/Hero';
import { Trusted } from '../components/Trusted';
import { HowItWorks } from '../components/HowItWorks';
import { Features } from '../components/Features';
import { ProductPreview } from '../components/ProductPreview';
import { Templates } from '../components/Templates';
import { Marketplace } from '../components/Marketplace';
import { IntegrationsGrid } from '../components/IntegrationsGrid';
import { Security } from '../components/Security';
import { Testimonials } from '../components/Testimonials';
import { PricingPreview } from '../components/PricingPreview';
import { FAQ } from '../components/FAQ';
import { CTA } from '../components/CTA';
import { Footer } from '../components/Footer';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-primary selection:text-primary-foreground overflow-x-hidden">
      <Navbar />
      <Hero />
      <Trusted />
      <HowItWorks />
      <Features />
      <ProductPreview />
      <Templates />
      <Marketplace />
      <IntegrationsGrid />
      <Security />
      <Testimonials />
      <PricingPreview />
      <FAQ />
      <CTA />
      <Footer />
    </div>
  );
}
