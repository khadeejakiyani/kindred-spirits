import { createContext, useContext, useState, useEffect, ReactNode } from "react";

type OnboardingStep = "login" | "mood" | "home";

interface OnboardingContextType {
  step: OnboardingStep;
  userName: string;
  selectedMood: string | null;
  setUserName: (name: string) => void;
  setSelectedMood: (mood: string | null) => void;
  completeLogin: () => void;
  completeMoodCheckIn: () => void;
  resetOnboarding: () => void;
  isOnboardingComplete: boolean;
}

const OnboardingContext = createContext<OnboardingContextType | undefined>(undefined);

export const OnboardingProvider = ({ children }: { children: ReactNode }) => {
  const [step, setStep] = useState<OnboardingStep>("login");
  const [userName, setUserName] = useState("");
  const [selectedMood, setSelectedMood] = useState<string | null>(null);

  // Load saved state from localStorage
  useEffect(() => {
    const savedName = localStorage.getItem("companion_userName");
    const savedStep = localStorage.getItem("companion_step") as OnboardingStep;
    const savedMood = localStorage.getItem("companion_todayMood");
    
    if (savedName) setUserName(savedName);
    if (savedStep && ["login", "mood", "home"].includes(savedStep)) {
      setStep(savedStep);
    }
    if (savedMood) setSelectedMood(savedMood);
  }, []);

  const completeLogin = () => {
    localStorage.setItem("companion_userName", userName);
    localStorage.setItem("companion_step", "mood");
    setStep("mood");
  };

  const completeMoodCheckIn = () => {
    if (selectedMood) {
      localStorage.setItem("companion_todayMood", selectedMood);
    }
    localStorage.setItem("companion_step", "home");
    setStep("home");
  };

  const resetOnboarding = () => {
    localStorage.removeItem("companion_userName");
    localStorage.removeItem("companion_step");
    localStorage.removeItem("companion_todayMood");
    setUserName("");
    setSelectedMood(null);
    setStep("login");
  };

  const isOnboardingComplete = step === "home";

  return (
    <OnboardingContext.Provider
      value={{
        step,
        userName,
        selectedMood,
        setUserName,
        setSelectedMood,
        completeLogin,
        completeMoodCheckIn,
        resetOnboarding,
        isOnboardingComplete,
      }}
    >
      {children}
    </OnboardingContext.Provider>
  );
};

export const useOnboarding = () => {
  const context = useContext(OnboardingContext);
  if (!context) {
    throw new Error("useOnboarding must be used within OnboardingProvider");
  }
  return context;
};
