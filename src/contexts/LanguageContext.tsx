import React, { createContext, useContext, useState, useEffect } from "react";

export type Language = "en" | "ur";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
  isRTL: boolean;
}

const translations: Record<Language, Record<string, string>> = {
  en: {
    // Navigation
    "nav.home": "Home",
    "nav.myCircle": "My Circle",
    "nav.activities": "Activities",
    "nav.myStories": "My Stories",
    "nav.health": "Health",
    
    // Greetings
    "greeting.morning": "Good Morning",
    "greeting.afternoon": "Good Afternoon",
    "greeting.evening": "Good Evening",
    "greeting.night": "Good Night",
    "greeting.subtitle": "It's lovely to see you today",
    
    // Mood Check-in
    "mood.question": "How are you feeling today?",
    "mood.calm": "Calm",
    "mood.okay": "Okay",
    "mood.low": "Low",
    "mood.anxious": "Anxious",
    "mood.thanks": "Thank you for sharing.",
    "mood.calmResponse": "How wonderful!",
    "mood.okayResponse": "That's perfectly fine.",
    "mood.lowResponse": "I'm here with you.",
    "mood.anxiousResponse": "Take a deep breath.",
    
    // Today's Plan
    "plan.title": "Today's Plan",
    "plan.teaTime": "Tea Time",
    "plan.teaTimeDesc": "Join your circle at 3:00 PM",
    "plan.reminder": "Reminder",
    "plan.reminderDesc": "Take your afternoon walk",
    "plan.calmMoment": "Calm Moment",
    "plan.calmMomentDesc": "5 minutes of gentle breathing",
    
    // My Circle
    "circle.title": "My Circle",
    "circle.subtitle": "Your trusted friends and family",
    "circle.yourPeople": "Your People",
    "circle.teaTime": "Tea Time",
    "circle.teaTimeDesc": "Join your circle for a chat",
    "circle.available": "Available",
    "circle.resting": "Resting",
    "circle.sendVoice": "Send Voice Message",
    "circle.listen": "Listen",
    
    // Activities
    "activities.title": "Activities",
    "activities.subtitle": "Gentle ways to spend your time",
    "activities.suggestion": "Today's Gentle Suggestion",
    "activities.stories": "Listen to Stories",
    "activities.storiesDesc": "Calming tales and memories",
    "activities.crafts": "Knitting & Crafts",
    "activities.craftsDesc": "Simple creative projects",
    "activities.games": "Gentle Brain Games",
    "activities.gamesDesc": "Fun puzzles, no pressure",
    "activities.memory": "Memory Prompts",
    "activities.memoryDesc": "Remember happy times",
    
    // My Stories
    "stories.title": "My Stories",
    "stories.subtitle": "Your memories and wisdom",
    "stories.record": "Record a New Story",
    "stories.recordDesc": "Share a memory, recipe, or piece of advice",
    "stories.yourStories": "Your Recorded Stories",
    "stories.listened": "Someone listened",
    
    // Health
    "health.title": "My Health",
    "health.subtitle": "Keep track of your wellbeing",
    "health.bloodPressure": "Blood Pressure",
    "health.records": "Records",
    "health.bp.addReading": "Add New Reading",
    "health.bp.newReading": "New Blood Pressure Reading",
    "health.bp.systolic": "Systolic",
    "health.bp.diastolic": "Diastolic",
    "health.bp.top": "Top number",
    "health.bp.bottom": "Bottom number",
    "health.bp.pulse": "Pulse",
    "health.bp.optional": "optional",
    "health.bp.notes": "Notes",
    "health.bp.notesPlaceholder": "e.g., After breakfast",
    "health.bp.history": "Your Readings",
    "health.bp.noReadings": "No readings yet. Add your first one!",
    "health.bp.normal": "Normal",
    "health.bp.elevated": "Elevated",
    "health.bp.high": "High",
    "health.cancel": "Cancel",
    "health.save": "Save",
    "health.medications": "My Medications",
    "health.addMedication": "Add Medication",
    "health.noMedications": "No medications added yet",
    "health.med.name": "Medicine Name",
    "health.med.namePlaceholder": "e.g., Aspirin",
    "health.med.dosage": "Dosage",
    "health.med.frequency": "How Often",
    "health.med.frequencyPlaceholder": "e.g., Twice daily",
    "health.med.time": "Time to Take",
    "health.appointments": "Appointments",
    "health.addAppointment": "Add Appointment",
    "health.noAppointments": "No upcoming appointments",
    "health.appt.doctor": "Doctor Name",
    "health.appt.doctorPlaceholder": "e.g., Dr. Smith",
    "health.appt.purpose": "Purpose",
    "health.appt.purposePlaceholder": "e.g., Regular checkup",
    "health.appt.date": "Date",
    "health.appt.time": "Time",
    "health.appt.location": "Location",
    "health.appt.locationPlaceholder": "e.g., City Hospital",
    
    // Daily suggestions
    "suggestion.1": "Listen to a calming nature story today",
    "suggestion.2": "Try a simple breathing exercise",
    "suggestion.3": "Share a favourite recipe with someone",
    "suggestion.4": "Look through old photographs",
    "suggestion.5": "Write about a happy memory",
    
    // Language
    "language.select": "Language",
    "language.english": "English",
    "language.urdu": "اردو",
  },
  ur: {
    // Navigation
    "nav.home": "گھر",
    "nav.myCircle": "میرا حلقہ",
    "nav.activities": "سرگرمیاں",
    "nav.myStories": "میری کہانیاں",
    "nav.health": "صحت",
    
    // Greetings
    "greeting.morning": "صبح بخیر",
    "greeting.afternoon": "دوپہر بخیر",
    "greeting.evening": "شام بخیر",
    "greeting.night": "شب بخیر",
    "greeting.subtitle": "آج آپ سے مل کر خوشی ہوئی",
    
    // Mood Check-in
    "mood.question": "آج آپ کیسا محسوس کر رہی ہیں؟",
    "mood.calm": "پرسکون",
    "mood.okay": "ٹھیک",
    "mood.low": "اداس",
    "mood.anxious": "پریشان",
    "mood.thanks": "شکریہ شیئر کرنے کا۔",
    "mood.calmResponse": "کتنا اچھا!",
    "mood.okayResponse": "یہ بالکل ٹھیک ہے۔",
    "mood.lowResponse": "میں آپ کے ساتھ ہوں۔",
    "mood.anxiousResponse": "گہری سانس لیں۔",
    
    // Today's Plan
    "plan.title": "آج کا منصوبہ",
    "plan.teaTime": "چائے کا وقت",
    "plan.teaTimeDesc": "دوپہر 3 بجے اپنے حلقے میں شامل ہوں",
    "plan.reminder": "یاد دہانی",
    "plan.reminderDesc": "دوپہر کی سیر کریں",
    "plan.calmMoment": "سکون کا لمحہ",
    "plan.calmMomentDesc": "5 منٹ کی ہلکی سانسیں",
    
    // My Circle
    "circle.title": "میرا حلقہ",
    "circle.subtitle": "آپ کے قابل اعتماد دوست اور خاندان",
    "circle.yourPeople": "آپ کے لوگ",
    "circle.teaTime": "چائے کا وقت",
    "circle.teaTimeDesc": "بات چیت کے لیے حلقے میں شامل ہوں",
    "circle.available": "دستیاب",
    "circle.resting": "آرام کر رہے ہیں",
    "circle.sendVoice": "آواز کا پیغام بھیجیں",
    "circle.listen": "سنیں",
    
    // Activities
    "activities.title": "سرگرمیاں",
    "activities.subtitle": "وقت گزارنے کے خوشگوار طریقے",
    "activities.suggestion": "آج کی نرم تجویز",
    "activities.stories": "کہانیاں سنیں",
    "activities.storiesDesc": "پرسکون کہانیاں اور یادیں",
    "activities.crafts": "بنائی اور دستکاری",
    "activities.craftsDesc": "آسان تخلیقی منصوبے",
    "activities.games": "ہلکے ذہنی کھیل",
    "activities.gamesDesc": "مزیدار پہیلیاں، کوئی دباؤ نہیں",
    "activities.memory": "یادوں کے اشارے",
    "activities.memoryDesc": "خوشگوار لمحات یاد کریں",
    
    // My Stories
    "stories.title": "میری کہانیاں",
    "stories.subtitle": "آپ کی یادیں اور حکمت",
    "stories.record": "نئی کہانی ریکارڈ کریں",
    "stories.recordDesc": "کوئی یاد، ترکیب، یا نصیحت شیئر کریں",
    "stories.yourStories": "آپ کی ریکارڈ شدہ کہانیاں",
    "stories.listened": "کسی نے سنا",
    
    // Health
    "health.title": "میری صحت",
    "health.subtitle": "اپنی صحت کا خیال رکھیں",
    "health.bloodPressure": "بلڈ پریشر",
    "health.records": "ریکارڈ",
    "health.bp.addReading": "نئی ریڈنگ شامل کریں",
    "health.bp.newReading": "نئی بلڈ پریشر ریڈنگ",
    "health.bp.systolic": "سسٹولک",
    "health.bp.diastolic": "ڈائسٹولک",
    "health.bp.top": "اوپر والا نمبر",
    "health.bp.bottom": "نیچے والا نمبر",
    "health.bp.pulse": "نبض",
    "health.bp.optional": "اختیاری",
    "health.bp.notes": "نوٹس",
    "health.bp.notesPlaceholder": "مثلاً، ناشتے کے بعد",
    "health.bp.history": "آپ کی ریڈنگز",
    "health.bp.noReadings": "ابھی کوئی ریڈنگ نہیں۔ پہلی شامل کریں!",
    "health.bp.normal": "نارمل",
    "health.bp.elevated": "بڑھا ہوا",
    "health.bp.high": "زیادہ",
    "health.cancel": "منسوخ",
    "health.save": "محفوظ کریں",
    "health.medications": "میری دوائیں",
    "health.addMedication": "دوائی شامل کریں",
    "health.noMedications": "ابھی کوئی دوائی نہیں",
    "health.med.name": "دوائی کا نام",
    "health.med.namePlaceholder": "مثلاً، اسپرین",
    "health.med.dosage": "خوراک",
    "health.med.frequency": "کتنی بار",
    "health.med.frequencyPlaceholder": "مثلاً، دن میں دو بار",
    "health.med.time": "کھانے کا وقت",
    "health.appointments": "ملاقاتیں",
    "health.addAppointment": "ملاقات شامل کریں",
    "health.noAppointments": "کوئی آنے والی ملاقات نہیں",
    "health.appt.doctor": "ڈاکٹر کا نام",
    "health.appt.doctorPlaceholder": "مثلاً، ڈاکٹر احمد",
    "health.appt.purpose": "مقصد",
    "health.appt.purposePlaceholder": "مثلاً، معمول کا چیک اپ",
    "health.appt.date": "تاریخ",
    "health.appt.time": "وقت",
    "health.appt.location": "جگہ",
    "health.appt.locationPlaceholder": "مثلاً، سٹی ہسپتال",
    
    // Daily suggestions
    "suggestion.1": "آج ایک پرسکون قدرتی کہانی سنیں",
    "suggestion.2": "ایک سادہ سانس کی مشق کریں",
    "suggestion.3": "کسی کے ساتھ پسندیدہ ترکیب شیئر کریں",
    "suggestion.4": "پرانی تصاویر دیکھیں",
    "suggestion.5": "ایک خوشگوار یاد کے بارے میں لکھیں",
    
    // Language
    "language.select": "زبان",
    "language.english": "English",
    "language.urdu": "اردو",
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    const saved = localStorage.getItem("preferred-language");
    return (saved as Language) || "en";
  });

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem("preferred-language", lang);
  };

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  const isRTL = language === "ur";

  useEffect(() => {
    document.documentElement.dir = isRTL ? "rtl" : "ltr";
    document.documentElement.lang = language;
  }, [language, isRTL]);

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, isRTL }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};
