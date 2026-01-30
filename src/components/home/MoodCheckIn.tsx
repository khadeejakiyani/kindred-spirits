import { useLanguage } from "@/contexts/LanguageContext";

interface MoodCheckInProps {
  selectedMood: string | null;
  onMoodSelect: (mood: string) => void;
}

const MoodCheckIn = ({ selectedMood, onMoodSelect }: MoodCheckInProps) => {
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
    <section className="mb-10" aria-labelledby="mood-heading">
      <h2 id="mood-heading" className="text-2xl font-serif mb-6 text-center">
        {t("mood.question")}
      </h2>
      
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        {moods.map((mood) => (
          <button
            key={mood.id}
            onClick={() => onMoodSelect(mood.id)}
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

      {selectedMood && (
        <div 
          className="mt-6 p-5 bg-card rounded-2xl text-center"
          role="status"
          aria-live="polite"
        >
          <p className="text-lg">
            {t("mood.thanks")} {getResponse(selectedMood)}
          </p>
        </div>
      )}
    </section>
  );
};

export default MoodCheckIn;
