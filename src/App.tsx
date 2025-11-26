import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import About from "./pages/About";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import Insights from "./pages/Insights";
import Market from "./pages/Market";
import MarketAll from "./pages/MarketAll";
import Dashboard from "./pages/Dashboard";
import AccountSettings from "./pages/AccountSettings";
import Careers from "./pages/Careers";
import CareerApplication from "./pages/CareerApplication";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/about" element={<About />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:slug" element={<BlogPost />} />
          <Route path="/insights" element={<Insights />} />
          <Route path="/market/all" element={<MarketAll />} />
          <Route path="/market/:coin" element={<Market />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/account" element={<AccountSettings />} />
          <Route path="/careers" element={<Careers />} />
          <Route path="/careers/apply/:jobId" element={<CareerApplication />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
