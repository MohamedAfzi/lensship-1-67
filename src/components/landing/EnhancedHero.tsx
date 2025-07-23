import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  CheckCircle,
  Play,
  Camera,
  Search,
  Zap,
  ArrowRight
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { GlassCard } from '@/components/glass';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';
import { useParallax } from '@/hooks/useParallax';

interface EnhancedHeroProps {
  onContactDemo: () => void;
}

const EnhancedHero = ({ onContactDemo }: EnhancedHeroProps) => {
  const navigate = useNavigate();
  const [typedText, setTypedText] = useState('');
  const [currentStat, setCurrentStat] = useState(0);
  
  const heroParallax = useParallax({ speed: 0.3, direction: 'up' });
  const bgParallax = useParallax({ speed: 0.1, direction: 'down' });
  const heroObserver = useIntersectionObserver({ threshold: 0.2 });

  const fullText = "AI-Powered Product Recognition & Smart Delivery";
  const stats = [
    { label: "Accuracy Rate", value: "96.8%", icon: "🎯" },
    { label: "Scan Time", value: "< 2s", icon: "⚡" },
    { label: "Delivery Partners", value: "50K+", icon: "🚚" },
    { label: "Success Rate", value: "98.5%", icon: "✅" }
  ];

  // Typewriter effect
  useEffect(() => {
    if (!heroObserver.isIntersecting) return;
    
    let index = 0;
    const timer = setInterval(() => {
      if (index <= fullText.length) {
        setTypedText(fullText.slice(0, index));
        index++;
      } else {
        clearInterval(timer);
      }
    }, 50);

    return () => clearInterval(timer);
  }, [heroObserver.isIntersecting]);

  // Rotating stats
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentStat((prev) => (prev + 1) % stats.length);
    }, 2000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section 
      ref={heroObserver.targetRef}
      className="relative pt-24 pb-32 px-6 overflow-hidden gpu-accelerated min-h-screen flex items-center"
    >
      {/* Enhanced Layered Parallax Background */}
      <div 
        className="absolute inset-0 bg-gradient-to-br from-neon-blue/5 to-transparent glass-layer-1"
        style={{ transform: bgParallax.transform }}
      />
      <div 
        className="absolute inset-0 animate-parallax-float opacity-20"
        style={{ transform: heroParallax.transform }}
      />
      
      {/* Floating Particles */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-neon-blue/20 rounded-full animate-parallax-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${i * 0.5}s`,
              animationDuration: `${3 + Math.random() * 2}s`
            }}
          />
        ))}
      </div>
      
      <div className="container mx-auto relative z-10">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          <div className={`space-y-6 md:space-y-8 ${heroObserver.isIntersecting ? 'animate-glass-entrance' : 'opacity-0'}`}>
            {/* Dynamic Badge */}
            <Badge className="bg-neon-blue/20 text-neon-blue border-neon-blue/30 animate-glass-pulse">
              <Zap className="w-3 h-3 mr-1" />
              New: Offline-First Architecture
            </Badge>

            <div className="space-y-4">
              <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold leading-tight">
                <span className="block">
                  {typedText}
                  <span className="animate-pulse">|</span>
                </span>
              </h1>
              
              <p className="text-base sm:text-lg md:text-xl text-foreground/80 max-w-lg leading-relaxed">
                Scan any product in 2 seconds with 96% AI accuracy. Auto-generate pricing, connect to DropGo's 50,000+ delivery network, and track everything in real-time.
              </p>
              
              {/* Enhanced Feature Points */}
              <div className="flex flex-wrap items-center gap-4 md:gap-6 text-xs sm:text-sm text-foreground/70">
                {[
                  { icon: CheckCircle, text: "No credit card" },
                  { icon: CheckCircle, text: "Setup in 2 minutes" },
                  { icon: CheckCircle, text: "Works offline" }
                ].map((item, index) => (
                  <div 
                    key={index}
                    className={`flex items-center space-x-2 ${
                      heroObserver.isIntersecting ? 'animate-glass-entrance' : 'opacity-0'
                    }`}
                    style={{ animationDelay: `${(index + 1) * 200}ms` }}
                  >
                    <item.icon className="w-3 h-3 sm:w-4 sm:h-4 text-neon-blue" />
                    <span>{item.text}</span>
                  </div>
                ))}
              </div>

              {/* Live Stats */}
              <div className="p-4 rounded-lg bg-card/20 backdrop-blur-sm border border-border/20">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-foreground/60">Live Stats:</span>
                  <div className="flex items-center space-x-2">
                    <span className="text-lg">{stats[currentStat].icon}</span>
                    <span className="font-semibold text-neon-blue">{stats[currentStat].value}</span>
                    <span className="text-sm text-foreground/70">{stats[currentStat].label}</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <Link to="/register" className="w-full sm:w-auto">
                <Button 
                  size="lg" 
                  className="w-full sm:w-auto bg-neon-blue hover:bg-neon-blue/90 text-background font-semibold hover:scale-105 transition-all duration-200 gpu-accelerated focus-ring group"
                >
                  Get Started – Free 7-Day Trial
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Button 
                size="lg" 
                variant="outline" 
                className="w-full sm:w-auto border-neon-blue text-neon-blue hover:bg-neon-blue/10 hover:scale-105 transition-all duration-200 backdrop-blur-sm bg-card/20 focus-ring group"
                onClick={onContactDemo}
              >
                <Play className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform" />
                See Demo
              </Button>
            </div>
          </div>
          
          {/* Enhanced Interactive Demo Card */}
          <div className={`relative glass-layer-2 mt-8 lg:mt-0 ${heroObserver.isIntersecting ? 'animate-layered-rise' : 'opacity-0'}`}>
            <GlassCard 
              variant="glow" 
              hover="float"
              className="shadow-2xl gpu-accelerated"
            >
              <div className="p-8 space-y-6">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 rounded-full bg-neon-blue/20 flex items-center justify-center animate-glass-pulse">
                    <Camera className="w-6 h-6 text-neon-blue" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Product Detected</h3>
                    <p className="text-sm text-foreground/60">Scanning complete</p>
                  </div>
                  <div className="ml-auto">
                    <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                      96% Confidence
                    </Badge>
                  </div>
                </div>
                
                {/* Enhanced Scanning Animation */}
                <div className="relative w-32 h-32 mx-auto bg-gradient-to-br from-neon-blue/20 to-neon-blue/5 rounded-lg overflow-hidden">
                  <div className="w-24 h-24 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 border-2 border-neon-blue border-dashed rounded-lg flex items-center justify-center">
                    <Search className="w-8 h-8 text-neon-blue animate-pulse" />
                  </div>
                  {/* Scanning line animation */}
                  <div className="absolute top-0 left-0 w-full h-0.5 bg-neon-blue opacity-70 animate-bounce" 
                       style={{ animationDuration: '1.5s' }} />
                </div>
                
                {/* Progress Indicators */}
                <div className="space-y-2">
                  {[
                    { label: "AI Recognition", progress: 100 },
                    { label: "Price Calculation", progress: 100 },
                    { label: "Delivery Setup", progress: 85 }
                  ].map((item, index) => (
                    <div key={index} className="space-y-1">
                      <div className="flex justify-between text-sm">
                        <span>{item.label}</span>
                        <span className="text-neon-blue">{item.progress}%</span>
                      </div>
                      <div className="w-full bg-border/30 rounded-full h-1.5">
                        <div 
                          className="bg-neon-blue h-1.5 rounded-full transition-all duration-1000"
                          style={{ width: `${item.progress}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
                
                <Button 
                  className="w-full bg-neon-blue hover:bg-neon-blue/90 hover:scale-105 transition-all duration-200 group"
                  onClick={() => navigate('/camera-scan')}
                >
                  Generate QR & Send
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </div>
            </GlassCard>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EnhancedHero;