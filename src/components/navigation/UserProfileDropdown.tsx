import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  User,
  Settings,
  ChevronRight,
  LogOut,
  HelpCircle
} from 'lucide-react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Separator } from '@/components/ui/separator';

const UserProfileDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const userData = {
    name: "MOHAMMED ZAYED",
    storeName: "Zayed Store",
    userId: "773••"
  };

  const handleNavigation = (route: string) => {
    navigate(route);
    setIsOpen(false);
  };

  const renderMainButton = (icon: React.ComponentType<any>, title: string, description: string, route: string) => {
    const IconComponent = icon;
    return (
      <div
        onClick={() => handleNavigation(route)}
        className="flex items-center gap-3 px-4 py-3 hover:bg-neon-blue/10 cursor-pointer transition-all duration-200 group rounded-lg mx-2"
      >
        <div className="w-10 h-10 rounded-lg bg-muted/20 flex items-center justify-center group-hover:bg-neon-blue/20 transition-colors duration-200">
          <IconComponent className="h-5 w-5 text-muted-foreground group-hover:text-neon-blue transition-colors duration-200" />
        </div>
        <div className="flex-1">
          <p className="text-foreground font-medium text-sm">{title}</p>
          <p className="text-muted-foreground text-xs">{description}</p>
        </div>
        <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-neon-blue transition-colors duration-200" />
      </div>
    );
  };

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Avatar className="h-12 w-12 bg-gradient-to-br from-neon-blue to-neon-blue/80 cursor-pointer hover:scale-105 transition-transform duration-200">
          <AvatarFallback className="bg-transparent text-white font-bold text-lg">
            MZ
          </AvatarFallback>
        </Avatar>
      </PopoverTrigger>
      <PopoverContent 
        className="w-72 p-0 bg-background/95 backdrop-blur-xl border-border/30 rounded-xl shadow-2xl animate-glass-entrance"
        align="end"
        sideOffset={12}
      >
        {/* Main Settings Buttons */}
        <div className="py-3">
          {renderMainButton(
            User,
            'User Settings',
            'Personal info, preferences, security',
            '/settings/user'
          )}
          
          <Separator className="bg-border/20 my-1" />
          
          {renderMainButton(
            Settings,
            'Application Settings',
            'Notifications, display, language',
            '/settings/app'
          )}
          
          <Separator className="bg-border/20 my-1" />
          
          {renderMainButton(
            HelpCircle,
            'Help & Support',
            'FAQ, contact support, documentation',
            '/help'
          )}
        </div>

        <Separator className="bg-border/30" />

        {/* Logout Section */}
        <div className="p-2">
          <div
            onClick={() => {
              setIsOpen(false);
              navigate('/landing');
            }}
            className="flex items-center gap-3 px-4 py-3 hover:bg-red-500/10 cursor-pointer transition-all duration-200 group rounded-lg mx-2"
          >
            <div className="w-10 h-10 rounded-lg bg-red-500/20 flex items-center justify-center group-hover:bg-red-500/30 transition-colors duration-200">
              <LogOut className="h-5 w-5 text-red-400 group-hover:text-red-300 transition-colors duration-200" />
            </div>
            <div className="flex-1">
              <p className="text-red-400 font-medium text-sm group-hover:text-red-300 transition-colors duration-200">
                Sign Out
              </p>
              <p className="text-red-400/70 text-xs group-hover:text-red-300/70 transition-colors duration-200">
                Sign out of your account
              </p>
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default UserProfileDropdown;