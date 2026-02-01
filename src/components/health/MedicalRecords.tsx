import { useState, useEffect } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Pill, Calendar, Plus, Clock, FileText, Trash2 } from "lucide-react";

interface Medication {
  id: string;
  name: string;
  dosage: string;
  frequency: string;
  time?: string;
}

interface Appointment {
  id: string;
  doctor: string;
  purpose: string;
  date: string;
  time: string;
  location?: string;
}

const MedicalRecords = () => {
  const { t } = useLanguage();
  
  // Medications state
  const [medications, setMedications] = useState<Medication[]>(() => {
    const saved = localStorage.getItem("medications");
    return saved ? JSON.parse(saved) : [];
  });
  const [showMedForm, setShowMedForm] = useState(false);
  const [medName, setMedName] = useState("");
  const [medDosage, setMedDosage] = useState("");
  const [medFrequency, setMedFrequency] = useState("");
  const [medTime, setMedTime] = useState("");

  // Appointments state
  const [appointments, setAppointments] = useState<Appointment[]>(() => {
    const saved = localStorage.getItem("appointments");
    return saved ? JSON.parse(saved) : [];
  });
  const [showApptForm, setShowApptForm] = useState(false);
  const [apptDoctor, setApptDoctor] = useState("");
  const [apptPurpose, setApptPurpose] = useState("");
  const [apptDate, setApptDate] = useState("");
  const [apptTime, setApptTime] = useState("");
  const [apptLocation, setApptLocation] = useState("");

  useEffect(() => {
    localStorage.setItem("medications", JSON.stringify(medications));
  }, [medications]);

  useEffect(() => {
    localStorage.setItem("appointments", JSON.stringify(appointments));
  }, [appointments]);

  const handleAddMedication = (e: React.FormEvent) => {
    e.preventDefault();
    if (!medName || !medDosage || !medFrequency) return;

    const newMed: Medication = {
      id: Date.now().toString(),
      name: medName,
      dosage: medDosage,
      frequency: medFrequency,
      time: medTime || undefined,
    };

    setMedications([...medications, newMed]);
    setMedName("");
    setMedDosage("");
    setMedFrequency("");
    setMedTime("");
    setShowMedForm(false);
  };

  const handleAddAppointment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!apptDoctor || !apptPurpose || !apptDate || !apptTime) return;

    const newAppt: Appointment = {
      id: Date.now().toString(),
      doctor: apptDoctor,
      purpose: apptPurpose,
      date: apptDate,
      time: apptTime,
      location: apptLocation || undefined,
    };

    setAppointments([...appointments, newAppt]);
    setApptDoctor("");
    setApptPurpose("");
    setApptDate("");
    setApptTime("");
    setApptLocation("");
    setShowApptForm(false);
  };

  const deleteMedication = (id: string) => {
    setMedications(medications.filter(m => m.id !== id));
  };

  const deleteAppointment = (id: string) => {
    setAppointments(appointments.filter(a => a.id !== id));
  };

  return (
    <div className="space-y-8">
      {/* Medications Section */}
      <section>
        <div className="flex items-center gap-3 mb-4">
          <Pill size={28} className="text-primary" />
          <h3 className="text-2xl font-semibold">{t("health.medications")}</h3>
        </div>

        {!showMedForm && (
          <Button
            onClick={() => setShowMedForm(true)}
            variant="outline"
            className="w-full py-6 text-lg rounded-2xl border-2 border-dashed border-primary/30 hover:border-primary/50 mb-4"
          >
            <Plus size={24} className="mr-2" />
            {t("health.addMedication")}
          </Button>
        )}

        {showMedForm && (
          <Card className="border-2 border-primary/20 rounded-3xl shadow-gentle mb-4">
            <CardContent className="p-6">
              <form onSubmit={handleAddMedication} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="medName" className="text-lg">{t("health.med.name")}</Label>
                  <Input
                    id="medName"
                    value={medName}
                    onChange={(e) => setMedName(e.target.value)}
                    placeholder={t("health.med.namePlaceholder")}
                    className="h-14 text-lg rounded-xl"
                    required
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="medDosage" className="text-lg">{t("health.med.dosage")}</Label>
                    <Input
                      id="medDosage"
                      value={medDosage}
                      onChange={(e) => setMedDosage(e.target.value)}
                      placeholder="50mg"
                      className="h-14 text-lg rounded-xl"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="medFrequency" className="text-lg">{t("health.med.frequency")}</Label>
                    <Input
                      id="medFrequency"
                      value={medFrequency}
                      onChange={(e) => setMedFrequency(e.target.value)}
                      placeholder={t("health.med.frequencyPlaceholder")}
                      className="h-14 text-lg rounded-xl"
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="medTime" className="text-lg">{t("health.med.time")} ({t("health.bp.optional")})</Label>
                  <Input
                    id="medTime"
                    type="time"
                    value={medTime}
                    onChange={(e) => setMedTime(e.target.value)}
                    className="h-14 text-lg rounded-xl"
                  />
                </div>
                <div className="flex gap-4 pt-2">
                  <Button type="button" variant="outline" onClick={() => setShowMedForm(false)} className="flex-1 py-5 text-lg rounded-xl">
                    {t("health.cancel")}
                  </Button>
                  <Button type="submit" className="flex-1 py-5 text-lg rounded-xl">
                    {t("health.save")}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        )}

        {medications.length === 0 ? (
          <Card className="rounded-2xl border-2 border-dashed border-muted-foreground/30">
            <CardContent className="p-6 text-center">
              <Pill size={40} className="mx-auto mb-3 text-muted-foreground/50" />
              <p className="text-lg text-muted-foreground">{t("health.noMedications")}</p>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-3">
            {medications.map((med) => (
              <Card key={med.id} className="rounded-2xl shadow-gentle border-2 border-border/50">
                <CardContent className="p-4 flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                      <Pill size={24} className="text-primary" />
                    </div>
                    <div>
                      <h4 className="text-xl font-semibold">{med.name}</h4>
                      <p className="text-muted-foreground">
                        {med.dosage} • {med.frequency}
                        {med.time && ` • ${med.time}`}
                      </p>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => deleteMedication(med.id)}
                    className="text-muted-foreground hover:text-destructive"
                  >
                    <Trash2 size={20} />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </section>

      {/* Appointments Section */}
      <section>
        <div className="flex items-center gap-3 mb-4">
          <Calendar size={28} className="text-accent-foreground" />
          <h3 className="text-2xl font-semibold">{t("health.appointments")}</h3>
        </div>

        {!showApptForm && (
          <Button
            onClick={() => setShowApptForm(true)}
            variant="outline"
            className="w-full py-6 text-lg rounded-2xl border-2 border-dashed border-accent/50 hover:border-accent mb-4"
          >
            <Plus size={24} className="mr-2" />
            {t("health.addAppointment")}
          </Button>
        )}

        {showApptForm && (
          <Card className="border-2 border-accent/20 rounded-3xl shadow-gentle mb-4">
            <CardContent className="p-6">
              <form onSubmit={handleAddAppointment} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="apptDoctor" className="text-lg">{t("health.appt.doctor")}</Label>
                  <Input
                    id="apptDoctor"
                    value={apptDoctor}
                    onChange={(e) => setApptDoctor(e.target.value)}
                    placeholder={t("health.appt.doctorPlaceholder")}
                    className="h-14 text-lg rounded-xl"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="apptPurpose" className="text-lg">{t("health.appt.purpose")}</Label>
                  <Input
                    id="apptPurpose"
                    value={apptPurpose}
                    onChange={(e) => setApptPurpose(e.target.value)}
                    placeholder={t("health.appt.purposePlaceholder")}
                    className="h-14 text-lg rounded-xl"
                    required
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="apptDate" className="text-lg">{t("health.appt.date")}</Label>
                    <Input
                      id="apptDate"
                      type="date"
                      value={apptDate}
                      onChange={(e) => setApptDate(e.target.value)}
                      className="h-14 text-lg rounded-xl"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="apptTime" className="text-lg">{t("health.appt.time")}</Label>
                    <Input
                      id="apptTime"
                      type="time"
                      value={apptTime}
                      onChange={(e) => setApptTime(e.target.value)}
                      className="h-14 text-lg rounded-xl"
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="apptLocation" className="text-lg">{t("health.appt.location")} ({t("health.bp.optional")})</Label>
                  <Input
                    id="apptLocation"
                    value={apptLocation}
                    onChange={(e) => setApptLocation(e.target.value)}
                    placeholder={t("health.appt.locationPlaceholder")}
                    className="h-14 text-lg rounded-xl"
                  />
                </div>
                <div className="flex gap-4 pt-2">
                  <Button type="button" variant="outline" onClick={() => setShowApptForm(false)} className="flex-1 py-5 text-lg rounded-xl">
                    {t("health.cancel")}
                  </Button>
                  <Button type="submit" className="flex-1 py-5 text-lg rounded-xl">
                    {t("health.save")}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        )}

        {appointments.length === 0 ? (
          <Card className="rounded-2xl border-2 border-dashed border-muted-foreground/30">
            <CardContent className="p-6 text-center">
              <Calendar size={40} className="mx-auto mb-3 text-muted-foreground/50" />
              <p className="text-lg text-muted-foreground">{t("health.noAppointments")}</p>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-3">
            {appointments.map((appt) => (
              <Card key={appt.id} className="rounded-2xl shadow-gentle border-2 border-border/50">
                <CardContent className="p-4 flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-accent/20 flex items-center justify-center">
                      <Calendar size={24} className="text-accent-foreground" />
                    </div>
                    <div>
                      <h4 className="text-xl font-semibold">{appt.doctor}</h4>
                      <p className="text-muted-foreground">{appt.purpose}</p>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                        <Clock size={14} />
                        <span>{appt.date} • {appt.time}</span>
                        {appt.location && <span>• {appt.location}</span>}
                      </div>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => deleteAppointment(appt.id)}
                    className="text-muted-foreground hover:text-destructive"
                  >
                    <Trash2 size={20} />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default MedicalRecords;
