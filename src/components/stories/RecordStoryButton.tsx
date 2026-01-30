import { Mic, Plus } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const RecordStoryButton = () => {
  const { t } = useLanguage();

  return (
    <section className="mb-10">
      <button
        className="w-full p-6 rounded-3xl bg-gradient-to-r from-rose-light to-soft-peach flex items-center gap-5 shadow-gentle hover:shadow-gentle-lg transition-shadow"
        aria-label={t("stories.record")}
      >
        <div className="p-4 rounded-full bg-primary text-primary-foreground">
          <Mic size={32} aria-hidden="true" />
        </div>
        <div className="flex-1 text-left rtl:text-right">
          <h2 className="text-2xl font-serif">{t("stories.record")}</h2>
          <p className="text-muted-foreground">
            {t("stories.recordDesc")}
          </p>
        </div>
        <Plus size={28} className="text-muted-foreground" aria-hidden="true" />
      </button>
    </section>
  );
};

export default RecordStoryButton;
