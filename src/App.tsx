import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LanguageProvider } from "./contexts/LanguageContext";
import Layout from "./components/Layout";
import HomePage from "./pages/HomePage";
import MyCirclePage from "./pages/MyCirclePage";
import ActivitiesPage from "./pages/ActivitiesPage";
import MyStoriesPage from "./pages/MyStoriesPage";
import HealthPage from "./pages/HealthPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <LanguageProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<HomePage />} />
              <Route path="my-circle" element={<MyCirclePage />} />
              <Route path="activities" element={<ActivitiesPage />} />
              <Route path="my-stories" element={<MyStoriesPage />} />
              <Route path="health" element={<HealthPage />} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </LanguageProvider>
  </QueryClientProvider>
);

export default App;
