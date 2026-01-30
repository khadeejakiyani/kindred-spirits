import { Coffee, Bell, Leaf } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const TodaysPlan = () => {
  const { t } = useLanguage();

  const planItems = [
    {
      id: "tea-time",
      icon: Coffee,
      titleKey: "plan.teaTime",
      descKey: "plan.teaTimeDesc",
      bgClass: "bg-soft-peach",
      iconColor: "text-amber-700",
    },
    {
      id: "reminder",
      icon: Bell,
      titleKey: "plan.reminder",
      descKey: "plan.reminderDesc",
      bgClass: "bg-calm-blue",
      iconColor: "text-blue-700",
    },
    {
      id: "calm-moment",
      icon: Leaf,
      titleKey: "plan.calmMoment",
      descKey: "plan.calmMomentDesc",
      bgClass: "bg-sage-light",
      iconColor: "text-sage",
    },
  ];

  return (
    <section aria-labelledby="plan-heading">
      <h2 id="plan-heading" className="text-2xl font-serif mb-6">
        {t("plan.title")}
      </h2>
      
      <div className="space-y-4">
        {planItems.map((item) => (
          <button
            key={item.id}
            className={`w-full activity-card ${item.bgClass} flex items-center gap-5 text-left`}
            aria-label={`${t(item.titleKey)}: ${t(item.descKey)}`}
          >
            <div className={`p-4 rounded-2xl bg-background/50 ${item.iconColor}`}>
              <item.icon size={32} strokeWidth={2} aria-hidden="true" />
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-medium">{t(item.titleKey)}</h3>
              <p className="text-muted-foreground">{t(item.descKey)}</p>
            </div>
          </button>
        ))}
      </div>
    </section>
  );
};

export default TodaysPlan;
