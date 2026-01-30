import { Globe } from "lucide-react";
import { useLanguage, Language } from "@/contexts/LanguageContext";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const LanguageSwitcher = () => {
  const { language, setLanguage, t } = useLanguage();

  return (
    <div className="flex items-center gap-3">
      <Globe size={24} className="text-muted-foreground" aria-hidden="true" />
      <Select value={language} onValueChange={(value) => setLanguage(value as Language)}>
        <SelectTrigger 
          className="w-32 h-12 text-lg rounded-2xl border-2 border-border bg-card"
          aria-label={t("language.select")}
        >
          <SelectValue />
        </SelectTrigger>
        <SelectContent className="rounded-2xl">
          <SelectItem value="en" className="text-lg py-3 cursor-pointer">
            {t("language.english")}
          </SelectItem>
          <SelectItem value="ur" className="text-lg py-3 cursor-pointer font-urdu">
            {t("language.urdu")}
          </SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};

export default LanguageSwitcher;
