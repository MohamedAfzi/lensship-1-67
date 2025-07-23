import { GlassCard } from '@/components/glass';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  ExternalLink, 
  Download, 
  Play, 
  FileText, 
  BookOpen,
  Rocket,
  PlayCircle,
  Code,
  Youtube,
  Lightbulb,
  ArrowRight
} from 'lucide-react';
import { helpResources } from '@/data/helpData';
import { Resource } from '@/types/help';

const iconMap = {
  'rocket': Rocket,
  'play-circle': PlayCircle,
  'file-text': FileText,
  'code': Code,
  'youtube': Youtube,
  'lightbulb': Lightbulb,
};

const typeConfig = {
  video: {
    icon: Play,
    color: 'text-neon-pink bg-neon-pink/20',
    label: 'Video'
  },
  pdf: {
    icon: Download,
    color: 'text-neon-green bg-neon-green/20',
    label: 'PDF'
  },
  link: {
    icon: ExternalLink,
    color: 'text-neon-blue bg-neon-blue/20',
    label: 'Link'
  },
  guide: {
    icon: BookOpen,
    color: 'text-neon-purple bg-neon-purple/20',
    label: 'Guide'
  }
};

const ResourcesSection = () => {
  const handleResourceClick = (resource: Resource) => {
    if (resource.type === 'pdf') {
      // For PDFs, we might want to download or open in new tab
      window.open(resource.url, '_blank');
    } else {
      // For other types, open in new tab
      window.open(resource.url, '_blank');
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-foreground mb-2">
          Helpful Resources
        </h2>
        <p className="text-muted-foreground">
          Guides, tutorials, and documentation to help you get the most out of LensShip
        </p>
      </div>

      {/* Quick Access Section */}
      <GlassCard className="p-6">
        <h3 className="font-semibold text-neon-blue mb-4">Quick Start</h3>
        <div className="grid md:grid-cols-2 gap-4">
          <Button
            variant="outline"
            className="justify-start h-auto p-4 border-neon-blue/30 text-left hover:bg-neon-blue/10"
            onClick={() => window.open('/guides/quick-start', '_blank')}
          >
            <div className="flex items-center gap-3 w-full">
              <div className="w-10 h-10 rounded-lg bg-neon-blue/20 flex items-center justify-center">
                <Rocket className="w-5 h-5 text-neon-blue" />
              </div>
              <div className="flex-1 text-left">
                <p className="font-medium text-foreground">Quick Start Guide</p>
                <p className="text-sm text-muted-foreground">Get started in 10 minutes</p>
              </div>
              <ArrowRight className="w-4 h-4 text-neon-blue" />
            </div>
          </Button>

          <Button
            variant="outline"
            className="justify-start h-auto p-4 border-neon-pink/30 text-left hover:bg-neon-pink/10"
            onClick={() => window.open('https://youtube.com/watch?v=demo1', '_blank')}
          >
            <div className="flex items-center gap-3 w-full">
              <div className="w-10 h-10 rounded-lg bg-neon-pink/20 flex items-center justify-center">
                <PlayCircle className="w-5 h-5 text-neon-pink" />
              </div>
              <div className="flex-1 text-left">
                <p className="font-medium text-foreground">Video Tutorial</p>
                <p className="text-sm text-muted-foreground">Watch the basics</p>
              </div>
              <ArrowRight className="w-4 h-4 text-neon-pink" />
            </div>
          </Button>
        </div>
      </GlassCard>

      {/* All Resources Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {helpResources.map((resource, index) => {
          const IconComponent = iconMap[resource.icon as keyof typeof iconMap] || FileText;
          const typeInfo = typeConfig[resource.type];

          return (
            <GlassCard
              key={index}
              className="p-6 cursor-pointer group hover:scale-105 transition-all duration-300"
              onClick={() => handleResourceClick(resource)}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 rounded-lg bg-muted/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <IconComponent className="h-6 w-6 text-muted-foreground group-hover:text-neon-blue transition-colors duration-300" />
                </div>
                <Badge 
                  variant="outline" 
                  className={`${typeInfo.color} border-current text-xs`}
                >
                  {typeInfo.label}
                </Badge>
              </div>

              <h4 className="font-semibold text-foreground mb-2 group-hover:text-neon-blue transition-colors duration-300">
                {resource.title}
              </h4>
              
              <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                {resource.description}
              </p>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <typeInfo.icon className="w-3 h-3" />
                  <span className="capitalize">{resource.type}</span>
                </div>
                <ExternalLink className="w-4 h-4 text-muted-foreground group-hover:text-neon-blue transition-colors duration-300" />
              </div>
            </GlassCard>
          );
        })}
      </div>

      {/* Additional Help */}
      <GlassCard className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-semibold text-foreground mb-1">
              Can't find what you're looking for?
            </h3>
            <p className="text-sm text-muted-foreground">
              Our support team is here to help you with any questions or issues.
            </p>
          </div>
          <Button
            className="bg-neon-blue hover:bg-neon-blue/90 text-background"
            onClick={() => document.getElementById('contact-tab')?.click()}
          >
            Contact Support
          </Button>
        </div>
      </GlassCard>
    </div>
  );
};

export default ResourcesSection;