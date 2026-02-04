import PersonCard from "@/components/circle/PersonCard";
import TeaTimeButton from "@/components/circle/TeaTimeButton";
import { useLanguage } from "@/contexts/LanguageContext";

const circleMembers = [
  {
    id: "1",
    name: "Fatima",
    status: "available" as const,
    avatar: "👩‍🦳",
    relationship: "Sister",
  },
  {
    id: "2", 
    name: "Ayesha",
    status: "available" as const,
    avatar: "👵",
    relationship: "Best Friend",
  },
  {
    id: "3",
    name: "Zainab",
    status: "resting" as const,
    avatar: "👩‍🦱",
    relationship: "Daughter",
  },
  {
    id: "4",
    name: "Khadija",
    status: "available" as const,
    avatar: "👩‍🦰",
    relationship: "Neighbour",
  },
];

const MyCirclePage = () => {
  const { t } = useLanguage();

  return (
    <div className="container max-w-2xl mx-auto px-4 py-8">
      {/* Page header */}
      <header className="mb-8">
        <h1 className="text-3xl font-serif mb-2">{t("circle.title")}</h1>
        <p className="text-lg text-muted-foreground">
          {t("circle.subtitle")}
        </p>
      </header>

      {/* Tea Time group call button */}
      <TeaTimeButton />

      {/* Circle members */}
      <section aria-labelledby="members-heading">
        <h2 id="members-heading" className="text-2xl font-serif mb-6">
          {t("circle.yourPeople")}
        </h2>
        
        <div className="space-y-4">
          {circleMembers.map((member) => (
            <PersonCard key={member.id} person={member} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default MyCirclePage;
