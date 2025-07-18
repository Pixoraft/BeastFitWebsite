import { Button } from "@/components/ui/button";
import { useAuth } from "@/lib/auth";
import { Dumbbell, Heart } from "lucide-react";

export default function HeroSection() {
  const { user } = useAuth();

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleTrialBooking = () => {
    if (!user) {
      scrollToSection('auth');
    } else {
      const message = 'Hi! I would like to book a free trial session at BeastFit Arena.';
      window.open(`https://wa.me/15551234567?text=${encodeURIComponent(message)}`, '_blank');
    }
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center hero-bg">
      <div className="absolute inset-0 bg-black/50"></div>
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            Transform Your <span className="text-primary">BODY</span><br />
            Unleash Your <span className="text-accent">BEAST</span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-gray-300 max-w-2xl mx-auto">
            Join BeastFit Arena and experience the ultimate fitness transformation with world-class equipment, expert trainers, and a community that pushes you beyond your limits.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              onClick={handleTrialBooking}
              size="lg"
              className="bg-primary hover:bg-primary/90 px-8 py-4 text-lg font-semibold transition-all transform hover:scale-105"
            >
              Book Free Trial
            </Button>
            <Button 
              onClick={() => scrollToSection('membership')}
              variant="outline"
              size="lg"
              className="glass-effect px-8 py-4 text-lg font-semibold hover:bg-white/20 transition-all"
            >
              View Membership
            </Button>
          </div>
          
          {/* Stats */}
          <div className="grid grid-cols-3 gap-8 mt-16 max-w-2xl mx-auto">
            <div className="text-center">
              <div className="text-3xl font-bold text-primary">500+</div>
              <div className="text-gray-400">Active Members</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-accent">50+</div>
              <div className="text-gray-400">Expert Trainers</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary">5</div>
              <div className="text-gray-400">Years Experience</div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Floating elements */}
      <div className="absolute top-20 left-10 animate-float">
        <Dumbbell className="text-primary text-4xl opacity-20" />
      </div>
      <div className="absolute bottom-32 right-10 animate-float" style={{ animationDelay: '2s' }}>
        <Heart className="text-accent text-4xl opacity-20" />
      </div>
    </section>
  );
}
