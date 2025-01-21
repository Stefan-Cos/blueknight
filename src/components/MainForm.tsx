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
    mainCompetitors: [] as string[],
    keyIndustryRisks: "",
    // Metrics section
    revenueByGeography: "",
    revenueByCustomerType: "",
    revenueByProductType: "",
    customerLifetimeValue: "",
    grossChurn: "",
    averageCustomerLifespan: "",
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
      fcPlus1Ebitda: "0.0",
      fcPlus2Revenue: "0.0",
      fcPlus2Ebitda: "0.0"
    },
    // Other section
    shareOptionSchemes: "",
    outstandingLitigation: "",
    negativeMediaCoverage: "",
    definedBenefitScheme: "",
    shareholdersPreference: "",
    additionalInformation: ""
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

  const sections = ["Overview", "Business Information", "Metrics", "Other"];

  const handleNext = () => {
    if (currentSection < sections.length - 1) {
      setCurrentSection(prev => prev + 1);
      window.scrollTo(0, 0);
    }
  };

  const handlePrevious = () => {
    if (currentSection > 0) {
      setCurrentSection(prev => prev - 1);
      window.scrollTo(0, 0);
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
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold mb-6">Overview</h2>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="projectName">Project name</Label>
                <Input
                  id="projectName"
                  placeholder="Enter project name"
                  value={formData.projectName}
                  onChange={(e) => setFormData({ ...formData, projectName: e.target.value })}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="shareSaleType">Share sale type</Label>
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
                  All shareholders/director(s) intending to exit
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
                  Managing director/CEO - transition period
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
                <Label htmlFor="reasonForSelling">Reason for selling</Label>
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
                <Label htmlFor="isRegulated">Is the company regulated</Label>
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
            <div className="flex justify-between mt-6">
              <Button
                type="button"
                variant="outline"
                onClick={handlePrevious}
                disabled={currentSection === 0}
              >
                <ChevronLeft className="h-4 w-4 mr-1" /> Previous
              </Button>
              <Button type="button" onClick={handleNext}>
                Next <ChevronRight className="h-4 w-4 ml-1" />
              </Button>
            </div>
          </div>
        );

      case 1: // Business Information
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold mb-6">Business Information</h2>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="companyDescription">Company description</Label>
                <Textarea
                  id="companyDescription"
                  placeholder="Provide a detailed description of your company"
                  value={formData.companyDescription}
                  onChange={(e) => setFormData({ ...formData, companyDescription: e.target.value })}
                  className="min-h-[100px]"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="industryKeywords">Industry keywords</Label>
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
                <Label>Company's place in value chain</Label>
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
                <Label>Business model type</Label>
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
                <Label htmlFor="mainCompetitors">Main competitors</Label>
                <Input
                  id="mainCompetitors"
                  placeholder="Type competitor and press Enter"
                  value={currentCompetitor}
                  onChange={(e) => setCurrentCompetitor(e.target.value)}
                  onKeyDown={handleCompetitorKeyDown}
                />
                <div className="flex flex-wrap gap-2 mt-2">
                  {formData.mainCompetitors.map((competitor, index) => (
                    <span key={index} className="bg-primary/10 px-2 py-1 rounded-md text-sm">
                      {competitor}
                    </span>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="growthPlan">Growth plan</Label>
                <Textarea
                  id="growthPlan"
                  placeholder="Describe the company's growth plans around geography, product and customer expansion"
                  value={formData.growthPlan}
                  onChange={(e) => setFormData({ ...formData, growthPlan: e.target.value })}
                  className="min-h-[100px]"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="keyIndustryRisks">Key industry risks</Label>
                <Textarea
                  id="keyIndustryRisks"
                  placeholder="Describe the key industry risks impacting the company"
                  value={formData.keyIndustryRisks}
                  onChange={(e) => setFormData({ ...formData, keyIndustryRisks: e.target.value })}
                  className="min-h-[100px]"
                />
              </div>
            </div>
            <div className="flex justify-between mt-6">
              <Button type="button" variant="outline" onClick={handlePrevious}>
                <ChevronLeft className="h-4 w-4 mr-1" /> Previous
              </Button>
              <Button type="button" onClick={handleNext}>
                Next <ChevronRight className="h-4 w-4 ml-1" />
              </Button>
            </div>
          </div>
        );

      case 2: // Metrics
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold mb-6">Metrics</h2>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="revenueByGeography">Revenue split by geography</Label>
                <Input
                  id="revenueByGeography"
                  placeholder="e.g., 70% in the UK, 20% in Ireland"
                  value={formData.revenueByGeography}
                  onChange={(e) => setFormData({ ...formData, revenueByGeography: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="revenueByCustomerType">Revenue split by customer type</Label>
                <Input
                  id="revenueByCustomerType"
                  placeholder="e.g., 70% in life sciences"
                  value={formData.revenueByCustomerType}
                  onChange={(e) => setFormData({ ...formData, revenueByCustomerType: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="revenueByProductType">Revenue split by product type</Label>
                <Input
                  id="revenueByProductType"
                  placeholder="e.g., 70% are training modules on a subscription basis"
                  value={formData.revenueByProductType}
                  onChange={(e) => setFormData({ ...formData, revenueByProductType: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="customerLifetimeValue">Customer lifetime value (CLV)</Label>
                <Input
                  id="customerLifetimeValue"
                  placeholder="Enter CLV for subscription-based users"
                  value={formData.customerLifetimeValue}
                  onChange={(e) => setFormData({ ...formData, customerLifetimeValue: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="grossChurn">Gross churn</Label>
                <Input
                  id="grossChurn"
                  placeholder="Enter gross churn for subscription-based users"
                  value={formData.grossChurn}
                  onChange={(e) => setFormData({ ...formData, grossChurn: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="averageCustomerLifespan">Average customer lifespan</Label>
                <Input
                  id="averageCustomerLifespan"
                  placeholder="Enter average customer lifespan"
                  value={formData.averageCustomerLifespan}
                  onChange={(e) => setFormData({ ...formData, averageCustomerLifespan: e.target.value })}
                />
              </div>

              <div className="space-y-4">
                <Label>Revenue and EBITDA in £M</Label>
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="border-b">
                        <th className="p-2 text-left">Metric</th>
                        <th className="p-2">Year-2</th>
                        <th className="p-2">PY</th>
                        <th className="p-2">LY</th>
                        <th className="p-2">Year 0</th>
                        <th className="p-2">FC+1</th>
                        <th className="p-2">FC+2</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b">
                        <td className="p-2">Revenue</td>
                        <td className="p-2">
                          <Input
                            type="number"
                            step="0.1"
                            placeholder="0.0"
                            value={formData.revenueAndEbitda.yearMinus2Revenue}
                            onChange={(e) => setFormData({
                              ...formData,
                              revenueAndEbitda: {
                                ...formData.revenueAndEbitda,
                                yearMinus2Revenue: e.target.value
                              }
                            })}
                          />
                        </td>
                        <td className="p-2">
                          <Input
                            type="number"
                            step="0.1"
                            placeholder="0.0"
                            value={formData.revenueAndEbitda.previousYearRevenue}
                            onChange={(e) => setFormData({
                              ...formData,
                              revenueAndEbitda: {
                                ...formData.revenueAndEbitda,
                                previousYearRevenue: e.target.value
                              }
                            })}
                          />
                        </td>
                        <td className="p-2">
                          <Input
                            type="number"
                            step="0.1"
                            placeholder="0.0"
                            value={formData.revenueAndEbitda.lastYearRevenue}
                            onChange={(e) => setFormData({
                              ...formData,
                              revenueAndEbitda: {
                                ...formData.revenueAndEbitda,
                                lastYearRevenue: e.target.value
                              }
                            })}
                          />
                        </td>
                        <td className="p-2">
                          <Input
                            type="number"
                            step="0.1"
                            placeholder="0.0"
                            value={formData.revenueAndEbitda.year0Revenue}
                            onChange={(e) => setFormData({
                              ...formData,
                              revenueAndEbitda: {
                                ...formData.revenueAndEbitda,
                                year0Revenue: e.target.value
                              }
                            })}
                          />
                        </td>
                        <td className="p-2">
                          <Input
                            type="number"
                            step="0.1"
                            placeholder="0.0"
                            value={formData.revenueAndEbitda.fcPlus1Revenue}
                            onChange={(e) => setFormData({
                              ...formData,
                              revenueAndEbitda: {
                                ...formData.revenueAndEbitda,
                                fcPlus1Revenue: e.target.value
                              }
                            })}
                          />
                        </td>
                        <td className="p-2">
                          <Input
                            type="number"
                            step="0.1"
                            placeholder="0.0"
                            value={formData.revenueAndEbitda.fcPlus2Revenue}
                            onChange={(e) => setFormData({
                              ...formData,
                              revenueAndEbitda: {
                                ...formData.revenueAndEbitda,
                                fcPlus2Revenue: e.target.value
                              }
                            })}
                          />
                        </td>
                      </tr>
                      <tr>
                        <td className="p-2">EBITDA</td>
                        <td className="p-2">
                          <Input
                            type="number"
                            step="0.1"
                            placeholder="0.0"
                            value={formData.revenueAndEbitda.yearMinus2Ebitda}
                            onChange={(e) => setFormData({
                              ...formData,
                              revenueAndEbitda: {
                                ...formData.revenueAndEbitda,
                                yearMinus2Ebitda: e.target.value
                              }
                            })}
                          />
                        </td>
                        <td className="p-2">
                          <Input
                            type="number"
                            step="0.1"
                            placeholder="0.0"
                            value={formData.revenueAndEbitda.previousYearEbitda}
                            onChange={(e) => setFormData({
                              ...formData,
                              revenueAndEbitda: {
                                ...formData.revenueAndEbitda,
                                previousYearEbitda: e.target.value
                              }
                            })}
                          />
                        </td>
                        <td className="p-2">
                          <Input
                            type="number"
                            step="0.1"
                            placeholder="0.0"
                            value={formData.revenueAndEbitda.lastYearEbitda}
                            onChange={(e) => setFormData({
                              ...formData,
                              revenueAndEbitda: {
                                ...formData.revenueAndEbitda,
                                lastYearEbitda: e.target.value
                              }
                            })}
                          />
                        </td>
                        <td className="p-2">
                          <Input
                            type="number"
                            step="0.1"
                            placeholder="0.0"
                            value={formData.revenueAndEbitda.year0Ebitda}
                            onChange={(e) => setFormData({
                              ...formData,
                              revenueAndEbitda: {
                                ...formData.revenueAndEbitda,
                                year0Ebitda: e.target.value
                              }
                            })}
                          />
                        </td>
                        <td className="p-2">
                          <Input
                            type="number"
                            step="0.1"
                            placeholder="0.0"
                            value={formData.revenueAndEbitda.fcPlus1Ebitda}
                            onChange={(e) => setFormData({
                              ...formData,
                              revenueAndEbitda: {
                                ...formData.revenueAndEbitda,
                                fcPlus1Ebitda: e.target.value
                              }
                            })}
                          />
                        </td>
                        <td className="p-2">
                          <Input
                            type="number"
                            step="0.1"
                            placeholder="0.0"
                            value={formData.revenueAndEbitda.fcPlus2Ebitda}
                            onChange={(e) => setFormData({
                              ...formData,
                              revenueAndEbitda: {
                                ...formData.revenueAndEbitda,
                                fcPlus2Ebitda: e.target.value
                              }
                            })}
                          />
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="flex justify-between mt-6">
                <Button type="button" variant="outline" onClick={handlePrevious}>
                  <ChevronLeft className="h-4 w-4 mr-1" /> Previous
                </Button>
                <Button type="button" onClick={handleNext}>
                  Next <ChevronRight className="h-4 w-4 ml-1" />
                </Button>
              </div>
            </div>
          </div>
        );

      case 3: // Other
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold mb-6">Other</h2>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="shareOptionSchemes">Any share option schemes in operation</Label>
                <Select
                  value={formData.shareOptionSchemes}
                  onValueChange={(value) => setFormData({ ...formData, shareOptionSchemes: value })}
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
                <Label htmlFor="outstandingLitigation">Any outstanding litigation</Label>
                <Select
                  value={formData.outstandingLitigation}
                  onValueChange={(value) => setFormData({ ...formData, outstandingLitigation: value })}
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
                <Label htmlFor="negativeMediaCoverage">Any negative media coverage</Label>
                <Select
                  value={formData.negativeMediaCoverage}
                  onValueChange={(value) => setFormData({ ...formData, negativeMediaCoverage: value })}
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
                <Label htmlFor="definedBenefitScheme">Any defined benefit scheme in operation</Label>
                <Select
                  value={formData.definedBenefitScheme}
                  onValueChange={(value) => setFormData({ ...formData, definedBenefitScheme: value })}
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
                <Label htmlFor="shareholdersPreference">Shareholders' acquirer preference</Label>
                <Select
                  value={formData.shareholdersPreference}
                  onValueChange={(value) => setFormData({ ...formData, shareholdersPreference: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select preference" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pe">PE</SelectItem>
                    <SelectItem value="trade">Trade</SelectItem>
                    <SelectItem value="fo">FO</SelectItem>
                    <SelectItem value="noPreference">No Preference</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="additionalInformation">Additional information to enhance buyer search</Label>
                <Textarea
                  id="additionalInformation"
                  placeholder="Share any additional information that would help with the buyer search"
                  value={formData.additionalInformation}
                  onChange={(e) => setFormData({ ...formData, additionalInformation: e.target.value })}
                  className="min-h-[100px]"
                />
              </div>
            </div>

            <div className="flex justify-between mt-6">
              <Button type="button" variant="outline" onClick={handlePrevious}>
                <ChevronLeft className="h-4 w-4 mr-1" /> Previous
              </Button>
              <Button type="submit" disabled={isLoading}>
                {isLoading ? (
                  "Submitting..."
                ) : (
                  <>
                    Submit <Send className="ml-2 h-4 w-4" />
                  </>
                )}
              </Button>
            </div>
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
