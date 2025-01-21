import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle2, Send, ChevronRight, ChevronLeft } from "lucide-react";

export function MainForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [currentSection, setCurrentSection] = useState(0);
  const { toast } = useToast();

  // Form state
  const [formData, setFormData] = useState({
    // Overview section
    projectName: "",
    shareSaleType: "",
    shareholdersExit: "",
    transitionPeriod: "",
    reasonForSelling: "",
    isRegulated: "",
    // Business Information section
    companyDescription: "",
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
    mainCompetitors: "",
    keyIndustryRisks: "",
  });

  const [currentKeyword, setCurrentKeyword] = useState("");
  const [currentIndustry, setCurrentIndustry] = useState("");

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

  const sections = ["Overview", "Business Information", "Metrics", "Other"];

  const handleNext = () => {
    if (currentSection < sections.length - 1) {
      setCurrentSection(prev => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (currentSection > 0) {
      setCurrentSection(prev => prev - 1);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Simulate form submission
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setIsSubmitted(true);
      toast({
        title: "Success!",
        description: "Your form has been submitted successfully.",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Something went wrong. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

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
            </CardDescription>
          </CardHeader>
        </Card>
      </div>
    );
  }

  const renderSection = () => {
    switch (currentSection) {
      case 0: // Overview
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="projectName">Project Name</Label>
              <Input
                id="projectName"
                placeholder="Enter project name"
                value={formData.projectName}
                onChange={(e) => setFormData({ ...formData, projectName: e.target.value })}
                required
              />
            </div>

                  <div className="space-y-2">
                    <Label htmlFor="shareSaleType">Share Sale Type</Label>
                    <Select
                      value={formData.shareSaleType}
                      onValueChange={(value) => setFormData({ ...formData, shareSaleType: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select sale type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="full">Full sale</SelectItem>
                        <SelectItem value="partial">Partial sale</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="shareholdersExit">
                      All shareholders/director(s) intending to exit?
                    </Label>
                    <Select
                      value={formData.shareholdersExit}
                      onValueChange={(value) => setFormData({ ...formData, shareholdersExit: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select option" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="yes">Yes</SelectItem>
                        <SelectItem value="no">No</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="transitionPeriod">
                      Managing director/CEO - Transition period
                    </Label>
                    <Select
                      value={formData.transitionPeriod}
                      onValueChange={(value) => setFormData({ ...formData, transitionPeriod: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select transition period" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="3-6">3 - 6 months</SelectItem>
                        <SelectItem value="6-12">6 - 12 months</SelectItem>
                        <SelectItem value="12+">12+ months</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="reasonForSelling">Reason for Selling</Label>
                    <Textarea
                      id="reasonForSelling"
                      placeholder="Please provide detailed reasons for selling"
                      value={formData.reasonForSelling}
                      onChange={(e) => setFormData({ ...formData, reasonForSelling: e.target.value })}
                      className="min-h-[100px]"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="isRegulated">Is the company regulated?</Label>
                    <Select
                      value={formData.isRegulated}
                      onValueChange={(value) => setFormData({ ...formData, isRegulated: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select option" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="yes">Yes</SelectItem>
                        <SelectItem value="no">No</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
          </div>
        );

      case 1: // Business Information
        return (
          <div className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="companyDescription">Company Description</Label>
              <Textarea
                id="companyDescription"
                placeholder="Provide a detailed description of your company"
                value={formData.companyDescription}
                onChange={(e) => setFormData({ ...formData, companyDescription: e.target.value })}
                className="min-h-[100px]"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="industryKeywords">Industry Keywords</Label>
              <Input
                id="industryKeywords"
                placeholder="Type keywords and press Enter"
                value={currentKeyword}
                onChange={(e) => setCurrentKeyword(e.target.value)}
                onKeyDown={handleKeywordKeyDown}
              />
              <div className="flex flex-wrap gap-2 mt-2">
                {formData.industryKeywords.map((keyword, index) => (
                  <span key={index} className="bg-primary/10 px-2 py-1 rounded-md text-sm">
                    {keyword}
                  </span>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <Label>Company's Place in Value Chain</Label>
              <div className="grid grid-cols-2 gap-4">
                {Object.entries(formData.valueChain).map(([key, value]) => (
                  <div key={key} className="flex items-center space-x-2">
                    <Checkbox
                      id={key}
                      checked={value}
                      onCheckedChange={(checked) =>
                        setFormData(prev => ({
                          ...prev,
                          valueChain: {
                            ...prev.valueChain,
                            [key]: checked === true
                          }
                        }))
                      }
                    />
                    <Label htmlFor={key} className="capitalize">
                      {key.replace(/([A-Z])/g, ' $1').trim()}
                    </Label>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <Label>Business Model Type</Label>
              <div className="grid grid-cols-2 gap-4">
                {Object.entries(formData.businessModelType).map(([key, value]) => (
                  <div key={key} className="flex items-center space-x-2">
                    <Checkbox
                      id={key}
                      checked={value}
                      onCheckedChange={(checked) =>
                        setFormData(prev => ({
                          ...prev,
                          businessModelType: {
                            ...prev.businessModelType,
                            [key]: checked === true
                          }
                        }))
                      }
                    />
                    <Label htmlFor={key} className="uppercase">
                      {key}
                    </Label>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="customerIndustries">Industries of your customers</Label>
              <Input
                id="customerIndustries"
                placeholder="Type industry and press Enter"
                value={currentIndustry}
                onChange={(e) => setCurrentIndustry(e.target.value)}
                onKeyDown={handleIndustryKeyDown}
              />
              <div className="flex flex-wrap gap-2 mt-2">
                {formData.customerIndustries.map((industry, index) => (
                  <span key={index} className="bg-primary/10 px-2 py-1 rounded-md text-sm">
                    {industry}
                  </span>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="growthPlan">Growth Plan</Label>
              <Textarea
                id="growthPlan"
                placeholder="Describe the company's growth plans around geography, product and customer expansion"
                value={formData.growthPlan}
                onChange={(e) => setFormData({ ...formData, growthPlan: e.target.value })}
                className="min-h-[100px]"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="mainCompetitors">Main Competitors</Label>
              <Textarea
                id="mainCompetitors"
                placeholder="List your main competitors"
                value={formData.mainCompetitors}
                onChange={(e) => setFormData({ ...formData, mainCompetitors: e.target.value })}
                className="min-h-[100px]"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="keyIndustryRisks">Key Industry Risks</Label>
              <Textarea
                id="keyIndustryRisks"
                placeholder="Describe the key industry risks impacting the company"
                value={formData.keyIndustryRisks}
                onChange={(e) => setFormData({ ...formData, keyIndustryRisks: e.target.value })}
                className="min-h-[100px]"
              />
            </div>
          </div>
        );

      case 2: // Metrics
        return (
          <div className="py-4 text-center text-muted-foreground">
            Metrics section will be implemented in the next phase
          </div>
        );

      case 3: // Other
        return (
          <div className="py-4 text-center text-muted-foreground">
            Other section will be implemented in the next phase
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-primary/5 to-primary/10">
      <Card className="w-full max-w-3xl">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Business Sale Information</CardTitle>
          <CardDescription>
            Please provide the following details about your business sale
          </CardDescription>
          <div className="flex justify-between items-center mt-4">
            <div className="text-sm text-muted-foreground">
              Step {currentSection + 1} of {sections.length}: {sections[currentSection]}
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                onClick={handlePrevious}
                disabled={currentSection === 0}
                size="sm"
              >
                <ChevronLeft className="h-4 w-4 mr-1" /> Previous
              </Button>
              {currentSection === sections.length - 1 ? (
                <Button type="submit" form="mainForm" disabled={isLoading} size="sm">
                  {isLoading ? (
                    "Submitting..."
                  ) : (
                    <>
                      Submit
                      <Send className="ml-2 h-4 w-4" />
                    </>
                  )}
                </Button>
              ) : (
                <Button onClick={handleNext} size="sm">
                  Next <ChevronRight className="h-4 w-4 ml-1" />
                </Button>
              )}
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <form id="mainForm" onSubmit={handleSubmit} className="space-y-6">
            {renderSection()}
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
