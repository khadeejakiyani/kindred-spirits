import { Coffee, Users } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const TeaTimeButton = () => {
  const { t } = useLanguage();

  return (
    <section className="mb-10">
      <button
        className="w-full p-6 rounded-3xl bg-gradient-to-r from-soft-peach to-rose-light flex items-center gap-5 shadow-gentle hover:shadow-gentle-lg transition-shadow"
        aria-label={t("circle.teaTimeDesc")}
      >
        <div className="p-4 rounded-2xl bg-background/60">
          <Coffee size={36} className="text-amber-700" aria-hidden="true" />
        </div>
        <div className="flex-1 text-left rtl:text-right">
          <h2 className="text-2xl font-serif">{t("circle.teaTime")}</h2>
          <p className="text-muted-foreground flex items-center gap-2">
            <Users size={18} aria-hidden="true" />
            <span>{t("circle.teaTimeDesc")}</span>
          </p>
        </div>
        <div className="text-lg font-medium text-muted-foreground">
          3:00 PM
        </div>
      </button>
    </section>
  );
};

export default TeaTimeButton;
