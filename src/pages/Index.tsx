import { useNavigate } from 'react-router-dom';
import { BottomNavigation } from '@/components/navigation/BottomNavigation';
import { RadialFABMenu } from '@/components/navigation/RadialFABMenu';
import TopAppBar from '@/components/navigation/TopAppBar';
import DashboardCards from '@/components/dashboard/DashboardCards';


import PersonalizedDashboard from '@/components/dashboard/PersonalizedDashboard';
import EnhancedAnalytics from '@/components/dashboard/EnhancedAnalytics';
import TrendingProductsCard from '@/components/dashboard/TrendingProductsCard';
import { POSQRButton } from '@/components/POSQRButton';

const Index = () => {

  return (
    <div className="min-h-screen bg-background pb-20">
      <TopAppBar />
      <div className="container mx-auto px-4 py-8 pt-4 space-y-8">
        {/* Personalized Dashboard */}
        <PersonalizedDashboard />
        
        {/* Dashboard Cards */}
        <DashboardCards />
        
        {/* Enhanced Analytics */}
        <EnhancedAnalytics />
        
        {/* Top Trending Products Card */}
        <TrendingProductsCard />
      </div>

      <BottomNavigation />
      <RadialFABMenu />
      <POSQRButton />
    </div>
  );
};

export default Index;
