
import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';
import BackButton from '@/components/navigation/BackButton';
import ServiceBreadcrumbs from '@/components/navigation/ServiceBreadcrumbs';
import FAQSection from '@/components/help/FAQSection';
import ContactSupportSection from '@/components/help/ContactSupportSection';
import SubmitTicketSection from '@/components/help/SubmitTicketSection';
import SystemStatusSection from '@/components/help/SystemStatusSection';
import ResourcesSection from '@/components/help/ResourcesSection';
import { useService } from '@/contexts/ServiceContext';
import { helpConfigs } from '@/config/helpConfig';
import { navigationConfigs } from '@/config/navigationConfig';
import { 
  HelpCircle, 
  MessageCircle, 
  Ticket, 
  Activity, 
  BookOpen,
  Search,
  LifeBuoy
} from 'lucide-react';

const HelpSupport = () => {
  const [activeTab, setActiveTab] = useState('faq');
  const [searchParams] = useSearchParams();
  const { currentService, setCurrentService } = useService();

  // Set service context from URL parameter
  useEffect(() => {
    const serviceParam = searchParams.get('service');
    if (serviceParam && ['lensship', 'flowship', 'dropgo'].includes(serviceParam)) {
      setCurrentService(serviceParam as any);
    }
  }, [searchParams, setCurrentService]);

  const config = navigationConfigs[currentService];
  const helpConfig = helpConfigs[config?.helpContext];

  const tabs = [
    {
      id: 'faq',
      label: 'FAQ',
      icon: HelpCircle,
      title: 'Frequently Asked Questions',
      description: 'Find quick answers to common questions'
    },
    {
      id: 'contact',
      label: 'Contact',
      icon: MessageCircle,
      title: 'Contact Support',
      description: 'Get in touch with our support team'
    },
    {
      id: 'ticket',
      label: 'Tickets',
      icon: Ticket,
      title: 'Submit Ticket',
      description: 'Create a support ticket for complex issues'
    },
    {
      id: 'status',
      label: 'Status',
      icon: Activity,
      title: 'System Status',
      description: 'Check the current status of our services'
    },
    {
      id: 'resources',
      label: 'Resources',
      icon: BookOpen,
      title: 'Help Resources',
      description: 'Guides, tutorials, and documentation'
    }
  ];

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
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-to-br from-card to-card/50 border-b border-border/50">
        <div className="container mx-auto max-w-7xl px-4 py-6">
          <BackButton />
          <ServiceBreadcrumbs />
          <div className="mt-4 text-center">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className={`w-12 h-12 rounded-xl bg-current/20 flex items-center justify-center ${serviceColorClass}`}>
                <LifeBuoy className="h-6 w-6" />
              </div>
              <h1 className="text-3xl md:text-4xl font-bold text-foreground">
                {helpConfig?.title || 'Help & Support'}
              </h1>
            </div>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {helpConfig?.description || 'Get the help you need to make the most of our platform.'}
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto max-w-7xl px-4 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          {/* Tab Navigation */}
          <div className="mb-8">
            <TabsList className="grid w-full grid-cols-5 bg-card/50 border border-border/50 rounded-xl p-1">
              {tabs.map((tab) => {
                const IconComponent = tab.icon;
                return (
                  <TabsTrigger
                    key={tab.id}
                    value={tab.id}
                    id={`${tab.id}-tab`}
                    className={`flex flex-col sm:flex-row items-center gap-2 py-3 px-2 text-xs sm:text-sm rounded-lg data-[state=active]:bg-current data-[state=active]:text-background transition-all duration-200 ${serviceColorClass.replace('text-', 'data-[state=active]:bg-')}`}
                  >
                    <IconComponent className="h-4 w-4 flex-shrink-0" />
                    <span className="hidden sm:inline">{tab.label}</span>
                  </TabsTrigger>
                );
              })}
            </TabsList>

            {/* Tab Description */}
            <div className="mt-4 text-center">
              {tabs.map((tab) => (
                activeTab === tab.id && (
                  <div key={tab.id} className="animate-fade-in">
                    <h2 className="text-xl font-semibold text-foreground mb-1">
                      {tab.title}
                    </h2>
                    <p className="text-muted-foreground">
                      {tab.description}
                    </p>
                  </div>
                )
              ))}
            </div>
          </div>

          {/* Service-specific Quick Links */}
          {helpConfig && (
            <div className="mb-8">
              <Card className="border-border/50">
                <CardContent className="p-6">
                  <h3 className={`text-lg font-semibold mb-4 ${serviceColorClass}`}>
                    Quick Links for {config?.serviceName}
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {helpConfig.quickLinks.map((link, index) => (
                      <a
                        key={index}
                        href={link.href}
                        className="flex items-center p-3 rounded-lg border border-border/30 hover:border-border/60 transition-colors"
                      >
                        <span className="text-2xl mr-3">{link.icon}</span>
                        <span className="text-sm font-medium">{link.label}</span>
                      </a>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Tab Content */}
          <div className="space-y-8">
            <TabsContent value="faq" className="m-0">
              <FAQSection />
            </TabsContent>

            <TabsContent value="contact" className="m-0">
              <ContactSupportSection />
            </TabsContent>

            <TabsContent value="ticket" className="m-0">
              <SubmitTicketSection />
            </TabsContent>

            <TabsContent value="status" className="m-0">
              <SystemStatusSection />
            </TabsContent>

            <TabsContent value="resources" className="m-0">
              <ResourcesSection />
            </TabsContent>
          </div>
        </Tabs>
      </div>

      {/* Service-specific Footer */}
      <div className="border-t border-border/50 bg-card/30 mt-16">
        <div className="container mx-auto max-w-7xl px-4 py-8">
          <div className="text-center text-sm text-muted-foreground">
            <p className="mb-2">
              Still need help? Our {config?.serviceName} support team is available 24/7 to assist you.
            </p>
            {helpConfig && (
              <p>
                Email: <a href={`mailto:${helpConfig.supportChannels[0]?.value}`} className={`hover:underline ${serviceColorClass}`}>{helpConfig.supportChannels[0]?.value}</a>
                {helpConfig.supportChannels[1] && (
                  <>
                    {' • '}
                    Phone: <a href={`tel:${helpConfig.supportChannels[1]?.value.replace(/\s/g, '')}`} className={`hover:underline ${serviceColorClass}`}>{helpConfig.supportChannels[1]?.value}</a>
                  </>
                )}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HelpSupport;
