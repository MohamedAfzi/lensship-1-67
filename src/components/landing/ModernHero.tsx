import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  CheckCircle,
  Play,
  Camera,
  Search,
  Zap,
  ArrowRight,
  Sparkles
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { GlassCard } from '@/components/glass';
import { GlassLayer } from '@/components/glass/GlassLayer';
import { GlassStack } from '@/components/glass/GlassStack';
import { GlassParticleSystem } from '@/components/glass/GlassParticle';
import { GlassMagnetic } from '@/components/glass/GlassMagnetic';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';
import { useParallax } from '@/hooks/useParallax';
import { useAnimatedCounter } from '@/hooks/useAnimatedCounter';

interface ModernHeroProps {
  onContactDemo: () => void;
}

const ModernHero = ({ onContactDemo }: ModernHeroProps) => {
  const navigate = useNavigate();
  const [typedText, setTypedText] = useState('');
  const [currentStat, setCurrentStat] = useState(0);
  
  const heroParallax = useParallax({ speed: 0.3, direction: 'up' });
  const bgParallax = useParallax({ speed: 0.1, direction: 'down' });
  const heroObserver = useIntersectionObserver({ threshold: 0.2 });

  const fullText = "AI-Powered Product Recognition & Smart Delivery";
  const stats = [
    { label: "Accuracy Rate", value: "96.8%", icon: "🎯", count: 96.8 },
    { label: "Scan Time", value: "< 2s", icon: "⚡", count: 2 },
    { label: "Delivery Partners", value: "50K+", icon: "🚚", count: 50000 },
    { label: "Success Rate", value: "98.5%", icon: "✅", count: 98.5 }
  ];

  const animatedCount = useAnimatedCounter({ 
    end: stats[currentStat].count, 
    duration: 1500,
    isActive: heroObserver.isIntersecting 
  });

  // Enhanced typewriter effect
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
    }, 60);

    return () => clearInterval(timer);
  }, [heroObserver.isIntersecting]);

  // Enhanced rotating stats
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentStat((prev) => (prev + 1) % stats.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section 
      ref={heroObserver.targetRef}
      className="relative pt-24 pb-32 px-6 overflow-hidden gpu-accelerated min-h-screen flex items-center"
    >
      {/* Multi-layered Background Effects */}
      <GlassLayer depth={1} className="absolute inset-0">
        <div 
          className="absolute inset-0 bg-gradient-to-br from-neon-blue/8 via-neon-purple/4 to-neon-cyan/6"
          style={{ transform: bgParallax.transform }}
        />
      </GlassLayer>

      {/* Interactive Particle System */}
      <GlassParticleSystem count={15} interactive />
      
      {/* Floating Energy Orbs */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-gradient-to-r from-neon-blue/30 to-neon-cyan/20 animate-parallax-float backdrop-blur-sm"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${Math.random() * 120 + 40}px`,
              height: `${Math.random() * 120 + 40}px`,
              animationDelay: `${i * 0.7}s`,
              animationDuration: `${4 + Math.random() * 3}s`,
              filter: `blur(${Math.random() * 2 + 1}px)`,
            }}
          />
        ))}
      </div>
      
      <div className="container mx-auto relative z-10">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          <GlassLayer depth={3} className={`space-y-8 ${heroObserver.isIntersecting ? 'animate-layered-rise' : 'opacity-0'}`}>
            {/* Dynamic Badge with Magnetic Effect */}
            <GlassMagnetic strength={0.2}>
              <Badge className="bg-gradient-to-r from-neon-blue/30 to-neon-cyan/20 text-neon-blue border-neon-blue/40 animate-glass-pulse backdrop-blur-md">
                <Sparkles className="w-3 h-3 mr-1 animate-pulse" />
                New: Offline-First Architecture
              </Badge>
            </GlassMagnetic>

            <div className="space-y-6">
              {/* Enhanced Typography */}
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight bg-gradient-to-r from-foreground via-neon-blue to-neon-cyan bg-clip-text text-transparent">
                <span className="block relative">
                  {typedText}
                  <span className="animate-pulse text-neon-blue">|</span>
                  <div className="absolute -inset-2 bg-gradient-to-r from-neon-blue/20 to-transparent blur-xl opacity-50 animate-pulse" />
                </span>
              </h1>
              
              <p className="text-lg md:text-xl text-foreground/80 max-w-lg leading-relaxed backdrop-blur-sm bg-card/10 p-4 rounded-lg border border-border/20">
                Scan any product in 2 seconds with 96% AI accuracy. Auto-generate pricing, connect to DropGo's 50,000+ delivery network, and track everything in real-time.
              </p>
              
              {/* Enhanced Feature Points with Magnetic Cards */}
              <GlassStack spacing="tight" cascade>
                {[
                  { icon: CheckCircle, text: "No credit card", color: "neon-green" },
                  { icon: CheckCircle, text: "Setup in 2 minutes", color: "neon-blue" },
                  { icon: CheckCircle, text: "Works offline", color: "neon-purple" }
                ].map((item, index) => (
                  <GlassMagnetic key={index} strength={0.1}>
                    <div className="flex items-center space-x-3 p-3 rounded-lg bg-card/20 backdrop-blur-sm border border-border/20 hover:border-neon-blue/40 transition-all duration-300">
                      <item.icon className={`w-4 h-4 text-${item.color}`} />
                      <span className="text-sm font-medium">{item.text}</span>
                    </div>
                  </GlassMagnetic>
                ))}
              </GlassStack>

              {/* Enhanced Live Stats with Counter Animation */}
              <GlassCard variant="glow" className="p-6 animate-glass-pulse">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-foreground/60">Live Stats:</span>
                    <div className="w-2 h-2 bg-neon-green rounded-full animate-pulse" />
                  </div>
                  <div className="flex items-center space-x-3">
                    <span className="text-2xl animate-bounce" style={{ animationDelay: '0.5s' }}>
                      {stats[currentStat].icon}
                    </span>
                    <div className="text-right">
                      <div className="font-bold text-xl text-neon-blue">
                        {currentStat === 1 ? '< 2s' : currentStat === 2 ? '50K+' : `${animatedCount}%`}
                      </div>
                      <div className="text-xs text-foreground/70">{stats[currentStat].label}</div>
                    </div>
                  </div>
                </div>
              </GlassCard>
            </div>
            
            {/* Enhanced Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <GlassMagnetic strength={0.3}>
                <Link to="/register" className="w-full sm:w-auto">
                  <Button 
                    size="lg" 
                    className="w-full sm:w-auto bg-gradient-to-r from-neon-blue to-neon-cyan hover:from-neon-blue/90 hover:to-neon-cyan/90 text-background font-semibold shadow-lg shadow-neon-blue/30 focus-ring group relative overflow-hidden"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
                    Get Started – Free 7-Day Trial
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
              </GlassMagnetic>
              
              <GlassMagnetic strength={0.2}>
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="w-full sm:w-auto border-neon-blue/60 text-neon-blue hover:bg-neon-blue/20 backdrop-blur-md bg-card/30 shadow-lg shadow-neon-blue/20 focus-ring group"
                  onClick={onContactDemo}
                >
                  <Play className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform" />
                  See Demo
                </Button>
              </GlassMagnetic>
            </div>
          </GlassLayer>
          
          {/* Enhanced Interactive Demo Card */}
          <GlassLayer depth={4} className={`mt-8 lg:mt-0 ${heroObserver.isIntersecting ? 'animate-layered-rise' : 'opacity-0'}`}>
            <GlassMagnetic strength={0.4}>
              <GlassCard 
                variant="glow" 
                hover="float"
                className="shadow-2xl shadow-neon-blue/20 border-neon-blue/30 overflow-hidden relative"
              >
                {/* Scanning Animation Overlay */}
                <div className="absolute inset-0 pointer-events-none">
                  <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-neon-blue to-transparent opacity-70 animate-scan-line" />
                </div>
                
                <div className="p-8 space-y-6 relative">
                  <div className="flex items-center space-x-4">
                    <GlassMagnetic strength={0.1}>
                      <div className="w-12 h-12 rounded-full bg-gradient-to-r from-neon-blue/30 to-neon-cyan/20 flex items-center justify-center animate-glass-pulse backdrop-blur-md border border-neon-blue/40">
                        <Camera className="w-6 h-6 text-neon-blue animate-pulse" />
                      </div>
                    </GlassMagnetic>
                    <div>
                      <h3 className="font-semibold text-lg">Product Detected</h3>
                      <p className="text-sm text-foreground/60">AI Recognition Complete</p>
                    </div>
                    <div className="ml-auto">
                      <Badge className="bg-gradient-to-r from-green-500/20 to-green-400/30 text-green-400 border-green-500/40 animate-pulse">
                        96% Confidence
                      </Badge>
                    </div>
                  </div>
                  
                  {/* Enhanced 3D Scanning Visualization */}
                  <div className="relative w-40 h-40 mx-auto perspective-1000">
                    <div className="absolute inset-0 bg-gradient-to-br from-neon-blue/30 via-neon-purple/20 to-neon-cyan/25 rounded-xl overflow-hidden transform-gpu animate-glass-float">
                      <div className="w-32 h-32 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 border-2 border-neon-blue border-dashed rounded-xl flex items-center justify-center backdrop-blur-sm animate-pulse">
                        <Search className="w-8 h-8 text-neon-blue animate-spin" style={{ animationDuration: '3s' }} />
                      </div>
                      {/* 3D Grid Lines */}
                      {[...Array(4)].map((_, i) => (
                        <div
                          key={i}
                          className="absolute inset-0 border border-neon-blue/20 rounded-xl animate-pulse"
                          style={{
                            animationDelay: `${i * 0.5}s`,
                            transform: `scale(${1 - i * 0.1}) translateZ(${i * 4}px)`,
                          }}
                        />
                      ))}
                    </div>
                  </div>
                  
                  {/* Enhanced Progress with Ripple Effects */}
                  <div className="space-y-4">
                    {[
                      { label: "AI Recognition", progress: 100, color: "neon-blue" },
                      { label: "Price Calculation", progress: 100, color: "neon-green" },
                      { label: "Delivery Setup", progress: 85, color: "neon-purple" }
                    ].map((item, index) => (
                      <div key={index} className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>{item.label}</span>
                          <span className={`text-${item.color} font-semibold`}>{item.progress}%</span>
                        </div>
                        <div className="w-full bg-border/30 rounded-full h-2 overflow-hidden">
                          <div 
                            className={`bg-gradient-to-r from-${item.color} to-${item.color}/80 h-2 rounded-full transition-all duration-2000 relative overflow-hidden`}
                            style={{ width: `${item.progress}%` }}
                          >
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-scan-line" />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <GlassMagnetic strength={0.2}>
                    <Button 
                      className="w-full bg-gradient-to-r from-neon-blue to-neon-cyan hover:from-neon-blue/90 hover:to-neon-cyan/90 shadow-lg shadow-neon-blue/30 group relative overflow-hidden"
                      onClick={() => navigate('/camera-scan')}
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
                      Generate QR & Send
                      <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </GlassMagnetic>
                </div>
              </GlassCard>
            </GlassMagnetic>
          </GlassLayer>
        </div>
      </div>
    </section>
  );
};

export default ModernHero;