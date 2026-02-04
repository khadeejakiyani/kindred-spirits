import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, Play, BookmarkPlus, History, Youtube, ChevronRight, ChevronLeft } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

interface SavedVideo {
  id: string;
  title: string;
  thumbnail: string;
  savedAt: Date;
}

interface WatchedVideo {
  id: string;
  title: string;
  thumbnail: string;
  watchedAt: Date;
}

const EntertainmentPage = () => {
  const { t } = useLanguage();
  const [searchQuery, setSearchQuery] = useState("");
  const [savedVideos, setSavedVideos] = useState<SavedVideo[]>([
    {
      id: "dQw4w9WgXcQ",
      title: "Classic Music Collection",
      thumbnail: "https://img.youtube.com/vi/dQw4w9WgXcQ/mqdefault.jpg",
      savedAt: new Date(),
    },
  ]);
  const [watchedVideos, setWatchedVideos] = useState<WatchedVideo[]>([
    {
      id: "jNQXAC9IVRw",
      title: "Nature Sounds - Relaxing",
      thumbnail: "https://img.youtube.com/vi/jNQXAC9IVRw/mqdefault.jpg",
      watchedAt: new Date(),
    },
  ]);
  const [showTutorial, setShowTutorial] = useState(false);
  const [tutorialStep, setTutorialStep] = useState(1);

  const totalTutorialSteps = 5;

  const handleSearch = () => {
    if (searchQuery.trim()) {
      // Open YouTube search in a new tab
      const encodedQuery = encodeURIComponent(searchQuery);
      window.open(`https://www.youtube.com/results?search_query=${encodedQuery}`, "_blank");
    }
  };

  const handleWatchVideo = (videoId: string, title: string) => {
    // Add to watched history
    const newWatched: WatchedVideo = {
      id: videoId,
      title,
      thumbnail: `https://img.youtube.com/vi/${videoId}/mqdefault.jpg`,
      watchedAt: new Date(),
    };
    setWatchedVideos((prev) => [newWatched, ...prev.filter((v) => v.id !== videoId)]);
    
    // Open video
    window.open(`https://www.youtube.com/watch?v=${videoId}`, "_blank");
  };

  const handleSaveVideo = (videoId: string, title: string) => {
    const newSaved: SavedVideo = {
      id: videoId,
      title,
      thumbnail: `https://img.youtube.com/vi/${videoId}/mqdefault.jpg`,
      savedAt: new Date(),
    };
    setSavedVideos((prev) => {
      if (prev.some((v) => v.id === videoId)) return prev;
      return [newSaved, ...prev];
    });
  };

  const popularVideos = [
    { id: "2ZIpFytCSVc", title: t("entertainment.relaxingNature") },
    { id: "lTRiuFIWV54", title: t("entertainment.classicalMusic") },
    { id: "1ZYbU82GVz4", title: t("entertainment.gentleYoga") },
    { id: "inpok4MKVLM", title: t("entertainment.oldSongs") },
  ];

  return (
    <div className="container max-w-2xl mx-auto px-4 py-8">
      {/* Page header */}
      <header className="mb-8">
        <h1 className="text-3xl font-serif mb-2">{t("entertainment.title")}</h1>
        <p className="text-lg text-muted-foreground">{t("entertainment.subtitle")}</p>
      </header>

      {/* Tutorial Button */}
      <Card className="mb-6 bg-soft-peach border-2 border-primary/20">
        <CardContent className="p-4">
          <Button
            onClick={() => {
              setShowTutorial(true);
              setTutorialStep(1);
            }}
            className="w-full py-6 text-xl rounded-2xl bg-primary hover:bg-primary/90"
          >
            <Play size={28} className="mr-3" />
            {t("entertainment.watchTutorial")}
          </Button>
        </CardContent>
      </Card>

      {/* Tutorial Modal */}
      {showTutorial && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
          <Card className="w-full max-w-lg rounded-3xl shadow-gentle-lg">
            <CardHeader className="pb-2">
              <CardTitle className="text-2xl font-serif text-center">
                {t("entertainment.tutorialTitle")}
              </CardTitle>
              <p className="text-center text-muted-foreground">
                {t("entertainment.step")} {tutorialStep} {t("entertainment.of")} {totalTutorialSteps}
              </p>
            </CardHeader>
            <CardContent className="p-6">
              {/* Progress bar */}
              <div className="w-full bg-muted rounded-full h-3 mb-6">
                <div
                  className="bg-primary h-3 rounded-full transition-all duration-300"
                  style={{ width: `${(tutorialStep / totalTutorialSteps) * 100}%` }}
                />
              </div>

              {/* Tutorial content */}
              <div className="bg-muted/50 rounded-2xl p-6 mb-6 min-h-[200px]">
                {tutorialStep === 1 && (
                  <div className="text-center space-y-4">
                    <Search size={64} className="mx-auto text-primary" />
                    <h3 className="text-xl font-semibold">{t("entertainment.tutorial.search.title")}</h3>
                    <p className="text-lg">{t("entertainment.tutorial.search.desc")}</p>
                  </div>
                )}
                {tutorialStep === 2 && (
                  <div className="text-center space-y-4">
                    <Play size={64} className="mx-auto text-primary" />
                    <h3 className="text-xl font-semibold">{t("entertainment.tutorial.watch.title")}</h3>
                    <p className="text-lg">{t("entertainment.tutorial.watch.desc")}</p>
                  </div>
                )}
                {tutorialStep === 3 && (
                  <div className="text-center space-y-4">
                    <BookmarkPlus size={64} className="mx-auto text-primary" />
                    <h3 className="text-xl font-semibold">{t("entertainment.tutorial.save.title")}</h3>
                    <p className="text-lg">{t("entertainment.tutorial.save.desc")}</p>
                  </div>
                )}
                {tutorialStep === 4 && (
                  <div className="text-center space-y-4">
                    <History size={64} className="mx-auto text-primary" />
                    <h3 className="text-xl font-semibold">{t("entertainment.tutorial.history.title")}</h3>
                    <p className="text-lg">{t("entertainment.tutorial.history.desc")}</p>
                  </div>
                )}
                {tutorialStep === 5 && (
                  <div className="text-center space-y-4">
                    <Youtube size={64} className="mx-auto text-rose" />
                    <h3 className="text-xl font-semibold">{t("entertainment.tutorial.enjoy.title")}</h3>
                    <p className="text-lg">{t("entertainment.tutorial.enjoy.desc")}</p>
                  </div>
                )}
              </div>

              {/* Navigation buttons */}
              <div className="flex gap-4">
                <Button
                  variant="outline"
                  onClick={() => setTutorialStep((s) => Math.max(1, s - 1))}
                  disabled={tutorialStep === 1}
                  className="flex-1 py-6 text-lg rounded-xl"
                >
                  <ChevronLeft size={24} className="mr-2" />
                  {t("entertainment.previous")}
                </Button>
                {tutorialStep === totalTutorialSteps ? (
                  <Button
                    onClick={() => setShowTutorial(false)}
                    className="flex-1 py-6 text-lg rounded-xl bg-primary hover:bg-primary/90"
                  >
                    {t("entertainment.done")}
                  </Button>
                ) : (
                  <Button
                    onClick={() => setTutorialStep((s) => Math.min(totalTutorialSteps, s + 1))}
                    className="flex-1 py-6 text-lg rounded-xl bg-primary hover:bg-primary/90"
                  >
                    {t("entertainment.next")}
                    <ChevronRight size={24} className="ml-2" />
                  </Button>
                )}
              </div>

              {/* Skip button */}
              <Button
                variant="ghost"
                onClick={() => setShowTutorial(false)}
                className="w-full mt-4 text-muted-foreground"
              >
                {t("entertainment.skipTutorial")}
              </Button>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Search Section */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="text-xl font-serif flex items-center gap-2">
            <Youtube size={28} className="text-rose" />
            {t("entertainment.searchYoutube")}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-3">
            <Input
              type="text"
              placeholder={t("entertainment.searchPlaceholder")}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
              className="flex-1 h-14 text-lg rounded-xl"
            />
            <Button
              onClick={handleSearch}
              className="h-14 px-6 rounded-xl bg-rose hover:bg-rose/90"
            >
              <Search size={24} />
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Popular Videos */}
      <section className="mb-8">
        <h2 className="text-2xl font-serif mb-4">{t("entertainment.popular")}</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          {popularVideos.map((video) => (
            <Card
              key={video.id}
              className="overflow-hidden hover:shadow-gentle-lg transition-shadow cursor-pointer"
              onClick={() => handleWatchVideo(video.id, video.title)}
            >
              <div className="relative">
                <img
                  src={`https://img.youtube.com/vi/${video.id}/mqdefault.jpg`}
                  alt={video.title}
                  className="w-full h-32 object-cover"
                />
                <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                  <Play size={48} className="text-white" />
                </div>
              </div>
              <CardContent className="p-4">
                <p className="font-medium text-lg line-clamp-2">{video.title}</p>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleSaveVideo(video.id, video.title);
                  }}
                  className="mt-2 text-primary"
                >
                  <BookmarkPlus size={20} className="mr-2" />
                  {t("entertainment.saveVideo")}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Saved & History Tabs */}
      <Tabs defaultValue="saved" className="w-full">
        <TabsList className="w-full h-14 rounded-2xl bg-muted p-1">
          <TabsTrigger value="saved" className="flex-1 h-12 rounded-xl text-lg">
            <BookmarkPlus size={20} className="mr-2" />
            {t("entertainment.saved")}
          </TabsTrigger>
          <TabsTrigger value="history" className="flex-1 h-12 rounded-xl text-lg">
            <History size={20} className="mr-2" />
            {t("entertainment.history")}
          </TabsTrigger>
        </TabsList>

        <TabsContent value="saved" className="mt-4">
          {savedVideos.length === 0 ? (
            <Card className="p-8 text-center">
              <BookmarkPlus size={48} className="mx-auto text-muted-foreground mb-4" />
              <p className="text-lg text-muted-foreground">{t("entertainment.noSaved")}</p>
            </Card>
          ) : (
            <div className="space-y-3">
              {savedVideos.map((video) => (
                <Card
                  key={video.id}
                  className="flex items-center gap-4 p-3 cursor-pointer hover:shadow-gentle transition-shadow"
                  onClick={() => handleWatchVideo(video.id, video.title)}
                >
                  <img
                    src={video.thumbnail}
                    alt={video.title}
                    className="w-24 h-16 object-cover rounded-lg"
                  />
                  <div className="flex-1">
                    <p className="font-medium line-clamp-2">{video.title}</p>
                  </div>
                  <Play size={24} className="text-primary shrink-0" />
                </Card>
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="history" className="mt-4">
          {watchedVideos.length === 0 ? (
            <Card className="p-8 text-center">
              <History size={48} className="mx-auto text-muted-foreground mb-4" />
              <p className="text-lg text-muted-foreground">{t("entertainment.noHistory")}</p>
            </Card>
          ) : (
            <div className="space-y-3">
              {watchedVideos.map((video) => (
                <Card
                  key={video.id}
                  className="flex items-center gap-4 p-3 cursor-pointer hover:shadow-gentle transition-shadow"
                  onClick={() => handleWatchVideo(video.id, video.title)}
                >
                  <img
                    src={video.thumbnail}
                    alt={video.title}
                    className="w-24 h-16 object-cover rounded-lg"
                  />
                  <div className="flex-1">
                    <p className="font-medium line-clamp-2">{video.title}</p>
                  </div>
                  <Play size={24} className="text-primary shrink-0" />
                </Card>
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default EntertainmentPage;
