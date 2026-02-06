import TodaysPlan from "@/components/home/TodaysPlan";
import Greeting from "@/components/home/Greeting";
import { useOnboarding } from "@/contexts/OnboardingContext";
import { useLanguage } from "@/contexts/LanguageContext";

const HomePage = () => {
  const { userName, selectedMood } = useOnboarding();
  const { t } = useLanguage();

  const getMoodEmoji = (moodId: string | null) => {
    switch (moodId) {
      case "calm": return "😌";
      case "okay": return "🙂";
      case "low": return "😔";
      case "anxious": return "😟";
      default: return "👋";
    }
  };

  return (
    <div className="container max-w-2xl mx-auto px-4 py-8">
      {/* Personalized greeting */}
      <Greeting userName={userName} />
      
      {/* Mood summary (already checked in during onboarding) */}
      {selectedMood && (
        <div className="mb-8 p-5 bg-card rounded-2xl text-center">
          <p className="text-lg">
            {t("mood.thanks")} {getMoodEmoji(selectedMood)}
          </p>
        </div>
      )}
      
      {/* Today's plan */}
      <TodaysPlan />
    </div>
  );
};

export default HomePage;
