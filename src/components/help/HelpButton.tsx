import { useState } from "react";
import { HelpCircle, X, Volume2, VolumeX, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useLanguage } from "@/contexts/LanguageContext";
import { useLocation } from "react-router-dom";

const HelpButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const { t, language } = useLanguage();
  const location = useLocation();

  const getPageKey = () => {
    const path = location.pathname;
    if (path === "/") return "home";
    if (path === "/my-circle") return "circle";
    if (path === "/activities") return "activities";
    if (path === "/my-stories") return "stories";
    if (path === "/health") return "health";
    return "home";
  };

  const pageKey = getPageKey();

  const speakText = (text: string) => {
    if ('speechSynthesis' in window) {
      // Stop any ongoing speech
      window.speechSynthesis.cancel();
      
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.85; // Slightly slower for elderly users
      utterance.pitch = 1;
      utterance.volume = 1;
      
      // Try to use appropriate language voice
      const voices = window.speechSynthesis.getVoices();
      if (language === "ur") {
        const urduVoice = voices.find(v => v.lang.includes("ur") || v.lang.includes("hi"));
        if (urduVoice) utterance.voice = urduVoice;
      } else {
        const englishVoice = voices.find(v => v.lang.includes("en"));
        if (englishVoice) utterance.voice = englishVoice;
      }

      utterance.onstart = () => setIsSpeaking(true);
      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = () => setIsSpeaking(false);

      window.speechSynthesis.speak(utterance);
    }
  };

  const stopSpeaking = () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    }
  };

  const handlePlayInstructions = () => {
    const instructions = t(`help.${pageKey}.audio`);
    speakText(instructions);
  };

  const handleClose = () => {
    stopSpeaking();
    setIsOpen(false);
  };

  return (
    <>
      {/* Floating Help Button */}
      <Button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-28 right-4 z-40 w-16 h-16 rounded-full bg-primary hover:bg-primary/90 shadow-gentle-lg"
        aria-label={t("help.button")}
      >
        <HelpCircle size={32} />
      </Button>

      {/* Help Panel Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-50 bg-black/30 flex items-end justify-center p-4"
          onClick={handleClose}
        >
          <Card 
            className="w-full max-w-lg rounded-t-3xl rounded-b-2xl shadow-gentle-lg animate-in slide-in-from-bottom duration-300"
            onClick={(e) => e.stopPropagation()}
          >
            <CardContent className="p-6">
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <HelpCircle size={32} className="text-primary" />
                  <h2 className="text-2xl font-semibold">{t("help.title")}</h2>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handleClose}
                  className="rounded-full"
                >
                  <X size={28} />
                </Button>
              </div>

              {/* Page Title */}
              <div className="bg-sage-light rounded-2xl p-4 mb-6">
                <p className="text-lg font-medium text-center">
                  {t(`help.${pageKey}.title`)}
                </p>
              </div>

              {/* Audio Play Button */}
              <Button
                onClick={isSpeaking ? stopSpeaking : handlePlayInstructions}
                className={`w-full py-8 text-xl rounded-2xl mb-6 ${
                  isSpeaking 
                    ? "bg-destructive hover:bg-destructive/90" 
                    : "bg-primary hover:bg-primary/90"
                }`}
              >
                {isSpeaking ? (
                  <>
                    <VolumeX size={32} className="mr-3" />
                    {t("help.stop")}
                  </>
                ) : (
                  <>
                    <Volume2 size={32} className="mr-3" />
                    {t("help.listen")}
                  </>
                )}
              </Button>

              {/* Written Instructions */}
              <div className="space-y-4">
                <h3 className="text-lg font-medium">{t("help.instructions")}</h3>
                <div className="bg-muted/50 rounded-2xl p-5">
                  <ul className="space-y-3 text-lg">
                    {t(`help.${pageKey}.steps`).split("|").map((step, index) => (
                      <li key={index} className="flex gap-3">
                        <span className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary font-semibold shrink-0">
                          {index + 1}
                        </span>
                        <span>{step.trim()}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Navigation help */}
              <div className="mt-6 p-4 bg-soft-peach rounded-2xl">
                <p className="text-center text-muted-foreground">
                  {t("help.navigation")}
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </>
  );
};

export default HelpButton;
