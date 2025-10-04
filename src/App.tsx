import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { PrivyProvider } from "@privy-io/react-auth";
import { WagmiProvider } from "@privy-io/wagmi";
import { privyConfig } from "./config/privy";
import Home from "./pages/Home";
import Messages from "./pages/Messages";
import Discover from "./pages/Discover";
import Holdings from "./pages/Holdings";
import Notifications from "./pages/Notifications";
import Profile from "./pages/Profile";
import CreatorProfile from "./pages/CreatorProfile";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <PrivyProvider
    appId="cm63pmwh805m2p8kzilhj5yel"
    config={privyConfig}
  >
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/messages" element={<Messages />} />
            <Route path="/discover" element={<Discover />} />
            <Route path="/holdings" element={<Holdings />} />
            <Route path="/notifications" element={<Notifications />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/creator/:id" element={<CreatorProfile />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </PrivyProvider>
);

export default App;
