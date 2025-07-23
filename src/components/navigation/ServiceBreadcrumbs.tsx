
import { ChevronRight, Home } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { useService } from '@/contexts/ServiceContext';
import { navigationConfigs } from '@/config/navigationConfig';

const ServiceBreadcrumbs = () => {
  const { currentService } = useService();
  const location = useLocation();
  const config = navigationConfigs[currentService];

  const getBreadcrumbs = () => {
    const path = location.pathname;
    const breadcrumbs = [
      { label: 'Home', href: '/', icon: Home }
    ];

    if (path.includes('landing') || path.includes('flowship-landing') || path.includes('dropgo')) {
      breadcrumbs.push({
        label: config?.serviceName || 'Service',
        href: path,
        icon: null
      });
    }

    if (path.includes('help')) {
      breadcrumbs.push({
        label: 'Help & Support',
        href: '/help',
        icon: null
      });
    }

    return breadcrumbs;
  };

  const breadcrumbs = getBreadcrumbs();

  if (breadcrumbs.length <= 1) {
    return null;
  }

  return (
    <nav className="flex items-center space-x-2 text-sm text-foreground/60 mb-4">
      {breadcrumbs.map((crumb, index) => (
        <div key={crumb.href} className="flex items-center">
          {index > 0 && <ChevronRight className="w-4 h-4 mx-2" />}
          {index === breadcrumbs.length - 1 ? (
            <span className="text-foreground font-medium flex items-center">
              {crumb.icon && <crumb.icon className="w-4 h-4 mr-1" />}
              {crumb.label}
            </span>
          ) : (
            <Link 
              to={crumb.href} 
              className="hover:text-foreground transition-colors flex items-center"
            >
              {crumb.icon && <crumb.icon className="w-4 h-4 mr-1" />}
              {crumb.label}
            </Link>
          )}
        </div>
      ))}
    </nav>
  );
};

export default ServiceBreadcrumbs;
