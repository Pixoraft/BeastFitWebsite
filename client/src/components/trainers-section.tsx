import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function TrainersSection() {
  const trainers = [
    {
      name: "Mike Johnson",
      specialty: "Strength & Conditioning Specialist",
      image: "https://images.unsplash.com/photo-1566753323558-f4e0952af115?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400",
      description: "8+ years experience in powerlifting and strength training. Specializes in helping clients build muscle and increase strength safely.",
      certifications: "NASM-CPT, CSCS"
    },
    {
      name: "Sarah Williams",
      specialty: "HIIT & Cardio Expert",
      image: "https://images.unsplash.com/photo-1594381898411-846e7d193883?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400",
      description: "Former competitive athlete with expertise in high-intensity training and cardiovascular conditioning programs.",
      certifications: "ACE-CPT, TRX Certified"
    },
    {
      name: "David Chen",
      specialty: "Functional Training & Rehab",
      image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400",
      description: "Movement specialist focusing on functional fitness, injury prevention, and rehabilitation exercises.",
      certifications: "FMS, SFMA Certified"
    }
  ];

  return (
    <section id="trainers" className="py-20 bg-secondary">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Meet Our <span className="text-primary">Expert Trainers</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Our certified trainers are passionate about helping you achieve your fitness goals with personalized programs and unwavering support.
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {trainers.map((trainer, index) => (
            <Card 
              key={trainer.name}
              className="glass-effect rounded-2xl overflow-hidden hover:transform hover:scale-105 transition-all duration-300"
            >
              <img 
                src={trainer.image} 
                alt={`${trainer.name} - ${trainer.specialty}`} 
                className="w-full h-64 object-cover"
              />
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-2">{trainer.name}</h3>
                <p className="text-primary mb-3">{trainer.specialty}</p>
                <p className="text-gray-300 text-sm mb-4">{trainer.description}</p>
                <div className="flex items-center space-x-2 text-sm">
                  <i className="fas fa-certificate text-accent"></i>
                  <span>{trainer.certifications}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
