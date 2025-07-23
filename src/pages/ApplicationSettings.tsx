import BackButton from '@/components/navigation/BackButton';
import { Card, CardContent } from '@/components/ui/card';
import { useNavigate } from 'react-router-dom';
import {
  Bell,
  Globe,
  Palette,
  Database,
  HelpCircle,
  Info,
  ChevronRight
} from 'lucide-react';

interface SettingCard {
  title: string;
  description: string;
  icon: React.ComponentType<any>;
  route: string;
}

const ApplicationSettings = () => {
  const navigate = useNavigate();

  const settingsCards: SettingCard[] = [
    {
      title: 'Notifications',
      description: 'Configure push notifications, email alerts, and SMS preferences',
      icon: Bell,
      route: '/settings/notifications'
    },
    {
      title: 'Language & Region',
      description: 'Set your preferred language, currency, and timezone',
      icon: Globe,
      route: '/settings/language'
    },
    {
      title: 'Display Settings',
      description: 'Customize theme preferences, font size, and app layout',
      icon: Palette,
      route: '/settings/display'
    },
    {
      title: 'Data & Storage',
      description: 'Manage app cache, offline storage, and data usage',
      icon: Database,
      route: '/settings/data'
    },
    {
      title: 'Help & Support',
      description: 'Access documentation, tutorials, and contact support',
      icon: HelpCircle,
      route: '/help'
    },
    {
      title: 'About LensShip',
      description: 'View app version, terms of service, and privacy policy',
      icon: Info,
      route: '/about'
    }
  ];

  const handleCardClick = (route: string) => {
    navigate(route);
  };

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="container mx-auto max-w-2xl">
        {/* Header */}
        <div className="mb-6">
          <BackButton />
          <div className="mt-4">
            <h1 className="text-3xl font-bold text-foreground mb-2">Application Settings</h1>
            <p className="text-muted-foreground">
              Configure app preferences, notifications, and system settings
            </p>
          </div>
        </div>

        {/* Settings Cards */}
        <div className="space-y-4">
          {settingsCards.map((setting, index) => {
            const IconComponent = setting.icon;
            return (
              <Card
                key={index}
                className="group bg-gradient-to-br from-black to-[#121212] border border-border/50 hover:border-neon-blue/50 cursor-pointer transition-all duration-300 hover:scale-[1.02] hover:shadow-lg hover:shadow-neon-blue/20"
                onClick={() => handleCardClick(setting.route)}
              >
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-neon-blue/20 to-neon-blue/40 flex items-center justify-center transition-all duration-300 group-hover:scale-110">
                        <IconComponent className="h-6 w-6 text-neon-blue transition-all duration-300 group-hover:drop-shadow-[0_0_8px_currentColor]" />
                      </div>
                      <div>
                        <h3 className="text-foreground font-semibold text-lg mb-1 group-hover:text-neon-blue transition-colors duration-300">
                          {setting.title}
                        </h3>
                        <p className="text-muted-foreground text-sm leading-relaxed">
                          {setting.description}
                        </p>
                      </div>
                    </div>
                    <ChevronRight className="h-5 w-5 text-muted-foreground group-hover:text-neon-blue transition-all duration-300 group-hover:translate-x-1" />
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ApplicationSettings;