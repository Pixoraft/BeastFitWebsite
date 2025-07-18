import { Check, Users, Clock, Heart } from "lucide-react";

export default function AboutSection() {
  return (
    <section id="about" className="py-20 bg-secondary">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Why Choose <span className="text-primary">BeastFit Arena</span>?
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              We're not just a gym – we're a community dedicated to helping you achieve your fitness goals with state-of-the-art facilities and personalized training programs.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
            <div>
              <img 
                src="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600" 
                alt="BeastFit Arena modern gym interior" 
                className="rounded-2xl shadow-2xl w-full h-auto"
              />
            </div>
            <div>
              <h3 className="text-3xl font-bold mb-6">Premium Facilities</h3>
              <p className="text-gray-300 mb-6">
                Experience fitness like never before with our cutting-edge equipment, spacious workout areas, and climate-controlled environment designed for optimal performance.
              </p>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Check className="text-primary text-xl" />
                  <span>State-of-the-art cardio and strength equipment</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Check className="text-primary text-xl" />
                  <span>Spacious functional training areas</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Check className="text-primary text-xl" />
                  <span>Premium locker rooms and amenities</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Check className="text-primary text-xl" />
                  <span>Nutrition and supplement bar</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Features Grid */}
          <div className="grid md:grid-cols-3 gap-8">
            <div className="glass-effect p-8 rounded-2xl text-center">
              <Users className="text-primary text-4xl mb-4 mx-auto" />
              <h4 className="text-xl font-bold mb-4">Expert Trainers</h4>
              <p className="text-gray-300">Certified professionals with years of experience helping members achieve their fitness goals.</p>
            </div>
            <div className="glass-effect p-8 rounded-2xl text-center">
              <Clock className="text-accent text-4xl mb-4 mx-auto" />
              <h4 className="text-xl font-bold mb-4">24/7 Access</h4>
              <p className="text-gray-300">Train on your schedule with our round-the-clock access for premium members.</p>
            </div>
            <div className="glass-effect p-8 rounded-2xl text-center">
              <Heart className="text-primary text-4xl mb-4 mx-auto" />
              <h4 className="text-xl font-bold mb-4">Holistic Approach</h4>
              <p className="text-gray-300">Complete wellness programs combining fitness, nutrition, and mental health support.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
