import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/lib/auth";
import { Check } from "lucide-react";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

export default function MembershipSection() {
  const { user } = useAuth();
  const { toast } = useToast();

  const scrollToAuth = () => {
    const element = document.getElementById('auth');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const selectPlan = async (planType: string) => {
    if (!user) {
      scrollToAuth();
      return;
    }

    try {
      // Save membership inquiry
      await apiRequest('POST', '/api/membership-inquiries', {
        name: user.name,
        email: user.email,
        phone: user.phone,
        interest: 'membership',
        message: `Interested in ${planType} membership plan`,
        planType,
      });

      const message = `Hi! I'm interested in the ${planType.toUpperCase()} membership plan. Please provide more details.`;
      window.open(`https://wa.me/919111606607?text=${encodeURIComponent(message)}`, '_blank');
      
      toast({
        title: "Inquiry Sent!",
        description: "Your membership inquiry has been recorded and WhatsApp opened.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to record inquiry. Please try again.",
        variant: "destructive",
      });
    }
  };

  const plans = [
    {
      name: "Basic",
      price: 29,
      description: "Perfect for beginners",
      features: [
        "Access to gym equipment",
        "Basic workout plans",
        "Locker room access",
        "Open gym hours"
      ],
      popular: false,
      buttonClass: "bg-primary hover:bg-primary/90"
    },
    {
      name: "Premium",
      price: 49,
      description: "Best value for money",
      features: [
        "Everything in Basic",
        "Personal training sessions",
        "Group fitness classes",
        "Nutrition consultation",
        "Extended hours access"
      ],
      popular: true,
      buttonClass: "bg-primary hover:bg-primary/90"
    },
    {
      name: "Elite",
      price: 79,
      description: "Ultimate fitness experience",
      features: [
        "Everything in Premium",
        "24/7 gym access",
        "Unlimited personal training",
        "Exclusive VIP areas",
        "Complimentary supplements"
      ],
      popular: false,
      buttonClass: "bg-accent hover:bg-accent/90 text-black"
    }
  ];

  return (
    <section id="membership" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Choose Your <span className="text-primary">Membership</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Flexible membership plans designed to fit your lifestyle and fitness goals. All plans include access to our premium facilities.
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <Card 
              key={plan.name}
              className={`relative hover:border-primary transition-all duration-300 ${
                plan.popular ? 'border-primary scale-105 hover:scale-110' : 'border-border hover:border-primary'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <Badge className="bg-primary px-6 py-2 text-sm font-semibold">
                    MOST POPULAR
                  </Badge>
                </div>
              )}
              
              <CardContent className="p-8">
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                  <div className="text-4xl font-bold text-primary mb-2">
                    ${plan.price}<span className="text-lg text-gray-400">/month</span>
                  </div>
                  <p className="text-gray-400">{plan.description}</p>
                </div>
                
                <div className="space-y-4 mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-center space-x-3">
                      <Check className={`text-xl ${plan.name === 'Elite' ? 'text-accent' : 'text-primary'}`} />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
                
                <Button 
                  onClick={() => selectPlan(plan.name.toLowerCase())}
                  className={`w-full py-3 font-semibold transition-all ${plan.buttonClass}`}
                >
                  Choose {plan.name}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
