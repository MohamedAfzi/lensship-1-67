import { Bell } from 'lucide-react';
import UserProfileDropdown from './UserProfileDropdown';
import { useScrollDirection } from '@/hooks/useScrollDirection';

const TopAppBar = () => {
  const { isScrollingDown } = useScrollDirection();
  const userData = {
    name: "MOHAMMED ZAYED",
    storeName: "Zayed Store",
    userId: "773••"
  };

  return (
    <div 
      className={`sticky top-0 z-50 bg-black/20 backdrop-blur-md border-b border-white/20 px-4 py-3 transition-transform duration-300 ease-in-out ${
        isScrollingDown ? '-translate-y-full' : 'translate-y-0'
      }`}
    >
      <div className="flex items-center justify-between">
        {/* Notification Bell & App Name */}
        <div className="flex items-center">
          <Bell className="h-6 w-6 text-white" />
          <span className="ml-4 font-semibold text-lg text-white hover:text-neon-blue transition-colors duration-300">
            LensShip
          </span>
        </div>

        {/* User Profile Section */}
        <div className="flex items-center gap-2">
          {/* User Info Block */}
          <div className="text-right">
            <div className="text-white font-bold text-base leading-tight">
              {userData.name}
            </div>
            <div className="text-white/80 text-sm leading-tight">
              {userData.storeName}
            </div>
          </div>

          {/* Avatar Dropdown */}
          <UserProfileDropdown />
        </div>
      </div>
    </div>
  );
};

export default TopAppBar;