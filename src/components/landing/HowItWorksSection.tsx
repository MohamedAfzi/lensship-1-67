import { useNavigate } from 'react-router-dom';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';
import { steps } from '@/data/landingData';

const HowItWorksSection = () => {
  const navigate = useNavigate();
  const stepsObserver = useIntersectionObserver({ threshold: 0.1 });

  return (
    <section 
      id="how-it-works" 
      ref={stepsObserver.targetRef}
      className="py-24 px-6 bg-mobile-surface/30 backdrop-blur-sm"
    >
      <div className="container mx-auto">
        <div className={`text-center mb-16 ${stepsObserver.isIntersecting ? 'animate-glass-entrance' : 'opacity-0'}`}>
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            How It <span className="text-neon-blue">Works</span>
          </h2>
          <p className="text-xl text-foreground/70">Simple, fast, and secure in just three steps</p>
        </div>
        <div className="grid md:grid-cols-3 gap-12">
          {steps.map((step, index) => {
            const IconComponent = step.icon;
            return (
              <div 
                key={index} 
                className={`text-center relative cursor-pointer group ${
                  stepsObserver.isIntersecting 
                    ? 'animate-layered-rise' 
                    : 'opacity-0'
                }`}
                style={{ animationDelay: `${index * 200}ms` }}
                onClick={() => step.route && navigate(step.route)}
              >
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-16 left-full w-full h-0.5 bg-gradient-to-r from-neon-blue to-transparent z-0 animate-glass-pulse"></div>
                )}
                <div className="relative z-10 transition-all duration-200 group-hover:scale-105">
                  <div className="mx-auto w-24 h-24 rounded-full bg-neon-blue/10 border-2 border-neon-blue/30 flex items-center justify-center mb-6 hover:animate-glass-float gpu-accelerated backdrop-blur-sm group-hover:border-neon-blue/60 group-hover:bg-neon-blue/20">
                    <IconComponent className="w-12 h-12 text-neon-blue" />
                  </div>
                  <h3 className="text-2xl font-bold mb-4">{step.title}</h3>
                  <p className="text-foreground/70">{step.description}</p>
                  <div className="mt-2 text-neon-blue text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                    Try Interactive Demo
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;