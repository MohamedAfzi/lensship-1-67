import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { UserProvider } from '@/contexts/UserContext';
import { SharedFABBackdrop } from './components/SharedFABBackdrop';
import Index from "./pages/Index";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";
import NotFound from "./pages/NotFound";
import AccountSetupPersonal from "./pages/AccountSetupPersonal";
import AccountSetupStore from "./pages/AccountSetupStore";
import AccountSetupPreferences from "./pages/AccountSetupPreferences";
import AccountSetupComplete from "./pages/AccountSetupComplete";
import ProductListings from "./pages/ProductListings";
import CameraScan from "./pages/CameraScan";
import GalleryUpload from "./pages/GalleryUpload";
import NewListing from "./pages/NewListing";
import ProductDetails from "./pages/ProductDetails";
import Stores from "./pages/Stores";
import OrderDeliveries from "./pages/OrderDeliveries";
import InventoryValueSummary from "./pages/InventoryValueSummary";
import ProfitProjection from "./pages/ProfitProjection";
import Subscription from "./pages/Subscription";
import UserSettings from "./pages/UserSettings";
import ApplicationSettings from "./pages/ApplicationSettings";
import NewDelivery from "./pages/NewDelivery";
import Landing from "./pages/Landing";

import DropGoLanding from "./pages/DropGoLanding";
import FlowShipLanding from "./pages/FlowShipLanding";
import Products from "./pages/Products";
import MallSellers from "./pages/MallSellers";
import WiFiScanner from "./pages/WiFiScanner";
import BluetoothScanner from "./pages/BluetoothScanner";
import TopTrendingProducts from "./pages/TopTrendingProducts";
import HelpSupport from "./pages/HelpSupport";
import DeliveryAgentSettings from "./pages/DeliveryAgentSettings";

const queryClient = new QueryClient();

const App = () => {

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <UserProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <div className="transition-opacity duration-300">
            <SharedFABBackdrop />
            <Routes>
              <Route path="/landing" element={<Landing />} />
              <Route path="/dropgo" element={<DropGoLanding />} />
              <Route path="/flowship-landing" element={<FlowShipLanding />} />
              <Route path="/" element={<Index />} />
              <Route path="/listings" element={<ProductListings />} />
              <Route path="/camera-scan" element={<CameraScan />} />
              <Route path="/wifi-scanner" element={<WiFiScanner />} />
              <Route path="/bluetooth-scanner" element={<BluetoothScanner />} />
              <Route path="/gallery-upload" element={<GalleryUpload />} />
              <Route path="/new-listing" element={<NewListing />} />
              <Route path="/edit-listing/:id" element={<NewListing />} />
              <Route path="/product/:id" element={<ProductDetails />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route path="/account-setup/personal" element={<AccountSetupPersonal />} />
              <Route path="/account-setup/store" element={<AccountSetupStore />} />
              <Route path="/account-setup/preferences" element={<AccountSetupPreferences />} />
              <Route path="/account-setup/complete" element={<AccountSetupComplete />} />
              <Route path="/stores" element={<Stores />} />
              <Route path="/orders/deliveries" element={<OrderDeliveries />} />
              <Route path="/orders/new" element={<NewDelivery />} />
              
              <Route path="/products/:entityId" element={<Products />} />
              <Route path="/mall/:mallId/sellers" element={<MallSellers />} />
              <Route path="/inventory/value-summary" element={<InventoryValueSummary />} />
              <Route path="/profit-projection" element={<ProfitProjection />} />
              <Route path="/subscription" element={<Subscription />} />
              <Route path="/settings/user" element={<UserSettings />} />
              <Route path="/settings/app" element={<ApplicationSettings />} />
              <Route path="/settings/delivery-agent" element={<DeliveryAgentSettings />} />
              <Route path="/help" element={<HelpSupport />} />
              <Route path="/top-trending-products" element={<TopTrendingProducts />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
        </BrowserRouter>
        </UserProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
