import { useState } from "react";
import { Link } from "wouter";
import { useAuth } from "@/lib/auth";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, Dumbbell } from "lucide-react";

export default function Navigation() {
  const { user, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsOpen(false);
  };

  const openWhatsApp = () => {
    window.open('https://wa.me/919111606607?text=Hi! I have a question about BeastFit Arena.', '_blank');
  };

  const NavLinks = ({ mobile = false }) => (
    <div className={`${mobile ? 'flex flex-col space-y-4' : 'hidden lg:flex items-center space-x-8'}`}>
      <button onClick={() => scrollToSection('home')} className="hover:text-primary transition-colors">
        Home
      </button>
      <button onClick={() => scrollToSection('about')} className="hover:text-primary transition-colors">
        About
      </button>
      <button onClick={() => scrollToSection('membership')} className="hover:text-primary transition-colors">
        Membership
      </button>
      <button onClick={() => scrollToSection('trainers')} className="hover:text-primary transition-colors">
        Trainers
      </button>
      <button onClick={() => scrollToSection('gallery')} className="hover:text-primary transition-colors">
        Gallery
      </button>
      <button onClick={() => scrollToSection('reviews')} className="hover:text-primary transition-colors">
        Reviews
      </button>
      <button onClick={() => scrollToSection('contact')} className="hover:text-primary transition-colors">
        Contact
      </button>
    </div>
  );

  return (
    <nav className="fixed top-0 w-full z-50 bg-background/90 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Dumbbell className="text-primary text-2xl" />
            <span className="text-xl font-bold">BeastFit Arena</span>
          </div>
          
          <NavLinks />
          
          <div className="flex items-center space-x-4">
            {user ? (
              <div className="hidden lg:flex items-center space-x-4">
                <span className="text-sm">Welcome, {user.name}</span>
                {user.isAdmin && (
                  <Link href="/admin">
                    <Button variant="outline" size="sm">
                      Admin
                    </Button>
                  </Link>
                )}
                <Button variant="outline" size="sm" onClick={logout}>
                  Logout
                </Button>
              </div>
            ) : (
              <button 
                onClick={() => scrollToSection('auth')}
                className="hidden lg:block px-4 py-2 border border-primary text-primary hover:bg-primary hover:text-white transition-all"
              >
                Login
              </button>
            )}
            
            <Button 
              onClick={openWhatsApp}
              className="bg-green-500 hover:bg-green-600 px-4 py-2 rounded-lg flex items-center space-x-2 transition-all"
            >
              <i className="fab fa-whatsapp"></i>
              <span className="hidden sm:inline">WhatsApp</span>
            </Button>
            
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="sm" className="lg:hidden">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] bg-background">
                <div className="flex flex-col space-y-6 mt-8">
                  <NavLinks mobile={true} />
                  
                  {user ? (
                    <div className="flex flex-col space-y-4 pt-4 border-t border-border">
                      <span className="text-sm">Welcome, {user.name}</span>
                      {user.isAdmin && (
                        <Link href="/admin">
                          <Button variant="outline" size="sm" className="w-full">
                            Admin Dashboard
                          </Button>
                        </Link>
                      )}
                      <Button variant="outline" size="sm" onClick={logout} className="w-full">
                        Logout
                      </Button>
                    </div>
                  ) : (
                    <Button 
                      onClick={() => scrollToSection('auth')}
                      variant="outline" 
                      className="w-full"
                    >
                      Login / Register
                    </Button>
                  )}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
}
