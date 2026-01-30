import { Sparkles } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const DailySuggestion = () => {
  const { t } = useLanguage();

  const suggestionKeys = [
    "suggestion.1",
    "suggestion.2",
    "suggestion.3",
    "suggestion.4",
    "suggestion.5",
  ];

  // Get a consistent suggestion for today
  const todayIndex = new Date().getDate() % suggestionKeys.length;
  const todaySuggestion = t(suggestionKeys[todayIndex]);

  return (
    <section className="mb-10" aria-labelledby="suggestion-heading">
      <div className="p-6 rounded-3xl bg-gradient-to-r from-sage-light to-calm-blue">
        <div className="flex items-start gap-4">
          <div className="p-3 rounded-2xl bg-background/50">
            <Sparkles size={28} className="text-sage" aria-hidden="true" />
          </div>
          <div>
            <h2 id="suggestion-heading" className="text-lg font-medium text-muted-foreground mb-1">
              {t("activities.suggestion")}
            </h2>
            <p className="text-xl font-serif">{todaySuggestion}</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DailySuggestion;
