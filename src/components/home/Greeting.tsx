import { Sun, Cloud, Moon, Sunrise } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

interface GreetingProps {
  userName?: string;
}

const Greeting = ({ userName }: GreetingProps) => {
  const { t } = useLanguage();

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return { textKey: "greeting.morning", icon: Sunrise, emoji: "🌅" };
    if (hour < 17) return { textKey: "greeting.afternoon", icon: Sun, emoji: "☀️" };
    if (hour < 21) return { textKey: "greeting.evening", icon: Cloud, emoji: "🌤️" };
    return { textKey: "greeting.night", icon: Moon, emoji: "🌙" };
  };

  const greeting = getGreeting();

  return (
    <section className="greeting-card mb-8" aria-label="Daily greeting">
      <div className="flex items-center gap-4 mb-4">
        <span className="text-4xl" role="img" aria-hidden="true">
          {greeting.emoji}
        </span>
        <div>
          <h1 className="text-3xl font-serif">
            {t(greeting.textKey)}{userName ? `, ${userName}` : ""}
          </h1>
          <p className="text-lg text-muted-foreground mt-1">
            {t("greeting.subtitle")}
          </p>
        </div>
      </div>
    </section>
  );
};

export default Greeting;
