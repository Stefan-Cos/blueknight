
import { useState, useEffect } from "react";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { CheckCircle2, Send, ChevronRight, ChevronLeft } from "lucide-react";
import { OverviewSection } from "./form-sections/OverviewSection";
import { BusinessInformationSection } from "./form-sections/BusinessInformationSection";
import { MetricsSection } from "./form-sections/MetricsSection";
import { OtherSection } from "./form-sections/OtherSection";
import { BuyerPreferenceSection } from "./form-sections/BuyerPreferenceSection";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate, useLocation, useSearchParams } from "react-router-dom";

export function MainForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [currentSection, setCurrentSection] = useState(0);
  const { toast } = useToast();
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();
  
  const advisorData = location.state?.advisorData || {
    email: searchParams.get('advisor') || '',
    companyName: searchParams.get('company') || '',
    fullName: searchParams.get('name') || ''
  };

  const [formData, setFormData] = useState({
    projectName: "",
    companyName: "",
    companyWebsite: "",
    shareSaleType: "",
    shareholdersExit: "",
    transitionPeriod: "",
    reasonForSelling: "",
    regulatoryBodies: "",
    accreditations: "",
    industryAssociations: "",
    recentAwards: "",
    companyDescription: "",
    productsAndServices: "",
    revenueModel: "",
    targetCustomers: "",
    industryKeywords: [] as string[],
    valueChain: {
      consultancy: false,
      development: false,
      financing: false,
      reSeller: false,
      software: false,
      design: false,
      distribution: false,
      manufacturing: false,
      service: false,
    },
    businessModelType: {
      b2b: false,
      b2c: false,
      b2g: false,
      d2c: false,
      other: false,
    },
    customerIndustries: [] as string[],
    growthPlan: "",
    mainCompetitors: [] as string[],
    keyIndustryRisks: "",
    revenueByGeography: "",
    revenueByCustomerType: "",
    revenueByProductType: "",
    revenueAndEbitda: {
      yearMinus2Revenue: "0.0",
      yearMinus2Ebitda: "0.0",
      previousYearRevenue: "0.0",
      previousYearEbitda: "0.0",
      lastYearRevenue: "0.0",
      lastYearEbitda: "0.0",
      year0Revenue: "0.0",
      year0Ebitda: "0.0",
      fcPlus1Revenue: "0.0",
      fcPlus1Ebitda: "0.0"
    },
    outstandingLitigation: "",
    negativeMediaCoverage: "",
    definedBenefitScheme: "",
    shareholdersPreference: [] as string[],
    additionalInformation: "",
    uniqueSellingPoints: "",
    buyerCountries: [] as string[],
    buyerIndustries: [] as string[],
    buyerSectorKeywords: [] as string[],
    buyerEndUserSectors: [] as string[],
    acquisitionReason: "",
    potentialBuyers: [] as string[],
    countryImportance: "N/A",
    industriesImportance: "N/A",
    keywordsImportance: "N/A",
    endUserSectorsImportance: "N/A",
    reasonImportance: "N/A",
    buyersImportance: "N/A"
  });

  const [currentKeyword, setCurrentKeyword] = useState("");
  const [currentIndustry, setCurrentIndustry] = useState("");
  const [currentCompetitor, setCurrentCompetitor] = useState("");

  const handleKeywordKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if ((e.key === 'Enter' || e.key === 'Tab') && currentKeyword.trim()) {
      e.preventDefault();
      setFormData(prev => ({
        ...prev,
        industryKeywords: [...prev.industryKeywords, currentKeyword.trim()]
      }));
      setCurrentKeyword("");
    }
  };

  const handleIndustryKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if ((e.key === 'Enter' || e.key === 'Tab') && currentIndustry.trim()) {
      e.preventDefault();
      setFormData(prev => ({
        ...prev,
        customerIndustries: [...prev.customerIndustries, currentIndustry.trim()]
      }));
      setCurrentIndustry("");
    }
  };

  const handleCompetitorKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if ((e.key === 'Enter' || e.key === 'Tab') && currentCompetitor.trim()) {
      e.preventDefault();
      setFormData(prev => ({
        ...prev,
        mainCompetitors: [...prev.mainCompetitors, currentCompetitor.trim()]
      }));
      setCurrentCompetitor("");
    }
  };

  const removeKeyword = (index: number) => {
    setFormData(prev => ({
      ...prev,
      industryKeywords: prev.industryKeywords.filter((_, i) => i !== index)
    }));
  };

  const removeIndustry = (index: number) => {
    setFormData(prev => ({
      ...prev,
      customerIndustries: prev.customerIndustries.filter((_, i) => i !== index)
    }));
  };

  const removeCompetitor = (index: number) => {
    setFormData(prev => ({
      ...prev,
      mainCompetitors: prev.mainCompetitors.filter((_, i) => i !== index)
    }));
  };

  const handleNext = (e: React.MouseEvent) => {
    e.preventDefault();
    if (currentSection < sections.length - 1) {
      setCurrentSection(prev => prev + 1);
      window.scrollTo(0, 0);
    }
  };

  const handlePrevious = (e: React.MouseEvent) => {
    e.preventDefault();
    if (currentSection > 0) {
      setCurrentSection(prev => prev - 1);
      window.scrollTo(0, 0);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!advisorData) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Missing advisor information. Please register first.",
      });
      navigate('/');
      return;
    }

    setIsLoading(true);

    try {
      const mappedData = {
        advisor_company_name: advisorData.companyName,
        advisor_full_name: advisorData.fullName,
        advisor_email: advisorData.email,
        project_name: formData.projectName,
        company_name: formData.companyName,
        company_website: formData.companyWebsite,
        share_sale_type: formData.shareSaleType,
        shareholders_exit: formData.shareholdersExit,
        transition_period: formData.transitionPeriod,
        reason_for_selling: formData.reasonForSelling,
        is_regulated: "N/A",
        regulatory_bodies: formData.regulatoryBodies,
        accreditations: formData.accreditations,
        industry_associations: formData.industryAssociations,
        recent_awards: formData.recentAwards,
        company_description: formData.companyDescription,
        products_and_services: formData.productsAndServices,
        revenue_model: formData.revenueModel,
        target_customers: formData.targetCustomers,
        industry_keywords: formData.industryKeywords,
        value_chain: formData.valueChain,
        business_model_type: formData.businessModelType,
        customer_industries: formData.customerIndustries,
        growth_plan: formData.growthPlan,
        main_competitors: formData.mainCompetitors,
        key_industry_risks: formData.keyIndustryRisks,
        revenue_by_geography: formData.revenueByGeography,
        revenue_by_customer_type: formData.revenueByCustomerType,
        revenue_by_product_type: formData.revenueByProductType,
        revenue_and_ebitda: formData.revenueAndEbitda,
        outstanding_litigation: formData.outstandingLitigation,
        negative_media_coverage: formData.negativeMediaCoverage,
        defined_benefit_scheme: formData.definedBenefitScheme,
        shareholders_preference: formData.shareholdersPreference,
        additional_information: formData.additionalInformation,
        unique_selling_points: formData.uniqueSellingPoints,
        buyer_countries: formData.buyerCountries,
        buyer_industries: formData.buyerIndustries,
        buyer_sector_keywords: formData.buyerSectorKeywords,
        buyer_end_user_sectors: formData.buyerEndUserSectors,
        acquisition_reason: formData.acquisitionReason,
        potential_buyers: formData.potentialBuyers,
        country_importance: formData.countryImportance,
        industries_importance: formData.industriesImportance,
        keywords_importance: formData.keywordsImportance,
        end_user_sectors_importance: formData.endUserSectorsImportance,
        reason_importance: formData.reasonImportance,
        buyers_importance: formData.buyersImportance
      };

      console.log('Submitting data:', mappedData);

      const { error } = await supabase
        .from('form_submissions')
        .insert(mappedData);

      if (error) {
        console.error('Supabase error:', error);
        toast({
          variant: "destructive",
          title: "Error",
          description: `Failed to submit form: ${error.message}`,
        });
        setIsLoading(false);
        return;
      }
      
      setIsSubmitted(true);
      toast({
        title: "Success!",
        description: "Your form has been submitted successfully.",
      });

      setTimeout(() => {
        navigate('/');
      }, 5000);
    } catch (error) {
      console.error('Error submitting form:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Something went wrong. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!advisorData.email || !advisorData.companyName || !advisorData.fullName) {
      toast({
        variant: "destructive",
        title: "Missing Information",
        description: "The form URL is missing required advisor information. Please make sure you have the correct URL.",
      });
      navigate('/');
    }
  }, [advisorData, navigate, toast]);

  if (isSubmitted) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-primary/5 to-primary/10">
        <Card className="w-full max-w-md text-center">
          <CardHeader>
            <CardTitle className="text-2xl font-bold flex items-center justify-center gap-2">
              <CheckCircle2 className="h-8 w-8 text-green-500" />
              Submission Complete!
            </CardTitle>
            <CardDescription>
              Thank you for submitting your information. We will review it shortly.
              You will be redirected back to the registration page in a few seconds.
            </CardDescription>
          </CardHeader>
        </Card>
      </div>
    );
  }

  const sections = ["Overview", "Business Information", "Metrics", "Other", "Buyer Preference"];

  const renderSection = () => {
    switch (currentSection) {
      case 0:
        return <OverviewSection formData={formData} setFormData={setFormData} />;
      case 1:
        return (
          <BusinessInformationSection
            formData={formData}
            setFormData={setFormData}
            currentKeyword={currentKeyword}
            setCurrentKeyword={setCurrentKeyword}
            currentIndustry={currentIndustry}
            setCurrentIndustry={setCurrentIndustry}
            currentCompetitor={currentCompetitor}
            setCurrentCompetitor={setCurrentCompetitor}
            handleKeywordKeyDown={handleKeywordKeyDown}
            handleIndustryKeyDown={handleIndustryKeyDown}
            handleCompetitorKeyDown={handleCompetitorKeyDown}
            removeKeyword={removeKeyword}
            removeIndustry={removeIndustry}
            removeCompetitor={removeCompetitor}
          />
        );
      case 2:
        return <MetricsSection formData={formData} setFormData={setFormData} />;
      case 3:
        return <OtherSection formData={formData} setFormData={setFormData} />;
      case 4:
        return <BuyerPreferenceSection formData={formData} setFormData={setFormData} />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-primary/5 to-primary/10">
      <Card className="w-full max-w-3xl">
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="text-sm text-muted-foreground mb-4 italic">
              <span className="text-red-500">*</span> denotes a required field
            </div>
            {renderSection()}
            <div className="flex justify-between mt-6">
              <Button
                type="button"
                variant="outline"
                onClick={handlePrevious}
                disabled={currentSection === 0}
              >
                <ChevronLeft className="h-4 w-4 mr-1" /> Previous
              </Button>
              {currentSection === sections.length - 1 ? (
                <Button type="submit" disabled={isLoading}>
                  {isLoading ? (
                    "Submitting..."
                  ) : (
                    <>
                      Submit <Send className="ml-2 h-4 w-4" />
                    </>
                  )}
                </Button>
              ) : (
                <Button type="button" onClick={handleNext}>
                  Next <ChevronRight className="h-4 w-4 ml-1" />
                </Button>
              )}
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
