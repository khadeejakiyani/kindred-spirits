import { Play, Heart, Clock } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

interface Story {
  id: string;
  title: string;
  date: string;
  duration: string;
  hasListeners: boolean;
  listenerCount: number;
}

interface StoryCardProps {
  story: Story;
}

const StoryCard = ({ story }: StoryCardProps) => {
  const { t } = useLanguage();

  return (
    <article className="story-card">
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <h3 className="text-xl font-medium mb-1">{story.title}</h3>
          <div className="flex items-center gap-4 text-muted-foreground">
            <span className="flex items-center gap-1">
              <Clock size={16} aria-hidden="true" />
              {story.duration}
            </span>
            <span>{story.date}</span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {/* Listeners indicator */}
          {story.hasListeners && (
            <div 
              className="flex items-center gap-1 text-rose px-3 py-2 rounded-full bg-rose-light"
              aria-label={`${story.listenerCount} ${t("stories.listened")}`}
            >
              <Heart size={20} fill="currentColor" aria-hidden="true" />
              <span className="font-medium">{story.listenerCount}</span>
            </div>
          )}
          
          {/* Play button */}
          <button
            className="p-4 rounded-full bg-primary text-primary-foreground"
            aria-label={`Play: ${story.title}`}
          >
            <Play size={24} fill="currentColor" aria-hidden="true" />
          </button>
        </div>
      </div>
    </article>
  );
};

export default StoryCard;
