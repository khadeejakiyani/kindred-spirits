import { useState } from "react";
import RecordStoryButton from "@/components/stories/RecordStoryButton";
import StoryCard from "@/components/stories/StoryCard";
import { useLanguage } from "@/contexts/LanguageContext";

const sampleStories = [
  {
    id: "1",
    title: "My Wedding Day",
    date: "December 2024",
    duration: "3 minutes",
    hasListeners: true,
    listenerCount: 2,
  },
  {
    id: "2",
    title: "Grandma's Apple Pie Recipe",
    date: "November 2024",
    duration: "5 minutes",
    hasListeners: true,
    listenerCount: 4,
  },
  {
    id: "3",
    title: "First Day at School",
    date: "October 2024",
    duration: "2 minutes",
    hasListeners: false,
    listenerCount: 0,
  },
  {
    id: "4",
    title: "Meeting Your Grandfather",
    date: "September 2024",
    duration: "4 minutes",
    hasListeners: true,
    listenerCount: 3,
  },
];

const MyStoriesPage = () => {
  const [stories] = useState(sampleStories);
  const { t } = useLanguage();

  return (
    <div className="container max-w-2xl mx-auto px-4 py-8">
      {/* Page header */}
      <header className="mb-8">
        <h1 className="text-3xl font-serif mb-2">{t("stories.title")}</h1>
        <p className="text-lg text-muted-foreground">
          {t("stories.subtitle")}
        </p>
      </header>

      {/* Record new story button */}
      <RecordStoryButton />

      {/* Stories list */}
      <section aria-labelledby="stories-heading">
        <h2 id="stories-heading" className="text-2xl font-serif mb-6">
          {t("stories.yourStories")}
        </h2>
        
        <div className="space-y-4">
          {stories.map((story) => (
            <StoryCard key={story.id} story={story} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default MyStoriesPage;
