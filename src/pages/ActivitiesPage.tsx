import ActivityCard from "@/components/activities/ActivityCard";
import DailySuggestion from "@/components/activities/DailySuggestion";
import { BookOpen, Scissors, Puzzle, Brain } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const ActivitiesPage = () => {
  const { t } = useLanguage();

  const activities = [
    {
      id: "listen-story",
      icon: BookOpen,
      titleKey: "activities.stories",
      descKey: "activities.storiesDesc",
      bgClass: "bg-calm-blue",
      iconColor: "text-blue-700",
    },
    {
      id: "crafts",
      icon: Scissors,
      titleKey: "activities.crafts",
      descKey: "activities.craftsDesc",
      bgClass: "bg-rose-light",
      iconColor: "text-rose",
    },
    {
      id: "games",
      icon: Puzzle,
      titleKey: "activities.games",
      descKey: "activities.gamesDesc",
      bgClass: "bg-sage-light",
      iconColor: "text-sage",
    },
    {
      id: "memories",
      icon: Brain,
      titleKey: "activities.memory",
      descKey: "activities.memoryDesc",
      bgClass: "bg-sunny-yellow",
      iconColor: "text-amber-700",
    },
  ];

  return (
    <div className="container max-w-2xl mx-auto px-4 py-8">
      {/* Page header */}
      <header className="mb-8">
        <h1 className="text-3xl font-serif mb-2">{t("activities.title")}</h1>
        <p className="text-lg text-muted-foreground">
          {t("activities.subtitle")}
        </p>
      </header>

      {/* Daily suggestion */}
      <DailySuggestion />

      {/* Activities grid */}
      <section aria-labelledby="activities-heading">
        <h2 id="activities-heading" className="text-2xl font-serif mb-6">
          {t("activities.title")}
        </h2>
        
        <div className="grid gap-4 sm:grid-cols-2">
          {activities.map((activity) => (
            <ActivityCard 
              key={activity.id} 
              activity={{
                ...activity,
                title: t(activity.titleKey),
                description: t(activity.descKey),
              }} 
            />
          ))}
        </div>
      </section>
    </div>
  );
};

export default ActivitiesPage;
