
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import Chat from "./pages/Chat";
import DemandForecasting from "./pages/DemandForecasting";
import DataAnalysis from "./pages/DataAnalysis";
import LatestInformation from "./pages/LatestInformation";
import ComingSoon from "./pages/ComingSoon";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/chat" element={<Chat />} />
          <Route path="/demand-forecasting" element={<DemandForecasting />} />
          <Route path="/data-analysis" element={<DataAnalysis />} />
          <Route path="/latest-information" element={<LatestInformation />} />
          <Route path="/spoilage-protection" element={<ComingSoon />} />
          <Route path="/eta-prediction" element={<ComingSoon />} />
          <Route path="/anomaly-detection" element={<ComingSoon />} />
          <Route path="/smart-warehouse-management" element={<ComingSoon />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
