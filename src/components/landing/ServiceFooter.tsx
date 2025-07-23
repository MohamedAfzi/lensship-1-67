
import { Users, Star, Mail, Phone, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useService } from '@/contexts/ServiceContext';
import { navigationConfigs, globalNavigationLinks } from '@/config/navigationConfig';
import { helpConfigs } from '@/config/helpConfig';

const ServiceFooter = () => {
  const { currentService, serviceBrand } = useService();
  const config = navigationConfigs[currentService];
  const helpConfig = helpConfigs[config?.helpContext];

  const getServiceColor = () => {
    switch (currentService) {
      case 'flowship':
        return 'text-neon-green';
      case 'dropgo':
        return 'text-neon-yellow';
      default:
        return 'text-neon-blue';
    }
  };

  const serviceColorClass = getServiceColor();

  return (
    <footer className="py-16 px-6 border-t border-border/20 bg-mobile-surface/50">
      <div className="container mx-auto">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Service Branding */}
          <div className="space-y-4">
            <div className={`text-2xl font-bold ${serviceColorClass}`}>
              {config?.serviceName || 'Service'}
            </div>
            <p className="text-foreground/70">
              {helpConfig?.description || 'Smart solutions for modern business needs.'}
            </p>
            <div className="flex space-x-4">
              <div className={`w-8 h-8 bg-current/20 rounded-full flex items-center justify-center ${serviceColorClass}`}>
                <Users className="w-4 h-4" />
              </div>
              <div className={`w-8 h-8 bg-current/20 rounded-full flex items-center justify-center ${serviceColorClass}`}>
                <Star className="w-4 h-4" />
              </div>
            </div>
          </div>

          {/* Service Links */}
          <div>
            <h4 className={`font-semibold mb-4 ${serviceColorClass}`}>
              {config?.serviceName} Features
            </h4>
            <ul className="space-y-2 text-foreground/70">
              {config?.serviceLinks.map((link) => (
                <li key={link.href}>
                  <a 
                    href={link.href} 
                    className={`hover:${serviceColorClass.replace('text-', 'text-')} transition-colors`}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h4 className={`font-semibold mb-4 ${serviceColorClass}`}>Company</h4>
            <ul className="space-y-2 text-foreground/70">
              {globalNavigationLinks.company.map((link) => (
                <li key={link.href}>
                  <Link 
                    to={link.href} 
                    className={`hover:${serviceColorClass.replace('text-', 'text-')} transition-colors`}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support & Legal */}
          <div>
            <h4 className={`font-semibold mb-4 ${serviceColorClass}`}>Support & Legal</h4>
            <ul className="space-y-2 text-foreground/70">
              <li>
                <Link 
                  to={`/help?service=${currentService}`}
                  className={`hover:${serviceColorClass.replace('text-', 'text-')} transition-colors`}
                >
                  Help & Support
                </Link>
              </li>
              {globalNavigationLinks.legal.map((link) => (
                <li key={link.href}>
                  <Link 
                    to={link.href} 
                    className={`hover:${serviceColorClass.replace('text-', 'text-')} transition-colors`}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
            
            {/* Contact Info */}
            {helpConfig && (
              <div className="mt-4 pt-4 border-t border-border/10">
                <div className="space-y-2 text-sm">
                  {helpConfig.supportChannels.slice(0, 2).map((channel) => (
                    <div key={channel.type} className="flex items-center text-foreground/60">
                      {channel.type === 'email' && <Mail className="w-3 h-3 mr-2" />}
                      {channel.type === 'phone' && <Phone className="w-3 h-3 mr-2" />}
                      <span>{channel.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
        
        <div className="border-t border-border/20 mt-12 pt-8 text-center text-foreground/60">
          <p>&copy; 2024 {config?.serviceName}. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default ServiceFooter;
