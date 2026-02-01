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
    
    // Help
    "help.button": "Help",
    "help.title": "How to Use This Page",
    "help.listen": "Listen to Instructions",
    "help.stop": "Stop",
    "help.instructions": "Step by Step",
    "help.navigation": "Use the buttons at the bottom to go to other pages",
    
    // Help - Home Page
    "help.home.title": "Home Page",
    "help.home.audio": "Welcome to the Home page. Here you can tell us how you're feeling by pressing one of the four big buttons: Calm, Okay, Low, or Anxious. Below that, you can see your plan for today with activities like Tea Time and gentle reminders. Take your time, there's no rush.",
    "help.home.steps": "Look at the greeting at the top|Press the button that shows how you feel|See your activities for today below|Use the bottom buttons to visit other pages",
    
    // Help - My Circle Page
    "help.circle.title": "My Circle Page",
    "help.circle.audio": "This is your Circle page where you can see your trusted friends and family. Each person has a card with their picture. You can press Send Voice Message to record a message for them, or press Listen to hear messages they sent you. The Tea Time button lets you join a group chat.",
    "help.circle.steps": "See your friends and family cards|Press Send Voice Message to record|Press Listen to hear their messages|Press Tea Time to join a group chat",
    
    // Help - Activities Page
    "help.activities.title": "Activities Page",
    "help.activities.audio": "This is the Activities page with gentle things to do. At the top you'll see today's suggestion. Below are cards for different activities: Listen to Stories, Knitting and Crafts, Gentle Brain Games, and Memory Prompts. Just press any card to start that activity. There are no timers or scores, so take your time.",
    "help.activities.steps": "Read today's gentle suggestion at the top|Choose an activity by pressing its card|Listen to Stories for calming tales|Try Memory Prompts to remember happy times",
    
    // Help - My Stories Page
    "help.stories.title": "My Stories Page",
    "help.stories.audio": "This is your Stories page where you can share your memories and wisdom. Press the big Record a New Story button to start recording. Your recorded stories appear below. Each story shows a play button to listen, and a heart icon shows when someone has listened to your story.",
    "help.stories.steps": "Press Record a New Story to share a memory|Speak clearly into your device|Your stories appear in a list below|Press Play to listen to any story|Hearts show when others have listened",
    
    // Help - Health Page
    "help.health.title": "Health Page",
    "help.health.audio": "This is your Health page to track your wellbeing. At the top, choose between Blood Pressure and Records. For blood pressure, press Add New Reading and enter your numbers. In Records, you can add your medications and doctor appointments. Everything is saved automatically.",
    "help.health.steps": "Choose Blood Pressure or Records at the top|For blood pressure, press Add New Reading|Enter your numbers and press Save|In Records, add your medications|Add doctor appointments with date and time",
    
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
    
    // Help
    "help.button": "مدد",
    "help.title": "اس صفحے کو کیسے استعمال کریں",
    "help.listen": "ہدایات سنیں",
    "help.stop": "رکیں",
    "help.instructions": "قدم بہ قدم",
    "help.navigation": "دوسرے صفحات پر جانے کے لیے نیچے کے بٹن استعمال کریں",
    
    // Help - Home Page
    "help.home.title": "ہوم پیج",
    "help.home.audio": "ہوم پیج میں خوش آمدید۔ یہاں آپ ہمیں بتا سکتی ہیں کہ آپ کیسا محسوس کر رہی ہیں چار بڑے بٹنوں میں سے ایک دبا کر: پرسکون، ٹھیک، اداس، یا پریشان۔ نیچے آپ آج کا منصوبہ دیکھ سکتی ہیں جیسے چائے کا وقت اور یاد دہانیاں۔ آرام سے لیں، کوئی جلدی نہیں۔",
    "help.home.steps": "اوپر خوش آمدید پیغام دیکھیں|جو بٹن آپ کے جذبات ظاہر کرے وہ دبائیں|نیچے آج کی سرگرمیاں دیکھیں|دوسرے صفحات کے لیے نیچے کے بٹن استعمال کریں",
    
    // Help - My Circle Page
    "help.circle.title": "میرا حلقہ",
    "help.circle.audio": "یہ آپ کے حلقے کا صفحہ ہے جہاں آپ اپنے قابل اعتماد دوست اور خاندان دیکھ سکتی ہیں۔ ہر شخص کا ایک کارڈ ہے۔ آواز کا پیغام بھیجیں دبائیں ان کے لیے پیغام ریکارڈ کرنے کے لیے، یا سنیں دبائیں ان کے پیغامات سننے کے لیے۔ چائے کا وقت بٹن سے گروپ چیٹ میں شامل ہوں۔",
    "help.circle.steps": "اپنے دوستوں اور خاندان کے کارڈ دیکھیں|آواز کا پیغام بھیجیں دبائیں ریکارڈ کرنے کے لیے|سنیں دبائیں ان کے پیغامات کے لیے|چائے کا وقت دبائیں گروپ چیٹ کے لیے",
    
    // Help - Activities Page
    "help.activities.title": "سرگرمیاں",
    "help.activities.audio": "یہ سرگرمیوں کا صفحہ ہے جہاں ہلکی پھلکی چیزیں ہیں۔ اوپر آج کی تجویز ہے۔ نیچے مختلف سرگرمیوں کے کارڈ ہیں: کہانیاں سنیں، بنائی اور دستکاری، ہلکے ذہنی کھیل، اور یادوں کے اشارے۔ کوئی بھی کارڈ دبائیں شروع کرنے کے لیے۔ کوئی وقت یا سکور نہیں، آرام سے کریں۔",
    "help.activities.steps": "اوپر آج کی نرم تجویز پڑھیں|کوئی سرگرمی چنیں کارڈ دبا کر|کہانیاں سنیں پرسکون کہانیوں کے لیے|یادوں کے اشارے خوشگوار لمحات یاد کرنے کے لیے",
    
    // Help - My Stories Page
    "help.stories.title": "میری کہانیاں",
    "help.stories.audio": "یہ آپ کی کہانیوں کا صفحہ ہے جہاں آپ اپنی یادیں اور حکمت شیئر کر سکتی ہیں۔ نئی کہانی ریکارڈ کریں کا بڑا بٹن دبائیں ریکارڈنگ شروع کرنے کے لیے۔ آپ کی کہانیاں نیچے دکھائی دیتی ہیں۔ ہر کہانی پر چلانے کا بٹن ہے، اور دل کا نشان بتاتا ہے کہ کسی نے سنا ہے۔",
    "help.stories.steps": "نئی کہانی ریکارڈ کریں دبائیں یاد شیئر کرنے کے لیے|اپنے آلے میں واضح بولیں|آپ کی کہانیاں نیچے فہرست میں آئیں گی|کوئی کہانی سننے کے لیے چلائیں دبائیں|دل بتاتے ہیں کہ دوسروں نے سنا",
    
    // Help - Health Page
    "help.health.title": "صحت کا صفحہ",
    "help.health.audio": "یہ آپ کا صحت کا صفحہ ہے اپنی صحت کا خیال رکھنے کے لیے۔ اوپر بلڈ پریشر یا ریکارڈ میں سے چنیں۔ بلڈ پریشر کے لیے نئی ریڈنگ شامل کریں دبائیں اور نمبر لکھیں۔ ریکارڈ میں اپنی دوائیں اور ڈاکٹر کی ملاقاتیں شامل کریں۔ سب کچھ خود بخود محفوظ ہوتا ہے۔",
    "help.health.steps": "اوپر بلڈ پریشر یا ریکارڈ چنیں|بلڈ پریشر کے لیے نئی ریڈنگ شامل کریں دبائیں|اپنے نمبر لکھیں اور محفوظ کریں دبائیں|ریکارڈ میں اپنی دوائیں شامل کریں|تاریخ اور وقت کے ساتھ ڈاکٹر کی ملاقاتیں شامل کریں",
    
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
