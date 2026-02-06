import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LanguageProvider } from "./contexts/LanguageContext";
import { OnboardingProvider, useOnboarding } from "./contexts/OnboardingContext";
import Layout from "./components/Layout";
import LoginPage from "./pages/LoginPage";
import MoodCheckInPage from "./pages/MoodCheckInPage";
import HomePage from "./pages/HomePage";
import MyCirclePage from "./pages/MyCirclePage";
import ActivitiesPage from "./pages/ActivitiesPage";
import EntertainmentPage from "./pages/EntertainmentPage";
import MyStoriesPage from "./pages/MyStoriesPage";
import HealthPage from "./pages/HealthPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const OnboardingRouter = () => {
  const { step } = useOnboarding();

  // Step-by-step onboarding flow
  if (step === "login") {
    return <LoginPage />;
  }

  if (step === "mood") {
    return <MoodCheckInPage />;
  }

  // User completed onboarding - show main app
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="my-circle" element={<MyCirclePage />} />
        <Route path="activities" element={<ActivitiesPage />} />
        <Route path="entertainment" element={<EntertainmentPage />} />
        <Route path="my-stories" element={<MyStoriesPage />} />
        <Route path="health" element={<HealthPage />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <LanguageProvider>
      <OnboardingProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <OnboardingRouter />
          </BrowserRouter>
        </TooltipProvider>
      </OnboardingProvider>
    </LanguageProvider>
  </QueryClientProvider>
);

export default App;
