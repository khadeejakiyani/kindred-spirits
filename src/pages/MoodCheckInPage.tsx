import { Button } from "@/components/ui/button";
import { useOnboarding } from "@/contexts/OnboardingContext";
import { useLanguage } from "@/contexts/LanguageContext";
import LanguageSwitcher from "@/components/LanguageSwitcher";

const MoodCheckInPage = () => {
  const { userName, selectedMood, setSelectedMood, completeMoodCheckIn } = useOnboarding();
  const { t } = useLanguage();

  const moods = [
    { id: "calm", emoji: "😌", labelKey: "mood.calm", bgClass: "bg-sage-light", borderClass: "border-sage" },
    { id: "okay", emoji: "🙂", labelKey: "mood.okay", bgClass: "bg-sunny-yellow", borderClass: "border-amber-300" },
    { id: "low", emoji: "😔", labelKey: "mood.low", bgClass: "bg-calm-blue", borderClass: "border-blue-300" },
    { id: "anxious", emoji: "😟", labelKey: "mood.anxious", bgClass: "bg-rose-light", borderClass: "border-rose" },
  ];

  const getResponse = (moodId: string) => {
    switch (moodId) {
      case "calm": return t("mood.calmResponse") + " 💚";
      case "okay": return t("mood.okayResponse") + " 🌸";
      case "low": return t("mood.lowResponse") + " 💙";
      case "anxious": return t("mood.anxiousResponse") + " 🌿";
      default: return "";
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Language switcher at top */}
      <header className="container max-w-2xl mx-auto px-4 py-4 flex justify-end">
        <LanguageSwitcher />
      </header>

      {/* Main content */}
      <main className="flex-1 container max-w-2xl mx-auto px-4 py-8">
        {/* Personalized greeting */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-serif mb-2">
            {t("mood.greeting")}, {userName}! 👋
          </h1>
          <p className="text-lg text-muted-foreground">
            {t("mood.subtitle")}
          </p>
        </div>

        {/* Mood question */}
        <h2 className="text-2xl font-serif mb-6 text-center">
          {t("mood.question")}
        </h2>

        {/* Mood buttons grid */}
        <div className="grid grid-cols-2 gap-4 mb-8">
          {moods.map((mood) => (
            <button
              key={mood.id}
              onClick={() => setSelectedMood(mood.id)}
              className={`mood-button ${mood.bgClass} border-2 ${
                selectedMood === mood.id 
                  ? `${mood.borderClass} ring-4 ring-primary/30` 
                  : 'border-transparent'
              }`}
              aria-pressed={selectedMood === mood.id}
              aria-label={t(mood.labelKey)}
            >
              <span className="text-5xl mb-3" role="img" aria-hidden="true">
                {mood.emoji}
              </span>
              <span className="text-lg font-medium">{t(mood.labelKey)}</span>
            </button>
          ))}
        </div>

        {/* Response message */}
        {selectedMood && (
          <div 
            className="p-5 bg-card rounded-2xl text-center mb-8"
            role="status"
            aria-live="polite"
          >
            <p className="text-lg">
              {t("mood.thanks")} {getResponse(selectedMood)}
            </p>
          </div>
        )}

        {/* Continue button */}
        <Button
          onClick={completeMoodCheckIn}
          size="lg"
          className="w-full h-16 text-xl rounded-2xl"
          disabled={!selectedMood}
        >
          {t("mood.continue")} →
        </Button>
      </main>
    </div>
  );
};

export default MoodCheckInPage;
