import { useState } from 'react';
import { GlassCard } from '@/components/glass';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Star, Quote, ArrowLeft, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';

const testimonials = [
  {
    id: 1,
    name: "Sarah Chen",
    role: "E-commerce Manager",
    company: "TechFlow Solutions",
    image: "/api/placeholder/64/64",
    rating: 5,
    quote: "LensShip transformed our inventory process. What used to take hours now takes minutes. The AI recognition is incredibly accurate.",
    metrics: { scans: "2,500+", accuracy: "96%", timeSaved: "15hrs/week" }
  },
  {
    id: 2,
    name: "Marcus Rodriguez",
    role: "Operations Director", 
    company: "SwiftLogistics",
    image: "/api/placeholder/64/64",
    rating: 5,
    quote: "The DropGo delivery network is a game-changer. Our delivery success rate increased by 40% since switching to LensShip.",
    metrics: { deliveries: "5,000+", successRate: "98.5%", savings: "$50K/month" }
  },
  {
    id: 3,
    name: "Emily Watson",
    role: "Retail Manager",
    company: "ModernGoods Co.",
    image: "/api/placeholder/64/64", 
    rating: 5,
    quote: "The offline functionality saved us during network outages. We never miss a sale anymore, even in remote locations.",
    metrics: { uptime: "99.9%", salesLoss: "0%", locations: "25 stores" }
  }
];

const TestimonialsSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const sectionObserver = useIntersectionObserver({ threshold: 0.1 });

  const nextTestimonial = () => {
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const currentTestimonial = testimonials[activeIndex];

  return (
    <section 
      ref={sectionObserver.targetRef}
      className="py-24 px-6 bg-gradient-to-br from-neon-blue/5 to-transparent"
    >
      <div className="container mx-auto">
        <div className={`text-center mb-16 ${sectionObserver.isIntersecting ? 'animate-glass-entrance' : 'opacity-0'}`}>
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            Trusted by <span className="text-neon-blue">Industry Leaders</span>
          </h2>
          <p className="text-xl text-foreground/70 max-w-2xl mx-auto">
            See how businesses are scaling with LensShip
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          {/* Main Testimonial Card */}
          <GlassCard 
            variant="glow"
            hover="float"
            className={`relative p-8 lg:p-12 mb-8 ${sectionObserver.isIntersecting ? 'animate-layered-rise' : 'opacity-0'}`}
          >
            <div className="absolute top-6 left-6">
              <Quote className="w-8 h-8 text-neon-blue/30" />
            </div>
            
            <div className="grid lg:grid-cols-3 gap-8 items-center">
              {/* Quote & Rating */}
              <div className="lg:col-span-2 space-y-6">
                <div className="flex items-center space-x-2 mb-4">
                  {[...Array(currentTestimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-neon-blue text-neon-blue" />
                  ))}
                </div>
                <blockquote className="text-xl lg:text-2xl leading-relaxed text-foreground/90">
                  "{currentTestimonial.quote}"
                </blockquote>
                
                {/* Metrics */}
                <div className="grid grid-cols-3 gap-4 pt-6 border-t border-border/20">
                  {Object.entries(currentTestimonial.metrics).map(([key, value], index) => (
                    <div key={index} className="text-center">
                      <div className="text-2xl font-bold text-neon-blue">{value}</div>
                      <div className="text-sm text-foreground/60 capitalize">{key.replace(/([A-Z])/g, ' $1')}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Profile */}
              <div className="text-center lg:text-left space-y-4">
                <Avatar className="w-24 h-24 mx-auto lg:mx-0">
                  <AvatarImage src={currentTestimonial.image} />
                  <AvatarFallback>{currentTestimonial.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                </Avatar>
                <div>
                  <h4 className="text-xl font-semibold">{currentTestimonial.name}</h4>
                  <p className="text-foreground/70">{currentTestimonial.role}</p>
                  <Badge variant="outline" className="mt-2">
                    {currentTestimonial.company}
                  </Badge>
                </div>
              </div>
            </div>

            {/* Navigation */}
            <div className="flex justify-center items-center space-x-4 mt-8">
              <Button 
                variant="outline" 
                size="sm"
                onClick={prevTestimonial}
                className="hover:bg-neon-blue/10"
              >
                <ArrowLeft className="w-4 h-4" />
              </Button>
              
              <div className="flex space-x-2">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveIndex(index)}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      index === activeIndex 
                        ? 'bg-neon-blue scale-125' 
                        : 'bg-border hover:bg-neon-blue/50'
                    }`}
                  />
                ))}
              </div>
              
              <Button 
                variant="outline" 
                size="sm"
                onClick={nextTestimonial}
                className="hover:bg-neon-blue/10"
              >
                <ArrowRight className="w-4 h-4" />
              </Button>
            </div>
          </GlassCard>

          {/* Stats Bar */}
          <div className={`grid md:grid-cols-4 gap-6 ${sectionObserver.isIntersecting ? 'animate-glass-entrance' : 'opacity-0'}`} style={{ animationDelay: '200ms' }}>
            {[
              { label: "Active Users", value: "10,000+", icon: "👥" },
              { label: "Products Scanned", value: "2.5M+", icon: "📱" },
              { label: "Deliveries Completed", value: "500K+", icon: "🚚" },
              { label: "Accuracy Rate", value: "96.8%", icon: "🎯" }
            ].map((stat, index) => (
              <GlassCard key={index} className="text-center p-6 hover:scale-105 transition-transform">
                <div className="text-3xl mb-2">{stat.icon}</div>
                <div className="text-2xl font-bold text-neon-blue mb-1">{stat.value}</div>
                <div className="text-sm text-foreground/70">{stat.label}</div>
              </GlassCard>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;