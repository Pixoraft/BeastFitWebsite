import { useEffect } from "react";
import { apiRequest } from "@/lib/queryClient";
import Navigation from "@/components/navigation";
import HeroSection from "@/components/hero-section";
import AboutSection from "@/components/about-section";
import MembershipSection from "@/components/membership-section";
import TrainersSection from "@/components/trainers-section";
import GallerySection from "@/components/gallery-section";
import ReviewsSection from "@/components/reviews-section";
import ContactSection from "@/components/contact-section";
import FloatingWhatsApp from "@/components/floating-whatsapp";
import AuthModals from "@/components/auth-modals";

export default function Home() {
  useEffect(() => {
    // Track visitor
    apiRequest('POST', '/api/track-visit', {}).catch(() => {
      // Silently fail if tracking doesn't work
    });
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <Navigation />
      <HeroSection />
      <AboutSection />
      <MembershipSection />
      <TrainersSection />
      <GallerySection />
      <ReviewsSection />
      <ContactSection />
      <FloatingWhatsApp />
      <AuthModals />
    </div>
  );
}
