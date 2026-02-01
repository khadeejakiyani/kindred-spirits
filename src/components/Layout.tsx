import { Outlet } from "react-router-dom";
import Navigation from "./Navigation";
import LanguageSwitcher from "./LanguageSwitcher";
import HelpButton from "./help/HelpButton";
import { useLanguage } from "@/contexts/LanguageContext";

const Layout = () => {
  const { isRTL } = useLanguage();

  return (
    <div className={`min-h-screen flex flex-col bg-background ${isRTL ? 'font-urdu' : ''}`}>
      {/* Language switcher header */}
      <header className="container max-w-2xl mx-auto px-4 py-4 flex justify-end">
        <LanguageSwitcher />
      </header>
      
      {/* Main content area */}
      <main className="flex-1 pb-32">
        <Outlet />
      </main>
      
      {/* Help button */}
      <HelpButton />
      
      {/* Fixed bottom navigation */}
      <Navigation />
    </div>
  );
};

export default Layout;
