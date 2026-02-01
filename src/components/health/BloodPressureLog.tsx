import { useState, useEffect } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Heart, Plus, TrendingUp, TrendingDown, Minus } from "lucide-react";
import { format } from "date-fns";

interface BloodPressureEntry {
  id: string;
  systolic: number;
  diastolic: number;
  pulse?: number;
  date: string;
  time: string;
  notes?: string;
}

const BloodPressureLog = () => {
  const { t } = useLanguage();
  const [entries, setEntries] = useState<BloodPressureEntry[]>(() => {
    const saved = localStorage.getItem("blood-pressure-entries");
    return saved ? JSON.parse(saved) : [];
  });
  const [showForm, setShowForm] = useState(false);
  const [systolic, setSystolic] = useState("");
  const [diastolic, setDiastolic] = useState("");
  const [pulse, setPulse] = useState("");
  const [notes, setNotes] = useState("");

  useEffect(() => {
    localStorage.setItem("blood-pressure-entries", JSON.stringify(entries));
  }, [entries]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!systolic || !diastolic) return;

    const now = new Date();
    const newEntry: BloodPressureEntry = {
      id: Date.now().toString(),
      systolic: parseInt(systolic),
      diastolic: parseInt(diastolic),
      pulse: pulse ? parseInt(pulse) : undefined,
      date: format(now, "yyyy-MM-dd"),
      time: format(now, "HH:mm"),
      notes: notes || undefined,
    };

    setEntries([newEntry, ...entries]);
    setSystolic("");
    setDiastolic("");
    setPulse("");
    setNotes("");
    setShowForm(false);
  };

  const getReadingStatus = (systolic: number, diastolic: number) => {
    if (systolic < 120 && diastolic < 80) {
      return { label: t("health.bp.normal"), color: "text-green-600 bg-green-50", icon: Minus };
    } else if (systolic < 130 && diastolic < 80) {
      return { label: t("health.bp.elevated"), color: "text-yellow-600 bg-yellow-50", icon: TrendingUp };
    } else if (systolic >= 130 || diastolic >= 80) {
      return { label: t("health.bp.high"), color: "text-health bg-red-50", icon: TrendingUp };
    }
    return { label: t("health.bp.normal"), color: "text-green-600 bg-green-50", icon: Minus };
  };

  return (
    <div className="space-y-6">
      {/* Add new reading button */}
      {!showForm && (
        <Button
          onClick={() => setShowForm(true)}
          className="w-full py-8 text-xl rounded-2xl bg-health hover:bg-health/90 text-white shadow-gentle"
        >
          <Plus size={28} className="mr-3" />
          {t("health.bp.addReading")}
        </Button>
      )}

      {/* Add reading form */}
      {showForm && (
        <Card className="border-2 border-health/20 rounded-3xl shadow-gentle">
          <CardContent className="p-6">
            <h3 className="text-xl font-semibold mb-6 text-center">
              {t("health.bp.newReading")}
            </h3>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="systolic" className="text-lg font-medium">
                    {t("health.bp.systolic")}
                  </Label>
                  <Input
                    id="systolic"
                    type="number"
                    value={systolic}
                    onChange={(e) => setSystolic(e.target.value)}
                    placeholder="120"
                    className="text-2xl text-center h-16 rounded-xl border-2"
                    min="60"
                    max="250"
                    required
                  />
                  <p className="text-sm text-muted-foreground text-center">
                    {t("health.bp.top")}
                  </p>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="diastolic" className="text-lg font-medium">
                    {t("health.bp.diastolic")}
                  </Label>
                  <Input
                    id="diastolic"
                    type="number"
                    value={diastolic}
                    onChange={(e) => setDiastolic(e.target.value)}
                    placeholder="80"
                    className="text-2xl text-center h-16 rounded-xl border-2"
                    min="40"
                    max="150"
                    required
                  />
                  <p className="text-sm text-muted-foreground text-center">
                    {t("health.bp.bottom")}
                  </p>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="pulse" className="text-lg font-medium">
                  {t("health.bp.pulse")} ({t("health.bp.optional")})
                </Label>
                <Input
                  id="pulse"
                  type="number"
                  value={pulse}
                  onChange={(e) => setPulse(e.target.value)}
                  placeholder="72"
                  className="text-xl text-center h-14 rounded-xl border-2"
                  min="40"
                  max="200"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="notes" className="text-lg font-medium">
                  {t("health.bp.notes")} ({t("health.bp.optional")})
                </Label>
                <Input
                  id="notes"
                  type="text"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder={t("health.bp.notesPlaceholder")}
                  className="text-lg h-14 rounded-xl border-2"
                />
              </div>

              <div className="flex gap-4 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setShowForm(false)}
                  className="flex-1 py-6 text-lg rounded-xl"
                >
                  {t("health.cancel")}
                </Button>
                <Button
                  type="submit"
                  className="flex-1 py-6 text-lg rounded-xl bg-health hover:bg-health/90"
                >
                  {t("health.save")}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      {/* Reading history */}
      <div className="space-y-4">
        <h3 className="text-xl font-semibold">{t("health.bp.history")}</h3>
        
        {entries.length === 0 ? (
          <Card className="rounded-3xl border-2 border-dashed border-muted-foreground/30">
            <CardContent className="p-8 text-center">
              <Heart size={48} className="mx-auto mb-4 text-muted-foreground/50" />
              <p className="text-lg text-muted-foreground">
                {t("health.bp.noReadings")}
              </p>
            </CardContent>
          </Card>
        ) : (
          entries.map((entry) => {
            const status = getReadingStatus(entry.systolic, entry.diastolic);
            const StatusIcon = status.icon;
            return (
              <Card key={entry.id} className="rounded-2xl shadow-gentle border-2 border-border/50">
                <CardContent className="p-5">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <Heart size={24} className="text-health" />
                      <span className="text-3xl font-bold text-foreground">
                        {entry.systolic}/{entry.diastolic}
                      </span>
                      <span className="text-lg text-muted-foreground">mmHg</span>
                    </div>
                    <div className={`px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1 ${status.color}`}>
                      <StatusIcon size={16} />
                      {status.label}
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-4 text-muted-foreground">
                    <span>{format(new Date(entry.date), "dd MMM yyyy")}</span>
                    <span>{entry.time}</span>
                    {entry.pulse && (
                      <span>{t("health.bp.pulse")}: {entry.pulse} bpm</span>
                    )}
                  </div>
                  {entry.notes && (
                    <p className="mt-2 text-muted-foreground italic">{entry.notes}</p>
                  )}
                </CardContent>
              </Card>
            );
          })
        )}
      </div>
    </div>
  );
};

export default BloodPressureLog;
