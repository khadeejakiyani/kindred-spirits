import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import BloodPressureLog from "@/components/health/BloodPressureLog";
import MedicalRecords from "@/components/health/MedicalRecords";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Heart, FileText } from "lucide-react";

const HealthPage = () => {
  const { t } = useLanguage();

  return (
    <div className="container max-w-2xl mx-auto px-4 py-8">
      {/* Page header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-3">
          {t("health.title")}
        </h1>
        <p className="text-lg text-muted-foreground">
          {t("health.subtitle")}
        </p>
      </div>

      {/* Simple tab navigation - large buttons instead of small tabs */}
      <Tabs defaultValue="bloodPressure" className="w-full">
        <TabsList className="grid w-full grid-cols-2 h-auto p-2 bg-muted/50 rounded-2xl mb-6">
          <TabsTrigger 
            value="bloodPressure" 
            className="flex flex-col items-center gap-2 py-4 px-6 rounded-xl text-lg font-medium data-[state=active]:bg-card data-[state=active]:shadow-gentle"
          >
            <Heart size={28} className="text-health" />
            <span>{t("health.bloodPressure")}</span>
          </TabsTrigger>
          <TabsTrigger 
            value="records" 
            className="flex flex-col items-center gap-2 py-4 px-6 rounded-xl text-lg font-medium data-[state=active]:bg-card data-[state=active]:shadow-gentle"
          >
            <FileText size={28} className="text-primary" />
            <span>{t("health.records")}</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="bloodPressure" className="mt-0">
          <BloodPressureLog />
        </TabsContent>

        <TabsContent value="records" className="mt-0">
          <MedicalRecords />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default HealthPage;
