import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useOnboarding } from "@/contexts/OnboardingContext";
import { useLanguage } from "@/contexts/LanguageContext";
import LanguageSwitcher from "@/components/LanguageSwitcher";

const LoginPage = () => {
  const { userName, setUserName, completeLogin } = useOnboarding();
  const { t } = useLanguage();
  const [inputValue, setInputValue] = useState(userName);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim()) {
      setUserName(inputValue.trim());
      setTimeout(() => completeLogin(), 100);
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Language switcher at top */}
      <header className="container max-w-2xl mx-auto px-4 py-4 flex justify-end">
        <LanguageSwitcher />
      </header>

      {/* Main content centered */}
      <main className="flex-1 flex items-center justify-center px-4">
        <div className="w-full max-w-md text-center">
          {/* Welcome illustration/emoji */}
          <div className="mb-8">
            <span className="text-8xl" role="img" aria-label="Welcome">
              🌸
            </span>
          </div>

          {/* Welcome text */}
          <h1 className="text-3xl font-serif mb-4">
            {t("login.welcome")}
          </h1>
          <p className="text-lg text-muted-foreground mb-8">
            {t("login.subtitle")}
          </p>

          {/* Name input form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-xl mb-3">
                {t("login.nameLabel")}
              </label>
              <Input
                id="name"
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder={t("login.namePlaceholder")}
                className="text-xl h-16 text-center rounded-2xl"
                autoFocus
                autoComplete="name"
              />
            </div>

            <Button
              type="submit"
              size="lg"
              className="w-full h-16 text-xl rounded-2xl"
              disabled={!inputValue.trim()}
            >
              {t("login.continue")} →
            </Button>
          </form>
        </div>
      </main>
    </div>
  );
};

export default LoginPage;
