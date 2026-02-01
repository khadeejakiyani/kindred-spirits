import { NavLink, useLocation } from "react-router-dom";
import { Home, Users, Sparkles, BookOpen, Heart } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const Navigation = () => {
  const location = useLocation();
  const { t } = useLanguage();

  const navItems = [
    { path: "/", labelKey: "nav.home", icon: Home },
    { path: "/my-circle", labelKey: "nav.myCircle", icon: Users },
    { path: "/activities", labelKey: "nav.activities", icon: Sparkles },
    { path: "/my-stories", labelKey: "nav.myStories", icon: BookOpen },
    { path: "/health", labelKey: "nav.health", icon: Heart },
  ];

  const isActive = (path: string) => {
    if (path === "/") return location.pathname === "/";
    return location.pathname.startsWith(path);
  };

  return (
    <nav 
      className="fixed bottom-0 left-0 right-0 bg-card border-t-2 border-border shadow-gentle-lg z-50"
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="container max-w-2xl mx-auto">
        <ul className="flex justify-around items-center py-2">
          {navItems.map(({ path, labelKey, icon: Icon }) => (
            <li key={path}>
              <NavLink
                to={path}
                className={`nav-item ${isActive(path) ? 'active' : ''}`}
                aria-current={isActive(path) ? 'page' : undefined}
              >
                <Icon 
                  size={28} 
                  strokeWidth={2}
                  className="mb-1"
                  aria-hidden="true"
                />
                <span className="text-sm font-medium">{t(labelKey)}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default Navigation;
